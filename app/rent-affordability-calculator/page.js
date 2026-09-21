import Link from 'next/link';
import RentAffordabilityCalculator from '../components/RentAffordabilityCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'Rent Affordability Calculator: How Much Rent Can I Afford? | AffordBase',
 description:'Estimate affordable monthly rent from take-home pay, debt, living costs and savings goals. Compare a 30% reference with your real monthly cash flow.',
 alternates:{canonical:'/rent-affordability-calculator/'},
 openGraph:{title:'Rent Affordability Calculator: How Much Rent Can I Afford?',description:'Estimate a rent target using take-home pay, debt, living costs and savings goals.',url:`${SITE_URL}/rent-affordability-calculator/`,type:'website'}
};
const faq=[
 ['How much rent can I afford?','A useful planning estimate starts with monthly take-home pay, then subtracts debt payments, essential living costs and the amount you want to save. AffordBase also shows a 30% of take-home reference so you can compare both views.'],
 ['Is the 30% rent rule based on gross or net income?','Rent rules vary. Some common housing guidelines use gross income, while this calculator deliberately shows 30% of take-home pay as a conservative budgeting reference and separately calculates your cash-flow ceiling.'],
 ['Should debt affect how much rent I can afford?','Yes. Required debt payments reduce the cash available for housing, savings and everyday expenses, so the calculator includes them directly.'],
 ['What if my rent is higher than the estimate?','The estimate is a planning guide, not a lease-qualification rule. Adjust savings, living costs or rent to compare scenarios and see the effect on money left each month.']
];
export default function RentPage(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase Rent Affordability Calculator',url:`${SITE_URL}/rent-affordability-calculator/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Rent Affordability Calculator',item:`${SITE_URL}/rent-affordability-calculator/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <><header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/hourly-to-salary-calculator/">Salary</Link><Link href="/car-affordability-calculator/">Car</Link></nav></header>
 <main className="landing"><div className="crumb"><Link href="/">Home</Link> / Rent Affordability Calculator</div>
 <section className="pagehero"><div className="eyebrow">FREE RENT PLANNING TOOL</div><h1>How Much Rent Can I Afford?</h1><p>Estimate a monthly rent target using the money that actually reaches your bank account, your debt, essential expenses and savings goal.</p></section><div className="page-visual visual-rent" role="img" aria-label="Modern apartment interior for rent affordability planning"><span>Plan a rent that leaves room for the rest of your life.</span></div>
 <section className="content quickanswer"><strong>Quick answer:</strong> A simple rent rule can be a useful reference, but your real budget also depends on debt, living costs and savings. Enter those numbers below to see both a <b>30% take-home reference</b> and a <b>cash-flow ceiling</b>.</section>
 <RentAffordabilityCalculator/>
 <section className="content"><h2>How the rent affordability calculator works</h2><p>AffordBase starts with monthly take-home pay. It subtracts your required debt payments, essential living costs and savings target to calculate how much cash is left for rent. It then compares that amount with a 30% of take-home reference. The lower figure is displayed as the planning target so the result does not ignore the other priorities you entered.</p>
 <div className="formulaBox">Planning rent target = lower of (30% of take-home) or (take-home − debt − living costs − savings)</div>
 <h2>Why take-home pay matters</h2><p>Gross salary is useful for tax and lease discussions, but monthly budgeting happens after taxes and payroll deductions. If you only know your gross salary, start with the <Link href="/take-home-pay-calculator/">Take-Home Pay Calculator</Link>, then bring the monthly estimate back here.</p>
 <h2>Example rent budget</h2><div className="exampleTable"><div><b>Monthly take-home</b><b>Other monthly goals/costs</b><b>Planning result</b></div><div><span>$5,200</span><span>$350 debt + $1,450 living + $700 savings</span><span>30% reference: $1,560</span></div></div>
 <h2>Try a what-if scenario</h2><p>If the rent you are considering feels tight, change it by $100–$300 and watch the money-left result. That makes the trade-off visible before you commit. For a broader salary, city, debt and car scenario, use the <Link href="/dashboard/">AffordBase Dashboard</Link>.</p>
 <h2>Related rent tools</h2><div className="linkgrid"><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/rent-to-income-calculator/">Rent-to-Income Calculator →</Link><Link href="/salary-needed-calculator/">Salary Needed Calculator →</Link></div>
 <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
 <p><small>AffordBase provides planning estimates only. It does not determine landlord approval, lease eligibility, or financial advice. Actual housing costs can also include utilities, parking, renters insurance and other fees.</small></p></section>
 </main><footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></>;
}
