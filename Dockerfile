FROM node:16-alpine AS deps
WORKDIR /usr/src/app

COPY ./src/package.json ./src/pnpm-lock.yaml ./
RUN npm install -g pnpm
RUN pnpm install --prod
RUN pnpm prune --prod --no-optional


FROM node:16-alpine

LABEL "com.github.actions.name"="eslint-docker-ga"
LABEL "com.github.actions.description"="Run ESLint on your source code from GitHub workflows"
LABEL "com.github.actions.icon"="align-center"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/permafrost-dev/eslint-docker-ga"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="Patrick Organ <patrick@permafrost.dev>"

COPY ./src /app
COPY --from=deps /usr/src/app/node_modules /app/node_modules/

ADD entrypoint.sh /entrypoint.sh

ENTRYPOINT ["/entrypoint.sh"]
