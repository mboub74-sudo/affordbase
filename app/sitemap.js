import {pages} from './data';
import {CITY_SLUGS,citySlug} from './citySlugs';
import {SITE_URL} from './site';

const redirectedCitySlugs=new Set(['salary-needed-to-live-in-toronto','salary-needed-to-live-in-vancouver','salary-needed-to-live-in-montreal','salary-needed-to-live-in-calgary','salary-needed-to-live-in-new-york','salary-needed-to-live-in-miami']);

const pairs=[['Toronto','Calgary'],['Toronto','Vancouver'],['Toronto','Montreal'],['New York City','Miami'],['New York City','Chicago'],['Los Angeles','Miami']];
const standalone=['compare-cities','dashboard','salary-needed-calculator','closing-cost-calculator','my-plan','goal-planner','80000-salary-after-tax','about','contact','privacy','terms','disclaimer'];

export default function sitemap(){
 const base=SITE_URL,now=new Date();
 const urls=[
  base,
  ...standalone.map(slug=>`${base}/${slug}/`),
  ...pages.filter(p=>!redirectedCitySlugs.has(p.slug)).map(p=>`${base}/${p.slug}/`),
  ...Object.keys(CITY_SLUGS).map(s=>`${base}/cities/${s}/`),
  ...pairs.map(([a,b])=>`${base}/compare/${citySlug(a)}-vs-${citySlug(b)}/`)
 ];
 return [...new Set(urls)].map(url=>({url,lastModified:now}));
}
