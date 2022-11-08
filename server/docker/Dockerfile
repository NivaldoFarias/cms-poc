FROM node:18.12.0-alpine

WORKDIR /server

COPY . . 

EXPOSE 5000

RUN npm ci

CMD npm run build && npm start