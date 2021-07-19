FROM node:alpine

RUN apk update; apk upgrade;
RUN apk add bash yarn

WORKDIR /app

COPY package.json ./
RUN yarn install

COPY ./ ./

EXPOSE 3000

CMD ["yarn", "start"]
