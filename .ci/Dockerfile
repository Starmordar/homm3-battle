FROM node:18-alpine as build-stage

WORKDIR /app

COPY package*.json /app/
RUN npm ci

COPY ./ /app/

RUN npm run build


FROM nginx:1.25.5

COPY --from=build-stage /app/.ci/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
