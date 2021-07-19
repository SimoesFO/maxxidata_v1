FROM node:alpine

RUN apk update; apk upgrade;
RUN apk add bash yarn

WORKDIR /usr/app/

COPY package.json ./
RUN yarn install

COPY ./ ./

EXPOSE 3333

CMD ["yarn", "start"]
