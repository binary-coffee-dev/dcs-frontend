FROM node:14.21.1-alpine3.16

WORKDIR /app

COPY package.json ./
COPY package-lock.json ./
RUN npm install

COPY . ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then npm run build:ssr:dev ; else npm run build:ssr ; fi

CMD ["npm", "run", "serve:ssr"]
