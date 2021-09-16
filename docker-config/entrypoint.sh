#!/bin/sh

app=${DOCKER_APP:-app}

if [ "$app" = "app" ]; then

    echo "Running the app..."
    yarn run start

elif [ "$app" = "job" ]; then

    echo "Running the job..."
    yarn run job

else
    echo "Could not match the container app \"$app\""
    exit 1
fi