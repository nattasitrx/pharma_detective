"""Case D inhaler game as an ordering task (17 Nov 2026): every correct order scores 8/8 with no errors, wrong orders
lose the misplaced steps and show their consequence, a hint costs a point. Run with the test server on 8100 (site_t)."""
import os, time, sys
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
OUT = sys.argv[1] if len(sys.argv) > 1 else '.'
fails=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
PH=dict(viewport={'width':844,'height':390},device_scale_factor=2,has_touch=True,is_mobile=True)
with sync_playwright() as p:
    b=p.chromium.launch()
    def start(dev, lang='th', vp=None):
        pg=b.new_page(**(vp or {'viewport':{'width':1440,'height':810}})); pg._errs=[]; pg.on('pageerror',lambda e: pg._errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
        pg.goto(f'http://localhost:8100/case-d/?lang={lang}'); time.sleep(2.5)
        pg.evaluate("(d)=>{ document.querySelector('#title').classList.add('hidden'); window.__r=null; inhSim(d).then(r=>window.__r=r); }", dev); time.sleep(1.0); return pg
    def place(pg, order):
        for k in order: pg.click(f'#ioPool .io-card[data-k="{k}"]'); time.sleep(0.08)
    def run(pg, skip=True, shot=None):
        pg.click('#ioGo'); time.sleep(0.4)
        if skip: pg.click('#ioSkip')
        t0=time.time()
        while time.time()-t0<40 and not pg.locator('.is-sum').count(): time.sleep(0.2)
        if shot: pg.screenshot(path=f'{OUT}/{shot}.png')
        return pg.inner_text('.is-sum .card')
    def finish(pg):
        pg.click('#simCont'); time.sleep(0.5); r=pg.evaluate("()=>window.__r"); e=pg._errs; pg.close(); return r, e
    valid=None
    for dev in ('mdi','spacer','resp'):
        pg=start(dev); valid=pg.evaluate("(d)=>ORD_VALID[d]", dev)
        if dev=='mdi': pg.screenshot(path=f'{OUT}/ord_pick_empty.png')
        check(f'{dev}: 8 shuffled cards, not already in a correct order', pg.locator('#ioPool .io-card').count()==8 and pg.evaluate("(d)=>{const o=[...document.querySelectorAll('#ioPool .io-card')].map(c=>c.dataset.k); return !ORD_VALID[d].some(v=>v.join()===o.join())}", dev))
        pg.close()
        for vi, v in enumerate(valid):
            pg=start(dev); place(pg, v)
            if vi==0: pg.screenshot(path=f'{OUT}/ord_pick_{dev}.png')
            card=run(pg, skip=(vi>0), shot=f'ord_sum_{dev}' if vi==0 else None); r,e=finish(pg)
            check(f'{dev}: correct order #{vi+1} → 8/8, no errors{" (animation played in full)" if vi==0 else ""}', r and r['ok'] and r['score']['pts']==8 and not r['errs'] and '8/8' in card and not e, (r, e, card[:80]))
    # blue inhaler, Uncle Lee's mistake: press before the breath
    pg=start('mdi'); place(pg, ['cap','shake','out','mouth','press','in','hold','recap']); pg.click('#ioGo'); time.sleep(7.5); pg.screenshot(path=f'{OUT}/ord_play_wrong.png')
    t0=time.time()
    while time.time()-t0<40 and not pg.locator('.is-sum').count(): time.sleep(0.2)
    pg.screenshot(path=f'{OUT}/ord_sum_wrong.png'); card=pg.inner_text('.is-sum .card')
    check('mdi: press before the breath → 7/8, "early" shown, Reorder offered', '7/8' in card and pg.locator('#simAgain').count()==1, card[:200])
    pg.click('#simAgain'); time.sleep(0.4)
    check('mdi: Reorder goes back to the cards with the order kept', pg.locator('#ioSeq .io-card').count()==8)
    pg.click('#ioSeq .io-card[data-i="4"]'); pg.click('#ioSeq .io-card[data-i="5"]'); place(pg, ['in','press'])   # take press and in back: their two places stay empty; put them in the right way round
    check('mdi: a card taken back leaves its place empty, the next card fills it', pg.evaluate("()=>[...document.querySelectorAll('#ioSeq .io-card')].map(c=>c.querySelector('span').textContent).length")==8 and pg.locator('#ioSeq .io-slot').count()==0)
    card=run(pg); r,e=finish(pg)
    check('mdi: second order right, but the score stays the first one (7/8)', r and r['ok'] and r['tries']==2 and r['score']['pts']==7 and 'early' in r['firstErrs'] and not r['errs'], r)
    check('mdi: no JS errors', not e, e)
    # hints: an empty board + 8 hints = a correct order, 0 points; a hint on a wrong board takes the wrong cards back
    pg=start('spacer')
    for _ in range(8): pg.click('#ioHint'); time.sleep(0.05)
    card=run(pg); r,e=finish(pg)
    check('spacer: 8 hints → right order, 8 steps − 8 hints = 0 points', r and r['ok'] and r['score']['ok']==8 and r['score']['hints']==8 and r['score']['pts']==0, r)
    pg=start('resp'); place(pg, ['turn','open','mouth','out']); pg.click('#ioHint'); time.sleep(0.2)
    check('resp: hint on a wrong board takes back the cards after the last right one', pg.locator('#ioSeq .io-card').count()==2)
    pg.click('#ioClear'); place(pg, ['open','turn','mouth','out','press','in','close','hold']); card=run(pg); r,e=finish(pg)
    check('resp: a jumbled order scores low and lists what went wrong', r and not r['ok'] and r['score']['pts']<=5 and len(r['errs'])>=1, r)
    check('resp: no JS errors', not e, e)
    # phone size
    pg=start('mdi', lang='zh', vp=PH); place(pg, ['cap','shake','out']); pg.screenshot(path=f'{OUT}/ord_pick_ph.png')
    fs=pg.evaluate("()=>{const c=document.querySelector('#ioPool .io-card span'); const r=c.getBoundingClientRect(); return [parseFloat(getComputedStyle(c).fontSize)*document.querySelector('#isim').getBoundingClientRect().width/document.querySelector('#isim').offsetWidth, [...document.querySelectorAll('#ioPool .io-card,#ioSeq .io-card')].every(c=>c.scrollHeight<=c.clientHeight+1)]}")
    check('phone: card text ≥ 10 px on screen and nothing clipped', fs[0]>=10 and fs[1], fs); pg.close()
    b.close()
print('FAILS', fails)
