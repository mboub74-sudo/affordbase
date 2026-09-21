'use client';
import {useMemo,useState} from 'react';
const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));
const pct=n=>`${Math.max(0,n).toFixed(1)}%`;
export default function RentAffordabilityCalculator(){
 const [takeHome,setTakeHome]=useState(5200),[debt,setDebt]=useState(350),[living,setLiving]=useState(1450),[savings,setSavings]=useState(700),[rent,setRent]=useState(1800);
 const r=useMemo(()=>{
   const cashCeiling=Math.max(0,takeHome-debt-living-savings);
   const guideline=Math.max(0,takeHome*.30);
   const suggested=Math.min(cashCeiling,guideline);
   const left=takeHome-rent-debt-living-savings;
   const housing=takeHome?rent/takeHome*100:0;
   const savingsRate=takeHome?savings/takeHome*100:0;
   return {cashCeiling,guideline,suggested,left,housing,savingsRate,lowerRent:Math.max(0,rent-300),lowerLeft:left+Math.min(300,rent)};
 },[takeHome,debt,living,savings,rent]);
 return <div className="rentTool">
   <div className="fields">
    <label>Monthly take-home pay</label><input aria-label="Monthly take-home pay" type="number" min="0" value={takeHome} onChange={e=>setTakeHome(+e.target.value)}/>
    <div className="twocol"><div><label>Monthly debt payments</label><input aria-label="Monthly debt payments" type="number" min="0" value={debt} onChange={e=>setDebt(+e.target.value)}/></div><div><label>Essential living costs</label><input aria-label="Essential living costs" type="number" min="0" value={living} onChange={e=>setLiving(+e.target.value)}/></div></div>
    <div className="twocol"><div><label>Monthly savings target</label><input aria-label="Monthly savings target" type="number" min="0" value={savings} onChange={e=>setSavings(+e.target.value)}/></div><div><label>Rent you are considering</label><input aria-label="Rent you are considering" type="number" min="0" value={rent} onChange={e=>setRent(+e.target.value)}/></div></div>
    <small>Use your actual take-home pay when possible. This keeps the rent estimate focused on money you can really budget each month.</small>
   </div>
   <div className="answer">
    <span>Planning rent target</span><strong>{money(r.suggested)}<small>/mo</small></strong>
    <div className="answergrid"><p><b>{money(r.guideline)}</b><small>30% take-home reference</small></p><p><b>{money(r.cashCeiling)}</b><small>cash-flow ceiling after your goals</small></p><p><b>{pct(r.housing)}</b><small>your entered rent / take-home</small></p><p className={r.left<0?'negative':''}><b>{r.left<0?'-':''}{money(Math.abs(r.left))}</b><small>{r.left<0?'monthly shortfall':'money left after rent + inputs'}</small></p></div>
    <div className="whatifBox"><span>WHAT IF RENT WERE $300 LOWER?</span><b>{money(r.lowerRent)} rent → {r.lowerLeft<0?'-':''}{money(Math.abs(r.lowerLeft))} left/month</b><small>That changes annual cash flow by up to {money(Math.min(300,rent)*12)}.</small></div>
   </div>
 </div>
}
