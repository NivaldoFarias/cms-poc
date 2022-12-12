FROM node:18.12.0-alpine

WORKDIR /server

COPY . . 

EXPOSE 5000

RUN npm i

CMD npm run build && npm start