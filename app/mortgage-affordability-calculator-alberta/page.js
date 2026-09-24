import MortgageAffordability from '../components/MortgageAffordability';
import Link from 'next/link';
import {SITE_URL} from '../site';

const slug='/mortgage-affordability-calculator-alberta/';
const url=`${SITE_URL}${slug}`;
const title='Mortgage Affordability Calculator Alberta 2026';
const description='Estimate how much home you can afford in Alberta in 2026 using income, debt, down payment and mortgage rate, with Canadian stress-test and Alberta closing-cost guidance.';
export const metadata={title,description,alternates:{canonical:slug},openGraph:{title,description,url,type:'website',siteName:'AffordBase'}};

const faq=[
 ['How much mortgage can I afford in Alberta?','Your range depends on gross household income, housing costs, existing debts, down payment and the qualifying interest rate. Canadian qualification commonly considers GDS and TDS debt-service ratios.'],
 ['What mortgage stress test applies in Alberta in 2026?','For uninsured mortgages at federally regulated lenders, OSFI currently sets the minimum qualifying rate at the greater of the contract rate plus 2 percentage points or 5.25%.'],
 ['What is the minimum down payment in Alberta?','Federal rules generally require 5% up to $500,000; for homes over $500,000 and below $1.5 million, 5% of the first $500,000 plus 10% of the portion above it; and 20% at $1.5 million or more.'],
 ['Does Alberta have a land transfer tax?','Alberta does not use an Ontario-style land transfer tax. Land Titles charges registration fees and levies. Current transfer registration is $50 plus $5 for each $5,000 or portion of property value.'],
 ['Are there mortgage registration costs in Alberta?','Yes. Alberta Land Titles applies registration charges to mortgage documents. Include these along with legal fees, title-related costs, adjustments and other closing expenses in your cash plan.'],
 ['Is this calculator a mortgage pre-approval?','No. It is an educational planning estimate. A lender may calculate qualifying income, debt, property costs and underwriting differently.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'Mortgage Affordability Calculator Alberta 2026',url,applicationCategory:'FinanceApplication',operatingSystem:'Any',description,offers:{'@type':'Offer',price:'0',priceCurrency:'CAD'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AffordBase',item:SITE_URL},{'@type':'ListItem',position:2,name:'Mortgage Affordability Calculator Canada',item:`${SITE_URL}/mortgage-affordability-calculator/`},{'@type':'ListItem',position:3,name:'Alberta',item:url}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))};
 return <main>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <section className="subhero"><div className="pill">ALBERTA · 2026 HOME AFFORDABILITY</div><p className="breadcrumb"><Link href="/">AffordBase</Link> / <Link href="/mortgage-affordability-calculator/">Canada Mortgage Calculator</Link> / Alberta</p><h1>Mortgage Affordability Calculator <em>Alberta 2026</em></h1><p>Estimate an Alberta home-buying range using household income, debt, down payment, mortgage rate and monthly ownership costs—then test the plan against Canada's qualification framework.</p></section>
  <div className="page-visual visual-home" role="img" aria-label="Alberta home affordability planning"><span>Alberta home budget: income + debt + stress test + down payment + closing costs.</span></div>

  <section className="mortgageSeo"><h2>How much home can you afford in Alberta?</h2><p>Salary is only the starting point. Mortgage qualification can also reflect property taxes, heating, condo fees and other debts. Federal consumer guidance commonly uses a <strong>39% GDS</strong> guideline for housing costs and a <strong>44% TDS</strong> guideline after other debt obligations are included.</p><div className="article-callout"><strong>Alberta 2026 planning checklist</strong><p>Test the purchase against <strong>GDS/TDS</strong>, the federal <strong>mortgage stress test</strong>, minimum <strong>down payment</strong>, Alberta <strong>Land Titles registration charges</strong> and the rest of your cash-to-close budget.</p></div></section>

  <MortgageAffordability/>

  <section className="mortgageSeo"><h2>Mortgage stress test in Alberta</h2><p>For uninsured mortgages at federally regulated lenders, OSFI currently sets the minimum qualifying rate at the greater of <strong>5.25%</strong> or the <strong>mortgage contract rate plus 2 percentage points</strong>.</p><div className="decision-grid"><section><h3>4.5% contract rate</h3><p>4.5% + 2% = <strong>6.5%</strong>, so 6.5% is the qualifying rate.</p></section><section><h3>3.0% contract rate</h3><p>3.0% + 2% = 5.0%, so the <strong>5.25%</strong> floor is higher.</p></section></div><p>OSFI notes an exception for certain uninsured straight switches at renewal when neither the loan amount nor remaining amortization increases. This AffordBase tool remains a planning calculator rather than a lender underwriting engine.</p></section>

  <section className="mortgageSeo"><h2>Minimum down payment in Alberta</h2><table className="article-table"><thead><tr><th>Home price</th><th>Federal minimum down payment</th></tr></thead><tbody><tr><td>$500,000 or less</td><td>5% of purchase price</td></tr><tr><td>Over $500,000 and under $1.5M</td><td>5% of first $500K + 10% of the portion above $500K</td></tr><tr><td>$1.5M or more</td><td>20%</td></tr></tbody></table><p>With less than 20% down, mortgage loan insurance is typically required, subject to eligibility and lender requirements. A larger down payment reduces the mortgage required and can materially change monthly affordability.</p><p><Link href="/down-payment-calculator/">Calculate your down payment →</Link></p></section>

  <section className="mortgageSeo"><h2>Alberta closing costs and Land Titles registration</h2><p>Alberta does not use the same provincial land transfer tax structure as Ontario. Instead, Land Titles charges registration fees and levies. The current common-document fee schedule lists a transfer of land at <strong>$50 plus $5 for each $5,000 or portion of the property value</strong>. Mortgage documents also have registration charges tied to the principal amount.</p><p>Registration is only one part of cash needed to close. Legal fees, title-related costs, property-tax adjustments, inspections and other transaction expenses may apply depending on the purchase.</p><p><Link href="/closing-cost-calculator/">Estimate your closing-cost budget →</Link></p></section>

  <section className="mortgageSeo"><h2>Calgary and Alberta affordability planning</h2><p>Home price and property costs vary substantially across Alberta. A Calgary purchase, an Edmonton purchase and a smaller-market purchase can produce different property-tax, condo-fee and transportation budgets even with the same household salary.</p><p>If Calgary is your target, connect this calculator with the <Link href="/cities/calgary/">Calgary affordability guide</Link> and <Link href="/articles/toronto-vs-calgary-cost-of-living-2026/">Toronto vs Calgary 2026 comparison</Link>. For the national framework, return to the <Link href="/mortgage-affordability-calculator/">Mortgage Affordability Calculator Canada</Link>.</p></section>

  <section className="mortgageSeo"><h2>What can reduce your mortgage range?</h2><div className="decision-grid"><section><h3>Other debt</h3><p>Car loans, credit cards, lines of credit and other obligations consume TDS room even when household income is strong.</p></section><section><h3>Higher qualifying rate</h3><p>A higher rate raises the payment associated with a mortgage balance and can reduce the amount that fits qualification ratios.</p></section></div><div className="decision-grid"><section><h3>Property costs</h3><p>Taxes, heating and condo fees can use part of the housing-cost allowance before the mortgage itself is considered.</p></section><section><h3>Cash available</h3><p>Down payment plus closing costs determine whether an affordable monthly mortgage is also realistic at purchase.</p></section></div></section>

  <section className="mortgageSeo"><h2>Continue your Alberta home-buying plan</h2><p><Link href="/mortgage-affordability-calculator/">Canada Mortgage Affordability →</Link> &nbsp; <Link href="/down-payment-calculator/">Down Payment →</Link> &nbsp; <Link href="/closing-cost-calculator/">Closing Costs →</Link> &nbsp; <Link href="/take-home-pay-calculator/">Take-Home Pay →</Link> &nbsp; <Link href="/cities/calgary/">Calgary Guide →</Link></p></section>

  <section className="mortgageSeo"><h2>Alberta mortgage affordability FAQ</h2>{faq.map(([q,a])=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
  <section className="mortgageSeo"><h2>Important</h2><p>AffordBase provides educational planning estimates, not financial advice, a mortgage quote or pre-approval. Qualification depends on lender underwriting, verified income, credit, debts, property details, mortgage insurance and current rules. Confirm current requirements before buying.</p></section>
 </main>
}