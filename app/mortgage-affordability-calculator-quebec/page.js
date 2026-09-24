import MortgageAffordability from '../components/MortgageAffordability';
import Link from 'next/link';
import {SITE_URL} from '../site';

const slug='/mortgage-affordability-calculator-quebec/';
const url=`${SITE_URL}${slug}`;
const title='Mortgage Affordability Calculator Quebec 2026';
const description='Estimate how much home you can afford in Quebec in 2026 using income, debt, down payment and mortgage rate, with stress-test, GDS/TDS and Quebec welcome-tax guidance.';
export const metadata={title,description,alternates:{canonical:slug},openGraph:{title,description,url,type:'website',siteName:'AffordBase'}};

const faq=[
 ['How much mortgage can I afford in Quebec?','Your range depends on gross household income, housing costs, other debts, down payment and the qualifying mortgage rate. Federal consumer guidance commonly uses a 39% GDS guideline and 44% TDS guideline.'],
 ['What mortgage stress test applies in Quebec in 2026?','Federally regulated lenders generally require qualification at the higher of 5.25% or the mortgage contract rate plus 2 percentage points.'],
 ['What is the minimum down payment in Quebec?','Federal minimums generally require 5% up to $500,000; 5% of the first $500,000 plus 10% of the portion above it for homes over $500,000 and below $1.5 million; and 20% at $1.5 million or more.'],
 ['What is the Quebec welcome tax in 2026?','Quebec municipalities collect real-estate transfer duties. The 2026 base brackets are 0.5% on the first $62,900, 1% from $62,900.01 to $315,000, and 1.5% above $315,000. Municipalities may set higher rates on portions above $500,000, subject to provincial rules, and Montreal has special authority.'],
 ['How is Quebec transfer duty calculated?','The tax base is generally the highest of the consideration paid, the consideration stated in the transfer deed, or the property market value calculated under Quebec rules.'],
 ['Is this calculator a mortgage pre-approval?','No. AffordBase is an educational planning tool. Actual lender qualification can differ based on verified income, credit, debts, property costs, insurance and underwriting.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'Mortgage Affordability Calculator Quebec 2026',url,applicationCategory:'FinanceApplication',operatingSystem:'Any',description,offers:{'@type':'Offer',price:'0',priceCurrency:'CAD'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AffordBase',item:SITE_URL},{'@type':'ListItem',position:2,name:'Mortgage Affordability Calculator Canada',item:`${SITE_URL}/mortgage-affordability-calculator/`},{'@type':'ListItem',position:3,name:'Quebec',item:url}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))};
 return <main>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <section className="subhero"><div className="pill">QUEBEC · 2026 HOME AFFORDABILITY</div><p className="breadcrumb"><Link href="/">AffordBase</Link> / <Link href="/mortgage-affordability-calculator/">Canada Mortgage Calculator</Link> / Quebec</p><h1>Mortgage Affordability Calculator <em>Quebec 2026</em></h1><p>Estimate a Quebec home-buying range from household income, debt, down payment, mortgage rate and ownership costs, then account for Canada's qualification framework and Quebec transfer duties.</p></section>
  <div className="page-visual visual-home" role="img" aria-label="Quebec home affordability planning"><span>Quebec home budget: mortgage + debt + stress test + down payment + welcome tax.</span></div>

  <section className="mortgageSeo"><h2>How much home can you afford in Quebec?</h2><p>Mortgage affordability is not simply a multiple of salary. Lenders can consider mortgage payments, property taxes, heating, condo fees and other debts. Federal consumer guidance says monthly housing costs generally should not exceed <strong>39% of gross household income (GDS)</strong>, while total debt load generally should not exceed <strong>44% (TDS)</strong>.</p><div className="article-callout"><strong>Quebec 2026 planning checklist</strong><p>Test your purchase against <strong>GDS/TDS</strong>, the federal <strong>mortgage stress test</strong>, minimum <strong>down payment</strong>, Quebec <strong>real-estate transfer duty (welcome tax)</strong> and other closing costs.</p></div></section>

  <MortgageAffordability/>

  <section className="mortgageSeo"><h2>Mortgage stress test in Quebec</h2><p>At federally regulated lenders, borrowers generally qualify at the higher of <strong>5.25%</strong> or the <strong>mortgage contract rate plus 2 percentage points</strong>. This applies to insured and uninsured mortgages under federal consumer guidance.</p><div className="decision-grid"><section><h3>4.5% contract rate</h3><p>4.5% + 2% = <strong>6.5%</strong>, making 6.5% the higher qualifying rate.</p></section><section><h3>3.0% contract rate</h3><p>3.0% + 2% = 5.0%, so the <strong>5.25%</strong> floor is higher.</p></section></div><p>The AffordBase calculator is a planning estimate and does not reproduce every lender underwriting rule or exception.</p></section>

  <section className="mortgageSeo"><h2>Minimum down payment in Quebec</h2><table className="article-table"><thead><tr><th>Home price</th><th>Federal minimum down payment</th></tr></thead><tbody><tr><td>$500,000 or less</td><td>5% of purchase price</td></tr><tr><td>Over $500,000 and under $1.5M</td><td>5% of first $500K + 10% of the portion above $500K</td></tr><tr><td>$1.5M or more</td><td>20%</td></tr></tbody></table><p>When the down payment is below 20%, mortgage loan insurance is typically required, subject to eligibility and lender requirements. Quebec also applies provincial sales tax to mortgage loan insurance premiums; federal guidance notes that this tax cannot be added to the mortgage and must be paid when the mortgage is obtained.</p><p><Link href="/down-payment-calculator/">Calculate your down payment →</Link></p></section>

  <section className="mortgageSeo"><h2>Quebec welcome tax: 2026 transfer-duty brackets</h2><p>Quebec municipalities generally collect a real-estate transfer duty when ownership changes. For the 2026 financial year, the provincial base brackets are:</p><table className="article-table"><thead><tr><th>Taxable portion</th><th>2026 base rate</th></tr></thead><tbody><tr><td>First $62,900</td><td>0.5%</td></tr><tr><td>$62,900.01 to $315,000</td><td>1.0%</td></tr><tr><td>Amount above $315,000</td><td>1.5%</td></tr></tbody></table><p>A municipality may set a higher rate for a portion above $500,000 within provincial limits, while Montreal has special authority to set higher rates. The tax base is generally the highest of the price paid, the consideration written in the deed, or the property's market value determined under Quebec rules.</p><p>Because the applicable rate can depend on the municipality and property value, treat the table as the provincial baseline and verify the exact municipal amount before closing.</p><p><Link href="/closing-cost-calculator/">Plan your closing costs →</Link></p></section>

  <section className="mortgageSeo"><h2>Montreal and Quebec affordability planning</h2><p>Property prices, municipal taxes, condo fees and transfer duties vary by municipality. A Montreal purchase can therefore produce a different cash-to-close requirement from a purchase elsewhere in Quebec even when the mortgage amount is identical.</p><p>For Montreal household-budget context, continue to the <Link href="/cities/montreal/">Montreal affordability guide</Link>. For the national qualification framework, use the <Link href="/mortgage-affordability-calculator/">Mortgage Affordability Calculator Canada</Link>.</p></section>

  <section className="mortgageSeo"><h2>Build the full Quebec home-buying budget</h2><p><Link href="/mortgage-affordability-calculator/">Canada Mortgage Affordability →</Link> &nbsp; <Link href="/down-payment-calculator/">Down Payment →</Link> &nbsp; <Link href="/closing-cost-calculator/">Closing Costs →</Link> &nbsp; <Link href="/take-home-pay-calculator/">Take-Home Pay →</Link> &nbsp; <Link href="/cities/montreal/">Montreal Guide →</Link></p></section>

  <section className="mortgageSeo"><h2>Quebec mortgage affordability FAQ</h2>{faq.map(([q,a])=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
  <section className="mortgageSeo"><h2>Important</h2><p>AffordBase provides educational planning estimates, not financial advice, a mortgage quote or pre-approval. Qualification depends on lender underwriting, verified income, credit, debts, property details, mortgage insurance and current rules. Confirm current lender and municipal requirements before purchasing.</p></section>
 </main>
}