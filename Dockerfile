FROM node:latest

MAINTAINER Hema

RUN echo "Tryin to build my first application"

COPY . /var/www

WORKDIR /var/www

RUN npm install

EXPOSE 2500

ENTRYPOINT ["npm","start"]
