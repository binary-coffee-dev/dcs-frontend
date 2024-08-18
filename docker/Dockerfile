FROM node:20.12.2-alpine3.19

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nx

COPY apps ./apps
COPY libs ./libs
COPY tsconfig.json nx.json tailwind.config.js ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then nx run blog:build:development && nx run blog:server:development ; else nx run blog:build:production &&  nx run blog:server:production ; fi

CMD ["npm", "run", "serve:ssr"]
