import Link from 'next/link';
import SalaryNeededFor2000RentCalculator from '../components/SalaryNeededFor2000RentCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'Salary Needed for $2,000 Rent: Income Estimate | AffordBase',
 description:'Estimate the salary needed for $2,000 monthly rent. Compare a 30% rent-to-income target with 3x rent and 40x rent references.',
 alternates:{canonical:'/salary-needed-for-2000-rent/'},
 openGraph:{title:'What Salary Do You Need for $2,000 Rent? | AffordBase',description:'See the gross annual income associated with $2,000 rent using common rent-to-income references.',url:`${SITE_URL}/salary-needed-for-2000-rent/`,type:'website'}
};
const faq=[
 ['What salary do I need for $2,000 rent?','At a 30% rent-to-gross-income target, $2,000 monthly rent corresponds to about $80,000 in annual gross income. Other screening or budgeting methods can produce different figures.'],
 ['What is 3x the rent for $2,000?','Three times $2,000 is $6,000 in gross monthly income. Annualized, that is $72,000 per year.'],
 ['What is the 40x income rule for $2,000 rent?','Multiplying $2,000 monthly rent by 40 gives an annual gross-income reference of $80,000.'],
 ['Is $80,000 automatically enough to afford $2,000 rent?','No. A rent-to-income ratio does not include taxes, debt, transportation, food, utilities, insurance or savings goals. Use a full monthly budget to judge personal affordability.']
];
export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase Salary Needed for $2,000 Rent Calculator',url:`${SITE_URL}/salary-needed-for-2000-rent/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Salary Needed for $2,000 Rent',item:`${SITE_URL}/salary-needed-for-2000-rent/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <>
  <header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/income-needed-for-rent/">Income Needed</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
  <main className="landing"><div className="crumb"><Link href="/">Home</Link> / Salary Needed for $2,000 Rent</div>
   <section className="pagehero"><div className="eyebrow">$2,000 RENT EXAMPLE</div><h1>What Salary Do You Need for $2,000 Rent?</h1><p>See the gross income associated with $2,000 monthly rent, compare common rent rules, and adjust the target ratio to fit your planning assumptions.</p></section>
   <section className="content quickanswer"><strong>Quick answer:</strong> If <b>$2,000 rent</b> represents <b>30% of gross income</b>, the implied salary is about <b>$80,000/year</b>. The 3× rent reference gives <b>$72,000/year</b>, while the 40× rent reference gives <b>$80,000/year</b>.</section>
   <SalaryNeededFor2000RentCalculator/>
   <section className="content">
    <h2>How much income is needed for $2,000 rent?</h2><p>There is no single salary that guarantees $2,000 rent is affordable or that a rental application will be approved. A useful starting point is to compare several gross-income references, then check the rent against your actual take-home pay and monthly expenses.</p>
    <div className="formulaBox">At a 30% target: $2,000 ÷ 0.30 × 12 = $80,000 gross income per year</div>
    <h2>$2,000 rent salary comparison</h2><div className="exampleTable"><div><b>Method</b><b>Gross income / month</b><b>Gross income / year</b></div><div><span>30% of gross income</span><span>$6,667</span><span>$80,000</span></div><div><span>3× monthly rent</span><span>$6,000</span><span>$72,000</span></div><div><span>40× monthly rent</span><span>—</span><span>$80,000</span></div></div>
    <h2>Why the salary target can be different for you</h2><p>Two people earning the same salary can have very different room for rent after taxes, debt, transportation, insurance, food and savings. That is why AffordBase treats these income multiples as reference points rather than a personal approval or affordability verdict.</p>
    <h2>Check the rent against your real budget</h2><p>Use the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link> to include debt, essential living costs and savings. If you want to test another rent amount, use the <Link href="/income-needed-for-rent/">Income Needed for Rent Calculator</Link>.</p>
    <h2>Related rent tools</h2><div className="linkgrid"><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/40x-rent-calculator/">40x Rent Calculator →</Link><Link href="/rent-to-income-calculator/">Rent-to-Income Calculator →</Link></div>
    <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
    <p><small>AffordBase provides planning estimates only. Rental screening criteria and actual affordability vary by household, property and location.</small></p>
   </section>
  </main>
  <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
 </>;
}
