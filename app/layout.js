import './globals.css';
import './visual-upgrade.css';
import Link from 'next/link';
import {SITE_URL} from './site';

export const metadata={
 metadataBase:new URL(SITE_URL),
 title:{default:'AffordBase — Know What You Can Afford',template:'%s | AffordBase'},
 description:'Free affordability and financial planning calculators for salary, rent, cars, cities, savings and home buying in the US and Canada.',
 applicationName:'AffordBase',
 alternates:{canonical:'/'},
 openGraph:{type:'website',siteName:'AffordBase',title:'AffordBase — Know What You Can Afford',description:'Plan salary, rent, car, city, savings and home goals with practical affordability tools.',url:SITE_URL},
 twitter:{card:'summary_large_image',title:'AffordBase — Know What You Can Afford',description:'Practical affordability and financial planning tools for the US and Canada.'},
 robots:{index:true,follow:true},
};
export const viewport={width:'device-width',initialScale:1,themeColor:'#173f2b'};

function SiteHeader(){
 return <header className="site-header">
  <Link className="brand" href="/">AffordBase<span>.</span></Link>
  <nav className="main-nav" aria-label="Main navigation">
   <Link href="/dashboard/">Dashboard</Link>
   <Link href="/take-home-pay-calculator/">Salary</Link>
   <Link href="/rent-affordability-calculator/">Rent</Link>
   <Link href="/car-affordability-calculator/">Car</Link>
   <Link href="/mortgage-affordability-calculator/">Home</Link>
   <Link href="/compare-cities/">Cities</Link>
   <Link href="/goal-planner/">Goals</Link>
   <Link href="/articles/">Articles</Link>
  </nav>
  <Link className="header-cta" href="/dashboard/">Plan my budget</Link>
 </header>
}

function SiteFooter(){
 return <footer className="site-footer">
  <div className="footer-grid">
   <div className="footer-brand"><Link className="brand" href="/">AffordBase<span>.</span></Link><p>Practical affordability tools for salary, rent, cars, cities, savings and home buying in Canada and the United States.</p></div>
   <div><h2>Calculators</h2><Link href="/take-home-pay-calculator/">Take-Home Pay</Link><Link href="/rent-affordability-calculator/">Rent Affordability</Link><Link href="/car-affordability-calculator/">Car Affordability</Link><Link href="/mortgage-affordability-calculator/">Mortgage Affordability</Link></div>
   <div><h2>Planning</h2><Link href="/dashboard/">Dashboard</Link><Link href="/salary-needed-calculator/">Salary Needed</Link><Link href="/compare-cities/">Compare Cities</Link><Link href="/goal-planner/">Goal Planner</Link></div>
   <div><h2>AffordBase</h2><Link href="/about/">About</Link><Link href="/contact/">Contact</Link><Link href="/privacy/">Privacy Policy</Link><Link href="/terms/">Terms of Use</Link><Link href="/disclaimer/">Financial Disclaimer</Link></div>
  </div>
  <div className="footer-bottom"><span>© 2026 AffordBase. All rights reserved.</span><span>Estimates are for informational planning purposes only.</span></div>
 </footer>
}

export default function Layout({children}){
 const schema={"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"AffordBase","url":SITE_URL,"description":"Affordability and financial planning calculators for the US and Canada."},{"@type":"Organization","name":"AffordBase","url":SITE_URL,"email":"affordbase@gmail.com"}]};
 return <html lang="en"><body><SiteHeader/>{children}<SiteFooter/><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}