'use client';
import {useMemo,useState} from 'react';
import {usaTax} from '../tax';

const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
function grossForNet(target){let lo=0,hi=Math.max(60000,target*2.2);while(usaTax(hi,'FL','single').net<target&&hi<2000000)hi*=1.4;for(let i=0;i<58;i++){const mid=(lo+hi)/2;if(usaTax(mid,'FL','single').net<target)lo=mid;else hi=mid;}return hi;}
export default function MiamiSalaryNeededCalculator(){
 const [rent,setRent]=useState(2666),[family,setFamily]=useState(1),[living,setLiving]=useState(2100),[debt,setDebt]=useState(300),[savings,setSavings]=useState(1000);
 const r=useMemo(()=>{const monthlyNeed=Math.max(0,+rent)+Math.max(0,+living)+Math.max(0,+debt)+Math.max(0,+savings);const annualNet=monthlyNeed*12;const gross=grossForNet(annualNet);return {monthlyNeed,annualNet,gross,tax:usaTax(gross,'FL','single')};},[rent,living,debt,savings]);
 const setFamilyPreset=v=>{const n=+v;setFamily(n);setLiving(2100+(n-1)*700)};
 return <div className="calcCard"><div className="calcHead"><div><span className="eyebrow">MIAMI REVERSE SALARY</span><h2>What salary supports your Miami budget?</h2><p>Enter your expected rent and monthly lifestyle. AffordBase works backward through a simplified 2026 federal and FICA tax model. Florida has no personal state income tax.</p></div></div><div className="calcGrid"><div className="fields">
 <label>Monthly rent (USD)<input type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/><small>Preset uses Zillow's August 2026 typical Miami metro asking rent. Replace it with your expected rent.</small></label>
 <label>Family size<select value={family} onChange={e=>setFamilyPreset(e.target.value)}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select></label>
 <label>Living costs / month<input type="number" min="0" step="50" value={living} onChange={e=>setLiving(e.target.value)}/><small>Editable AffordBase planning assumption; not an official Miami cost-of-living statistic.</small></label>
 <label>Debt payments / month<input type="number" min="0" step="50" value={debt} onChange={e=>setDebt(e.target.value)}/></label>
 <label>Desired savings / month<input type="number" min="0" step="50" value={savings} onChange={e=>setSavings(e.target.value)}/></label>
 </div><div className="results"><span className="eyebrow">ESTIMATED SALARY NEEDED</span><strong className="bigResult">{money(r.gross)}<small>/year gross</small></strong><div className="resultRows"><div><span>Required take-home</span><b>{money(r.monthlyNeed)}/mo</b></div><div><span>Annual take-home target</span><b>{money(r.annualNet)}</b></div><div><span>Modeled deductions</span><b>{money(r.tax.total)}/yr</b></div><div><span>Florida personal income tax</span><b>$0</b></div><div><span>Rent share of required net</span><b>{r.monthlyNeed?((+rent/r.monthlyNeed)*100).toFixed(1):'0.0'}%</b></div></div><p className="estimateNote">Planning estimate for a single filer. It models 2026 federal income tax, Social Security and Medicare. Florida does not impose a personal income tax. Credits, deductions, benefits and individual circumstances can change actual take-home pay.</p></div></div></div>
}
