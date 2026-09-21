import Link from 'next/link';
import {notFound} from 'next/navigation';
import Calculator from '../components/Calculator';
import TaxCalculator from '../components/TaxCalculator';
import {pages,getPage} from '../data';
import {SITE_URL} from '../site';

export function generateStaticParams(){return pages.map(p=>({slug:p.slug}))}

export async function generateMetadata({params}){
 const {slug}=await params,p=getPage(slug);if(!p)return {};
 const title=`${p.title} | AffordBase`,url=`${SITE_URL}/${p.slug}/`;
 return {title,description:p.description,alternates:{canonical:`/${p.slug}/`},openGraph:{title,description:p.description,url,type:'website',siteName:'AffordBase'}};
}

const crossLinks={
 rent:[['/take-home-pay-calculator/','Estimate Take-Home Pay'],['/salary-needed-calculator/','Salary Needed Calculator'],['/mortgage-affordability-calculator/','Mortgage Affordability'],['/dashboard/','Monthly Budget Dashboard']],
 reverse:[['/rent-affordability-calculator/','Rent Affordability Calculator'],['/take-home-pay-calculator/','Take-Home Pay Calculator'],['/salary-needed-calculator/','Salary Needed Calculator'],['/dashboard/','Monthly Budget Dashboard']],
 salary:[['/take-home-pay-calculator/','Take-Home Pay Calculator'],['/rent-affordability-calculator/','Rent Affordability'],['/car-affordability-calculator/','Car Affordability'],['/dashboard/','Monthly Budget Dashboard']],
 tax:[['/rent-affordability-calculator/','Rent Affordability'],['/car-affordability-calculator/','Car Affordability'],['/mortgage-affordability-calculator/','Mortgage Affordability'],['/goal-planner/','Goal Planner']],
 car:[['/take-home-pay-calculator/','Take-Home Pay Calculator'],['/rent-affordability-calculator/','Rent Affordability'],['/dashboard/','Monthly Budget Dashboard'],['/goal-planner/','Goal Planner']],
 mortgage:[['/down-payment-calculator/','Down Payment Calculator'],['/take-home-pay-calculator/','Take-Home Pay Calculator'],['/rent-affordability-calculator/','Rent Affordability'],['/goal-planner/','Goal Planner']],
 city:[['/compare-cities/','Compare Cities'],['/take-home-pay-calculator/','Take-Home Pay Calculator'],['/rent-affordability-calculator/','Rent Affordability'],['/salary-needed-calculator/','Salary Needed Calculator']]
};

export default async function Page({params}){
 const {slug}=await params,p=getPage(slug);if(!p)notFound();
 const type=p.type==='city'?'rent':p.type;
 const region=slug.includes('ontario')?'ON':slug.includes('quebec')?'QC':slug.includes('california')?'CA':slug.includes('texas')?'TX':undefined;
 const country=slug.includes('california')||slug.includes('texas')?'US':'CA';
 const url=`${SITE_URL}/${p.slug}/`;
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"WebApplication",name:p.title,url,description:p.description,applicationCategory:"FinanceApplication",operatingSystem:"Web",offers:{"@type":"Offer",price:"0",priceCurrency:country==='US'?'USD':'CAD'}},
  {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"AffordBase",item:SITE_URL},{"@type":"ListItem",position:2,name:p.title,item:url}]}
 ]};
 const links=crossLinks[p.type]||crossLinks[type]||[];
 return <>
  <header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/hourly-to-salary-calculator/">Salary</Link><Link href="/car-affordability-calculator/">Car</Link></nav></header>
  <main className="landing">
   <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
   <div className="crumb"><Link href="/">Home</Link> / {p.title}</div>
   <section className="pagehero"><div className="eyebrow">FREE AFFORDABILITY TOOL</div><h1>{p.h1}</h1><p>{p.description} Change the numbers below to see the estimate instantly.</p></section>
   {p.type==='tax'?<TaxCalculator initialCountry={country} initialRegion={region}/>:<Calculator type={type}/>}
   <section className="content">
    <h2>How this calculator works</h2><p>AffordBase turns your inputs into a planning estimate. It is designed to help you compare scenarios quickly, not to replace an official tax return, lender decision, lease qualification, or professional financial advice.</p>
    <h2>Continue your affordability plan</h2><div className="linkgrid">{links.map(([href,label])=><Link key={href} href={href}>{label} →</Link>)}</div>
    <h2>Explore related calculators</h2><div className="linkgrid">{pages.filter(x=>x.type===p.type&&x.slug!==p.slug).slice(0,6).map(x=><Link key={x.slug} href={`/${x.slug}/`}>{x.title} →</Link>)}</div>
   </section>
  </main>
  <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
 </>;
}