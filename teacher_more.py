import os, sys, time, json, glob
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
SP = os.path.dirname(os.path.abspath(__file__)); CASE = sys.argv[1]; LANG = sys.argv[2]
sess = []
for f in glob.glob(f'{SP}/t15/{CASE}_*_sessions.json'): sess += json.load(open(f))
with sync_playwright() as p:
    b = p.chromium.launch(); pg = b.new_page(viewport={'width': 1600, 'height': 900}); errs = []
    pg.on('pageerror', lambda e: errs.append(str(e))); pg.route('**/*fonts.g*/**', lambda r: r.abort())
    pg.goto(f'http://localhost:8100/case-{CASE}/?lang={LANG}'); time.sleep(1.0)
    pg.evaluate("(s)=>{ localStorage.setItem(CONFIG.STORAGE_KEY, JSON.stringify(s)); }", sess)
    pg.evaluate("()=>window.__PD__.openPage('teacher')"); time.sleep(0.3); pg.fill('#pinIn', '1234'); pg.click('#mCard [data-mb="0"]'); time.sleep(0.8)
    pg.click('[data-pt="tSessions"]'); time.sleep(0.5); pg.click('details.scard summary'); time.sleep(0.4)
    pg.evaluate("()=>{ const d=document.querySelector('details.scard .in h4:nth-of-type(2)'); if(d) d.scrollIntoView(); }"); time.sleep(0.3)
    pg.screenshot(path=f'{SP}/t22/more_{CASE}_card.png')
    pg.fill('#sQ', 'zzz'); time.sleep(0.6); n0 = pg.evaluate("()=>document.querySelectorAll('details.scard').length")
    pg.fill('#sQ', ''); time.sleep(0.6); n1 = pg.evaluate("()=>document.querySelectorAll('details.scard').length")
    pg.click('[data-pt="tCustom"]'); time.sleep(0.5); pg.click('[data-sub="q"]'); time.sleep(0.5); pg.screenshot(path=f'{SP}/t22/more_{CASE}_q.png')
    pg.click('#qAdd'); time.sleep(0.5); form = pg.evaluate("()=>!!document.querySelector('#page .pcard input, #page .pcard textarea')"); pg.screenshot(path=f'{SP}/t22/more_{CASE}_qform.png')
    pg.click('[data-sub="txt"]'); time.sleep(0.6); pg.screenshot(path=f'{SP}/t22/more_{CASE}_txt.png')
    pg.click('[data-sub="img"]'); time.sleep(0.6); pg.screenshot(path=f'{SP}/t22/more_{CASE}_img.png')
    pg.click('[data-sub="set"]'); time.sleep(0.4); pg.fill('[data-st="VISIT_MIN"]', '45'); pg.dispatch_event('[data-st="VISIT_MIN"]', 'change'); time.sleep(0.6)
    dirty = pg.evaluate("()=>document.querySelector('.tpub').classList.contains('dirty')")
    pg.click('[data-pt="tHome"]'); time.sleep(0.4); sub = 'no mode card' if not pg.locator('#thModeBtn').count() else 'MODE CARD STILL THERE'
    print('search none', n0, 'all', n1, 'qform', form, 'dirty after change', dirty, 'mode->sub', sub, 'errs', errs); b.close()
