'use client';
import {useMemo,useState} from 'react';
import {usaTax} from '../tax';
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
export default function TexasTaxCalculator(){
 const [salary,setSalary]=useState(85000); const [status,setStatus]=useState('single');
 const r=useMemo(()=>usaTax(salary,'TX',status),[salary,status]);
 const effective=salary>0?r.total/salary*100:0;
 return <div className="toolbox"><div className="fields"><label>Annual gross salary (USD)</label><input type="number" min="0" step="1000" value={salary} onChange={e=>setSalary(+e.target.value)}/><label>Filing status</label><select value={status} onChange={e=>setStatus(e.target.value)}><option value="single">Single</option><option value="joint">Married filing jointly</option><option value="head">Head of household</option></select><label>State</label><input value="Texas" disabled/></div><div className="answer"><span>Estimated 2026 take-home</span><strong>{fmt(r.net)}</strong><small>{fmt(r.net/12)} / month</small><div className="taxrows"><p>Federal income tax <b>{fmt(r.federal)}</b></p><p>Texas individual income tax <b>{fmt(r.regional)}</b></p><p>Social Security <b>{fmt(r.pension)}</b></p><p>Medicare <b>{fmt(r.ei)}</b></p><p>Total modeled deductions <b>{fmt(r.total)}</b></p><p>Modeled deduction rate <b>{effective.toFixed(1)}%</b></p></div><small>Planning estimate using 2026 federal brackets, standard deduction and employee FICA. Texas does not levy individual state income tax. Credits, pre-tax benefits, other income and special tax provisions can change actual results.</small></div></div>;
}
