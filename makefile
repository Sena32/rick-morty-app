IMAGE_NAME = rick-morty-app
CONTAINER_NAME = rick-morty-app
CONTAINER_PORT = 3000

# command for build image docker
image-build:
	sudo docker build -t $(IMAGE_NAME) .

# Clean generate image
image-clean:
	sudo docker rmi $(IMAGE_NAME)

# Run your container
container-start:
	sudo docker container run -d -p $(CONTAINER_PORT):3000 --rm --name=$(CONTAINER_NAME) $(CONTAINER_NAME)

# Remove your container
container-remove:
	sudo docker rm -f $(CONTAINER_NAME)
	