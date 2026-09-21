import Link from 'next/link';
import {notFound} from 'next/navigation';
import SalaryNeeded from '../../components/SalaryNeeded';
import {CITY_DATA,cityMonthlyCost} from '../../cityData';
import {CITY_SLUGS,citySlug} from '../../citySlugs';
import {SITE_URL} from '../../site';

const cityDescriptions={
 Toronto:'Estimate the salary needed to live in Toronto using rent, everyday costs, take-home pay and savings goals. Adjust the budget to match your lifestyle.',
 Vancouver:'Estimate the salary needed to live in Vancouver using rent, monthly living costs, take-home pay and savings goals with adjustable budget inputs.',
 Montreal:'Estimate the salary needed to live in Montreal from rent and everyday costs, then adjust savings and household spending to match your budget.',
 Calgary:'Estimate the salary needed to live in Calgary using rent, monthly expenses, take-home pay and savings goals with an adjustable city budget.',
 Ottawa:'Estimate the salary needed to live in Ottawa using rent and everyday monthly costs, then adjust the budget to match your household and savings goals.',
 'New York City':'Estimate the salary needed to live in New York City using rent, monthly expenses, take-home pay and savings goals with adjustable inputs.',
 Miami:'Estimate the salary needed to live in Miami using rent, everyday monthly expenses, take-home pay and savings goals with an adjustable budget.',
 'Los Angeles':'Estimate the salary needed to live in Los Angeles using rent, monthly living costs, take-home pay and savings goals with adjustable inputs.',
 Chicago:'Estimate the salary needed to live in Chicago using rent, everyday costs, take-home pay and savings goals with an adjustable monthly budget.'
};

export function generateStaticParams(){return Object.keys(CITY_SLUGS).map(city=>({city}))}

export async function generateMetadata({params}){
 const {city}=await params,n=CITY_SLUGS[city];if(!n)return{};
 const title=`Salary Needed to Live in ${n} (2026)`;
 const description=cityDescriptions[n];
 const url=`${SITE_URL}/cities/${city}/`;
 return {title,description,alternates:{canonical:`/cities/${city}/`},openGraph:{title,description,url,type:'website',siteName:'AffordBase'}};
}

export default async function Page({params}){
 const {city}=await params,n=CITY_SLUGS[city];if(!n)notFound();
 const c=CITY_DATA[n],fmt=x=>new Intl.NumberFormat('en-US',{style:'currency',currency:c.currency,maximumFractionDigits:0}).format(x);
 const url=`${SITE_URL}/cities/${city}/`;
 const schema={"@context":"https://schema.org","@graph":[
  {"@type":"WebApplication",name:`${n} Salary Needed Calculator`,url,applicationCategory:"FinanceApplication",operatingSystem:"Web",description:cityDescriptions[n],offers:{"@type":"Offer",price:"0",priceCurrency:c.currency}},
  {"@type":"BreadcrumbList",itemListElement:[{"@type":"ListItem",position:1,name:"AffordBase",item:SITE_URL},{"@type":"ListItem",position:2,name:"Cities",item:`${SITE_URL}/compare-cities/`},{"@type":"ListItem",position:3,name:n,item:url}]}
 ]};
 return <main className="landing city-page">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/>
  <div className="crumb"><Link href="/">Home</Link> / <Link href="/compare-cities/">Cities</Link> / {n}</div>
  <section className="pagehero"><span className="pill">2026 CITY BUDGET</span><h1>Salary Needed to Live in {n}</h1><p>{cityDescriptions[n]}</p></section>
  <div className={`city-visual city-${city}`} role="img" aria-label={`${n} city view for cost-of-living and salary planning`}><span>Plan your budget for life in {n}.</span></div>
  <SalaryNeeded cityName={n}/>
  <section className="content">
   <h2>Cost-of-living snapshot</h2><p>Current model: rent {fmt(c.rent)}, groceries {fmt(c.groceries)}, transit {fmt(c.transit)}, utilities {fmt(c.utilities)}, phone/internet {fmt(c.phoneInternet)} and miscellaneous {fmt(c.misc)} per month. Baseline total: <b>{fmt(cityMonthlyCost(c))}</b>.</p>
   <p><b>Rent source:</b> {c.rentSource}. Other categories are planning baselines and should be adjusted for your household.</p>
   <h2>Build a fuller {n} budget</h2><div className="linkgrid"><Link href="/take-home-pay-calculator/">Estimate Take-Home Pay →</Link><Link href="/rent-affordability-calculator/">Check Rent Affordability →</Link><Link href="/salary-needed-calculator/">Salary Needed Calculator →</Link><Link href="/dashboard/">Monthly Budget Dashboard →</Link></div>
   <h2>Compare {n}</h2><div className="linkgrid">{Object.values(CITY_SLUGS).filter(x=>x!==n).slice(0,5).map(x=><Link key={x} href={`/compare/${citySlug(n)}-vs-${citySlug(x)}/`}>{n} vs {x}</Link>)}</div>
   <h2>FAQ</h2><h3>Is this an exact salary requirement?</h3><p>No. It is a planning estimate. Taxes, housing, benefits, debt and personal spending can materially change the amount you need.</p><h3>Can I change the rent?</h3><p>Yes. Use the calculator above to replace the city baseline with the rent you expect to pay.</p>
  </section>
 </main>
}