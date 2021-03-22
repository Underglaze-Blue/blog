#!/usr/bin/env sh
# 确保脚本抛出遇到的错误
set -e
npm run build # 生成静态文件
cd dist # 进入生成的文件夹

# deploy to github
githubUrl=https://Underglaze-Blue:${GITHUB_TOKEN}@github.com/Underglaze-Blue/blog.git
git config --global user.name "Underglaze-Blue"
git config --global user.email "lepapillonangel@gmail.com"
git init
git add -A
git commit -m "deploy"
git push -f $githubUrl master:gh-pages # 推送到github

cd -
rm -rf dist
