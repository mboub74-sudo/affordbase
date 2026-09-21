import {CA_FED,CA_PROVINCES,US_FED,US_STATES} from './taxData';
export function progressive(income,brackets){let tax=0,prev=0;for(const [cap,rate] of brackets){if(income<=prev)break;const slice=Math.min(income,cap)-prev;tax+=Math.max(0,slice)*rate;prev=cap}return tax}
function ontarioHealth(x){if(x<=20000)return 0;if(x<=36000)return Math.min(300,(x-20000)*.06);if(x<=48000)return Math.min(450,300+(x-36000)*.06);if(x<=72000)return Math.min(600,450+(x-48000)*.25);if(x<=200000)return Math.min(750,600+(x-72000)*.25);return Math.min(900,750+(x-200000)*.25)}
export function canadaTax(gross,province='ON'){gross=Math.max(0,+gross||0);const p=CA_PROVINCES[province]||CA_PROVINCES.ON;let federal=progressive(gross,CA_FED);let provincial=progressive(gross,p.brackets);let pension,ei,qpip=0;if(province==='QC'){pension=Math.min(Math.max(gross-3500,0),71100)*.063+Math.min(Math.max(gross-74600,0),10400)*.04;ei=Math.min(gross,68900)*.013;qpip=Math.min(gross,103000)*.0043;}else{pension=Math.min(Math.max(gross-3500,0),71100)*.0595+Math.min(Math.max(gross-74600,0),10400)*.04;ei=Math.min(gross,68900)*.0163;}const health=province==='ON'?ontarioHealth(gross):0;const total=federal+provincial+pension+ei+qpip+health;return {gross,federal,regional:provincial,pension,ei,qpip,health,total,net:Math.max(0,gross-total),currency:'CAD',region:p.name,note:'Planning estimate using 2026 marginal brackets and payroll contribution rates; credits and personal deductions can change actual tax.'}}
export function usaTax(gross,state='TX',status='single'){gross=Math.max(0,+gross||0);const f=US_FED[status]||US_FED.single;const federal=progressive(Math.max(0,gross-f.deduction),f.brackets);const ss=Math.min(gross,184500)*.062;const medicare=gross*.0145+Math.max(0,gross-(status==='joint'?250000:200000))*.009;const s=US_STATES[state]||{name:state,rate:0,unsupported:true};let regional=0;if(s.brackets)regional=progressive(Math.max(0,gross-(s.deduction||0)),s.brackets);else regional=gross*(s.rate||0);const total=federal+ss+medicare+regional;return {gross,federal,regional,pension:ss,ei:medicare,qpip:0,health:0,total,net:Math.max(0,gross-total),currency:'USD',region:s.name||state,note:s.unsupported?'Federal + FICA shown. This state is not yet modeled, so state income tax is excluded.':'2026 planning estimate. Federal standard deduction and FICA are included; state estimates are simplified and may exclude credits/local taxes.'}}

const CA_2025={
 single:{deduction:5706,brackets:[[11079,.01],[26264,.02],[41452,.04],[57542,.06],[72724,.08],[371479,.093],[445771,.103],[742953,.113],[Infinity,.123]]},
 joint:{deduction:11412,brackets:[[22158,.01],[52528,.02],[82904,.04],[115084,.06],[145448,.08],[742958,.093],[891542,.103],[1485906,.113],[Infinity,.123]]},
 head:{deduction:11412,brackets:[[22173,.01],[52530,.02],[67697,.04],[83788,.06],[98969,.08],[505208,.093],[606251,.103],[1010417,.113],[Infinity,.123]]}
};
export function californiaTax(gross,status='single'){
 gross=Math.max(0,+gross||0);
 const f=US_FED[status]||US_FED.single;
 const federal=progressive(Math.max(0,gross-f.deduction),f.brackets);
 const socialSecurity=Math.min(gross,184500)*.062;
 const medicare=gross*.0145+Math.max(0,gross-(status==='joint'?250000:200000))*.009;
 const ca=CA_2025[status]||CA_2025.single;
 // FTB's 2026 Form 540-ES instructs taxpayers to use the 2025 CA tax table/rates and 2025 standard deduction for 2026 estimates.
 const state=progressive(Math.max(0,gross-ca.deduction),ca.brackets);
 const sdi=gross*.013;
 const total=federal+socialSecurity+medicare+state+sdi;
 return {gross,federal,state,socialSecurity,medicare,sdi,total,net:Math.max(0,gross-total),currency:'USD',note:'2026 planning estimate: federal rules and FICA use 2026 figures; California income tax follows FTB 2026 Form 540-ES guidance using the 2025 California tax table/rates and standard deduction. Credits, deductions and other circumstances are not modeled.'};
}
