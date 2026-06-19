FROM node:22.22.3-alpine3.24

WORKDIR /app

COPY package.json package-lock.json ./
RUN npm install
RUN npm install -g nx

COPY apps/blog ./apps/blog
COPY libs ./libs
COPY tsconfig.json nx.json tailwind.config.js ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then nx run blog:build:development && nx run blog:server:development ; else nx run blog:build:production &&  nx run blog:server:production ; fi

CMD ["npm", "run", "serve:ssr"]
