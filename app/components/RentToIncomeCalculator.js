'use client';
import {useMemo,useState} from 'react';

const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(Math.max(0,Number(n)||0));

export default function RentToIncomeCalculator(){
 const [rent,setRent]=useState(2000);
 const [monthlyGross,setMonthlyGross]=useState(6500);
 const r=useMemo(()=>{
  const safeRent=Math.max(0,Number(rent)||0);
  const gross=Math.max(0,Number(monthlyGross)||0);
  const ratio=gross>0?safeRent/gross*100:0;
  const annualGross=gross*12;
  const annualRent=safeRent*12;
  const target30=gross*0.30;
  const diff=safeRent-target30;
  return {safeRent,gross,ratio,annualGross,annualRent,target30,diff};
 },[rent,monthlyGross]);
 const note=r.gross<=0?'Enter monthly gross income above $0 to calculate the ratio.':r.ratio<=30?'At or below a 30% gross-income reference.':r.ratio<=40?'Above 30% of gross income. Review the rest of your budget before deciding what is comfortable.':'A large share of gross income is going to rent. Check take-home pay, debt, living costs and savings before making a housing decision.';
 return <div className="rentTool">
  <div className="fields">
   <label>Monthly rent</label>
   <input aria-label="Monthly rent" type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/>
   <label>Monthly gross income</label>
   <input aria-label="Monthly gross income" type="number" min="0" step="100" value={monthlyGross} onChange={e=>setMonthlyGross(e.target.value)}/>
   <small>Use gross income before income taxes and payroll deductions. This ratio is a planning reference, not a rental-approval rule.</small>
   <div className="whatifBox"><span>FORMULA</span><b>Monthly rent ÷ monthly gross income × 100</b><small>Example: $2,000 ÷ $6,500 × 100 = 30.8%.</small></div>
  </div>
  <div className="answer" aria-live="polite">
   <span>Your rent-to-income ratio</span>
   <strong>{r.gross>0?r.ratio.toFixed(1):'—'}<small>{r.gross>0?'% of gross income':''}</small></strong>
   <div className="answergrid">
    <p><b>{money(r.safeRent)}</b><small>monthly rent</small></p>
    <p><b>{money(r.gross)}</b><small>monthly gross income</small></p>
    <p><b>{money(r.annualRent)}</b><small>annual rent</small></p>
    <p><b>{money(r.annualGross)}</b><small>annual gross income</small></p>
   </div>
   <div className="whatifBox"><span>30% REFERENCE</span><b>{money(r.target30)} rent/month</b><small>{note}{r.gross>0&&Math.abs(r.diff)>=1?` Your entered rent is ${money(Math.abs(r.diff))} ${r.diff>0?'above':'below'} that reference.`:''}</small></div>
  </div>
 </div>
}
