'use client';
import {useMemo,useState} from 'react';
import {canadaTax} from '../tax';
const fmt=n=>new Intl.NumberFormat('en-CA',{style:'currency',currency:'CAD',maximumFractionDigits:0}).format(n||0);
export default function QuebecTaxCalculator(){
 const [salary,setSalary]=useState(80000);
 const r=useMemo(()=>canadaTax(salary,'QC'),[salary]);
 const monthly=r.net/12, effective=salary>0?(r.total/salary)*100:0;
 return <div className="toolbox"><div className="fields"><label>Annual gross salary (CAD)</label><input type="number" min="0" step="1000" value={salary} onChange={e=>setSalary(+e.target.value)}/><label>Province</label><input value="Quebec" disabled/></div><div className="answer"><span>Estimated 2026 take-home</span><strong>{fmt(r.net)}</strong><small>{fmt(monthly)} / month</small><div className="taxrows"><p>Federal tax estimate <b>{fmt(r.federal)}</b></p><p>Quebec tax estimate <b>{fmt(r.regional)}</b></p><p>QPP <b>{fmt(r.pension)}</b></p><p>EI (Quebec rate) <b>{fmt(r.ei)}</b></p><p>QPIP <b>{fmt(r.qpip)}</b></p><p>Total modeled deductions <b>{fmt(r.total)}</b></p><p>Modeled deduction rate <b>{effective.toFixed(1)}%</b></p></div><small>{r.note}</small></div></div>
}
