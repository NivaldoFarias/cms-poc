FROM node:18.12.0-alpine

COPY . .

RUN npm ci
RUN npm run build

RUN mkdir -p /var/www/html
RUN mv build/* /var/www/html

WORKDIR /

RUN rm -rf /client