"""Read / replace the base64 PNG bag images embedded in the game sources."""
import re, base64, io
from PIL import Image
SRC={'a':'g3img.js','c':'cd/c_orig_pregames.html','d':'cd/d_orig_presim.html'}
def _pat(key): return re.compile(r"(\b"+re.escape(key)+r":')data:image/png;base64,([A-Za-z0-9+/=]+)(')")
def get(case, key):
    s=open(SRC[case],encoding='utf-8').read(); m=_pat(key).search(s); assert m, (case,key)
    return Image.open(io.BytesIO(base64.b64decode(m.group(2)))).copy()
def keys(case):
    s=open(SRC[case],encoding='utf-8').read(); return re.findall(r"\b([a-z_0-9]+):'data:image/png;base64,", s)
def put(case, key, im):
    s=open(SRC[case],encoding='utf-8').read(); m=_pat(key).search(s); assert m and len(_pat(key).findall(s))==1, (case,key)
    b=io.BytesIO(); im.save(b,'PNG',optimize=True); data=base64.b64encode(b.getvalue()).decode()
    s=s[:m.start(2)]+data+s[m.end(2):]; open(SRC[case],'w',encoding='utf-8').write(s)
