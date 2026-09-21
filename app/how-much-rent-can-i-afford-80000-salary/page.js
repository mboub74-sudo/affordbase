import Link from 'next/link';
import Rent80kCalculator from '../components/Rent80kCalculator';
import {SITE_URL} from '../site';
export const metadata={
 title:'How Much Rent Can I Afford on $80K a Year? | AffordBase',
 description:'See rent examples for an $80,000 salary and adjust the rent-to-income ratio, debt, living costs and savings target to plan your budget.',
 alternates:{canonical:'/how-much-rent-can-i-afford-80000-salary/'},
 openGraph:{title:'How Much Rent Can I Afford on an $80K Salary? | AffordBase',description:'Explore rent targets for an $80,000 gross annual salary and connect the result to your real take-home budget.',url:`${SITE_URL}/how-much-rent-can-i-afford-80000-salary/`,type:'website'}
};
const faq=[
 ['How much rent can I afford on an $80,000 salary?','Using 30% of gross income as a simple reference, an $80,000 annual salary corresponds to about $2,000 per month in rent. Your personal budget may support less or more depending on taxes, debt, expenses and savings goals.'],
 ['What is 3x rent on an $80,000 salary?','$80,000 per year is $6,667 gross per month. Under a 3x monthly-rent screening reference, $6,667 divided by 3 is about $2,222 in monthly rent.'],
 ['What is the 40x rent amount for an $80,000 salary?','Dividing $80,000 annual gross income by 40 gives a monthly rent reference of $2,000.'],
 ['Should I use gross or take-home pay to choose my rent?','Gross-income ratios are useful reference points, but a personal monthly budget is clearer when you also check take-home pay, debt, living costs and savings.']
];
export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase $80K Salary Rent Calculator',url:`${SITE_URL}/how-much-rent-can-i-afford-80000-salary/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Rent Affordability',item:`${SITE_URL}/rent-affordability-calculator/`},{'@type':'ListItem',position:3,name:'Rent on an $80K Salary',item:`${SITE_URL}/how-much-rent-can-i-afford-80000-salary/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <><header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/take-home-pay-calculator/">Take-Home Pay</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
 <main className="landing"><div className="crumb"><Link href="/">Home</Link> / <Link href="/rent-affordability-calculator/">Rent</Link> / $80K Salary</div>
 <section className="pagehero"><div className="eyebrow">$80,000 SALARY RENT GUIDE</div><h1>How Much Rent Can I Afford on an $80K Salary?</h1><p>Start with a simple gross-income reference, then adjust the assumptions and connect the result to your take-home pay and real monthly expenses.</p></section>
 <section className="content quickanswer"><strong>Quick answer:</strong> A <b>$80,000 annual salary</b> equals <b>$6,667 gross per month</b>. At a 30% gross-income reference, that is about <b>$2,000/month in rent</b>. A 3× rent reference is about <b>$2,222/month</b>, while the 40× rule also points to <b>$2,000/month</b>.</section>
 <Rent80kCalculator/>
 <section className="content"><h2>$80K salary rent breakdown</h2><p>A $80,000 gross annual salary works out to $6,666.67 per month before taxes and payroll deductions. Multiplying that monthly gross income by 30% gives a $2,000 rent reference. This is a starting point, not a personal affordability guarantee.</p>
 <div className="formulaBox">$80,000 ÷ 12 × 30% = $2,000/month rent reference</div>
 <h2>Three common ways to look at rent on $80K</h2><div className="exampleTable"><div><b>Method</b><b>Calculation</b><b>Monthly rent reference</b></div><div><span>30% of gross</span><span>$6,666.67 × 30%</span><span>$2,000</span></div><div><span>3× rent</span><span>$6,666.67 ÷ 3</span><span>≈ $2,222</span></div><div><span>40× rent</span><span>$80,000 ÷ 40</span><span>$2,000</span></div></div>
 <h2>Taxes can change what feels affordable</h2><p>The figures above use gross salary. Your actual spendable income depends on where you live and the taxes and payroll deductions that apply. Use the <Link href="/take-home-pay-calculator/">Take-Home Pay Calculator</Link> first if you want a monthly net estimate, then enter it in the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link> with your debt, living costs and savings target.</p>
 <h2>What if you have debt or want to save more?</h2><p>A household with a car payment, student loan or aggressive savings goal may need a lower rent than a gross-income rule suggests. AffordBase's broader rent calculator lets those costs compete for the same monthly take-home income instead of treating rent in isolation.</p>
 <h2>Related tools</h2><div className="linkgrid"><Link href="/rent-affordability-calculator/">Rent Affordability Calculator →</Link><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/40x-rent-calculator/">40x Rent Calculator →</Link><Link href="/rent-to-income-calculator/">Rent-to-Income Calculator →</Link><Link href="/dashboard/">AffordBase Dashboard →</Link></div>
 <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
 <p><small>AffordBase provides planning estimates only. Gross-income ratios do not account for every tax, expense, rental screening requirement or household circumstance.</small></p></section></main>
 <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></>;
}
