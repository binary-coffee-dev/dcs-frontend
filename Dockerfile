FROM node:10.16.3

WORKDIR /app

COPY . ./

RUN npm install
RUN npm run build:ssr

CMD ["npm", "run", "serve:ssr"]
