#!/usr/bin/env sh

set -e

rm -rf target

mkdir target

for file in $(find ./dist/ -name "*.png"); do 
  cp $file ./target/
done