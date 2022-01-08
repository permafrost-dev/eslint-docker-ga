FROM node:16-alpine

LABEL "com.github.actions.name"="eslint-docker-ga"
LABEL "com.github.actions.description"="Run ESLint on your source code from GitHub workflows"
LABEL "com.github.actions.icon"="align-center"
LABEL "com.github.actions.color"="green"

LABEL "repository"="http://github.com/permafrost-dev/eslint-docker-ga"
LABEL "homepage"="http://github.com/actions"
LABEL "maintainer"="Patrick Organ <patrick@permafrost.dev>"

#COPY ./src/package.json ./src/package-lock.json ./

COPY ./src /app

WORKDIR /app

RUN apk add curl && curl -f https://get.pnpm.io/v6.16.js | node - add --global pnpm && cd /app && pnpm install --prod && pnpm prune --prod && rm -rf ~/.pnpm-store && apk del curl

#RUN  install -g pnpm
#RUN cd /app && pnpm install --prod && rm -rf ~/.pnpm-store

#RUN ln -s ./node_modules /app/node_modules

##@typescript-eslint/eslint-plugin @typescript-eslint/parser eslint typescript

ADD entrypoint.sh /entrypoint.sh
ENTRYPOINT ["/entrypoint.sh"]
