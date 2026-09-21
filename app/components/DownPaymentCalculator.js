'use client';
import {useMemo,useState} from 'react';
import {CITY_DATA} from '../cityData';
const safe=v=>Math.max(0,Number(v)||0);
const money=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
function canadaMinimum(price){if(price<=500000)return price*.05;if(price<1500000)return 25000+(price-500000)*.10;return price*.20}
export default function DownPaymentCalculator({initialHomePrice=500000,initialCity='Toronto'}){
 const [city,setCity]=useState(CITY_DATA[initialCity]?initialCity:'Toronto'),[price,setPrice]=useState(safe(initialHomePrice)||500000),[pct,setPct]=useState(20),[saved,setSaved]=useState(50000),[monthly,setMonthly]=useState(1500);
 const r=useMemo(()=>{const d=CITY_DATA[city],currency=d.currency,amount=price*safe(pct)/100,mortgage=Math.max(0,price-amount),min=d.country==='CA'?canadaMinimum(price):null,gap=Math.max(0,amount-safe(saved)),months=gap===0?0:(safe(monthly)>0?Math.ceil(gap/safe(monthly)):null),insured=d.country==='CA'&&price<1500000&&pct<20;return {d,currency,amount,mortgage,min,gap,months,insured}},[city,price,pct,saved,monthly]);
 const timeline=r.months===null?'Add monthly savings':r.months===0?'Target reached':`${r.months} months (~${(r.months/12).toFixed(1)} years)`;
 return <section className="cashCalc"><div className="cashInputs"><div className="eyebrow">DOWN PAYMENT PLANNER</div><h2>Calculate your home down payment</h2><p>Choose a home price and down payment percentage, then compare the target with the savings you already have.</p>
 <label>City</label><select value={city} onChange={e=>setCity(e.target.value)}>{Object.entries(CITY_DATA).map(([n,d])=><option key={n} value={n}>{d.country==='CA'?'🇨🇦':'🇺🇸'} {n}</option>)}</select>
 <div className="cashGrid"><Field label="Home price" value={price} set={setPrice} step="5000"/><Field label="Down payment (%)" value={pct} set={setPct} step="0.5"/><Field label="Savings available" value={saved} set={setSaved} step="1000"/><Field label="Monthly savings" value={monthly} set={setMonthly} step="100"/></div>
 <small>{r.d.country==='CA'?'For Canadian homes, AffordBase also shows the federal minimum down-payment benchmark. Mortgage insurance is typically required when the down payment is below 20%.':'For U.S. homes, minimum down-payment requirements depend on loan program, lender and borrower eligibility. The percentage here is your planning target.'}</small></div>
 <div className="cashResults"><div className="eyebrow">YOUR DOWN PAYMENT</div><div className="cashHero"><span>Target down payment</span><strong>{money(r.amount,r.currency)}</strong><small>{safe(pct).toFixed(1)}% of a {money(price,r.currency)} home</small></div>
 <div className="cashCards"><Metric t="Estimated mortgage" v={money(r.mortgage,r.currency)} s="purchase price minus down payment"/><Metric t="Cash still to save" v={money(r.gap,r.currency)} s="after entered savings"/>{r.min!==null?<Metric t="Canada minimum" v={money(r.min,r.currency)} s={price>=1500000?'20% at this price level':'federal minimum benchmark'}/>:<Metric t="Down payment rate" v={`${safe(pct).toFixed(1)}%`} s="your selected planning target"/>}<Metric t="Mortgage insurance" v={r.d.country==='CA'?(r.insured?'Typically required':'Typically not required at 20%+'):'Loan-dependent'} s={r.d.country==='CA'?'Canada benchmark':'check your loan program'}/></div>
 <div className="savingsTimeline"><h3>Savings timeline</h3><div className="timelineBig"><span>Estimated time to your down-payment target</span><strong>{timeline}</strong></div><Row t="Savings available" v={money(saved,r.currency)}/><Row t="Monthly savings" v={`${money(monthly,r.currency)}/mo`}/><Row t="Target" v={money(r.amount,r.currency)}/><Row t="Remaining gap" v={money(r.gap,r.currency)}/></div></div></section>
}
function Field({label,value,set,step='1'}){return <div><label>{label}</label><input type="number" min="0" step={step} value={value} onChange={e=>set(safe(e.target.value))}/></div>}
function Metric({t,v,s}){return <div className="cashMetric"><span>{t}</span><strong>{v}</strong><small>{s}</small></div>}
function Row({t,v}){return <div><span>{t}</span><b>{v}</b></div>}
