import Link from 'next/link';
import FortyXRentCalculator from '../components/FortyXRentCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'40x Rent Calculator: Annual Income Needed for Rent | AffordBase',
 description:'Use the 40x rent calculator to estimate the annual gross income associated with a target monthly rent, then compare it with 3x rent and a 30% income reference.',
 alternates:{canonical:'/40x-rent-calculator/'},
 openGraph:{title:'40x Rent Calculator | AffordBase',description:'Enter monthly rent and instantly estimate the 40x annual gross-income target.',url:`${SITE_URL}/40x-rent-calculator/`,type:'website'}
};

const faq=[
 ['What is the 40x rent rule?','The 40x rent rule compares monthly rent with annual gross income. Multiply monthly rent by 40 to calculate the annual gross-income reference.'],
 ['How much income does $2,000 rent require under the 40x rule?','Two thousand dollars multiplied by 40 equals $80,000 in gross annual income, or about $6,667 gross per month.'],
 ['Is the 40x rent rule the same as the 3x rent rule?','No. The 3x rule implies annual gross income equal to 36 times monthly rent, while the 40x rule uses 40 times monthly rent and therefore produces a higher income target.'],
 ['Does meeting the 40x rule guarantee rental approval?','No. Screening requirements vary by landlord and property. Credit, debt, documentation, guarantors and other criteria may also matter.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase 40x Rent Calculator',url:`${SITE_URL}/40x-rent-calculator/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'40x Rent Calculator',item:`${SITE_URL}/40x-rent-calculator/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <>
  <header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/income-needed-for-rent/">Income Needed</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
  <main className="landing">
   <div className="crumb"><Link href="/">Home</Link> / 40x Rent Calculator</div>
   <section className="pagehero"><div className="eyebrow">RENT INCOME RULE</div><h1>40x Rent Calculator</h1><p>Enter a monthly rent to estimate the gross annual income associated with the 40× rent guideline, then compare it with other rent-to-income references.</p></section>
   <section className="content quickanswer"><strong>Quick answer:</strong> The 40× rent formula is <b>monthly rent × 40 = gross annual income</b>. For <b>$2,000 rent</b>, the result is <b>$80,000/year</b>, or about <b>$6,667/month</b> gross.</section>
   <FortyXRentCalculator/>
   <section className="content">
    <h2>How the 40x rent rule works</h2><p>Multiply the monthly rent by 40. The result is an annual gross-income reference before income taxes and payroll deductions.</p>
    <div className="formulaBox">Required annual gross income = monthly rent × 40</div>
    <h2>40x rent examples</h2>
    <div className="exampleTable"><div><b>Monthly rent</b><b>Gross income / year</b><b>Gross income / month</b></div><div><span>$1,500</span><span>$60,000</span><span>$5,000</span></div><div><span>$2,000</span><span>$80,000</span><span>$6,667</span></div><div><span>$2,500</span><span>$100,000</span><span>$8,333</span></div><div><span>$3,000</span><span>$120,000</span><span>$10,000</span></div></div>
    <h2>40x rent vs. 3x rent</h2><p>The formulas use different time periods. The <Link href="/3x-rent-calculator/">3x rent rule</Link> multiplies monthly rent by 3 to estimate monthly gross income, which annualizes to 36 times rent. The 40x rule directly multiplies monthly rent by 40, so its income reference is about 11.1% higher.</p>
    <h2>40x rent vs. a 30% gross-income target</h2><p>Under the 40× rule, annual rent is 30% of annual gross income because 12 ÷ 40 = 30%. That makes the 40× formula mathematically equivalent to a 30% gross-income rent target. The <Link href="/income-needed-for-rent/">Income Needed for Rent Calculator</Link> lets you change that percentage.</p>
    <h2>Is 40x rent a complete affordability test?</h2><p>No. It does not account for take-home pay, debt, transportation, food, utilities or savings goals. Use the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link> for a broader monthly cash-flow estimate.</p>
    <h2>Related rent tools</h2><div className="linkgrid"><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/rent-to-income-calculator/">Rent-to-Income Calculator →</Link><Link href="/rent-affordability-calculator/">Rent Affordability Calculator →</Link></div>
    <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
    <p><small>AffordBase provides planning estimates only. Rental screening requirements vary by landlord and location, and this calculator does not determine lease eligibility or approval.</small></p>
   </section>
  </main>
  <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
 </>;
}
