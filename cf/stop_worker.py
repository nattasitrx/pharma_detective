import os, signal, sys
port = sys.argv[1] if len(sys.argv) > 1 else '8788'
me = os.getpid()
for p in os.listdir('/proc'):
    if not p.isdigit() or int(p) == me: continue
    try: cmd = open(f'/proc/{p}/cmdline', 'rb').read().split(b'\0')
    except Exception: continue
    if len(cmd) > 2 and cmd[0].endswith(b'node') and cmd[1].endswith(b'local_worker.mjs') and cmd[2] == port.encode():
        os.kill(int(p), signal.SIGTERM); print('stopped', p)
