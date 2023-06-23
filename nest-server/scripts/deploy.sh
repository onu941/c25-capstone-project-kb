# build

set -e
set -x
npm run build
docker build -t docker-testing .

# run
docker run -it docker-testing:latest 