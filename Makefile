gh_token=token-gh
event:
	@echo "#######################"
	@echo "# Test action         #"
	@echo "#######################"
	yarn build
	act pull_request -e test/pull-request-event.json --container-architecture linux/amd64 --bind -s GITHUB_TOKEN=$(gh_token)