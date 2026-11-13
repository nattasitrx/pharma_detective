import sys,time,json
from playwright.sync_api import sync_playwright
SRC=sys.argv[1]; OUT=sys.argv[2]
with sync_playwright() as p:
    b=p.chromium.launch()
    for day,cut in [(1,60),(4,45),(4,150),(6,40),(3,30),(7,40)]:
        ctx=b.new_context(viewport={'width':390,'height':780},is_mobile=True,has_touch=True); pg=ctx.new_page(); errs=[]; pg.on('pageerror',lambda e:errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto('file://'+SRC+'?fast=1&rec=1'); pg.evaluate("()=>localStorage.clear()"); pg.reload()
        pg.evaluate("()=>{window.__pick=()=>0}"); pg.click(f'#days button[data-n="{day}"]'); pg.click('#start')
        pg.wait_for_function(f'()=>LOG.length>={cut}',timeout=120000)
        snap=pg.evaluate("()=>({run:localStorage.getItem('lee7run7'), txt:document.getElementById('txt').textContent, pic:S.pic, clock:document.getElementById('clock').textContent})")
        n=len(json.loads(snap['run'])['log'])
        pg.goto('about:blank'); pg.goto('file://'+SRC); pg.evaluate("(r)=>localStorage.setItem('lee7run7',r)",snap['run']); pg.reload(); time.sleep(.8)
        vis=pg.evaluate("()=>document.getElementById('resume').textContent")
        t0=time.time(); pg.click('#resume'); pg.wait_for_function("()=>LOG.length>0&&RQ.length===0&&!document.getElementById('ffw').classList.contains('on')",timeout=60000); time.sleep(2.5)
        st=pg.evaluate("()=>({n:LOG.length, txt:document.getElementById('txt').textContent, pic:S.pic, clock:document.getElementById('clock').textContent, acts:document.getElementById('acts').children.length})")
        print(day,cut,'saved',n,'| btn:',vis,'| ff %.1fs'%(time.time()-t0-2.5),'| after',st['n'],st['pic'],st['clock'],'| fast run was at',snap['pic'],snap['clock'],'| errs',errs)
        print('   txt:',st['txt'][:70].replace('\n',' / '))
        pg.screenshot(path=f'{OUT}/res_{day}_{cut}.png')
        # pause button
        pg.click('#pauseB'); time.sleep(.3); print('   pause shown',pg.evaluate("()=>document.getElementById('pause').classList.contains('on')")); pg.click('#pGo')
        ctx.close()
    b.close()
