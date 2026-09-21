'use client';
import {useMemo,useState} from 'react';

const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));

export default function ThreeXRentCalculator(){
 const [rent,setRent]=useState(2000);
 const r=useMemo(()=>{
  const safeRent=Math.max(0,Number(rent)||0);
  const monthlyGross=safeRent*3;
  const annualGross=monthlyGross*12;
  const thirtyPercentAnnual=safeRent/0.30*12;
  const fortyXAnnual=safeRent*40;
  return {safeRent,monthlyGross,annualGross,thirtyPercentAnnual,fortyXAnnual};
 },[rent]);
 return <div className="rentTool">
  <div className="fields">
   <label>Monthly rent</label>
   <input aria-label="Monthly rent" type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/>
   <small>Enter the monthly rent you want to test. The 3× rule uses gross income before taxes and deductions.</small>
   <div className="whatifBox"><span>3× RENT FORMULA</span><b>Monthly gross income = rent × 3</b><small>Annual gross income = rent × 3 × 12.</small></div>
  </div>
  <div className="answer" aria-live="polite">
   <span>3× rent income target</span>
   <strong>{money(r.annualGross)}<small>/year gross</small></strong>
   <div className="answergrid">
    <p><b>{money(r.monthlyGross)}</b><small>gross income / month</small></p>
    <p><b>{money(r.safeRent)}</b><small>monthly rent</small></p>
    <p><b>{money(r.thirtyPercentAnnual)}</b><small>30% gross-income reference / year</small></p>
    <p><b>{money(r.fortyXAnnual)}</b><small>40× rent reference / year</small></p>
   </div>
   <div className="whatifBox"><span>YOUR CALCULATION</span><b>{money(r.safeRent)} × 3 = {money(r.monthlyGross)} gross/month</b><small>{money(r.monthlyGross)} × 12 = {money(r.annualGross)} gross/year.</small></div>
  </div>
 </div>
}
