/* =====================================================================
   STATE · HELPERS · STORAGE
   ===================================================================== */
const S = {
  lang:URL_LANG||((GAME_CFG.settings||{}).lang)||'zh', student:{name:'',sid:''}, avatar:'me', gender:'f', usedEv:[], calc:{}, first:null, custom:{score:0,max:0,list:[]}, sessionId:null, created:null, t0:0, chStart:0, chT:{}, chapter:0,
  visit:CONFIG.VISIT_MIN, trust:CONFIG.TRUST_START, hearts:CONFIG.HEARTS, found:{}, evidence:[], opened:{}, profile:new Set(['name','reason']),
  asked:{}, questions:0, hints:0, resets:0, wrong:0, charges:CONFIG.SEARCH_CHARGES, empathy:0, privacy:false, overtime:false, met:{},
  boss:{crit:0, ok:0, miss:0, combo:0, maxCombo:0, answers:[], alive:[], byFinal:[]}, mr:{egfr:false, perfect:0, partial:0, wrong:0, ans:[], tags:{}},
  finalText:'', finalCov:[], score:0, rank:'', done:false, medsSeen:false,
  mode:'practice', pat:CONFIG.PATIENCE, fl:{}, hintSpots:[], hiddenQ:[], pp:{pre:{}, post:{}}, refl:[], ending:null, timeout:null, refused:null, badges:[], gate:null, practice:false,
  log:[], notes:{memo:'', labs:{}, labsUnlocked:false}, sound:true, music:true, qte:true, motion:true, textSpeed:'normal'
};
const $=s=>document.querySelector(s), $$=s=>Array.from(document.querySelectorAll(s));
/* play mode: 'practice' (hints + explanations) or 'exam' (no hints, near = wrong, explanations at the end) */
/* exam mode retired (Oct 2026): every game is played in practice mode, whatever an older published version says */
const modeForced=()=>null;
let MODE_FORCED=null;
S.mode='practice';
const EXAM=()=>false;
const LI=()=>Math.max(0,LANGS.indexOf(S.lang));
const T=k=>UI[k]?L(UI[k]):k;
/* gendered Thai words: write "ค่ะ/ครับ", "คะ/ครับ", "ฉัน/ผม", "หนู/ผม" in the text and G() picks one from the player's gender */
const G=s=>{ if(typeof s!=='string'||s.indexOf('/')<0) return s; const f=S.gender!=='m'; return s.replace(/ค่ะ\/ครับ/g,f?'ค่ะ':'ครับ').replace(/คะ\/ครับ/g,f?'คะ':'ครับ').replace(/ฉัน\/ผม/g,f?'ฉัน':'ผม').replace(/หนู\/ผม/g,f?'หนู':'ผม'); };
/* instructor text edits: GAME_CFG.texts maps the original Chinese line → [zh,en,th] ('' = keep original) */
const OVR=new Map(); let OVR_NAME=false;
function loadOverrides(){ OVR.clear(); OVR_NAME=false; Object.entries(GAME_CFG.texts||{}).forEach(([k,v])=>{ if(Array.isArray(v)){ OVR.set(k,v); if(k.includes('{name}')) OVR_NAME=true; } }); }
loadOverrides();
function OV(a){ if(!OVR.size||typeof a[0]!=='string') return a; const nmv=S.student.name||''; let o=OVR.get(a[0]);
  if(!o&&OVR_NAME&&nmv&&a[0].includes(nmv)) o=OVR.get(a[0].split(nmv).join('{name}'));
  if(!o) return a; return [0,1,2].map(i=>{ const v=(o[i]&&String(o[i]).trim())?o[i]:a[i]; return (typeof v==='string'&&v.includes('{name}'))?v.split('{name}').join(nmv||UI.you[LI()]):v; }); }
const L=a=>Array.isArray(a)?G((a=OV(a))[LI()]||a[0]):G(a||'');
const LQ=a=>Array.isArray(a)?G(a[LI()]||a.find(x=>x&&String(x).trim())||''):G(a||'');
const KP=s=>String(s==null?'':s).replace(/[⟦⟧]/g,'');                       // strip key-phrase markers
const kpHTML=s=>esc(s).replace(/⟦/g,'<em class="kp">').replace(/⟧/g,'</em>'); // render key-phrase markers
const esc=s=>String(s==null?'':s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=sec=>{ sec=Math.max(0,Math.round(sec)); return String(Math.floor(sec/60)).padStart(2,'0')+':'+String(sec%60).padStart(2,'0'); };
const rand=(a,b)=>a+Math.random()*(b-a);
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const hasEv=id=>S.evidence.includes(id);
const realSec=()=>S.t0?(Date.now()-S.t0)/1000:0;
const foundCount=()=>Object.keys(S.found).length;
const store={ mem:{}, get(k){ try{ const v=localStorage.getItem(k); return v?JSON.parse(v):null; }catch(e){ return this.mem[k]||null; } }, set(k,v){ try{ localStorage.setItem(k,JSON.stringify(v)); }catch(e){ this.mem[k]=v; } } };
function snapshot(){
  return { id:S.sessionId, student:S.student, avatar:S.avatar, view:(typeof VIEW!=='undefined'&&VIEW.fp)?'fp':'tp', classCode:(typeof classCode==='function'?classCode():'main'), case:CASE_ID, cfgRev:(GAME_CFG.meta&&GAME_CFG.meta.rev)||'', cfgOnline:(GAME_CFG.meta&&GAME_CFG.meta.online)||'', gender:S.gender, lang:S.lang, created:S.created, updated:new Date().toISOString(), realTime:Math.round(realSec()), chT:S.chT, chapter:S.chapter,
    done:S.done, score:S.score, rank:S.rank, visitLeft:S.visit, trust:S.trust, hearts:S.hearts, hints:S.hints, resets:S.resets, wrong:S.wrong, questions:S.questions,
    progress:Math.round(foundCount()/PROBLEMS.length*100), found:S.found, evidence:S.evidence, boss:S.boss, mr:S.mr, finalText:S.finalText, finalCov:S.finalCov, calc:S.calc, first:S.first, custom:S.custom, mode:S.mode, pat:S.pat, fl:S.fl, hiddenQ:S.hiddenQ, pp:S.pp, refl:S.refl, ending:S.ending, timeout:S.timeout, refused:S.refused, badges:S.badges, gate:S.gate, cfgRev:(GAME_CFG.meta&&GAME_CFG.meta.rev)||'', log:S.log, notes:S.notes };
}
let saveTimer=null;
function saveSession(now){ if(!S.sessionId) return; clearTimeout(saveTimer);
  const f=()=>{ const all=store.get(CONFIG.STORAGE_KEY)||[]; const s=snapshot(); const i=all.findIndex(x=>x.id===s.id); if(i>=0) all[i]=s; else all.push(s); store.set(CONFIG.STORAGE_KEY,all); if(typeof syncQueue==='function') syncQueue(s, now); };
  if(now) f(); else saveTimer=setTimeout(f,500); }
function logEvent(o){ S.log.push(Object.assign({t:Math.round(realSec()), ch:S.chapter},o)); saveSession(); }
function download(name,text,type){ const b=new Blob([text],{type:type||'application/json'}); const a=document.createElement('a'); a.href=URL.createObjectURL(b); a.download=name; document.body.appendChild(a); a.click(); setTimeout(()=>{URL.revokeObjectURL(a.href); a.remove();},500); }
function mediaStore(){ return store.get(CONFIG.MEDIA_KEY)||{labImages:[],medBagImages:{}}; }
function itemImages(id){ const m=mediaStore(), c=GAME_CFG.media||{}; return [...new Set([].concat((MEDIA.medBagImages&&MEDIA.medBagImages[id])||[], (c.medBagImages&&c.medBagImages[id])||[], (m.medBagImages&&m.medBagImages[id])||[]))]; }
function itemImage(id){ return itemImages(id)[0]||null; }
function labImages(){ const m=mediaStore(), c=GAME_CFG.media||{}; return [...new Set([].concat(MEDIA.labImages||[], c.labImages||[], m.labImages||[]))]; }

/* =====================================================================
   AUDIO — built-in MiniTone synths: SFX + 5 music themes (no audio files, works offline)
   ===================================================================== */
const AU={ok:false, tried:false, lt:{}, seqs:[], theme:null, want:null};
function at(k,off){ const t=Math.max(Tone.now()+(off||0)+0.01,(AU.lt[k]||0)+0.012); AU.lt[k]=t; return t; }
async function audioStart(){
  if(!window.Tone||AU.ok||AU.tried) return; AU.tried=true;
  try{ await Tone.start(); }catch(e){ return; }
  try{
    AU.sfxBus=new Tone.Volume(-4).toDestination(); AU.bgmBus=new Tone.Volume(-15).toDestination();
    const syn=(o,v,bus)=>{ const s=new Tone.Synth(o).connect(bus||AU.sfxBus); s.volume.value=v||0; return s; };
    AU.blip=syn({oscillator:{type:'square'},envelope:{attack:.002,decay:.05,sustain:0,release:.02}},-21);
    AU.tri=syn({oscillator:{type:'triangle'},envelope:{attack:.003,decay:.14,sustain:0,release:.08}},-7);
    AU.saw=syn({oscillator:{type:'sawtooth'},envelope:{attack:.005,decay:.25,sustain:.1,release:.2}},-14);
    AU.bell=new Tone.PolySynth(Tone.FMSynth,{harmonicity:3,modulationIndex:6,envelope:{attack:.001,decay:.5,sustain:0,release:.5},modulationEnvelope:{attack:.002,decay:.25,sustain:0,release:.2}}).connect(AU.sfxBus); AU.bell.volume.value=-13;
    AU.stab=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sawtooth'},envelope:{attack:.005,decay:.35,sustain:0,release:.3}}).connect(AU.sfxBus); AU.stab.volume.value=-12;
    const hp=new Tone.Filter(2400,'highpass').connect(AU.sfxBus), hp2=new Tone.Filter(4500,'highpass').connect(AU.sfxBus), lp=new Tone.Filter(900,'lowpass').connect(AU.sfxBus), bp=new Tone.Filter({frequency:650,type:'bandpass',Q:1.3}).connect(AU.sfxBus);
    AU.paper=new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.004,decay:.07,sustain:0}}).connect(hp); AU.paper.volume.value=-9;
    AU.plastic=new Tone.NoiseSynth({noise:{type:'white'},envelope:{attack:.001,decay:.03,sustain:0}}).connect(hp2); AU.plastic.volume.value=-11;
    AU.slide=new Tone.NoiseSynth({noise:{type:'brown'},envelope:{attack:.02,decay:.3,sustain:0}}).connect(lp); AU.slide.volume.value=-2;
    AU.thump=new Tone.MembraneSynth({pitchDecay:.04,octaves:5,envelope:{attack:.001,decay:.3,sustain:0}}).connect(AU.sfxBus); AU.thump.volume.value=-6;
    AU.cough=new Tone.NoiseSynth({noise:{type:'white'},envelope:{attack:.004,decay:.16,sustain:0}}).connect(bp); AU.cough.volume.value=2;
    AU.whoosh=new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.15,decay:.35,sustain:0}}).connect(AU.sfxBus); AU.whoosh.volume.value=-14;
    AU.lead=new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.01,decay:.2,sustain:.25,release:.3}}).connect(AU.bgmBus);
    AU.bass=new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.01,decay:.2,sustain:.3,release:.15}}).connect(AU.bgmBus); AU.bass.volume.value=-1;
    AU.pad=new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sine'},envelope:{attack:.25,decay:.6,sustain:.3,release:1.2}}).connect(AU.bgmBus); AU.pad.volume.value=-11;
    AU.kick=new Tone.MembraneSynth({pitchDecay:.03,octaves:6,envelope:{attack:.001,decay:.25,sustain:0}}).connect(AU.bgmBus); AU.kick.volume.value=-4;
    AU.hat=new Tone.NoiseSynth({noise:{type:'white'},envelope:{attack:.001,decay:.04,sustain:0}}).connect(new Tone.Filter(7000,'highpass').connect(AU.bgmBus)); AU.hat.volume.value=-16;
    AU.snare=new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.001,decay:.13,sustain:0}}).connect(AU.bgmBus); AU.snare.volume.value=-12;
    audioV2(); AU.ok=true; applyAudio(); if(AU.want) playTheme(AU.want,true);
  }catch(e){ console.warn('audio',e); }
}
function applyAudio(){ if(!AU.ok) return; AU.sfxBus.mute=!S.sound; AU.bgmBus.mute=!S.music; }
/* ---- v2 sound: warm, cozy "home visit" palette — electric piano, soft strings, pizzicato, flute, vibes, brushes; room reverb ---- */
function audioV2(){
  const V=(x,v)=>{ x.volume.value=v; return x; };
  AU.bgmVerb=new Tone.Reverb(2.6,.34).connect(AU.bgmBus); AU.sfxVerb=new Tone.Reverb(1.5,.25).connect(AU.sfxBus);
  const lpK=new Tone.Filter(2600,'lowpass').connect(AU.bgmVerb), lpS=new Tone.Filter(1250,'lowpass').connect(AU.bgmVerb), lpB=new Tone.Filter(700,'lowpass').connect(AU.bgmBus);
  AU.ep=V(new Tone.PolySynth(Tone.FMSynth,{harmonicity:1,modulationIndex:1.5,envelope:{attack:.004,decay:1.1,sustain:.14,release:.8},modulationEnvelope:{attack:.002,decay:.45,sustain:.06,release:.4}}).connect(lpK),-9);
  AU.flute=V(new Tone.Synth({oscillator:{type:'sine'},envelope:{attack:.05,decay:.25,sustain:.6,release:.3}}).connect(AU.bgmVerb),-9);
  AU.vib=V(new Tone.PolySynth(Tone.FMSynth,{harmonicity:4,modulationIndex:1.1,envelope:{attack:.002,decay:1.3,sustain:0,release:1},modulationEnvelope:{attack:.002,decay:.3,sustain:0,release:.3}}).connect(AU.bgmVerb),-11);
  AU.pluck=V(new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.002,decay:.22,sustain:0,release:.12}}).connect(lpK),-7);
  AU.strings=V(new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sawtooth'},detune:9,envelope:{attack:.7,decay:.8,sustain:.7,release:1.4}}).connect(lpS),-19);
  AU.stab2=V(new Tone.PolySynth(Tone.Synth,{oscillator:{type:'sawtooth'},detune:7,envelope:{attack:.01,decay:.28,sustain:0,release:.25}}).connect(lpS),-13);
  AU.bass2=V(new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.005,decay:.35,sustain:.25,release:.18}}).connect(lpB),1);
  AU.kick2=V(new Tone.MembraneSynth({pitchDecay:.04,octaves:4,envelope:{attack:.001,decay:.28,sustain:0}}).connect(AU.bgmBus),-9);
  AU.shk=V(new Tone.NoiseSynth({noise:{type:'white'},envelope:{attack:.008,decay:.06,sustain:0}}).connect(new Tone.Filter(6500,'highpass').connect(AU.bgmBus)),-21);
  AU.rim=V(new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.001,decay:.035,sustain:0}}).connect(new Tone.Filter({frequency:1700,type:'bandpass',Q:2.2}).connect(AU.bgmVerb)),-8);
  AU.brush=V(new Tone.NoiseSynth({noise:{type:'pink'},envelope:{attack:.004,decay:.2,sustain:0}}).connect(new Tone.Filter({frequency:1300,type:'bandpass',Q:.7}).connect(AU.bgmVerb)),-14);
  /* SFX voices */
  AU.mar=V(new Tone.PolySynth(Tone.FMSynth,{harmonicity:4,modulationIndex:.9,envelope:{attack:.001,decay:.35,sustain:0,release:.3},modulationEnvelope:{attack:.001,decay:.12,sustain:0,release:.1}}).connect(AU.sfxVerb),-8);
  AU.chime=V(new Tone.PolySynth(Tone.FMSynth,{harmonicity:3.01,modulationIndex:3,envelope:{attack:.001,decay:.9,sustain:0,release:.8},modulationEnvelope:{attack:.001,decay:.3,sustain:0,release:.3}}).connect(AU.sfxVerb),-12);
  AU.soft=V(new Tone.Synth({oscillator:{type:'triangle'},envelope:{attack:.004,decay:.22,sustain:.05,release:.15}}).connect(new Tone.Filter(1400,'lowpass').connect(AU.sfxBus)),-2);
  AU.blip.oscillator.type='triangle'; AU.blip.volume.value=-16; AU.bgmBus.volume.value=-17;
}
const mfreq=(n,semi)=>{ const m=/^([A-G])(#|b)?(-?\d)$/.exec(n); const S={C:0,D:2,E:4,F:5,G:7,A:9,B:11}; const midi=(+m[3]+1)*12+S[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0)+(semi||0); return 440*Math.pow(2,(midi-69)/12); };
/* chords: [notes, bass]; patterns: 16 steps per bar (x = hit); melodies: "note:sixteenths" tokens, "-" = rest */
const THEMES={
  calm:{bpm:88, chords:[[['E3','G3','B3','D4'],'C2'],[['E3','G3','C4','D4'],'A1'],[['F3','A3','C4','E4'],'D2'],[['F3','A3','B3','E4'],'G1']],
    keys:'x..x..x...x..x..', bass:'R.....F.R..R..F.', k:'x.....x...x.....', r:'....x.......x...', h:'x.x.x.x.x.x.x.x.', lead:'flute',
    mel:'E5:4 G5:2 A5:2 G5:4 -:4 | E5:3 D5:1 C5:4 -:8 | D5:2 E5:2 F5:4 A5:4 G5:4 | F5:2 E5:2 D5:8 -:4 | E5:4 G5:2 A5:2 C6:4 B5:2 A5:2 | G5:6 E5:2 -:8 | F5:2 A5:2 G5:2 F5:2 E5:4 D5:4 | C5:8 -:8'},
  mystery:{bpm:76, chords:[[['C4','E4','G4','B4'],'A1'],[['C4','E4','A4'],'F1'],[['F3','A3','C4','E4'],'D2'],[['G#3','D4','F4'],'E1']],
    pad:1, arp:'x.x.x.x.x.x.x.x.', bass:'R.......R...F...', k:'x.......x.......', r:'x...x...x...x...', lead:'vib',
    mel:'-:8 E5:4 C5:4 | -:4 A4:4 B4:4 C5:4 | D5:6 C5:2 A4:8 | B4:4 G#4:4 E4:8 | -:8 A5:4 E5:4 | F5:6 E5:2 C5:8 | D5:4 F5:4 E5:4 C5:4 | B4:8 -:8'},
  tense:{bpm:112, chords:[[['A3','C4','E4'],'A1'],[['A3','C4','F4'],'F1'],[['A3','D4','F4'],'D2'],[['G#3','B3','E4'],'E1']],
    pad:1, arp:'x.x.x.x.x.x.x.x.', bass:'R.R.R.R.R.R.R.R.', k:'x...x...x...x...', s:'....x.......x...', h:'xxxxxxxxxxxxxxxx', lead:'pluck',
    mel:'E5:2 -:2 E5:2 F5:2 E5:4 -:4 | C5:2 -:2 C5:2 D5:2 C5:4 -:4 | D5:2 -:2 F5:2 A5:2 G5:4 F5:4 | E5:8 G#4:4 B4:4'},
  boss:{bpm:132, chords:[[['E3','G3','B3'],'E1'],[['E3','G3','C4'],'C2'],[['F#3','A3','D4'],'D2'],[['D#3','F#3','A3','B3'],'B1']],
    stab:'x..x..x.x..x..x.', pad:1, bass:'R.RRR.R.R.RRR.O.', k:'x.....x.x.......', s:'....x.......x...', h:'x.x.x.x.x.x.x.x.', lead:'vib',
    mel:'E5:2 G5:2 B5:4 A5:2 G5:2 F#5:4 | G5:2 E5:2 C5:4 -:4 E5:4 | F#5:2 A5:2 D6:4 C6:2 B5:2 A5:4 | B5:8 D#5:4 F#5:4'},
  win:{bpm:100, chords:[[['E3','G3','C4','D4'],'C2'],[['D3','G3','B3'],'G1'],[['E3','G3','C4'],'A1'],[['F3','A3','C4','E4'],'F1'],[['E3','G3','C4','D4'],'C2'],[['F3','A3','C4','E4'],'F1'],[['F3','G3','B3','D4'],'G1'],[['E3','G3','C4','E4'],'C2']],
    keys:'x..x..x...x.x...', arp:'....x.x.....x.x.', bass:'R.....F.R...F...', k:'x.......x.x.....', r:'....x.......x...', h:'x.x.x.x.x.x.x.x.', lead:'flute',
    mel:'E5:2 G5:2 C6:4 B5:2 G5:2 E5:4 | D5:2 G5:2 B5:4 A5:4 G5:4 | C6:4 B5:2 A5:2 E5:8 | F5:2 A5:2 C6:4 A5:4 F5:4 | G5:4 E5:4 C6:8 | A5:4 C6:4 F5:8 | G5:2 A5:2 B5:4 D6:8 | C6:12 -:4'},
};
function prepTheme(th){ const pat=x=>x?[...x].map(c=>c==='x'||c==='R'||c==='F'||c==='O'?c:null):null;
  const mel=[]; (th.mel||'').split('|').forEach(bar=>{ const row=Array(16).fill(null); let p=0; bar.trim().split(/\s+/).forEach(tok=>{ const [n,d]=tok.split(':'); if(n!=='-'&&p<16) row[p]=[n,+d]; p+=+d; }); mel.push(...row); });
  const bars=Math.max(th.chords.length, mel.length/16||0);
  return {len:bars*16, mel, keys:pat(th.keys), arp:pat(th.arp), stab:pat(th.stab), bass:pat(th.bass), k:pat(th.k), s:pat(th.s), h:pat(th.h), r:pat(th.r)}; }
function musicStep(th,P,t,i){ const bar=Math.floor(i/16), st=i%16, ch=th.chords[bar%th.chords.length], n=ch[0], six=60/Tone.Transport.bpm.value/4, vr=()=>.42+Math.random()*.16;
  if(st===0&&th.pad) AU.strings.triggerAttackRelease(n,six*16,t,.32);
  if(P.keys&&P.keys[st]) AU.ep.triggerAttackRelease(n,six*3,t,vr());
  if(P.stab&&P.stab[st]) AU.stab2.triggerAttackRelease(n.map(x=>mfreq(x,12)),six*2,t,vr());
  if(P.arp&&P.arp[st]){ const k=Math.floor(st/2)%(n.length*2-2||1), j=k<n.length?k:n.length*2-2-k; AU.pluck.triggerAttackRelease(mfreq(n[j],12),six*2,t,.45); }
  const b=P.bass&&P.bass[st]; if(b) AU.bass2.triggerAttackRelease(mfreq(ch[1],b==='F'?7:b==='O'?12:0),six*(th.bpm>110?1.6:3),t,.75);
  if(P.k&&P.k[st]) AU.kick2.triggerAttackRelease('C1','8n',t,.8);
  if(P.s&&P.s[st]) AU.brush.triggerAttackRelease('16n',t,.8);
  if(P.h&&P.h[st]) AU.shk.triggerAttackRelease('32n',t,st%4===0?.9:st%2?.35:.6);
  if(P.r&&P.r[st]) AU.rim.triggerAttackRelease('32n',t,.7);
  const m=P.mel.length&&P.mel[i%P.mel.length]; if(m){ const inst=th.lead==='vib'?AU.vib:th.lead==='pluck'?AU.pluck:AU.flute; inst.triggerAttackRelease(m[0],six*m[1]*(th.lead==='flute'?.92:1),t,.55); } }
function playTheme(name, force){
  AU.want=name; if(!AU.ok) return; if(AU.theme===name&&!force) return; AU.theme=name;
  try{
    Tone.Transport.stop(); AU.seqs.forEach(s=>{ try{s.stop(); s.dispose();}catch(e){} }); AU.seqs=[]; Tone.Transport.position=0;
    const th=THEMES[name], P=th._p||(th._p=prepTheme(th)); Tone.Transport.bpm.value=th.bpm*(S.visit<=10&&name!=='win'?1.12:1);
    AU.seqs.push(new Tone.Sequence((t,i)=>{ try{ musicStep(th,P,t,i); }catch(e){} }, [...Array(P.len).keys()], '16n').start(0));
    Tone.Transport.start('+0.05');
  }catch(e){ console.warn('theme',e); }
}
const BLIP={chen:['G3','A3','C4'], wife:['C5','D5','E5'], yeh:['E5','G5','A5'], me:['A4','B4','C5'], pilly:['C6','E6','G6'], sys:['C5','C5','C5']};
const sfx=new Proxy({},{get:(o,n)=>(...a)=>{ if(!AU.ok||!S.sound) return; try{ SFX[n]&&SFX[n](...a); }catch(e){} }});
const SFX={
  blip(w){ const n=BLIP[w]||BLIP.sys; AU.blip.triggerAttackRelease(n[Math.floor(Math.random()*n.length)],'64n',at('blip')); },
  click(){ AU.tri.triggerAttackRelease('C6','32n',at('tri')); },
  pop(){ AU.tri.triggerAttackRelease('G5','32n',at('tri')); AU.tri.triggerAttackRelease('C6','32n',at('tri',.06)); },
  select(){ AU.bell.triggerAttackRelease(['E6'],'32n',at('bell'),.5); },
  error(){ AU.saw.triggerAttackRelease('D3','16n',at('saw')); AU.saw.triggerAttackRelease('C3','8n',at('saw',.12)); },
  paper(){ [0,.08,.17,.26].forEach(o=>AU.paper.triggerAttackRelease(rand(.04,.08),at('paper',o))); },
  plastic(){ let o=0; for(let i=0;i<9;i++){ o+=rand(.025,.06); AU.plastic.triggerAttackRelease(rand(.01,.03),at('plastic',o)); } },
  rattle(){ let o=0; for(let i=0;i<12;i++){ o+=rand(.02,.045); AU.plastic.triggerAttackRelease(.01,at('plastic',o)); } },
  clink(){ AU.bell.triggerAttackRelease(['E6'],'32n',at('bell'),.5); AU.bell.triggerAttackRelease(['B6'],'32n',at('bell',.12),.4); },
  drawer(){ AU.slide.triggerAttackRelease(.25,at('slide')); AU.thump.triggerAttackRelease('C2','16n',at('thump',.22)); },
  magnify(){ AU.bell.triggerAttackRelease(['A6'],'64n',at('bell'),.25); },
  zoom(){ AU.whoosh.triggerAttackRelease(.35,at('whoosh')); AU.tri.triggerAttackRelease('E5','32n',at('tri',.1)); },
  glint(){ AU.bell.triggerAttackRelease(['B6'],'64n',at('bell'),.12); },
  get(){ ['C6','E6','G6','C7'].forEach((n,i)=>AU.bell.triggerAttackRelease([n],'16n',at('bell',i*.07),.7)); },
  bag(){ AU.tri.triggerAttackRelease('G5','32n',at('tri')); AU.tri.triggerAttackRelease('D6','16n',at('tri',.08)); },
  problem(){ ['G5','C6','E6'].forEach((n,i)=>AU.bell.triggerAttackRelease([n],'16n',at('bell',i*.08),.7)); AU.bell.triggerAttackRelease(['C6','E6','G6'],'4n',at('bell',.28),.6); },
  objection(){ AU.stab.triggerAttackRelease(['C4','D#4','F#4','A4'],'8n',at('stab'),.9); AU.whoosh.triggerAttackRelease(.3,at('whoosh')); AU.thump.triggerAttackRelease('A1','8n',at('thump')); },
  slam(){ AU.thump.triggerAttackRelease('E1','8n',at('thump')); AU.stab.triggerAttackRelease(['E4','G4','B4','E5'],'8n',at('stab',.02),.8); },
  shatter(){ for(let i=0;i<10;i++) AU.bell.triggerAttackRelease([['C7','E7','G6','B6','D7'][i%5]],'64n',at('bell',i*.03),.5); AU.plastic.triggerAttackRelease(.2,at('plastic')); },
  hit(){ AU.thump.triggerAttackRelease('G1','16n',at('thump')); AU.plastic.triggerAttackRelease(.08,at('plastic')); },
  crit(){ AU.thump.triggerAttackRelease('C1','8n',at('thump')); AU.stab.triggerAttackRelease(['C5','E5','G5','C6'],'8n',at('stab'),.8); },
  heal(){ ['C5','E5','G5'].forEach((n,i)=>AU.tri.triggerAttackRelease(n,'32n',at('tri',i*.06))); },
  tick(){ AU.tri.triggerAttackRelease('A5','64n',at('tri')); },
  whoosh(){ AU.whoosh.triggerAttackRelease(.5,at('whoosh')); },
  intro(){ AU.whoosh.triggerAttackRelease(.3,at('whoosh')); AU.stab.triggerAttackRelease(['C5','G5','C6'],'8n',at('stab',.12),.6); AU.bell.triggerAttackRelease(['E6','G6'],'8n',at('bell',.3),.5); },
  trustUp(){ AU.bell.triggerAttackRelease(['G5'],'32n',at('bell'),.5); AU.bell.triggerAttackRelease(['D6'],'16n',at('bell',.1),.5); },
  trustDown(){ AU.tri.triggerAttackRelease('E4','16n',at('tri')); AU.tri.triggerAttackRelease('C4','8n',at('tri',.14)); },
  heartLose(){ AU.saw.triggerAttackRelease('A3','16n',at('saw')); AU.saw.triggerAttackRelease('E3','8n',at('saw',.1)); },
  cough(n){ n=n||2; for(let i=0;i<n;i++) AU.cough.triggerAttackRelease(.14,at('cough',i*.3)); },
  sneeze(){ AU.paper.triggerAttackRelease(.25,at('paper')); AU.cough.triggerAttackRelease(.2,at('cough',.38)); },
  fanfare(){ ['C5','E5','G5','C6','G5','C6','E6'].forEach((n,i)=>AU.bell.triggerAttackRelease([n],'16n',at('bell',i*.12),.7)); AU.bell.triggerAttackRelease(['C5','E5','G5','C6'],'2n',at('bell',.9),.6); },
};
/* ---- v2 effects: softer UI sounds and physical sounds for the hands-on games ---- */
const FXD=()=>AU.sfxBus;
Object.assign(SFX,{
  click(){ Tone.burst({type:'white',filter:'bandpass',freq:3200,Q:2.5,gain:.55,decay:.022,at:at('ck'),dest:FXD()}); AU.mar.triggerAttackRelease(['G6'],'64n',at('mar'),.32); },
  pop(){ Tone.glide({type:'sine',from:520,to:1180,dur:.07,gain:.3,at:at('pop'),dest:FXD()}); },
  select(){ AU.mar.triggerAttackRelease(['E5'],'16n',at('mar'),.55); AU.mar.triggerAttackRelease(['B5'],'16n',at('mar',.07),.45); },
  error(){ AU.soft.triggerAttackRelease('E4','16n',at('soft'),.32); AU.soft.triggerAttackRelease('C4','8n',at('soft',.13),.32); },
  get(){ ['C6','E6','G6','C7'].forEach((n,i)=>AU.chime.triggerAttackRelease([n],'16n',at('chime',i*.07),.6)); },
  problem(){ ['G5','C6','E6'].forEach((n,i)=>AU.chime.triggerAttackRelease([n],'16n',at('chime',i*.08),.65)); AU.chime.triggerAttackRelease(['C6','E6','G6'],'4n',at('chime',.28),.5); },
  heal(){ ['C5','E5','G5'].forEach((n,i)=>AU.mar.triggerAttackRelease([n],'32n',at('mar',i*.06),.5)); },
  tick(){ AU.tk=!AU.tk; Tone.burst({type:'white',filter:'highpass',freq:4200,Q:.7,gain:.22,decay:.016,at:at('tick'),dest:FXD()}); AU.mar.triggerAttackRelease([AU.tk?'C7':'G6'],'64n',at('mar'),.1); },
  whoosh(){ Tone.burst({type:'pink',filter:'bandpass',freq:500,Q:.8,gain:.6,attack:.12,decay:.35,sweep:[2600,.45],at:at('wh'),dest:FXD()}); },
  trustUp(){ AU.mar.triggerAttackRelease(['G5'],'32n',at('mar'),.5); AU.mar.triggerAttackRelease(['D6'],'16n',at('mar',.1),.5); },
  trustDown(){ AU.soft.triggerAttackRelease('E4','16n',at('soft'),.6); AU.soft.triggerAttackRelease('C4','8n',at('soft',.14),.6); },
  heartLose(){ AU.soft.triggerAttackRelease('A3','16n',at('soft'),.85); AU.soft.triggerAttackRelease('E3','8n',at('soft',.12),.85); },
  cough(n){ n=n||2; for(let i=0;i<n;i++){ const t=at('cough',i*.34); AU.thump.triggerAttackRelease('A1','32n',t,.45);
    Tone.burst({type:'white',filter:'bandpass',freq:780,Q:1.1,gain:.85,attack:.004,decay:.17,sweep:[460,.17],at:t,dest:FXD()}); Tone.burst({type:'pink',filter:'lowpass',freq:1500,gain:.35,decay:.24,at:t+.03,dest:FXD()}); } },
  /* hands-on games */
  shake(i){ const t=at('shk'); Tone.burst({type:'white',filter:'bandpass',freq:i%2?2300:2900,Q:1.8,gain:1,decay:.06,at:t,dest:FXD()}); Tone.burst({type:'pink',filter:'bandpass',freq:650,Q:1.5,gain:.6,attack:.01,decay:.1,at:t,dest:FXD()}); AU.mar.triggerAttackRelease([i%2?'D7':'A6'],'64n',t+.01,.15); },
  capOff(){ const t=at('cap'); Tone.glide({type:'sine',from:300,to:900,dur:.05,gain:.35,at:t,dest:FXD()}); Tone.burst({type:'white',filter:'highpass',freq:3000,gain:.3,decay:.03,at:t,dest:FXD()}); },
  capOn(){ const t=at('cap'); Tone.burst({type:'white',filter:'bandpass',freq:1800,Q:2,gain:.5,decay:.04,at:t,dest:FXD()}); Tone.glide({type:'triangle',from:700,to:420,dur:.05,gain:.25,at:t,dest:FXD()}); },
  ratchet(){ for(let k=0;k<5;k++) Tone.burst({type:'white',filter:'bandpass',freq:3400,Q:3,gain:.48,decay:.014,at:at('rt',k*.06),dest:FXD()});
    Tone.burst({type:'white',filter:'bandpass',freq:2200,Q:2,gain:.85,decay:.03,at:at('rt',.34),dest:FXD()}); AU.mar.triggerAttackRelease(['C6'],'64n',at('mar',.34),.3); },
  puff(){ const t=at('pf'); Tone.burst({type:'white',filter:'highpass',freq:2200,Q:.6,gain:.4,attack:.004,decay:.32,at:t,dest:FXD()}); Tone.burst({type:'white',filter:'bandpass',freq:5200,Q:1.5,gain:.2,decay:.18,at:t,dest:FXD()}); AU.thump.triggerAttackRelease('G3','64n',t,.15); },
  mist(){ const t=at('pf'); Tone.burst({type:'white',filter:'bandpass',freq:2600,Q:2,gain:.8,decay:.02,at:t,dest:FXD()}); Tone.burst({type:'pink',filter:'bandpass',freq:3600,Q:.6,gain:.95,attack:.06,decay:1.3,at:t+.02,dest:FXD()}); },
  clack(){ const t=at('ck'); Tone.burst({type:'white',filter:'bandpass',freq:1500,Q:1.5,gain:1,decay:.045,at:t,dest:FXD()}); Tone.burst({type:'pink',filter:'bandpass',freq:380,Q:4,gain:1,decay:.22,at:t,dest:FXD()}); },
  tock(n){ AU.mar.triggerAttackRelease([n>=10?'G5':'C5'],'32n',at('mar'),n>=10?.6:.35); },
  sigh(){ Tone.burst({type:'pink',filter:'bandpass',freq:620,Q:.6,gain:.7,attack:.15,decay:.75,sweep:[380,.9],at:at('br'),dest:FXD()}); },
  gulp(){ const t=at('gl'); Tone.glide({type:'sine',from:330,to:105,dur:.13,gain:.32,at:t,dest:FXD()}); Tone.burst({type:'pink',filter:'lowpass',freq:650,gain:.2,decay:.08,at:t+.02,dest:FXD()}); Tone.glide({type:'sine',from:260,to:95,dur:.1,gain:.2,at:t+.28,dest:FXD()}); },
  beep(){ [0,.16].forEach(o=>Tone.glide({type:'sine',from:2350,to:2350,dur:.07,gain:.2,attack:.003,at:at('bp',o),dest:FXD()})); },
  chew(){ for(let k=0;k<4;k++) Tone.burst({type:'white',filter:'bandpass',freq:1400+Math.random()*900,Q:1,gain:.8,decay:.05,at:at('chw',k*.13+Math.random()*.03),dest:FXD()}); },
  crunch(){ for(let k=0;k<6;k++) Tone.burst({type:'white',filter:'bandpass',freq:1100+Math.random()*1600,Q:1,gain:.9,decay:.06,at:at('chw',k*.09+Math.random()*.03),dest:FXD()}); },
  sip(){ const t=at('gl'); Tone.burst({type:'pink',filter:'bandpass',freq:1800,Q:1.2,gain:.3,attack:.04,decay:.25,at:t,dest:FXD()}); Tone.glide({type:'sine',from:300,to:120,dur:.1,gain:.26,at:t+.3,dest:FXD()}); },
});
/* sustained sounds that follow the player's hold: breathing out / in, pouring. Returns a handle {ramp, stop} or null when sound is off. */
function sfxLoop(kind, o){ if(!AU.ok||!S.sound) return null; o=o||{};
  try{
    if(kind==='out'){ const h=Tone.loopNoise({type:'pink',filter:'bandpass',freq:700,Q:.6,gain:.65,attack:.18,dest:FXD()}); h.ramp('freq',380,o.sec||3); return h; }
    if(kind==='in'){ const h=Tone.loopNoise({type:'pink',filter:'bandpass',freq:1100,Q:1.3,gain:.05,attack:.25,dest:FXD()}); h.ramp('gain',.5,1); h.ramp('freq',2300,o.sec||5); return h; }
    if(kind==='pour'){ const h=Tone.loopNoise({type:'white',filter:'bandpass',freq:950,Q:2.2,gain:.35,attack:.05,dest:FXD()});
      const iv=setInterval(()=>{ try{ const f=650+Math.random()*900; Tone.glide({type:'sine',from:f,to:f*1.6,dur:.04,gain:.12,dest:FXD()}); }catch(e){} },55);
      return {ramp:h.ramp, stop(r){ clearInterval(iv); h.stop(r); }}; }
  }catch(e){}
  return null; }
/* lower the music while a hands-on game is open, so its sounds come through */
function audioDuck(on){ if(!AU.ok) return; try{ const g=AU.bgmBus.output.gain, n=Tone.now(), to=Math.pow(10,(AU.bgmBus.volume.value-(on?9:0))/20)*(AU.bgmBus.mute?0:1);
  g.cancelScheduledValues(n); g.setValueAtTime(g.value,n); g.linearRampToValueAtTime(to,n+.6); }catch(e){} }

