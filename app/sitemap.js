import {pages} from './data';
import {CITY_SLUGS,citySlug} from './citySlugs';
import {SITE_URL} from './site';

const pairs=[['Toronto','Calgary'],['Toronto','Vancouver'],['Toronto','Montreal'],['New York City','Miami'],['New York City','Chicago'],['Los Angeles','Miami']];
const standalone=['compare-cities','dashboard','salary-needed-calculator','closing-cost-calculator','my-plan','goal-planner','80000-salary-after-tax','about','contact','privacy','terms','disclaimer'];

export default function sitemap(){
 const base=SITE_URL,now=new Date();
 const urls=[
  base,
  ...standalone.map(slug=>`${base}/${slug}/`),
  ...pages.map(p=>`${base}/${p.slug}/`),
  ...Object.keys(CITY_SLUGS).map(s=>`${base}/cities/${s}/`),
  ...pairs.map(([a,b])=>`${base}/compare/${citySlug(a)}-vs-${citySlug(b)}/`)
 ];
 return [...new Set(urls)].map(url=>({url,lastModified:now}));
}
