#!/bin/sh -l

set -e

cd /github/workspace

node /app/action.js $*
