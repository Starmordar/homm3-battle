FROM node:18-alpine as build-stage

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"

RUN corepack enable
COPY . /app

WORKDIR /app

COPY package*.json /app/
COPY pnpm-lock.yaml /app/
RUN pnpm install --frozen-lockfile

COPY ./ /app/

RUN npm run build


FROM nginx:1.25.5

COPY --from=build-stage /app/.ci/nginx.conf /etc/nginx/conf.d/default.conf
COPY --from=build-stage /app/dist/ /usr/share/nginx/html

EXPOSE 80

CMD ["nginx", "-g", "daemon off;"]
