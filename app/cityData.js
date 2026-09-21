export const CITY_DATA={
 Toronto:{country:'CA',region:'ON',currency:'CAD',rent:2650,groceries:485,transit:156,utilities:190,phoneInternet:145,misc:325,rentSource:'Statistics Canada Q2 2026, 2-bedroom asking rent',updated:'2026-09-09'},
 Vancouver:{country:'CA',region:'BC',currency:'CAD',rent:3030,groceries:500,transit:110,utilities:185,phoneInternet:145,misc:340,rentSource:'Statistics Canada Q2 2026, 2-bedroom asking rent',updated:'2026-09-09'},
 Montreal:{country:'CA',region:'QC',currency:'CAD',rent:1820,groceries:440,transit:94,utilities:150,phoneInternet:120,misc:300,rentSource:'Statistics Canada Q2 2026, 2-bedroom asking rent',updated:'2026-09-09'},
 Calgary:{country:'CA',region:'AB',currency:'CAD',rent:1890,groceries:475,transit:115,utilities:210,phoneInternet:135,misc:310,rentSource:'Statistics Canada Q2 2026, 2-bedroom asking rent',updated:'2026-09-09'},
 Ottawa:{country:'CA',region:'ON',currency:'CAD',rent:2360,groceries:470,transit:130,utilities:190,phoneInternet:140,misc:315,rentSource:'Statistics Canada Q2 2026, 2-bedroom asking rent',updated:'2026-09-09'},
 'New York City':{country:'US',region:'NY',currency:'USD',rent:3627,groceries:550,transit:132,utilities:210,phoneInternet:135,misc:400,rentSource:'Zillow Observed Rent Index, July 2026',updated:'2026-07-31'},
 Miami:{country:'US',region:'FL',currency:'USD',rent:2677,groceries:500,transit:113,utilities:220,phoneInternet:135,misc:370,rentSource:'Zillow Observed Rent Index, July 2026',updated:'2026-07-31'},
 'Los Angeles':{country:'US',region:'CA',currency:'USD',rent:2944,groceries:525,transit:100,utilities:205,phoneInternet:135,misc:390,rentSource:'Zillow Observed Rent Index, July 2026',updated:'2026-07-31'},
 Chicago:{country:'US',region:'IL',currency:'USD',rent:2253,groceries:475,transit:75,utilities:195,phoneInternet:130,misc:350,rentSource:'Zillow Observed Rent Index, July 2026',updated:'2026-07-31'}
};
export const cityMonthlyCost=c=>c.rent+c.groceries+c.transit+c.utilities+c.phoneInternet+c.misc;
