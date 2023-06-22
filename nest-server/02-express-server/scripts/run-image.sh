set -e
set -x

docker stop docker-test-container
docker rm docker-test-container
docker run -it -p 8100:8100 --name docker-test-container docker-test-image