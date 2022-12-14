.PHONY: build-server
build-server: ## Build the development docker image for the server and database.
	docker compose -f docker/server/docker-compose.dev.yml build

.PHONY: start-server
start-server: ## Start the development docker server container.
	docker compose -f docker/server/docker-compose.dev.yml up -d

.PHONY: stop-server
stop-server: ## Stop the development docker server container.
	docker compose -f docker/server/docker-compose.dev.yml down

.PHONY: build-development
build-development: ## Build the development docker images for the client, server and database.
	docker compose -f docker/docker-compose.dev.yml build

.PHONY: start-development
start-development: ## Start the development docker containers.
	docker compose -f docker/docker-compose.dev.yml up -d

.PHONY: stop-development
stop-development: ## Stop the development docker container.
	docker compose -f docker/docker-compose.dev.yml down
  
.PHONY: build-production
build-production: ## Build the production docker image for the client, server and database.
	docker compose -f docker/docker-compose.yml build

.PHONY: start-production
start-production: ## Start the production docker container.
	docker compose -f docker/docker-compose.yml up -d

.PHONY: stop-production
stop-production: ## Stop the production docker container.
	docker compose -f docker/docker-compose.yml down