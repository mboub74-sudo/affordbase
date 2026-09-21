import Link from 'next/link';
import IncomeNeededForRentCalculator from '../components/IncomeNeededForRentCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'Income Needed for Rent Calculator | AffordBase',
 description:'Enter your target monthly rent to estimate the gross income needed. Compare a customizable rent-to-income ratio with 3x and 40x rent references.',
 alternates:{canonical:'/income-needed-for-rent/'},
 openGraph:{title:'Income Needed for Rent Calculator',description:'Start with the rent you want and estimate the gross income needed to support it.',url:`${SITE_URL}/income-needed-for-rent/`,type:'website'}
};
const faq=[
 ['How much income do I need for rent?','It depends on the affordability ratio or screening method you use. This calculator lets you set a rent-to-gross-income percentage and also shows 3x monthly-rent and 40x annual-income references.'],
 ['What does 3x the rent mean?','A 3x monthly-rent reference means monthly gross income is three times the monthly rent. For $2,000 rent, that equals $6,000 gross per month or $72,000 per year.'],
 ['What does 40x the rent mean?','The 40x reference multiplies monthly rent by 40 to estimate annual gross income. For $2,000 rent, the reference is $80,000 per year.'],
 ['Do landlords always use the same income rule?','No. Screening standards can differ by landlord, property, location and applicant circumstances. These figures are planning references, not approval guarantees.']
];
export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase Income Needed for Rent Calculator',url:`${SITE_URL}/income-needed-for-rent/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Income Needed for Rent Calculator',item:`${SITE_URL}/income-needed-for-rent/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <><header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/hourly-to-salary-calculator/">Salary</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
 <main className="landing"><div className="crumb"><Link href="/">Home</Link> / Income Needed for Rent</div>
 <section className="pagehero"><div className="eyebrow">REVERSE RENT CALCULATOR</div><h1>Income Needed for Rent Calculator</h1><p>Start with the monthly rent you want. AffordBase works backward to estimate the gross monthly and annual income associated with that housing target.</p></section>
 <section className="content quickanswer"><strong>Quick answer:</strong> For <b>$2,000/month rent</b>, a 30% rent-to-gross-income target implies about <b>$80,000/year</b> in gross income. A 3× monthly-rent reference implies $72,000/year, while a 40× reference implies $80,000/year.</section>
 <IncomeNeededForRentCalculator/>
 <section className="content"><h2>How to calculate income needed for rent</h2><p>Choose the monthly rent you are considering and the share of gross income you want that rent to represent. AffordBase divides the rent by that percentage to estimate required monthly gross income, then annualizes the result.</p>
 <div className="formulaBox">Required annual gross income = monthly rent ÷ target rent ratio × 12</div>
 <h2>$2,000 rent example</h2><div className="exampleTable"><div><b>Method</b><b>Monthly gross income</b><b>Annual gross income</b></div><div><span>30% of gross</span><span>$6,667</span><span>$80,000</span></div><div><span>3× monthly rent</span><span>$6,000</span><span>$72,000</span></div><div><span>40× rent</span><span>—</span><span>$80,000</span></div></div>
 <h2>Income rule vs. real affordability</h2><p>An income multiple is only one view. Your actual budget can also be affected by taxes, debt, transportation, utilities, food and savings goals. After finding an income target here, use the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link> to test the rent against monthly cash flow.</p>
 <h2>Related rent tools</h2><div className="linkgrid"><Link href="/rent-affordability-calculator/">Rent Affordability Calculator →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/40x-rent-calculator/">40x Rent Calculator →</Link><Link href="/salary-needed-calculator/">Salary Needed Calculator →</Link></div>
 <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
 <p><small>AffordBase provides planning estimates only. Landlord qualification rules vary, and this calculator does not determine lease eligibility or approval.</small></p></section></main>
 <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
 <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/></>;
}
