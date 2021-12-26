FROM node:16-alpine

LABEL "com.github.actions.name"="eslint-docker-ga"
LABEL "com.github.actions.description"="Run ESLint on your source code from GitHub workflows"
LABEL "com.github.actions.icon"="align-center"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/permafrost-dev/eslint-docker-ga"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="Patrick Organ <patrick@permafrost.dev>"

COPY ./src /app
RUN cd /app && npm ci

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
