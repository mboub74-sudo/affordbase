'use client';
import {useMemo,useState} from 'react';
import {canadaTax} from '../tax';

const money=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n||0);
function grossForNet(target){let lo=0,hi=Math.max(50000,target*2.4);while(canadaTax(hi,'QC').net<target&&hi<1000000)hi*=1.4;for(let i=0;i<55;i++){const mid=(lo+hi)/2;if(canadaTax(mid,'QC').net<target)lo=mid;else hi=mid;}return hi;}
export default function MontrealSalaryNeededCalculator(){
 const [rent,setRent]=useState(1955),[family,setFamily]=useState(1),[living,setLiving]=useState(1300),[debt,setDebt]=useState(250),[savings,setSavings]=useState(800);
 const r=useMemo(()=>{const monthlyNeed=Math.max(0,+rent)+Math.max(0,+living)+Math.max(0,+debt)+Math.max(0,+savings);const annualNet=monthlyNeed*12;const gross=grossForNet(annualNet);const tax=canadaTax(gross,'QC');return {monthlyNeed,annualNet,gross,tax};},[rent,living,debt,savings]);
 const setFamilyPreset=v=>{const n=+v;setFamily(n);setLiving(1300+(n-1)*550)};
 return <div className="calcCard"><div className="calcHead"><div><span className="eyebrow">MONTREAL REVERSE SALARY</span><h2>What salary supports your Montreal budget?</h2><p>Start with the rent you expect to pay, then adjust living costs, debt and savings. AffordBase works backward through its Quebec 2026 planning tax model.</p></div></div><div className="calcGrid"><div className="fields">
 <label>Monthly rent (CAD)<input type="number" min="0" step="25" value={rent} onChange={e=>setRent(e.target.value)}/><small>Preset uses the August 2026 Montreal apartment/condo asking-rent average reported by Rentals.ca/Urbanation. Replace it with your expected rent.</small></label>
 <label>Family size<select value={family} onChange={e=>setFamilyPreset(e.target.value)}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select></label>
 <label>Living costs / month<input type="number" min="0" step="50" value={living} onChange={e=>setLiving(e.target.value)}/><small>Editable AffordBase planning assumption; not an official Montreal cost-of-living statistic.</small></label>
 <label>Debt payments / month<input type="number" min="0" step="50" value={debt} onChange={e=>setDebt(e.target.value)}/></label>
 <label>Desired savings / month<input type="number" min="0" step="50" value={savings} onChange={e=>setSavings(e.target.value)}/></label>
 </div><div className="results"><span className="eyebrow">ESTIMATED SALARY NEEDED</span><strong className="bigResult">{money(r.gross)}<small>/year gross</small></strong><div className="resultRows"><div><span>Required take-home</span><b>{money(r.monthlyNeed)}/mo</b></div><div><span>Annual take-home target</span><b>{money(r.annualNet)}</b></div><div><span>Modeled deductions</span><b>{money(r.tax.total)}/yr</b></div><div><span>Rent share of required net</span><b>{r.monthlyNeed?((+rent/r.monthlyNeed)*100).toFixed(1):'0.0'}%</b></div></div><p className="estimateNote">Reverse estimate uses AffordBase's Quebec 2026 planning model, including modeled federal and Quebec income tax, QPP, Quebec EI and QPIP. Actual payroll can differ.</p></div></div></div>
}
