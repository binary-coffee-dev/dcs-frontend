# Start application

[<< go back to documentation](./doc.md)

With this documentation you should be able to start the project locally or if you like, using a docker container. But before that, you need to install the project's dependencies.

**Install dependencies**

```
npm install
```

After the dependencies where correctly installed, you can continue with the steps below.

## Start project locally

**Blog**

```
// development
npm start

// production
npm run serve:ssr
```

> NOTE: For production the project need to be built first

**Dashboard**

```
npm run start:admin
```

# Start project with docker

**Blog**

```
docker-compose up -d
```

**Dashboard**

```
docker-compose -f docker-compose.admin.yml up -d
```
