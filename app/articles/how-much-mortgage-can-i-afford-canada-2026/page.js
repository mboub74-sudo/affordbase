import Link from 'next/link';
import {SITE_URL} from '../../site';

const slug='/articles/how-much-mortgage-can-i-afford-canada-2026/';
const url=`${SITE_URL}${slug}`;
const title='How Much Mortgage Can I Afford in Canada? 2026 Guide';
const description='Learn how much mortgage you may afford in Canada in 2026 using income, GDS and TDS ratios, the mortgage stress test, down payment, debt and housing costs.';

export const metadata={title,description,alternates:{canonical:slug},openGraph:{title,description,url,type:'article',siteName:'AffordBase'}};

const faq=[
 ['How much mortgage can I afford in Canada?','It depends on household income, down payment, mortgage rate, property costs and existing debts. Canadian qualification commonly considers GDS and TDS debt-service ratios and a mortgage stress test.'],
 ['What are the GDS and TDS limits?','Federal consumer guidance says monthly housing costs generally should not exceed 39% of gross household income, while total debt load generally should not exceed 44%.'],
 ['What is the mortgage stress test in Canada in 2026?','Federally regulated lenders generally qualify borrowers at the higher of 5.25% or the mortgage contract rate plus 2 percentage points.'],
 ['How much down payment do I need?','The federal minimum is 5% for homes up to $500,000; from $500,000 to under $1.5 million it is 5% of the first $500,000 plus 10% of the portion above; at $1.5 million or more it is 20%.'],
 ['Does AffordBase provide mortgage approval?','No. AffordBase provides educational planning estimates. Actual approval depends on lender underwriting, verified income, credit, debts, property details and current rules.']
];

export default function Page(){
 const articleSchema={'@context':'https://schema.org','@type':'Article',headline:title,description,url,mainEntityOfPage:url,publisher:{'@type':'Organization',name:'AffordBase',url:SITE_URL}};
 const faqSchema={'@context':'https://schema.org','@type':'FAQPage',mainEntity:faq.map(([q,a])=>({'@type':'Question',name:q,acceptedAnswer:{'@type':'Answer',text:a}}))};
 return <main className="landing">
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(articleSchema)}}/>
  <script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(faqSchema)}}/>
  <div className="crumb"><Link href="/">Home</Link> / <Link href="/articles/">Articles</Link> / How Much Mortgage Can I Afford in Canada?</div>
  <article className="content">
   <div className="eyebrow">CANADA · MORTGAGE GUIDE · 2026</div>
   <h1>How Much Mortgage Can I Afford in Canada? 2026 Guide</h1>
   <p className="lede">The mortgage you can afford in Canada is not determined by salary alone. Lenders look at income, housing costs, existing debt, your down payment and the interest rate used to qualify you. For a useful personal estimate, you also need to think about the costs that continue after you get the keys.</p>
   <figure style={{margin:'28px 0 34px'}}><img src="/images/mortgage-affordability-canada-2026.jpg" alt="How much mortgage can I afford in Canada 2026 guide with home affordability factors" width="1536" height="1024" loading="eager" style={{width:'100%',height:'auto',borderRadius:'18px',display:'block'}}/><figcaption style={{marginTop:'8px',fontSize:'0.9rem',opacity:.75}}>Mortgage affordability in Canada depends on income, down payment, interest rates, debt and monthly housing costs.</figcaption></figure>

   <section className="quickanswer"><strong>Quick answer:</strong> Canadian mortgage qualification commonly starts with two debt-service measures. Housing costs generally should stay at or below <strong>39% of gross household income (GDS)</strong>, while housing costs plus other debt generally should stay at or below <strong>44% (TDS)</strong>. You must also account for the mortgage stress test, which can make the qualifying payment higher than the payment at your contract rate.</section>

   <h2>How mortgage affordability works in Canada</h2>
   <p>Mortgage affordability answers a different question from mortgage payment. A payment calculator tells you what a particular mortgage may cost each month. An affordability calculation works backward from your income and obligations to estimate how much housing cost your budget and qualification ratios may support.</p>
   <p>The main inputs are your gross household income, down payment, mortgage rate, amortization, property taxes, heating costs, condo fees where applicable, and monthly debt payments. Credit history, income documentation, the property and lender-specific underwriting can also affect the final decision.</p>
   <p><Link href="/mortgage-affordability-calculator/"><strong>Use the Canada Mortgage Affordability Calculator →</strong></Link></p>

   <h2>Step 1: Start with gross household income</h2>
   <p>Canadian debt-service ratios use gross income rather than the amount deposited into your bank account after tax. If a household earns $100,000 a year, gross monthly income is about $8,333. That figure is a starting point, not an automatic mortgage budget.</p>
   <p>A lender then compares eligible housing costs and debt payments with that gross income. This is why two households earning the same salary can qualify for very different mortgage amounts: one may have a large car payment and credit-card debt, while the other may have little or no monthly debt.</p>

   <h2>Step 2: Understand the 39% GDS guideline</h2>
   <p>Gross Debt Service, or GDS, measures housing costs against gross household income. Federal consumer guidance says total monthly housing costs generally should not exceed 39% of gross household income. Those housing costs include the mortgage payment, property taxes, heating costs and 50% of condo fees when applicable.</p>
   <p>For example, 39% of $8,333 in gross monthly income is about $3,250. That does <em>not</em> mean a household can automatically spend $3,250 on the mortgage payment itself. Property tax, heating and applicable condo costs consume part of that housing-cost room.</p>

   <h2>Step 3: Check the 44% TDS guideline</h2>
   <p>Total Debt Service, or TDS, takes the housing costs used in GDS and adds other debt obligations. Federal guidance uses 44% of gross income as the general threshold. Other debts can include car loans, credit cards, lines of credit, student loans and support payments.</p>
   <p>Using the same $8,333 monthly gross income, 44% is about $3,667. If the household already has $700 of qualifying monthly debt, substantially less room remains for housing costs. Paying down debt before buying can therefore affect mortgage capacity even when salary does not change.</p>

   <h2>Step 4: Apply the Canada mortgage stress test</h2>
   <p>The stress test is one of the most important reasons an online payment at the advertised mortgage rate is not the same as a qualification estimate. Federally regulated lenders generally test affordability using the higher of <strong>5.25%</strong> or the mortgage contract rate <strong>plus 2 percentage points</strong>.</p>
   <p>If your contract rate were 4.5%, adding two percentage points gives a 6.5% qualifying rate. Because 6.5% is higher than 5.25%, qualification would be tested at 6.5%. The higher qualifying rate creates a larger modeled payment and can reduce the mortgage amount supported by the same income.</p>
   <p><Link href="/mortgage-stress-test-calculator-canada/">Test your qualifying rate with the Mortgage Stress Test Calculator →</Link></p>

   <h2>Step 5: Factor in your down payment</h2>
   <p>Your down payment changes both the mortgage you need and, in some cases, mortgage-insurance requirements. The federal minimum down payment is 5% of the purchase price for a home priced at $500,000 or less. For a home above $500,000 and below $1.5 million, the minimum is 5% of the first $500,000 plus 10% of the portion above $500,000. At $1.5 million or more, the minimum is 20%.</p>
   <p>A down payment below 20% will typically require mortgage loan insurance, subject to eligibility. A larger down payment reduces the principal you need to borrow, but buyers should avoid using every dollar of available cash for the down payment because closing costs and a post-purchase cash buffer matter too.</p>
   <p><Link href="/down-payment-calculator/">Calculate the down payment and savings target →</Link></p>

   <h2>Mortgage affordability example</h2>
   <p>Suppose a household earns $120,000 gross per year, or $10,000 per month. A 39% GDS reference corresponds to $3,900 of monthly housing costs. A 44% TDS reference corresponds to $4,400 for housing plus other qualifying debt.</p>
   <p>If that household has $800 of monthly debt, the simple TDS room left for housing is about $3,600. The actual mortgage supported by that amount still depends on the qualifying interest rate, amortization, property tax, heating, condo fees if applicable, down payment and lender underwriting. This is why converting salary directly into a fixed home price is misleading.</p>

   <h2>Salary is only one part of the answer</h2>
   <p>Increasing income can increase borrowing capacity, but reducing recurring debt can also make a meaningful difference. A household considering a home purchase should test more than one scenario: current debt versus paid-down debt, different down payments, and mortgage rates above the hoped-for contract rate.</p>
   <p>AffordBase also has salary-specific planning pages for households who want to explore the relationship from the income side, including <Link href="/house-affordability-80000-salary/">$80K salary</Link>, <Link href="/house-affordability-100000-salary/">$100K salary</Link>, <Link href="/house-affordability-120000-salary/">$120K salary</Link> and <Link href="/house-affordability-150000-salary/">$150K salary</Link>.</p>

   <h2>Mortgage amount vs. home price</h2>
   <p>Do not confuse the mortgage balance with the purchase price. If a home costs $600,000 and you contribute a $100,000 down payment, the amount financed begins from a different base than the $600,000 purchase price. Mortgage insurance, where applicable, can also affect the financed balance.</p>
   <p>Likewise, asking “what income do I need for a $500,000 mortgage?” is different from asking “what income do I need for a $500,000 home?” AffordBase separates these questions so the estimates are easier to interpret. See the <Link href="/income-needed-for-500k-mortgage/">Income Needed for a $500K Mortgage</Link> guide for that scenario.</p>

   <h2>Do not forget the costs outside the mortgage</h2>
   <p>A lender qualification ceiling is not necessarily a comfortable personal budget. Homeowners may also need to pay home insurance, utilities, maintenance, repairs and, depending on the property and location, condo fees or other recurring costs. Buyers also face one-time closing expenses.</p>
   <p>A useful plan therefore has two tests: “Could I qualify?” and “Would this payment leave enough room for the rest of my life?” The second question is where take-home pay, emergency savings and personal goals become especially important.</p>
   <p><Link href="/mortgage-payment-calculator-canada/">Calculate the monthly mortgage payment →</Link> &nbsp; <Link href="/closing-cost-calculator/">Estimate closing costs →</Link></p>

   <h2>How to improve your mortgage affordability</h2>
   <p>There is no single trick that guarantees a larger approval. In planning terms, however, the main levers are straightforward: increase qualifying income, reduce monthly debt obligations, build a larger down payment, choose a lower-priced property, or compare how different rates and amortization assumptions affect the payment. Improving credit and keeping documentation organized may also matter to lender underwriting.</p>
   <p>The strongest target is not necessarily the maximum amount a lender might approve. Leaving room for savings, repairs, rate changes and unexpected expenses can make homeownership more resilient.</p>

   <h2>Mortgage affordability checklist before you shop</h2>
   <ul>
    <li>Calculate your gross household income and document the sources.</li>
    <li>List every recurring debt payment.</li>
    <li>Estimate property taxes, heating and condo fees for the type of home you want.</li>
    <li>Test the mortgage at the applicable qualifying rate, not only the advertised contract rate.</li>
    <li>Confirm the minimum down payment and whether mortgage insurance may apply.</li>
    <li>Keep closing costs and emergency savings separate from the down payment.</li>
    <li>Compare the resulting housing cost with your actual take-home budget.</li>
   </ul>

   <h2>Frequently asked questions</h2>
   {faq.map(([q,a])=><div className="faqItem" key={q}><h3>{q}</h3><p>{a}</p></div>)}

   <h2>Calculate your own 2026 home budget</h2>
   <p>Start with the <Link href="/mortgage-affordability-calculator/">Mortgage Affordability Calculator Canada</Link>, then use the <Link href="/mortgage-payment-calculator-canada/">Mortgage Calculator Canada</Link> to test the monthly payment. From there, check your <Link href="/down-payment-calculator/">down payment</Link>, <Link href="/closing-cost-calculator/">closing costs</Link> and <Link href="/mortgage-stress-test-calculator-canada/">stress-test rate</Link>. Together, these tools provide a much more useful planning picture than salary alone.</p>

   <p><small><strong>Important:</strong> AffordBase provides educational planning estimates, not financial advice, a mortgage quote or pre-approval. Mortgage rules and lender underwriting can change. Confirm current requirements and your eligibility with your lender or mortgage professional before making a purchase decision.</small></p>
  </article>
 </main>;
}
