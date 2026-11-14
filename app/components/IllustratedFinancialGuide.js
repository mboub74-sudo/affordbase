import {Fragment} from 'react';
import Link from 'next/link';
import Image from 'next/image';
import {SITE_URL} from '../site';

export function guideMetadata(guide){
 const url=`${SITE_URL}${guide.canonicalPath || `/articles/${guide.slug}/`}`;
 const image={url:encodeURI(guide.image),width:guide.imageWidth || 1536,height:guide.imageHeight || 1024,alt:guide.alt};
 return {title:{absolute:`${guide.title} | AffordBase`},description:guide.description,alternates:{canonical:url},openGraph:{type:'article',url,title:guide.title,description:guide.description,siteName:'AffordBase',publishedTime:guide.datePublished || '2026-11-06T00:00:00+01:00',modifiedTime:guide.dateModified || guide.datePublished || '2026-11-06T00:00:00+01:00',images:[image]},twitter:{card:'summary_large_image',title:guide.title,description:guide.description,images:[image]}};
}
const headingId=text=>text.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/^-|-$/g,'');
function inlineText(text){
 return text.split(/(\[[^\]]+\]\([^\s)]+\))/g).map((part,i)=>{
  const link=part.match(/^\[([^\]]+)\]\(([^\s)]+)\)$/);
  if(!link || !/^(https:\/\/|\/(?!\/))/.test(link[2])) return part;
  return link[2].startsWith('/')?<Link key={i} href={link[2]}>{link[1]}</Link>:<a key={i} href={link[2]}>{link[1]}</a>;
 });
}
function guideBlock(block){
 if(block.startsWith('### ')) return <h3>{block.slice(4)}</h3>;
 if(block.startsWith('## ')) return <h2 id={headingId(block.slice(3))} style={{scrollMarginTop:100}}>{block.slice(3)}</h2>;
 if(block.startsWith('|')){
  const rows=block.trim().split('\n').map(row=>row.split('|').slice(1,-1).map(cell=>cell.trim()));
  if(rows.length>2 && rows[1].every(cell=>/^:?-{3,}:?$/.test(cell))){
   return <div className="guide-table-scroll" role="region" aria-label={`${rows[0][0]} comparison table`} tabIndex={0}><table className="guide-comparison-table"><thead><tr>{rows[0].map((cell,i)=><th key={i} scope="col">{inlineText(cell)}</th>)}</tr></thead><tbody>{rows.slice(2).map((row,i)=><tr key={i}>{row.map((cell,j)=>j===0?<th key={j} scope="row">{inlineText(cell)}</th>:<td key={j}>{inlineText(cell)}</td>)}</tr>)}</tbody></table></div>;
  }
 }
 return <p>{inlineText(block)}</p>;
}
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
  <header className="article-hero"><div className="article-kicker">{guide.tag} · {guide.region || 'CANADA & US'}</div><h1>{guide.title}</h1><p className="article-deck">{guide.description}</p><p>By AffordBase · <time dateTime={published.slice(0,10)}>{dateLabel(published)}</time> · {Math.ceil(guide.wordCount/220)} min read</p><figure style={{margin:'24px 0'}}><Image src={encodeURI(guide.image)} sizes="(max-width: 768px) 100vw, 1100px" alt={guide.alt} width={guide.imageWidth || 1536} height={guide.imageHeight || 1024} priority style={{width:'100%',height:'auto',borderRadius:20,display:'block'}}/><figcaption style={{fontSize:13,marginTop:8,color:'#526354'}}>AI-generated editorial illustration.</figcaption></figure></header>
  <div className="article-layout" style={{gridTemplateColumns:"minmax(0,820px)"}}><div className="article-body">
   <nav aria-label="Article contents" className="article-callout"><strong>In this guide</strong><ul>{headings.map(h=><li key={h}><a href={`#${headingId(h)}`}>{h}</a></li>)}</ul></nav>
   {blocks.map((b,i)=><Fragment key={i}>{i===10 && guide.secondaryImage && <figure style={{margin:'28px 0'}}><Image src={encodeURI(guide.secondaryImage)} sizes="(max-width: 768px) 100vw, 820px" alt={guide.secondaryAlt} width={guide.imageWidth || 1536} height={guide.imageHeight || 1024} style={{width:'100%',height:'auto',borderRadius:16,display:'block'}}/><figcaption style={{fontSize:13,marginTop:8,color:'#526354'}}>AI-generated editorial illustration.</figcaption></figure>}{guideBlock(b)}</Fragment>)}
   <section aria-label="Tools and related guides" className="article-callout"><h2>Put your plan into practice</h2><ul>{guide.tools.map(([label,href])=><li key={href}><Link href={href}>{label}</Link></li>)}</ul><h3>Related guides</h3><ul>{(guide.related || [['50-30-20-budget-rule','50/30/20 budget rule'],['how-much-emergency-fund-do-i-need','How much emergency savings do you need?'],['debt-snowball-vs-avalanche','Debt snowball vs avalanche']]).filter(([slug])=>slug!==guide.slug).map(([slug,label])=><li key={slug}><Link href={`/articles/${slug}/`}>{label}</Link></li>)}</ul></section>
   <section aria-label="Sources"><h2>Sources and editorial notes</h2><p>Official guidance reviewed {dateLabel(modified)}. Calculations and household scenarios are illustrative. This guide provides general educational information; individual circumstances and product terms differ.</p><ul>{guide.sources.map(([label,href])=><li key={href}><a href={href}>{label}</a></li>)}</ul></section>
  </div></div>
 </article></main>;
}

