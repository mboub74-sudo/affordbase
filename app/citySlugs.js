export const CITY_SLUGS={
 'toronto':'Toronto','vancouver':'Vancouver','montreal':'Montreal','calgary':'Calgary','ottawa':'Ottawa',
 'new-york':'New York City','miami':'Miami','los-angeles':'Los Angeles','chicago':'Chicago'
};
export const citySlug=name=>Object.entries(CITY_SLUGS).find(([,v])=>v===name)?.[0]||name.toLowerCase().replaceAll(' ','-');
