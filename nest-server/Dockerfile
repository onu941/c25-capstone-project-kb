FROM node:18.16-slim
WORKDIR /user/src/app
COPY package.json .
COPY dist .
EXPOSE 3000
CMD npm i &&\
    npx knex migrate:latest &&\
    npx knex seed:run &&\
    node src/main.js
