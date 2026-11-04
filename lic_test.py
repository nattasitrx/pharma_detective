"""Title screen shows the credits line; it opens the About & licence card in each language; no overlap with the panel."""
import os, time
os.environ.setdefault('PLAYWRIGHT_BROWSERS_PATH', '/opt/pw-browsers')
from playwright.sync_api import sync_playwright
fails=[]; errs=[]
def check(n,c,x=''):
    print(('PASS ' if c else 'FAIL ')+n, '' if c else x); (None if c else fails.append(n))
with sync_playwright() as p:
    b=p.chromium.launch()
    for case in 'acd':
        for tag,vp,mob in (('desk',{'width':1440,'height':810},False),('phone',{'width':844,'height':390},True)):
            ctx=b.new_context(viewport=vp,is_mobile=mob,has_touch=mob); pg=ctx.new_page(); pg.on('pageerror',lambda e: errs.append(str(e)))
            pg.route('**/*fonts.g*/**', lambda r: r.abort())
            pg.goto(f'http://localhost:8100/case-{case}/?lang=zh'); time.sleep(2.5)
            for _ in range(10):
                if pg.is_visible('#licBtn'): break
                pg.mouse.click(vp['width']//2, vp['height']//2); time.sleep(0.8)
            check(f'{case} {tag}: credits line on the title', pg.is_visible('#licBtn') and '陳崇鈺' in pg.inner_text('#licBtn') and '僅供本課程教學使用' in pg.inner_text('#licBtn'))
            if pg.is_visible('#licBtn'):
                lb=pg.locator('#licBtn').bounding_box(); tp=pg.locator('#tPanel').bounding_box(); ls=pg.locator('#lkBtn').bounding_box() if pg.locator('#lkBtn').count() else None
                ov=lambda a,c: c and not (a['x']+a['width']<=c['x'] or c['x']+c['width']<=a['x'] or a['y']+a['height']<=c['y'] or c['y']+c['height']<=a['y'])
                check(f'{case} {tag}: no overlap with the panel or ✨ button', not ov(lb,tp) and not ov(lb,ls), (lb,tp,ls))
                check(f'{case} {tag}: inside the screen', lb['y']+lb['height']<=vp['height']+1 and lb['x']>=0, lb)
                if case=='a' or tag=='desk': pg.screenshot(path=f't15/lic_{case}_{tag}.png')
                pg.click('#licBtn'); time.sleep(0.6)
                t=pg.inner_text('#mCard'); check(f'{case} {tag}: card in Chinese', '關於與使用說明' in t and '僅供本課程教學使用' in t and '陳崇鈺' in t and 'Nattasit' in t and 'CC BY' not in t, t[:200])
                check(f'{case} {tag}: contact e-mail link', pg.locator('#mCard a[href="mailto:nattasitrx@gmail.com"]').count()==1)
                check(f'{case} {tag}: professor e-mail link', pg.locator('#mCard a[href="mailto:jk2975525@kmu.edu.tw"]').count()==1)
                if case=='a': pg.screenshot(path=f't15/lic_card_{tag}.png')
                pg.click('#mCard [data-mb="0"]'); time.sleep(0.4); check(f'{case} {tag}: card closes', not pg.is_visible('#modal'))
                if case=='a' and tag=='desk':
                    pg.click('.lbtn[data-lang="en"] >> nth=0'); time.sleep(0.5); check('a: English line', 'Prof. Chung-Yu Chen' in pg.inner_text('#licBtn'), pg.inner_text('#licBtn'))
                    pg.click('#licBtn'); time.sleep(0.5); check('a: English card', 'For teaching in this course only' in pg.inner_text('#mCard')); pg.screenshot(path='t15/lic_card_en.png'); pg.click('#mCard [data-mb="0"]')
                    pg.click('.lbtn[data-lang="th"] >> nth=0'); time.sleep(0.5); pg.click('#licBtn'); time.sleep(0.5); check('a: Thai card', 'ใช้สอนในรายวิชานี้เท่านั้น' in pg.inner_text('#mCard') and 'ณัฐสิทธิ์ รัตนพาณิชย์' in pg.inner_text('#mCard') and 'ณัฐสิทธิ์' in pg.inner_text('#licBtn')); pg.screenshot(path='t15/lic_card_th.png'); pg.click('#mCard [data-mb="0"]')
            ctx.close()
    b.close()
print('errors',errs); print('FAILS',fails)
