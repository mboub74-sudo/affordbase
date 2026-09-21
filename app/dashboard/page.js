'use client';
import {useMemo,useState} from 'react';
import {canadaTax,usaTax} from '../tax';
import {CITY_DATA} from '../cityData';

const money=(n,c)=>new Intl.NumberFormat('en-US',{style:'currency',currency:c,maximumFractionDigits:0}).format(Number.isFinite(n)?n:0);
const familyFactor=n=>n<=1?1:n===2?1.55:n===3?1.9:n===4?2.2:2.2+(n-4)*.25;
const safe=n=>Math.max(0,Number(n)||0);
function calculate({city,salary,family,rent,debt,car}){
 const data=CITY_DATA[city];
 const tax=data.country==='CA'?canadaTax(safe(salary),data.region):usaTax(safe(salary),data.region,'single');
 const net=tax.net/12;
 const living=(data.groceries+data.transit+data.utilities+data.phoneInternet+data.misc)*familyFactor(safe(family)||1);
 const total=safe(rent)+safe(debt)+safe(car)+living;
 const left=net-total;
 const pct=v=>net>0?v/net*100:0;
 return {data,tax,net,living,total,left,savingsRate:net>0?left/net*100:0,housingPct:pct(safe(rent)),carPct:pct(safe(car)),debtPct:pct(safe(debt)),livingPct:pct(living),leftPct:pct(Math.max(0,left))};
}

export default function Dashboard(){
 const cities=Object.entries(CITY_DATA);
 const [city,setCity]=useState('Toronto'); const [salary,setSalary]=useState(85000); const [family,setFamily]=useState(1); const [rent,setRent]=useState(CITY_DATA.Toronto.rent); const [debt,setDebt]=useState(250); const [car,setCar]=useState(450);
 const [sCity,setSCity]=useState('Toronto'); const [sSalary,setSSalary]=useState(85000); const [sRent,setSRent]=useState(CITY_DATA.Toronto.rent); const [sDebt,setSDebt]=useState(250); const [sCar,setSCar]=useState(450);
 const current=useMemo(()=>calculate({city,salary,family,rent,debt,car}),[city,salary,family,rent,debt,car]);
 const scenario=useMemo(()=>calculate({city:sCity,salary:sSalary,family,rent:sRent,debt:sDebt,car:sCar}),[sCity,sSalary,family,sRent,sDebt,sCar]);
 const currency=current.data.currency; const sCurrency=scenario.data.currency;
 function changeCity(name){setCity(name);setRent(CITY_DATA[name].rent);setSCity(name);setSRent(CITY_DATA[name].rent)}
 function changeScenarioCity(name){setSCity(name);setSRent(CITY_DATA[name].rent)}
 function resetScenario(){setSCity(city);setSSalary(salary);setSRent(rent);setSDebt(debt);setSCar(car)}
 const monthlyDelta=scenario.left-current.left; const annualDelta=monthlyDelta*12;
 return <><header><a className="brand" href="/">AffordBase<span>.</span></a><nav><a href="/dashboard/">Dashboard</a><a href="/rent-affordability-calculator/">Rent</a><a href="/take-home-pay-calculator/">Salary</a><a href="/compare-cities/">Compare Cities</a><a href="/mortgage-affordability-calculator/">Home</a></nav><a className="mini" href="/">Home</a></header>
 <main className="dashpage"><section className="dashhero"><div className="pill">AFFORDLY V6 · PRO DASHBOARD + WHAT-IF</div><h1>Can I afford <em>my life?</em></h1><p>Build your current budget, then test a new salary, lower rent or a different city and see the monthly impact instantly.</p></section>
 <section className="dashgrid"><div className="dashform"><div className="eyebrow">YOUR SITUATION</div><h2>Build your monthly budget</h2>
 <label>City</label><select value={city} onChange={e=>changeCity(e.target.value)}>{cities.map(([name,c])=><option key={name} value={name}>{c.country==='CA'?'🇨🇦':'🇺🇸'} {name}</option>)}</select>
 <label>Annual gross salary</label><div className="input"><span>$</span><input type="number" min="0" value={salary} onChange={e=>setSalary(safe(e.target.value))}/></div>
 <label>Family size</label><select value={family} onChange={e=>setFamily(+e.target.value)}>{[1,2,3,4,5,6].map(n=><option key={n} value={n}>{n} {n===1?'person':'people'}</option>)}</select>
 <div className="dashdivider">MONTHLY COSTS</div><label>Rent / housing</label><div className="input"><span>$</span><input type="number" min="0" value={rent} onChange={e=>setRent(safe(e.target.value))}/></div><button className="textbtn" onClick={()=>setRent(current.data.rent)}>Use city rent baseline: {money(current.data.rent,currency)}</button>
 <div className="twocol"><div><label>Debt payments</label><div className="input"><span>$</span><input type="number" min="0" value={debt} onChange={e=>setDebt(safe(e.target.value))}/></div></div><div><label>Car payment</label><div className="input"><span>$</span><input type="number" min="0" value={car} onChange={e=>setCar(safe(e.target.value))}/></div></div></div>
 <small>Living costs use AffordBase city planning baselines and scale with household size. Tax results are planning estimates, not tax-filing advice.</small></div>
 <div className="dashresults"><div className="eyebrow">YOUR MONTHLY BUDGET</div><h2>{city} snapshot</h2><div className="metricgrid"><Metric t="Take-home" v={money(current.net,currency)} s="estimated / month"/><Metric t="Total expenses" v={money(current.total,currency)} s="monthly outflow"/><Metric t="Money left" v={money(current.left,currency)} s={current.left>=0?'after modeled costs':'monthly shortfall'} bad={current.left<0}/><Metric t="Savings rate" v={`${current.savingsRate.toFixed(1)}%`} s="money left ÷ take-home" bad={current.savingsRate<0}/></div>
 <div className="budgetcard"><h3>Affordability breakdown</h3><Bar label="Housing" value={rent} pct={current.housingPct} currency={currency}/><Bar label="Car" value={car} pct={current.carPct} currency={currency}/><Bar label="Debt" value={debt} pct={current.debtPct} currency={currency}/><Bar label="Living costs" value={current.living} pct={current.livingPct} currency={currency}/><Bar label="Money left" value={current.left} pct={current.leftPct} currency={currency} positive/></div>
 <div className="insights"><p><b>Housing:</b> {current.housingPct.toFixed(1)}% of estimated take-home pay.</p><p><b>Debt:</b> {current.debtPct.toFixed(1)}% of estimated take-home pay.</p><p><b>Living-cost baseline:</b> {money(current.living,currency)}/month for a household of {family}.</p></div></div></section>

 <section className="whatif"><div className="whatifhead"><div><div className="eyebrow">WHAT-IF SIMULATOR</div><h2>What if you changed one thing?</h2><p>Test a different salary, rent, debt, car payment or city. Your current budget stays untouched.</p></div><button className="resetbtn" onClick={resetScenario}>Reset scenario</button></div>
 <div className="quickscenarios"><button onClick={()=>setSRent(Math.max(0,rent-300))}>↓ Lower rent by $300</button><button onClick={()=>setSSalary(salary+15000)}>↑ Increase salary by $15,000</button><button onClick={()=>{const target=city==='Toronto'?'Calgary':city==='New York City'?'Miami':current.data.country==='CA'?'Calgary':'Miami';changeScenarioCity(target)}}>↗ Try a lower-rent city</button></div>
 <div className="scenarioform"><div><label>Scenario city</label><select value={sCity} onChange={e=>changeScenarioCity(e.target.value)}>{cities.map(([name,c])=><option key={name} value={name}>{c.country==='CA'?'🇨🇦':'🇺🇸'} {name}</option>)}</select></div><div><label>Annual salary</label><input type="number" min="0" value={sSalary} onChange={e=>setSSalary(safe(e.target.value))}/></div><div><label>Monthly rent</label><input type="number" min="0" value={sRent} onChange={e=>setSRent(safe(e.target.value))}/></div><div><label>Debt</label><input type="number" min="0" value={sDebt} onChange={e=>setSDebt(safe(e.target.value))}/></div><div><label>Car</label><input type="number" min="0" value={sCar} onChange={e=>setSCar(safe(e.target.value))}/></div></div>
 <div className="scenarioCompare"><ScenarioCard title="Current" city={city} salary={salary} rent={rent} r={current} currency={currency}/><div className={`deltaCard ${monthlyDelta>=0?'gain':'loss'}`}><span>MONTHLY DIFFERENCE</span><strong>{monthlyDelta>=0?'+':''}{money(monthlyDelta,sCurrency)}</strong><small>{annualDelta>=0?'+':''}{money(annualDelta,sCurrency)} / year</small><p>{monthlyDelta>=0?'This scenario leaves more money after modeled costs.':'This scenario leaves less money after modeled costs.'}</p></div><ScenarioCard title="What if?" city={sCity} salary={sSalary} rent={sRent} r={scenario} currency={sCurrency}/></div>
 </section>
 <a className="citycta" href="/compare-cities/">Next: compare your salary across cities →</a></main></>;
}
function Metric({t,v,s,bad}){return <div className={`metric ${bad?'metricbad':''}`}><span>{t}</span><strong>{v}</strong><small>{s}</small></div>}
function Bar({label,value,pct,currency,positive}){const width=Math.min(100,Math.max(0,pct));return <div className="barrow"><div><span>{label}</span><b>{money(value,currency)} · {pct.toFixed(1)}%</b></div><div className="track"><i className={positive?'positive':''} style={{width:`${width}%`}}/></div></div>}
function ScenarioCard({title,city,salary,rent,r,currency}){return <div className="scenarioCard"><span>{title}</span><h3>{city}</h3><p><b>Salary</b><strong>{money(salary,currency)}</strong></p><p><b>Rent</b><strong>{money(rent,currency)}</strong></p><p><b>Take-home</b><strong>{money(r.net,currency)}/mo</strong></p><p><b>Total expenses</b><strong>{money(r.total,currency)}/mo</strong></p><div className="scenarioLeft"><small>Money left</small><strong>{money(r.left,currency)}/mo</strong></div></div>}
