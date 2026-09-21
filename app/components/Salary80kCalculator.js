'use client';
import {useMemo,useState} from 'react';
import {canadaTax,usaTax,californiaTax} from '../tax';
import {CA_PROVINCES,US_STATES} from '../taxData';
const fmt=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(n||0);
export default function Salary80kCalculator(){
 const [country,setCountry]=useState('US');
 const [region,setRegion]=useState('TX');
 const [status,setStatus]=useState('single');
 const salary=80000;
 const r=useMemo(()=>{
   if(country==='CA') return canadaTax(salary,region);
   if(region==='CA'){
     const x=californiaTax(salary,status);
     return {net:x.net,total:x.total,federal:x.federal,regional:x.state,pension:x.socialSecurity,ei:x.medicare,qpip:0,health:x.sdi,currency:'USD',note:x.note};
   }
   return usaTax(salary,region,status);
 },[country,region,status]);
 function swap(c){setCountry(c);setRegion(c==='CA'?'ON':'TX')}
 const monthly=r.net/12;
 return <div className="toolbox"><div className="fields"><label>Gross annual salary</label><input value="$80,000" disabled/><label>Country</label><div className="seg"><button className={country==='CA'?'on':''} onClick={()=>swap('CA')}>🇨🇦 Canada</button><button className={country==='US'?'on':''} onClick={()=>swap('US')}>🇺🇸 USA</button></div><label>{country==='CA'?'Province / territory':'State'}</label><select value={region} onChange={e=>setRegion(e.target.value)}>{Object.entries(country==='CA'?CA_PROVINCES:US_STATES).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}</select>{country==='US'&&<><label>Filing status</label><select value={status} onChange={e=>setStatus(e.target.value)}><option value="single">Single</option><option value="joint">Married filing jointly</option><option value="head">Head of household</option></select></>}</div><div className="answer"><span>Estimated take-home on $80K</span><strong>{fmt(r.net,r.currency)}</strong><small>{fmt(monthly,r.currency)} / month</small><div className="taxrows"><p>Federal income tax <b>{fmt(r.federal,r.currency)}</b></p><p>{country==='CA'?'Provincial tax':'State income tax'} <b>{fmt(r.regional,r.currency)}</b></p><p>{country==='CA'?(region==='QC'?'QPP':'CPP'):'Social Security'} <b>{fmt(r.pension,r.currency)}</b></p><p>{country==='CA'?'EI / QPIP':'Medicare'} <b>{fmt((r.ei||0)+(r.qpip||0),r.currency)}</b></p>{r.health>0&&<p>{country==='US'&&region==='CA'?'California SDI':'Ontario Health Premium'} <b>{fmt(r.health,r.currency)}</b></p>}<p>Total modeled deductions <b>{fmt(r.total,r.currency)}</b></p></div><small>{r.note}</small></div></div>;
}
