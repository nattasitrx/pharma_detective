import sys, numpy as np
from PIL import Image, ImageFilter, ImageDraw, ImageEnhance
IMG=sys.argv[1]; BAK=sys.argv[2]
src=Image.open(f'{IMG}/photo.jpg').convert('RGB').crop((360,110,680,560))
src=ImageEnhance.Color(src).enhance(.55).filter(ImageFilter.GaussianBlur(.6))
def coeffs(dst, srcq):
    A=[];B=[]
    for (x,y),(u,v) in zip(dst,srcq):
        A+= [[x,y,1,0,0,0,-u*x,-u*y],[0,0,0,x,y,1,-v*x,-v*y]]; B+=[u,v]
    return np.linalg.solve(np.array(A,float),np.array(B,float)).tolist()
QM=[(512.7,109),(617,100),(617.7,242.7),(513.7,248.7)]
QD=[(563.3,129.3),(670.7,126.7),(670,286.7),(564.3,286.7)]
JOBS={'morning':QM,'noon':QM,'dawn':QM,'night':QM,'pet':QM,'dance':QM,'dusk':QD}
for name,q in JOBS.items():
    room=Image.open(f'{BAK}/{name}.jpg').convert('RGB'); W,H=room.size
    w,h=src.size
    c=coeffs(q,[(0,0),(w,0),(w,h),(0,h)])
    warped=src.transform((W,H),Image.PERSPECTIVE,c,Image.BICUBIC)
    mask=Image.new('L',(W,H),0); ImageDraw.Draw(mask).polygon(q,fill=255); mask=mask.filter(ImageFilter.GaussianBlur(.8))
    # match the light of the old picture in this room (per channel mean / spread)
    m=np.asarray(mask)>128; R=np.asarray(room).astype(float); Wp=np.asarray(warped).astype(float); out=Wp.copy()
    for ch in range(3):
        a=Wp[...,ch][m]; b=R[...,ch][m]
        out[...,ch]=(Wp[...,ch]-a.mean())/(a.std()+1e-6)*(b.std()*.85)+b.mean()
    warped=Image.fromarray(np.clip(out,0,255).astype('uint8'))
    res=Image.composite(warped,room,mask)
    res.save(f'{IMG}/{name}.jpg',quality=86)
    print(name,'ok')
