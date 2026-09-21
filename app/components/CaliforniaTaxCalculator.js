'use client';
import {useMemo,useState} from 'react';
import {californiaTax} from '../tax';
const fmt=n=>new Intl.NumberFormat('en-US',{style:'currency',currency:'USD',maximumFractionDigits:0}).format(n||0);
export default function CaliforniaTaxCalculator(){
 const [salary,setSalary]=useState(100000); const [status,setStatus]=useState('single');
 const r=useMemo(()=>californiaTax(salary,status),[salary,status]);
 const effective=salary>0?r.total/salary*100:0;
 return <div className="toolbox"><div className="fields"><label>Annual gross salary (USD)</label><input type="number" min="0" step="1000" value={salary} onChange={e=>setSalary(+e.target.value)}/><label>Filing status</label><select value={status} onChange={e=>setStatus(e.target.value)}><option value="single">Single</option><option value="joint">Married filing jointly</option><option value="head">Head of household</option></select><label>State</label><input value="California" disabled/></div><div className="answer"><span>Estimated 2026 take-home</span><strong>{fmt(r.net)}</strong><small>{fmt(r.net/12)} / month</small><div className="taxrows"><p>Federal income tax <b>{fmt(r.federal)}</b></p><p>California income tax estimate <b>{fmt(r.state)}</b></p><p>Social Security <b>{fmt(r.socialSecurity)}</b></p><p>Medicare <b>{fmt(r.medicare)}</b></p><p>California SDI <b>{fmt(r.sdi)}</b></p><p>Total modeled deductions <b>{fmt(r.total)}</b></p><p>Modeled deduction rate <b>{effective.toFixed(1)}%</b></p></div><small>{r.note}</small></div></div>;
}
