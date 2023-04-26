FROM node:16.20.0-alpine3.16

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nx

COPY apps ./apps
COPY libs ./libs
COPY tsconfig.json nx.json ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then nx run blog:build:development && nx run blog:server:development ; else nx run blog:build:production &&  nx run blog:server:production ; fi

CMD ["npm", "run", "serve:ssr"]
