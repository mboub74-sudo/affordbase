'use client';
import {useMemo,useState} from 'react';
import {CITY_DATA} from '../cityData';

const PLAN_KEY='affordbase-personal-plan-v1';
const money=(n,c='CAD')=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
const clamp=(v,min=0,max=10000000)=>Math.min(max,Math.max(min,Number(v)||0));
const addMonths=(count)=>{const d=new Date();d.setMonth(d.getMonth()+Math.max(0,count));return d.toLocaleDateString('en-US',{month:'long',year:'numeric'})};

function debtMonths(balance,apr,payment){
 if(balance<=0)return 0;if(payment<=0)return null;const rate=Math.max(0,apr)/1200;
 if(rate===0)return Math.ceil(balance/payment);if(payment<=balance*rate)return null;
 return Math.ceil(-Math.log(1-balance*rate/payment)/Math.log(1+rate));
}
function debtInterest(balance,apr,payment,months){
 if(!months||months<1)return 0;let b=balance,total=0,r=Math.max(0,apr)/1200;
 for(let i=0;i<months&&b>0;i++){const interest=b*r;total+=interest;b=Math.max(0,b+interest-payment)}return total;
}

export default function GoalPlanner(){
 const [goal,setGoal]=useState('home'),[currency,setCurrency]=useState('CAD'),[current,setCurrent]=useState(32000),[monthly,setMonthly]=useState(1200),[homePrice,setHomePrice]=useState(480000),[downPct,setDownPct]=useState(15),[closingPct,setClosingPct]=useState(2.5),[expenses,setExpenses]=useState(4200),[fundMonths,setFundMonths]=useState(6),[debt,setDebt]=useState(18000),[apr,setApr]=useState(8.5),[customTarget,setCustomTarget]=useState(50000),[status,setStatus]=useState('Choose a goal or load your saved AffordBase plan.');
 const calc=useMemo(()=>{
  if(goal==='debt'){
   const months=debtMonths(debt,apr,monthly),interest=debtInterest(debt,apr,monthly,months);return {target:debt,start:0,gap:debt,months,interest,progress:debt<=0?100:0};
  }
  const target=goal==='home'?homePrice*(downPct/100)+homePrice*(closingPct/100):goal==='emergency'?expenses*fundMonths:customTarget;
  const gap=Math.max(0,target-current),months=gap===0?0:(monthly>0?Math.ceil(gap/monthly):null),progress=target>0?Math.min(100,current/target*100):100;
  return {target,start:current,gap,months,interest:0,progress};
 },[goal,current,monthly,homePrice,downPct,closingPct,expenses,fundMonths,debt,apr,customTarget]);
 const milestones=useMemo(()=>[25,50,75,100].map(p=>{const amount=calc.target*p/100;let m;if(goal==='debt'){const remaining=debt*(1-p/100);m=calc.months===null?null:Math.ceil(calc.months*p/100);return {p,amount:remaining,m,label:p===100?'Debt paid':'Debt reduction'}}m=amount<=current?0:(monthly>0?Math.ceil((amount-current)/monthly):null);return {p,amount,m,label:'Saved'}}),[calc,goal,debt,current,monthly]);
 const monthlyRows=useMemo(()=>{if(calc.months===null)return[];const end=Math.min(calc.months,60),rows=[];for(let m=0;m<=end;m++){if(m===0||m===calc.months||m%6===0){let value;if(goal==='debt'){let b=debt,r=Math.max(0,apr)/1200;for(let i=0;i<m&&b>0;i++)b=Math.max(0,b+b*r-monthly);value=b}else value=Math.min(calc.target,current+monthly*m);rows.push({m,value})}}return rows},[calc,goal,debt,apr,monthly,current]);
 function usePlan(){try{const raw=localStorage.getItem(PLAN_KEY);if(!raw){setStatus('No saved My Plan found in this browser. Save a plan first from /my-plan/.');return}const p=JSON.parse(raw);setCurrent(clamp(p.savings));setMonthly(clamp(p.monthlySaving));setHomePrice(clamp(p.homeGoal));setDownPct(clamp(p.downPct,0,100));setClosingPct(clamp(p.closingPct,0,20));const city=CITY_DATA[p.city];const family=Math.max(1,Number(p.family)||1);const base=city?(city.groceries+city.transit+city.utilities+city.phoneInternet+city.misc)*(family<=1?1:1+.55*(family-1)):1200;setExpenses(clamp((p.rent||0)+(p.debt||0)+(p.car||0)+base));setCurrency(city?.currency||'CAD');setStatus('Saved My Plan loaded. You can adjust any goal input without changing the saved plan.')}catch{setStatus('The saved plan could not be loaded.')}}
 const title=goal==='home'?'Buy a Home':goal==='emergency'?'Build Emergency Fund':goal==='debt'?'Pay Off Debt':'Custom Savings Goal';
 return <div className="goalPlanner">
  <section className="goalTop"><div><div className="eyebrow">AFFORDLY V8 · GOAL PLANNER</div><h1>Turn a money goal into a timeline.</h1><p>Pick a goal, set a monthly contribution, and see milestones and target timing instantly.</p></div><button className="usePlanBtn" onClick={usePlan}>Use My Plan</button></section>
  <div className="goalTabs">{[['home','🏡','Buy a Home'],['emergency','🛟','Emergency Fund'],['debt','🧾','Pay Off Debt'],['custom','🎯','Save a Target']].map(([k,i,t])=><button key={k} className={goal===k?'active':''} onClick={()=>setGoal(k)}><span>{i}</span>{t}</button>)}</div>
  <section className="goalLayout"><div className="goalForm"><h2>{title}</h2><label>Currency</label><select value={currency} onChange={e=>setCurrency(e.target.value)}><option>CAD</option><option>USD</option></select>{goal!=='debt'&&<><Field label="Current savings" value={current} set={setCurrent}/><Field label="Monthly contribution" value={monthly} set={setMonthly}/></>}{goal==='home'&&<><Field label="Target home price" value={homePrice} set={setHomePrice}/><div className="goalTwo"><Field label="Down payment %" value={downPct} set={v=>setDownPct(clamp(v,0,100))} prefix="%"/><Field label="Closing costs %" value={closingPct} set={v=>setClosingPct(clamp(v,0,20))} prefix="%"/></div></>}{goal==='emergency'&&<><Field label="Essential monthly expenses" value={expenses} set={setExpenses}/><label>Emergency fund target</label><div className="goalQuick">{[3,6,9].map(n=><button key={n} className={fundMonths===n?'on':''} onClick={()=>setFundMonths(n)}>{n} months</button>)}</div></>}{goal==='debt'&&<><Field label="Debt balance" value={debt} set={setDebt}/><Field label="APR %" value={apr} set={v=>setApr(clamp(v,0,100))} prefix="%"/><Field label="Monthly debt payment" value={monthly} set={setMonthly}/></>}{goal==='custom'&&<Field label="Savings target" value={customTarget} set={setCustomTarget}/>}<div className="goalWhatIf"><span>WHAT IF I ADD…</span><div>{[100,250,500].map(n=><button key={n} onClick={()=>setMonthly(x=>clamp(x+n))}>+{money(n,currency)}/mo</button>)}</div></div><small aria-live="polite">{status}</small></div>
   <div className="goalResults"><div className="goalHero"><span>{title.toUpperCase()}</span><strong>{calc.months===0?'Goal reached':calc.months===null?'Adjust payment':`${calc.months} months`}</strong><small>{calc.months>0?`Estimated target: ${addMonths(calc.months)}${calc.months>12?` · ${(calc.months/12).toFixed(1)} years`:''}`:goal==='debt'&&calc.months===null?'Payment does not cover monthly interest.':'Based on your current inputs.'}</small></div><div className="goalStats"><Stat t={goal==='debt'?'Debt balance':'Goal target'} v={money(calc.target,currency)}/><Stat t={goal==='debt'?'Monthly payment':'Still needed'} v={money(goal==='debt'?monthly:calc.gap,currency)}/><Stat t={goal==='debt'?'Est. interest':'Current progress'} v={goal==='debt'?money(calc.interest,currency):`${calc.progress.toFixed(0)}%`}/></div><h3>Goal milestones</h3><div className="milestoneList">{milestones.map(x=><div key={x.p}><b>{x.p}%</b><span>{goal==='debt'?`${x.label}: ${money(x.amount,currency)}`:`${x.label}: ${money(x.amount,currency)}`}</span><small>{x.m===0?'Already reached':x.m===null?'—':x.m>=calc.months&&x.p===100?addMonths(calc.months):`${x.m} mo`}</small></div>)}</div><h3>Monthly timeline</h3><div className="timelineTable">{monthlyRows.length?monthlyRows.map(x=><div key={x.m}><span>{x.m===0?'Today':`Month ${x.m}`}</span><b>{goal==='debt'?`${money(x.value,currency)} left`:money(x.value,currency)}</b><i style={{width:`${goal==='debt'?Math.max(2,100-(x.value/Math.max(1,debt)*100)):Math.max(2,x.value/Math.max(1,calc.target)*100)}%`}}/></div>):<p>Add a monthly contribution large enough to reach this goal.</p>}</div><p className="goalNote">Planning estimate only. Debt payoff uses the APR and payment entered; real lender interest timing, fees and minimum-payment rules can differ.</p></div>
  </section>
 </div>
}
function Field({label,value,set,prefix='$'}){return <div><label>{label}</label><div className="goalInput"><span>{prefix}</span><input type="number" min="0" value={value} onChange={e=>set(clamp(e.target.value))}/></div></div>}
function Stat({t,v}){return <div><span>{t}</span><strong>{v}</strong></div>}
