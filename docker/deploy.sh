#!/bin/bash

echo "Starting project in docker"

PROJECT_NAME=blog-admin
DOCKER_COMPOSE_FILE=docker-compose.admin.yml

if [ ! -z "$1" ]
then
  PROJECT_NAME=$1
fi

if [ ! -z "$2" ]
then
  DOCKER_COMPOSE_FILE=$2
fi

echo "Docker container name: $PROJECT_NAME";
docker-compose -f $DOCKER_COMPOSE_FILE --project-name=$PROJECT_NAME build --no-cache
docker-compose -f $DOCKER_COMPOSE_FILE --project-name=$PROJECT_NAME down
docker-compose -f $DOCKER_COMPOSE_FILE --project-name=$PROJECT_NAME up -d
