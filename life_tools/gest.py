"""Uncle Lee: every gesture at normal speed, with a mouse and with a finger (CDP touch). usage: gest.py index.html OUT"""
import sys, time, json
from playwright.sync_api import sync_playwright
SRC=sys.argv[1]; OUT=sys.argv[2]
R={}
def run(pg, name, js, act, wait=8):
    pg.evaluate(f"()=>{{ window.__ok=window.__ok||{{}}; window.__ok['{name}']=null; Promise.resolve({js}).then(v=>window.__ok['{name}']=(v===undefined?true:v)); }}")
    time.sleep(.4); act()
    t0=time.time()
    while time.time()-t0<wait:
        v=pg.evaluate(f"()=>window.__ok['{name}']")
        if v is not None: R[name]=v; return
        time.sleep(.2)
    R[name]='TIMEOUT'; pg.screenshot(path=f'{OUT}/g_fail_{name}.png')
def box(pg, sel):
    b=pg.locator(sel).first.bounding_box(); return b
with sync_playwright() as p:
    b=p.chromium.launch()
    for mode in ('mouse','touch'):
        ctx=b.new_context(viewport={'width':390,'height':780} if mode=='touch' else {'width':1280,'height':800}, has_touch=(mode=='touch'), is_mobile=(mode=='touch'))
        pg=ctx.new_page(); errs=[]; pg.on('pageerror', lambda e: errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto('file://'+SRC, wait_until='domcontentloaded'); time.sleep(1)
        pg.evaluate("()=>{ const t=document.getElementById('title'); t.classList.add('hidden'); S.en=5; S.money=320; }")
        cdp=ctx.new_cdp_session(pg) if mode=='touch' else None
        def drag(pts, dt=.03):
            if mode=='mouse':
                pg.mouse.move(*pts[0]); pg.mouse.down()
                for q in pts[1:]: pg.mouse.move(*q, steps=3); time.sleep(dt)
                pg.mouse.up()
            else:
                cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':pts[0][0],'y':pts[0][1]}]})
                for q in pts[1:]: cdp.send('Input.dispatchTouchEvent',{'type':'touchMove','touchPoints':[{'x':q[0],'y':q[1]}]}); time.sleep(dt)
                cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
        def tap(x,y):
            if mode=='mouse': pg.mouse.click(x,y)
            else: pg.touchscreen.tap(x,y)
        def press(sel, sec):
            bb=box(pg, sel); x,y=bb['x']+bb['width']/2, bb['y']+bb['height']/2
            if mode=='mouse': pg.mouse.move(x,y); pg.mouse.down(); time.sleep(sec); pg.mouse.up()
            else:
                cdp.send('Input.dispatchTouchEvent',{'type':'touchStart','touchPoints':[{'x':x,'y':y}]}); time.sleep(sec); cdp.send('Input.dispatchTouchEvent',{'type':'touchEnd','touchPoints':[]})
        pg.evaluate("()=>card('lee_resp_closed')"); time.sleep(.6)
        pb=box(pg,'#card .pic'); cx,cy,w,h=pb['x']+pb['width']/2, pb['y']+pb['height']/2, pb['width'], pb['height']
        run(pg,'rub',"rub('x',1.1,'turn')", lambda: [drag([(cx-w*.35,cy),(cx+w*.35,cy),(cx-w*.35,cy),(cx+w*.35,cy),(cx-w*.35,cy)]) for _ in range(1)])
        run(pg,'flick_up',"flick('up','open')", lambda: drag([(cx,cy+h*.25),(cx,cy),(cx,cy-h*.25)]))
        run(pg,'flick_down',"flick('down','close')", lambda: drag([(cx,cy-h*.25),(cx,cy),(cx,cy+h*.25)]))
        run(pg,'flick_right',"flick('right','x')", lambda: drag([(cx-w*.3,cy),(cx,cy),(cx+w*.3,cy)]))
        run(pg,'shake',"shake(4,'shake')", lambda: drag([(cx,cy),(cx,cy-h*.15),(cx,cy+h*.15),(cx,cy-h*.15),(cx,cy+h*.15),(cx,cy-h*.15),(cx,cy+h*.15),(cx,cy-h*.15)]))
        run(pg,'tapPic',"tapPic('tap')", lambda: tap(cx,cy))
        run(pg,'lens',"lens('look',9).then(()=>lensOff(true))", lambda: drag([(pb['x']+pb['width']*(i%6+.5)/6, pb['y']+pb['height']*(i//6+.5)/4) for i in range(24)], .05))
        pg.evaluate("()=>cardOff()")
        # breath press: the breath in starts 2.8 s after it appears
        run(pg,'breathPress',"breathPress()", lambda: (time.sleep(2.8+.35), tap(*(lambda bb:(bb['x']+bb['width']/2,bb['y']+bb['height']/2))(box(pg,'#acts .btn')))), 6)
        run(pg,'ring',"ringGame()", lambda: (time.sleep(1.2+2.7-0.4+0.6), tap(*(lambda bb:(bb['x']+bb['width']/2,bb['y']+bb['height']/2))(box(pg,'#acts .btn')))), 10)
        def stepsAct():
            for i in range(6):
                bb=box(pg,'#feet button[data-f="%s"]'%('L' if i%2==0 else 'R')); tap(bb['x']+bb['width']/2, bb['y']+bb['height']/2); time.sleep(.55)
        run(pg,'steps',"steps({n:6})", stepsAct, 8)
        def feelAct():
            r=box(pg,'#rail'); y=r['y']+r['height']/2; pts=[(r['x']+r['width']*k/100, y) for k in range(0,36)]
            drag(pts, .3)
        run(pg,'feel',"feel({limit:.3})", feelAct, 20)
        def rushAct():
            for i in range(40):
                bb=box(pg,'#hold') if pg.locator('#hold').count() else None
                if not bb: break
                tap(bb['x']+bb['width']/2, bb['y']+bb['height']/2); time.sleep(.25)
        run(pg,'rush',"rush()", rushAct, 30)
        run(pg,'hold',"hold('h',1500,'')", lambda: press('#hold',2.0), 5)
        run(pg,'holdFail',"holdFail('h',1500,.7)", lambda: press('#hold',1.6), 6)
        def walkAct():
            for i in range(12):
                if not pg.locator('#hold').count(): break
                press('#hold',1.4); time.sleep(1.2)
        run(pg,'walk',"walk({limit:.25})", walkAct, 40)
        run(pg,'tapList',"tapList(['a','b','c'],'x ')", lambda: [ (tap(*(lambda bb:(bb['x']+bb['width']/2,bb['y']+bb['height']/2))(box(pg,'#acts .btn'))), time.sleep(.3)) for _ in range(3)])
        run(pg,'choose',"choose([{t:'a'},{t:'b',dis:true},{t:'c'}])", lambda: (time.sleep(.6), tap(*(lambda bb:(bb['x']+bb['width']/2,bb['y']+bb['height']/2))(box(pg,'#acts .btn[data-i=\"2\"]')))))
        # the radio dial (an <input type=range>)
        pg.evaluate("()=>card('radio',{html:'<input id=\"dial\" type=\"range\" min=\"0\" max=\"100\" value=\"4\" step=\"1\">'})"); time.sleep(.5)
        def dialAct():
            d=box(pg,'#dial'); y=d['y']+d['height']/2; drag([(d['x']+d['width']*.04,y)]+[(d['x']+d['width']*k/100,y) for k in range(5,64,4)]+[(d['x']+d['width']*.63,y)], .05)
        run(pg,'dial',"new Promise(res=>{ const d=document.getElementById('dial'); const ck=()=>{ if(Math.abs(+d.value-63)<=3) res(+d.value); }; d.addEventListener('input',ck); d.addEventListener('change',ck); })", dialAct, 6)
        pg.evaluate("()=>cardOff()")
        R[mode+'_errors']=errs
        print(mode, json.dumps({k:v for k,v in R.items()}, ensure_ascii=False)); R.clear()
        ctx.close()
    b.close()
