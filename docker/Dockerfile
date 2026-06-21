FROM node:22.22.3-alpine3.24

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nx

COPY apps/blog ./apps/blog
COPY libs ./libs
COPY tsconfig.json nx.json tailwind.config.js ./

ENV NX_DAEMON=false
ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then nx run build:blog:dev; else nx run build:blog:prod; fi

CMD ["npm", "run", "serve:blog"]
