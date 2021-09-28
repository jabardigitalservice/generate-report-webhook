#!/bin/sh

app=${DOCKER_APP:-app}

cd build

if [ "$app" = "app" ]; then

    echo "Running the app..."
    node server.js

elif [ "$app" = "job" ]; then

    echo "Running the job..."
    node jobProcess.js

else
    echo "Could not match the container app \"$app\""
    exit 1
fi