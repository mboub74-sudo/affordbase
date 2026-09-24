'use client';

import {useEffect} from 'react';

export default function HBAgencyInPageAds(){
 useEffect(()=>{
  const body=document.querySelector('.article-body');
  if(!body)return;
  const paragraphs=Array.from(body.querySelectorAll(':scope > p'));
  [6,3].forEach(position=>{
   const target=paragraphs[position-1];
   if(!target)return;
   const ad=document.createElement('div');
   ad.className='hb-ad-inpage';
   ad.dataset.hbInjected='343402';
   ad.innerHTML='<div class="hb-ad-inner"><div class="hbagency_cls hbagency_space_343402"></div></div>';
   target.insertAdjacentElement('afterend',ad);
  });
  return ()=>document.querySelectorAll('[data-hb-injected="343402"]').forEach(el=>el.remove());
 },[]);
 return null;
}
