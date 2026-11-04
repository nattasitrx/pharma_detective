#!/bin/bash
# refresh site_t in place (servers keep their cwd) with the local Worker address
SP="$(cd "$(dirname "$0")" && pwd)"
cp -r $SP/site/. $SP/site_t/
for f in $SP/site_t/case-*/index.html; do sed -i "s#SERVER_URL:'https://pharma-detective-api.nattasitrx.workers.dev',#SERVER_URL:'http://localhost:8788',#" $f; echo "$f $(grep -c 'localhost:8788' $f)"; done
