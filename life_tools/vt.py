"""virtual play time of Uncle Lee: instrument a copy, play 7 days in fast mode, add up the time a real player would spend"""
import sys, re, time, os, shutil
from playwright.sync_api import sync_playwright
def instrument(src, dst):
    s=open(src,encoding='utf-8').read()
    def sub(a,b):
        nonlocal s; assert a in s, a[:60]; s=s.replace(a,b,1)
    sub("const W=ms=>sleep(FAST?Math.min(ms,30):ms);","window.VT=0; const RD=t=>{ VT+=String(t).replace(/<[^>]*>/g,'').length/16*1000; }; const W=ms=>{ VT+=ms; return sleep(FAST?Math.min(ms,30):ms); };")
    sub("for(const line of list){ el.classList.remove('on');","for(const line of list){ RD(line); VT+=600; el.classList.remove('on');")
    sub("function choose(opts){ return new Promise(res=>{","function choose(opts){ VT+=2500+opts.reduce((a,o)=>a+String(o.t).length,0)/20*1000; return new Promise(res=>{")
    for name,ms in [('hold(label, ms, hint){',None),('holdFail(label, ms, at){',None)]:
        sub('function '+name, 'function '+name+' VT+=ms*1.1;')
    for name,ms in [('rub(axis, need, label){',3000),('flick(dir, label){',1500),('shake(n, label){',2000),('tapPic(label){',1500),('lens(label, need){',5000),('breathPress(){',4500),('ringGame(){',4500),('feel({limit}){',10000),('rush(){',12000),('tapList(labels, pre){',4000)]:
        sub('function '+name, 'function '+name+' VT+=%d;'%ms)
    sub("function steps({n, limit, from, easy, origin, zoom}){","function steps({n, limit, from, easy, origin, zoom}){ VT+=(n||14)*((limit==null?1:limit)-(from||0))*650;")
    sub("function walk({stairs, limit, total, night, hurry}){","function walk({stairs, limit, total, night, hurry}){ VT+=13500*(limit||1)*1.3;")
    sub("function tapPills(n){","function tapPills(n){ VT+=n*450;")
    open(dst,'w',encoding='utf-8').write(s)
out={}
with sync_playwright() as p:
    b=p.chromium.launch()
    for tag,src in [('before',sys.argv[1]),('after',sys.argv[2])]:
        d=os.path.dirname(src); dst=os.path.join(d,'_vt_'+tag+'.html'); instrument(src,dst)
        res=[]
        for pick in ['()=>0','(o)=>o.length-1']:
            pg=b.new_page(viewport={'width':390,'height':780}); pg.route('**/*fonts.g*/**', lambda r: r.abort())
            pg.goto('file://'+dst+'?fast=1'); pg.evaluate("()=>localStorage.clear()"); pg.reload()
            per=[]
            for dd in range(1,8):
                pg.evaluate(f"()=>{{window.__pick={pick}; window.__order=['dog','photo','calendar','phone','pot']; window.__done=null; VT=0;}}")
                pg.click('#start') if dd==1 else pg.click(f'#dbtn .btn[data-go="{dd}"]')
                pg.wait_for_function('()=>window.__done', timeout=200000); time.sleep(.3)
                per.append(pg.evaluate('()=>VT')/60000)
            res.append(per); pg.close()
        os.remove(dst)
        avg=[(a+b_)/2 for a,b_ in zip(*res)]
        print(tag, ' '.join('d%d %.1f'%(i+1,v) for i,v in enumerate(avg)), '| total %.1f min'%sum(avg))
    b.close()
