const securityHeaders=[
 {key:'X-Content-Type-Options',value:'nosniff'},
 {key:'Referrer-Policy',value:'strict-origin-when-cross-origin'},
 {key:'X-Frame-Options',value:'SAMEORIGIN'},
 {key:'Permissions-Policy',value:'camera=(), microphone=(), geolocation=()'}
];

const cityRedirects=[
 ['salary-needed-to-live-in-toronto','toronto'],
 ['salary-needed-to-live-in-vancouver','vancouver'],
 ['salary-needed-to-live-in-montreal','montreal'],
 ['salary-needed-to-live-in-calgary','calgary'],
 ['salary-needed-to-live-in-new-york','new-york-city'],
 ['salary-needed-to-live-in-miami','miami']
];

export default {
 async headers(){return [{source:'/:path*',headers:securityHeaders}]},
 async redirects(){return cityRedirects.map(([oldSlug,city])=>({source:`/${oldSlug}/`,destination:`/cities/${city}/`,permanent:true}))}
};