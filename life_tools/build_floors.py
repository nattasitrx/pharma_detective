import re,shutil,os
s=open('/home/claude/src/life/index.html',encoding='utf-8').read()
def sub(a,b,n=1):
    global s
    assert s.count(a)==n,(a[:70],s.count(a)); s=s.replace(a,b)
# 1. cut the old days
a=s.find('\nasync function day1('); b=s.find('\nfunction ringGame(')
c0=s.rfind('/*',0,a); a=c0 if a-c0<400 else a
old1=s[a:b]; s=s[:a]+'\n'+s[b:]
a=s.find('\nasync function day2('); c0=s.rfind('/*',0,a); a=c0 if a-c0<300 else a
b=s.find('const DAYS={')
s=s[:a]+open('/home/claude/src/life_tools/sfx_extra.js',encoding='utf-8').read()+open('/home/claude/src/life_tools/floors_days.js',encoding='utf-8').read()+'\n'+s[b:]
# 2. day table, start, end
sub("const DAYS={1:day1,2:day2,3:day3,4:day4,5:day5,6:day6,7:day7};","const DAYS={1:f1,2:f2,3:f3};")
sub("preload(n===1||!DAYS[n]?[day1,morning,phone,pot,toilet,noon,radio,evening,dinner,night,report]:[DAYS[n],greenRoutine]);","preload([DAYS[n]||f1,greenRoutine]);")
sub("(DAYS[n]||day1)();","(DAYS[n]||f1)();")
sub("(n<7?`<button class=\"btn go\" data-go=\"${n+1}\">ไปวันที่ ${n+1}</button>`:'')","(n<3?`<button class=\"btn go\" data-go=\"${n+1}\">ไปวันที่ ${n+1}</button>`:'')")
sub("MINS=[0,12,8,6,20,6,7,8];","MINS=[0,8,10,7];")
sub("let pickDay=Math.min(7,(P.done||0)+1);","let pickDay=Math.min(3,(P.done||0)+1);")
sub("$('#days').innerHTML=[1,2,3,4,5,6,7].map(","$('#days').innerHTML=[1,2,3].map(")
sub("'เริ่มวันที่ '+pickDay+' · วัน'+['','อังคาร','พุธ','พฤหัส','ศุกร์','เสาร์','อาทิตย์','จันทร์'][pickDay]","'เริ่มวันที่ '+pickDay+' · '+['','ลงไม่ได้','วันเยี่ยม','สี่ชั้น'][pickDay]")
# 3. saved data keys, separate from the seven-day game
for k,v in [('lee7v1','lee4v1'),('lee7run7','lee4run1')]:
    assert k in s; s=s.replace(k,v)
# 4. titles and credits
sub("<h1>เจ็ดวันของลุงหลี่</h1> <div class=\"sub\">ชายอายุแปดสิบแปด หมาอายุสิบสี่<br>ห้องหนึ่งห้องบนชั้นสี่ และหนึ่งสัปดาห์</div>","<h1>สี่ชั้นของลุงหลี่</h1> <div class=\"sub\">ชายอายุแปดสิบแปด หมาแก่หนึ่งตัว<br>บันไดสี่ชั้น ไม่มีลิฟต์</div>") if "<h1>เจ็ดวันของลุงหลี่</h1> <div class=\"sub\">" in s else None
s=re.sub(r'<h1>เจ็ดวันของลุงหลี่</h1>\s*<div class="sub">.*?</div>','<h1>สี่ชั้นของลุงหลี่</h1>\n    <div class="sub">ชายอายุแปดสิบแปด หมาแก่หนึ่งตัว<br>บันไดสี่ชั้น ไม่มีลิฟต์</div>',s,count=1,flags=re.S)
s=s.replace('<h2>เจ็ดวันของลุงหลี่</h2>','<h2>สี่ชั้นของลุงหลี่</h2>')
s=re.sub(r'<title>[^<]*</title>','<title>สี่ชั้นของลุงหลี่</title>',s,count=1)
sub("สร้างด้วยเครื่องมือสร้างภาพ AI ใน Canva แล้วคัดเลือกโดยผู้พัฒนา","สร้างด้วยเครื่องมือสร้างภาพ AI (Canva และ ChatGPT) แล้วคัดเลือกโดยผู้พัฒนา")
print('left "เจ็ดวัน":',s.count('เจ็ดวัน'))
# 5. sound notes from the owner
sub("let n=0, done=false, t=null; amb('tick',.8);","let n=0, done=false, t=null;")
sub("a.innerHTML=''; amb('tick',0); res(r); };","a.innerHTML=''; res(r); };")
sub("['cough','bark','pant','grunt','knock','gulp','creak','tick','drip','birds','ring','thud','puff','step']","['cough','bark','pant','knock','gulp','creak','drip','birds','ring','thud','puff','step']")
sub("Math.min(dt/11000,target-prog)","Math.min(dt/21000,target-prog)")
# 6. pictures
i=s.find('const IMG={'); s=s[:i+11]+'window:1,knee:1,stairkid:1,leashfeet:1,corridor_dog:1,landing_dog:1,dogface:1,busstop_dog:1,floor_dog:1,'+s[i+11:]
# 7. styles: calendar card; hide money and energy; archive button off
css="""
#money,#en,#archB{display:none!important}
.cal{background:#fbf3df;color:#3a2a20;border-radius:6px;padding:12px 12px 10px;box-shadow:0 10px 30px rgba(0,0,0,.45);font-family:'Sarabun',sans-serif;width:min(88vw,360px)}
.cal h4{margin:0 0 6px;font:600 15px/1.2 'Noto Serif Thai',serif;text-align:center;color:#9c4526}
.cal .wk,.cal .gr{display:grid;grid-template-columns:repeat(7,1fr);gap:3px}
.cal .wk span{font-size:11px;text-align:center;opacity:.6}
.cal .gr i{font-style:normal;border:1px solid rgba(60,40,30,.18);border-radius:3px;height:38px;position:relative;background:#fffaf0}
.cal .gr i.td{border-color:#c0492b;box-shadow:0 0 0 1.5px #c0492b inset}
.cal .gr u{position:absolute;left:3px;top:1px;font-size:9px;text-decoration:none;opacity:.5}
.cal .gr b{position:absolute;inset:11px 0 0;display:flex;align-items:center;justify-content:center;font:500 12.5px/1 'Mali',cursive;color:#274a8a;transform:rotate(-4deg)}
.cal .gr b.new{animation:calw .7s ease both;color:#b3261e}
.cal p{margin:8px 0 0;font-size:12px;text-align:center;opacity:.7}
@keyframes calw{from{opacity:0;transform:rotate(-4deg) scale(1.6)}to{opacity:1;transform:rotate(-4deg) scale(1)}}
"""
i=s.find('</style>'); s=s[:i]+css+s[i:]
s=s.replace(" 'night' 'letter'\""," 'night'\"")
# ---- language layer (Thai / Traditional Chinese)
zh=open('/home/claude/src/life_tools/floors_zh.json',encoding='utf-8').read().replace('</','<\\/')
i18=open('/home/claude/src/life_tools/i18n.js',encoding='utf-8').read().replace('__ZH__',zh)
assert s.count('<script>')==1
s=s.replace('<script>','<script>\n'+i18,1)
cb='<button id="credB">'; assert cb in s
s=s.replace(cb,'<button id="langB" data-nt aria-label="Language / 語言 / ภาษา">中文</button>'+cb,1)
css="""#langB{appearance:none;border:1px solid rgba(255,248,234,.45);border-radius:999px;background:none;color:#fff8ea;font:600 14px/1 'Sarabun','Noto Serif TC',sans-serif;margin-top:14px;padding:9px 18px;cursor:pointer}
html.zh body,html.zh button,html.zh #txt,html.zh #title *,html.zh #cred *,html.zh #pause *,html.zh #acts *,html.zh #clock,html.zh #more,html.zh #diary .next,html.zh #ffw{font-family:'Noto Serif TC','Songti TC','PMingLiU','Noto Serif CJK TC',serif !important}
html.zh #diary .pg,html.zh #diary .pg *,html.zh .cal,html.zh .cal *{font-family:'LXGW WenKai TC','Noto Serif TC','Kaiti TC','DFKai-SB',serif !important}
html.zh #langB{font-family:'Sarabun',sans-serif !important}
"""
assert '</style>' in s; s=s.replace('</style>',css+'</style>',1)
open('/home/claude/src/floors/index.html','w',encoding='utf-8').write(s)
open('/tmp/chk.js','w').write('\n'.join(re.findall(r'<script(?![^>]*src)[^>]*>(.*?)</script>',s,re.S)))
print('size',len(s),'cut1',len(old1))
