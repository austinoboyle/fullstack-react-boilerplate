#!/bin/bash
#This file is used to package the app for testing production builds (staging)
rm -rf dist/client dist/views &&
mkdir -p dist/client &&
cp -r server/views server/package.json dist &&
mv server/server.bundle.js server/server.bundle.js.map dist &&
cp -r client/build dist/client