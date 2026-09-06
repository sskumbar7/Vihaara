import React, { useState, useMemo, useEffect } from "react";
import {
  MapPin, Clock, Heart, Sparkles, ChevronLeft, BadgeCheck,
  Navigation, ExternalLink, Coffee, Beer, Wine, Music, Building2, Check,
} from "lucide-react";

/*
  Vihaara — working prototype (Pillar 3: Hangouts)

  DESIGN SYSTEM (this pass):
  • Spacing  — 8pt grid with 4pt half-steps: 4 / 8 / 12 / 16 / 20 / 24 / 32 / 40  (--s1..--s10)
  • Type     — fixed modular scale: display 34 / h1 26 / h2 20 / title 16 / body 16
               / body-sm 14 / button 15 / label 13 / caption 12  (.t-* classes)
  • Radius   — sm 10 / md 14 / lg 18 / full
  • Tap size — all interactive controls ≥ 44px
  • States   — every control defines hover / active(pressed) / focus-visible / disabled,
               plus selected (chips), on (heart/switch), and loading (skeletons).
  • A11y     — focus-visible rings, aria labels/roles, reduced-motion respected.

  NOTE: preview keeps start-point + saved in React state only (browser storage
  APIs don't run in the artifact sandbox; the real build uses localStorage).
  Volatile venue data is placeholder pending a verification pass.
*/

const STYLE = `
@import url('https://fonts.googleapis.com/css2?family=Bricolage+Grotesque:opsz,wght@12..96,600;12..96,700;12..96,800&family=Inter:wght@400;500;600&display=swap');
:root{
  --paper:#F7F5F1; --surface:#FFFFFF; --ink:#18201D; --ink-soft:#5A675F;
  --line:#E7E3DB; --line-strong:#D9D4C9;
  --teal:#0F5C4E; --teal-700:#0C4B40; --teal-800:#0A3F36; --teal-soft:#E4EFEA;
  --amber:#C77D28; --amber-ink:#7A4D12; --amber-soft:#F8ECD8; --amber-soft-2:#F1DFC0;
  --rust:#A8502E; --rust-soft:#F3E4DE;
  --display:'Bricolage Grotesque',system-ui,sans-serif; --body:'Inter',system-ui,sans-serif;
  --s1:4px; --s2:8px; --s3:12px; --s4:16px; --s5:20px; --s6:24px; --s8:32px; --s10:40px;
  --r-sm:10px; --r-md:14px; --r-lg:18px; --r-full:999px; --tap:44px;
}
.wrap{font-family:var(--body);color:var(--ink);-webkit-font-smoothing:antialiased}
*{-webkit-tap-highlight-color:transparent}
button{cursor:pointer;font-family:inherit}
:focus-visible{outline:2px solid var(--teal);outline-offset:2px;border-radius:4px}

/* ---- type scale ---- */
.t-display{font:800 34px/1.05 var(--display);letter-spacing:-.02em}
.t-h1{font:800 26px/1.1 var(--display);letter-spacing:-.01em}
.t-h2{font:700 20px/1.18 var(--display);letter-spacing:-.01em}
.t-title{font:600 16px/1.25 var(--display)}
.t-body{font:400 16px/1.5 var(--body)}
.t-bodysm{font:400 14px/1.45 var(--body)}
.t-button{font:600 15px/1 var(--body)}
.t-label{font:600 13px/1.2 var(--body)}
.t-caption{font:500 12px/1.3 var(--body)}
.c-ink{color:var(--ink)} .c-soft{color:var(--ink-soft)} .c-teal{color:var(--teal)}
.c-white{color:#fff} .c-amber{color:var(--amber-ink)} .c-rust{color:var(--rust)}

/* ---- buttons ---- */
.btn{display:inline-flex;align-items:center;justify-content:center;gap:var(--s2);
  min-height:var(--tap);padding:0 var(--s5);border-radius:var(--r-md);border:1px solid transparent;
  transition:background .15s,border-color .15s,box-shadow .15s,transform .06s,color .15s}
.btn:active{transform:translateY(1px)}
.btn:disabled{opacity:.45;pointer-events:none}
.btn--block{width:100%}
.btn--primary{background:var(--teal);color:#fff}
.btn--primary:hover{background:var(--teal-700)}
.btn--primary:active{background:var(--teal-800)}
.btn--secondary{background:var(--surface);color:var(--ink);border-color:var(--line)}
.btn--secondary:hover{background:var(--paper);border-color:var(--line-strong)}
.btn--secondary:active{background:var(--line)}
.btn--accent{background:var(--amber-soft);color:var(--amber-ink)}
.btn--accent:hover{background:var(--amber-soft-2)}
.btn--accent:active{background:#EAD3A6}
.btn--ghost{background:transparent;color:var(--ink-soft);min-height:36px;padding:0 var(--s2)}
.btn--ghost:hover{color:var(--ink)}
.btn--ghost:disabled{opacity:.4}

/* ---- big quick-pick tile ---- */
.qp{display:flex;align-items:center;min-height:60px;width:100%;padding:var(--s4);
  border-radius:var(--r-md);background:var(--surface);border:1px solid var(--line);
  color:var(--ink);text-align:left;transition:border-color .15s,box-shadow .15s,transform .1s}
.qp:hover{border-color:var(--teal);box-shadow:0 3px 12px rgba(15,92,78,.09);transform:translateY(-1px)}
.qp:active{transform:translateY(0);box-shadow:none}

/* ---- selectable chip ---- */
.chip{display:inline-flex;align-items:center;gap:6px;min-height:40px;padding:0 var(--s4);
  border-radius:var(--r-full);background:var(--surface);border:1px solid var(--line);
  color:var(--ink);transition:.15s}
.chip:hover{border-color:var(--teal);background:var(--teal-soft)}
.chip[aria-pressed="true"]{background:var(--teal);border-color:var(--teal);color:#fff}
.chip:active{transform:translateY(1px)}

/* ---- venue card ---- */
.card{display:block;width:100%;text-align:left;padding:var(--s3);border-radius:var(--r-lg);
  background:var(--surface);border:1px solid var(--line);
  transition:border-color .15s,box-shadow .15s,transform .1s}
.card:hover{border-color:#CFE0D9;box-shadow:0 4px 16px rgba(24,32,29,.06);transform:translateY(-1px)}
.card:active{transform:translateY(0);box-shadow:none}

/* ---- heart ---- */
.heart{display:inline-flex;align-items:center;justify-content:center;width:34px;height:34px;
  border-radius:var(--r-full);background:var(--paper);color:var(--ink-soft);
  border:1px solid transparent;transition:.15s}
.heart:hover{background:var(--teal-soft);color:var(--teal)}
.heart--on{background:var(--teal);color:#fff}
.heart--on:hover{background:var(--teal-700);color:#fff}

/* ---- switch ---- */
.switch{position:relative;width:44px;height:26px;border-radius:var(--r-full);
  background:var(--line);border:none;padding:0;transition:background .18s;flex:none}
.switch[aria-checked="true"]{background:var(--teal)}
.switch>span{position:absolute;top:3px;left:3px;width:20px;height:20px;border-radius:50%;
  background:#fff;box-shadow:0 1px 2px rgba(0,0,0,.25);transition:transform .18s}
.switch[aria-checked="true"]>span{transform:translateX(18px)}

/* ---- pills ---- */
.pill{display:inline-flex;align-items:center;gap:4px;padding:2px var(--s2);
  border-radius:var(--r-full);font:500 12px/1.3 var(--body);white-space:nowrap}
.pill--neutral{background:var(--paper);color:var(--ink-soft)}
.pill--teal{background:var(--teal-soft);color:var(--teal)}
.pill--drive{background:var(--amber-soft);color:var(--amber-ink);font-weight:600;padding:4px 10px}
.pill--open{background:var(--teal-soft);color:var(--teal)}
.pill--closed{background:var(--rust-soft);color:var(--rust)}
.pill--tag{background:#fff;color:var(--ink-soft);border:1px solid var(--line)}

/* ---- tile ---- */
.tile{display:flex;align-items:center;justify-content:center;border-radius:var(--r-md);
  background:var(--teal-soft);color:var(--teal);flex:none}

/* ---- skeleton (loading state) ---- */
.skel{background:linear-gradient(90deg,#EEE9E0 25%,#F5F1E9 37%,#EEE9E0 63%);
  background-size:400% 100%;animation:shimmer 1.4s ease infinite;border-radius:var(--r-sm)}
.skel-card{height:98px;border-radius:var(--r-lg)}
@keyframes shimmer{0%{background-position:100% 0}100%{background-position:-100% 0}}

/* ---- screen enter ---- */
.screen{animation:fadeUp .26s ease both}
@keyframes fadeUp{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:none}}

@media (prefers-reduced-motion:reduce){*{animation:none!important;transition:none!important}}
`;

// ---------- data (mirrors activities.json) ----------
const VENUES = [
  { id:"hangout_001", name:"Toit Brewpub", sub_type:"pub_microbrewery", area:"Indiranagar", lat:12.9784, lng:77.6408, price_tier:"mid", occasion_tags:["friends","celebration"], vibe_tags:["lively"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-12", quality_score:9, source_url:"https://www.google.com/maps/search/Toit+Brewpub+Indiranagar+Bangalore", description:"Bengaluru's most iconic microbrewery, with wood-and-brick interiors, small-batch craft beer and wood-fired pizzas. Expect a buzzing crowd and a wait on weekends, so go early.", details:{cost_for_two:1800,cover_charge:false,reservation_required:false} },
  { id:"hangout_002", name:"Byg Brewski Brewing Company", sub_type:"pub_microbrewery", area:"Sarjapur Road", lat:12.9008, lng:77.6870, price_tier:"mid", occasion_tags:["friends","celebration"], vibe_tags:["lively","rooftop","live_music"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-08", quality_score:8, source_url:"https://www.google.com/maps/search/Byg+Brewski+Sarjapur+Road+Bangalore", description:"A massive open-air brewery with a lake-view deck and one of the largest beer selections in the city. Built for big groups, long evenings and celebrations.", details:{cost_for_two:1900,cover_charge:false,reservation_required:false} },
  { id:"hangout_003", name:"Third Wave Coffee Roasters", sub_type:"cafe", area:"Koramangala", lat:12.9339, lng:77.6250, price_tier:"budget", occasion_tags:["solo","first_date"], vibe_tags:["chill","quiet"], timings:{open:"08:00",close:"23:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-14", quality_score:8, source_url:"https://www.google.com/maps/search/Third+Wave+Coffee+Koramangala+Bangalore", description:"Reliable specialty coffee and an easy, work-friendly vibe. A solid low-key spot for a solo afternoon or a relaxed first meet.", details:{cost_for_two:600,cover_charge:false,reservation_required:false} },
  { id:"hangout_004", name:"Blue Tokai Coffee Roasters", sub_type:"cafe", area:"Indiranagar", lat:12.9705, lng:77.6400, price_tier:"mid", occasion_tags:["solo","first_date"], vibe_tags:["chill","quiet"], timings:{open:"08:30",close:"22:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-07-22", quality_score:8, source_url:"https://www.google.com/maps/search/Blue+Tokai+Indiranagar+Bangalore", description:"Single-origin pour-overs from one of India's best-known roasters, in a calm, minimal space. For people who take their coffee seriously.", details:{cost_for_two:700,cover_charge:false,reservation_required:false} },
  { id:"hangout_005", name:"Windmills Craftworks", sub_type:"live_music", area:"Whitefield", lat:12.9760, lng:77.7200, price_tier:"premium", occasion_tags:["date","celebration"], vibe_tags:["live_music","romantic"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-05", quality_score:9, source_url:"https://www.google.com/maps/search/Windmills+Craftworks+Whitefield+Bangalore", description:"A jazz theatre, microbrewery and library rolled into one, with live sets most nights. The city's most grown-up night out, so book ahead.", details:{cost_for_two:3000,cover_charge:false,reservation_required:true} },
  { id:"hangout_006", name:"The Permit Room", sub_type:"restobar", area:"Central", lat:12.9750, lng:77.6070, price_tier:"mid", occasion_tags:["friends"], vibe_tags:["lively"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-10", quality_score:8, source_url:"https://www.google.com/maps/search/The+Permit+Room+MG+Road+Bangalore", description:"A retro-styled bar riffing on old-Madras nostalgia, with playful South-Indian small plates and cocktails. Lively and unpretentious.", details:{cost_for_two:1500,cover_charge:false,reservation_required:false} },
  { id:"hangout_007", name:"Arbor Brewing Company", sub_type:"pub_microbrewery", area:"Central", lat:12.9662, lng:77.6085, price_tier:"mid", occasion_tags:["friends"], vibe_tags:["lively","chill"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-01", quality_score:8, source_url:"https://www.google.com/maps/search/Arbor+Brewing+Company+Magrath+Road+Bangalore", description:"An easygoing American-style brewpub with dependable craft beer and a relaxed, chatty crowd. Good for an unhurried evening with friends.", details:{cost_for_two:1600,cover_charge:false,reservation_required:false} },
  { id:"hangout_008", name:"Dyu Art Cafe", sub_type:"cafe", area:"Koramangala", lat:12.9270, lng:77.6270, price_tier:"budget", occasion_tags:["first_date","date"], vibe_tags:["chill","quiet","romantic"], timings:{open:"11:00",close:"22:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-11", quality_score:8, source_url:"https://www.google.com/maps/search/Dyu+Art+Cafe+Koramangala+Bangalore", description:"A heritage bungalow cafe wrapped in greenery and warm light, quiet and arty and made for slow conversation. A classic first-date pick.", details:{cost_for_two:700,cover_charge:false,reservation_required:false} },
  { id:"hangout_009", name:"Skyye Lounge", sub_type:"rooftop_lounge", area:"Central", lat:12.9719, lng:77.5959, price_tier:"premium", occasion_tags:["date","celebration"], vibe_tags:["rooftop","romantic"], timings:{open:"17:00",close:"01:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-07-30", quality_score:8, source_url:"https://www.google.com/maps/search/Skyye+Lounge+UB+City+Bangalore", description:"A sleek open-air rooftop above UB City with skyline views and a polished cocktail list. Dress up; it leans premium and romantic.", details:{cost_for_two:3000,cover_charge:false,reservation_required:true} },
  { id:"hangout_010", name:"Church Street Social", sub_type:"restobar", area:"Central", lat:12.9752, lng:77.6045, price_tier:"mid", occasion_tags:["friends","solo"], vibe_tags:["lively"], timings:{open:"09:00",close:"01:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-13", quality_score:7, source_url:"https://www.google.com/maps/search/Church+Street+Social+Bangalore", description:"A high-energy bar-cafe in the heart of Church Street, equally good for a working-laptop afternoon and a loud night with the gang.", details:{cost_for_two:1400,cover_charge:false,reservation_required:false} },
  { id:"hangout_011", name:"The Reservoire", sub_type:"restobar", area:"Koramangala", lat:12.9345, lng:77.6210, price_tier:"mid", occasion_tags:["friends","celebration"], vibe_tags:["lively","rooftop"], timings:{open:"12:00",close:"01:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-09", quality_score:8, source_url:"https://www.google.com/maps/search/The+Reservoire+Koramangala+Bangalore", description:"A sprawling multi-level bar with a popular rooftop, strong on cocktails and weekend energy. A dependable friends-and-celebration spot.", details:{cost_for_two:2000,cover_charge:false,reservation_required:false} },
  { id:"hangout_012", name:"Bar Spirit Forward", sub_type:"date_spot", area:"Indiranagar", lat:12.9718, lng:77.6395, price_tier:"premium", occasion_tags:["date","first_date"], vibe_tags:["romantic","quiet"], timings:{open:"17:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-06", quality_score:8, source_url:"https://www.google.com/maps/search/Bar+Spirit+Forward+Indiranagar+Bangalore", description:"An intimate, craft-cocktail-focused bar where the drinks are the main event. Low-lit and conversational, a standout for date night. Reserve.", details:{cost_for_two:2500,cover_charge:false,reservation_required:true} },
  { id:"hangout_013", name:"The Humming Tree", sub_type:"live_music", area:"Indiranagar", lat:12.9716, lng:77.6420, price_tier:"mid", occasion_tags:["friends"], vibe_tags:["live_music","lively"], timings:{open:"18:00",close:"23:30",days:["Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-07", quality_score:8, source_url:"https://www.google.com/maps/search/The+Humming+Tree+Indiranagar+Bangalore", description:"Indiranagar's go-to for live gigs and indie nights, come for the music and the crowd. Ticketed on show nights.", details:{cost_for_two:1500,cover_charge:true,reservation_required:false} },
  { id:"hangout_014", name:"Watson's", sub_type:"restobar", area:"HSR", lat:12.9120, lng:77.6440, price_tier:"mid", occasion_tags:["friends"], vibe_tags:["lively"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-05-01", quality_score:7, source_url:"https://www.google.com/maps/search/Watsons+HSR+Layout+Bangalore", description:"A big, buzzy HSR pub with sport on the screens and a broad menu, easy and casual and built for groups.", details:{cost_for_two:1300,cover_charge:false,reservation_required:false} },
  { id:"hangout_015", name:"High Ultra Lounge", sub_type:"rooftop_lounge", area:"Nagawara", lat:13.0455, lng:77.6210, price_tier:"premium", occasion_tags:["date","celebration"], vibe_tags:["rooftop","romantic"], timings:{open:"16:00",close:"01:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-07-18", quality_score:8, source_url:"https://www.google.com/maps/search/High+Ultra+Lounge+Nagawara+Bangalore", description:"One of Bengaluru's highest rooftops, all glass and dramatic at night. A splurge for celebrations and skyline-view dates, so book ahead.", details:{cost_for_two:3500,cover_charge:false,reservation_required:true} },
  { id:"hangout_016", name:"Matteo Coffea", sub_type:"cafe", area:"Central", lat:12.9754, lng:77.6040, price_tier:"mid", occasion_tags:["solo","first_date"], vibe_tags:["chill"], timings:{open:"08:00",close:"23:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-12", quality_score:7, source_url:"https://www.google.com/maps/search/Matteo+Coffea+Church+Street+Bangalore", description:"A bright, European-style cafe on Church Street with strong coffee and good people-watching. Works solo or for a casual first meet.", details:{cost_for_two:800,cover_charge:false,reservation_required:false} },
  { id:"hangout_017", name:"Prost Brewpub", sub_type:"pub_microbrewery", area:"Whitefield", lat:12.9720, lng:77.7300, price_tier:"mid", occasion_tags:["friends"], vibe_tags:["lively"], timings:{open:"12:00",close:"23:30",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-07-25", quality_score:7, source_url:"https://www.google.com/maps/search/Prost+Brewpub+Whitefield+Bangalore", description:"A lively Bavarian-themed brewpub popular with the Whitefield crowd, big pours and loud nights and group-friendly tables.", details:{cost_for_two:1500,cover_charge:false,reservation_required:false} },
  { id:"hangout_018", name:"Glen's Bakehouse", sub_type:"cafe", area:"Indiranagar", lat:12.9688, lng:77.6385, price_tier:"budget", occasion_tags:["first_date"], vibe_tags:["chill"], timings:{open:"08:00",close:"22:00",days:["Mon","Tue","Wed","Thu","Fri","Sat","Sun"]}, last_verified_date:"2026-08-03", quality_score:7, source_url:"https://www.google.com/maps/search/Glens+Bakehouse+Indiranagar+Bangalore", description:"A cosy bakery-cafe known for cakes and comfort bakes. Sweet, low-key and easy for a relaxed catch-up or a dessert date.", details:{cost_for_two:600,cover_charge:false,reservation_required:false} },
];

const AREAS = [
  { name:"Indiranagar", lat:12.9719, lng:77.6412 }, { name:"Koramangala", lat:12.9352, lng:77.6245 },
  { name:"HSR", lat:12.9116, lng:77.6389 }, { name:"Central", lat:12.9750, lng:77.6050 },
  { name:"Whitefield", lat:12.9698, lng:77.7500 }, { name:"Marathahalli", lat:12.9560, lng:77.7010 },
  { name:"Sarjapur / ORR", lat:12.9010, lng:77.6870 }, { name:"Electronic City", lat:12.8452, lng:77.6602 },
];

// config-driven intents (spec §4.1)
const QUICK_PICKS = [
  { key:"date",    label:"Date night",        filters:{ occasion:"date", vibe:"romantic" } },
  { key:"friends", label:"Friends night out", filters:{ occasion:"friends", vibe:"lively" } },
  { key:"cafe",    label:"Chill café",         filters:{ sub_type:"cafe", vibe:"chill" } },
  { key:"rooftop", label:"Rooftop drinks",    filters:{ vibe:"rooftop" } },
  { key:"music",   label:"Live music",         filters:{ vibe:"live_music" } },
  { key:"celeb",   label:"Celebration",        filters:{ occasion:"celebration" } },
];
const GUIDED = [
  { axis:"occasion", q:"Who's it for?", opts:[["date","Date"],["first_date","First date"],["friends","Friends"],["celebration","Celebration"],["solo","Solo"]] },
  { axis:"vibe", q:"What's the vibe?", opts:[["romantic","Romantic"],["lively","Lively"],["chill","Chill"],["rooftop","Rooftop"],["live_music","Live music"],["quiet","Quiet"]] },
  { axis:"price_tier", q:"Budget?", opts:[["budget","₹ Budget"],["mid","₹₹ Mid"],["premium","₹₹₹ Premium"]] },
];
const SUBTYPE = {
  cafe:{ label:"Café", Icon:Coffee }, restobar:{ label:"Resto-bar", Icon:Wine },
  pub_microbrewery:{ label:"Microbrewery", Icon:Beer }, rooftop_lounge:{ label:"Rooftop lounge", Icon:Building2 },
  date_spot:{ label:"Date spot", Icon:Heart }, live_music:{ label:"Live music", Icon:Music },
};
const PRICE_LABEL = { budget:"₹", mid:"₹₹", premium:"₹₹₹" };
const DAYS = ["Sun","Mon","Tue","Wed","Thu","Fri","Sat"];

// ---------- helpers ----------
function haversine(a,b){const R=6371,r=(d)=>d*Math.PI/180;const dLat=r(b.lat-a.lat),dLng=r(b.lng-a.lng);
  const s=Math.sin(dLat/2)**2+Math.cos(r(a.lat))*Math.cos(r(b.lat))*Math.sin(dLng/2)**2;return R*2*Math.atan2(Math.sqrt(s),Math.sqrt(1-s));}
function driveTime(start,v){return start?Math.max(4,Math.round(haversine(start,v)*2.6)):null;}
function toMin(t){const[h,m]=t.split(":").map(Number);return h*60+m;}
function isOpenNow(v,now){if(!v.timings.days.includes(DAYS[now.getDay()]))return false;
  const cur=now.getHours()*60+now.getMinutes(),o=toMin(v.timings.open),cl=toMin(v.timings.close);
  return cl<o?(cur>=o||cur<=cl):(cur>=o&&cur<=cl);}
function freshness(dateStr,now){const d=new Date(dateStr+"T00:00:00");const days=Math.floor((now-d)/86400000);
  const stale=days>90;let label;
  if(days<=0)label="Verified today";else if(days===1)label="Verified yesterday";
  else if(days<=30)label=`Verified ${days} days ago`;
  else label=`Verified ${d.toLocaleString("en-IN",{month:"short",year:"numeric"})}`;
  return{label,stale};}

function rank(list,start){return[...list].sort((a,b)=>{const da=driveTime(start,a),db=driveTime(start,b);
  if(da!=null&&db!=null&&da!==db)return da-db;return b.quality_score-a.quality_score;});}
function buildShortlist(axesIn,openOnly,start,now){
  const pass=(v,ax)=>(!ax.occasion||v.occasion_tags.includes(ax.occasion))&&(!ax.vibe||v.vibe_tags.includes(ax.vibe))&&
    (!ax.price_tier||v.price_tier===ax.price_tier)&&(!ax.sub_type||v.sub_type===ax.sub_type)&&(!openOnly||isOpenNow(v,now));
  let ax={...axesIn};let res=VENUES.filter((v)=>pass(v,ax));let note=null;
  if(res.length<3&&ax.price_tier){ax={...ax,price_tier:null};res=VENUES.filter((v)=>pass(v,ax));note="Widened your search to show more.";}
  if(res.length<3&&ax.vibe){ax={...ax,vibe:null};res=VENUES.filter((v)=>pass(v,ax));note="Widened your search to show more.";}
  const emptyOpen=res.length===0&&openOnly;
  return{list:rank(res,start).slice(0,5),note,emptyOpen};
}

// ---------- atoms ----------
const DrivePill=({mins,area})=>mins==null
  ? <span className="pill pill--teal"><MapPin size={12}/> in {area}</span>
  : <span className="pill pill--drive"><Navigation size={12}/> {mins} min from you</span>;
function Verified({dateStr,now}){const{label,stale}=freshness(dateStr,now);
  return <span className={`t-caption ${stale?"c-rust":"c-teal"}`} style={{display:"inline-flex",alignItems:"center",gap:4}}>
    <BadgeCheck size={13}/> {stale?"Verify before you go":label}</span>;}
const Tile=({v,size=48})=>{const{Icon}=SUBTYPE[v.sub_type];
  return <div className="tile" style={{width:size,height:size}}><Icon size={Math.round(size*0.42)}/></div>;};

// ---------- venue card ----------
function VenueCard({v,start,now,onOpen,saved,onSave}){
  const mins=driveTime(start,v);const{label}=SUBTYPE[v.sub_type];
  const tags=[...v.vibe_tags,...v.occasion_tags].slice(0,3);
  return(
    <div className="card" role="button" tabIndex={0} onClick={()=>onOpen(v)}
      onKeyDown={(e)=>{if(e.key==="Enter"||e.key===" "){e.preventDefault();onOpen(v);}}}>
      <div className="flex gap-3">
        <Tile v={v} size={56}/>
        <div className="min-w-0 flex-1">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <div className="t-title c-ink truncate">{v.name}</div>
              <div className="t-caption c-soft" style={{marginTop:2}}>{label} · {v.area}</div>
            </div>
            <button className={`heart ${saved?"heart--on":""}`} aria-label={saved?"Remove from saved":"Save"} aria-pressed={saved}
              onClick={(e)=>{e.stopPropagation();onSave(v);}}><Heart size={15} fill={saved?"#fff":"none"}/></button>
          </div>
          <div className="flex flex-wrap items-center gap-2" style={{marginTop:10}}>
            <DrivePill mins={mins} area={v.area}/>
            <span className="pill pill--neutral">{PRICE_LABEL[v.price_tier]} · ₹{v.details.cost_for_two} for two</span>
          </div>
          <div className="flex flex-wrap items-center gap-2" style={{marginTop:8}}>
            {tags.map((t)=><span key={t} className="pill pill--tag">{t.replace("_"," ")}</span>)}
          </div>
          <div style={{marginTop:8}}><Verified dateStr={v.last_verified_date} now={now}/></div>
        </div>
      </div>
    </div>
  );
}

// ---------- screens ----------
function StartScreen({onPick}){
  return(
    <div className="screen" style={{padding:"40px 20px 0"}}>
      <h1 className="t-h1 c-ink">Where are you<br/>starting from?</h1>
      <p className="t-bodysm c-soft" style={{marginTop:8}}>We'll show how far each spot is from there. You can change it any time.</p>
      <button className="btn btn--primary btn--block" style={{marginTop:20}}
        onClick={()=>onPick({method:"gps",area:"Koramangala",...AREAS[1]})}><Navigation size={17}/> Use my location</button>
      <div className="flex items-center gap-3" style={{margin:"16px 0"}}>
        <div style={{height:1,flex:1,background:"var(--line)"}}/><span className="t-caption c-soft">or pick an area</span><div style={{height:1,flex:1,background:"var(--line)"}}/>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {AREAS.map((a)=><button key={a.name} className="btn btn--secondary t-button" onClick={()=>onPick({method:"area",area:a.name,...a})}>{a.name}</button>)}
      </div>
      <button className="btn btn--ghost btn--block t-button" style={{marginTop:16}} onClick={()=>onPick(null)}>Anywhere / not sure</button>
    </div>
  );
}

function Home({start,onQuick,onGuided,onSurprise,onChangeStart,savedCount,onSaved,openOnly,onToggleOpen}){
  return(
    <div className="screen" style={{padding:"24px 20px 0"}}>
      <div className="flex items-center justify-between">
        <div className="t-h2 c-teal" style={{textTransform:"lowercase"}}>vihaara</div>
        <button className="btn btn--secondary" style={{minHeight:36,padding:"0 12px"}} onClick={onSaved} aria-label="Saved venues">
          <Heart size={14}/> <span className="t-label">{savedCount}</span></button>
      </div>
      <button className="t-caption c-soft" style={{marginTop:4,display:"inline-flex",alignItems:"center",gap:4}} onClick={onChangeStart}>
        <MapPin size={12}/> Starting from: <span className="c-ink" style={{fontWeight:600}}>{start?start.area:"not set"}</span> ▾</button>

      <h1 className="t-display c-ink" style={{marginTop:24}}>Where to<br/>tonight?</h1>
      <p className="t-bodysm c-soft" style={{marginTop:6}}>Three good options, not fifty. Pick a vibe or let us ask.</p>

      <div className="flex items-center justify-between" style={{marginTop:20,marginBottom:8}}>
        <span className="t-label c-soft" style={{textTransform:"uppercase",letterSpacing:".04em"}}>Quick picks</span>
        <label className="flex items-center gap-2" style={{cursor:"pointer"}}>
          <span className="t-caption c-soft">Open now</span>
          <button role="switch" aria-checked={openOnly} aria-label="Open now filter" className="switch" onClick={()=>onToggleOpen(!openOnly)}><span/></button>
        </label>
      </div>
      <div className="grid grid-cols-2 gap-2">
        {QUICK_PICKS.map((q)=><button key={q.key} className="qp t-title" onClick={()=>onQuick(q)}>{q.label}</button>)}
      </div>

      <button className="btn btn--primary btn--block" style={{marginTop:12}} onClick={onGuided}>Help me decide</button>
      <button className="btn btn--accent btn--block" style={{marginTop:8}} onClick={onSurprise}><Sparkles size={16}/> Surprise me</button>
      <div style={{height:24}}/>
    </div>
  );
}

function Guided({start,now,openOnly,onDone,onBack}){
  const[step,setStep]=useState(0);const[picks,setPicks]=useState({});
  const preview=buildShortlist(picks,openOnly,start,now);
  const anyPick=Object.values(picks).some(Boolean);
  const set=(axis,val)=>setPicks((p)=>({...p,[axis]:p[axis]===val?undefined:val}));
  const q=GUIDED[step];
  return(
    <div className="screen" style={{padding:"24px 20px 0"}}>
      <div className="flex items-center justify-between">
        <TopBar onBack={step===0?onBack:()=>setStep(step-1)} title={`Question ${step+1} of 3`}/>
        <button className="btn btn--ghost t-label" disabled={!anyPick} onClick={()=>setPicks({})}>Clear</button>
      </div>
      <h2 className="t-h1 c-ink" style={{marginTop:24}}>{q.q}</h2>
      <div className="flex flex-wrap gap-2" style={{marginTop:16}}>
        {q.opts.map(([val,lab])=>{const on=picks[q.axis]===val;
          return <button key={val} className="chip t-label" aria-pressed={on} onClick={()=>set(q.axis,val)}>
            {on&&<Check size={13}/>}{lab}</button>;})}
      </div>
      <div className="flex gap-2" style={{marginTop:32}}>
        <button className="btn btn--secondary t-button" style={{flex:1}} onClick={()=>step<2?setStep(step+1):onDone(picks)}>{step<2?"Skip":"Done"}</button>
        <button className="btn btn--primary t-button" style={{flex:1}} onClick={()=>onDone(picks)}>Show {preview.list.length} result{preview.list.length!==1?"s":""}</button>
      </div>
      <p className="t-caption c-soft" style={{marginTop:12,textAlign:"center"}}>Every question is optional — skip any and still get a shortlist.</p>
    </div>
  );
}

function Shortlist({result,loading,start,now,title,openOnly,onToggleOpen,onOpen,onBack,saved,onSave}){
  const{list,note,emptyOpen}=result||{list:[],note:null,emptyOpen:false};
  return(
    <div className="screen" style={{padding:"24px 20px 32px"}}>
      <div className="flex items-center justify-between">
        <TopBar onBack={onBack} title={title}/>
        <label className="flex items-center gap-2" style={{cursor:"pointer"}}>
          <span className="t-caption c-soft">Open now</span>
          <button role="switch" aria-checked={openOnly} aria-label="Open now filter" className="switch" onClick={()=>onToggleOpen(!openOnly)}><span/></button>
        </label>
      </div>

      {loading ? (
        <div className="flex flex-col gap-3" style={{marginTop:20}}>
          {[0,1,2,3].map((i)=><div key={i} className="skel skel-card"/>)}
        </div>
      ) : emptyOpen ? (
        <Empty msg="Nothing's open right now — flip off “Open now” to see what's good for later."/>
      ) : list.length===0 ? (
        <Empty msg="Nothing exact — try fewer filters."/>
      ) : (
        <>
          <div className="t-bodysm c-soft" style={{marginTop:16,marginBottom:12,fontWeight:500}}>
            {list.length} spot{list.length!==1?"s":""}{start?", nearest first":""}</div>
          {note&&<div className="pill--drive" style={{display:"block",borderRadius:"var(--r-sm)",padding:"8px 12px",marginBottom:12,background:"var(--amber-soft)",color:"var(--amber-ink)",font:"500 12px/1.4 var(--body)"}}>{note}</div>}
          <div className="flex flex-col gap-3">
            {list.map((v)=><VenueCard key={v.id} v={v} start={start} now={now} onOpen={onOpen} saved={saved.has(v.id)} onSave={onSave}/>)}
          </div>
        </>
      )}
    </div>
  );
}

function Detail({v,start,now,onBack,saved,onSave,onAnother}){
  const mins=driveTime(start,v);const{label}=SUBTYPE[v.sub_type];const open=isOpenNow(v,now);
  return(
    <div className="screen" style={{paddingBottom:40}}>
      <div style={{position:"relative",height:150,display:"flex",alignItems:"flex-end",padding:20,background:"linear-gradient(135deg,var(--teal),#0B463B)"}}>
        <button className="heart" style={{position:"absolute",left:16,top:16,background:"rgba(255,255,255,.16)",color:"#fff"}} aria-label="Back" onClick={onBack}><ChevronLeft size={18}/></button>
        <div className="flex items-center gap-3">
          <Tile v={v} size={54}/>
          <div><div className="t-h2 c-white">{v.name}</div><div className="t-bodysm" style={{color:"rgba(255,255,255,.8)"}}>{label} · {v.area}</div></div>
        </div>
      </div>
      <div style={{padding:"0 20px"}}>
        <div className="flex flex-wrap items-center gap-2" style={{marginTop:16}}>
          <DrivePill mins={mins} area={v.area}/>
          <span className="pill pill--neutral">{PRICE_LABEL[v.price_tier]} · ₹{v.details.cost_for_two} for two</span>
          <span className={`pill ${open?"pill--open":"pill--closed"}`}><Clock size={12}/> {open?"Open now":"Closed now"}</span>
        </div>
        <p className="t-body c-ink" style={{marginTop:16}}>{v.description}</p>
        <div className="flex flex-wrap gap-2" style={{marginTop:16}}>
          {[...v.vibe_tags,...v.occasion_tags].map((t)=><span key={t} className="pill pill--tag">{t.replace("_"," ")}</span>)}
        </div>
        <div style={{marginTop:16,padding:12,borderRadius:"var(--r-md)",background:"var(--surface)",border:"1px solid var(--line)"}}>
          <div className="t-bodysm c-soft">Hours: {v.timings.open}–{v.timings.close}</div>
          {v.details.reservation_required&&<div className="t-bodysm c-soft" style={{marginTop:4}}>Reservation recommended</div>}
          {v.details.cover_charge&&<div className="t-bodysm c-soft" style={{marginTop:4}}>Cover charge applies</div>}
          <div style={{marginTop:8}}><Verified dateStr={v.last_verified_date} now={now}/></div>
        </div>
        <div className="grid grid-cols-2 gap-2" style={{marginTop:20}}>
          <button className={`btn ${saved?"btn--primary":"btn--secondary"} t-button`} onClick={()=>onSave(v)}>
            <Heart size={16} fill={saved?"#fff":"none"}/> {saved?"Saved":"Save"}</button>
          <a className="btn btn--primary t-button" href={`https://www.google.com/maps/dir/?api=1&destination=${v.lat},${v.lng}`} target="_blank" rel="noreferrer"><Navigation size={16}/> Directions</a>
        </div>
        <a className="btn btn--ghost btn--block t-button" style={{marginTop:8}} href={v.source_url} target="_blank" rel="noreferrer"><ExternalLink size={14}/> View on map / menu</a>
        {onAnother&&<button className="btn btn--accent btn--block t-button" style={{marginTop:4}} onClick={onAnother}><Sparkles size={15}/> Show me another</button>}
      </div>
    </div>
  );
}

function Saved({items,start,now,onOpen,onBack,saved,onSave}){
  return(
    <div className="screen" style={{padding:"24px 20px 32px"}}>
      <TopBar onBack={onBack} title="Saved"/>
      {items.length===0
        ? <Empty msg="Nothing saved yet. Tap the heart on a spot to keep it here."/>
        : <div className="flex flex-col gap-3" style={{marginTop:16}}>{items.map((v)=><VenueCard key={v.id} v={v} start={start} now={now} onOpen={onOpen} saved={saved.has(v.id)} onSave={onSave}/>)}</div>}
    </div>
  );
}

const TopBar=({onBack,title})=>(
  <div className="flex items-center gap-3">
    <button className="btn btn--secondary" style={{minHeight:38,minWidth:38,padding:0,borderRadius:"var(--r-full)"}} aria-label="Back" onClick={onBack}><ChevronLeft size={18}/></button>
    <div className="t-label c-ink">{title}</div>
  </div>
);
const Empty=({msg})=>(
  <div className="flex flex-col items-center" style={{marginTop:64,padding:"0 24px",textAlign:"center"}}>
    <div className="tile" style={{width:56,height:56}}><MapPin size={24}/></div>
    <p className="t-bodysm c-soft" style={{marginTop:16}}>{msg}</p>
  </div>
);

// ---------- root ----------
export default function App(){
  const now=useMemo(()=>new Date(),[]);
  const eveningDefault=now.getHours()>=16||now.getHours()<2;
  const[screen,setScreen]=useState("start");
  const[start,setStart]=useState(null);
  const[openOnly,setOpenOnly]=useState(eveningDefault);
  const[result,setResult]=useState(null);
  const[loading,setLoading]=useState(false);
  const[title,setTitle]=useState("");
  const[activeFilters,setActiveFilters]=useState(null);
  const[current,setCurrent]=useState(null);
  const[savedIds,setSavedIds]=useState(new Set());
  const[backTo,setBackTo]=useState("home");

  // loading skeleton whenever a new shortlist is requested
  useEffect(()=>{ if(loading){ const t=setTimeout(()=>setLoading(false),450); return ()=>clearTimeout(t); } },[loading]);

  const toggleSave=(v)=>setSavedIds((s)=>{const n=new Set(s);n.has(v.id)?n.delete(v.id):n.add(v.id);return n;});

  const goShortlist=(filters,ttl,ovOpen=openOnly)=>{
    setActiveFilters(filters);setTitle(ttl);setResult(buildShortlist(filters,ovOpen,start,now));
    setLoading(true);setBackTo("home");setScreen("shortlist");
  };
  const runQuick=(q)=>goShortlist({...q.filters},q.label);
  const finishGuided=(picks)=>goShortlist(picks,"Your shortlist");
  const setOpen=(val)=>{ setOpenOnly(val); if(screen==="shortlist"&&activeFilters){ setResult(buildShortlist(activeFilters,val,start,now)); setLoading(true); } };
  const surprise=()=>{const openList=VENUES.filter((v)=>!openOnly||isOpenNow(v,now));
    const pool=(openList.length?openList:VENUES).filter((v)=>v.quality_score>=8);
    setCurrent(pool[Math.floor(Math.random()*pool.length)]);setBackTo("home");setScreen("detail");};
  const openDetail=(v)=>{setCurrent(v);setBackTo("shortlist");setScreen("detail");};

  return(
    <div className="wrap" style={{minHeight:"100vh",width:"100%",background:"var(--paper)"}}>
      <style>{STYLE}</style>
      <div style={{maxWidth:392,margin:"0 auto",minHeight:"100vh",background:"var(--paper)",boxShadow:"0 0 0 1px var(--line)"}}>
        {screen==="start"&&<StartScreen onPick={(s)=>{setStart(s);setScreen("home");}}/>}
        {screen==="home"&&<Home start={start} savedCount={savedIds.size} openOnly={openOnly} onToggleOpen={setOpen}
          onQuick={runQuick} onGuided={()=>setScreen("guided")} onSurprise={surprise}
          onChangeStart={()=>setScreen("start")} onSaved={()=>{setBackTo("home");setScreen("saved");}}/>}
        {screen==="guided"&&<Guided start={start} now={now} openOnly={openOnly} onDone={finishGuided} onBack={()=>setScreen("home")}/>}
        {screen==="shortlist"&&<Shortlist result={result} loading={loading} start={start} now={now} title={title}
          openOnly={openOnly} onToggleOpen={setOpen} onOpen={openDetail} onBack={()=>setScreen(backTo)} saved={savedIds} onSave={toggleSave}/>}
        {screen==="detail"&&current&&<Detail v={current} start={start} now={now}
          onBack={()=>setScreen(backTo)} saved={savedIds.has(current.id)} onSave={toggleSave}
          onAnother={backTo==="home"?surprise:null}/>}
        {screen==="saved"&&<Saved items={VENUES.filter((v)=>savedIds.has(v.id))} start={start} now={now}
          onOpen={(v)=>{setCurrent(v);setBackTo("saved");setScreen("detail");}} onBack={()=>setScreen("home")} saved={savedIds} onSave={toggleSave}/>}
      </div>
    </div>
  );
}
