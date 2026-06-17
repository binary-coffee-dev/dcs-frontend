FROM node:22.22.3-alpine3.24 AS build-env

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nx

COPY apps ./apps
COPY libs ./libs
COPY tsconfig.json nx.json tailwind.config.js ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then nx run dashboard:build:development ; else nx run dashboard:build:production ; fi

FROM nginx:1.31.1-alpine3.23

COPY --from=build-env /app/dist/apps/dashboard/ /usr/share/nginx/html

COPY ./docker/nginx.conf /etc/nginx/conf.d/default.conf

CMD ["nginx", "-g", "daemon off;"]
