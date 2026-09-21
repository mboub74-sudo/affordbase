import Link from 'next/link';
import ThreeXRentCalculator from '../components/ThreeXRentCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'3x Rent Calculator: Income Needed for Monthly Rent | AffordBase',
 description:'Use the 3x rent calculator to estimate the gross monthly and annual income associated with a target rent, then compare it with 30% and 40x references.',
 alternates:{canonical:'/3x-rent-calculator/'},
 openGraph:{title:'3x Rent Calculator | AffordBase',description:'Enter monthly rent and instantly calculate the 3x gross-income target.',url:`${SITE_URL}/3x-rent-calculator/`,type:'website'}
};

const faq=[
 ['What does 3x the rent mean?','The 3x rent rule means gross monthly income is three times the monthly rent. For $2,000 rent, the calculation is $6,000 gross income per month, or $72,000 per year.'],
 ['Is 3x rent based on gross or net income?','The common 3x rent calculation uses gross income before taxes and payroll deductions. A personal affordability budget should also consider take-home pay, debt, living costs and savings.'],
 ['How much income do I need for $1,500 rent using the 3x rule?','Three times $1,500 is $4,500 gross per month. Annualized, that is $54,000 in gross income.'],
 ['Does every landlord require 3x rent?','No. Rental screening criteria vary by landlord, property and location. The 3x calculation is a reference, not a guarantee of qualification or approval.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase 3x Rent Calculator',url:`${SITE_URL}/3x-rent-calculator/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'3x Rent Calculator',item:`${SITE_URL}/3x-rent-calculator/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <>
  <header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/income-needed-for-rent/">Income Needed</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
  <main className="landing">
   <div className="crumb"><Link href="/">Home</Link> / 3x Rent Calculator</div>
   <section className="pagehero"><div className="eyebrow">RENT INCOME RULE</div><h1>3x Rent Calculator</h1><p>Enter a monthly rent to calculate three times the rent as gross monthly income and see the equivalent annual salary.</p></section>
   <section className="content quickanswer"><strong>Quick answer:</strong> The 3× rent formula is <b>monthly rent × 3 = gross monthly income</b>. For <b>$2,000 rent</b>, that is <b>$6,000/month</b> or <b>$72,000/year</b> in gross income.</section>
   <ThreeXRentCalculator/>
   <section className="content">
    <h2>How the 3x rent rule works</h2><p>The calculation starts with the monthly rent and multiplies it by three. To convert the result to an annual salary, multiply that monthly income by 12.</p>
    <div className="formulaBox">Required annual gross income = monthly rent × 3 × 12</div>
    <h2>3x rent examples</h2>
    <div className="exampleTable"><div><b>Monthly rent</b><b>Gross income / month</b><b>Gross income / year</b></div><div><span>$1,500</span><span>$4,500</span><span>$54,000</span></div><div><span>$2,000</span><span>$6,000</span><span>$72,000</span></div><div><span>$2,500</span><span>$7,500</span><span>$90,000</span></div><div><span>$3,000</span><span>$9,000</span><span>$108,000</span></div></div>
    <h2>3x rent vs. the 30% guideline</h2><p>These references are close but not identical. If rent equals one-third of gross monthly income under the 3× formula, the rent share is about 33.3%. A 30% gross-income target requires somewhat more income. Use the <Link href="/income-needed-for-rent/">Income Needed for Rent Calculator</Link> to compare adjustable ratios.</p>
    <h2>Does passing the 3x rule mean the rent is affordable?</h2><p>Not necessarily. Gross-income rules do not account for your taxes, debt, transportation, food, utilities or savings goals. For a cash-flow view, use the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link>.</p>
    <h2>Related rent tools</h2><div className="linkgrid"><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/40x-rent-calculator/">40x Rent Calculator →</Link><Link href="/rent-to-income-calculator/">Rent-to-Income Calculator →</Link><Link href="/rent-affordability-calculator/">Rent Affordability Calculator →</Link></div>
    <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
    <p><small>AffordBase provides planning estimates only. Rental screening requirements vary, and this calculator does not determine lease eligibility or approval.</small></p>
   </section>
  </main>
  <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
 </>;
}
