import MortgageAffordability from '../components/MortgageAffordability';
import Link from 'next/link';
import {SITE_URL} from '../site';

const slug='/mortgage-affordability-calculator-ontario/';
const url=`${SITE_URL}${slug}`;
const title='Mortgage Affordability Calculator Ontario 2026';
const description='Estimate how much home you can afford in Ontario in 2026. Use income, debt, down payment and mortgage rate, with Canadian stress-test, GDS/TDS and Ontario land transfer tax guidance.';
export const metadata={title,description,alternates:{canonical:slug},openGraph:{title,description,url,type:'website',siteName:'AffordBase'}};

const faq=[
 ['How much mortgage can I afford in Ontario?','Affordability depends on gross household income, housing costs, existing debts, down payment and the qualifying interest rate. Canadian guidance commonly uses a 39% GDS guideline and 44% TDS guideline.'],
 ['What mortgage stress test applies in Ontario in 2026?','At federally regulated lenders, the minimum qualifying rate for uninsured mortgages is currently the greater of the contract rate plus 2 percentage points or 5.25%.'],
 ['What is the minimum down payment for an Ontario home?','Federal minimums generally start at 5% for homes up to $500,000, then 5% of the first $500,000 plus 10% of the portion above $500,000 for homes below $1.5 million. Homes at $1.5 million or more require at least 20%.'],
 ['Does Ontario charge land transfer tax?','Yes. Ontario land transfer tax is progressive: 0.5% up to $55,000, 1% from $55,000 to $250,000, 1.5% from $250,000 to $400,000, 2% above $400,000, and 2.5% on the portion above $2 million for qualifying one- or two-family residences.'],
 ['Is Toronto land transfer tax different?','A Toronto purchase can also be subject to the City of Toronto municipal land transfer tax in addition to Ontario land transfer tax. Use location-specific closing-cost estimates before buying.'],
 ['Is this a mortgage pre-approval?','No. AffordBase provides an educational planning estimate. Actual lender qualification can differ based on verified income, credit, debts, property costs, insurance and underwriting.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'Mortgage Affordability Calculator Ontario 2026',url,applicationCategory:'FinanceApplication',operatingSystem:'Any',description,offers:{'@type':'Offer',price:'0',priceCurrency:'CAD'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AffordBase',item:SITE_URL},{'@type':'ListItem',position:2,name:'Mortgage Affordability Calculator Canada',item:`${SITE_URL}/mortgage-affordability-calculator/`},{'@type':'ListItem',position:3,name:'Ontario',item:url}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))};
 return <main>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <section className="subhero"><div className="pill">ONTARIO · 2026 HOME AFFORDABILITY</div><p className="breadcrumb"><Link href="/">AffordBase</Link> / <Link href="/mortgage-affordability-calculator/">Canada Mortgage Calculator</Link> / Ontario</p><h1>Mortgage Affordability Calculator <em>Ontario 2026</em></h1><p>Estimate an Ontario home-buying range from income, debt, down payment and monthly ownership costs, then compare it with Canada's mortgage qualification framework.</p></section>
  <div className="page-visual visual-home" role="img" aria-label="Ontario home affordability planning"><span>Ontario home budget: mortgage + property costs + debt + cash needed to close.</span></div>

  <section className="mortgageSeo"><h2>How much home can you afford in Ontario?</h2><p>Start with household income, but do not stop there. Canadian mortgage qualification also considers housing costs and other debts. Federal consumer guidance says total monthly housing costs generally should not exceed <strong>39% of gross household income (GDS)</strong>, while total debt load generally should not exceed <strong>44% (TDS)</strong>.</p><div className="article-callout"><strong>Ontario 2026 planning checklist</strong><p>Test your budget against <strong>GDS/TDS</strong>, the federal <strong>mortgage stress test</strong>, your <strong>minimum down payment</strong>, Ontario <strong>land transfer tax</strong>, closing costs and a realistic monthly cash-flow buffer.</p></div></section>

  <MortgageAffordability/>

  <section className="mortgageSeo"><h2>Mortgage stress test in Ontario</h2><p>Ontario borrowers using federally regulated lenders are generally subject to Canada's mortgage qualifying framework. OSFI currently sets the minimum qualifying rate for uninsured mortgages at the greater of <strong>5.25%</strong> or the <strong>mortgage contract rate plus 2 percentage points</strong>.</p><div className="decision-grid"><section><h3>4.5% contract rate</h3><p>4.5% + 2% = <strong>6.5%</strong>, so 6.5% is the qualifying rate because it is above the 5.25% floor.</p></section><section><h3>3.0% contract rate</h3><p>3.0% + 2% = 5.0%, so the <strong>5.25%</strong> floor is higher.</p></section></div><p>The calculator above is a planning tool and does not replace a lender's full stress-test calculation or underwriting.</p></section>

  <section className="mortgageSeo"><h2>Ontario GDS and TDS ratios</h2><table className="article-table"><thead><tr><th>Ratio</th><th>General guideline</th><th>What it considers</th></tr></thead><tbody><tr><td>GDS</td><td>39%</td><td>Mortgage payment, property taxes, heating and 50% of condo fees where applicable</td></tr><tr><td>TDS</td><td>44%</td><td>Housing costs plus other debts such as car loans, credit cards and lines of credit</td></tr></tbody></table><p>A household can have a strong income and still lose mortgage capacity when monthly debt payments are high. Reducing consumer debt before applying can therefore change the amount of housing payment that fits inside TDS.</p></section>

  <section className="mortgageSeo"><h2>Minimum down payment in Ontario</h2><table className="article-table"><thead><tr><th>Purchase price</th><th>Federal minimum down payment</th></tr></thead><tbody><tr><td>$500,000 or less</td><td>5% of purchase price</td></tr><tr><td>Over $500,000 and under $1.5M</td><td>5% of first $500K + 10% of the portion above $500K</td></tr><tr><td>$1.5M or more</td><td>20%</td></tr></tbody></table><p>With less than 20% down, mortgage loan insurance is typically required, subject to eligibility and lender rules. Use the <Link href="/down-payment-calculator/">Down Payment Calculator</Link> to turn a target home price into a cash goal.</p></section>

  <section className="mortgageSeo"><h2>Ontario land transfer tax can change the cash you need</h2><p>Ontario land transfer tax is progressive. Current provincial rates are 0.5% on the first $55,000, 1% from $55,000 to $250,000, 1.5% from $250,000 to $400,000, 2% above $400,000, and 2.5% on the portion above $2 million where the property contains one or two single-family residences.</p><p>That tax is separate from the mortgage itself, so it belongs in your cash-to-close plan. Buyers in Toronto should also check the city's municipal land transfer tax. Legal fees, title insurance, adjustments and other closing expenses can add more.</p><p><Link href="/closing-cost-calculator/">Estimate closing costs →</Link></p></section>

  <section className="mortgageSeo"><h2>Ontario affordability examples</h2><p>Rather than treating salary as a direct home-price multiple, test the same income under different debt and interest-rate scenarios. A $100,000 household with no consumer debt can have a very different mortgage range from a $100,000 household carrying a large car loan and revolving credit balance. Property taxes and condo fees can also materially change GDS.</p><p>For a broader Canadian benchmark, visit the <Link href="/mortgage-affordability-calculator/">Mortgage Affordability Calculator Canada</Link>. For Toronto-specific cost planning, compare the <Link href="/cities/toronto/">Toronto city guide</Link> and <Link href="/articles/how-much-rent-can-i-afford-toronto-2026/">Toronto rent affordability guide</Link>.</p></section>

  <section className="mortgageSeo"><h2>Build the full Ontario home-buying budget</h2><p><Link href="/mortgage-affordability-calculator/">Canada Mortgage Affordability →</Link> &nbsp; <Link href="/down-payment-calculator/">Down Payment →</Link> &nbsp; <Link href="/closing-cost-calculator/">Closing Costs →</Link> &nbsp; <Link href="/take-home-pay-calculator/">Take-Home Pay →</Link> &nbsp; <Link href="/salary-needed-calculator/">Salary Needed →</Link></p></section>

  <section className="mortgageSeo"><h2>Ontario mortgage affordability FAQ</h2>{faq.map(([q,a])=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
  <section className="mortgageSeo"><h2>Important</h2><p>This calculator is for educational planning and is not financial advice, a mortgage quote or a pre-approval. Mortgage rules and lender underwriting can change. Confirm current qualification, insurance, tax and closing-cost requirements before purchasing a home.</p></section>
 </main>
}