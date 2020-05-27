FROM node:10.16.3

WORKDIR /app

COPY package.json ./
RUN npm install

COPY . ./

ARG ENVIRONMENT
RUN if [ "$ENVIRONMENT" = "dev" ] ; then npm run build:ssr:dev ; else npm run build:ssr ; fi

CMD ["npm", "run", "serve:ssr"]
