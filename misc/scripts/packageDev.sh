#!/bin/bash
rm -rf dist/client dist/views &&
mkdir -p dist/client &&
cp -r server/views server/package.json dist &&
mv server/server.bundle.js server/server.bundle.js.map dist &&
cp -r client/build dist/client