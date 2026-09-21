'use client';
import {useEffect,useMemo,useState} from 'react';
import {canadaTax,usaTax} from '../tax';
import {CITY_DATA} from '../cityData';

const money=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
const KEY='affordbase-personal-plan-v1';
const defaults={city:'Toronto',salary:85000,family:1,rent:2300,debt:250,car:450,savings:32000,monthlySaving:1200,homeGoal:480000,downPct:15,closingPct:2.5};
const num=(v,min=0,max=10000000)=>Math.min(max,Math.max(min,+v||0));
const allowedKeys=Object.keys(defaults);
function sanitizePlan(input={}){const out={...defaults};for(const k of allowedKeys){if(k==='city'){if(CITY_DATA[input[k]])out[k]=input[k];}else if(k==='family')out[k]=num(input[k],1,10);else if(k==='downPct')out[k]=num(input[k],0,100);else if(k==='closingPct')out[k]=num(input[k],0,20);else out[k]=num(input[k]);}return out}
function encodePlan(p){return btoa(unescape(encodeURIComponent(JSON.stringify(sanitizePlan(p))))).replace(/\+/g,'-').replace(/\//g,'_').replace(/=+$/,'')}
function decodePlan(s){try{const pad=s.replace(/-/g,'+').replace(/_/g,'/');const raw=decodeURIComponent(escape(atob(pad+'='.repeat((4-pad.length%4)%4))));return sanitizePlan(JSON.parse(raw))}catch{return null}}
function pdfEsc(s){return String(s).replace(/\\/g,'\\\\').replace(/\(/g,'\\(').replace(/\)/g,'\\)').replace(/[^\x20-\x7E]/g,'')}
function buildPdf(lines){
 const content=['BT','/F1 20 Tf','54 760 Td',`(${pdfEsc('AFFORDLY - PERSONAL FINANCIAL PLAN')}) Tj`,'/F1 10 Tf','0 -26 Td'];
 lines.forEach((line,i)=>{if(i)content.push('0 -18 Td');content.push(`(${pdfEsc(line)}) Tj`)});content.push('ET');
 const stream=content.join('\n');
 const objs=[null,
  '<< /Type /Catalog /Pages 2 0 R >>',
  '<< /Type /Pages /Kids [3 0 R] /Count 1 >>',
  '<< /Type /Page /Parent 2 0 R /MediaBox [0 0 612 792] /Resources << /Font << /F1 5 0 R >> >> /Contents 4 0 R >>',
  `<< /Length ${stream.length} >>\nstream\n${stream}\nendstream`,
  '<< /Type /Font /Subtype /Type1 /BaseFont /Helvetica >>'
 ];
 let pdf='%PDF-1.4\n', offsets=[0];
 for(let i=1;i<objs.length;i++){offsets[i]=pdf.length;pdf+=`${i} 0 obj\n${objs[i]}\nendobj\n`}
 const xref=pdf.length;pdf+=`xref\n0 ${objs.length}\n0000000000 65535 f \n`;
 for(let i=1;i<objs.length;i++)pdf+=`${String(offsets[i]).padStart(10,'0')} 00000 n \n`;
 pdf+=`trailer\n<< /Size ${objs.length} /Root 1 0 R >>\nstartxref\n${xref}\n%%EOF`;
 return new Blob([pdf],{type:'application/pdf'});
}

export default function PersonalFinancialPlan(){
 const [p,setP]=useState(defaults),[status,setStatus]=useState('Your plan is stored only when you press Save My Plan.'),[shareUrl,setShareUrl]=useState('');
 useEffect(()=>{try{const q=new URLSearchParams(window.location.search);const shared=q.get('plan');if(shared){const decoded=decodePlan(shared);if(decoded){setP(decoded);setStatus('Shared plan loaded. It is not saved on this device unless you press Save My Plan.');return}}const raw=localStorage.getItem(KEY);if(raw){setP(sanitizePlan(JSON.parse(raw)));setStatus('Saved plan loaded from this browser.')}}catch{}},[]);
 const city=CITY_DATA[p.city]||CITY_DATA.Toronto,currency=city.currency;
 const r=useMemo(()=>{const tax=city.country==='CA'?canadaTax(p.salary,city.region):usaTax(p.salary,city.region,'single');const take=tax.net/12;const baseLiving=city.groceries+city.transit+city.utilities+city.phoneInternet+city.misc;const familyFactor=p.family<=1?1:1+(.55*(p.family-1));const living=baseLiving*familyFactor;const expenses=p.rent+p.debt+p.car+living;const left=take-expenses;const savingsRate=take>0?Math.max(0,left/take*100):0;const housingRate=take>0?p.rent/take*100:100;const debtRate=take>0?p.debt/take*100:100;const emergencyMonths=expenses>0?p.savings/expenses:0;const down=p.homeGoal*(p.downPct/100);const closing=p.homeGoal*(p.closingPct/100);const cashTarget=down+closing;const gap=Math.max(0,cashTarget-p.savings);const months=gap===0?0:(p.monthlySaving>0?Math.ceil(gap/p.monthlySaving):null);const homeProgress=cashTarget>0?Math.min(100,p.savings/cashTarget*100):100;const housingScore=Math.max(0,Math.min(25,25-(Math.max(0,housingRate-30)*1.25)));const debtScore=Math.max(0,Math.min(20,20-(Math.max(0,debtRate-10)*1.5)));const savingsScore=Math.max(0,Math.min(20,savingsRate/20*20));const emergencyScore=Math.max(0,Math.min(15,emergencyMonths/6*15));const homeScore=Math.max(0,Math.min(20,homeProgress/100*20));const healthScore=Math.round(housingScore+debtScore+savingsScore+emergencyScore+homeScore);return {tax,take,living,expenses,left,savingsRate,housingRate,debtRate,emergencyMonths,homeProgress,healthScore,housingScore,debtScore,savingsScore,emergencyScore,homeScore,down,closing,cashTarget,gap,months}},[p,city]);
 const set=(k,v)=>setP(x=>({...x,[k]:v}));
 function save(){try{localStorage.setItem(KEY,JSON.stringify(sanitizePlan(p)));setStatus(`Plan saved on this device at ${new Date().toLocaleTimeString([], {hour:'2-digit',minute:'2-digit'})}.`)}catch{setStatus('This browser blocked local saving. Your current plan still works on this page.')}}
 function clear(){try{localStorage.removeItem(KEY)}catch{}setP(defaults);setShareUrl('');if(typeof window!=='undefined')history.replaceState(null,'',window.location.pathname);setStatus('Saved plan cleared and defaults restored.');}
 async function share(){const url=`${window.location.origin}${window.location.pathname}?plan=${encodePlan(p)}`;setShareUrl(url);try{await navigator.clipboard.writeText(url);setStatus('Share link copied. It contains plan numbers only — no name or email.')}catch{setStatus('Share link created. Copy it from the field below.')}}
 function downloadPdf(){
  const code=currency==='CAD'?'CAD':'USD'; const fmt=n=>`${code} ${Math.round(n).toLocaleString('en-US')}`;
  const lines=[
   `Generated: ${new Date().toLocaleDateString('en-CA')}`,
   `City: ${p.city} | Household size: ${p.family}`,
   '',
   'INCOME & MONTHLY BUDGET',
   `Gross salary: ${fmt(p.salary)} / year`,
   `Estimated take-home: ${fmt(r.take)} / month`,
   `Rent: ${fmt(p.rent)} | Car: ${fmt(p.car)} | Debt: ${fmt(p.debt)}`,
   `Estimated living costs: ${fmt(r.living)} / month`,
   `Total monthly expenses: ${fmt(r.expenses)}`,
   `Money left: ${fmt(r.left)} | Savings capacity: ${r.savingsRate.toFixed(0)}%`,
   '',
   'SAVINGS & HOME GOAL',
   `Current savings: ${fmt(p.savings)} | Monthly saving: ${fmt(p.monthlySaving)}`,
   `Home price goal: ${fmt(p.homeGoal)}`,
   `Down payment (${p.downPct}%): ${fmt(r.down)}`,
   `Estimated closing costs (${p.closingPct}%): ${fmt(r.closing)}`,
   `Cash target: ${fmt(r.cashTarget)} | Still needed: ${fmt(r.gap)}`,
   `Savings timeline: ${r.months===0?'Goal funded':r.months===null?'Monthly saving needed':`${r.months} months (about ${(r.months/12).toFixed(1)} years)`}`,
   '',
   'FINANCIAL PLANNING SCORE',
   `Overall planning score: ${r.healthScore} / 100`,
   `Housing load: ${r.housingRate.toFixed(0)}% | Debt load: ${r.debtRate.toFixed(0)}%`,
   `Savings capacity: ${r.savingsRate.toFixed(0)}% | Emergency fund: ${r.emergencyMonths.toFixed(1)} months`,
   `Home cash readiness: ${r.homeProgress.toFixed(0)}%`,
   ...actionLines(p,r,currency),
   '',
   'Planning estimate only. Not financial advice or loan approval.'
  ];
  const blob=buildPdf(lines),url=URL.createObjectURL(blob),a=document.createElement('a');a.href=url;a.download='affordbase-personal-financial-plan.pdf';document.body.appendChild(a);a.click();a.remove();setTimeout(()=>URL.revokeObjectURL(url),1000);setStatus('PDF report generated and downloaded.');
 }
 const cities=Object.entries(CITY_DATA).filter(([,v])=>v.country===city.country);
 return <div className="planWrap">
  <section className="planIntro"><div><div className="eyebrow">V7.2 · FINANCIAL HEALTH + ACTION PLAN</div><h1>Your financial life, in one plan.</h1><p>Enter your numbers once. AffordBase connects take-home pay, monthly costs, savings and your home cash goal in one live roadmap.</p></div><div className="saveBox"><button className="saveBtn" onClick={save}>Save My Plan</button><button className="clearBtn" onClick={clear}>Reset</button><button className="shareBtn" onClick={share}>Share My Plan</button><button className="pdfBtn" onClick={downloadPdf}>PDF Report</button><small aria-live="polite">{status}</small>{shareUrl&&<input className="shareField" aria-label="Share link" readOnly value={shareUrl} onFocus={e=>e.target.select()}/>}</div></section>
  <section className="planGrid"><div className="planForm"><h2>Your situation</h2><label>Country</label><div className="seg"><button className={city.country==='CA'?'on':''} onClick={()=>set('city','Toronto')}>🇨🇦 Canada</button><button className={city.country==='US'?'on':''} onClick={()=>set('city','New York City')}>🇺🇸 USA</button></div><label>City</label><select value={p.city} onChange={e=>set('city',e.target.value)}>{cities.map(([name])=><option key={name}>{name}</option>)}</select><div className="twocol"><Field label="Annual salary" value={p.salary} onChange={v=>set('salary',num(v))}/><Field label="Family size" value={p.family} onChange={v=>set('family',num(v,1,10))}/></div><div className="twocol"><Field label="Monthly rent" value={p.rent} onChange={v=>set('rent',num(v))}/><Field label="Monthly debt" value={p.debt} onChange={v=>set('debt',num(v))}/></div><Field label="Car payment" value={p.car} onChange={v=>set('car',num(v))}/><h2 className="subhead">Savings & home goal</h2><div className="twocol"><Field label="Current savings" value={p.savings} onChange={v=>set('savings',num(v))}/><Field label="Monthly saving" value={p.monthlySaving} onChange={v=>set('monthlySaving',num(v))}/></div><Field label="Home price goal" value={p.homeGoal} onChange={v=>set('homeGoal',num(v))}/><div className="twocol"><Field label="Down payment %" value={p.downPct} onChange={v=>set('downPct',num(v,0,100))}/><Field label="Closing costs %" value={p.closingPct} onChange={v=>set('closingPct',num(v,0,20))}/></div></div>
  <div className="planResults"><div className="eyebrow">YOUR AFFORDLY PLAN</div><div className="planCards"><Card t="Take-home" v={`${money(r.take,currency)}/mo`}/><Card t="Monthly expenses" v={money(r.expenses,currency)}/><Card t="Money left" v={money(r.left,currency)} warn={r.left<0}/><Card t="Savings capacity" v={`${r.savingsRate.toFixed(0)}%`}/></div><div className="breakdown"><h2>Monthly budget</h2><Row t="Rent" v={p.rent} c={currency}/><Row t="Car" v={p.car} c={currency}/><Row t="Debt" v={p.debt} c={currency}/><Row t="Estimated living costs" v={r.living} c={currency}/><Row t="Money left" v={r.left} c={currency} strong/></div><div className="homeGoal"><div><span>HOME GOAL</span><strong>{money(p.homeGoal,currency)}</strong><small>{p.city}</small></div><div className="goalRows"><Row t={`Down payment (${p.downPct}%)`} v={r.down} c={currency}/><Row t="Estimated closing costs" v={r.closing} c={currency}/><Row t="Cash target" v={r.cashTarget} c={currency} strong/><Row t="Current savings" v={p.savings} c={currency}/><Row t="Still needed" v={r.gap} c={currency} strong/></div><div className="timeline"><span>SAVINGS TIMELINE</span><strong>{r.months===0?'Goal funded':r.months===null?'Add monthly savings':`${r.months} months`}</strong><small>{r.months>0?`At ${money(p.monthlySaving,currency)} per month · about ${(r.months/12).toFixed(1)} years`:'Based on the numbers above'}</small></div></div><div className="healthPanel"><div className="healthTop"><div><span>FINANCIAL PLANNING SCORE</span><strong>{r.healthScore}<small>/100</small></strong><p>A transparent planning indicator — not a credit score or lender rating.</p></div><div className="scoreRing" style={{'--score':`${r.healthScore}%`}}><b>{r.healthScore}</b></div></div><div className="healthMetrics"><Metric name="Housing load" value={`${r.housingRate.toFixed(0)}%`} score={r.housingScore} max={25}/><Metric name="Debt load" value={`${r.debtRate.toFixed(0)}%`} score={r.debtScore} max={20}/><Metric name="Savings capacity" value={`${r.savingsRate.toFixed(0)}%`} score={r.savingsScore} max={20}/><Metric name="Emergency fund" value={`${r.emergencyMonths.toFixed(1)} mo`} score={r.emergencyScore} max={15}/><Metric name="Home readiness" value={`${r.homeProgress.toFixed(0)}%`} score={r.homeScore} max={20}/></div><details className="scoreWhy"><summary>Why this score?</summary><p>Housing 25 points · Debt 20 · Savings 20 · Emergency fund 15 · Home cash readiness 20. Housing begins losing points above 30% of estimated take-home; debt above 10%. Savings reaches its full component at 20%, emergency reserves at 6 months, and home readiness follows progress toward the selected cash target.</p></details></div><div className="actionPlan"><div className="actionHead"><div><span>ACTION PLAN</span><h2>Try changes that move the numbers</h2></div><div className="actionLinks"><a href="/dashboard/">Open What-If Dashboard →</a><a href="/goal-planner/">Open Goal Planner →</a></div></div><div className="actionGrid">{makeActions(p,r).map((a,i)=><button key={i} onClick={()=>setP(x=>({...x,...a.patch}))}><b>{a.title}</b><span>{a.detail}</span><small>Apply scenario →</small></button>)}</div></div><p className="estimateNote">Planning estimate only. Taxes, living costs, mortgage qualification and closing costs can differ by household and location.</p></div></section>
 </div>
}
function Field({label,value,onChange}){return <div><label>{label}</label><div className="input"><span>$</span><input type="number" min="0" value={value} onChange={e=>onChange(e.target.value)}/></div></div>}
function Card({t,v,warn}){return <div className={warn?'planCard warn':'planCard'}><span>{t}</span><strong>{v}</strong></div>}
function Row({t,v,c,strong}) {return <div className={strong?'planRow strong':'planRow'}><span>{t}</span><b>{money(v,c)}</b></div>}

function Metric({name,value,score,max}){const pct=Math.max(0,Math.min(100,score/max*100));return <div className="healthMetric"><div><b>{name}</b><span>{value}</span></div><div className="metricBar"><i style={{width:`${pct}%`}}/></div><small>{Math.round(score)} / {max} points</small></div>}
function makeActions(p,r){const a=[];if(r.housingRate>30)a.push({title:'Lower housing cost by $300',detail:'See how a smaller rent changes monthly breathing room.',patch:{rent:Math.max(0,p.rent-300)}});else a.push({title:'Test a $300 housing buffer',detail:'Model a lower rent and compare the extra room.',patch:{rent:Math.max(0,p.rent-300)}});if(r.savingsRate<20)a.push({title:'Add $200 to monthly savings',detail:'Shorten the home cash timeline with a higher savings target.',patch:{monthlySaving:p.monthlySaving+200}});else a.push({title:'Stress-test +$200 savings',detail:'See whether your current budget can support a higher target.',patch:{monthlySaving:p.monthlySaving+200}});if(p.car>0)a.push({title:'Try no car payment',detail:'Model the impact of removing the monthly car payment.',patch:{car:0}});else a.push({title:'Increase salary by $15K',detail:'Compare how more gross income changes the plan.',patch:{salary:p.salary+15000}});return a.slice(0,3)}
function actionLines(p,r,c){const out=['ACTION PLAN'];if(r.housingRate>30)out.push('Scenario: test housing cost $300 lower.');if(r.savingsRate<20)out.push('Scenario: test $200 more monthly saving.');if(p.car>0)out.push('Scenario: compare the plan without a car payment.');if(out.length===1)out.push('Scenario: stress-test salary, housing and savings changes.');return out}
