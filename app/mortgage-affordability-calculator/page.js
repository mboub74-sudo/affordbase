import MortgageAffordability from '../components/MortgageAffordability';
import Link from 'next/link';
import {SITE_URL} from '../site';

const slug='/mortgage-affordability-calculator/';
const url=`${SITE_URL}${slug}`;
const title='Mortgage Affordability Calculator Canada 2026';
const description='Free Canadian mortgage affordability calculator. Estimate how much home you can afford using income, debt, down payment, mortgage rate, GDS/TDS ratios and the 2026 mortgage stress test.';

export const metadata={title,description,alternates:{canonical:slug},openGraph:{title,description,url,type:'website',siteName:'AffordBase'}};

const faq=[
 ['How much mortgage can I afford in Canada?','Your mortgage affordability depends on verified household income, housing costs, existing debts, down payment, mortgage rate and lender underwriting. Canadian guidance commonly uses GDS and TDS debt-service ratios, while federally regulated lenders also apply a mortgage stress test.'],
 ['What are GDS and TDS ratios?','GDS measures monthly housing costs relative to gross household income. Federal consumer guidance says housing costs generally should not exceed 39% of gross household income. TDS adds other debt payments and generally should not exceed 44%.'],
 ['What is the Canadian mortgage stress test in 2026?','For federally regulated lenders, borrowers generally qualify at the higher of 5.25% or the mortgage contract rate plus 2 percentage points. Rules and exceptions can differ, including certain uninsured straight switches at renewal.'],
 ['What is the minimum down payment in Canada?','For homes priced at $500,000 or less, the federal minimum is 5%. From $500,000 to under $1.5 million, it is 5% of the first $500,000 plus 10% of the portion above $500,000. At $1.5 million or more, the minimum is 20%.'],
 ['Do I need mortgage insurance with less than 20% down?','Typically yes. Federal guidance says buyers putting less than 20% down will generally need mortgage loan insurance, subject to eligibility and lender requirements.'],
 ['Does this calculator provide a mortgage pre-approval?','No. AffordBase provides an educational planning estimate. A lender may calculate income, debt, property costs, insurance and qualification differently.']
];

export default function Page(){
 const appSchema={'@context':'https://schema.org','@type':'WebApplication',name:'Mortgage Affordability Calculator Canada',url,applicationCategory:'FinanceApplication',operatingSystem:'Any',description,offers:{'@type':'Offer',price:'0',priceCurrency:'CAD'}};
 const breadcrumb={'@context':'https://schema.org','@type':'BreadcrumbList',itemListElement:[{'@type':'ListItem',position:1,name:'AffordBase',item:SITE_URL},{'@type':'ListItem',position:2,name:'Mortgage Affordability Calculator Canada',item:url}]};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([name,text])=>({'@type':'Question',name,acceptedAnswer:{'@type':'Answer',text}}))};
 return <main>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(appSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(breadcrumb)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <section className="subhero"><div className="pill">CANADA · 2026 MORTGAGE AFFORDABILITY</div><p className="breadcrumb"><Link href="/">AffordBase</Link> / Mortgage Affordability Calculator Canada</p><h1>Mortgage Affordability Calculator <em>Canada 2026</em></h1><p>Estimate how much home you can afford from household income, down payment, debt and ownership costs—then compare the result with Canada's debt-service ratios and mortgage stress-test framework.</p></section>
  <div className="page-visual visual-home" role="img" aria-label="Canadian home affordability planning"><span>Income → debt → stress test → down payment → realistic home budget.</span></div>

  <section className="mortgageSeo"><h2>How much mortgage can you afford in Canada?</h2><p>A lender does not look at salary alone. Mortgage qualification can depend on verified gross household income, mortgage payments, property taxes, heating costs, condo fees, other monthly debt and your qualifying interest rate. For personal planning, you should also consider closing costs, maintenance, utilities and an emergency fund.</p><div className="article-callout"><strong>2026 Canadian qualification framework</strong><p>Federal consumer guidance uses a <strong>39% GDS</strong> guideline for monthly housing costs and a <strong>44% TDS</strong> guideline after other debts are included. The mortgage stress test generally uses the higher of <strong>5.25%</strong> or your contract rate <strong>+2 percentage points</strong>.</p></div></section>

  <MortgageAffordability/>

  <section className="mortgageSeo"><h2>Canada mortgage affordability: GDS and TDS</h2><p><strong>Gross Debt Service (GDS)</strong> compares housing costs with gross household income. Housing costs generally include the mortgage payment, property taxes, heating and 50% of condo fees where applicable. Federal guidance says these monthly housing costs generally should not exceed 39% of gross household income.</p><p><strong>Total Debt Service (TDS)</strong> adds other debt obligations such as car loans, credit cards, lines of credit and student loans. Federal guidance uses 44% of gross household income as the general TDS threshold.</p><p>These ratios are qualification guidelines rather than a promise that a particular lender will approve a specific mortgage.</p></section>

  <section className="mortgageSeo"><h2>Mortgage stress test Canada 2026</h2><p>Canada's stress test is designed to check whether a borrower could handle payments at a higher rate. The current minimum qualifying rate for uninsured mortgages at federally regulated lenders is the greater of the mortgage contract rate plus 2 percentage points or 5.25%. Federal consumer guidance describes the same qualifying-rate test for insured and uninsured mortgages.</p><div className="decision-grid"><section><h3>Example: 4.5% contract rate</h3><p>Contract rate + 2% = <strong>6.5%</strong>, so 6.5% is above the 5.25% floor and becomes the qualifying rate.</p></section><section><h3>Example: 3.0% contract rate</h3><p>Contract rate + 2% = 5.0%, so the <strong>5.25%</strong> floor is higher.</p></section></div><p>There are exceptions and lender-specific details. OSFI, for example, does not prescribe this MQR for certain uninsured straight switches at renewal when the loan amount and remaining amortization are not increased.</p></section>

  <section className="mortgageSeo"><h2>Minimum down payment in Canada</h2><table className="article-table"><thead><tr><th>Home price</th><th>Federal minimum down payment</th></tr></thead><tbody><tr><td>$500,000 or less</td><td>5% of purchase price</td></tr><tr><td>Over $500,000 and under $1.5M</td><td>5% of first $500K + 10% of amount above $500K</td></tr><tr><td>$1.5M or more</td><td>20%</td></tr></tbody></table><p>If your down payment is below 20%, you will typically need mortgage loan insurance, subject to eligibility and lender requirements. A larger down payment can reduce the mortgage required and may materially change monthly affordability.</p><p><Link href="/down-payment-calculator/">Calculate your down payment →</Link></p></section>

  <section className="mortgageSeo"><h2>What changes your affordable home price?</h2><div className="decision-grid"><section><h3>Income & debt</h3><p>Higher qualifying income increases capacity, while car loans, credit cards and other debt consume TDS room.</p></section><section><h3>Mortgage rate</h3><p>A higher rate means the same mortgage balance requires a larger payment and can reduce your qualifying amount.</p></section></div><div className="decision-grid"><section><h3>Property costs</h3><p>Property tax, heating and condo fees can reduce the amount available for the mortgage itself.</p></section><section><h3>Down payment</h3><p>More cash down reduces the mortgage balance and can change mortgage-insurance requirements.</p></section></div></section>

  <section className="mortgageSeo"><h2>Continue your home affordability plan</h2><p>Once you have a target home price, calculate the cash required to buy and test the payment against the rest of your monthly budget.</p><p><Link href="/down-payment-calculator/">Down Payment Calculator →</Link> &nbsp; <Link href="/closing-cost-calculator/">Closing Cost Calculator →</Link> &nbsp; <Link href="/salary-needed-calculator/">Salary Needed Calculator →</Link> &nbsp; <Link href="/take-home-pay-calculator/">Take-Home Pay →</Link> &nbsp; <Link href="/dashboard/">Budget Dashboard →</Link></p></section>

  <section className="mortgageSeo"><h2>Mortgage affordability FAQ</h2>{faq.map(([q,a])=><div key={q}><h3>{q}</h3><p>{a}</p></div>)}</section>
  <section className="mortgageSeo"><h2>Important</h2><p>AffordBase provides educational estimates, not financial advice, a mortgage quote or a pre-approval. Actual qualification depends on lender underwriting, verified income, credit, debts, property details, mortgage insurance and current rules. Confirm the current requirements with your lender or mortgage professional before making a purchase decision.</p></section>
 </main>
}