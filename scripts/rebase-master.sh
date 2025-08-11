#!/bin/bash
# 使用方法：
# yarn rebase-master
set -e

git checkout main
git fetch upstream
git rebase upstream/main
git push