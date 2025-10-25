FROM node:22-alpine as build-stage

WORKDIR /frontend
COPY tsconfig.base.json /frontend/
COPY ./app/package*.json /frontend/app/

WORKDIR /frontend/app
RUN npm ci
COPY ./app /frontend/app/
RUN npm run build

FROM nginx:alpine

COPY --from=build-stage /frontend/app/ci/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /frontend/app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]