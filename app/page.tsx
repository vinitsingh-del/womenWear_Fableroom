"use client";

import { useEffect, useMemo, useRef, useState } from "react";
import { looks, LOOKS_PATH } from "./look-data";

type Category = "Bags" | "Diamond Jewellery" | "Gemstone Jewellery" | "Scarves";
type Product = {
  id: number; name: string; category: Category; material: string; price: number;
  colour: string; images: string[]; note: string;
  occasion: string[]; mood: string[]; palette: string[];
};

const A = `${import.meta.env.BASE_URL}fr`;
const bag = (group: string, ...files: string[]) => files.map((file) => `${A}/bags/${group}/${file}.webp`);
const drive = (...files: string[]) => files.map((file) => `${A}/drive/${file}.webp`);

const CP = {
  bags: "https://fableroom.com/collections/handbags",
  diamond: "https://fableroom.com/collections/diamond-jewellery",
  gemstone: "https://fableroom.com/collections/gemstone-jewellery",
  scarves: "https://fableroom.com/collections/scarves",
};

const products: Product[] = [
  { id:1,name:"Apollo Crescent Suede Bag",category:"Bags",material:"Italian suede · Gold-tone studs",price:198,colour:"Tan",images:bag("apollo_02","01-08-2026-productshoot5356","01-08-2026-productshoot5357","01-08-2026-productshoot5361"),note:"Softly structured with an adjustable shoulder strap and hand-finished stud work.",occasion:["everyday","weekend","event"],mood:["relaxed","polished"],palette:["warm"] },

  { id:2,name:"Marlow Leather Hobo",category:"Bags",material:"Full-grain leather",price:229,colour:"Espresso",images:bag("apollo_01","01-08-2026-productshoot5323","01-08-2026-productshoot5326","01-08-2026-productshoot5337"),note:"A relaxed everyday shape, cut from full-grain leather that develops character with wear.",occasion:["everyday","work"],mood:["polished","minimal"],palette:["deep"] },
  { id:3,name:"Luna Suede Shoulder Bag",category:"Bags",material:"Brushed suede",price:189,colour:"Camel",images:bag("apollo_03","01-08-2026-productshoot5366","01-08-2026-productshoot5367","01-08-2026-productshoot5370"),note:"A compact curved silhouette with a tactile brushed finish and considered internal storage.",occasion:["weekend","event"],mood:["relaxed"],palette:["warm"] },
  { id:4,name:"Marlow Leather Backpack",category:"Bags",material:"Embossed full-grain leather",price:248,colour:"Chocolate",images:bag("apollo_11","01-08-2026-productshoot5484","01-08-2026-productshoot5492","01-08-2026-productshoot5500"),note:"A hands-free everyday shape with useful compartments and considered stitching.",occasion:["travel","work"],mood:["relaxed","minimal"],palette:["deep"] },
  { id:5,name:"Vela Woven Crossbody",category:"Bags",material:"Hand-woven leather",price:179,colour:"Black",images:bag("smart_07","01-08-2026-productshoot5394","01-08-2026-productshoot5396","01-08-2026-productshoot5402"),note:"Hand-woven panels bring quiet texture to a compact hands-free shape.",occasion:["everyday","travel"],mood:["minimal","polished"],palette:["deep"] },
  { id:6,name:"Noa Soft Leather Hobo",category:"Bags",material:"Supple leather",price:218,colour:"Black",images:bag("smart_08","01-08-2026-productshoot5435","01-08-2026-productshoot5440-1","01-08-2026-productshoot5447"),note:"An unstructured, softly draped bag designed to sit comfortably on the shoulder.",occasion:["everyday","work"],mood:["relaxed"],palette:["deep"] },
  { id:7,name:"Diamond Drop Hoops",category:"Diamond Jewellery",material:"Lab-grown diamonds · White metal",price:165,colour:"Silver",images:drive("lab-1","lab-4"),note:"A clean drop-hoop profile with a brilliant lab-grown diamond finish for everyday light.",occasion:["event","everyday"],mood:["polished"],palette:["neutral"] },
  { id:8,name:"Diamond Orbit Studs",category:"Diamond Jewellery",material:"Lab-grown diamonds · White metal",price:145,colour:"Silver",images:drive("lab-2","lab-1"),note:"Fine pavé circles frame a central lab-grown stone in a compact, easy-to-wear stud.",occasion:["work","everyday","gift"],mood:["minimal"],palette:["neutral"] },
  { id:9,name:"Diamond Line Hoops",category:"Diamond Jewellery",material:"Lab-grown diamonds · White metal",price:175,colour:"Silver",images:drive("lab-3","lab-2"),note:"A slender row of lab-grown stones brings a precise flash to a modern hoop.",occasion:["event","work"],mood:["polished"],palette:["neutral"] },
  { id:10,name:"Diamond Huggies",category:"Diamond Jewellery",material:"Lab-grown diamonds · White metal",price:155,colour:"Silver",images:drive("lab-4","lab-3"),note:"Close-fitting huggies finished with a single suspended lab-grown diamond.",occasion:["everyday","gift"],mood:["minimal"],palette:["neutral"] },
  { id:11,name:"Turquoise Charm Pendant",category:"Gemstone Jewellery",material:"Turquoise · Gold-tone setting",price:110,colour:"Gold",images:drive("gem-1","gem-2"),note:"A vivid turquoise centre set into an organically shaped gold-tone charm.",occasion:["event","everyday"],mood:["colourful","polished"],palette:["colour","warm"] },
  { id:12,name:"Rose Quartz Halo Pendant",category:"Gemstone Jewellery",material:"Rose quartz · Gold-tone setting",price:105,colour:"Gold",images:drive("gem-2","gem-3"),note:"Soft rose quartz is framed in a sculptural halo with a small light-catching accent.",occasion:["gift","event"],mood:["colourful","relaxed"],palette:["warm","colour"] },
  { id:13,name:"Moonstone Halo Pendant",category:"Gemstone Jewellery",material:"Moonstone · Gold-tone setting",price:108,colour:"Gold",images:drive("gem-3","gem-1"),note:"A luminous moonstone charm designed to show the natural variation of every stone.",occasion:["everyday","gift"],mood:["minimal","relaxed"],palette:["warm"] },
  { id:14,name:"Pearl Drop Huggies",category:"Gemstone Jewellery",material:"Freshwater pearl · Gold-tone hoop",price:98,colour:"Gold",images:drive("gem-4","gem-2"),note:"Baroque freshwater pearls bring an individual finish to polished everyday huggies.",occasion:["event","everyday"],mood:["polished"],palette:["warm","neutral"] },
  { id:15,name:"Merlot Cashmere Wrap",category:"Scarves",material:"Cashmere & merino wool · Soft fringe",price:95,colour:"Merlot",images:drive("scarf-1","scarf-2"),note:"A generous deep-red wrap with a fluid drape and softly finished fringe.",occasion:["everyday","work"],mood:["relaxed","colourful"],palette:["colour","deep"] },
  { id:16,name:"Ivory Everyday Scarf",category:"Scarves",material:"Cashmere & merino wool · Soft fringe",price:82,colour:"Ivory",images:drive("scarf-4","scarf-2"),note:"An easy neutral layer, light enough to drape and generous enough to wrap.",occasion:["everyday","event"],mood:["minimal","polished"],palette:["neutral"] },
  { id:17,name:"Midnight Merino Scarf",category:"Scarves",material:"Fine merino wool · Soft fringe",price:78,colour:"Navy",images:drive("scarf-3","scarf-1"),note:"A deep navy scarf with a smooth hand feel and useful everyday weight.",occasion:["work","travel"],mood:["polished","minimal"],palette:["deep"] },
  { id:18,name:"Oatmeal Cashmere Wrap",category:"Scarves",material:"Cashmere & merino wool · Woven finish",price:92,colour:"Oatmeal",images:drive("scarf-2","scarf-4"),note:"A close-woven neutral wrap that lets the material and finish lead.",occasion:["everyday","travel"],mood:["relaxed"],palette:["neutral","warm"] },
];

const Icon = ({name}:{name:"search"|"user"|"heart"|"bag"|"menu"|"close"|"arrow"|"minus"|"plus"}) => {
  const paths:Record<string,React.ReactNode>={
    search:<><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,user:<><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7"/></>,heart:<path d="M20.8 5.7c-2.2-2.4-5.8-1.9-7.5.7L12 8.2l-1.3-1.8C9 3.8 5.4 3.3 3.2 5.7.7 8.3 1 11.8 3.4 14.3L12 22l8.6-7.7c2.4-2.5 2.7-6 .2-8.6Z"/>,bag:<><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,menu:<><path d="M3 7h18M3 12h18M3 17h18"/></>,close:<path d="m5 5 14 14M19 5 5 19"/>,arrow:<path d="M5 12h14m-5-5 5 5-5 5"/>,minus:<path d="M5 12h14"/>,plus:<path d="M5 12h14M12 5v14"/>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};


const quizQuestions = [
  { key:"category", prompt:"What are you looking for?", options:[["Bags","Leather & suede handbags"],["Diamond Jewellery","Diamond jewellery"],["Gemstone Jewellery","Gemstone jewellery"],["Scarves","Cashmere & merino wool scarves"]]},
  { key:"occasion", prompt:"Where will you wear it?", options:[["everyday","Everyday"],["work","Workday"],["event","Evening or occasion"],["travel","Weekend or travel"],["gift","A considered gift"]]},
  { key:"mood", prompt:"How should it feel?", options:[["polished","Polished"],["minimal","Minimal"],["relaxed","Relaxed"],["colourful","Colour-led"]]},
  { key:"palette", prompt:"Which colours feel most like you?", options:[["neutral","Soft neutrals"],["deep","Deep tones"],["warm","Warm golds"],["colour","Natural colour"]]},
] as const;

const verifiedReviews = [
  { quote:"Rapid delivery, excellent product, exactly as described.", author:"Steve · Verified buyer" },
  { quote:"I love the philosophy of the brand.", author:"Emma · Verified buyer" },
  { quote:"Very pleased.", author:"Nicola T. · Verified buyer" },
];

let cancelActiveScroll: null | (()=>void) = null;

function smoothScrollTo(target:HTMLElement){
  cancelActiveScroll?.();
  const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  const headerOffset=window.matchMedia("(max-width: 760px)").matches?55:68;
  const start=window.scrollY;
  const destination=Math.max(0,target.getBoundingClientRect().top+start-headerOffset);
  const distance=destination-start;
  if(reduce||Math.abs(distance)<2){window.scrollTo(0,destination);return}
  const duration=Math.min(620,Math.max(260,Math.abs(distance)*.16));

  const started=performance.now();
  let frame=0;
  const cleanup=()=>{
    cancelAnimationFrame(frame);
    window.removeEventListener("wheel",cancel);
    window.removeEventListener("touchstart",cancel);
    window.removeEventListener("pointerdown",cancel);
    window.removeEventListener("keydown",cancel);
    if(cancelActiveScroll===cancel)cancelActiveScroll=null;
  };
  const cancel=()=>cleanup();
  const step=(now:number)=>{
    const progress=Math.min((now-started)/duration,1);
    const eased=1-Math.pow(1-progress,3);
    window.scrollTo(0,start+distance*eased);
    if(progress<1)frame=requestAnimationFrame(step);else cleanup();
  };
  window.addEventListener("wheel",cancel,{once:true,passive:true});
  window.addEventListener("touchstart",cancel,{once:true,passive:true});
  window.addEventListener("pointerdown",cancel,{once:true,passive:true});
  window.addEventListener("keydown",cancel,{once:true});
  cancelActiveScroll=cancel;
  frame=requestAnimationFrame(step);
}


export default function Home(){
  const [search,setSearch]=useState("");
  const [searchOpen,setSearchOpen]=useState(false);
  const [menuOpen,setMenuOpen]=useState(false);
  const [quick,setQuick]=useState<Product|null>(null);
  const [cartOpen,setCartOpen]=useState(false);
  const [wish,setWish]=useState<number[]>([]);
  const [cart,setCart]=useState<Record<number,number>>({});
  const [viewed,setViewed]=useState<number[]>([]);
  const [toast,setToast]=useState("");
  const [quizStep,setQuizStep]=useState(0);
  const [quiz,setQuiz]=useState<Record<string,string>>({});

  useEffect(()=>{const restore=window.setTimeout(()=>{try{setWish(JSON.parse(localStorage.getItem("fr-wish")||"[]"));setCart(JSON.parse(localStorage.getItem("fr-cart-v2")||"{}"));setViewed(JSON.parse(localStorage.getItem("fr-viewed")||"[]"))}catch{}},0);return()=>window.clearTimeout(restore)},[]);
  useEffect(()=>{localStorage.setItem("fr-wish",JSON.stringify(wish))},[wish]);
  useEffect(()=>{localStorage.setItem("fr-cart-v2",JSON.stringify(cart))},[cart]);
  useEffect(()=>{localStorage.setItem("fr-viewed",JSON.stringify(viewed))},[viewed]);
  useEffect(()=>{document.body.style.overflow=quick||cartOpen||menuOpen||searchOpen?"hidden":"";return()=>{document.body.style.overflow=""}},[quick,cartOpen,menuOpen,searchOpen]);
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),2200);return()=>clearTimeout(t)},[toast]);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const nodes=Array.from(document.querySelectorAll<HTMLElement>("[data-parallax]"));
    if(!nodes.length)return;
    let frame=0;
    const update=()=>{
      frame=0;
      const vh=window.innerHeight;
      nodes.forEach(node=>{
        const host=node.parentElement;
        if(!host)return;
        const box=host.getBoundingClientRect();
        if(box.bottom<-200||box.top>vh+200)return;
        const progress=(box.top+box.height/2-vh/2)/vh;
        if(node.dataset.parallax==="rotate"){
          // turn the product on its axis through the section rather than tilting it
          const turn=Math.max(-1,Math.min(1,progress*1.6));
          node.style.transform=`perspective(900px) rotateY(${(turn*40).toFixed(1)}deg) translate3d(0,${(progress*-5).toFixed(2)}%,0) scale(${(1.05-Math.abs(turn)*0.08).toFixed(3)})`;
          return;
        }
        node.style.transform=`translate3d(0,${(progress*-8).toFixed(2)}%,0) scale(1.2)`;
      });
    };
    const onScroll=()=>{if(!frame)frame=requestAnimationFrame(update)};
    update();
    window.addEventListener("scroll",onScroll,{passive:true});
    window.addEventListener("resize",onScroll,{passive:true});
    return()=>{window.removeEventListener("scroll",onScroll);window.removeEventListener("resize",onScroll);cancelAnimationFrame(frame)};
  },[]);
  useEffect(()=>{
    const onAnchorClick=(event:MouseEvent)=>{
      if(event.defaultPrevented||event.button!==0||event.metaKey||event.ctrlKey||event.shiftKey||event.altKey)return;
      const anchor=(event.target as Element|null)?.closest<HTMLAnchorElement>('a[href^="#"]');
      if(!anchor)return;
      const hash=anchor.getAttribute("href");

      if(!hash||hash==="#")return;
      const target=document.getElementById(decodeURIComponent(hash.slice(1)));
      if(!target)return;
      event.preventDefault();
      history.replaceState(null,"",hash);
      requestAnimationFrame(()=>smoothScrollTo(target));
    };
    document.addEventListener("click",onAnchorClick);
    return()=>{document.removeEventListener("click",onAnchorClick);cancelActiveScroll?.()};
  },[]);
  useEffect(()=>{
    const reduce=window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const selectors=[
      ".category-section .section-heading", ".category-grid", ".trust-box", ".material-head", ".material-rail",
      ".merch-category > header", ".subcategories", ".merch-feature", ".merch-category .product-grid", ".scarf-style-grid",
      ".edit-category-grid", ".scarf-feature",
      ".trending .section-heading", ".trend-grid", ".looks .section-heading", ".look-stage", ".look-shop-rail", ".recommended .section-heading",
      ".recommended .product-grid", ".reviews", ".out-about .section-heading", ".ugc-rail", ".finder", ".faq", ".newsletter", ".site-footer"
    ];
    const nodes=Array.from(document.querySelectorAll<HTMLElement>(selectors.join(","))).filter(node=>!node.closest(".hero"));
    nodes.forEach((node,index)=>{node.classList.add("motion-reveal");node.style.setProperty("--reveal-delay",`${(index%4)*65}ms`)});
    document.documentElement.classList.add("motion-ready");
    if(reduce){nodes.forEach(node=>node.classList.add("is-visible"));return()=>document.documentElement.classList.remove("motion-ready")}
    const observer=new IntersectionObserver(entries=>entries.forEach(entry=>{if(entry.isIntersecting){entry.target.classList.add("is-visible");observer.unobserve(entry.target)}}),{threshold:.1,rootMargin:"0px 0px -6% 0px"});
    nodes.forEach(node=>{
      // Anything already scrolled past is shown at once. Without this, a deep
      // link or a restored scroll position leaves everything above the landing
      // point stuck at opacity 0, because it never re-enters the viewport.
      if(node.getBoundingClientRect().bottom<0){node.classList.add("is-visible");return}
      observer.observe(node);
    });

    return()=>{observer.disconnect();document.documentElement.classList.remove("motion-ready")};
  },[]);

  const cartCount=Object.values(cart).reduce((a,b)=>a+b,0);
  const subtotal=products.reduce((sum,p)=>sum+p.price*(cart[p.id]||0),0);
  const add=(id:number)=>{setCart(c=>({...c,[id]:(c[id]||0)+1}));setToast("Added to your bag")};
  const toggleWish=(id:number)=>setWish(w=>w.includes(id)?w.filter(x=>x!==id):[...w,id]);
  const openProduct=(p:Product)=>{setQuick(p);setViewed(v=>[p.id,...v.filter(id=>id!==p.id)].slice(0,12))};
  const chooseQuiz=(key:string,value:string)=>{setQuiz(q=>({...q,[key]:value}));setQuizStep(s=>s+1)};
  const quizMatches=useMemo(()=>products.filter(p=>!quiz.category||p.category===quiz.category).map(p=>({p,score:Number(p.occasion.includes(quiz.occasion))+Number(p.mood.includes(quiz.mood))+Number(p.palette.includes(quiz.palette))})).sort((a,b)=>b.score-a.score).slice(0,4).map(x=>x.p),[quiz]);
  const recommended=useMemo(()=>{const last=products.find(p=>p.id===viewed[0]);const preferred=last?products.filter(p=>p.category===last.category&&p.id!==last.id):[products[1],products[7],products[10],products[15]];return [...preferred,...products.filter(p=>!preferred.includes(p))].slice(0,4)},[viewed]);

  return <main>
    <div className="announce"><span>Thoughtfully made, honestly sourced</span><i/><span>Complimentary UK delivery and easy returns</span></div>
    <header className="header">
      <button className="mobile-only icon-button" onClick={()=>setMenuOpen(true)} aria-label="Open menu"><Icon name="menu"/></button>
      <a className="wordmark" href="#top">FABLEROOM</a>
      <nav className="desktop-nav"><a href="#top">Home</a><a className="active" href="#collection">Fashion & Lifestyle</a><a href="#collection">Collections</a><a href="#proof">Our craft</a><a href="#reviews">Reviews</a></nav>
      <div className="header-actions"><button onClick={()=>setSearchOpen(true)} aria-label="Search"><Icon name="search"/></button><button className="desktop-icon" aria-label="Account"><Icon name="user"/></button><button className="desktop-icon" onClick={()=>{const target=document.getElementById("recommended");if(target)smoothScrollTo(target)}} aria-label="Wishlist"><Icon name="heart"/><b>{wish.length||""}</b></button><button onClick={()=>setCartOpen(true)} aria-label="Shopping bag"><Icon name="bag"/><b>{cartCount||""}</b></button></div>
    </header>

    <section className="hero" id="top">
      <video className="hero-video" src={`${A}/editorial/hero-women-slide-2.mp4`} autoPlay muted playsInline loop preload="auto" aria-label="FableRoom woman styling a suede bag, scarf and jewellery"/>
      <div className="hero-shade"/><div className="hero-copy"><p className="eyebrow light">THE AUGUST DROP</p><h1>From your rooms<br/>to your wardrobe.</h1><p>Diamond brilliance, real gemstones, tactile scarves and specialist-made leather. The FableRoom point of view, now in what you wear and carry.</p></div>
    </section>


    <section className="section category-section" id="collection">
      <div className="section-heading"><p className="eyebrow">FOUR WAYS TO WEAR FABLEROOM</p><h2>Start with the collection.</h2><p>Four distinct material stories, routed directly to their collections.</p></div>
      <div className="category-grid">
        <CategoryCard href={CP.bags} title="Leather & Suede Bags" copy="Tactile materials, useful silhouettes." image={`${A}/lifestyle/look-scarf-on-bag.webp`}/>
        <CategoryCard href={CP.diamond} title="Diamond Jewellery" copy="Lab-grown brilliance, clean settings." image={`${A}/drive/lab-1.webp`} video={`${A}/motion/diamond-category-clean.mp4`}/>
        <CategoryCard href={CP.gemstone} title="Gemstone Jewellery" copy="Natural colour, made for layering." image={`${A}/motion/gemstone-pendant-poster.webp`} video={`${A}/motion/gemstone-pendant.mp4`}/>
        <CategoryCard href={CP.scarves} title="Cashmere & Merino Scarves" copy="Soft fibres, easy everyday drape." image={`${A}/editorial/scarf-lifestyle.webp`}/>
      </div>
    </section>

    <section className="trust-and-proof" id="proof">
      <div className="trust-box" aria-label="Why FableRoom" style={{backgroundImage:`url(${A}/editorial/hero-women-fashion-lifestyle.webp)`}}>
        <TrustStat icon="⌂" end={14000} suffix="+" label="Happy homes"/>
        <TrustStat icon="◇" end={6} prefix="£" suffix="M+" label="Customer savings"/>
        <TrustStat icon="✦" end={100} suffix="%" label="Responsibly sourced"/>
        <TrustStat icon="—" end={0} label="Middlemen markups"/>
      </div>
      <div className="section material-wrap"><div className="material-head"><div><p className="eyebrow">THE PROOF IS IN THE DETAIL</p><h2>Reasons to believe,<br/>seen up close.</h2></div><p>Non-clickable material studies explain what is specific and valuable about each collection—without creating another discovery layer.</p></div>
        <div className="material-rail">
          <Material image={`${A}/editorial/a-plus-leather.webp`} index="01" title="Full-grain leather and suede" copy="Visible grain, hand-finished edges and construction designed to develop character with use."/>
          <Material image={`${A}/generated/diamond-precision-setting.webp`} video={`${A}/motion/precision-brilliance.mp4`} index="02" title="Precision-set brilliance" copy="Lab-grown diamonds aligned in clean settings so proportion and light remain the focus."/>
          <Material image={`${A}/editorial/a-plus-jewellery.webp`} index="03" title="Each stone is individual" copy="Natural turquoise, moonstone, rose quartz and pearl retain the variation that makes them distinctive."/>
          <Material image={`${A}/editorial/a-plus-scarf.webp`} index="04" title="Fine fibres, generous drape" copy="Cashmere and merino wool chosen for softness, warmth without bulk and a fluid everyday finish."/>
        </div>

      </div>
    </section>

    <CategoryEdit id="bags" variant="panorama" index="01" kicker="PURE LEATHER & SUEDE" title="The Bag Edit" copy="Useful shapes and specialist craft, organised by the way you carry." category="Bags" subcategories={[["Totes",CP.bags],["Cross Body",CP.bags],["Clutches",CP.bags],["Weekenders",CP.bags]]} image={`${A}/editorial/hero-women-fashion-lifestyle.webp`} products={products.filter(p=>p.category==="Bags")}/>
    <CategoryEdit id="diamonds" variant="reverse" index="02" kicker="LAB-GROWN DIAMONDS" title="The Lab-Grown Diamond Edit" copy="Clean settings and modern scale, organised by jewellery type." category="Diamond Jewellery" subcategories={[["Necklaces",CP.diamond],["Bracelets",CP.diamond],["Earrings",CP.diamond],["Rings",CP.diamond]]} cutout image={`${A}/diamond/hero-earrings.webp`} tileImages={[`${A}/diamond/necklaces.webp`,`${A}/diamond/bracelets.webp`,`${A}/diamond/earrings.webp`,`${A}/diamond/rings.webp`]} products={products.filter(p=>p.category==="Diamond Jewellery")}/>
    <CategoryEdit id="gemstones" variant="mosaic" index="03" kicker="RAW & NATURAL" title="The Gemstone Edit" copy="Individual colour, organic variation and pieces designed to layer." category="Gemstone Jewellery" subcategories={[["Earrings",CP.gemstone],["Pendants",CP.gemstone],["Cuffs",CP.gemstone],["Necklaces",CP.gemstone]]} image={`${A}/lifestyle/look-statement-gemstone.webp`} products={products.filter(p=>p.category==="Gemstone Jewellery")}/>
    <ScarfEdit products={products.filter(p=>p.category==="Scarves")} wish={wish} onWish={toggleWish} onOpen={openProduct}/>

    <section className="section trending" id="new"><div className="section-heading split"><div><p className="eyebrow">WHAT’S NEW & TRENDING</p><h2>A space for what comes next.</h2></div><p>Built to hold future drops, new arrivals and timely curated collections without rebuilding the page.</p></div><div className="trend-grid"><a className="trend-lead" href={CP.bags}><img src={`${A}/lifestyle/look-scarf-on-bag.webp`} alt="Scarf styled on a structured handbag"/><span><small>THE CURRENT NOTE</small><b>Scarf on the bag</b><em>Explore the collection</em></span></a><a href={CP.bags}><img src={`${A}/bags/apollo_02/01-08-2026-productshoot5356.webp`} alt="Tan suede shoulder bag"/><span><small>NEW MATERIAL</small><b>Suede, now</b></span></a><a href={CP.scarves}><img src={`${A}/drive/scarf-1.webp`} alt="Merlot scarf styled on a model"/><span><small>COLOUR EDIT</small><b>The merlot layer</b></span></a></div></section>

    <ShopTheLook onOpen={openProduct} onAddLook={ids=>{setCart(c=>{const n={...c};ids.forEach(id=>{n[id]=(n[id]||0)+1});return n});setToast("Look added to your bag")}}/>

    <section className="section recommended" id="recommended"><div className="section-heading split"><div><p className="eyebrow">RECOMMENDED FOR YOU</p><h2>{viewed.length?"More from what you viewed.":"A considered place to begin."}</h2></div><p>{viewed.length?"This rail adapts to product categories opened during this visit.":"Open a product and this selection will begin adapting to your browsing behaviour."}</p></div><div className="product-grid compact">{recommended.map(p=><ProductCard key={p.id} product={p} wished={wish.includes(p.id)} onWish={()=>toggleWish(p.id)} onOpen={()=>openProduct(p)}/>)}</div></section>

    <section className="reviews" id="reviews"><div className="review-score"><p className="eyebrow light">CUSTOMER REVIEWS</p><strong>4.6</strong><div>★★★★★</div><span>Excellent · 1,190 Trustpilot reviews</span><a href="https://uk.trustpilot.com/review/fableroom.com" target="_blank" rel="noreferrer">Read verified reviews</a></div><div className="review-window" aria-label="Verified customer reviews"><div className="review-track">{[...verifiedReviews,...verifiedReviews].map((review,index)=><blockquote key={`${review.author}-${index}`} aria-hidden={index>=verifiedReviews.length}><span>0{(index%verifiedReviews.length)+1}</span><p>“{review.quote}”</p><footer>{review.author}</footer></blockquote>)}</div></div></section>

    <section className="section out-about"><div className="section-heading split"><div><p className="eyebrow">OUT & ABOUT</p><h2>Styled beyond the studio.</h2></div><p>A living visual layer designed for customer, creator and street-style submissions as the collection launches.</p></div><div className="ugc-rail">{looks.slice(5,10).map(look=><figure key={look.id}><img src={look.image} alt={look.alt}/><figcaption><b>{look.title}</b><span>#{look.searchTerm.replaceAll(" ","")}</span></figcaption></figure>)}</div></section>

    <section className="finder section" id="quiz"><div className="finder-image"><img src={`${A}/lifestyle/look-gold-scarf-quiz.webp`} alt="Woman wearing an ivory scarf and layered gold jewellery"/></div><div className="finder-card"><p className="eyebrow">FIND YOUR FABLEROOM PIECE</p><h2>Start with the category.</h2>{quizStep<quizQuestions.length?<><div className="quiz-progress"><span style={{width:`${((quizStep+1)/quizQuestions.length)*100}%`}}/></div><p className="quiz-question">{quizQuestions[quizStep].prompt}</p><div className="quiz-options">{quizQuestions[quizStep].options.map(([value,label])=><button key={value} onClick={()=>chooseQuiz(quizQuestions[quizStep].key,value)}>{label}<Icon name="arrow"/></button>)}</div></>:<div className="quiz-result"><span>YOUR CATEGORY-FIRST MATCH</span><h3>{quiz.category}</h3><p>Filtered by your occasion, mood and colour choices.</p><div className="quiz-products">{quizMatches.map(p=><button key={p.id} onClick={()=>openProduct(p)}><img src={p.images[0]} alt=""/><span><b>{p.name}</b><small>£{p.price}.00</small></span></button>)}</div><button className="reset" onClick={()=>{setQuiz({});setQuizStep(0)}}>Start again</button></div>}</div></section>

    <section className="faq section" id="faq"><div><p className="eyebrow">NEED TO KNOW</p><h2>Materials, care<br/>and delivery.</h2><p>Expanded guidance for the four collections.</p></div><div className="faq-list"><Faq q="What makes the leather and suede different?">The edit focuses on full-grain leather and tactile suede, with visible grain, stitching, hardware and interiors. Natural variation is part of the material rather than a defect.</Faq><Faq q="How should I care for a leather handbag?">Keep it dry, avoid prolonged direct sunlight and store it filled in its dust bag. Use only care products suitable for the specific leather or suede stated on the product page.</Faq><Faq q="Are lab-grown diamonds real diamonds?">Lab-grown diamonds share the same essential material characteristics as mined diamonds but are created in a controlled environment. Specifications should be checked on each product page.</Faq><Faq q="How should I store jewellery?">Keep pieces dry and separated in soft pouches. Add perfume and skincare before jewellery, then wipe pieces gently after wear with a soft, non-abrasive cloth.</Faq><Faq q="Are the gemstones identical?">No. Natural stones such as turquoise, moonstone, rose quartz and freshwater pearl vary subtly in colour, pattern and shape. Those differences make each piece individual.</Faq><Faq q="How should I care for cashmere and merino wool?">Air between wears, fold rather than hang and follow the individual care label. Pilling can occur naturally with fine fibres and can be removed carefully with a cashmere comb.</Faq><Faq q="How do delivery and returns work?">Delivery timing and charges appear on the individual product page and at checkout. Most eligible products can be returned within 14 days; final terms depend on the item and destination.</Faq><Faq q="Is there a product guarantee?">FableRoom’s product pages state the applicable quality guarantee and exclusions. Keep your order information and contact customer care promptly if you notice a verified defect.</Faq></div></section>

    <section className="newsletter"><p className="eyebrow light">THE FABLEROOM EDIT</p><h2>Be first to see<br/>what comes next.</h2><p>New drops, maker stories and considered offers—sent occasionally.</p><form onSubmit={e=>{e.preventDefault();setToast("You’re on the list")}}><input type="email" required placeholder="Your email address" aria-label="Email address"/><button>Join the edit</button></form></section>
    <Footer/>


    {menuOpen&&<Overlay close={()=>setMenuOpen(false)}><div className="mobile-menu"><button className="panel-close" onClick={()=>setMenuOpen(false)}><Icon name="close"/></button><b className="wordmark">FABLEROOM</b><nav><a href="#collection" onClick={()=>setMenuOpen(false)}>Collections</a><a href="#proof" onClick={()=>setMenuOpen(false)}>The detail</a><a href="#bags" onClick={()=>setMenuOpen(false)}>The edits</a><a href="#shop-the-look" onClick={()=>setMenuOpen(false)}>Shop the look</a><a href="#quiz" onClick={()=>setMenuOpen(false)}>Find your piece</a></nav></div></Overlay>}
    {searchOpen&&<Overlay close={()=>setSearchOpen(false)}><div className="search-panel"><button className="panel-close" onClick={()=>setSearchOpen(false)}><Icon name="close"/></button><p className="eyebrow">SEARCH THE EDIT</p><div className="search-field"><Icon name="search"/><input autoFocus value={search} onChange={e=>setSearch(e.target.value)} placeholder="Search bags, diamonds, gemstones, scarves..."/><button onClick={()=>setSearch("")}>Clear</button></div><div className="search-results">{products.filter(p=>`${p.name} ${p.category} ${p.material}`.toLowerCase().includes(search.toLowerCase())).slice(0,6).map(p=><button key={p.id} onClick={()=>{openProduct(p);setSearchOpen(false)}}><img src={p.images[0]} alt=""/><span><b>{p.name}</b><small>{p.category} · £{p.price}</small></span></button>)}</div></div></Overlay>}
    {quick&&<Overlay close={()=>setQuick(null)}><QuickView key={quick.id} p={quick} onClose={()=>setQuick(null)} onAdd={()=>add(quick.id)} wished={wish.includes(quick.id)} onWish={()=>toggleWish(quick.id)}/></Overlay>}
    {cartOpen&&<Overlay close={()=>setCartOpen(false)}><CartDrawer cart={cart} setCart={setCart} subtotal={subtotal} close={()=>setCartOpen(false)}/></Overlay>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </main>;
}

// Each banner carries the pieces the model is actually wearing; the cards below
// swap with the banner.
const lookBanners=[
  {src:"lookbanners/look-navy-scarf",productIds:[17,2,11],alt:"Model wearing a navy merino scarf and turquoise pendant with an espresso leather tote"},
  {src:"lookbanners/look-tote",productIds:[2,14],alt:"Model carrying an espresso leather shoulder bag with pearl huggies"},
  {src:"lookbanners/look-pendant",productIds:[12,11],alt:"Model wearing a gold pendant with a rose quartz stone"},
  {src:"lookbanners/look-chain-tote",productIds:[2,17],alt:"Model in a tailored blazer carrying a chain-strap leather tote"},
  {src:"lookbanners/look-backpack-worn",productIds:[4],alt:"Model wearing an embossed leather backpack"},
];

function ShopTheLook({onOpen,onAddLook}:{onOpen:(p:Product)=>void;onAddLook:(ids:number[])=>void}){
  const [slide,setSlide]=useState(0);
  useEffect(()=>{
    if(window.matchMedia("(prefers-reduced-motion: reduce)").matches)return;
    const timer=window.setInterval(()=>setSlide(s=>(s+1)%lookBanners.length),5200);
    return()=>window.clearInterval(timer);
  },[]);
  const shown=lookBanners[slide].productIds.map(id=>products.find(p=>p.id===id)).filter(Boolean) as Product[];
  return <section className="section looks looks-premium" id="shop-the-look">
    <div className="section-heading split"><div><p className="eyebrow">SHOP THE LOOK</p><h2>Ways to wear the edit.</h2></div><div><p>Search-led outfit ideas combining handbags, jewellery and scarves.</p><a className="underlink" href={LOOKS_PATH}>View all looks <Icon name="arrow"/></a></div></div>
    <div className="look-stage">
      {lookBanners.map((banner,i)=><button key={banner.src} className={`look-stage-slide ${i===slide?"is-on":""}`} onClick={()=>setSlide(i)} tabIndex={i===slide?0:-1} aria-hidden={i!==slide} aria-label={banner.alt}><img src={`${A}/${banner.src}.webp`} alt={banner.alt}/></button>)}
      <button className="look-nav prev" onClick={()=>setSlide(s=>(s-1+lookBanners.length)%lookBanners.length)} aria-label="Previous look"><Icon name="arrow"/></button>
      <button className="look-nav next" onClick={()=>setSlide(s=>(s+1)%lookBanners.length)} aria-label="Next look"><Icon name="arrow"/></button>
      <div className="look-stage-dots">{lookBanners.map((banner,i)=><button key={banner.src} className={i===slide?"on":""} onClick={()=>setSlide(i)} aria-label={`Look ${i+1}`}/>)}</div>
    </div>
    <div className="look-shop-rail" data-count={shown.length} key={slide}>{shown.map(p=><button key={p.id} className="look-shop-card" onClick={()=>onOpen(p)}><span className="look-shop-image"><img src={p.images[0]} alt={p.name} loading="lazy"/></span><b>{p.name}</b><em>£{p.price}.00</em></button>)}</div>
    <button className="look-add" onClick={()=>onAddLook(shown.map(p=>p.id))}>Add the look to bag<Icon name="bag"/></button>
  </section>;
}

function SmartVideo({src,poster,ariaLabel,restartOnView=false,parallax=false}:{src:string;poster:string;ariaLabel:string;restartOnView?:boolean;parallax?:boolean}){
  const ref=useRef<HTMLVideoElement>(null);
  const hasPlayed=useRef(false);
  const hasLeftView=useRef(false);
  useEffect(()=>{
    const video=ref.current;
    if(!video)return;
    const start=()=>{void video.play().catch(()=>{})};
    const restart=()=>{
      if(video.readyState>=1)video.currentTime=0;
      else video.addEventListener("loadedmetadata",()=>{video.currentTime=0},{once:true});
    };
    const observer=new IntersectionObserver(([entry])=>{
      if(entry.isIntersecting){
        if(restartOnView&&hasPlayed.current&&hasLeftView.current)restart();
        hasLeftView.current=false;
        hasPlayed.current=true;

        start();
      }else if(hasPlayed.current){
        hasLeftView.current=true;
      }
    },{threshold:.01,rootMargin:"320px 0px"});
    observer.observe(video);
    start();
    return()=>{observer.disconnect();video.pause()};
  },[restartOnView]);
  return <video ref={ref} src={src} poster={poster} muted playsInline loop autoPlay preload="auto" aria-label={ariaLabel} {...(parallax?{"data-parallax":""}:{})}/>;
}
function CategoryCard({href,title,copy,image,video}:{href:string;title:string;copy:string;image:string;video?:string}){return <a className={`category-card ${video?"category-motion":""}`} href={href}>{video?<SmartVideo src={video} poster={image} ariaLabel={`${title} product film`} restartOnView={title==="Diamond Jewellery"}/>:<img src={image} alt={title}/>}<span><h3>{title}</h3><p>{copy}</p><u>Explore Collection</u></span></a>}
function CountUp({end,prefix="",suffix=""}:{end:number;prefix?:string;suffix?:string}){
  const ref=useRef<HTMLElement>(null);
  const [value,setValue]=useState(0);
  useEffect(()=>{
    const node=ref.current;
    if(!node)return;
    let frame=0;
    let ran=false;
    const finish=()=>setValue(end);
    const run=()=>{
      if(ran)return;
      ran=true;
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){finish();return}

      const started=performance.now();
      const animate=(now:number)=>{
        const progress=Math.min((now-started)/1100,1);
        setValue(Math.round(end*(1-Math.pow(1-progress,3))));
        if(progress<1)frame=requestAnimationFrame(animate);
      };
      frame=requestAnimationFrame(animate);
    };
    let loop=0;
    const observer=new IntersectionObserver(([entry])=>{
      if(!entry.isIntersecting)return;
      run();
      if(window.matchMedia("(prefers-reduced-motion: reduce)").matches){observer.disconnect();return}
      // Recount on a loop so the proof stats keep reading as live numbers.
      loop=window.setInterval(()=>{ran=false;setValue(0);run()},7000);
      observer.disconnect();
    },{threshold:.08,rootMargin:"0px 0px -8%"});
    observer.observe(node);
    return()=>{observer.disconnect();cancelAnimationFrame(frame);window.clearInterval(loop)};
  },[end]);
  return <b ref={ref}>{prefix}{value.toLocaleString("en-GB")}{suffix}</b>;
}
function TrustStat({icon,end,prefix,suffix,label}:{icon:string;end:number;prefix?:string;suffix?:string;label:string}){return <span><i className="trust-icon" aria-hidden="true">{icon}</i><span className="trust-copy"><CountUp end={end} prefix={prefix} suffix={suffix}/><small>{label}</small></span></span>}
function Material({image,images,video,index,title,copy}:{image?:string;images?:string[];video?:string;index:string;title:string;copy:string}){return <article className={`material-card ${video?"material-motion":""} ${images?.length?"material-card-pair":""}`}>{images?.length?<div className="material-visual-pair">{images.map((src,i)=><img key={src} src={src} alt={`${title} — ${i===0?"diamond setting in progress":"finished aligned diamonds"}`}/>)}</div>:video&&image?<span className="material-visual"><SmartVideo src={video} poster={image} ariaLabel={`${title} close-up film`} parallax/></span>:image?<img src={image} alt=""/>:null}<div className="material-copy"><small>{index} · MATERIAL NOTE</small><h3>{title}</h3><p>{copy}</p></div></article>}
function CategoryEdit({id,variant,index,kicker,title,copy,category,subcategories,image,video,tileImages,cutout,products:items}:{id:string;variant:"panorama"|"reverse"|"mosaic";index:string;kicker:string;title:string;copy:string;category:Category;subcategories:string[][];image:string;video?:string;tileImages?:string[];cutout?:boolean;products:Product[]}){return <section className={`merch-category merch-${id} merch-${variant}`} id={id}><header><span>{index}</span><div><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{copy}</p></div></header><figure className={`merch-feature ${cutout?"feature-cutout":""}`}>{video?<SmartVideo src={video} poster={image} ariaLabel={`${title} collection film`}/>:<img className="feature-media" src={image} alt={`${title} lifestyle`}/>}<a className="feature-cta" href={subcategories[0][1]}>Explore now<Icon name="arrow"/></a></figure><div className="edit-category-grid">{subcategories.map(([label,href],i)=>{const piece=items[i%items.length];return <a key={label} href={href}><img src={tileImages?.[i]||piece.images[0]} alt={`${label} in ${category}`}/><span><small>{String(i+1).padStart(2,"0")}</small><b><i>{label}</i><Icon name="arrow"/></b></span></a>})}</div></section>}
const SCARF_SHOTS:Record<number,string>={15:`${A}/drive/scarf-1.webp`,16:`${A}/drive/scarf-4.webp`,17:`${A}/editorial/scarf-lifestyle.webp`,18:`${A}/lifestyle/look-cashmere-neutral.webp`};
const SCARF_FILTERS:[string,(p:Product)=>boolean][]=[
  ["All Scarves",()=>true],
  ["Cashmere",p=>p.material.toLowerCase().includes("cashmere")],
  ["Merino Wool",p=>p.material.toLowerCase().includes("merino")&&!p.material.toLowerCase().includes("cashmere")],
];

function ScarfEdit({products:items,wish,onWish,onOpen}:{products:Product[];wish:number[];onWish:(id:number)=>void;onOpen:(p:Product)=>void}){
  const [filter,setFilter]=useState(0);
  const [active,setActive]=useState<number|null>(null);
  // Touch devices fire pointerenter while scrolling the rail, which swapped the
  // lifestyle banner for a product cutout. Only hover-capable pointers preview.
  const [canHover,setCanHover]=useState(false);
  useEffect(()=>{setCanHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches)},[]);
  const preview=(i:number|null)=>{if(canHover)setActive(i)};
  const shown=items.filter(SCARF_FILTERS[filter][1]);
  useEffect(()=>{setActive(null)},[filter]);
  return <section className="merch-category merch-scarves" id="scarves">
    <header><span>04</span><div><p className="eyebrow">CASHMERE &amp; MERINO WOOL</p><h2>The Scarf Edit</h2><p>With a focused collection, discovery moves directly to four styled pieces rather than another broad L‑2 layer.</p></div></header>
    <nav className="subcategories" aria-label="Filter scarves">{SCARF_FILTERS.map(([label],i)=><button key={label} className={i===filter?"is-on":""} aria-pressed={i===filter} onClick={()=>setFilter(i)}>{label}</button>)}</nav>
    <figure className={`scarf-feature ${active!==null?"feature-active":""}`}>
      <img src={active!==null&&shown[active]?shown[active].images[0]:`${A}/editorial/scarf-lifestyle.webp`} alt={active!==null&&shown[active]?`${shown[active].name} close-up`:"Cashmere and merino wool scarf styling"}/>
      <a className="feature-cta" href={CP.scarves}>Explore now<Icon name="arrow"/></a>
    </figure>
    <div className="scarf-style-grid">{shown.map((p,i)=><article key={p.id} onPointerEnter={()=>preview(i)} onPointerLeave={()=>preview(null)} onFocusCapture={()=>preview(i)} onBlurCapture={()=>preview(null)}><button className="scarf-image" onClick={()=>onOpen(p)}><img src={SCARF_SHOTS[p.id]||p.images[0]} alt={`${p.name} styled on a model`}/><span>View piece</span></button><div><small>{p.material}</small><h3>{p.name}</h3><b>£{p.price}.00</b><button className={`mini-wish ${wish.includes(p.id)?"wished":""}`} onClick={()=>onWish(p.id)} aria-label="Save scarf"><Icon name="heart"/></button></div></article>)}</div>
  </section>;
}
function ProductCard({product:p,wished,onWish,onOpen,onPreview,onPreviewEnd}:{product:Product;wished:boolean;onWish:()=>void;onOpen:()=>void;onPreview?:()=>void;onPreviewEnd?:()=>void}){return <article className="product-card" onPointerEnter={onPreview} onPointerLeave={onPreviewEnd} onFocusCapture={onPreview} onBlurCapture={onPreviewEnd}><button className="product-image" onClick={onOpen}><img className="primary" src={p.images[0]} alt={p.name} loading="lazy"/><img className="secondary" src={p.images[1]||p.images[0]} alt="" loading="lazy"/><span>Quick view</span></button><button className={`wish ${wished?"wished":""}`} onClick={onWish} aria-label="Save to wishlist"><Icon name="heart"/></button><div className="product-copy"><small>{p.category}</small><h3><button onClick={onOpen}>{p.name}</button></h3><p>{p.material}</p><div><b>£{p.price}.00</b><button onClick={onOpen}>View details</button></div></div></article>}
function Faq({q,children}:{q:string;children:React.ReactNode}){return <details><summary>{q}</summary><p>{children}</p></details>}
function Overlay({children,close}:{children:React.ReactNode;close:()=>void}){useEffect(()=>{const k=(e:KeyboardEvent)=>e.key==="Escape"&&close();addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[close]);return <div className="overlay" onMouseDown={e=>e.currentTarget===e.target&&close()}>{children}</div>}
function QuickView({p,onClose,onAdd,wished,onWish}:{p:Product;onClose:()=>void;onAdd:()=>void;wished:boolean;onWish:()=>void}){const [idx,setIdx]=useState(0);return <aside className="pdp-view"><button className="panel-close pdp-close" onClick={onClose}><Icon name="close"/></button><div className="pdp-main"><div className="pdp-gallery"><img src={p.images[idx]} alt={p.name}/><div>{p.images.map((im,i)=><button key={im} className={idx===i?"active":""} onClick={()=>setIdx(i)}><img src={im} alt=""/></button>)}</div></div><div className="pdp-copy"><p className="eyebrow">{p.category}</p><h2>{p.name}</h2><p>{p.material}</p><strong>£{p.price}.00</strong><p>{p.note}</p><div className="colour"><span>Colour: <b>{p.colour}</b></span><i style={{background:p.colour.toLowerCase()}}/></div><ul><li>Authentic materials, clearly identified</li><li>Direct from specialist makers</li><li>Delivery and returns confirmed at checkout</li></ul><div className="pdp-actions"><button className="button dark" onClick={onAdd}>Add to bag · £{p.price}.00</button><button className={`outline-heart ${wished?"wished":""}`} onClick={onWish}><Icon name="heart"/></button></div></div></div><section className="pdp-style"><img src={looks[0].image} alt={looks[0].alt}/><div><p className="eyebrow">STYLE IT YOUR WAY</p><h3>{looks[0].title}</h3><p>{looks[0].copy}</p><a className="underlink" href={LOOKS_PATH}>See all looks <Icon name="arrow"/></a></div></section></aside>}
function CartDrawer({cart,setCart,subtotal,close}:{cart:Record<number,number>;setCart:React.Dispatch<React.SetStateAction<Record<number,number>>>;subtotal:number;close:()=>void}){const lines=products.filter(p=>cart[p.id]);const update=(id:number,n:number)=>setCart(c=>{const x={...c};if(n<=0)delete x[id];else x[id]=n;return x});return <aside className="cart-drawer"><div className="cart-head"><div><p className="eyebrow">YOUR EDIT</p><h2>Shopping bag</h2></div><button onClick={close}><Icon name="close"/></button></div>{lines.length?<><div className="cart-lines">{lines.map(p=><article key={p.id}><img src={p.images[0]} alt=""/><div><h3>{p.name}</h3><p>{p.colour} · £{p.price}.00</p><div className="qty"><button onClick={()=>update(p.id,cart[p.id]-1)}><Icon name="minus"/></button><span>{cart[p.id]}</span><button onClick={()=>update(p.id,cart[p.id]+1)}><Icon name="plus"/></button></div></div><button className="remove" onClick={()=>update(p.id,0)}>Remove</button></article>)}</div><div className="cart-bottom"><p><span>Subtotal</span><b>£{subtotal}.00</b></p><small>Delivery calculated at checkout.</small><button className="button dark" onClick={()=>alert("Checkout connection is required for production.")}>Continue to checkout</button></div></>:<div className="cart-empty"><Icon name="bag"/><h3>Your bag is waiting.</h3><p>Discover diamond and gemstone jewellery, tactile scarves and specialist-made leather.</p><button className="button dark" onClick={close}>Continue exploring</button></div>}</aside>}
function Footer(){return <footer className="site-footer"><div className="footer-brand"><b>FABLEROOM</b><p>Thoughtfully made pieces for home and everyday life.</p></div><div><h3>Fashion & Lifestyle</h3><a href={CP.diamond}>Diamond jewellery</a><a href={CP.gemstone}>Gemstone jewellery</a><a href={CP.scarves}>Scarves</a><a href={CP.bags}>Leather handbags</a></div><div><h3>Customer care</h3><a href="#faq">Delivery & returns</a><a href="#faq">Care guide</a><a href="https://fableroom.com/pages/contact">Contact us</a></div><div><h3>Discover</h3><a href={LOOKS_PATH}>Shop the look</a><a href="#new">What’s new</a><a href="#quiz">Find your piece</a></div><div><h3>Social</h3><a href="https://instagram.com/fableroomliving">Instagram</a><a href="https://uk.pinterest.com/">Pinterest</a></div><div className="copyright">© 2026 FableRoom. All rights reserved.<span>Terms & Conditions · Privacy Policy</span></div></footer>}
