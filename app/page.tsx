"use client";

import { useEffect, useState } from "react";

type Category = "Bags" | "Jewellery" | "Scarves";
type Product = {
  id: number;
  name: string;
  category: Category;
  material: string;
  price: number;
  colour: string;
  images: string[];
  note: string;
};

const A = `${import.meta.env.BASE_URL}fr`;
const bag = (group: string, ...files: string[]) =>
  files.map((file) => `${A}/bags/${group}/${file}.webp`);

const products: Product[] = [
  { id: 1, name: "Apollo Crescent Suede Bag", category: "Bags", material: "Italian suede · Gold-tone studs", price: 198, colour: "Tan", images: bag("apollo_02", "01-08-2026-productshoot5356", "01-08-2026-productshoot5357", "01-08-2026-productshoot5361"), note: "Softly structured with an adjustable shoulder strap and hand-finished stud work." },
  { id: 2, name: "Marlow Leather Hobo", category: "Bags", material: "Full-grain leather", price: 229, colour: "Espresso", images: bag("apollo_01", "01-08-2026-productshoot5323", "01-08-2026-productshoot5326", "01-08-2026-productshoot5337"), note: "A relaxed everyday shape, cut from full-grain leather that develops character with wear." },
  { id: 3, name: "Luna Suede Shoulder Bag", category: "Bags", material: "Brushed suede", price: 189, colour: "Camel", images: bag("apollo_03", "01-08-2026-productshoot5366", "01-08-2026-productshoot5367", "01-08-2026-productshoot5370"), note: "A compact curved silhouette with a tactile brushed finish and considered internal storage." },
  { id: 4, name: "Marlow Leather Backpack", category: "Bags", material: "Embossed full-grain leather", price: 248, colour: "Chocolate", images: bag("apollo_11", "01-08-2026-productshoot5484", "01-08-2026-productshoot5492", "01-08-2026-productshoot5500"), note: "A hands-free everyday shape with a clean profile, useful compartments and considered stitching." },
  { id: 5, name: "Vela Woven Crossbody", category: "Bags", material: "Hand-woven leather", price: 179, colour: "Black", images: bag("smart_07", "01-08-2026-productshoot5394", "01-08-2026-productshoot5396", "01-08-2026-productshoot5402"), note: "Hand-woven panels bring quiet texture to a compact hands-free shape." },
  { id: 6, name: "Noa Soft Leather Hobo", category: "Bags", material: "Supple leather", price: 218, colour: "Black", images: bag("smart_08", "01-08-2026-productshoot5435", "01-08-2026-productshoot5440-1", "01-08-2026-productshoot5447"), note: "An unstructured, softly draped bag designed to sit comfortably on the shoulder." },
  { id: 7, name: "Turquoise & Citrine Pendant", category: "Jewellery", material: "Gold vermeil · Real gemstones", price: 110, colour: "Gold", images: [`${A}/editorial/turquoise-citrine-necklace.webp`, `${A}/editorial/jewellery-lifestyle.webp`], note: "A real turquoise drop paired with warm citrine, finished in gold vermeil." },
  { id: 8, name: "Moonstone Huggie Hoops", category: "Jewellery", material: "Gold vermeil · Moonstone", price: 85, colour: "Gold", images: [`${A}/editorial/moonstone-hoops.webp`, `${A}/editorial/jewellery-lifestyle.webp`], note: "Everyday huggies set with luminous natural moonstone charms." },
  { id: 9, name: "Labradorite Stacking Ring", category: "Jewellery", material: "Gold vermeil · Labradorite", price: 95, colour: "Gold", images: [`${A}/editorial/labradorite-ring.webp`, `${A}/editorial/jewellery-lifestyle.webp`], note: "A slim stacking ring with the distinctive blue flash of real labradorite." },
  { id: 10, name: "Cashmere Merino Wrap", category: "Scarves", material: "Cashmere & fine merino · 70 × 200cm", price: 95, colour: "Oatmeal", images: [`${A}/scarves/scarf-oatmeal-wrap.webp`, `${A}/editorial/cashmere-scarves.webp`], note: "Generously sized to wrap twice, with a soft hand feel made for everyday wear." },
  { id: 11, name: "Everyday Merino Scarf", category: "Scarves", material: "Responsible merino wool · 70 × 200cm", price: 72, colour: "Camel", images: [`${A}/scarves/scarf-camel-merino.webp`, `${A}/editorial/scarf-lifestyle.webp`], note: "Warm without bulk, woven for a fluid drape and finished with soft fringe." },
  { id: 12, name: "Charcoal Cashmere Blend", category: "Scarves", material: "Cashmere & merino · 70 × 200cm", price: 98, colour: "Charcoal", images: [`${A}/scarves/scarf-charcoal-cashmere.webp`, `${A}/editorial/cashmere-scarves.webp`], note: "A deep charcoal layer with an understated herringbone weave." },
];

const Icon = ({ name }: { name: "search" | "user" | "heart" | "bag" | "menu" | "close" | "filter" | "arrow" | "minus" | "plus" }) => {
  const paths: Record<string, React.ReactNode> = {
    search: <><circle cx="11" cy="11" r="6"/><path d="m16 16 4 4"/></>,
    user: <><circle cx="12" cy="8" r="4"/><path d="M4 21c.5-5 3-7 8-7s7.5 2 8 7"/></>,
    heart: <path d="M20.8 5.7c-2.2-2.4-5.8-1.9-7.5.7L12 8.2l-1.3-1.8C9 3.8 5.4 3.3 3.2 5.7.7 8.3 1 11.8 3.4 14.3L12 22l8.6-7.7c2.4-2.5 2.7-6 .2-8.6Z"/>,
    bag: <><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></>,
    menu: <><path d="M3 7h18M3 12h18M3 17h18"/></>,
    close: <path d="m5 5 14 14M19 5 5 19"/>,
    filter: <><path d="M4 6h16M7 12h10M10 18h4"/></>,
    arrow: <path d="M5 12h14m-5-5 5 5-5 5"/>,
    minus: <path d="M5 12h14"/>, plus: <path d="M5 12h14M12 5v14"/>,
  };
  return <svg className="icon" viewBox="0 0 24 24" aria-hidden="true">{paths[name]}</svg>;
};

export default function Home() {
  const [search, setSearch] = useState("");
  const [searchOpen, setSearchOpen] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [quick, setQuick] = useState<Product | null>(null);
  const [cartOpen, setCartOpen] = useState(false);
  const [wish, setWish] = useState<number[]>([]);
  const [cart, setCart] = useState<Record<number, number>>({});
  const [toast, setToast] = useState("");
  const [quizStep, setQuizStep] = useState(0);
  const [quizScores, setQuizScores] = useState<Record<Category, number>>({ Bags: 0, Jewellery: 0, Scarves: 0 });

  useEffect(() => {
    const restoreState = window.setTimeout(() => {
      try {
        setWish(JSON.parse(localStorage.getItem("fr-wish") || "[]"));
        setCart(JSON.parse(localStorage.getItem("fr-cart-v2") || "{}"));
      } catch {}
    }, 0);
    return () => window.clearTimeout(restoreState);
  }, []);
  useEffect(() => { localStorage.setItem("fr-wish", JSON.stringify(wish)); }, [wish]);
  useEffect(() => { localStorage.setItem("fr-cart-v2", JSON.stringify(cart)); }, [cart]);
  useEffect(() => {
    document.body.style.overflow = quick || cartOpen || menuOpen || searchOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [quick, cartOpen, menuOpen, searchOpen]);
  useEffect(() => { if (!toast) return; const t = setTimeout(() => setToast(""), 2200); return () => clearTimeout(t); }, [toast]);

  const cartCount = Object.values(cart).reduce((a, b) => a + b, 0);
  const subtotal = products.reduce((sum, p) => sum + p.price * (cart[p.id] || 0), 0);
  const add = (id: number) => { setCart((current) => ({ ...current, [id]: (current[id] || 0) + 1 })); setToast("Added to your bag"); };
  const toggleWish = (id: number) => setWish((w) => w.includes(id) ? w.filter((x) => x !== id) : [...w, id]);
  const goToWorld = (category: Category) => document.getElementById(`world-${category.toLowerCase()}`)?.scrollIntoView({ behavior: "smooth", block: "start" });
  const scoreQuiz = (cat: Category) => { setQuizScores((s) => ({ ...s, [cat]: s[cat] + 1 })); setQuizStep((x) => x + 1); };
  const quizWinner = (Object.entries(quizScores) as [Category, number][]).sort((a,b) => b[1]-a[1])[0]?.[0] || "Bags";

  return <main>
    <div className="announce"><span>Thoughtfully made, honestly sourced</span><i aria-hidden="true"/><span className="announce-delivery">Complimentary UK delivery and easy returns</span></div>
    <header className="header">
      <button className="mobile-only icon-button" onClick={() => setMenuOpen(true)} aria-label="Open menu"><Icon name="menu"/></button>
      <a className="wordmark" href="#top" aria-label="FableRoom home">FABLEROOM</a>
      <nav className="desktop-nav"><a href="#top">Home</a><a className="active" href="#edit">Fashion & Lifestyle</a><a href="#collection">Collections</a><a href="#proof">Our craft</a><a href="#social-proof">About</a></nav>
      <div className="header-actions">
        <button onClick={() => setSearchOpen(true)} aria-label="Search"><Icon name="search"/></button><button className="desktop-icon" aria-label="Account"><Icon name="user"/></button>
        <button className="desktop-icon" onClick={() => document.getElementById("edit")?.scrollIntoView()} aria-label="Wishlist"><Icon name="heart"/><b>{wish.length || ""}</b></button>
        <button onClick={() => setCartOpen(true)} aria-label="Shopping bag"><Icon name="bag"/><b>{cartCount || ""}</b></button>
      </div>
    </header>

    <section className="hero" id="top">
      <div className="hero-media">
        <video className="hero-slide hero-video active" src={`${A}/editorial/hero-women-slide-2.mp4`} autoPlay muted playsInline loop preload="auto" aria-label="FableRoom woman styling a suede bag, scarf and gemstone jewellery"/>
      </div>
      <div className="hero-shade"/>
      <div className="hero-copy"><p className="eyebrow light">THE AUGUST DROP</p><h1>From your rooms<br/>to your wardrobe.</h1><p>Real gemstones, tactile cashmere and specialist-made leather. The FableRoom point of view, now in what you wear and carry.</p></div>
    </section>

    <section className="section category-section category-intro" id="collection"><div className="section-heading centered"><p className="eyebrow">THREE WAYS TO WEAR FABLEROOM</p><h2>Jewellery, scarves and bags—made to finish the look.</h2><p>Three focused categories, one considered approach to material and making.</p></div>
      <div className="category-grid category-intro-grid">
        <CategoryCard accent="jewel" title="Demi-Fine Jewellery" copy="Real stones. Real craft. Everyday pieces with personality." image={`${A}/editorial/jewellery-lifestyle.webp`} buttonLabel="Explore jewellery" onClick={() => goToWorld("Jewellery")}/>
        <CategoryCard accent="plum" title="Cashmere & Merino Scarves" copy="Soft, generous wraps made to be reached for every day." image={`${A}/editorial/scarf-lifestyle.webp`} buttonLabel="Explore scarves" onClick={() => goToWorld("Scarves")}/>
        <CategoryCard accent="cognac" title="Leather Handbags" copy="Full-grain leather and suede, shaped and finished by specialist makers." image={`${A}/bags/apollo_02/01-08-2026-productshoot5356.webp`} buttonLabel="Explore bags" onClick={() => goToWorld("Bags")}/>
      </div>
    </section>

    <section className="material-proof section" id="proof"><div className="material-proof-head"><div><p className="eyebrow">THE PROOF IS IN THE DETAIL</p><h2>Look closer.<br/>The making is visible.</h2></div><p>Macro material shots put texture, technique and hand-finished detail ahead of claims.</p></div><div className="material-proof-grid">
      <article className="material-tile leather"><img src={`${A}/editorial/a-plus-leather.webp`} alt="Artisan hand-stitching full-grain cognac leather beside brushed brass hardware"/><div><span>01 · LEATHER BAGS</span><h3>The grain. The hands. The finish.</h3><p>Full-grain leather, saddle stitching and considered hardware shown at the distance quality deserves.</p><button className="text-link" onClick={()=>goToWorld("Bags")}>See the Bag Edit <Icon name="arrow"/></button></div></article>
      <article className="material-tile jewellery"><img src={`${A}/editorial/a-plus-jewellery.webp`} alt="Artisan setting real turquoise, citrine and moonstone in gold vermeil"/><div><span>02 · JEWELLERY</span><h3>Real stones, set by hand.</h3><p>Natural variation, fine settings and gold-vermeil craft made precise in every close-up.</p><button className="text-link" onClick={()=>goToWorld("Jewellery")}>See the Jewellery Edit <Icon name="arrow"/></button></div></article>
      <article className="material-tile scarves"><img src={`${A}/editorial/a-plus-scarf.webp`} alt="Close-up of a cashmere and merino scarf being woven at the loom"/><div><span>03 · SCARVES</span><h3>Woven to be reached for.</h3><p>Fine cashmere and merino fibres, a fluid plain weave and soft fringe shown in warm daylight.</p><button className="text-link" onClick={()=>goToWorld("Scarves")}>See the Scarf Edit <Icon name="arrow"/></button></div></article>
    </div></section>

    <section className="section edit" id="edit"><div className="edit-heading"><div><p className="eyebrow">THE FASHION & LIFESTYLE EDITS</p><h2>Three categories.<br/>Three ways to discover.</h2><p>Each edit uses a distinct layout, so product discovery feels considered rather than repeated.</p></div></div><nav className="world-nav" aria-label="Explore categories"><button onClick={()=>goToWorld("Bags")}>01 · Bag edit</button><button onClick={()=>goToWorld("Jewellery")}>02 · Jewellery edit</button><button onClick={()=>goToWorld("Scarves")}>03 · Scarf edit</button></nav></section>

    <CategoryEdit variant="bags" category="Bags" index="01" title="The Bag Edit" kicker="PURE LEATHER & SUEDE" copy="Material-led silhouettes, useful interiors and specialist craft designed to wear in beautifully over time." image={`${A}/bags/smart_08/01-08-2026-productshoot5447.webp`} wished={wish} onWish={toggleWish} onQuick={setQuick}/>
    <CategoryEdit variant="jewellery" category="Jewellery" index="02" title="The Jewellery Edit" kicker="REAL GEMSTONES" copy="Colourful real stones and demi-fine craft, styled close and precise so every natural detail earns attention." image={`${A}/editorial/jewellery-lifestyle.webp`} wished={wish} onWish={toggleWish} onQuick={setQuick}/>
    <CategoryEdit variant="scarves" category="Scarves" index="03" title="The Scarf Edit" kicker="CASHMERE & MERINO" copy="The scarf you will never put away—generous, tactile and woven for the everyday rather than saved for an occasion." image={`${A}/editorial/cashmere-scarves.webp`} wished={wish} onWish={toggleWish} onQuick={setQuick}/>

    <section className="look section" id="shop-the-look"><div className="look-copy"><p className="eyebrow">SHOP THE LOOK</p><h2>The look that finishes itself.</h2><p>A tactile leather bag, an easy cashmere-merino scarf and real-stone jewellery—made to go together, not simply sit beside each other.</p><small className="look-hint">Tap a black marker to view the piece</small></div><div className="look-image"><img src={`${A}/editorial/hero-women-fashion-lifestyle.webp`} alt="Woman wearing FableRoom jewellery and scarf with a suede bag"/><button className="hot h1" onClick={()=>setQuick(products[0])} aria-label="View Apollo Crescent Suede Bag"><span>Apollo suede bag</span></button><button className="hot h2" onClick={()=>setQuick(products[6])} aria-label="View Turquoise and Citrine Pendant"><span>Real-stone pendant</span></button><button className="hot h3" onClick={()=>setQuick(products[9])} aria-label="View Cashmere Merino Wrap"><span>Cashmere-merino wrap</span></button></div></section>

    <section className="home-proof section" id="social-proof"><p className="eyebrow">TRUSTED IN THE HOME. NOW MADE TO WEAR.</p><h2>Thoughtful sourcing is already part of our story.</h2><p>The same direct-from-maker philosophy trusted by 14,000+ UK homes now extends to what you wear and carry.</p><div><span><b>14,000+</b> Happy UK homes</span><span><b>B Corp™</b> Certified business</span><span><b>Direct</b> From specialist makers</span><span><b>365 days</b> Product guarantee</span></div></section>

    <section className="finder section" id="quiz"><div className="finder-image"><img src={`${A}/editorial/jewellery-lifestyle.webp`} alt="Everyday gemstone jewellery"/></div><div className="finder-card"><p className="eyebrow">FIND YOUR EVERYDAY PIECE</p><h2>Find your FableRoom piece.</h2>{quizStep<3 ? <><p>{["What matters most today?","How do you like a piece to feel?","What are you shopping for?"][quizStep]}</p><div className="quiz-options">{quizStep===0&&<><button onClick={()=>scoreQuiz("Bags")}>Carry everything beautifully</button><button onClick={()=>scoreQuiz("Jewellery")}>Add a personal detail</button><button onClick={()=>scoreQuiz("Scarves")}>Feel warm without bulk</button></>}{quizStep===1&&<><button onClick={()=>scoreQuiz("Bags")}>Structured and useful</button><button onClick={()=>scoreQuiz("Jewellery")}>Small but distinctive</button><button onClick={()=>scoreQuiz("Scarves")}>Soft and tactile</button></>}{quizStep===2&&<><button onClick={()=>scoreQuiz("Bags")}>An everyday investment</button><button onClick={()=>scoreQuiz("Jewellery")}>A thoughtful gift</button><button onClick={()=>scoreQuiz("Scarves")}>Something instantly wearable</button></>}</div></> : <div className="quiz-result"><span>Your edit</span><h3>{quizWinner}</h3><p>{quizWinner==="Bags"?"Start with tactile leather and practical silhouettes that work every day.":quizWinner==="Jewellery"?"Start with real gemstones, fine scale and pieces made for layering.":"Start with generous cashmere-merino wraps in restrained, useful shades."}</p><button className="button dark" onClick={()=>goToWorld(quizWinner)}>View your edit</button><button className="reset" onClick={()=>{setQuizStep(0);setQuizScores({Bags:0,Jewellery:0,Scarves:0})}}>Start again</button></div>}</div></section>

    <section className="faq section" id="faq"><div><p className="eyebrow">NEED TO KNOW</p><h2>Materials, care<br/>and delivery.</h2></div><div className="faq-list"><details><summary>What makes the leather different?</summary><p>Our launch edit focuses on full-grain leather and suede, with detailed views of grain, stitching, hardware and interiors so you can assess the make closely.</p></details><details><summary>Are the gemstones real?</summary><p>The gemstone line is designed around genuine stones including turquoise, moonstone, citrine and labradorite. Natural variation is part of their character.</p></details><details><summary>How should I care for my scarf?</summary><p>Air between wears, fold rather than hang, and follow the individual care label. Cashmere and fine merino are best cleaned gently and stored dry.</p></details><details><summary>How do delivery and returns work?</summary><p>Complimentary delivery applies on qualifying UK orders. Fashion & Lifestyle pieces include a 14-day easy-return window; final conditions appear at checkout.</p></details></div></section>

    <section className="newsletter"><p className="eyebrow light">THE FABLEROOM EDIT</p><h2>Be first to see<br/>what comes next.</h2><p>Sign up for new product drops, maker stories and considered offers.</p><form onSubmit={(e)=>{e.preventDefault();setToast("You’re on the list")}}><input type="email" required placeholder="Your email address" aria-label="Email address"/><button>Join the edit</button></form></section>
    <footer><div className="footer-brand"><b>FABLEROOM</b><p>Thoughtfully made pieces for home and everyday life.</p></div><div><h3>Fashion & Lifestyle</h3><a href="#world-bags">Leather bags</a><a href="#world-jewellery">Jewellery</a><a href="#world-scarves">Scarves</a></div><div><h3>Customer care</h3><a href="#faq">Delivery & returns</a><a href="#faq">Care guide</a><a href="#faq">Contact us</a></div><div><h3>About FableRoom</h3><a href="#social-proof">Our story</a><a href="#proof">Our approach</a><a href="#proof">Meet the makers</a></div><div><h3>Social</h3><a href="https://instagram.com/fableroomliving" target="_blank" rel="noreferrer">Instagram</a><a href="#">Pinterest</a></div><div className="copyright">© 2026 FableRoom. All rights reserved.<span>Terms & Conditions · Privacy Policy</span></div></footer>

    {menuOpen&&<Overlay close={()=>setMenuOpen(false)}><div className="mobile-menu"><button className="panel-close" onClick={()=>setMenuOpen(false)}><Icon name="close"/></button><b className="wordmark">FABLEROOM</b><nav><a href="#top" onClick={()=>setMenuOpen(false)}>Home</a><a href="#collection" onClick={()=>setMenuOpen(false)}>Categories</a><a href="#proof" onClick={()=>setMenuOpen(false)}>The detail</a><a href="#edit" onClick={()=>setMenuOpen(false)}>The edits</a><a href="#shop-the-look" onClick={()=>setMenuOpen(false)}>Shop the look</a></nav><small>Thoughtfully made, honestly sourced.</small></div></Overlay>}
    {searchOpen&&<Overlay close={()=>setSearchOpen(false)}><div className="search-panel"><button className="panel-close" onClick={()=>setSearchOpen(false)}><Icon name="close"/></button><p className="eyebrow">SEARCH THE EDIT</p><div className="search-field"><Icon name="search"/><input autoFocus value={search} onChange={(e)=>setSearch(e.target.value)} placeholder="Search bags, jewellery, scarves..."/><button onClick={()=>setSearch("")}>Clear</button></div><div className="search-results">{products.filter(p=>`${p.name} ${p.material}`.toLowerCase().includes(search.toLowerCase())).slice(0,5).map(p=><button key={p.id} onClick={()=>{setQuick(p);setSearchOpen(false)}}><img src={p.images[0]} alt=""/><span><b>{p.name}</b><small>{p.category} · {p.material}</small></span></button>)}</div></div></Overlay>}
    {quick&&<Overlay close={()=>setQuick(null)}><QuickView key={quick.id} p={quick} onClose={()=>setQuick(null)} onSelect={setQuick} onAdd={()=>add(quick.id)} wished={wish.includes(quick.id)} onWish={()=>toggleWish(quick.id)}/></Overlay>}
    {cartOpen&&<Overlay close={()=>setCartOpen(false)}><CartDrawer cart={cart} setCart={setCart} subtotal={subtotal} close={()=>setCartOpen(false)}/></Overlay>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </main>;
}

function Overlay({children, close}:{children:React.ReactNode;close:()=>void}) { useEffect(()=>{const k=(e:KeyboardEvent)=>e.key==="Escape"&&close();addEventListener("keydown",k);return()=>removeEventListener("keydown",k)},[close]); return <div className="overlay" onMouseDown={(e)=>e.currentTarget===e.target&&close()}>{children}</div> }
function CategoryCard({title,copy,image,buttonLabel,accent,onClick}:{title:string;copy:string;image:string;buttonLabel:string;accent:"jewel"|"plum"|"cognac";onClick:()=>void}) { return <article className={`category-card category-${accent}`}><img src={image} alt={title}/><div><span>SHOP THE CATEGORY</span><h3>{title}</h3><p>{copy}</p><button onClick={onClick}>{buttonLabel} <Icon name="arrow"/></button></div></article> }
function CategoryEdit({category,index,title,kicker,copy,image,variant,wished,onWish,onQuick}:{category:Category;index:string;title:string;kicker:string;copy:string;image:string;variant:"bags"|"jewellery"|"scarves";wished:number[];onWish:(id:number)=>void;onQuick:(p:Product)=>void}) { const allPieces=products.filter(p=>p.category===category); const pieces=variant==="bags"?allPieces.slice(0,4):allPieces; return <section className={`category-edit category-edit-${variant}`} id={`world-${category.toLowerCase()}`}><header><span>{index}</span><div><p className="eyebrow">{kicker}</p><h2>{title}</h2><p>{copy}</p></div></header><div className="category-edit-layout"><article className="edit-feature"><img src={image} alt={`${title} collection`}/><div><small>THE {category.toUpperCase()} EDIT</small><b>{variant==="bags"?"Carried often. Made to wear in.":variant==="jewellery"?"Natural colour, quietly precise.":"Soft enough for every day."}</b></div></article><div className="edit-product-grid">{pieces.map(p=><ProductCard key={p.id} product={p} wished={wished.includes(p.id)} onWish={()=>onWish(p.id)} onQuick={()=>onQuick(p)}/>)}</div></div></section> }
function ProductCard({product:p,wished,onWish,onQuick}:{product:Product;wished:boolean;onWish:()=>void;onQuick:()=>void}) { return <article className="product-card"><div className="product-image" onClick={onQuick}><img className="primary" src={p.images[0]} alt={p.name} loading="lazy"/><img className="secondary" src={p.images[1]||p.images[0]} alt="" loading="lazy"/><button className={`wish ${wished?"wished":""}`} onClick={(e)=>{e.stopPropagation();onWish()}} aria-label="Add to wishlist"><Icon name="heart"/></button><button className="quick-button" onClick={(e)=>{e.stopPropagation();onQuick()}}>Quick view</button></div><div className="product-copy"><small>{p.category}</small><h3 onClick={onQuick}>{p.name}</h3><p>{p.material}</p><div><button onClick={onQuick}>View details</button></div></div></article> }
function QuickView({p,onClose,onSelect,onAdd,wished,onWish}:{p:Product;onClose:()=>void;onSelect:(product:Product)=>void;onAdd:()=>void;wished:boolean;onWish:()=>void}) {
  const [idx,setIdx]=useState(0);
  const lookProducts=[products[0],products[6],products[7],products[9]];
  return <aside className="pdp-view" aria-label={`${p.name} product details`}>
    <button className="panel-close pdp-close" onClick={onClose} aria-label="Close product details"><Icon name="close"/></button>
    <div className="pdp-main">
      <div className="pdp-gallery"><img src={p.images[idx]} alt={p.name}/><div>{p.images.map((im,i)=><button key={im} className={idx===i?"active":""} onClick={()=>setIdx(i)} aria-label={`View ${p.name} image ${i+1}`}><img src={im} alt=""/></button>)}</div></div>
      <div className="pdp-copy"><p className="eyebrow">{p.category}</p><h2>{p.name}</h2><p className="pdp-material">{p.material}</p><strong className="pdp-price">£{p.price}.00</strong><p className="pdp-note">{p.note}</p><div className="colour"><span>Colour: <b>{p.colour}</b></span><i style={{background:p.colour.toLowerCase()}}/></div><ul><li>Authentic materials, clearly identified</li><li>Direct from specialist makers</li><li>14-day easy returns</li></ul><div className="pdp-actions"><button className="button dark" onClick={onAdd}>Add to bag · £{p.price}.00</button><button className={`outline-heart ${wished?"wished":""}`} onClick={onWish} aria-label={wished?"Remove from wishlist":"Save to wishlist"}><Icon name="heart"/></button></div></div>
    </div>
    <section className="pdp-look"><div className="pdp-section-head"><p className="eyebrow">SHOP THE LOOK</p><h3>Click a marker to view the piece.</h3></div><div className="pdp-look-visual"><img src={`${A}/editorial/hero-women-fashion-lifestyle.webp`} alt="FableRoom everyday look with bag, jewellery and scarf"/><button className="hot pdp-hot ph1" onClick={()=>onSelect(products[0])} aria-label="View Apollo Crescent Suede Bag"><span>Apollo suede bag</span></button><button className="hot pdp-hot ph2" onClick={()=>onSelect(products[6])} aria-label="View Turquoise and Citrine Pendant"><span>Real-stone pendant</span></button><button className="hot pdp-hot ph3" onClick={()=>onSelect(products[9])} aria-label="View Cashmere Merino Wrap"><span>Cashmere-merino wrap</span></button></div><div className="pdp-look-grid">{lookProducts.map(item=><button key={item.id} onClick={()=>onSelect(item)}><img src={item.images[0]} alt=""/><span><b>{item.name}</b><small>{item.material}</small><strong>£{item.price}.00</strong></span><i><Icon name="arrow"/></i></button>)}</div></section>
    <section className="pdp-story"><div><p className="eyebrow">FROM HOME TO WARDROBE</p><h3>The same FableRoom point of view, beyond the home.</h3><p>Fashion & Lifestyle extends the way FableRoom already shapes living: useful, beautiful pieces made to live with.</p><div className="pdp-values"><span><b>Curated</b><small>A focused edit with purpose.</small></span><span><b>Everyday</b><small>Designed to fit naturally into daily life.</small></span><span><b>Considered</b><small>Material and quality in balance.</small></span></div></div><img src={`${A}/editorial/cashmere-scarves.webp`} alt="FableRoom cashmere and merino edit"/></section>
    <div className="pdp-sticky"><button className="button dark" onClick={onAdd}>Add to bag · £{p.price}.00</button><button className={`outline-heart ${wished?"wished":""}`} onClick={onWish} aria-label={wished?"Remove from wishlist":"Save to wishlist"}><Icon name="heart"/></button></div>
  </aside>
}
function CartDrawer({cart,setCart,subtotal,close}:{cart:Record<number,number>;setCart:React.Dispatch<React.SetStateAction<Record<number,number>>>;subtotal:number;close:()=>void}) { const lines=products.filter(p=>cart[p.id]); const update=(id:number,n:number)=>setCart(c=>{const x={...c};if(n<=0)delete x[id];else x[id]=n;return x}); return <aside className="cart-drawer"><div className="cart-head"><div><p className="eyebrow">YOUR EDIT</p><h2>Shopping bag</h2></div><button onClick={close}><Icon name="close"/></button></div>{lines.length?<><div className="cart-lines">{lines.map(p=><article key={p.id}><img src={p.images[0]} alt=""/><div><h3>{p.name}</h3><p>{p.colour} · £{p.price}.00</p><div className="qty"><button onClick={()=>update(p.id,cart[p.id]-1)}><Icon name="minus"/></button><span>{cart[p.id]}</span><button onClick={()=>update(p.id,cart[p.id]+1)}><Icon name="plus"/></button></div></div><button className="remove" onClick={()=>update(p.id,0)}>Remove</button></article>)}</div><div className="cart-bottom"><p><span>Subtotal</span><b>£{subtotal}.00</b></p><small>Delivery calculated at checkout. 14-day easy returns.</small><button className="button dark" onClick={()=>alert("Checkout is ready for commerce integration.")}>Continue to checkout</button></div></>:<div className="cart-empty"><Icon name="bag"/><h3>Your bag is waiting.</h3><p>Discover real-stone jewellery, tactile scarves and specialist-made leather.</p><button className="button dark" onClick={close}>Continue exploring</button></div>}</aside> }
