import json, base64, sys, io, os
from PIL import Image
src, dst = sys.argv[1], sys.argv[2]
d = json.load(open(src, encoding='utf-8')); n = 0; tot = 0
for k, b in d.items():
    assert k.replace('_', '').isalnum(), k
    raw = base64.b64decode(b); im = Image.open(io.BytesIO(raw)); im.load(); assert im.format == 'JPEG', (k, im.format)
    im = im.convert('RGB'); im.save(os.path.join(dst, k + '.jpg'), quality=86, optimize=True); n += 1; tot += os.path.getsize(os.path.join(dst, k + '.jpg'))
    if n <= 3 or im.size[0] != 1024: print(k, im.size)
print(n, 'pictures', round(tot / 1e6, 1), 'MB')
