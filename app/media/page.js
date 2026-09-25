import Link from 'next/link';

export const metadata={
 title:'Media — Pinterest Pin Gallery',
 description:'Browse AffordBase Pinterest-ready mortgage, rent, salary, car, city and home planning visuals.',
 alternates:{canonical:'/media/'}
};

const categories=[
 {name:'Mortgage',href:'#mortgage',count:'60 pins',active:true},
 {name:'Rent',href:'#coming-soon',count:'Coming soon'},
 {name:'Salary',href:'#coming-soon',count:'Coming soon'},
 {name:'Car',href:'#coming-soon',count:'Coming soon'},
 {name:'Cities',href:'#coming-soon',count:'Coming soon'},
 {name:'Home',href:'#coming-soon',count:'Coming soon'}
];

const mortgagePages=[
 ['Mortgage Affordability Calculator Canada','/mortgage-affordability-calculator/'],
 ['Mortgage Affordability Calculator Ontario','/mortgage-affordability-calculator-ontario/'],
 ['Mortgage Affordability Calculator Alberta','/mortgage-affordability-calculator-alberta/'],
 ['Mortgage Affordability Calculator Quebec','/mortgage-affordability-calculator-quebec/'],
 ['$60K Salary Mortgage Affordability','/house-affordability-60000-salary/'],
 ['$70K Salary Mortgage Affordability','/house-affordability-70000-salary/'],
 ['$80K Salary Mortgage Affordability','/house-affordability-80000-salary/'],
 ['$90K Salary Mortgage Affordability','/house-affordability-90000-salary/'],
 ['$100K Salary Mortgage Affordability','/house-affordability-100000-salary/'],
 ['$120K Salary Mortgage Affordability','/house-affordability-120000-salary/'],
 ['$150K Salary Mortgage Affordability','/house-affordability-150000-salary/'],
 ['Income Needed for a $300K Mortgage','/income-needed-for-300k-mortgage/'],
 ['Income Needed for a $350K Mortgage','/income-needed-for-350k-mortgage/'],
 ['Income Needed for a $400K Mortgage','/income-needed-for-400k-mortgage/'],
 ['Income Needed for a $450K Mortgage','/income-needed-for-450k-mortgage/'],
 ['Income Needed for a $500K Mortgage','/income-needed-for-500k-mortgage/'],
 ['Income Needed for a $600K Mortgage','/income-needed-for-600k-mortgage/'],
 ['House Affordability by Salary','/house-affordability-by-salary/'],
 ['Mortgage Payment Calculator Canada','/mortgage-payment-calculator-canada/'],
 ['Mortgage Stress Test Calculator Canada 2026','/mortgage-stress-test-calculator-canada/']
];

export default function MediaPage(){
 return <main className="media-page">
  <section className="media-hero">
   <span>AFFORDBASE MEDIA</span>
   <h1>Pin Gallery</h1>
   <p>One organized home for AffordBase Pinterest creatives. Every published image links directly to the calculator or guide it promotes.</p>
  </section>
  <nav className="media-categories" aria-label="Media categories">
   {categories.map(c=><a key={c.name} href={c.href} className={c.active?'active':''}><b>{c.name}</b><small>{c.count}</small></a>)}
  </nav>
  <section id="mortgage" className="media-section">
   <div className="media-section-head"><div><span>MORTGAGE CLUSTER</span><h2>Mortgage Pinterest Pins</h2></div><p>20 landing pages · 3 creatives per page · 60 pins</p></div>
   <div className="media-placeholder-grid">
    {mortgagePages.map(([title,href],i)=><article key={href} className="media-placeholder-card">
      <Link href={href} aria-label={title}><div className="media-pin-placeholder"><span>{String(i+1).padStart(2,'0')}</span><strong>{title}</strong><small>3 Pinterest creatives</small></div></Link>
      <div><b>{title}</b><Link href={href}>Open page →</Link></div>
    </article>)}
   </div>
   <p className="media-note">Pin image slots are reserved here. Public image URLs will use <code>/media/pins/mortgage/...</code> as each creative is published.</p>
  </section>
  <section id="coming-soon" className="media-coming"><h2>More galleries next</h2><p>Rent, Salary, Car, Cities and Home collections will use the same structure.</p></section>
 </main>
}