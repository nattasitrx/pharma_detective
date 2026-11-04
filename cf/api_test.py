"""API checks against the local Worker (port 8788)."""
import json, urllib.request, urllib.error, sys
B = sys.argv[1] if len(sys.argv) > 1 else 'http://localhost:8788'
K = {'X-Teacher-Key': 'TEST-KEY'}
fails = []
def call(method, path, body=None, headers=None, ctype='text/plain;charset=UTF-8'):
    h = dict(headers or {})
    data = None
    if body is not None:
        data = body.encode() if isinstance(body, str) else body; h['Content-Type'] = ctype
    req = urllib.request.Request(B + path, data=data, method=method, headers=h)
    try:
        with urllib.request.urlopen(req) as r: return r.status, r.read().decode(), {k.lower():v for k,v in r.headers.items()}
    except urllib.error.HTTPError as e: return e.code, e.read().decode(), {k.lower():v for k,v in e.headers.items()}
def check(name, cond, extra=''):
    print(('PASS ' if cond else 'FAIL ') + name, extra if not cond else '')
    if not cond: fails.append(name)

st, b, h = call('GET', '/api/health'); j = json.loads(b)
check('health', st == 200 and j['ok'] and j['db'] and j['keySet'], b)
check('cors', h.get('access-control-allow-origin') == '*')
st, b, h = call('OPTIONS', '/api/config'); check('preflight', st == 204 and 'X-Teacher-Key' in h.get('access-control-allow-headers', ''))
st, b, _ = call('GET', '/'); check('home page', st == 200 and 'Pharma Detective' in b)

# submissions: newer replaces, older is ignored
def snap(i, cls, upd, name='Stu', done=False, extra=None):
    s = {'id': f'PDtest{i}', 'classCode': cls, 'updated': upd, 'student': {'name': name, 'sid': f'S{i}'}, 'done': done, 'score': i, 'txt': '陳伯 ลุงเฉิน 🧓' }
    if extra: s.update(extra)
    return json.dumps(s, ensure_ascii=False)
st, b, _ = call('POST', '/api/submit', snap(1, 'ph2026a', '2026-10-22T10:00:00Z')); check('submit', st == 200 and json.loads(b)['ok'], b)
st, b, _ = call('POST', '/api/submit', snap(1, 'ph2026a', '2026-10-22T10:05:00Z', name='Newer')); check('submit newer', json.loads(b)['stale'] is False, b)
st, b, _ = call('POST', '/api/submit', snap(1, 'ph2026a', '2026-10-22T09:00:00Z', name='Older')); check('older is stale', json.loads(b)['stale'] is True, b)
st, b, _ = call('POST', '/api/submit', '{bad'); check('bad json 400', st == 400)
st, b, _ = call('POST', '/api/submit', '{"x":1}'); check('no id 400', st == 400)
st, b, _ = call('POST', '/api/submit', 'x' * 1_900_000); check('too large 413', st == 413)
for i in range(2, 131):
    call('POST', '/api/submit', snap(i, 'ph2026a' if i % 2 else 'ph2026b', '2026-10-22T10:00:00Z', done=i % 3 == 0))
call('POST', '/api/submit', snap(999, None, '2026-10-22T10:00:00Z'))

st, b, _ = call('GET', '/api/sessions'); check('sessions need key', st == 401)
st, b, _ = call('GET', '/api/sessions', headers={'X-Teacher-Key': 'WRONG'}); check('wrong key 401', st == 401 and json.loads(b)['error'] == 'unauthorized')
got, after, pages, classes = [], '', 0, None
while after is not None:
    st, b, _ = call('GET', '/api/sessions' + (f'?offset={after}' if after else ''), headers=K); j = json.loads(b)
    pages += 1; got += j['sessions']; classes = j.get('classes', classes); after = j['next']
ids = [s['id'] for s in got]
check('paging gets all 131', len(got) == 131 and len(set(ids)) == 131, f'{len(got)} {pages}')
check('3 pages', pages == 3, pages)
check('classes counted', classes == {'ph2026a': 65, 'ph2026b': 65, 'main': 1}, classes)
s1 = next(s for s in got if s['id'] == 'PDtest1')
check('newest kept + utf8', s1['student']['name'] == 'Newer' and s1['txt'] == '陳伯 ลุงเฉิน 🧓' and 'serverAt' in s1, s1)
st, b, _ = call('GET', '/api/sessions?class=ph2026b', headers=K); j = json.loads(b)
check('class filter', all(s['classCode'] == 'ph2026b' for s in j['sessions']) and len(j['sessions']) == 60 and j['next'], len(j['sessions']))

# settings
st, b, _ = call('GET', '/api/config?class=ph2026a'); j = json.loads(b); check('no config yet', j['ok'] and j['config'] is None, b)
st, b, _ = call('PUT', '/api/config?class=*', '{"settings":{"VISIT_MIN":45}}'); check('put needs key', st == 401)
big_img = 'data:image/jpeg;base64,' + 'A' * 1_500_000
cfg_all = json.dumps({'settings': {'VISIT_MIN': 45}, 'texts': {'陳伯': ['陳伯伯', 'Uncle C', 'ลุงซี 🧓']}, 'media': {'labImages': [big_img, big_img]}}, ensure_ascii=False)
st, b, _ = call('PUT', '/api/config?class=*&note=Fall%202026', cfg_all, headers=K); j = json.loads(b)
check('put all-links config (3 MB, chunked)', st == 200 and j['ok'] and j['cls'] == '*' and j['parts'] >= 2, b)
st, b, _ = call('GET', '/api/config?class=ph2026a'); j = json.loads(b)
check('class falls back to all-links', j['cls'] == '*' and j['config']['settings']['VISIT_MIN'] == 45 and j['note'] == 'Fall 2026' and j['config']['texts']['陳伯'][2] == 'ลุงซี 🧓' and len(j['config']['media']['labImages'][1]) == len(big_img), j['cls'])
st, b, _ = call('PUT', '/api/config?class=ph2026b', '{"settings":{"mode":"exam"}}', headers=K); check('put class config', st == 200)
st, b, _ = call('GET', '/api/config?class=ph2026b'); j = json.loads(b); check('class override wins', j['cls'] == 'ph2026b' and j['config']['settings']['mode'] == 'exam')
st, b, _ = call('GET', '/api/config'); j = json.loads(b); check('no class -> all-links', j['cls'] == '*')
st, b, _ = call('GET', '/api/config?class=ph2026a&exact=1'); j = json.loads(b); check('exact lookup', j['config'] is None)
st, b, _ = call('GET', '/api/config?class=*&exact=1'); j = json.loads(b); check('exact all-links', j['cls'] == '*')
st, b, _ = call('GET', '/api/configs', headers=K); j = json.loads(b)
check('list configs', [c['cls'] for c in j['configs']] == ['*', 'ph2026b'] and abs(j['configs'][0]['size'] - len(cfg_all)) <= 2, j)
st, b, _ = call('PUT', '/api/config?class=*', 'not json', headers=K); check('put bad 400', st == 400)
# surrogate pair right at a chunk edge survives
edge = '{"t":"' + 'a' * (600_000 - 7) + '😀' + 'b' * 10 + '"}'
call('PUT', '/api/config?class=edge', edge, headers=K)
st, b, _ = call('GET', '/api/config?class=edge'); j = json.loads(b); check('emoji on chunk edge', j['config']['t'].endswith('😀' + 'b' * 10))
st, b, _ = call('DELETE', '/api/config?class=ph2026b', headers=K); check('withdraw class config', json.loads(b)['deleted'] == 1)
st, b, _ = call('GET', '/api/config?class=ph2026b'); check('back to all-links', json.loads(b)['cls'] == '*')

st, b, _ = call('DELETE', '/api/sessions?class=ph2026a&id=PDtest1', headers=K); check('delete one', json.loads(b)['deleted'] == 1)
st, b, _ = call('DELETE', '/api/sessions?class=ph2026b', headers=K); check('delete class', json.loads(b)['deleted'] == 65)
st, b, _ = call('DELETE', '/api/sessions', headers=K); check('delete needs class', st == 400)
st, b, _ = call('GET', '/api/nothing'); check('404', st == 404)
print('FAILS', fails)
