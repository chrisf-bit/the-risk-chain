function lin(c){ c/=255; return c<=0.03928 ? c/12.92 : Math.pow((c+0.055)/1.055,2.4); }
function L(h){ h=h.replace('#',''); return 0.2126*lin(parseInt(h.slice(0,2),16))+0.7152*lin(parseInt(h.slice(2,4),16))+0.0722*lin(parseInt(h.slice(4,6),16)); }
function R(a,b){ const l1=L(a),l2=L(b),hi=Math.max(l1,l2),lo=Math.min(l1,l2); return (hi+0.05)/(lo+0.05); }
function t(label,fg,bg,need){ const r=R(fg,bg); console.log((r>=need?'PASS ':'FAIL ')+r.toFixed(2)+' /'+need+'  '+label); return r>=need; }
let ok=true;
[['CTA navy/orange L','#072a6b','#ff7a1a',4.5],['CTA navy/orange D','#072a6b','#ff8a33',4.5],
 ['ink-3 caption','#5b6892','#ffffff',4.5],['ink-2','#3c4f86','#ffffff',4.5],
 ['good/white','#0c7038','#ffffff',4.5],['good/tint','#0c7038','#e4f6ec',4.5],
 ['warn/white','#9a5109','#ffffff',4.5],['warn/tint','#9a5109','#fff2e0',4.5],
 ['bad/white','#c0281f','#ffffff',4.5],['bad/tint','#c0281f','#fdeae8',4.5],
 ['chip white/teal-deep','#ffffff','#0b6b78',4.5],
 ['focus teal-strong (UI)','#0e8b9a','#ffffff',3.0],
 ['tin label ink-2/surface2','#3c4f86','#f3f6fb',4.5]
].forEach(p=>{ if(!t(...p)) ok=false; });
console.log(ok?'\nALL PASS':'\nSOME FAIL');
