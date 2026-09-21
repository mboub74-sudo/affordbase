'use client';
import {useMemo,useState} from 'react';
import {CITY_DATA} from '../cityData';
import {canadaTax,usaTax} from '../tax';

const safe=n=>Math.max(0,Number(n)||0);
const familyFactor=n=>n<=1?1:n===2?1.55:n===3?1.9:n===4?2.2:2.2+(n-4)*.25;
const fmt=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);

function calc(city,salary,family,debt,car){
 const d=CITY_DATA[city];
 const tax=d.country==='CA'?canadaTax(safe(salary),d.region):usaTax(safe(salary),d.region,'single');
 const takeHome=tax.net/12;
 const living=(d.groceries+d.transit+d.utilities+d.phoneInternet+d.misc)*familyFactor(Math.max(1,safe(family)));
 const total=d.rent+living+safe(debt)+safe(car);
 const left=takeHome-total;
 return {d,tax,takeHome,living,total,left,savingsRate:takeHome>0?left/takeHome*100:0};
}

export default function CityCompare(){
 const [country,setCountry]=useState('CA');
 const [salary,setSalary]=useState(85000);
 const [family,setFamily]=useState(1);
 const [debt,setDebt]=useState(250);
 const [car,setCar]=useState(450);
 const [selected,setSelected]=useState(['Toronto','Calgary','Montreal']);
 const names=Object.keys(CITY_DATA).filter(n=>CITY_DATA[n].country===country);
 const results=useMemo(()=>selected.map(city=>({city,...calc(city,salary,family,debt,car)})),[selected,salary,family,debt,car]);
 const best=Math.max(...results.map(r=>r.left));
 const currency=country==='CA'?'CAD':'USD';
 function setCountrySafe(next){
   setCountry(next);
   setSelected(next==='CA'?['Toronto','Calgary','Montreal']:['New York City','Miami','Chicago']);
 }
 function setCity(index,name){setSelected(prev=>prev.map((v,i)=>i===index?name:v));}
 function preset(cities){setSelected(cities);}
 return <div className="comparepro">
  <section className="compareprocontrols">
   <div className="compareprotop"><div><div className="eyebrow">CITY COMPARE PRO</div><h2>One salary. Three cities.</h2><p>Compare the same household budget across three cities using each city's tax and living-cost assumptions.</p></div><div className="countrytoggle"><button className={country==='CA'?'active':''} onClick={()=>setCountrySafe('CA')}>🇨🇦 Canada</button><button className={country==='US'?'active':''} onClick={()=>setCountrySafe('US')}>🇺🇸 USA</button></div></div>
   <div className="compareinputs"><div><label>Annual gross salary</label><input type="number" min="0" value={salary} onChange={e=>setSalary(safe(e.target.value))}/></div><div><label>Family size</label><select value={family} onChange={e=>setFamily(+e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select></div><div><label>Monthly debt</label><input type="number" min="0" value={debt} onChange={e=>setDebt(safe(e.target.value))}/></div><div><label>Car payment</label><input type="number" min="0" value={car} onChange={e=>setCar(safe(e.target.value))}/></div></div>
   <div className="cityselectors">{selected.map((city,i)=><div key={i}><label>City {i+1}</label><select value={city} onChange={e=>setCity(i,e.target.value)}>{names.map(n=><option key={n} value={n}>{n}</option>)}</select></div>)}</div>
   <div className="comparepresets">{country==='CA'?<><button onClick={()=>preset(['Toronto','Calgary','Montreal'])}>Toronto · Calgary · Montreal</button><button onClick={()=>preset(['Toronto','Vancouver','Calgary'])}>Toronto · Vancouver · Calgary</button></>:<><button onClick={()=>preset(['New York City','Miami','Chicago'])}>NYC · Miami · Chicago</button><button onClick={()=>preset(['New York City','Los Angeles','Miami'])}>NYC · Los Angeles · Miami</button></>}</div>
  </section>
  <section className="compareprogrid">{results.map(r=><CityCard key={r.city+selected.indexOf(r.city)} r={r} salary={salary} debt={debt} car={car} family={family} best={r.left===best}/>)}</section>
  <section className="comparechart"><div className="eyebrow">MONEY LEFT · MONTHLY</div><h3>Side-by-side cash flow</h3>{results.map(r=>{const max=Math.max(1,...results.map(x=>Math.max(0,x.left)));const width=Math.max(2,Math.max(0,r.left)/max*100);return <div className="comparebar" key={r.city}><div><b>{r.city}</b><strong>{fmt(r.left,currency)}</strong></div><div className="comparetrack"><i style={{width:`${width}%`}}/></div></div>})}</section>
  <section className="comparedelta"><h3>Difference between cities</h3><div>{results.map(r=><article key={r.city}><span>{r.city}</span><strong>{r.left===best?'Baseline highest money left':`${fmt(r.left-best,currency)} / month vs highest`}</strong><small>{r.left===best?'Use the detailed costs above to understand the result.':`${fmt((r.left-best)*12,currency)} / year`}</small></article>)}</div></section>
  <p className="datasource">Comparisons stay within one country so CAD and USD are never mixed. Rent uses the dataset noted on each city card. Other living-cost categories are AffordBase planning baselines and scale with household size. Tax results are planning estimates.</p>
 </div>;
}
function CityCard({r,salary,debt,car,family,best}){const {d}=r;return <article className={`citycard procard ${best?'bestcard':''}`}><div className="cityhead"><div><span>{d.country==='CA'?'🇨🇦':'🇺🇸'} CITY {best?'· HIGHEST MONEY LEFT':''}</span><h3>{r.city}</h3></div><b>{d.currency}</b></div><div className="cityhero"><span>Money left after modeled costs</span><strong className={r.left<0?'negative':''}>{fmt(r.left,d.currency)}</strong><small>/ month</small></div><div className="costrows"><p><span>Gross salary</span><b>{fmt(salary,d.currency)}/yr</b></p><p><span>Estimated take-home</span><b>{fmt(r.takeHome,d.currency)}</b></p><p><span>Market rent</span><b>{fmt(d.rent,d.currency)}</b></p><p><span>Living costs · household {family}</span><b>{fmt(r.living,d.currency)}</b></p><p><span>Car payment</span><b>{fmt(car,d.currency)}</b></p><p><span>Debt payments</span><b>{fmt(debt,d.currency)}</b></p><p className="total"><span>Total monthly expenses</span><b>{fmt(r.total,d.currency)}</b></p><p><span>Money left</span><b>{fmt(r.left,d.currency)}</b></p><p><span>Money-left rate</span><b>{r.savingsRate.toFixed(1)}%</b></p></div><small className="source">Rent: {d.rentSource}. Updated {d.updated}.</small></article>}
