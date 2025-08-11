#!/bin/sh

PLAYWRIGHT_IMAGE="mcr.microsoft.com/playwright:v1.49.1"

# Check if the image is already pulled
if ! docker image inspect $PLAYWRIGHT_IMAGE >/dev/null 2>&1; then
    echo "Pulling Playwright image..."
    docker pull $PLAYWRIGHT_IMAGE
else
    echo "Playwright image already exists. Skipping pull."
fi

# Run the test update
docker run --rm \
    -v $(pwd):/workspace \
    -w /workspace $PLAYWRIGHT_IMAGE \
    /bin/sh -c "yarn test-storybook:update"
