import json,base64,sys,os
d=json.load(open(sys.argv[1]))
for k,b in d.items():
    assert k.isalnum(); raw=base64.b64decode(b); assert raw[:3]==b'ID3' or raw[0]==0xff,(k,raw[:4]); open(os.path.join(sys.argv[2],k+'.mp3'),'wb').write(raw); print(k,len(raw))
