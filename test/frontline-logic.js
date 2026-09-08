// Headless test harness for frontline.html — drives the real state machine.
const fs=require('fs'), vm=require('vm');
const HTML=fs.readFileSync(require('path').join(__dirname,'..','frontline.html'),'utf8');
const m=HTML.match(/<script>([\s\S]*?)<\/script>\s*<\/body>/) || HTML.match(/<script>([\s\S]*)<\/script>/);
let src=m[1];

// Epilogue: expose in-scope bindings for driving/asserting.
src += `
;globalThis.__T = {
  getS:function(){return S;}, flow:function(){return flow();},
  NODES:function(){return NODES;}, SC:function(){return SC;}, SCENARIOS:SCENARIOS,
  setScenario, beginShift, toTable, chooseOption, setConfidence, nextNode, toDebrief, openDoc,
  flowTin, flowScoop, flowRunTest, flowVerdict, flowServe,
  reconcilePick, confirmReconcile, oncallNav, oncallAnswer, oncallBail, oncallFinish,
  paraToggle, paraConfirm, resolve, scoreProfile, readiness, servedUnsafe,
  DOC_ORDER:function(){return DOC_ORDER;}, PARAMEDIC_ITEMS:function(){return PARAMEDIC_ITEMS;}
};`;

// ---- Browser stubs ----
function el(){ return { innerHTML:'', value:'', style:{}, dataset:{},
  classList:{add(){},remove(){},toggle(){},contains(){return false;}},
  setAttribute(){}, getAttribute(){return null;}, removeAttribute(){},
  appendChild(){}, removeChild(){}, remove(){}, focus(){}, blur(){},
  querySelector(){return null;}, querySelectorAll(){return [];}, addEventListener(){},
  getBoundingClientRect(){return {top:0,left:0,width:0,height:0,bottom:0,right:0};} }; }
const documentEl=el();
const doc={ getElementById(){return el();}, querySelector(){return null;}, querySelectorAll(){return [];},
  createElement(){return el();}, addEventListener(){}, documentElement:documentEl, body:el(), title:'' };
// Permissive Web Audio stub: any method returns a fresh permissive node; scalar
// props return harmless values. Enough to let AUDIO.* calls no-op cleanly.
function makeAudio(){
  const scalars={currentTime:0,sampleRate:44100,state:'running',destination:{}};
  const p=new Proxy(function(){}, {
    get(t,k){
      if(k in scalars) return scalars[k];
      if(k==='getChannelData') return ()=>new Float32Array(8);
      if(k==='resume'||k==='suspend'||k==='close') return ()=>Promise.resolve();
      return makeAudio();   // callable proxy, so osc.frequency.setValueAtTime(...) also resolves
    },
    apply(){ return makeAudio(); }
  });
  return p;
}
const store={};
const ctx={
  console, Math, Date, JSON, parseInt, parseFloat, isNaN,
  setTimeout(){return 0;}, clearTimeout(){}, setInterval(){return 0;}, clearInterval(){},
  requestAnimationFrame(){return 0;}, cancelAnimationFrame(){},
  document:doc, navigator:{userAgent:'node'},
  localStorage:{ getItem:k=>k in store?store[k]:null, setItem:(k,v)=>{store[k]=String(v);}, removeItem:k=>{delete store[k];} },
  AudioContext:function(){ return makeAudio(); },
};
ctx.window=ctx; ctx.globalThis=ctx; ctx.self=ctx;
ctx.matchMedia=()=>({matches:false,addEventListener(){},addListener(){}});
ctx.innerWidth=1280; ctx.innerHeight=800; ctx.scrollTo=()=>{}; ctx.addEventListener=()=>{};
ctx.webkitAudioContext=ctx.AudioContext;
vm.createContext(ctx);
try { vm.runInContext(src, ctx, {filename:'frontline.js'}); }
catch(e){ console.error('LOAD ERROR:', e.stack||e.message); process.exit(1); }
const T=ctx.__T;

// ---- Driver ----
function cur(){ const S=T.getS(); return T.flow()[S.nodeIdx]; }
function node(id){ return T.NODES()[id]; }

function stepNode(pick, wp){
  const id=cur(); const n=node(id);
  if(!n){ throw new Error('no node for '+id); }
  if(n.type==='reconcile'){
    const cfg=T.SC().build.reconcile;
    cfg.fields.forEach(f=>T.reconcilePick(f.key, wp.reconcile==='wrong' ? (f.opts.find(o=>o.val!==f.correct)||{}).val : f.correct));
    T.confirmReconcile(); return id;
  }
  if(n.type==='flowtest'){
    const cfg=T.SC().build.flowtest; const tin=cfg.tins[0];
    T.flowTin(tin.id);
    const target = wp.flow==='off' ? tin.ratio+1 : tin.ratio;
    let guard=0; while(((T.getS().flow||{}).scoops||0)!==target && guard++<12){ T.flowScoop(((T.getS().flow||{}).scoops||0)<target?1:-1); }
    T.flowRunTest();
    T.flowVerdict(wp.flow==='off' ? 'thick' : 'level2');
    T.flowServe(); return id;
  }
  if(n.type==='oncall'){
    if(wp.oncall==='bail'){ T.oncallBail(); return id; }
    T.oncallNav('oncall');
    const qs=(T.SC().build.oncall.questions)||[];
    qs.forEach(()=>{ T.oncallAnswer(0); });
    T.oncallFinish(); return id;
  }
  if(n.type==='paramedics'){
    T.PARAMEDIC_ITEMS().forEach(it=>{ if(it.correct) T.paraToggle(it.id); });
    T.paraConfirm(); return id;
  }
  const opt=pick(id,n)||'a';
  if(n.confidence){ T.chooseOption(opt); T.setConfidence(3); }
  else { T.chooseOption(opt); }
  if(!n.emergency){ T.nextNode(); }
  return id;
}

function runScenario(sc, pick, wp){
  for(const k of Object.keys(store)) delete store[k];
  T.setScenario(sc);
  T.beginShift(); T.toTable();
  const visited=[]; let guard=0;
  while(T.getS().stage==='node' && guard++<40){ visited.push(stepNode(pick, wp||{})); }
  const S2=T.getS();
  T.toDebrief();
  const rd=T.readiness();
  const band=(rd.match(/(Ready|Developing|Not yet ready)/)||[])[1]||'?';
  return { outcome:S2.outcome, band, primed:S2.primed, cc1:S2.cc1, cc2:S2.cc2,
           served:T.servedUnsafe(), stage:S2.stage, visited };
}

const allA=()=>'a';
const pickExcept=(map)=>(id)=>map[id]||'a';

let pass=0, fail=0;
function check(name, cond, detail){ if(cond){ pass++; console.log('  PASS  '+name); } else { fail++; console.log('  FAIL  '+name+'  ::  '+detail); } }

const SERVE = { S1:{N1:'c'}, S2:{N2:'c'}, S3:{N3:'c'}, S4:{N1:'c'} };
const SOFT  = { S2:{N1:'c'}, S3:{N1:'c'} };

console.log('\n=== 1. Clean run, all defensible -> Prevention (A) ===');
for(const sc of ['S1','S2','S3','S4']){
  const r=runScenario(sc, allA, {reconcile:'correct', flow:'ok', oncall:'good'});
  check(sc+' clean -> A', r.outcome==='A', JSON.stringify(r));
  check(sc+' clean -> not primed', r.primed===false, JSON.stringify(r));
}

console.log('\n=== 2. Serving hard-fail + recognise + good emergency -> C, never B ===');
for(const sc of ['S1','S2','S3','S4']){
  const pick=pickExcept(Object.assign({N5:'a', N6:'a'}, SERVE[sc]));
  const r=runScenario(sc, pick, {reconcile:'correct', flow:'off', oncall:'good'});
  check(sc+' serve+recognise -> C (not B)', r.outcome==='C', JSON.stringify(r));
  check(sc+' serve -> servedUnsafe true', r.served===true, JSON.stringify(r));
}

console.log('\n=== 3. Serving hard-fail + botched emergency (N6=c) -> D ===');
for(const sc of ['S1','S2','S3','S4']){
  const pick=pickExcept(Object.assign({N5:'b', N6:'c'}, SERVE[sc]));
  const r=runScenario(sc, pick, {reconcile:'correct', flow:'off'});
  check(sc+' serve+botch -> D', r.outcome==='D', JSON.stringify(r));
}

console.log('\n=== 4. Soft control only + recognise -> near miss (B) ===');
for(const sc of ['S2','S3']){
  const pick=pickExcept(Object.assign({N5:'a', N6:'a'}, SOFT[sc]));
  const r=runScenario(sc, pick, {reconcile:'correct', flow:'ok', oncall:'good'});
  check(sc+' soft+recognise -> B', r.outcome==='B', JSON.stringify(r));
  check(sc+' soft -> servedUnsafe false', r.served===false, JSON.stringify(r));
}
{
  const pick=pickExcept({N5:'a', N6:'a'});
  const r=runScenario('S4', pick, {reconcile:'correct', flow:'ok', oncall:'bail'});
  check('S4 oncall-bail+recognise -> B', r.outcome==='B', JSON.stringify(r));
}

console.log('\n=== 5. Soft control + miss the signs + good emergency -> C ===');
{
  const pick=pickExcept(Object.assign({N5:'b', N6:'a'}, SOFT.S2));
  const r=runScenario('S2', pick, {reconcile:'correct'});
  check('S2 soft+miss -> C', r.outcome==='C', JSON.stringify(r));
}

console.log('\n=== RESULT: '+pass+' passed, '+fail+' failed ===');
process.exit(fail?1:0);
