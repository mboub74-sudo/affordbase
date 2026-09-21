'use client';
import {useMemo,useState} from 'react';
import {canadaTax} from '../tax';

const money=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n||0);
function grossForNet(target){let lo=0,hi=Math.max(50000,target*2.2);while(canadaTax(hi,'BC').net<target&&hi<1000000)hi*=1.4;for(let i=0;i<55;i++){const mid=(lo+hi)/2;if(canadaTax(mid,'BC').net<target)lo=mid;else hi=mid;}return hi;}
export default function VancouverSalaryNeededCalculator(){
 const [rent,setRent]=useState(2900),[family,setFamily]=useState(1),[living,setLiving]=useState(1450),[debt,setDebt]=useState(250),[savings,setSavings]=useState(800);
 const r=useMemo(()=>{const monthlyNeed=Math.max(0,+rent)+Math.max(0,+living)+Math.max(0,+debt)+Math.max(0,+savings);const annualNet=monthlyNeed*12;const gross=grossForNet(annualNet);const tax=canadaTax(gross,'BC');return {monthlyNeed,annualNet,gross,tax};},[rent,living,debt,savings]);
 const setFamilyPreset=v=>{const n=+v;setFamily(n);setLiving(1450+(n-1)*600)};
 return <div className="calcCard"><div className="calcHead"><div><span className="eyebrow">VANCOUVER REVERSE SALARY</span><h2>What salary supports your Vancouver budget?</h2><p>Enter the rent you expect to pay and adjust every monthly cost. Family size changes only the editable living-cost planning baseline.</p></div></div><div className="calcGrid"><div className="fields">
 <label>Monthly rent (CAD)<input type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/><small>Editable planning preset. Replace it with the rent for the home you are considering.</small></label>
 <label>Family size<select value={family} onChange={e=>setFamilyPreset(e.target.value)}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select></label>
 <label>Living costs / month<input type="number" min="0" step="50" value={living} onChange={e=>setLiving(e.target.value)}/><small>Editable AffordBase planning assumption; not an official Vancouver cost figure.</small></label>
 <label>Debt payments / month<input type="number" min="0" step="50" value={debt} onChange={e=>setDebt(e.target.value)}/></label>
 <label>Desired savings / month<input type="number" min="0" step="50" value={savings} onChange={e=>setSavings(e.target.value)}/></label>
 </div><div className="results"><span className="eyebrow">ESTIMATED SALARY NEEDED</span><strong className="bigResult">{money(r.gross)}<small>/year gross</small></strong><div className="resultRows"><div><span>Required take-home</span><b>{money(r.monthlyNeed)}/mo</b></div><div><span>Annual take-home target</span><b>{money(r.annualNet)}</b></div><div><span>Modeled deductions</span><b>{money(r.tax.total)}/yr</b></div><div><span>Rent share of required net</span><b>{r.monthlyNeed?((+rent/r.monthlyNeed)*100).toFixed(1):'0.0'}%</b></div></div><p className="estimateNote">Reverse estimate uses AffordBase's British Columbia 2026 planning tax model. Actual payroll and tax can differ because credits, deductions, benefits and personal circumstances are not fully modeled.</p></div></div></div>
}
