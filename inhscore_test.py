"""Inhaler technique score: nothing done = 0/8, only the cap = 1/8, a hint costs a point; perfect runs are covered by test_case.py."""
import os, time, re
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
fails=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
with sync_playwright() as p:
    b=p.chromium.launch()
    def run(dev, steps, lang='zh'):
        pg=b.new_page(viewport={'width':1440,'height':810}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto(f'http://localhost:8100/case-d/?lang={lang}'); time.sleep(2.5)
        pg.evaluate("(d)=>{ document.querySelector('#title').classList.add('hidden'); window.__r=null; inhSim(d).then(r=>window.__r=r); }", dev); time.sleep(1.2)
        for st in steps:
            if st=='hint': pg.evaluate("()=>document.querySelector('#simHintBtn').click()")
            else: pg.evaluate("(s)=>document.querySelector('#simDevG '+s).dispatchEvent(new MouseEvent('click',{bubbles:true}))", st)
            time.sleep(0.5)
        pg.evaluate("()=>document.querySelector('#simDone').click()"); time.sleep(0.8)
        card=pg.inner_text('.is-sum .card'); pg.screenshot(path=f't24/score_{dev}_{len(steps)}.png')
        pg.evaluate("()=>document.querySelector('#simCont').click()"); time.sleep(0.6)
        r=pg.evaluate("()=>window.__r"); pg.close(); return card, r, errs
    card,r,e=run('mdi',[]); m=re.search(r'(\d+)/8',card)
    check('mdi, nothing done → 0/8', m and m.group(1)=='0' and r['score']['pts']==0, (card[:120], r and r.get('score')))
    card,r,e=run('mdi',['.sd-cap']); m=re.search(r'(\d+)/8',card)
    check('mdi, only the cap off → 1/8', m and m.group(1)=='1' and r['score']['pts']==1, (card[:120], r and r.get('score')))
    card,r,e=run('resp',['.sd-base','hint']); m=re.search(r'(\d+)/8',card)
    check('resp, turned + 1 hint → 0/8 (1 step − 1 hint)', r['score']['ok']==1 and r['score']['hints']==1 and r['score']['pts']==0 and '💡 −1' in card, (card[:160], r and r.get('score')))
    check('no JS errors', not e, e)
    b.close()
print('FAILS',fails)
