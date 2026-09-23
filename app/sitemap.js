import {pages} from './data';
import {CITY_SLUGS,citySlug} from './citySlugs';
import {SITE_URL} from './site';

const redirectedCitySlugs=new Set(['salary-needed-to-live-in-toronto','salary-needed-to-live-in-vancouver','salary-needed-to-live-in-montreal','salary-needed-to-live-in-calgary','salary-needed-to-live-in-new-york','salary-needed-to-live-in-miami']);

const pairs=[['Toronto','Calgary'],['Toronto','Vancouver'],['Toronto','Montreal'],['New York City','Miami'],['New York City','Chicago'],['Los Angeles','Miami']];
const standalone=['articles','articles/canadian-cities-70k-salary-cost-of-living','articles/mortgage-vs-rent-true-monthly-cost-homeownership','articles/how-much-should-you-spend-on-rent-30-rule','articles/how-much-house-can-i-afford-100k-salary-canada','articles/is-renting-getting-cheaper-canada-2026','articles/vancouver-vs-toronto-cost-of-living','articles/toronto-vs-calgary-cost-of-living-2026','articles/how-much-rent-can-i-afford-toronto-2026','articles/rent-vs-buy-canada-2026','articles/income-needed-to-buy-house-canada-2026','compare-cities','dashboard','salary-needed-calculator','closing-cost-calculator','goal-planner','80000-salary-after-tax','about','contact','privacy','terms','disclaimer'];

export default function sitemap(){
 const base=SITE_URL;
 const urls=[
  base,
  ...standalone.map(slug=>`${base}/${slug}/`),
  ...pages.filter(p=>!redirectedCitySlugs.has(p.slug)).map(p=>`${base}/${p.slug}/`),
  ...Object.keys(CITY_SLUGS).map(s=>`${base}/cities/${s}/`),
  ...pairs.map(([a,b])=>`${base}/compare/${citySlug(a)}-vs-${citySlug(b)}/`)
 ];
 return [...new Set(urls)].map(url=>({url}));
}
