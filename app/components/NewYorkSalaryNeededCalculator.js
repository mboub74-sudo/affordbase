'use client';
import {useMemo,useState} from 'react';

const money=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
const progressive=(income,brackets)=>{let tax=0,prev=0;for(const [cap,rate] of brackets){const slice=Math.max(0,Math.min(income,cap)-prev);tax+=slice*rate;if(income<=cap)break;prev=cap;}return tax};
const FED=[[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[640600,.35],[Infinity,.37]];
const NY=[[8500,.04],[11700,.045],[13900,.0525],[80650,.054],[215400,.059],[1077550,.0685],[5000000,.0965],[25000000,.103],[Infinity,.109]];
const NYC=[[12000,.03078],[25000,.03762],[50000,.03819],[Infinity,.03876]];
function nycTax(gross){gross=Math.max(0,+gross||0);const federal=progressive(Math.max(0,gross-16100),FED);const state=progressive(Math.max(0,gross-8000),NY);const city=progressive(Math.max(0,gross),NYC);const ss=Math.min(gross,184500)*.062;const medicare=gross*.0145+Math.max(0,gross-200000)*.009;const total=federal+state+city+ss+medicare;return {gross,federal,state,city,ss,medicare,total,net:Math.max(0,gross-total)}}
function grossForNet(target){let lo=0,hi=Math.max(60000,target*2.5);while(nycTax(hi).net<target&&hi<2000000)hi*=1.4;for(let i=0;i<58;i++){const mid=(lo+hi)/2;if(nycTax(mid).net<target)lo=mid;else hi=mid;}return hi;}
export default function NewYorkSalaryNeededCalculator(){
 const [rent,setRent]=useState(4200),[family,setFamily]=useState(1),[living,setLiving]=useState(2300),[debt,setDebt]=useState(300),[savings,setSavings]=useState(1000);
 const r=useMemo(()=>{const monthlyNeed=Math.max(0,+rent)+Math.max(0,+living)+Math.max(0,+debt)+Math.max(0,+savings);const annualNet=monthlyNeed*12;const gross=grossForNet(annualNet);return {monthlyNeed,annualNet,gross,tax:nycTax(gross)};},[rent,living,debt,savings]);
 const setFamilyPreset=v=>{const n=+v;setFamily(n);setLiving(2300+(n-1)*750)};
 return <div className="calcCard"><div className="calcHead"><div><span className="eyebrow">NEW YORK CITY REVERSE SALARY</span><h2>What salary supports your NYC budget?</h2><p>Enter the rent and monthly lifestyle you expect. AffordBase works backward through a simplified 2026 federal, New York State and New York City tax model.</p></div></div><div className="calcGrid"><div className="fields">
 <label>Monthly rent (USD)<input type="number" min="0" step="50" value={rent} onChange={e=>setRent(e.target.value)}/><small>Preset uses StreetEasy's August 2026 NYC median asking rent. Replace it with your expected rent.</small></label>
 <label>Family size<select value={family} onChange={e=>setFamilyPreset(e.target.value)}>{[1,2,3,4,5].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select></label>
 <label>Living costs / month<input type="number" min="0" step="50" value={living} onChange={e=>setLiving(e.target.value)}/><small>Editable AffordBase planning assumption; not an official NYC cost-of-living statistic.</small></label>
 <label>Debt payments / month<input type="number" min="0" step="50" value={debt} onChange={e=>setDebt(e.target.value)}/></label>
 <label>Desired savings / month<input type="number" min="0" step="50" value={savings} onChange={e=>setSavings(e.target.value)}/></label>
 </div><div className="results"><span className="eyebrow">ESTIMATED SALARY NEEDED</span><strong className="bigResult">{money(r.gross)}<small>/year gross</small></strong><div className="resultRows"><div><span>Required take-home</span><b>{money(r.monthlyNeed)}/mo</b></div><div><span>Annual take-home target</span><b>{money(r.annualNet)}</b></div><div><span>Modeled deductions</span><b>{money(r.tax.total)}/yr</b></div><div><span>NYC local tax modeled</span><b>{money(r.tax.city)}/yr</b></div><div><span>Rent share of required net</span><b>{r.monthlyNeed?((+rent/r.monthlyNeed)*100).toFixed(1):'0.0'}%</b></div></div><p className="estimateNote">Planning estimate for a single filer. It models 2026 federal income tax, simplified New York State and NYC resident income tax, Social Security and Medicare. Credits, itemized deductions and individual circumstances can change actual take-home pay.</p></div></div></div>
}
