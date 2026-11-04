"""Breath-hold may come before or after taking the inhaler out; a quick tap is enough for 'breathe out' and 'hold' (no press-and-hold needed)."""
import os, time
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
fails=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
with sync_playwright() as p:
    b=p.chromium.launch()
    def run(variant, dev='mdi'):
        pg=b.new_page(viewport={'width':1440,'height':810}); errs=[]; pg.on('pageerror',lambda e: errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto('http://localhost:8100/case-d/?lang=zh'); time.sleep(2.5)
        pg.evaluate("(d)=>{ document.querySelector('#title').classList.add('hidden'); window.__r=null; inhSim(d).then(r=>window.__r=r); }", dev); time.sleep(1.2)
        def tap(sel, w=0.4): pg.click(sel if sel.startswith('#sim') else '#simDevG '+sel); time.sleep(w)
        def wait_in():
            t0=time.time()
            while time.time()-t0<10 and pg.evaluate("()=>{const t=document.querySelector('#simTm'); return !!t && !t.classList.contains('hidden')}"): time.sleep(0.1)
            time.sleep(0.2)
        def tap_btn(sel): bb=pg.locator(sel).bounding_box(); pg.mouse.move(bb['x']+bb['width']/2, bb['y']+bb['height']/2); pg.mouse.down(); time.sleep(0.12); pg.mouse.up(); time.sleep(0.2)
        if dev=='mdi':
            tap('.sd-cap'); tap('#simShake', 1.0); tap_btn('#simOut'); time.sleep(2.6); tap('[data-p="body"]', 0.7)
            tap('#simIn', 0.4); tap('.sd-can'); wait_in()
            if variant=='hold-in-mouth': tap_btn('#simHold'); time.sleep(4.8); tap('[data-p="body"]', 0.9)
            elif variant=='out-then-hold': tap('[data-p="body"]', 0.9); tap_btn('#simHold'); time.sleep(4.8)
            elif variant=='no-hold': tap('[data-p="body"]', 0.9)
            tap('.sd-cap', 1.3)
        elif dev=='spacer':
            tap('.sd-cap'); tap('#simShake', 1.0); tap('.sd-sp rect', 0.8); tap_btn('#simOut'); time.sleep(2.6); tap('.sd-sp rect', 0.8)
            tap('.sd-can', 0.3); tap('#simIn'); wait_in(); tap('.sd-sp rect', 0.9); tap_btn('#simHold'); time.sleep(5.6)
        else:  # resp, both puffs with remove-then-hold
            for i in range(2):
                tap('.sd-base'); tap('.sd-cap'); tap_btn('#simOut'); time.sleep(2.6); tap('[data-p="body"]', 0.7); tap('#simIn', 0.4); tap('.sd-btn'); wait_in()
                tap('[data-p="body"]', 0.9); tap_btn('#simHold'); time.sleep(4.8); tap('.sd-cap', 1.4)
        time.sleep(0.6)
        card=pg.inner_text('.is-sum .card') if pg.locator('.is-sum .card').count() else ''
        if pg.locator('#simCont').count(): pg.click('#simCont'); time.sleep(0.5)
        r=pg.evaluate("()=>window.__r"); pg.screenshot(path=f't24/hold_{variant}.png'); pg.close(); return r, card, errs
    r,card,e=run('hold-in-mouth'); check('hold in the mouth (quick taps) → 8/8, no mistakes', r and r['ok'] and r['score']['pts']==8, (r, card[:150])); check('  no JS errors', not e, e)
    r,card,e=run('out-then-hold'); check('take out, lips closed, then hold → 8/8, no mistakes', r and r['ok'] and r['score']['pts']==8, (r, card[:150])); check('  no JS errors', not e, e)
    r,card,e=run('no-hold'); check('no breath-hold at all → noHold, 7/8', r and 'noHold' in r['errs'] and r['score']['pts']==7, (r, card[:150]))
    r,card,e=run('resp-out-then-hold','resp'); check('Respimat, 2 puffs, hold after taking out → 8/8', r and r['ok'] and r['score']['pts']==8, (r, card[:150])); check('  no JS errors', not e, e)
    r,card,e=run('spacer-out-then-hold','spacer'); check('Spacer, take out then hold → 8/8 and the demo ends by itself', r and r['ok'] and r['score']['pts']==8, (r, card[:150])); check('  no JS errors', not e, e)
    b.close()
print('FAILS',fails)
