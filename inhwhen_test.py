"""Case D inhaler simulator, 17 Nov 2026: the press timing is a question, and taps that only find the controls cost nothing.
Run with the test server on 8100 (site_t)."""
import os, time, sys
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
fails=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
with sync_playwright() as p:
    b=p.chromium.launch()
    def start(dev, lang='th', vp=None):
        pg=b.new_page(**(vp or {'viewport':{'width':1440,'height':810}})); pg._errs=[]; pg.on('pageerror',lambda e: pg._errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto(f'http://localhost:8100/case-d/?lang={lang}'); time.sleep(2.5)
        pg.evaluate("(d)=>{ document.querySelector('#title').classList.add('hidden'); window.__r=null; inhSim(d).then(r=>window.__r=r); }", dev); time.sleep(1.2); return pg
    def tap(pg, sel): pg.click(sel if sel.startswith('#sim') or sel.startswith('.is-') else '#simDevG '+sel); time.sleep(0.4)
    def hold(pg, sel, secs):
        bb=pg.locator(sel).bounding_box(); pg.mouse.move(bb['x']+bb['width']/2, bb['y']+bb['height']/2); pg.mouse.down(); time.sleep(secs); pg.mouse.up(); time.sleep(0.3)
    def wait_in(pg):
        t0=time.time()
        while time.time()-t0<10 and pg.evaluate("()=>{const t=document.querySelector('#simTm'); return !!t && !t.classList.contains('hidden')}"): time.sleep(0.1)
        time.sleep(0.3)
    def end(pg, shot=None):
        time.sleep(1.2)
        if not pg.locator('.is-sum').count(): pg.click('#simDone'); time.sleep(0.8)
        if shot: pg.screenshot(path=f'{OUT}/{shot}.png')
        if pg.locator('#simCont').count(): pg.click('#simCont'); time.sleep(0.6)
        r=pg.evaluate("()=>window.__r"); e=pg._errs; pg.close(); return r, e
    # 1. blue inhaler: two idle taps on the canister first, then the natural way (tap the canister in the mouth, answer "together")
    pg=start('mdi'); tap(pg,'.sd-can'); tap(pg,'.sd-can'); tap(pg,'[data-p="body"]')
    check('mdi: idle taps before the demo score nothing', pg.evaluate("()=>!document.querySelector('.is-sum')") , '')
    tap(pg,'.sd-cap'); tap(pg,'.sd-can'); tap(pg,'#simShake'); time.sleep(0.9); hold(pg,'#simOut',3.4); tap(pg,'[data-p="body"]'); time.sleep(0.7)
    tap(pg,'.sd-can'); check('mdi: tapping the canister in the mouth asks when to press', pg.locator('.is-ask [data-w]').count()==2)
    pg.screenshot(path=f'{OUT}/when_mdi.png'); pg.click('.is-ask [data-w="with"]'); time.sleep(0.6); wait_in(pg)
    hold(pg,'#simHold',4.8); time.sleep(0.6); tap(pg,'[data-p="body"]'); time.sleep(0.9); tap(pg,'.sd-cap'); r,e=end(pg,'when_mdi_sum')
    check('mdi: natural order + "together" → 8/8, no errors', r and r['ok'] and r['score']['pts']==8 and not r['errs'], r)
    check('mdi: no JS errors', not e, e)
    # 2. "press first" is the real mistake
    pg=start('mdi'); tap(pg,'.sd-cap'); tap(pg,'#simShake'); time.sleep(0.9); hold(pg,'#simOut',3.4); tap(pg,'[data-p="body"]'); time.sleep(0.7)
    tap(pg,'.sd-can'); pg.click('.is-ask [data-w="first"]'); time.sleep(1.4); r,e=end(pg)
    check('mdi: "press first" → early, press step lost', r and 'early' in r['firstErrs'] and 'press' in r['score']['bad'], r)
    # 3. the old route still works (Breathe in, then the canister), and a later press is inside the window (4.5 s, was 3.5)
    for wait, name in ((2.0, 'mdi: Breathe in, then the canister about 2.5 s later → 8/8'), (3.4, 'mdi: press about 4 s into the breath → still in the window, 8/8')):
        pg=start('mdi'); tap(pg,'.sd-cap'); tap(pg,'#simShake'); time.sleep(0.9); hold(pg,'#simOut',3.4); tap(pg,'[data-p="body"]'); time.sleep(0.7)
        tap(pg,'#simIn'); time.sleep(wait); tap(pg,'.sd-can'); wait_in(pg); hold(pg,'#simHold',4.8); time.sleep(0.6); tap(pg,'[data-p="body"]'); time.sleep(0.9); tap(pg,'.sd-cap'); r,e=end(pg)
        check(name, r and r['ok'] and r['score']['pts']==8, r)
    # 4. green Respimat, two puffs by the question route, on a phone
    pg=start('resp', vp=dict(viewport={'width':844,'height':390},device_scale_factor=2,has_touch=True,is_mobile=True))
    tap(pg,'.sd-btn'); check('resp: idle tap on the dose button does not fire', pg.evaluate("()=>!document.querySelector('.is-ask')"))
    for puff in (1,2):
        tap(pg,'.sd-base'); tap(pg,'.sd-cap'); hold(pg,'#simOut',3.4); tap(pg,'[data-p="body"]'); time.sleep(0.8)
        tap(pg,'.sd-btn'); time.sleep(0.3)
        if puff==1: pg.screenshot(path=f'{OUT}/when_resp_ph.png')
        pg.click('.is-ask [data-w="with"]'); time.sleep(0.6); wait_in(pg); hold(pg,'#simHold',4.8); time.sleep(0.6); tap(pg,'[data-p="body"]'); time.sleep(0.9); tap(pg,'.sd-cap'); time.sleep(1.4)
    r,e=end(pg)
    check('resp (phone): two puffs by the question → 8/8', r and r['ok'] and r['score']['pts']==8, r)
    check('resp: no JS errors', not e, e)
    # 5. spacer: a tap on the canister before it is fitted scores nothing; then the natural order
    pg=start('spacer'); tap(pg,'.sd-cap'); tap(pg,'.sd-can'); tap(pg,'#simShake'); time.sleep(0.9); tap(pg,'.sd-sp rect'); time.sleep(0.7); hold(pg,'#simOut',3.4); tap(pg,'.sd-sp rect'); time.sleep(0.8)
    tap(pg,'.sd-can'); time.sleep(0.3); tap(pg,'#simIn'); wait_in(pg); hold(pg,'#simHold',4.8); time.sleep(0.6); tap(pg,'.sd-sp rect'); r,e=end(pg)
    check('spacer: early canister tap ignored, natural order → 8/8', r and r['ok'] and r['score']['pts']==8, r)
    check('spacer: no JS errors', not e, e)
    b.close()
print('FAILS', fails)
