FROM node:18.16-slim

WORKDIR /srv/docker-test

COPY package.json .
RUN npm install
COPY server.js .
CMD node server.js
