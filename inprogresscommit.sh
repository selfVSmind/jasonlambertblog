#!/usr/bin/env bash

git config --global user.name "Jason Lambert"
git config --global user.email "pitbullent@gmail.com"

git config --global core.autocrlf false

git add .
git commit -a -m "post in progress"
git push
