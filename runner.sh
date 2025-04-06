#!/bin/bash
cd cloud-frontend
npm i
cd ../cloudTry3
npm i
cd ..
(cd cloud-frontend && npm run dev) & (cd cloudTry3 && npm run dev)
