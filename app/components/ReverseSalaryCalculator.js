'use client';
import {useMemo,useState} from 'react';
import {CITY_DATA,cityMonthlyCost} from '../cityData';
import {canadaTax,usaTax} from '../tax';

const cities=Object.keys(CITY_DATA);
const householdMultiplier={single:1,couple:1.45,family:1.85};

export default function ReverseSalaryCalculator(){
 const [country,setCountry]=useState('CA');
 const available=cities.filter(name=>CITY_DATA[name].country===country);
 const [city,setCity]=useState('Toronto');
 const [household,setHousehold]=useState('single');
 const c=CITY_DATA[city]||CITY_DATA[available[0]];
 const [rent,setRent]=useState(2300),[car,setCar]=useState(450),[debt,setDebt]=useState(250),[living,setLiving]=useState(1400),[savings,setSavings]=useState(1000),[current,setCurrent]=useState(70000);
 const currency=c.currency;
 const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency,maximumFractionDigits:0}).format(Math.max(0,+n||0));
 function tax(gross){return c.country==='CA'?canadaTax(gross,c.region):usaTax(gross,c.region,'single')}
 function changeCountry(next){setCountry(next);const first=cities.find(name=>CITY_DATA[name].country===next);setCity(first);const nc=CITY_DATA[first];setRent(nc.rent);setLiving(Math.round((cityMonthlyCost(nc)-nc.rent)*householdMultiplier[household]));}
 function changeCity(next){setCity(next);const nc=CITY_DATA[next];setRent(nc.rent);setLiving(Math.round((cityMonthlyCost(nc)-nc.rent)*householdMultiplier[household]));}
 function changeHousehold(next){setHousehold(next);setLiving(Math.round((cityMonthlyCost(c)-c.rent)*householdMultiplier[next]));}
 function preset(type){if(type==='save500')setSavings(500);if(type==='save1000')setSavings(1000);if(type==='rent2000')setRent(2000);if(type==='nocar')setCar(0)}
 const r=useMemo(()=>{
  const requiredMonthly=Math.max(0,+rent||0)+Math.max(0,+car||0)+Math.max(0,+debt||0)+Math.max(0,+living||0)+Math.max(0,+savings||0);
  const requiredNet=requiredMonthly*12;
  let lo=0,hi=1000000;
  for(let i=0;i<60;i++){const mid=(lo+hi)/2;if(tax(mid).net>=requiredNet)hi=mid;else lo=mid;}
  const target=tax(hi);const currentTax=tax(current);const diff=hi-Math.max(0,+current||0);const savingsRate=requiredMonthly?Math.max(0,+savings||0)/requiredMonthly*100:0;
  return {requiredMonthly,target,currentTax,diff,savingsRate};
 },[city,rent,car,debt,living,savings,current]);
 return <div className="reverseCalc">
  <div className="reverseInputs">
   <div className="eyebrow">BUILD YOUR TARGET LIFESTYLE</div><h2>How much salary do you need?</h2><p>Enter the monthly life you want. AffordBase works backward through the same tax engine to estimate the gross salary needed.</p>
   <label>Country</label><div className="seg"><button onClick={()=>changeCountry('CA')} className={country==='CA'?'on':''}>🇨🇦 Canada</button><button onClick={()=>changeCountry('US')} className={country==='US'?'on':''}>🇺🇸 USA</button></div>
   <label>City</label><select value={city} onChange={e=>changeCity(e.target.value)}>{available.map(name=><option key={name}>{name}</option>)}</select>
   <label>Household</label><select value={household} onChange={e=>changeHousehold(e.target.value)}><option value="single">Single adult</option><option value="couple">Couple</option><option value="family">Family household</option></select>
   <div className="reverseGrid"><Field label="Monthly rent" value={rent} set={setRent}/><Field label="Car payment" value={car} set={setCar}/><Field label="Debt payments" value={debt} set={setDebt}/><Field label="Living costs" value={living} set={setLiving}/><Field label="Desired savings" value={savings} set={setSavings}/><Field label="Current salary (optional)" value={current} set={setCurrent}/></div>
   <div className="quickScenarios"><button onClick={()=>preset('save500')}>Save $500/mo</button><button onClick={()=>preset('save1000')}>Save $1,000/mo</button><button onClick={()=>preset('rent2000')}>Rent $2,000</button><button onClick={()=>preset('nocar')}>No car payment</button></div>
   <small>Planning estimate only. Actual tax, credits, deductions and household costs can differ.</small>
  </div>
  <div className="reverseResults" aria-live="polite">
   <div className="eyebrow">YOUR SALARY TARGET</div><div className="targetSalary"><span>Estimated gross salary needed</span><strong>{money(r.target.gross)}</strong><small>/ year</small></div>
   <div className="reverseCards"><Metric label="Monthly gross" value={money(r.target.gross/12)}/><Metric label="Required take-home" value={money(r.requiredMonthly)}/><Metric label="Estimated taxes / year" value={money(r.target.total)}/><Metric label="Savings rate" value={`${r.savingsRate.toFixed(1)}%`}/></div>
   <div className="plan"><h3>Monthly plan</h3>{[['Rent',rent],['Car',car],['Debt',debt],['Living costs',living],['Savings goal',savings]].map(([k,v])=><div key={k}><span>{k}</span><b>{money(v)}</b></div>)}<div className="planTotal"><span>Required take-home</span><b>{money(r.requiredMonthly)}</b></div></div>
   {+current>0&&<div className={`salaryGap ${r.diff<=0?'good':''}`}><span>Difference from current salary</span><strong>{r.diff>0?'+':''}{money(Math.abs(r.diff))}{r.diff<0?' below target salary':''}</strong><small>{r.diff>0?`${money(r.diff/12)} more gross per month`:r.diff<0?'Current salary is above the estimated target.':'Current salary matches the estimated target.'}</small></div>}
  </div>
 </div>
}
function Field({label,value,set}){return <div><label>{label}</label><div className="input"><span>$</span><input min="0" type="number" value={value} onChange={e=>set(Math.max(0,+e.target.value||0))}/></div></div>}
function Metric({label,value}){return <div><span>{label}</span><strong>{value}</strong></div>}
