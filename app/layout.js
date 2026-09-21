import './globals.css';
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
export default function Layout({children}){
 const schema={"@context":"https://schema.org","@graph":[{"@type":"WebSite","name":"AffordBase","url":SITE_URL,"description":"Affordability and financial planning calculators for the US and Canada."},{"@type":"Organization","name":"AffordBase","url":SITE_URL}]};
 return <html lang="en"><body>{children}<script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema)}}/></body></html>
}
