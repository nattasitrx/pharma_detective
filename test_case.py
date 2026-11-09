"""Full play-through of any case, driven by the case's own data (TOPICS1, FOLLOW1, HOTSPOTS, ZONES, KEY_ITEMS, TESTI,
MISSIONS, MYTHS, RUBRIC_SUM, INH_* for the inhaler scene). usage: CASE=c python3 test_case.py LANG MODE
env: MOBILE=1 (844x390 phone), VIEW=fp|tp, GAME_URL (default http://localhost:8100/case-<CASE>/?class=ph2026a)"""
import os, time, sys, json
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); OUT = f'{SP}/t15'; os.makedirs(OUT, exist_ok=True)
CASE = os.environ.get('CASE', 'c'); LANG = sys.argv[1] if len(sys.argv) > 1 else 'zh'; MODE = sys.argv[2] if len(sys.argv) > 2 else 'practice'
MOB = os.environ.get('MOBILE') == '1'; VIEWM = os.environ.get('VIEW', 'tp')
TAG = f'{CASE}_{LANG}_{MODE[0]}_{"m" if MOB else "d"}_{VIEWM}'
URL = os.environ.get('GAME_URL', f'http://localhost:8100/case-{CASE}/?class=ph2026a')
errors, logs, notes = [], [], {}
def vis(pg, sel): return pg.evaluate(f"()=>{{const e=document.querySelector('{sel}'); return !!e && !e.classList.contains('hidden') && e.offsetParent!==null}}")
def shot(pg, n): pg.screenshot(path=f'{OUT}/{TAG}_{n}.png')
TXT = {
 'name': {'zh': '小晴', 'en': 'Mint', 'th': 'มิ้นท์'},
 'empathy': {'zh': '聽起來真的很辛苦，謝謝您願意跟我們分享。', 'en': 'That sounds really hard. Thank you for sharing with us.', 'th': 'ฟังดูลำบากมากเลย ขอบคุณที่เล่าให้ฟังนะคะ'},
 'confid': {'zh': '您放心，我們會保密。您最近有做過健康檢查嗎？', 'en': "Don't worry, everything stays confidential. Have you had a health check recently?", 'th': 'ไม่ต้องกังวลนะคะ ทุกอย่างเป็นความลับ ช่วงนี้ได้ตรวจสุขภาพบ้างไหมคะ'},
 'storage': {'zh': '您的藥平常都放在哪裡呢？', 'en': 'Where do you usually keep your medicines?', 'th': 'ปกติเก็บยาไว้ที่ไหนคะ'},
 'allergy': {'zh': '您有對什麼藥物過敏嗎？', 'en': 'Are you allergic to any medicines?', 'th': 'แพ้ยาอะไรไหมคะ'},
 'otc': {'zh': '您有沒有自己買成藥或保健食品來吃？', 'en': 'Do you buy any medicines or supplements yourself?', 'th': 'ได้ซื้อยาหรืออาหารเสริมกินเองบ้างไหมคะ'},
 'lock': {'zh': '我知道很難開口，您說的我們都會保密。可以跟我說說是什麼讓您擔心嗎？', 'en': 'I know this is hard to talk about, and it stays confidential. Could you tell me what has been worrying you?', 'th': 'รู้ว่าพูดยาก แต่ทุกอย่างเป็นความลับนะคะ เล่าให้ฟังได้ไหมว่ากังวลเรื่องอะไร'},
 'refl': {'zh': '我學到要先建立信任，再用證據討論。', 'en': 'I learned to build trust first and then use evidence.', 'th': 'ได้เรียนรู้ว่าต้องสร้างความไว้ใจก่อนแล้วค่อยใช้หลักฐาน'},
}
def handle_calc(pg):
    cid = pg.evaluate("()=>window.__PD__.D.calcId"); ans = pg.evaluate("()=>window.__PD__.D.calcAns")
    if cid not in notes.setdefault('calc_seen', []):
        notes['calc_seen'].append(cid); time.sleep(0.4)
        chips = pg.evaluate("()=>[...document.querySelectorAll('#cChips .cchip')].map(c=>c.dataset.v)")
        notes.setdefault('calc_chips', {})[cid] = chips
        for v in chips[:3]: pg.click(f'#cChips .cchip[data-v="{v}"]'); time.sleep(0.1)
        pg.click('#cGo'); time.sleep(0.6)
    for k, v in ans.items():
        if k == 'sex': pg.click(f'#cFormula .ctog [data-v="{v}"]')
        else: pg.fill(f'#cFormula input[data-s="{k}"]', str(v))
    notes.setdefault('calc_ans', {})[cid] = ans
    time.sleep(0.2); pg.click('#cGo'); time.sleep(1.9)
def handle_cq(pg):
    st = pg.evaluate("()=>({pp:document.querySelector('#cqBox').classList.contains('pp'), refl:document.querySelector('#cqBox').classList.contains('refl'), pre:Object.keys(window.__PD__.S.pp.pre).length, text:!!document.querySelector('#cqText')})")
    if st['text']: pg.fill('#cqText', TXT['refl'][LANG])
    else:
        key = 'post' if (st['pp'] and st['pre'] >= 6) else 'pre' if st['pp'] else 'cq'
        j = '0' if key in ('post', 'cq') or (key == 'pre' and st['pre'] < 2) else '1'
        pg.click(f'#cqBody .cqo[data-j="{j}"]')
    pg.click('#cqGo'); time.sleep(0.75); pg.click('#cqGo'); time.sleep(0.3)   # Continue ignores taps for 0.6 s after Submit
def center(pg, sel):
    bb = pg.locator(sel).first.bounding_box(); return bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2
def svgpt(pg, x, y):
    return pg.evaluate("([x,y])=>{const s=document.querySelector('#simSvg'); const p=s.createSVGPoint(); p.x=x; p.y=y; const q=p.matrixTransform(s.getScreenCTM()); return [q.x,q.y]; }", [x, y])
def sdrag(pg, a, b, steps=14, hold=0.0):
    pg.mouse.move(*a); pg.mouse.down(); time.sleep(hold)
    for i in range(1, steps + 1): pg.mouse.move(a[0] + (b[0] - a[0]) * i / steps, a[1] + (b[1] - a[1]) * i / steps); time.sleep(0.02)
    pg.mouse.up()
def sholdbtn(pg, sel, secs):
    x, y = center(pg, sel); pg.mouse.move(x, y); pg.mouse.down(); time.sleep(secs); pg.mouse.up()
def sshake(pg, part):
    x, y = center(pg, part); pg.mouse.move(x, y); pg.mouse.down()
    for k in range(6): pg.mouse.move(x, y + (40 if k % 2 == 0 else -40), steps=4); time.sleep(0.03)
    pg.mouse.move(x, y, steps=3); pg.mouse.up()
def sorigin(pg, sel):
    return pg.evaluate("(sel)=>{ const t=document.querySelector(sel).getAttribute('transform')||''; const m=t.match(/translate\\(([-\\d.]+),([-\\d.]+)\\)/); return [+m[1],+m[2]]; }", sel)
def sto(pg, part, osel, target):
    x, y = center(pg, part); o = svgpt(pg, *sorigin(pg, osel)); m = svgpt(pg, *target); sdrag(pg, (x, y), (x + m[0] - o[0], y + m[1] - o[1]), steps=16)
def spress(pg, part, secs=3.4):
    x, y = center(pg, part); pg.mouse.move(x, y); pg.mouse.down(); k = pg.evaluate("()=>document.querySelector('#simSvg').getScreenCTM().a"); n = int(secs / 0.05)
    for i in range(1, n + 1): pg.mouse.move(x - 66 * k * i / n, y - 330 * k * i / n); time.sleep(0.05)
    pg.mouse.up()
def handle_sim(pg):
    """guided inhaler: taps on the device + hold buttons, played like a student"""
    if pg.locator('#simCont').count(): time.sleep(0.4); pg.click('#simCont'); time.sleep(0.5); return True
    dev = pg.evaluate("()=>{const d=document.querySelector('#simDevG .sd-dev'); return d&&d.dataset.dev}")
    done = notes.setdefault('sim_done', [])
    if not dev or dev in done: return False
    done.append(dev); time.sleep(0.6); shot(pg, f'sim_{dev}')
    def tap(sel): pg.click(sel if sel.startswith('#sim') else '#simDevG ' + sel); time.sleep(0.35)
    def wait_in():
        t0 = time.time()
        while time.time() - t0 < 10 and pg.evaluate("()=>{const t=document.querySelector('#simTm'); return !!t && !t.classList.contains('hidden')}"): time.sleep(0.1)
        time.sleep(0.2)
    def hold(sel, secs):
        bb = pg.locator(sel).bounding_box(); pg.mouse.move(bb['x'] + bb['width'] / 2, bb['y'] + bb['height'] / 2); pg.mouse.down(); time.sleep(secs); pg.mouse.up(); time.sleep(0.3)
    if dev == 'mdi':
        tap('.sd-cap'); tap('#simShake'); time.sleep(0.9); hold('#simOut', 3.4); tap('[data-p="body"]'); time.sleep(0.6)
        tap('#simIn'); time.sleep(0.4); tap('.sd-can'); wait_in(); hold('#simHold', 4.8); time.sleep(0.6); tap('[data-p="body"]'); time.sleep(0.9); tap('.sd-cap'); time.sleep(1.3)
    elif dev == 'spacer':
        tap('.sd-cap'); tap('#simShake'); time.sleep(0.9); tap('.sd-sp rect'); time.sleep(0.7); hold('#simOut', 3.4); tap('.sd-sp rect'); time.sleep(0.8)
        tap('.sd-can'); time.sleep(0.3); tap('#simIn'); wait_in(); hold('#simHold', 4.8); time.sleep(0.6); tap('.sd-sp rect'); time.sleep(1.6)
    elif dev == 'resp':
        for puff in (1, 2):
            tap('.sd-base'); tap('.sd-cap'); hold('#simOut', 3.4); tap('[data-p="body"]'); time.sleep(0.7); tap('#simIn'); time.sleep(0.4)
            tap('.sd-btn'); wait_in(); hold('#simHold', 4.8); time.sleep(0.6); tap('[data-p="body"]'); time.sleep(0.9); tap('.sd-cap'); time.sleep(1.4)
    if dev == 'mdi' and RES:
        time.sleep(0.8); pump(pg, until=lambda: vis(pg, '#isim') and pg.evaluate("()=>{const d=document.querySelector('#simDevG .sd-dev'); return !!d&&d.dataset.dev==='spacer'}"), maxn=60)
        reload_resume(pg, 'inh', lambda: vis(pg, '#isim') or vis(pg, '#choices'))
    time.sleep(0.8); notes.setdefault('sim', {})[dev] = pg.evaluate("()=>{const l=(window.__PD__.S.log||[]).filter(e=>e.type==='inhSim'); return l.length?l[l.length-1]:null}")
    return True
RES = os.environ.get('RESUME') == '1'
SNAP = """()=>{const S=window.__PD__.S; return {ch:S.chapter, q:S.questions, asked:Object.keys(S.asked).length, visit:S.visit, trust:S.trust, pat:S.pat, opened:Object.keys(S.opened||{}).length, ev:S.evidence.length, charges:S.charges, found:Object.keys(S.found).length, hearts:S.hearts, mr:S.mr.ans.length, boss:S.boss.answers.length, calc:Object.keys(S.calc).sort().join(','), inh:JSON.stringify(S.seg&&S.seg.inhR||null)}}"""
def reload_resume(pg, tag, until):
    """close the game mid-chapter (reload), press Continue on the title, and check that nothing was lost"""
    if not RES: return
    before = pg.evaluate(SNAP); time.sleep(0.4)
    pg.reload(); time.sleep(2.2)
    box = pg.evaluate("()=>{const b=document.querySelector('#resumeBox'); return b&&!b.classList.contains('hidden')?b.innerText.replace(/\\s+/g,' '):null}")
    if not box: notes.setdefault('resume', []).append({'at': tag, 'box': None}); return
    t0 = time.time(); clicks = [0]
    pg.click('#btnResume'); time.sleep(0.8)
    def tick():
        if vis(pg, '#tbox') and pg.evaluate("()=>!!(window.__PD__.D.res||window.__PD__.D.typing)"): clicks[0] += 1
        return until()
    ok = pump(pg, until=tick, maxn=200)
    after = pg.evaluate(SNAP); same = before == after
    notes.setdefault('resume', []).append({'at': tag, 'box': box[-80:], 'same': same, 'reached': ok, 'secs': round(time.time() - t0, 1), 'dialog_clicks_seen': clicks[0], **({} if same else {'before': before, 'after': after})})
    shot(pg, f'resume_{tag}')
def cdd(pg, src, dst, hold=0.0):
    a = center(pg, src); b = center(pg, dst); pg.mouse.move(*a); pg.mouse.down()
    for i in range(1, 15): pg.mouse.move(a[0] + (b[0] - a[0]) * i / 14, a[1] + (b[1] - a[1]) * i / 14); time.sleep(0.02)
    time.sleep(hold); pg.mouse.up()
def handle_cg(pg):
    """Case C hands-on games: play each one correctly with real pointer input"""
    if pg.locator('#cgCont').count(): time.sleep(0.4); pg.click('#cgCont'); time.sleep(0.5); return True
    T = lambda k: f'#cgScene .tile[data-item="{k}"]'
    done = notes.setdefault('cg_done', [])
    def log(k):
        time.sleep(1.6); notes.setdefault('cg', {})[k] = pg.evaluate("(k)=>{const c=window.__PD__.S.calc[k]; return c?{ok:c.ok, errs:c.errs}:null}", k)
    def tapt(k): pg.click(T(k)); time.sleep(0.3)
    if pg.locator('#cgWait15').count() and 'hypo' not in done:
        done.append('hypo'); time.sleep(0.5); shot(pg, 'cg_hypo')
        tapt('meter')
        for _ in range(4): tapt('gluc')
        pg.click('#cgWait15'); time.sleep(1.6); tapt('meter'); time.sleep(0.4); tapt('bread'); time.sleep(1.6)
        if pg.locator('#cgCont').count(): pg.click('#cgCont')
        log('hypo'); return True
    if pg.locator('#cgGlass').count() and 'fosa' not in done:
        done.append('fosa'); time.sleep(0.5); shot(pg, 'cg_fosa')
        if RES: reload_resume(pg, 'fosa', lambda: vis(pg, '#cgame') and pg.locator('#cgGlass').count() > 0)
        tapt('water'); time.sleep(1.2); tapt('fosa'); time.sleep(1.2)
        t0 = time.time()
        while time.time() - t0 < 75:
            ask = pg.evaluate("()=>{const a=document.querySelector('#cgAsk'); return a && !a.classList.contains('hidden') ? a.dataset.want : null}")
            if ask:
                try: pg.click('#cgOk' if ask in ('water', 'sofa', 'plants', 'after') else '#cgStop', force=True, timeout=1500)
                except Exception: pass
                notes.setdefault('asks', []).append(ask); time.sleep(0.3)
                if ask == 'after': break   # 7:00: she asks for breakfast and her other pills (mk 9 Nov 2026)
            time.sleep(0.25)
        time.sleep(0.5)
        for k in ('food', 'pills'):
            if not pg.evaluate("(k)=>document.querySelector(`#cgScene .tile[data-item=\"${k}\"]`).classList.contains('gone')", k): tapt(k)
        time.sleep(1.6)
        if pg.locator('#cgCont').count(): pg.click('#cgCont')
        log('fosa'); return True
    if pg.locator('#htSvg').count() and 'height' not in done:
        done.append('height'); time.sleep(0.5); shot(pg, 'cg_height')
        pg.click('#htSlip'); time.sleep(0.3)
        fx = pg.evaluate("()=>{const r=document.querySelector('#htFig').getBoundingClientRect(); return [r.x+r.width/2, r.y+r.height*0.6]}")
        wall = pg.evaluate("()=>{const s=document.querySelector('#htSvg'); const p=s.createSVGPoint(); p.x=608; p.y=500; const q=p.matrixTransform(s.getScreenCTM()); return [q.x,q.y]}")
        sdrag(pg, fx, (wall[0], fx[1]), steps=20); time.sleep(0.3)
        hb = pg.evaluate("()=>{const r=document.querySelector('#htHead').getBoundingClientRect(); return [r.x+r.width/2, r.y+r.height/2]}"); pg.mouse.click(*hb); time.sleep(0.3)
        bb = pg.evaluate("()=>{const r=document.querySelector('#htBoard rect').getBoundingClientRect(); return [r.x+r.width*0.3, r.y+r.height/2]}")
        h = pg.evaluate("()=>document.querySelector('#htSvg').getBoundingClientRect().height")
        sdrag(pg, bb, (bb[0], bb[1] + h * 0.6), steps=20); time.sleep(0.3)
        pole = pg.evaluate("()=>{const s=document.querySelector('#htSvg'); const p=s.createSVGPoint(); p.x=648; p.y=400; const q=p.matrixTransform(s.getScreenCTM()); return [q.x,q.y]}"); pg.mouse.click(*pole); time.sleep(0.4)
        pg.fill('#htDiff', '4'); pg.click('#htCheck'); time.sleep(1.8)
        if pg.locator('#cgCont').count(): pg.click('#cgCont')
        log('height'); return True
    if pg.locator('#caDay').count() and 'ca' not in done:
        done.append('ca'); time.sleep(0.5); shot(pg, 'cg_ca')
        for k in ['coffee', 'noodle', 'egg', 'rice', 'cabbage', 'pork']: pg.click(f'#caDay .tile[data-item="{k}"]'); time.sleep(0.08)
        for k in ['milk', 'greens', 'tofu', 'fish', 'sesame']: cdd(pg, f'#caShelf .tile[data-item="{k}"]', '#caPlan'); time.sleep(0.15)
        pg.click('#cgDone'); time.sleep(0.6)
        if pg.locator('#cgCont').count(): pg.click('#cgCont')
        log('ca'); return True
    return False
UICHK = """()=>{const h=document.querySelector('#hud'); const st=document.querySelector('#stage').getBoundingClientRect();
  const m=document.querySelector('#bMenu').getBoundingClientRect(); const out={menuOut:!h.classList.contains('hidden')&&(m.right>Math.min(st.right,innerWidth)+1||m.top<st.top-1), ov:0, fs:31, pg:0};
  const tb=document.querySelector('#tbox'), t=document.querySelector('#tText'); if(!tb.classList.contains('hidden')){ const cs=getComputedStyle(tb); out.ov=Math.round(t.scrollHeight-(tb.clientHeight-parseFloat(cs.paddingTop)-parseFloat(cs.paddingBottom))); out.fs=parseFloat(getComputedStyle(t).fontSize); out.pg=(window.__PD__.D.pg&&window.__PD__.D.pg.list.length)||0; if(out.pg>=4) out.pgx=window.__PD__.D.pg.list[0].slice(0,90); }
  const c=document.querySelector('#choices'); if(c&&!c.classList.contains('hidden')){ const r=c.getBoundingClientRect(); const ks=[...c.children]; if(ks.length){ const top=Math.min(...ks.map(k=>k.getBoundingClientRect().top)), bot=Math.max(...ks.map(k=>k.getBoundingClientRect().bottom)); out.chOut=top<r.top-1||bot>r.bottom+1; } }
  return out; }"""
def uichk(pg):
    try: r = pg.evaluate(UICHK)
    except Exception: return
    u = notes.setdefault('ui', {'menuOut': 0, 'maxOv': -999, 'minFs': 31, 'paged': 0, 'chOut': 0})
    u['menuOut'] += bool(r['menuOut']); u['maxOv'] = max(u['maxOv'], r['ov']); u['minFs'] = min(u['minFs'], r['fs']); u['paged'] = max(u['paged'], r['pg']);
    if r.get('pgx'): u.setdefault('pgx', []); (r['pgx'] not in u['pgx']) and u['pgx'].append(r['pgx'])
    u['chOut'] += bool(r.get('chOut'))
    if r['menuOut'] and u['menuOut'] == 1: shot(pg, 'menu_out')
FB = {'other': {'zh': '醫院藥局實習', 'en': 'Hospital pharmacy internship', 'th': 'ฝึกงานร้านยาโรงพยาบาล'}, 'cmt': {'zh': '藥袋可以放大一點。', 'en': 'Please make the drug bags bigger.', 'th': 'อยากให้ซองยาซูมได้ใหญ่กว่านี้'}}
def handle_fb(pg):
    time.sleep(0.5); pg.click('#fbBox [data-r="4"]'); pg.click('#fbBox [data-g="ward"]'); pg.click('#fbBox [data-g="talk"]')
    pg.fill('#fbOther', FB['other'][LANG]); pg.fill('#fbCmt', FB['cmt'][LANG]); time.sleep(0.3); shot(pg, '13_feedback')
    pg.click('#fbSend'); time.sleep(0.4); notes['fb'] = pg.evaluate("()=>window.__PD__.S.fb")
def pump(pg, until=None, maxn=320, pick=0):
    for _ in range(maxn):
        uichk(pg)
        if until and until(): return True
        if vis(pg, '#modal'): pg.click('#mCard [data-mb="0"]'); time.sleep(0.3); continue
        if vis(pg, '#calcBox'): handle_calc(pg); continue
        if vis(pg, '#cqBox'): handle_cq(pg); continue
        if vis(pg, '#fbBox'): handle_fb(pg); continue
        if vis(pg, '#isim') and handle_sim(pg): continue
        if vis(pg, '#cgame') and handle_cg(pg): continue
        if vis(pg, '#epiBox'): time.sleep(1.0); shot(pg, 'epilogue'); pg.click('#epiOk'); time.sleep(0.3); continue
        if pg.evaluate("()=>!!document.querySelector('#intro')"): pg.click('#intro'); time.sleep(0.4); continue
        if vis(pg, '#getCard'): pg.click('#gOk'); time.sleep(0.3); continue
        if vis(pg, '#choices'):
            n = pg.evaluate("()=>document.querySelectorAll('#choices .cbtn').length")
            if n: time.sleep(0.3); pg.click(f'#choices .cbtn[data-i="{min(pick, n - 1)}"]'); time.sleep(0.3); continue
        if pg.evaluate("()=>!!document.querySelector('#chapter')"): time.sleep(0.4); continue
        busy = pg.evaluate("()=>!!(window.__PD__.D.res||window.__PD__.D.typing)")
        if vis(pg, '#tbox') and busy: pg.click('#tbox'); time.sleep(0.2); continue
        time.sleep(0.3)
    return False
def after_q(pg):
    pump(pg, until=lambda: vis(pg, '#board') or vis(pg, '#choices') or vis(pg, '#searchHud'))
    if vis(pg, '#choices'): time.sleep(0.2); pg.click('#choices .cbtn[data-i="0"]'); pump(pg, until=lambda: vis(pg, '#board') or vis(pg, '#searchHud'))
def ask(pg, card):
    if not vis(pg, '#board') or not pg.evaluate(f"()=>!!document.querySelector('#cards [data-t=\"{card}\"]')"): return False
    pg.click(f'#cards [data-t="{card}"]'); time.sleep(0.3); after_q(pg); return True
def free(pg, text):
    if not vis(pg, '#board'): return
    pg.fill('#freeIn', text); pg.click('#freeSend'); time.sleep(0.3); after_q(pg)

with sync_playwright() as p:
    b = p.chromium.launch()
    pg = b.new_page(viewport={'width': 844, 'height': 390} if MOB else {'width': 1440, 'height': 810}, is_mobile=MOB, has_touch=MOB, device_scale_factor=2 if MOB else 1, **({'user_agent': 'Mozilla/5.0 (iPhone; CPU iPhone OS 17_5 like Mac OS X) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.5 Mobile/15E148 Safari/604.1'} if os.environ.get('UA') == 'ios' else {}))
    pg.on('pageerror', lambda e: errors.append(str(e)))
    pg.add_init_script("try{localStorage.setItem('phd_view','" + VIEWM + "')}catch(e){}")
    if os.environ.get('LOOK'): pg.add_init_script("try{localStorage.setItem('phd_look'," + repr(os.environ['LOOK']) + ")}catch(e){}")
    pg.on('console', lambda m: logs.append(m.type + ': ' + m.text) if m.type in ('error', 'warning') else None)
    pg.route('**/*fonts.g*/**', lambda r: r.abort())
    pg.goto(URL); time.sleep(1.5)
    pg.click(f'.lbtn[data-lang="{LANG}"]'); time.sleep(0.2); (pg.click(f'.msel[data-mode="{MODE}"]') if pg.evaluate("()=>{const m=document.querySelector('.moderow'); return !!m && getComputedStyle(m).display!=='none'}") else None); time.sleep(0.2)
    shot(pg, '00_title')
    pg.fill('#inName', TXT['name'][LANG]); pg.fill('#inSid', 'B1090'); pg.click('#btnStart')
    pump(pg, until=lambda: vis(pg, '#choices'))
    i = pg.evaluate("()=>{const b=[...document.querySelectorAll('#choices .cbtn')].find(x=>/打招呼|問好|自我介紹|Greet|introduce|ทักทาย|แนะนำตัว/i.test(x.textContent)); return b?b.dataset.i:'0'}")
    pg.click(f'#choices .cbtn[data-i="{i}"]'); time.sleep(0.3)
    pump(pg, until=lambda: vis(pg, '#board'))
    notes['first'] = pg.evaluate("()=>window.__PD__.S.first")
    time.sleep(0.4); shot(pg, '02_board')
    TOP = pg.evaluate("()=>TOPICS1.map(t=>t.id)"); FOL = pg.evaluate("()=>FOLLOW1.map(f=>[f.id,f.parent])")
    free(pg, TXT['empathy'][LANG])
    asked = []
    TOP = [t for t in TOP if t != 'hope']; TOP.insert(min(3, len(TOP)), 'hope')   # what the patient hopes for: early, it opens up the talk
    for t in TOP:
        if t == 'checkup': free(pg, TXT['confid'][LANG])
        if ask(pg, t): asked.append(t)
        if len(asked) >= 4 and not notes.get('r1'): notes['r1'] = 1; reload_resume(pg, 'ch1', lambda: vis(pg, '#board'))
        for fid, par in FOL:
            if par == t and ask(pg, fid): asked.append(fid)
        if t == 'family': free(pg, TXT['storage'][LANG]); free(pg, TXT['allergy'][LANG]); free(pg, TXT['otc'][LANG])
    notes['asked'] = asked; notes['ch1'] = pg.evaluate("()=>({found:Object.keys(window.__PD__.S.found).sort(), hiddenQ:window.__PD__.S.hiddenQ, trust:window.__PD__.S.trust, pat:window.__PD__.S.pat, visit:window.__PD__.S.visit})")
    shot(pg, '03_board_late')
    if vis(pg, '#board'):
        pg.click('#boardNext'); time.sleep(0.4)
        if vis(pg, '#modal'): pg.click('#mCard [data-mb="0"]'); time.sleep(0.3)
    pump(pg, until=lambda: vis(pg, '#searchHud'))
    time.sleep(1.0); shot(pg, '05_search')
    plan = pg.evaluate("""()=>{ const key=new Set(KEY_ITEMS), z={}; Object.entries(window.__PD__.ZONES).forEach(([k,v])=>v.hs.forEach(h=>z[h]=k));
       const hs=Object.entries(HOTSPOTS).filter(([h,v])=>v.item).map(([h,v])=>({h, zone:z[h]||null, item:v.item, key:key.has(v.item)}));
       return hs; }""")
    zorder = list(dict.fromkeys([x['zone'] for x in plan]))
    plan.sort(key=lambda x: zorder.index(x['zone']))
    notes['hotspots'] = [(x['h'], x['zone'], x['item'], x['key']) for x in plan]
    cur = None
    for x in plan:
        if pg.evaluate("()=>window.__PD__.S.charges") <= 0 or not vis(pg, '#searchHud'): break
        if x['zone'] != cur:
            if cur and vis(pg, '#zoomBack'): pg.click('#zoomBack'); time.sleep(0.9)
            if x['zone']: pg.click(f'#bg .cur [data-zone="{x["zone"]}"]', force=True); time.sleep(1.0)
            cur = x['zone']
        try: pg.click(f'#bg .cur [data-hs="{x["h"]}"]', force=True)
        except Exception as e:
            print('HS FAIL', x, pg.evaluate("(h)=>{ const g=document.querySelector('#bg .cur [data-hs=\"'+h+'\"]'); const r=g.getBoundingClientRect(); return {zoomed:window.__PD__.D.zoomed, cam:document.querySelector('#bgCam').style.transform, rect:[r.x,r.y,r.width,r.height], vw:innerWidth, vh:innerHeight, cls:document.querySelector('#stage').className, opened:Object.keys(window.__PD__.S.opened)}; }", x['h'])); shot(pg, 'hs_fail'); raise
        for _ in range(16):   # first-person view shows the hand first, so the card can come late
            time.sleep(0.25)
            if vis(pg, '#getCard'): time.sleep(0.3); pg.click('#gOk'); time.sleep(0.6); break
        pump(pg, until=lambda: vis(pg, '#searchHud') and not vis(pg, '#tbox') and not vis(pg, '#getCard'), maxn=40)
        notes['spots'] = notes.get('spots', 0) + 1
        if notes['spots'] == 3 and RES: reload_resume(pg, 'ch2', lambda: vis(pg, '#searchHud') and not vis(pg, '#tbox')); cur = None
    if cur and vis(pg, '#zoomBack'): pg.click('#zoomBack'); time.sleep(0.9)
    notes['evidence'] = pg.evaluate("()=>window.__PD__.S.evidence"); notes['missing_key'] = pg.evaluate("()=>KEY_ITEMS.filter(k=>!window.__PD__.S.evidence.includes(k))")
    pump(pg, until=lambda: not vis(pg, '#getCard') and not vis(pg, '#tbox'), maxn=30)
    if vis(pg, '#sDone'): pg.click('#sDone'); time.sleep(0.3)
    if vis(pg, '#modal'): pg.click('#mCard [data-mb="0"]'); time.sleep(0.3)
    notes['search_end'] = pg.evaluate("()=>({charges:window.__PD__.S.charges, visit:window.__PD__.S.visit, timeout:!!window.__PD__.S.timeout})")
    pump(pg, until=lambda: vis(pg, '#testiUI'))
    time.sleep(0.5); shot(pg, '09_testimony')
    TESTI = pg.evaluate("()=>TESTI.map(t=>({need:[].concat(t.need)[0], near:t.near||[]}))")
    for k in range(30):
        if not vis(pg, '#testiUI'): break
        idx = pg.evaluate("()=>{const m=document.querySelector('#tName').textContent.match(/〔(\\d)\\//); return m?m[1]:'1'}")
        item = TESTI[int(idx) - 1]['need']
        pg.click('#tPresent'); time.sleep(0.35)
        if vis(pg, '#tray'): pg.click(f'[data-e="{item}"]')
        time.sleep(0.3)
        pump(pg, until=lambda: vis(pg, '#testiUI') or vis(pg, '#locks') or vis(pg, '#inputBox') or vis(pg, '#medrev') or vis(pg, '#inhal'))
        if vis(pg, '#testiUI') and not notes.get('r3') and pg.evaluate("()=>Object.keys(window.__PD__.S.seg&&window.__PD__.S.seg.t3&&window.__PD__.S.seg.t3.solved||{}).length") >= 2: notes['r3'] = 1; reload_resume(pg, 'ch3', lambda: vis(pg, '#testiUI'))
        if vis(pg, '#locks') or vis(pg, '#inputBox') or vis(pg, '#medrev') or vis(pg, '#inhal'): break
    notes['before_lock'] = pg.evaluate("()=>({hearts:window.__PD__.S.hearts, trust:window.__PD__.S.trust, found:Object.keys(window.__PD__.S.found).length})")
    for k in range(60):
        if vis(pg, '#tray'): pg.click('[data-e="pillbox"]'); time.sleep(0.4); continue
        if vis(pg, '#inputBox'):
            if vis(pg, '#inChips'): pg.click('#inChips [data-c="1"]'); pg.click('#inChips [data-c="2"]')
            else: pg.fill('#inText', TXT['lock'][LANG])
            pg.click('#inSend'); time.sleep(0.4); continue
        if pg.evaluate("()=>window.__PD__.S.found.P8!=null||!!window.__PD__.S.refused"): break
        if vis(pg, '#choices'): pg.click('#choices .cbtn[data-i="0"]'); time.sleep(0.4); continue
        if vis(pg, '#tbox'): pg.click('#tbox'); time.sleep(0.25); continue
        time.sleep(0.3)
    notes['P8'] = pg.evaluate("()=>window.__PD__.S.found.P8!=null"); notes['refused'] = pg.evaluate("()=>window.__PD__.S.refused||null")
    pump(pg, until=lambda: vis(pg, '#medrev'), pick=0)
    NM = pg.evaluate("()=>window.__PD__.MISSIONS.length")
    for i in range(NM):
        pump(pg, until=lambda: vis(pg, '#medrev') and pg.evaluate("()=>!!document.querySelector('#mrOk') && !document.querySelector('#medrev [data-d].ok, #medrev [data-d].miss, #medrev [data-d].bad') && ![...document.querySelectorAll('#medrev [data-d]')].some(c=>c.style.opacity)"), pick=0)
        if i == 3: reload_resume(pg, 'ch4', lambda: vis(pg, '#medrev') and pg.evaluate("()=>!!document.querySelector('#mrOk')"))
        ans = pg.evaluate(f"()=>window.__PD__.MISSIONS[{i}].ans")
        if pg.locator('#medrev .acb-bins').count():
            try:
                for id_, bins in pg.evaluate("()=>Object.entries(ACB_KEY)"):
                    pg.click(f'#medrev .acard[data-d="{id_}"]', timeout=8000); time.sleep(0.08); pg.click(f'#medrev .acb-bin[data-bin="{bins[0]}"] h4', timeout=8000); time.sleep(0.08)
            except Exception as e:
                shot(pg, 'acb_fail'); print('ACB FAIL', pg.evaluate("()=>({hidden:document.querySelector('#medrev').className, tray:[...document.querySelectorAll('#acbTray .acard')].map(c=>c.dataset.d), bins:[...document.querySelectorAll('.acb-bin')].map(b=>b.dataset.bin+':'+[...b.querySelectorAll('.acard')].map(c=>c.dataset.d).join(',')), head:(document.querySelector('#medrev .mr-head .tx')||{}).textContent, timer:(document.querySelector('#mrTimer')||{}).textContent})")); raise
            notes['acb'] = True
        elif pg.locator('#medrev .dm-board').count():
            for a_ in ans: pg.click(f'#medrev .dm-board [data-d="{a_}"]'); time.sleep(0.1)
            notes['daymr'] = True
        else:
            for a_ in ans: pg.click(f'#medrev .dcard[data-d="{a_}"]'); time.sleep(0.1)
        if i == 0: shot(pg, '12_mission')
        pg.click('#mrOk'); time.sleep(0.6)
        if pg.locator('#mrNext').count():   # the result panel stays until Continue (mk_clarity.py)
            if i == 0: shot(pg, '12_mission_result')
            time.sleep(0.8); pg.click('#mrNext'); time.sleep(0.4)
    notes['mr'] = pg.evaluate("()=>window.__PD__.S.mr.perfect"); notes['missions'] = NM
    for turn in range(10):
        if not pump(pg, until=lambda: pg.evaluate("()=>document.querySelectorAll('#bossCards .ccard').length") > 0 or vis(pg, '#finalBox'), maxn=160): break
        if vis(pg, '#finalBox'): break
        if turn == 2 and not notes.get('r5'): notes['r5'] = 1; reload_resume(pg, 'ch5', lambda: pg.evaluate("()=>document.querySelectorAll('#bossCards .ccard').length") > 0)
        mi = pg.evaluate("()=>MYTHS.filter(m=>m.p!=='P8'||window.__PD__.S.found.P8)[window.__PD__.S.boss.answers.length].p")
        j = pg.evaluate("(p)=>{const m=MYTHS.find(x=>x.p===p); const want=L(m.c.find(c=>c[0]===2)[1]); const cs=[...document.querySelectorAll('#bossCards .ccard')]; return Math.max(0,cs.findIndex(c=>c.textContent.includes(want.slice(0,40))))}", mi)
        if turn == 0: time.sleep(0.5); shot(pg, '13_boss')
        pg.click(f'#bossCards .ccard[data-j="{j}"]'); time.sleep(0.9)
    pump(pg, until=lambda: vis(pg, '#finalBox'))
    FINAL = pg.evaluate("()=>SUM_ORDER.map(i=>L(RUBRIC_SUM[i].ex)).join('\\n')")
    pg.fill('#fText', FINAL); time.sleep(0.3); shot(pg, '13c_final'); pg.click('#fSend'); time.sleep(0.5)
    if vis(pg, '#fWarn'): pg.click('#fAnyway'); time.sleep(0.5)
    notes['finalCov'] = pg.evaluate("(t)=>sumCoverage(t)", FINAL)
    pump(pg, until=lambda: vis(pg, '#results'), maxn=600)
    time.sleep(1.8); shot(pg, '14_results')
    for t in ['prob', 'bdg'] + (['inh'] if pg.locator('#results [data-rt="inh"]').count() else []): pg.click(f'#results [data-rt="{t}"]'); time.sleep(0.4); shot(pg, f'14_results_{t}')
    notes['result'] = pg.evaluate("()=>({rank:window.__PD__.S.rank, score:window.__PD__.S.score, found:Object.keys(window.__PD__.S.found).length, of:PROBLEMS.length, missed:PROBLEMS.filter(p=>!(p.id in window.__PD__.S.found)).map(p=>p.id), ending:window.__PD__.S.ending&&window.__PD__.S.ending.tier, pp:[Object.values(window.__PD__.S.pp.pre).filter(x=>x.ok).length, Object.values(window.__PD__.S.pp.post).filter(x=>x.ok).length], visitLeft:window.__PD__.S.visit, calc:window.__PD__.S.calc})")
    pg.evaluate("()=>window.__PD__.openPage('teacher')"); time.sleep(0.3); pg.fill('#pinIn', '1234'); pg.click('#mCard [data-mb="0"]'); time.sleep(0.5)
    pg.click('[data-pt="tSessions"]'); time.sleep(0.4); pg.click('details.scard summary'); time.sleep(0.3); shot(pg, '16_teacher')
    pg.click('[data-pt="tDebrief"]'); time.sleep(0.4); shot(pg, '18_debrief')
    pg.click('[data-pt="tClass"]'); time.sleep(0.5); shot(pg, '19_class')
    if pg.evaluate("()=>{ const h=[...document.querySelectorAll('.clsec h4')].find(x=>/💌/.test(x.textContent)); if(h) h.scrollIntoView(); return !!h; }"): time.sleep(0.3); shot(pg, '19_class_fb')
    time.sleep(2.5)
    notes['sync'] = pg.evaluate("()=>({state:SYNC.state, outbox:Object.keys(JSON.parse(localStorage.getItem('phd_outbox_v1')||'{}')).length, case:CASE_ID, sid:window.__PD__.S.sessionId})")
    open(f'{OUT}/{TAG}_sessions.json', 'w', encoding='utf-8').write(pg.evaluate("()=>localStorage.getItem(CONFIG.STORAGE_KEY)||'[]'"))
    notes['fbSaved'] = pg.evaluate("()=>{ const a=JSON.parse(localStorage.getItem(CONFIG.STORAGE_KEY)||'[]'); const s=a.find(x=>x.id===window.__PD__.S.sessionId); return s&&s.fb; }")
    pg.reload(); time.sleep(2.5)
    if vis(pg, '#btnHist'):
        pg.click('#btnHist'); time.sleep(0.6); shot(pg, '20_hist_sum')
        for t in ['ask', 'ans']: pg.click(f'#hsUI [data-ht="{t}"]'); time.sleep(0.4); shot(pg, f'20_hist_{t}')
        notes['hist'] = pg.evaluate("()=>({games:document.querySelectorAll('#hsPick option').length||1, rows:document.querySelectorAll('#hsUI .hrow').length, h4:[...document.querySelectorAll('#hsUI h4')].map(x=>x.textContent)})")
        pg.evaluate("()=>{ const b=document.querySelector('#hsUI .bd'); b.scrollTop=b.scrollHeight; }"); time.sleep(0.3); shot(pg, '20_hist_ans_end')
    else: notes['hist'] = 'no button'
    b.close()
notes['errors'] = errors; notes['logs'] = [l for l in logs if 'ERR_FAILED' not in l and 'Failed to load resource' not in l][:8]
open(f'{OUT}/{TAG}_notes.json', 'w', encoding='utf-8').write(json.dumps(notes, ensure_ascii=False, indent=1))
print(TAG, json.dumps({k: notes.get(k) for k in ('resume', 'result', 'fb', 'fbSaved', 'hist', 'cg', 'acb', 'daymr', 'ui', 'missing_key', 'P8', 'refused', 'mr', 'missions', 'finalCov', 'sync', 'errors', 'logs', 'sim')}, ensure_ascii=False))
