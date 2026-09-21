import Link from 'next/link';
import RentToIncomeCalculator from '../components/RentToIncomeCalculator';
import {SITE_URL} from '../site';

export const metadata={
 title:'Rent-to-Income Calculator: Check Your Housing Ratio | AffordBase',
 description:'Calculate what percentage of your gross income goes to rent, compare it with a 30% reference, and explore related rent affordability tools.',
 alternates:{canonical:'/rent-to-income-calculator/'},
 openGraph:{title:'Rent-to-Income Calculator | AffordBase',description:'Enter monthly rent and gross income to calculate your rent-to-income ratio instantly.',url:`${SITE_URL}/rent-to-income-calculator/`,type:'website'}
};

const faq=[
 ['How do I calculate my rent-to-income ratio?','Divide monthly rent by monthly gross income and multiply by 100. For example, $2,000 rent divided by $6,500 gross income is about 30.8%.'],
 ['Should I use gross or take-home income?','The traditional rent-to-income ratio normally uses gross income before taxes. For personal budgeting, take-home pay can provide additional context because it reflects the cash you actually receive.'],
 ['Is 30% of income a hard rent limit?','No. Thirty percent is a common planning reference, not a universal affordability or approval rule. Debt, transportation, family costs, savings goals and local housing conditions can materially change what fits a budget.'],
 ['Does a low rent-to-income ratio guarantee rental approval?','No. Landlords and property managers may use different screening criteria, including income documentation, credit, debt, guarantors and other requirements.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase Rent-to-Income Calculator',url:`${SITE_URL}/rent-to-income-calculator/`,applicationCategory:'FinanceApplication',operatingSystem:'Any',description:metadata.description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const crumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'Home',item:SITE_URL},{'@type':'ListItem',position:2,name:'Rent-to-Income Calculator',item:`${SITE_URL}/rent-to-income-calculator/`} ]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <>
  <header><Link className="brand" href="/">AffordBase<span>.</span></Link><nav><Link href="/rent-affordability-calculator/">Rent</Link><Link href="/income-needed-for-rent/">Income Needed</Link><Link href="/dashboard/">Dashboard</Link></nav></header>
  <main className="landing">
   <div className="crumb"><Link href="/">Home</Link> / Rent-to-Income Calculator</div>
   <section className="pagehero"><div className="eyebrow">HOUSING RATIO</div><h1>Rent-to-Income Calculator</h1><p>See what percentage of your gross monthly income goes to rent, compare it with a common 30% reference, and put the ratio in the context of your broader budget.</p></section>
   <section className="content quickanswer"><strong>Quick answer:</strong> Rent-to-income ratio = <b>monthly rent ÷ monthly gross income × 100</b>. If rent is <b>$2,000</b> and gross income is <b>$6,500/month</b>, the ratio is about <b>30.8%</b>.</section>
   <RentToIncomeCalculator/>
   <section className="content">
    <h2>What is a rent-to-income ratio?</h2><p>Your rent-to-income ratio shows how much of your gross income is committed to monthly rent. It is useful for quickly comparing housing costs across salaries or apartments, but it does not show your complete financial picture.</p>
    <div className="formulaBox">Rent-to-income ratio = monthly rent ÷ monthly gross income × 100</div>
    <h2>Rent-to-income examples</h2>
    <div className="exampleTable"><div><b>Rent</b><b>Gross income / month</b><b>Ratio</b></div><div><span>$1,500</span><span>$5,000</span><span>30.0%</span></div><div><span>$2,000</span><span>$6,500</span><span>30.8%</span></div><div><span>$2,500</span><span>$8,000</span><span>31.3%</span></div><div><span>$3,000</span><span>$10,000</span><span>30.0%</span></div></div>
    <h2>What does the 30% reference mean?</h2><p>A 30% gross-income reference means monthly rent equals 30% of gross monthly income. It is a simple planning benchmark, not a universal rule. The same ratio can feel very different depending on taxes, debt, transportation, childcare, food and savings goals.</p>
    <h2>Rent-to-income vs. 3x and 40x rent</h2><p>The <Link href="/3x-rent-calculator/">3x rent rule</Link> expresses the relationship as monthly gross income being three times rent. The <Link href="/40x-rent-calculator/">40x rent rule</Link> compares monthly rent with annual gross income. A 40× annual-income rule is mathematically equivalent to rent being 30% of gross annual income.</p>
    <h2>Go beyond one ratio</h2><p>If you want to account for debt, essential living costs and a savings target, use the <Link href="/rent-affordability-calculator/">Rent Affordability Calculator</Link>. If you already know your desired rent and want to work backward, use the <Link href="/income-needed-for-rent/">Income Needed for Rent Calculator</Link>.</p>
    <h2>Related rent tools</h2><div className="linkgrid"><Link href="/rent-affordability-calculator/">Rent Affordability Calculator →</Link><Link href="/income-needed-for-rent/">Income Needed for Rent →</Link><Link href="/3x-rent-calculator/">3x Rent Calculator →</Link><Link href="/40x-rent-calculator/">40x Rent Calculator →</Link></div>
    <h2>Frequently asked questions</h2>{faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}
    <p><small>AffordBase provides planning estimates only. This ratio does not determine rental eligibility or approval, and actual housing affordability depends on your full financial situation.</small></p>
   </section>
  </main>
  <footer><b>AffordBase.</b><span>Practical affordability estimates for everyday decisions.</span></footer>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(crumb)}}/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
 </>;
}
