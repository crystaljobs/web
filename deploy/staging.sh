#!/usr/bin/env sh

set -e

yarn build:staging
cd dist
git init
git add -A
git commit -m "deploy"

git push -f git@github.com:crystaljobs/web.git master:deploy-staging
