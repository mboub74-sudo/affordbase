'use client';
import {useMemo,useState} from 'react';
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));
export default function IncomeNeededForRentCalculator(){
 const [rent,setRent]=useState(2000),[ratio,setRatio]=useState(30);
 const r=useMemo(()=>{
  const safeRent=Math.max(0,Number(rent)||0),safeRatio=Math.min(100,Math.max(1,Number(ratio)||30));
  const monthlyGross=safeRent/(safeRatio/100),annualGross=monthlyGross*12;
  const threeXMonthly=safeRent*3,threeXAnnual=threeXMonthly*12,fortyXAnnual=safeRent*40;
  return {monthlyGross,annualGross,threeXMonthly,threeXAnnual,fortyXAnnual,ratio:safeRatio};
 },[rent,ratio]);
 return <div className="rentTool">
  <div className="fields">
   <label>Desired monthly rent</label><input aria-label="Desired monthly rent" type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/>
   <label>Target rent-to-gross-income ratio</label><div className="rangeRow"><input aria-label="Target rent to gross income ratio" type="range" min="20" max="50" step="1" value={ratio} onChange={e=>setRatio(e.target.value)}/><b>{r.ratio}%</b></div>
   <small>This is a planning ratio, not a landlord approval standard. Adjust it to compare income targets.</small>
  </div>
  <div className="answer">
   <span>Estimated gross income needed</span><strong>{money(r.annualGross)}<small>/year</small></strong>
   <div className="answergrid"><p><b>{money(r.monthlyGross)}</b><small>gross income / month at {r.ratio}%</small></p><p><b>{money(r.threeXAnnual)}</b><small>annualized 3× monthly-rent reference</small></p><p><b>{money(r.fortyXAnnual)}</b><small>40× annual-income reference</small></p><p><b>{money(rent)}</b><small>desired rent / month</small></p></div>
   <div className="whatifBox"><span>HOW THE MAIN RESULT IS CALCULATED</span><b>{money(rent)} ÷ {r.ratio}% = {money(r.monthlyGross)} gross/month</b><small>Then × 12 = {money(r.annualGross)} gross/year.</small></div>
  </div>
 </div>
}
