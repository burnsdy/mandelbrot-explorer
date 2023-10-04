FROM alpine:3.16

RUN apk add --no-cache nodejs=16.20.1-r0 yarn rust cargo

WORKDIR /usr/src/app

COPY package.json yarn.lock ./

RUN yarn

COPY . .

EXPOSE 3000

CMD [ "yarn", "start:prod" ]
