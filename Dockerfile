FROM alpine:3.16

RUN set -x \
    && apk update \
    && apk upgrade

RUN set -x \
    # See GitHub discussion about Rust Alpine container bug: https://github.com/rust-lang/rust/issues/115450#issuecomment-1717228111
    && apk add --no-cache openssl-dev musl-dev gcc nodejs npm curl \
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

COPY package*.json ./

RUN npm install

COPY . .

EXPOSE 3000

CMD [ "npm", "run", "start:prod" ]
