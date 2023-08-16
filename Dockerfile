FROM node:18.16.0 as build-step

RUN mkdir -p /app

WORKDIR /app

COPY package.json /app

RUN npm install

COPY . /app

RUN npm run build --prod

# Path: /etc/nginx/nginx.conf

FROM nginx:1.21.3-alpine

COPY --from=build-step /app/dist/ng-poke-api /usr/share/nginx/html
