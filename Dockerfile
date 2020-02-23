FROM node:10.16.3

WORKDIR /app

COPY . ./

ARG ENVIRONMENT

RUN npm install
RUN if [ "$ENVIRONMENT" = "dev" ] ; then npm run build:ssr:dev ; else npm run:build ; fi

CMD ["npm", "run", "serve:ssr"]
