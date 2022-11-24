gh_token=token-gh
SSH_HOSTS=$(shell < ~/.ssh/known_hosts)
SSH_PRIVATE_KEY=$(shell < ~/.ssh/id_rsa)
event:
	@echo "#######################"
	@echo "# Test action         #"
	@echo "#######################"
	yarn build
	act pull_request -e tests/mocks/pull-request-event.json \
		--container-architecture linux/amd64 \
		--bind \
		--workflows tests/workflows \
		-s GITHUB_TOKEN=$(gh_token) \
		-s SSH_PRIVATE_KEY="$$(< ~/.ssh/id_rsa)" \
		-s SSH_HOSTS="$$(< ~/.ssh/known_hosts)"