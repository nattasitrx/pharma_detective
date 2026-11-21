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
        check(f'{dev}: real steps + 2 decoys as shuffled picture cards, one place per real step', pg.locator('#ioPool .io-card').count()==len(valid[0])+2 and pg.locator('#ioSeq .io-slot').count()==len(valid[0]) and pg.locator('#ioPool .io-card svg.io-th').count()==len(valid[0])+2 and pg.evaluate("(d)=>{const o=[...document.querySelectorAll('#ioPool .io-card')].map(c=>c.dataset.k); return !ORD_VALID[d].some(v=>v.join()===o.join())}", dev))
        pg.close()
        for vi, v in enumerate(valid):
            pg=start(dev); place(pg, v)
            if vi==0: pg.screenshot(path=f'{OUT}/ord_pick_{dev}.png')
            card=run(pg, skip=(vi>0), shot=f'ord_sum_{dev}' if vi==0 else None); r,e=finish(pg)
            check(f'{dev}: correct order #{vi+1} → 8/8, no errors{" (animation played in full)" if vi==0 else ""}', r and r['ok'] and r['score']['pts']==8 and not r['errs'] and '8/8' in card and not e, (r, e, card[:80]))
    # blue inhaler (21 Nov 2026): pressing and starting the breath are one card; "press first, then breathe" is a decoy
    pg=start('mdi'); place(pg, ['cap','shake','out','mouth','pressfirst','hold','recap']); pg.click('#ioGo'); time.sleep(7.5); pg.screenshot(path=f'{OUT}/ord_play_wrong.png')
    t0=time.time()
    while time.time()-t0<40 and not pg.locator('.is-sum').count(): time.sleep(0.2)
    pg.screenshot(path=f'{OUT}/ord_sum_wrong.png'); card=pg.inner_text('.is-sum .card')
    check('mdi: the decoy "press first" instead of "together" → 6/8 (that card is two steps), named as a decoy, Reorder offered', '6/8' in card and 'การ์ดหลอก' in card and 'กดยาให้เสร็จก่อน' in card and pg.locator('#simAgain').count()==1, card[:300])
    pg.click('#simAgain'); time.sleep(0.4)
    check('mdi: Reorder goes back to the cards with the order kept', pg.locator('#ioSeq .io-card').count()==7)
    pg.click('#ioSeq .io-card[data-i="4"]'); check('mdi: a card taken back leaves its place empty', pg.locator('#ioSeq .io-slot').count()==1)
    place(pg, ['pressin']); check('mdi: the next card fills the empty place', pg.locator('#ioSeq .io-slot').count()==0 and pg.evaluate("()=>document.querySelector('#ioSeq .io-card[data-i=\"4\"] span').textContent").startswith('เริ่มสูด'))
    pg.click('#ioPool .io-card[data-k="recap"]'); check('mdi: tapping a placed picture again takes it back', pg.locator('#ioSeq .io-slot').count()==1); place(pg, ['recap'])
    card=run(pg); r,e=finish(pg)
    check('mdi: second order right, but the score stays the first one (6/8)', r and r['ok'] and r['tries']==2 and r['score']['pts']==6 and 'early' in r['firstErrs'] and not r['errs'], r)
    check('mdi: no JS errors', not e, e)
    for dev, bad, key in (('spacer', ['cap','shake','attach','out','mouth','two','in','hold'], 'twoPuff'), ('resp', ['turn','open','shake','out','mouth','pressin','hold'], 'respShake'), ('mdi', ['cap','shake','out','mouth','fast','hold','recap'], 'fast')):
        pg=start(dev); place(pg, bad); card=run(pg); r,e=finish(pg)
        check(f'{dev}: decoy in the order → not ok, "{key}" explained, below 8', r and not r['ok'] and key in r['errs'] and r['score']['pts']<8 and not e, (r,e))
    # hints: an empty board + 8 hints = a correct order, 0 points; a hint on a wrong board takes the wrong cards back
    pg=start('spacer')
    for _ in range(8): pg.click('#ioHint'); time.sleep(0.05)   # the spacer routine has 8 real cards
    card=run(pg); r,e=finish(pg)
    check('spacer: 8 hints → right order, 8 steps − 8 hints = 0 points', r and r['ok'] and r['score']['ok']==8 and r['score']['hints']==8 and r['score']['pts']==0, r)
    pg=start('resp'); place(pg, ['turn','open','mouth','out']); pg.click('#ioHint'); time.sleep(0.2)
    check('resp: hint on a wrong board takes back the cards after the last right one', pg.locator('#ioSeq .io-card').count()==2)
    pg.click('#ioClear'); place(pg, ['open','turn','mouth','out','pressin','close','hold']); card=run(pg); r,e=finish(pg)
    check('resp: a jumbled order scores low and lists what went wrong', r and not r['ok'] and r['score']['pts']<=5 and len(r['errs'])>=1, r)
    check('resp: no JS errors', not e, e)
    # green inhaler, the owner's case (18 Nov 2026): cap closed before the breath-hold, then reordered correctly
    pg=start('resp'); place(pg, ['turn','open','out','mouth','pressin','close','hold']); card=run(pg, shot='ord_resp_swap1')
    check('resp: close before hold → 7/8, says "in the wrong place" and never "cap not closed"', '7/8' in card and 'ผิดตำแหน่ง' in card and 'ไม่ปิดฝา' not in card and 'ไม่ได้กลั้น' not in card, card[:300])
    pg.click('#simAgain'); time.sleep(0.4); pg.click('#ioSeq .io-card[data-i="5"]'); pg.click('#ioSeq .io-card[data-i="6"]'); place(pg, ['hold','close']); card=run(pg, shot='ord_resp_swap2')
    check('resp: second order right → no cross anywhere on the card, first score (7/8) stated apart', '❌' not in card and '7/8' in card and 'เรียงถูกทุกขั้น' in card and pg.locator('#ioList .li.bad').count()==0, card[:300])
    r,e=finish(pg); check('resp: result ok on the second order, first errors kept for the record', r and r['ok'] and r['firstErrs']==['holdOrder'] and not r['errs'] and not e, (r,e))
    # any order at all must play to the end: 40 random orders per inhaler, animation skipped
    for dev in ('mdi','spacer','resp'):
        pg=start(dev)
        out=pg.evaluate("""async (dev)=>{ const W=ms=>new Promise(r=>setTimeout(r,ms)), bad=[]; const keys=ORD_VALID[dev][0], all=keys.concat(ORD_DECOY[dev]);
          for(let n=0;n<40;n++){ let o=all.slice(); for(let a=o.length-1;a>0;a--){ const b=Math.floor(Math.random()*(a+1)); [o[a],o[b]]=[o[b],o[a]]; } o=o.slice(0,keys.length);   // any cards, decoys included, in any order
            if(n){ window.__r=null; inhSim(dev).then(r=>window.__r=r); await W(120); }
            o.forEach(k=>document.querySelector(`#ioPool .io-card[data-k="${k}"]`).click()); document.querySelector('#ioGo').click(); await W(30); const sk=document.querySelector('#ioSkip'); if(sk) sk.click();
            let t=0; while(!document.querySelector('.is-sum')&&t<80){ await W(50); t++; }
            if(!document.querySelector('.is-sum')){ bad.push(['stuck',o.join()]); break; }
            document.querySelector('#simCont').click(); await W(60); const r=window.__r, valid=ORD_VALID[dev].some(v=>v.join()===o.join());
            if(!r||r.ok!==valid||(!valid&&(!r.errs.length||r.score.pts>=8))||(valid&&r.errs.length)) bad.push([o.join(), JSON.stringify(r)]); }
          return bad; }""", dev)
        check(f'{dev}: 40 random orders all play to the end with a consistent result', not out and not pg._errs, (out[:2], pg._errs[:2])); pg.close()
    # phone size
    pg=start('mdi', lang='zh', vp=PH); place(pg, ['cap','shake','out']); pg.screenshot(path=f'{OUT}/ord_pick_ph.png')
    fs=pg.evaluate("()=>{const c=document.querySelector('#ioPool .io-card span'); const r=c.getBoundingClientRect(); return [parseFloat(getComputedStyle(c).fontSize)*document.querySelector('#isim').getBoundingClientRect().width/document.querySelector('#isim').offsetWidth, [...document.querySelectorAll('#ioPool .io-card,#ioSeq .io-card')].every(c=>c.scrollHeight<=c.clientHeight+1)]}")
    check('phone: card text ≥ 10 px on screen and nothing clipped', fs[0]>=10 and fs[1], fs); pg.close()
    b.close()
print('FAILS', fails)
