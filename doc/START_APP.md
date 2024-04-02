# Start application

[<< go back to documentation](README.md)

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
nx run blog:serve --watch --poll=2000 --port=4200 --host=0.0.0.0 --disable-host-check

// production
node dist/apps/server/main
```

> NOTE: For production the project need to be built first

**Dashboard**

```
nx run dashboard:serve --watch --port=4201 --poll=2000 --host=0.0.0.0 --disable-host-check
```

# Start project with docker

**Blog**

```
# prod
PORT_FRONTEND=4200 ./docker/deploy.sh blog-frontend-prod docker/docker-compose.yml

# dev
ENVIRONMENT=dev PORT_FRONTEND=4200 ./docker/deploy.sh blog-frontend-dev docker/docker-compose.yml
```

**Dashboard**

```
# prod
PORT_FRONTEND=4201 ./docker/deploy.sh blog-admin-prod docker/docker-compose.admin.yml

#dev
ENVIRONMENT=dev PORT_FRONTEND=4201 ./docker/deploy.sh blog-admin-dev docker/docker-compose.admin.yml
```
