#!/bin/bash
# start_worker.sh PORT [dbfile]
CF="$(cd "$(dirname "$0")" && pwd)"
python3 $CF/stop_worker.py ${1:-8788} >/dev/null; sleep 0.3
cd $CF && (setsid node local_worker.mjs ${1:-8788} $CF/cloudflare/src/index.js ${2:-:memory:} > $CF/w${1:-8788}.log 2>&1 &)
for i in $(seq 1 30); do grep -q "worker on" $CF/w${1:-8788}.log 2>/dev/null && break; sleep 0.2; done; grep -c "worker on" $CF/w${1:-8788}.log
