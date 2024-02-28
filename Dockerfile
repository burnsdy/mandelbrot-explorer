# Stage 1: Build App
FROM alpine:3.16 AS build

RUN set -x \
    && apk update \
    && apk upgrade

RUN set -x \
    # See GitHub discussion about Rust Alpine container bug: https://github.com/rust-lang/rust/issues/115450#issuecomment-1717228111
    && apk add --no-cache openssl-dev musl-dev gcc nodejs yarn curl \
    && curl https://sh.rustup.rs -sSf -o rustup.rs.sh \
    && /bin/sh ./rustup.rs.sh -y

ENV OPENSSL_DIR=/usr

ENV PATH="/root/.cargo/bin:${PATH}"

RUN set -x \
    && rustup update \
    && rustup install nightly \
    && rustup target add wasm32-unknown-unknown --toolchain nightly

# Use for testing `docker build` attempts since `docker run` fails on same installation of wasm-bindgen-cli
# RUN set -x \
#     && cargo +nightly install wasm-bindgen-cli

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --frozen-lockfile

COPY . .

RUN yarn build



# Stage 2: Production Dependencies
FROM alpine:3.16 AS deps

RUN set -x \
    && apk add --no-cache nodejs yarn

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn install --ignore-scripts --frozen-lockfile --production



# Stage 3: Production App
FROM alpine:3.16

RUN set -x \
    && apk add --no-cache nodejs yarn

WORKDIR /usr/src/app

COPY package.json ./

COPY public ./public

COPY --from=build /usr/src/app/.next ./.next

COPY --from=deps /usr/src/app/node_modules ./node_modules

ENV PORT 8080

EXPOSE $PORT

CMD [ "yarn", "start" ]
