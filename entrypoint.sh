#!/bin/sh -l

set -e

#cd /app

#npm ci

cd /github/workspace

node /app/action.js -- $*

#rm /github/workspace/node_modules
