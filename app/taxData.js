export const CA_FED=[[58523,.14],[117045,.205],[181440,.26],[258482,.29],[Infinity,.33]];
export const CA_PROVINCES={
 AB:{name:'Alberta',brackets:[[61200,.08],[154259,.10],[185111,.12],[246813,.13],[370220,.14],[Infinity,.15]]},
 BC:{name:'British Columbia',brackets:[[50363,.056],[100728,.077],[115648,.105],[140430,.1229],[190405,.147],[265545,.168],[Infinity,.205]]},
 MB:{name:'Manitoba',brackets:[[47564,.108],[101200,.1275],[Infinity,.174]]},
 NB:{name:'New Brunswick',brackets:[[52333,.094],[104666,.14],[193861,.16],[Infinity,.195]]},
 NL:{name:'Newfoundland & Labrador',brackets:[[44678,.087],[89354,.145],[159528,.158],[223340,.178],[285319,.198],[570638,.208],[1141275,.213],[Infinity,.218]]},
 NS:{name:'Nova Scotia',brackets:[[30995,.0879],[61991,.1495],[97417,.1667],[157124,.175],[Infinity,.21]]},
 NT:{name:'Northwest Territories',brackets:[[53003,.059],[106009,.086],[172346,.122],[Infinity,.1405]]},
 NU:{name:'Nunavut',brackets:[[55801,.04],[111602,.07],[181439,.09],[Infinity,.115]]},
 ON:{name:'Ontario',brackets:[[53891,.0505],[107785,.0915],[150000,.1116],[220000,.1216],[Infinity,.1316]]},
 PE:{name:'Prince Edward Island',brackets:[[33928,.095],[65820,.1347],[106890,.166],[142520,.1762],[200000,.19],[Infinity,.20]]},
 QC:{name:'Quebec',brackets:[[54345,.14],[108680,.19],[132245,.24],[Infinity,.2575]],quebec:true},
 SK:{name:'Saskatchewan',brackets:[[54532,.105],[155805,.125],[Infinity,.145]]},
 YT:{name:'Yukon',brackets:[[58523,.064],[117045,.09],[181440,.109],[500000,.128],[Infinity,.15]]}
};
export const US_FED={single:{deduction:16100,brackets:[[12400,.10],[50400,.12],[105700,.22],[201775,.24],[256225,.32],[640600,.35],[Infinity,.37]]},joint:{deduction:32200,brackets:[[24800,.10],[100800,.12],[211400,.22],[403550,.24],[512450,.32],[768700,.35],[Infinity,.37]]},head:{deduction:24150,brackets:[[17700,.10],[67450,.12],[105700,.22],[201750,.24],[256200,.32],[640600,.35],[Infinity,.37]]}};
export const US_STATES={TX:{name:'Texas',rate:0},FL:{name:'Florida',rate:0},WA:{name:'Washington',rate:0},NV:{name:'Nevada',rate:0},TN:{name:'Tennessee',rate:0},WY:{name:'Wyoming',rate:0},SD:{name:'South Dakota',rate:0},AK:{name:'Alaska',rate:0},CA:{name:'California',approx:true,brackets:[[11079,.01],[26264,.02],[41452,.04],[57542,.06],[72724,.08],[371479,.093],[445771,.103],[742953,.113],[Infinity,.123]],deduction:5706},NY:{name:'New York',approx:true,brackets:[[8500,.04],[11700,.045],[13900,.0525],[80650,.055],[215400,.06],[1077550,.0685],[5000000,.0965],[25000000,.103],[Infinity,.109]],deduction:8000}};
export const CITY_COSTS={Toronto:{country:'CA',region:'ON',currency:'CAD',rent:2550,other:1900},Vancouver:{country:'CA',region:'BC',currency:'CAD',rent:2750,other:1950},Montreal:{country:'CA',region:'QC',currency:'CAD',rent:1850,other:1750},Calgary:{country:'CA',region:'AB',currency:'CAD',rent:1950,other:1750},Ottawa:{country:'CA',region:'ON',currency:'CAD',rent:2200,other:1800},'New York City':{country:'US',region:'NY',currency:'USD',rent:3900,other:2300},Miami:{country:'US',region:'FL',currency:'USD',rent:2700,other:2100},'Los Angeles':{country:'US',region:'CA',currency:'USD',rent:2800,other:2200},Chicago:{country:'US',region:'IL',currency:'USD',rent:2200,other:1900}};
