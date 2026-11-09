import {Fragment} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SITE_URL} from '../site';

export function guideMetadata(guide){
 const url=`${SITE_URL}${guide.canonicalPath || `/articles/${guide.slug}/`}`;
 const image={url:encodeURI(guide.image),width:1536,height:1024,alt:guide.alt};
 return {title:{absolute:`${guide.title} | AffordBase`},description:guide.description,alternates:{canonical:url},openGraph:{type:'article',url,title:guide.title,description:guide.description,siteName:'AffordBase',publishedTime:guide.datePublished || '2026-11-06T00:00:00+01:00',modifiedTime:guide.dateModified || guide.datePublished || '2026-11-06T00:00:00+01:00',images:[image]},twitter:{card:'summary_large_image',title:guide.title,description:guide.description,images:[image]}};
}
const headingId=text=>text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
export default function IllustratedFinancialGuide({guide}){
 const url=`${SITE_URL}${guide.canonicalPath || `/articles/${guide.slug}/`}`;
 const published=guide.datePublished || '2026-11-06T00:00:00+01:00';
 const modified=guide.dateModified || published;
 const dateLabel=value=>new Intl.DateTimeFormat('en-US',{month:'long',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(value.slice(0,10)+'T12:00:00Z'));
 const blocks=guide.body.split(/\n\s*\n/);
 const headings=blocks.filter(b=>b.startsWith('## ')).map(b=>b.slice(3));
 const schema={'@context':'https://schema.org','@type':'Article',headline:guide.title,description:guide.description,image:[guide.image,guide.secondaryImage].filter(Boolean).map(src=>`${SITE_URL}${encodeURI(src)}`),datePublished:published,dateModified:modified,author:{'@type':'Organization',name:'AffordBase',url:SITE_URL},publisher:{'@type':'Organization',name:'AffordBase',url:SITE_URL},mainEntityOfPage:url,wordCount:guide.wordCount,inLanguage:'en',citation:guide.sources.map(s=>s[1])};
 return <main className="article-page"><script type="application/ld+json" dangerouslySetInnerHTML={{__html:JSON.stringify(schema).replace(/</g,'\\u003c')}}/><article className="article-shell">
  <nav className="article-crumb" aria-label="Breadcrumb"><Link href="/">Home</Link><span>›</span><Link href="/articles/">Articles</Link><span>›</span>{guide.tag}</nav>
  <header className="article-hero"><div className="article-kicker">{guide.tag} · CANADA &amp; US</div><h1>{guide.title}</h1><p className="article-deck">{guide.description}</p><p>By AffordBase · <time dateTime={published.slice(0,10)}>{dateLabel(published)}</time> · {Math.ceil(guide.wordCount/220)} min read</p><figure style={{margin:'24px 0'}}><Image src={encodeURI(guide.image)} sizes="(max-width: 768px) 100vw, 1100px" alt={guide.alt} width="1536" height="1024" priority style={{width:'100%',height:'auto',borderRadius:20,display:'block'}}/><figcaption style={{fontSize:13,marginTop:8,color:'#526354'}}>AI-generated editorial illustration.</figcaption></figure></header>
  <div className="article-layout" style={{gridTemplateColumns:"minmax(0,820px)"}}><div className="article-body">
   <nav aria-label="Article contents" className="article-callout"><strong>In this guide</strong><ul>{headings.map(h=><li key={h}><a href={`#${headingId(h)}`}>{h}</a></li>)}</ul></nav>
   {blocks.map((b,i)=><Fragment key={i}>{i===10 && guide.secondaryImage && <figure style={{margin:'28px 0'}}><Image src={encodeURI(guide.secondaryImage)} sizes="(max-width: 768px) 100vw, 820px" alt={guide.secondaryAlt} width={1536} height={1024} style={{width:'100%',height:'auto',borderRadius:16,display:'block'}}/><figcaption style={{fontSize:13,marginTop:8,color:'#526354'}}>AI-generated editorial illustration.</figcaption></figure>}{b.startsWith('### ')?<h3>{b.slice(4)}</h3>:b.startsWith('## ')?<h2 id={headingId(b.slice(3))} style={{scrollMarginTop:100}}>{b.slice(3)}</h2>:<p>{b}</p>}</Fragment>)}
   <section aria-label="Tools and related guides" className="article-callout"><h2>Put your plan into practice</h2><ul>{guide.tools.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul><h3>Related guides</h3><ul>{(guide.related || [['50-30-20-budget-rule','50/30/20 budget rule'],['how-much-emergency-fund-do-i-need','How much emergency savings do you need?'],['debt-snowball-vs-avalanche','Debt snowball vs avalanche']]).filter(([slug])=>slug!==guide.slug).map(([slug,label])=><li key={slug}><Link href={`/articles/${slug}/`}>{label}</Link></li>)}</ul></section>
   <section aria-label="Sources"><h2>Sources and editorial notes</h2><p>Official guidance reviewed {dateLabel(modified)}. Calculations and household scenarios are illustrative. This guide provides general educational information; individual circumstances and product terms differ.</p><ul>{guide.sources.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>
  </div></div>
 </article></main>;
}

