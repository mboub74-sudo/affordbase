'use client';
import {useMemo,useState} from 'react';
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));
export default function SalaryNeededFor2000RentCalculator(){
 const rent=2000;
 const [ratio,setRatio]=useState(30);
 const r=useMemo(()=>{
  const safeRatio=Math.min(50,Math.max(20,Number(ratio)||30));
  const monthly=rent/(safeRatio/100), annual=monthly*12;
  return {safeRatio,monthly,annual,threeMonthly:rent*3,threeAnnual:rent*36,fortyAnnual:rent*40};
 },[ratio]);
 return <div className="rentTool">
  <div className="fields">
   <label>Monthly rent</label><input aria-label="Monthly rent" type="number" value={rent} readOnly/>
   <label>Target rent-to-gross-income ratio</label><div className="rangeRow"><input aria-label="Target rent to gross income ratio" type="range" min="20" max="50" step="1" value={ratio} onChange={e=>setRatio(e.target.value)}/><b>{r.safeRatio}%</b></div>
   <small>Move the slider to see how a more conservative or flexible rent ratio changes the salary target.</small>
  </div>
  <div className="answer">
   <span>Estimated salary needed</span><strong>{money(r.annual)}<small>/year gross</small></strong>
   <div className="answergrid"><p><b>{money(r.monthly)}</b><small>gross income / month at {r.safeRatio}%</small></p><p><b>{money(r.threeAnnual)}</b><small>3× rent reference / year</small></p><p><b>{money(r.fortyAnnual)}</b><small>40× rent reference / year</small></p><p><b>{money(rent)}</b><small>rent / month</small></p></div>
   <div className="whatifBox"><span>FORMULA</span><b>{money(rent)} ÷ {r.safeRatio}% × 12 = {money(r.annual)}/year</b><small>This is a gross-income planning estimate before taxes and other expenses.</small></div>
  </div>
 </div>;
}
