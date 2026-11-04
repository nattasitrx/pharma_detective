"""Tools to edit text on the bag images by moving real glyphs around (so the new text looks printed by the same printer)."""
import subprocess, os, tempfile
from PIL import Image
import numpy as np
from scipy import ndimage
S=3
def boxes(im):
    """tesseract character boxes in image coordinates (top-left origin): list of (ch,x0,y0,x1,y1)"""
    g=im.convert('L').resize((im.width*S, im.height*S), Image.LANCZOS)
    d=tempfile.mkdtemp(); p=os.path.join(d,'i.png'); g.save(p)
    subprocess.run(['tesseract',p,os.path.join(d,'o'),'-l','eng','--psm','11','makebox'],capture_output=True)
    out=[]
    for ln in open(os.path.join(d,'o.box'),encoding='utf-8'):
        ch,a,b,c,e,_=ln.rstrip('\n').rsplit(' ',5); a,b,c,e=map(int,(a,b,c,e))
        out.append((ch, a/S, (g.height-e)/S, c/S, (g.height-b)/S))
    return out
def ink(arr, thr=40):
    """non-background mask: distance from white"""
    return (255-arr.min(axis=2))>thr
def comps(im, box, thr=40):
    """connected ink components inside box (x0,y0,x1,y1): list of (x0,y0,x1,y1,mask_full) sorted by x"""
    a=np.asarray(im.convert('RGB')).astype(int); x0,y0,x1,y1=[int(round(v)) for v in box]
    m=np.zeros(a.shape[:2],bool); m[y0:y1,x0:x1]=ink(a,thr)[y0:y1,x0:x1]
    lab,n=ndimage.label(m, structure=np.ones((3,3)))
    res=[]
    for i in range(1,n+1):
        ys,xs=np.where(lab==i)
        if len(xs)<3: continue
        res.append([xs.min(),ys.min(),xs.max()+1,ys.max()+1])
    res.sort()
    return res
def glyph_region(im, box, thr=40, pad=1):
    """union bbox of ink inside box, padded to catch the soft edge"""
    cs=comps(im, box, thr); assert cs, ('no ink', box)
    x0=min(c[0] for c in cs); y0=min(c[1] for c in cs); x1=max(c[2] for c in cs); y1=max(c[3] for c in cs)
    return (x0-pad, y0-pad, x1+pad, y1+pad)
def soft_mask(im, region, thr=6):
    """alpha mask of everything not-white in region (soft edges included)"""
    a=np.asarray(im.convert('RGB').crop(region)).astype(int)
    return (255-a.min(axis=2))>thr
def erase(im, region, color=(255,255,255)):
    im.paste(Image.new('RGB',(region[2]-region[0],region[3]-region[1]),color),(region[0],region[1]))
def stamp(dst, src, region, at):
    """copy the glyph pixels (soft mask) of src region to dst with its top-left at 'at'"""
    piece=src.convert('RGB').crop(region); m=soft_mask(src, region)
    mask=Image.fromarray((m*255).astype('uint8'))
    # darken-only blend: keep the darker of existing and pasted pixel
    base=dst.crop((at[0],at[1],at[0]+piece.width,at[1]+piece.height))
    out=Image.fromarray(np.minimum(np.asarray(base),np.asarray(piece)).astype('uint8'))
    dst.paste(out,(at[0],at[1]),mask)
def zoom(im, region, f=6, pad=10):
    x0,y0,x1,y1=region; c=im.crop((max(0,x0-pad),max(0,y0-pad),x1+pad,y1+pad)); return c.resize((c.width*f,c.height*f),Image.NEAREST)

# ---- cleaner glyph copies: only the glyph's own strokes (+1px soft edge), black text only ----
def core(im, box, thr=40):
    """mask (full-size bool array) of ink components that lie mostly inside box"""
    a=np.asarray(im.convert('RGB')).astype(int); x0,y0,x1,y1=[int(round(v)) for v in box]
    m=np.zeros(a.shape[:2],bool); m[max(0,y0-3):y1+3,max(0,x0-3):x1+3]=ink(a,thr)[max(0,y0-3):y1+3,max(0,x0-3):x1+3]
    lab,n=ndimage.label(m, structure=np.ones((3,3))); keep=np.zeros_like(m)
    for i in range(1,n+1):
        ys,xs=np.where(lab==i); cx,cy=xs.mean(),ys.mean()
        if x0<=cx<=x1 and y0<=cy<=y1 and len(xs)>=2: keep|=(lab==i)
    return keep
def piece(im, box, thr=40):
    """(rgb crop, alpha mask, bbox) of the glyph in box: core strokes dilated by 1px, limited to non-white"""
    k=core(im, box, thr); assert k.any(), ('empty glyph', box)
    a=np.asarray(im.convert('RGB')).astype(int)
    soft=ndimage.binary_dilation(k, structure=np.ones((3,3))) & ((255-a.min(axis=2))>6)
    ys,xs=np.where(soft); bb=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
    crop=im.convert('RGB').crop(bb); mask=Image.fromarray((soft[bb[1]:bb[3],bb[0]:bb[2]]*255).astype('uint8'))
    return crop, mask, bb, k
def darkness(im, box):
    """mean colour of the glyph's core ink, and its saturation"""
    k=core(im, box); a=np.asarray(im.convert('RGB')).astype(int)[k]
    if not len(a): return 999, 999
    mean=a.mean(axis=0); return mean.mean(), mean.max()-mean.min()
def put_piece(dst, pc, at):
    crop,mask,bb,_=pc; dst.paste(crop,(int(at[0]),int(at[1])),mask)
def erase_glyph(im, box, color=(255,255,255)):
    k=core(im, box); k=ndimage.binary_dilation(k, structure=np.ones((3,3)))
    a=np.asarray(im.convert('RGB')).copy(); a[k]=color; im.paste(Image.fromarray(a.astype('uint8')))

# ---- identify glyphs by shape (tesseract boxes are only hints) ----
from PIL import ImageFont, ImageDraw
SERIF='/usr/share/fonts/truetype/liberation/LiberationSerif-Regular.ttf'
def comp_list(im, box, thr=40):
    """[(bbox, mask_full)] of ink components with centroid inside box, sorted by x"""
    a=np.asarray(im.convert('RGB')).astype(int); x0,y0,x1,y1=[int(round(v)) for v in box]
    m=np.zeros(a.shape[:2],bool); Y0,Y1,X0,X1=max(0,y0-4),y1+4,max(0,x0-4),x1+4
    m[Y0:Y1,X0:X1]=ink(a,thr)[Y0:Y1,X0:X1]
    lab,n=ndimage.label(m, structure=np.ones((3,3))); out=[]
    for i in range(1,n+1):
        ys,xs=np.where(lab==i)
        if len(xs)<2: continue
        if x0<=xs.mean()<=x1 and y0<=ys.mean()<=y1: out.append(((xs.min(),ys.min(),xs.max()+1,ys.max()+1), lab==i))
    out.sort(key=lambda c:c[0][0]); return out
def template(ch, h):
    """binary mask of ch drawn in a Times-like serif, scaled so its ink height is h"""
    f=ImageFont.truetype(SERIF, 200); im=Image.new('L',(260,260),0); ImageDraw.Draw(im).text((20,10),ch,font=f,fill=255)
    a=np.asarray(im)>128; ys,xs=np.where(a); a=a[ys.min():ys.max()+1, xs.min():xs.max()+1]
    return a
def shape_score(mask, bb, ch):
    sub=mask[bb[1]:bb[3], bb[0]:bb[2]].astype('uint8')*255
    t=template(ch, bb[3]-bb[1]); ti=Image.fromarray((t*255).astype('uint8')).resize((sub.shape[1],sub.shape[0]),Image.BILINEAR)
    A=sub>0; B=np.asarray(ti)>100
    ar_t=t.shape[1]/t.shape[0]; ar_c=sub.shape[1]/sub.shape[0]
    iou=(A&B).sum()/max(1,(A|B).sum())
    return iou - 2*abs(ar_t-ar_c)
def piece_from_mask(im, k):
    a=np.asarray(im.convert('RGB')).astype(int)
    soft=ndimage.binary_dilation(k, structure=np.ones((3,3))) & ((255-a.min(axis=2))>6)
    ys,xs=np.where(soft); bb=(xs.min(),ys.min(),xs.max()+1,ys.max()+1)
    crop=im.convert('RGB').crop(bb); mask=Image.fromarray((soft[bb[1]:bb[3],bb[0]:bb[2]]*255).astype('uint8'))
    kb=np.where(k); cb=(kb[1].min(),kb[0].min(),kb[1].max()+1,kb[0].max()+1)
    return crop, mask, bb, cb
def find_glyph(im, ch, h, bx=None, color_ref=None, exclude=(), tol=1.3, min_score=0.55):
    """best clean single-component copy of ch at ink height ~h anywhere in im (black text)"""
    a=np.asarray(im.convert('RGB')).astype(int)
    m=ink(a,40); lab,n=ndimage.label(m, structure=np.ones((3,3))); best=None
    objs=ndimage.find_objects(lab)
    for i,sl in enumerate(objs,1):
        hh=sl[0].stop-sl[0].start; ww=sl[1].stop-sl[1].start
        if abs(hh-h)>tol or ww<2 or ww>h: continue
        bb=(sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)
        if any(not (bb[2]<=e[0] or e[2]<=bb[0] or bb[3]<=e[1] or e[3]<=bb[1]) for e in exclude): continue
        k=(lab==i); px=a[k]; mean=px.mean(axis=0)
        if mean.max()-mean.min()>30: continue                      # coloured text
        if color_ref is not None and abs(mean.mean()-color_ref)>30: continue
        sc=shape_score(k, bb, ch)
        if best is None or sc>best[0]: best=(sc, k, bb)
    assert best and best[0]>=min_score, ('glyph not found', ch, h, best and best[0])
    return best
def classify(k, bb, chars='0123456789'):
    sc={c:shape_score(k,bb,c) for c in chars}; best=max(sc,key=sc.get); return best, sc[best], sc
_find=find_glyph
def find_glyph(im, ch, h, bx=None, color_ref=None, exclude=(), tol=1.3, min_score=0.35, chars=None):
    """best clean single-component copy of ch (it must also be classified as ch among its peers)"""
    chars=chars or ('0123456789' if ch.isdigit() else ch)
    a=np.asarray(im.convert('RGB')).astype(int)
    m=ink(a,40); lab,n=ndimage.label(m, structure=np.ones((3,3))); best=None
    for i,sl in enumerate(ndimage.find_objects(lab),1):
        hh=sl[0].stop-sl[0].start; ww=sl[1].stop-sl[1].start
        if abs(hh-h)>tol or ww<2 or ww>h: continue
        bb=(sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)
        if any(not (bb[2]<=e[0] or e[2]<=bb[0] or bb[3]<=e[1] or e[3]<=bb[1]) for e in exclude): continue
        k=(lab==i); mean=a[k].mean(axis=0)
        if mean.max()-mean.min()>30: continue
        if color_ref is not None and abs(mean.mean()-color_ref)>30: continue
        cl,sc,_=classify(k,bb,chars)
        if cl!=ch or sc<min_score: continue
        if best is None or sc>best[0]: best=(sc,k,bb)
    assert best, ('glyph not found', ch, h)
    return best
# grayscale normalised cross-correlation against an anti-aliased serif template (works at ~11px)
_tcache={}
def gtemplate(ch, w, h):
    key=(ch,w,h)
    if key in _tcache: return _tcache[key]
    f=ImageFont.truetype(SERIF, 160); im=Image.new('L',(220,220),0); ImageDraw.Draw(im).text((20,10),ch,font=f,fill=255)
    a=np.asarray(im); ys,xs=np.where(a>60); im=im.crop((xs.min(),ys.min(),xs.max()+1,ys.max()+1)).resize((w,h),Image.LANCZOS)
    t=np.asarray(im).astype(float)/255; _tcache[key]=t; return t
def ncc_score(img_arr, k, bb, ch):
    x0,y0,x1,y1=bb; sub=(255-img_arr[y0:y1,x0:x1].min(axis=2)).astype(float)/255
    kk=k[y0:y1,x0:x1]; sub=sub*ndimage.binary_dilation(kk,structure=np.ones((3,3)))
    t=gtemplate(ch, x1-x0, y1-y0)
    a=sub-sub.mean(); b=t-t.mean(); return float((a*b).sum()/np.sqrt((a*a).sum()*(b*b).sum()+1e-9))
def classify(k, bb, chars='0123456789', img=None):
    arr=np.asarray(img.convert('RGB')).astype(int) if img is not None else None
    sc={c:(ncc_score(arr,k,bb,c) if arr is not None else shape_score(k,bb,c)) for c in chars}
    best=max(sc,key=sc.get); return best, sc[best], sc
def find_glyph(im, ch, h, bx=None, color_ref=None, exclude=(), tol=1.3, min_score=0.6, chars=None):
    chars=chars or ('0123456789' if ch.isdigit() else ch)
    a=np.asarray(im.convert('RGB')).astype(int)
    m=ink(a,40); lab,n=ndimage.label(m, structure=np.ones((3,3))); best=None
    for i,sl in enumerate(ndimage.find_objects(lab),1):
        hh=sl[0].stop-sl[0].start; ww=sl[1].stop-sl[1].start
        if abs(hh-h)>tol or ww<2 or ww>h: continue
        bb=(sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)
        if any(not (bb[2]<=e[0] or e[2]<=bb[0] or bb[3]<=e[1] or e[3]<=bb[1]) for e in exclude): continue
        k=(lab==i); mean=a[k].mean(axis=0)
        if mean.max()-mean.min()>30: continue
        if color_ref is not None and abs(mean.mean()-color_ref)>30: continue
        sc={c:ncc_score(a,k,bb,c) for c in chars}; cl=max(sc,key=sc.get)
        if cl!=ch or sc[cl]<min_score: continue
        margin=sc[cl]-max([v for c,v in sc.items() if c!=cl] or [0])
        if best is None or (sc[cl]+margin)>best[0]: best=(sc[cl]+margin,k,bb)
    assert best, ('glyph not found', ch, h)
    return best
def find_glyph(im, ch, h, bx=None, color_ref=None, exclude=(), tol=1.3, min_score=0.1, chars=None):
    """a clean single-component copy of ch: tesseract must read it as ch AND the serif template must agree"""
    chars=chars or ('0123456789' if ch.isdigit() else ch)
    if bx is None: bx=boxes(im)
    hints=[((b[1]+b[3])/2,(b[2]+b[4])/2) for b in bx if b[0]==ch]
    a=np.asarray(im.convert('RGB')).astype(int)
    m=ink(a,40); lab,n=ndimage.label(m, structure=np.ones((3,3))); best=None
    for i,sl in enumerate(ndimage.find_objects(lab),1):
        hh=sl[0].stop-sl[0].start; ww=sl[1].stop-sl[1].start
        if abs(hh-h)>tol or ww<2 or ww>h: continue
        bb=(sl[1].start,sl[0].start,sl[1].stop,sl[0].stop)
        if not any(bb[0]-1<=cx<=bb[2]+1 and bb[1]-1<=cy<=bb[3]+1 for cx,cy in hints): continue
        if any(not (bb[2]<=e[0] or e[2]<=bb[0] or bb[3]<=e[1] or e[3]<=bb[1]) for e in exclude): continue
        k=(lab==i); mean=a[k].mean(axis=0)
        if mean.max()-mean.min()>30: continue
        if color_ref is not None and abs(mean.mean()-color_ref)>30: continue
        sc={c:ncc_score(a,k,bb,c) for c in chars}; cl=max(sc,key=sc.get)
        if cl!=ch or sc[cl]<min_score: continue
        if best is None or sc[cl]>best[0]: best=(sc[cl],k,bb)
    assert best, ('glyph not found', ch, h)
    return best

# ---- CJK lines: equal-advance character cells ----
def band(im, x0, x1, y_guess, search=14, thr=60):
    """the text line (ink rows) nearest y_guess between x0..x1: returns (xmin,ymin,xmax,ymax)"""
    a=np.asarray(im.convert('RGB')).astype(int); m=ink(a,thr)[:, x0:x1]
    rows=m.any(axis=1); y=y_guess
    # move to an ink row
    cand=[r for r in range(max(0,y-search), min(len(rows),y+search)) if rows[r]]
    assert cand, ('no ink near', y_guess)
    y=min(cand,key=lambda r:abs(r-y_guess)); ya=y; yb=y
    while ya>0 and rows[ya-1]: ya-=1
    while yb<len(rows)-1 and rows[yb+1]: yb+=1
    cols=np.where(m[ya:yb+1].any(axis=0))[0]
    return (x0+cols.min(), ya, x0+cols.max()+1, yb+1)
def cells(bb, n, adv=None):
    x0,y0,x1,y1=bb; adv=adv or (x1-x0)/n
    return [(round(x0+i*adv), y0, round(x0+(i+1)*adv), y1) for i in range(n)], adv
def cell_piece(im, cell, pad=1):
    x0,y0,x1,y1=cell; reg=(x0-pad,y0-pad,x1+pad,y1+pad)
    crop=im.convert('RGB').crop(reg); a=np.asarray(crop).astype(int)
    m=ndimage.binary_dilation(ink(a,40),structure=np.ones((3,3))) & ((255-a.min(axis=2))>6)
    return crop, Image.fromarray((m*255).astype('uint8')), reg
def wipe(im, reg, color=(255,255,255)):
    im.paste(Image.new('RGB',(reg[2]-reg[0],reg[3]-reg[1]),color),(reg[0],reg[1]))
def write_cells(im, x, ytop, pieces, adv):
    """paste cell pieces left to right starting at cell x, top ytop (cell coords)"""
    for i,(crop,mask,reg) in enumerate(pieces):
        im.paste(crop,(round(x+i*adv)-1, ytop-1),mask)
