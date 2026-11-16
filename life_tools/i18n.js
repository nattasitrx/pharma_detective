/* ---- language layer: Thai is the source text; in zh mode every Thai text node is swapped on the fly ---- */
const I18=(()=>{ const D=__ZH__, M=D.map, CTX=D.ctx, TH=/[฀-๿]/;
  let lang='th'; try{ const q=new URLSearchParams(location.search).get('lang'); lang=q||localStorage.getItem('lee4lang')||(/^zh/i.test(navigator.language||'')?'zh':'th'); }catch(e){}
  if(lang!=='zh') lang='th';
  const R=[
    [/^เสียง: (.+)$/, m=>'聲音：'+tr(m[1])], [/^ลดการเคลื่อนไหว: (.+)$/, m=>'減少畫面晃動：'+tr(m[1])],
    [/^วันที่ (\d+) จะเปิดเมื่อเล่นวันก่อนหน้าจบ$/, m=>'玩完前一天，第 '+m[1]+' 天才會開啟'],
    [/^วันนี้ใช้เวลาราว (\d+) นาที(.*)$/, m=>'這一天大約 '+m[1]+' 分鐘'+(m[2]?' · 中途可以休息，回來再接著玩':'')],
    [/^เริ่มวันที่ (\d+) · (.+)$/, m=>'開始第 '+m[1]+' 天 · '+tr(m[2])], [/^เล่นต่อ วันที่ (\d+) จากที่ค้างไว้$/, m=>'從上次停下的地方繼續 · 第 '+m[1]+' 天'],
    [/^ไปวันที่ (\d+)$/, m=>'前往第 '+m[1]+' 天'], [/^ก้าวที่ (\d+) จาก (\d+)$/, m=>'第 '+m[1]+' 步 / 共 '+m[2]+' 步'],
    [/^กลืนเม็ดที่(.+)$/, m=>'吞下第'+tr(m[1])+'顆'], [/^ลิ้นชักยา: (.+)$/, m=>'藥抽屜：'+tr(m[1])],
    [/^(.+?) · (.+)$/, m=>tr(m[1])+' · '+tr(m[2])] ];
  function tr(s){ if(!TH.test(s)) return s; if(M[s]!=null) return M[s]; for(const [re,f] of R){ const m=re.exec(s); if(m) return f(m); } (window.__miss=window.__miss||[]).push(s); return s; }
  function node(n){ const s=n.nodeValue; if(!s||!TH.test(s)) return; const p=n.parentElement; if(p&&p.closest('[data-nt],script,style')) return; const k=s.trim(); let z=null;
    if(p) for(const sel in CTX){ if(CTX[sel][k]!=null&&p.closest(sel)){ z=CTX[sel][k]; break; } }
    if(z==null) z=tr(k); if(z!==k) n.nodeValue=s.replace(k,z); }
  function walk(el){ if(el.nodeType===3){ node(el); return; } if(el.nodeType!==1) return; const w=document.createTreeWalker(el,NodeFilter.SHOW_TEXT); let n; const a=[]; while(n=w.nextNode()) a.push(n); a.forEach(node); }
  if(lang==='zh'){ const h=document.documentElement; h.lang='zh-Hant'; h.classList.add('zh'); document.title=M['สี่ชั้นของลุงหลี่'];
    const l=document.createElement('link'); l.rel='stylesheet'; l.href='https://fonts.googleapis.com/css2?family=LXGW+WenKai+TC&family=Noto+Serif+TC:wght@400;600&display=swap'; document.head.appendChild(l);
    walk(document.body);
    new MutationObserver(ms=>{ for(const m of ms){ if(m.type==='characterData') node(m.target); else m.addedNodes.forEach(walk); } }).observe(document.body,{childList:true,subtree:true,characterData:true}); }
  const b=document.getElementById('langB'); if(b){ b.textContent=lang==='zh'?'ภาษาไทย':'中文'; b.onclick=()=>{ try{ localStorage.setItem('lee4lang',lang==='zh'?'th':'zh'); }catch(e){} const u=new URL(location.href); u.searchParams.delete('lang'); location.replace(u.href); }; }
  return {lang,tr}; })();
