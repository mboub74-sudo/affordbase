import MortgageAffordability from '../components/MortgageAffordability';
import {SITE_URL} from '../site';

const slug='/mortgage-affordability-calculator/';
const url=`${SITE_URL}${slug}`;
const title='Mortgage Affordability Calculator: How Much Home Can I Afford?';
const description='Estimate how much home you can afford from salary, down payment, debt, interest rate, property tax, insurance and HOA or condo fees.';

export const metadata={
  title,
  description,
  alternates:{canonical:slug},
  openGraph:{title,description,url,type:'website',siteName:'AffordBase'}
};

const faq=[
  ['How does the mortgage affordability calculator work?','AffordBase estimates take-home pay, sets a planning limit for monthly housing and debt costs, then converts the available mortgage payment into an estimated loan amount using your interest rate and mortgage term. Your entered down payment is added to estimate a home-price range.'],
  ['Does this calculator give me a mortgage pre-approval?','No. It is a budgeting and planning estimate. A lender may use different income, debt, credit, stress-test, insurance, tax and underwriting rules when deciding how much you can borrow.'],
  ['What costs should I include besides the mortgage payment?','Include property tax, home insurance and HOA or condo fees where applicable. You should also plan separately for closing costs, maintenance, utilities and other ownership expenses.'],
  ['How does a larger down payment affect affordability?','With the same estimated mortgage amount, a larger down payment can increase the home price in your planning range. Actual loan qualification and mortgage-insurance rules may change the result.'],
  ['Can I use the calculator for both Canada and the United States?','Yes. Choose a supported city and AffordBase uses the matching currency and its planning tax engine. Mortgage qualification rules differ by country and lender, so the result should be treated as an estimate.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'AffordBase Mortgage Affordability Calculator',url,applicationCategory:'FinanceApplication',operatingSystem:'Any',description,offers:{'@type':'Offer',price:'0',priceCurrency:'USD'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AffordBase',item:SITE_URL},{'@type':'ListItem',position:2,name:'Mortgage Affordability Calculator',item:url}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))};
 return <>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <header><a className="brand" href="/">AffordBase<span>.</span></a><nav><a href="/dashboard/">Dashboard</a><a href="/compare-cities/">Compare Cities</a><a href="/salary-needed-calculator/">Salary Needed</a><a href="/mortgage-affordability-calculator/">Home</a><a href="/down-payment-calculator/">Cash Needed</a></nav><a className="mini" href="/">Main tools</a></header>
  <main>
   <section className="subhero"><div className="pill">AFFORDBASE · HOME AFFORDABILITY</div><p className="breadcrumb"><a href="/">AffordBase</a> / Mortgage Affordability Calculator</p><h1>Mortgage Affordability <em>Calculator</em></h1><p>Estimate how much home you may be able to afford from income, down payment, debt, mortgage rate and the monthly costs of owning a home.</p></section>
   <div className="page-visual visual-home" role="img" aria-label="Modern family home for mortgage affordability planning"><span>See what home fits your income before you start shopping.</span></div>
   <section className="mortgageSeo"><h2>Quick answer</h2><p>Your affordable home price depends on more than salary. AffordBase first estimates your monthly take-home pay, then accounts for debt, property tax, insurance and HOA or condo fees. The calculator converts the remaining affordable mortgage payment into an estimated mortgage balance and adds your down payment.</p></section>
   <MortgageAffordability/>
   <section className="mortgageSeo"><h2>How mortgage affordability is estimated</h2><p>The calculator starts with your annual gross salary and selected city to estimate monthly take-home pay. It then applies a conservative planning ceiling to housing and debt costs. After subtracting property tax, insurance, fees and debt obligations, it converts the remaining monthly payment into a mortgage amount using the interest rate and term you enter.</p><p><strong>Planning formula:</strong> affordable home price ≈ estimated affordable mortgage + down payment. This is deliberately a budgeting estimate rather than a promise of lender approval.</p></section>
   <section className="mortgageSeo"><h2>Costs that can change your home-buying range</h2><p>A higher interest rate reduces the mortgage supported by the same monthly payment. Existing debt can also reduce the room available for housing. Property tax, insurance and condo or HOA fees matter because they continue alongside the mortgage payment. A larger down payment may increase the purchase-price range, but minimum-down-payment and mortgage-insurance rules can still apply.</p></section>
   <section className="mortgageSeo"><h2>From affordability to cash needed</h2><p>Mortgage affordability answers only one part of the home-buying question. Once you have a target price, estimate the cash you need before closing and compare that target with your savings plan.</p><p><a href="/down-payment-calculator/">Down Payment Calculator →</a> &nbsp; <a href="/closing-cost-calculator/">Closing Cost Calculator →</a> &nbsp; <a href="/salary-needed-calculator/">Salary Needed Calculator →</a> &nbsp; <a href="/dashboard/">Monthly Budget Dashboard →</a></p></section>
   <section className="mortgageSeo"><h2>Mortgage affordability FAQ</h2>{faq.map(([q,a])=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
   <section className="mortgageSeo"><h2>Important</h2><p>AffordBase provides educational planning estimates, not financial advice, a mortgage quote or a pre-approval. Actual qualification can depend on credit, verified income, debt definitions, lender policy, mortgage insurance, stress tests and local rules. Confirm current requirements with a qualified lender or mortgage professional before making a purchase decision.</p></section>
  </main>
 </>;
}
