#!/bin/bash
# (re)start the local test servers: 8100 site_t, 8101 site_o, 8000 site_test + Workers 8788 / 8789
SP="$(cd "$(dirname "$0")" && pwd)"
for p in 8100:site_t 8101:site_o 8000:site_test; do port=${p%%:*}; dir=${p#*:}
  curl -s -o /dev/null --max-time 1 http://localhost:$port/ || (cd $SP/$dir && setsid python3 -m http.server $port >/dev/null 2>&1 &); done
curl -s -o /dev/null --max-time 1 http://localhost:8788/api/config || bash $SP/cf/start_worker.sh 8788 >/dev/null
curl -s -o /dev/null --max-time 1 http://localhost:8789/api/config || bash $SP/cf/start_worker.sh 8789 >/dev/null
sleep 1; for port in 8100 8101 8000; do echo "$port $(curl -s -o /dev/null -w '%{http_code}' http://localhost:$port/)"; done
