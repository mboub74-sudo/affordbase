'use client';
import {useMemo,useState} from 'react';

const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));

export default function FortyXRentCalculator(){
 const [rent,setRent]=useState(2000);
 const r=useMemo(()=>{
  const safeRent=Math.max(0,Number(rent)||0);
  const annualGross=safeRent*40;
  const monthlyGross=annualGross/12;
  const threeXAnnual=safeRent*3*12;
  const thirtyPercentAnnual=safeRent/0.30*12;
  const rentShare=annualGross>0 ? (safeRent*12/annualGross)*100 : 0;
  return {safeRent,annualGross,monthlyGross,threeXAnnual,thirtyPercentAnnual,rentShare};
 },[rent]);
 return <div className="rentTool">
  <div className="fields">
   <label>Monthly rent</label>
   <input aria-label="Monthly rent" type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/>
   <small>Enter the monthly rent you want to test. The 40× rule compares monthly rent with gross annual income before taxes and deductions.</small>
   <div className="whatifBox"><span>40× RENT FORMULA</span><b>Annual gross income = monthly rent × 40</b><small>Monthly gross equivalent = annual income ÷ 12.</small></div>
  </div>
  <div className="answer" aria-live="polite">
   <span>40× rent income target</span>
   <strong>{money(r.annualGross)}<small>/year gross</small></strong>
   <div className="answergrid">
    <p><b>{money(r.monthlyGross)}</b><small>gross income / month</small></p>
    <p><b>{money(r.safeRent)}</b><small>monthly rent</small></p>
    <p><b>{r.rentShare.toFixed(1)}%</b><small>rent share of gross income</small></p>
    <p><b>{money(r.threeXAnnual)}</b><small>3× rent reference / year</small></p>
   </div>
   <div className="whatifBox"><span>YOUR CALCULATION</span><b>{money(r.safeRent)} × 40 = {money(r.annualGross)} gross/year</b><small>For comparison, a 30% gross-income target is about {money(r.thirtyPercentAnnual)}/year.</small></div>
  </div>
 </div>
}
