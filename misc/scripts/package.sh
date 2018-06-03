#!/bin/bash
rm -rf dist &&
mkdir -p dist/client &&
cp -r server/server.bundle.js server/views server/package.json dist &&
cp -r client/build dist/client