/* =====================================================================
   MiniTone — a tiny built-in WebAudio synth (works offline, no download).
   Implements only the slice of the Tone.js API this game uses:
   Synth · PolySynth · FMSynth · NoiseSynth · MembraneSynth · Filter · Volume · Transport · Sequence
   ===================================================================== */
const Tone=(()=>{
  let ctx=null, out=null;
  const dbg=db=>Math.pow(10,db/20);
  const SEMI={C:0,D:2,E:4,F:5,G:7,A:9,B:11};
  const freq=n=>{ if(typeof n==='number') return n; const m=/^([A-G])(#|b)?(-?\d)$/.exec(n||''); if(!m) return 440;
    const midi=(+m[3]+1)*12+SEMI[m[1]]+(m[2]==='#'?1:m[2]==='b'?-1:0); return 440*Math.pow(2,(midi-69)/12); };
  const Transport={bpm:{value:120}, position:0, state:'stopped', _seqs:new Set(), _t0:0, _timer:null};
  const dur=d=>{ if(typeof d==='number') return d; const beat=60/Transport.bpm.value; if(d==='1m') return beat*4; const m=/^(\d+)n$/.exec(d||''); return m?beat*4/(+m[1]):(parseFloat(d)||.1); };
  /* ADSR on a gain param; returns when the voice can stop */
  function adsr(g,t,d,e,peak){ const a=Math.max(.001,e.attack==null?.005:e.attack), dc=Math.max(.005,e.decay==null?.1:e.decay), s=e.sustain==null?.3:e.sustain, r=Math.max(.01,e.release==null?.2:e.release);
    g.setValueAtTime(0,t); g.linearRampToValueAtTime(peak,t+a); g.setTargetAtTime(peak*s,t+a,dc/3);
    const tr=t+Math.max(d,a+.005); g.setTargetAtTime(0,tr,r/3); return tr+r*1.6; }
  class Node{ constructor(){ this._db=0; this._mute=false; this.output=ctx.createGain(); this.input=this.output; const self=this;
      this.volume={get value(){ return self._db; }, set value(v){ self._db=v; self._apply(); }}; }
    _apply(){ this.output.gain.value=this._mute?0:dbg(this._db); }
    get mute(){ return this._mute; } set mute(m){ this._mute=!!m; this._apply(); }
    connect(d){ this.output.connect(d.input||d); return this; }
    toDestination(){ this.output.connect(out); return this; }
    dispose(){ try{ this.output.disconnect(); }catch(e){} } }
  class Volume extends Node{ constructor(db){ super(); this.volume.value=db||0; } }
  class Filter{ constructor(f,type){ this.f=ctx.createBiquadFilter(); if(typeof f==='object'){ this.f.type=f.type||'lowpass'; this.f.frequency.value=f.frequency||1000; if(f.Q) this.f.Q.value=f.Q; } else { this.f.type=type||'lowpass'; this.f.frequency.value=f; } this.input=this.output=this.f; }
    connect(d){ this.f.connect(d.input||d); return this; } }
  class Synth extends Node{ constructor(o){ super(); o=o||{}; this.oscillator={type:(o.oscillator&&o.oscillator.type)||'triangle'}; this.envelope=Object.assign({attack:.005,decay:.1,sustain:.3,release:1},o.envelope||{}); this.detune=o.detune||0; }
    triggerAttackRelease(n,d,t,vel){ t=t==null?ctx.currentTime:t; const D=dur(d), g=ctx.createGain(), f=freq(n), os=[];
      for(const dt of this.detune?[-this.detune,this.detune]:[0]){ const o=ctx.createOscillator(); o.type=this.oscillator.type; o.frequency.value=f; o.detune.value=dt; o.connect(g); os.push(o); }
      g.connect(this.output); const end=adsr(g.gain,t,D,this.envelope,(vel==null?1:vel)*.7/(os.length>1?1.4:1)); os.forEach(o=>{ o.start(t); o.stop(end); }); os[0].onended=()=>{ try{ g.disconnect(); }catch(e){} }; return this; } }
  class FMSynth extends Node{ constructor(o){ super(); o=o||{}; this.h=o.harmonicity||3; this.mi=o.modulationIndex||10; this.envelope=Object.assign({attack:.01,decay:.2,sustain:.3,release:.5},o.envelope||{}); this.menv=Object.assign({attack:.01,decay:.2,sustain:.3,release:.5},o.modulationEnvelope||{}); }
    triggerAttackRelease(n,d,t,vel){ t=t==null?ctx.currentTime:t; const D=dur(d), f=freq(n), c=ctx.createOscillator(), m=ctx.createOscillator(), mg=ctx.createGain(), g=ctx.createGain();
      c.frequency.value=f; m.frequency.value=f*this.h; m.connect(mg); mg.connect(c.frequency); c.connect(g); g.connect(this.output);
      adsr(mg.gain,t,D,this.menv,f*this.h*this.mi*.5); const end=adsr(g.gain,t,D,this.envelope,(vel==null?1:vel)*.6);
      c.start(t); m.start(t); c.stop(end); m.stop(end); c.onended=()=>{ try{ g.disconnect(); mg.disconnect(); }catch(e){} }; return this; } }
  class PolySynth extends Node{ constructor(V,o){ super(); this.v=new V(o); this.v.output.connect(this.output); }
    triggerAttackRelease(ns,d,t,vel){ [].concat(ns).forEach(n=>this.v.triggerAttackRelease(n,d,t,vel)); return this; } }
  const NB={};
  function noiseBuf(type){ if(NB[type]) return NB[type]; const len=ctx.sampleRate*2, b=ctx.createBuffer(1,len,ctx.sampleRate), x=b.getChannelData(0);
    let b0=0,b1=0,b2=0,b3=0,b4=0,b5=0,b6=0,last=0;
    for(let i=0;i<len;i++){ const w=Math.random()*2-1;
      if(type==='pink'){ b0=.99886*b0+w*.0555179; b1=.99332*b1+w*.0750759; b2=.969*b2+w*.153852; b3=.8665*b3+w*.3104856; b4=.55*b4+w*.5329522; b5=-.7616*b5-w*.016898; x[i]=(b0+b1+b2+b3+b4+b5+b6+w*.5362)*.11; b6=w*.115926; }
      else if(type==='brown'){ last=(last+.02*w)/1.02; x[i]=last*3.5; } else x[i]=w; }
    return NB[type]=b; }
  class NoiseSynth extends Node{ constructor(o){ super(); o=o||{}; this.type=(o.noise&&o.noise.type)||'white'; this.envelope=Object.assign({attack:.005,decay:.1,sustain:0,release:.05},o.envelope||{}); }
    triggerAttackRelease(d,t,vel){ t=t==null?ctx.currentTime:t; const D=dur(d), s=ctx.createBufferSource(), g=ctx.createGain(); s.buffer=noiseBuf(this.type); s.loop=true;
      s.connect(g); g.connect(this.output); const end=adsr(g.gain,t,D,this.envelope,(vel==null?1:vel)*.8); s.start(t,Math.random()*1.5); s.stop(end); s.onended=()=>{ try{ g.disconnect(); }catch(e){} }; return this; } }
  class MembraneSynth extends Node{ constructor(o){ super(); o=o||{}; this.pd=o.pitchDecay||.05; this.oct=o.octaves||6; this.envelope=Object.assign({attack:.001,decay:.4,sustain:0,release:.4},o.envelope||{}); }
    triggerAttackRelease(n,d,t,vel){ t=t==null?ctx.currentTime:t; const D=dur(d), f=freq(n), o=ctx.createOscillator(), g=ctx.createGain(); o.type='sine';
      o.frequency.setValueAtTime(f*this.oct,t); o.frequency.exponentialRampToValueAtTime(Math.max(20,f),t+this.pd); o.connect(g); g.connect(this.output);
      const end=adsr(g.gain,t,D,this.envelope,(vel==null?1:vel)*.9); o.start(t); o.stop(end); o.onended=()=>{ try{ g.disconnect(); }catch(e){} }; return this; } }
  /* room reverb: decaying stereo noise impulse; wet/dry mix */
  class Reverb extends Node{ constructor(sec,wet){ super(); sec=sec||2; wet=wet==null?.3:wet; const i=ctx.createGain(), dry=ctx.createGain(), wg=ctx.createGain(), cv=ctx.createConvolver(), len=Math.floor(ctx.sampleRate*sec), b=ctx.createBuffer(2,len,ctx.sampleRate);
      for(let c=0;c<2;c++){ const x=b.getChannelData(c); for(let k=0;k<len;k++) x[k]=(Math.random()*2-1)*Math.pow(1-k/len,3.2); }
      cv.buffer=b; dry.gain.value=1-wet*.4; wg.gain.value=wet; i.connect(dry); i.connect(cv); cv.connect(wg); dry.connect(this.output); wg.connect(this.output); this.input=i; } }
  const dst=d=>d.input||d;
  /* filtered noise burst: {type, filter, freq, Q, gain, attack, decay, at, dest, sweep:[to,sec]} */
  function burst(o){ const t=o.at==null?ctx.currentTime:o.at, s=ctx.createBufferSource(), f=ctx.createBiquadFilter(), g=ctx.createGain(); s.buffer=noiseBuf(o.type||'white');
    f.type=o.filter||'bandpass'; f.frequency.setValueAtTime(o.freq||2000,t); f.Q.value=o.Q==null?1:o.Q; if(o.sweep) f.frequency.exponentialRampToValueAtTime(o.sweep[0],t+o.sweep[1]);
    const a=o.attack||.003, dc=o.decay||.08; g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(o.gain||.4,t+a); g.gain.exponentialRampToValueAtTime(.0001,t+a+dc);
    s.connect(f); f.connect(g); g.connect(dst(o.dest)); s.start(t,Math.random()*1.5); s.stop(t+a+dc+.05); s.onended=()=>{ try{ g.disconnect(); }catch(e){} }; }
  /* pitched blip with a glide: {type, from, to, dur, gain, attack, at, dest} */
  function glide(o){ const t=o.at==null?ctx.currentTime:o.at, os=ctx.createOscillator(), g=ctx.createGain(); os.type=o.type||'sine';
    os.frequency.setValueAtTime(o.from,t); os.frequency.exponentialRampToValueAtTime(Math.max(20,o.to||o.from),t+o.dur); const a=o.attack||.006;
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(o.gain||.3,t+a); g.gain.exponentialRampToValueAtTime(.0001,t+a+o.dur+(o.tail||.04));
    os.connect(g); g.connect(dst(o.dest)); os.start(t); os.stop(t+a+o.dur+(o.tail||.04)+.05); os.onended=()=>{ try{ g.disconnect(); }catch(e){} }; }
  /* sustained filtered noise you can shape while it plays (breathing, pouring): returns {ramp(what,to,sec), stop(release)} */
  function loopNoise(o){ const t=ctx.currentTime, s=ctx.createBufferSource(), f=ctx.createBiquadFilter(), g=ctx.createGain(); s.buffer=noiseBuf(o.type||'pink'); s.loop=true;
    f.type=o.filter||'bandpass'; f.frequency.value=o.freq||1000; f.Q.value=o.Q==null?1:o.Q; s.connect(f); f.connect(g); g.connect(dst(o.dest));
    g.gain.setValueAtTime(0,t); g.gain.linearRampToValueAtTime(o.gain||.3,t+(o.attack||.12)); s.start(t,Math.random()*1.5); let done=false;
    const set=(p,to,sec)=>{ const n=ctx.currentTime; p.cancelScheduledValues(n); p.setValueAtTime(p.value,n); p.linearRampToValueAtTime(to,n+Math.max(.02,sec)); };
    return { ramp(w,to,sec){ if(!done) set(w==='freq'?f.frequency:g.gain,to,sec); },
      stop(r){ if(done) return; done=true; r=r==null?.2:r; set(g.gain,0,r); s.stop(ctx.currentTime+r+.05); s.onended=()=>{ try{ g.disconnect(); }catch(e){} }; } }; }
  class Sequence{ constructor(cb,ev,sub){ this.cb=cb; this.ev=ev; this.sub=sub; this.i=0; this.next=null; }
    start(){ this.i=0; this.next=Transport.state==='started'?ctx.currentTime+.05:null; Transport._seqs.add(this); return this; }
    stop(){ Transport._seqs.delete(this); return this; } dispose(){ this.stop(); } }
  function tick(){ if(Transport.state!=='started'||!ctx) return; const now=ctx.currentTime, ahead=now+.15;
    Transport._seqs.forEach(s=>{ const step=dur(s.sub); if(s.next==null) s.next=Transport._t0;
      while(s.next<now-.02){ s.next+=step; s.i++; }                        // skip what was missed while the tab slept
      while(s.next<ahead){ try{ s.cb(s.next, s.ev[s.i%s.ev.length]); }catch(e){} s.i++; s.next+=step; } }); }
  Transport.start=off=>{ if(!ctx) return; const o=typeof off==='string'?(parseFloat(off.replace('+',''))||0):(off||0); Transport.state='started'; Transport._t0=ctx.currentTime+o;
    Transport._seqs.forEach(s=>{ s.next=Transport._t0; s.i=0; }); if(!Transport._timer) Transport._timer=setInterval(tick,30); tick(); };
  Transport.stop=()=>{ Transport.state='stopped'; };
  const api={ Transport, Volume, Filter, Synth, FMSynth, PolySynth, NoiseSynth, MembraneSynth, Sequence, Reverb, burst, glide, loopNoise,
    now:()=>ctx?ctx.currentTime:0,
    async start(){ if(!ctx){ const AC=window.AudioContext||window.webkitAudioContext; if(!AC) throw new Error('no WebAudio'); ctx=new AC();
        const comp=ctx.createDynamicsCompressor(); comp.threshold.value=-10; comp.ratio.value=4; out=ctx.createGain(); out.gain.value=1.25; out.connect(comp); comp.connect(ctx.destination);
        api.analyser=ctx.createAnalyser(); comp.connect(api.analyser);
        const wake=()=>{ if(ctx.state!=='running') ctx.resume(); }; addEventListener('pointerdown',wake,true); addEventListener('keydown',wake,true); }
      if(ctx.state!=='running') await Promise.race([ctx.resume(), new Promise(r=>setTimeout(r,800))]); },
    get context(){ return ctx; } };
  return api;
})();
window.Tone=Tone;
