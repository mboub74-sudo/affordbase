'use client';
import {useMemo,useState} from 'react';
import {canadaTax} from '../tax';
import {CA_PROVINCES} from '../taxData';
const fmt=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n||0);
export default function CanadaTaxCalculator(){
 const [salary,setSalary]=useState(75000),[province,setProvince]=useState('ON');
 const r=useMemo(()=>canadaTax(salary,province),[salary,province]);
 return <div className="toolbox"><div className="fields"><label>Annual gross salary (CAD)</label><input type="number" min="0" step="1000" value={salary} onChange={e=>setSalary(+e.target.value)}/><label>Province / territory</label><select value={province} onChange={e=>setProvince(e.target.value)}>{Object.entries(CA_PROVINCES).map(([k,v])=><option key={k} value={k}>{v.name}</option>)}</select></div><div className="answer"><span>Estimated 2026 take-home</span><strong>{fmt(r.net)}</strong><small>{fmt(r.net/12)} / month</small><div className="taxrows"><p>Federal tax <b>{fmt(r.federal)}</b></p><p>Provincial / territorial tax <b>{fmt(r.regional)}</b></p><p>{province==='QC'?'QPP':'CPP'} <b>{fmt(r.pension)}</b></p><p>EI{province==='QC'?' + QPIP':''} <b>{fmt(r.ei+r.qpip)}</b></p>{r.health>0&&<p>Ontario Health Premium <b>{fmt(r.health)}</b></p>}<p>Total estimated deductions <b>{fmt(r.total)}</b></p></div><small>{r.note}</small></div></div>
}
