"use client";
import { useEffect, useState } from "react";
import { looks, type Look } from "../look-data";
import { products, type Product } from "../products-data";

const ROOT = import.meta.env.BASE_URL;
const CP = {
  bags: "https://fableroom.com/collections/handbags",
  diamond: "https://fableroom.com/collections/diamond-jewellery",
  gemstone: "https://fableroom.com/collections/gemstone-jewellery",
  scarves: "https://fableroom.com/collections/scarves",
};
const CATEGORY_LINK: Record<Product["category"], string> = {
  "Bags": CP.bags,
  "Diamond Jewellery": CP.diamond,
  "Gemstone Jewellery": CP.gemstone,
  "Scarves": CP.scarves,
};
const CART_KEY = "fr-cart-v2";
const WISH_KEY = "fr-wish";

// Grouping uses the existing mood/tone field already in look-data.ts.
// PLACEHOLDER COPY: titles/descriptions below are stand-ins — replace with
// final section copy (per client direction, section titles will be supplied
// separately rather than invented here).
const TONE_ORDER: Look["tone"][] = ["light", "jewel", "dark", "warm"];
const TONE_TITLES: Record<Look["tone"], string> = {
  light: "Light & Neutral",
  jewel: "Colour & Jewel-Tone",
  dark: "Bold & Dark",
  warm: "Warm & Layered",
};
const TONE_COPY: Record<Look["tone"], string> = {
  light: "Placeholder intro copy for this group.",
  jewel: "Placeholder intro copy for this group.",
  dark: "Placeholder intro copy for this group.",
  warm: "Placeholder intro copy for this group.",
};

function CloseIcon(){return <svg viewBox="0 0 24 24" width="16" height="16" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"><path d="m5 5 14 14M19 5 5 19"/></svg>}
function HeartIcon(){return <svg viewBox="0 0 24 24" width="17" height="17" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M20.8 5.7c-2.2-2.4-5.8-1.9-7.5.7L12 8.2l-1.3-1.8C9 3.8 5.4 3.3 3.2 5.7.7 8.3 1 11.8 3.4 14.3L12 22l8.6-7.7c2.4-2.5 2.7-6 .2-8.6Z"/></svg>}
function BagIcon(){return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 8h14l-1 13H6L5 8Z"/><path d="M9 9V6a3 3 0 0 1 6 0v3"/></svg>}

function readCart():Record<number,number>{try{return JSON.parse(localStorage.getItem(CART_KEY)||"{}")}catch{return{}}}
function writeCart(cart:Record<number,number>){try{localStorage.setItem(CART_KEY,JSON.stringify(cart))}catch{}}
function readWish():number[]{try{return JSON.parse(localStorage.getItem(WISH_KEY)||"[]")}catch{return[]}}
function writeWish(wish:number[]){try{localStorage.setItem(WISH_KEY,JSON.stringify(wish))}catch{}}

function LookDetailModal({look,index,onClose,onToast}:{look:Look;index:number;onClose:()=>void;onToast:(msg:string)=>void}){
  const [wish,setWish]=useState<number[]>([]);
  useEffect(()=>{setWish(readWish())},[]);
  useEffect(()=>{
    const k=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();
    addEventListener("keydown",k);
    return()=>removeEventListener("keydown",k);
  },[onClose]);
  const items=look.productIds.map(id=>products.find(p=>p.id===id)).filter(Boolean) as Product[];
  const toggleWish=(id:number)=>setWish(w=>{const n=w.includes(id)?w.filter(x=>x!==id):[...w,id];writeWish(n);return n});
  const addOne=(id:number)=>{const cart=readCart();cart[id]=(cart[id]||0)+1;writeCart(cart);onToast("Added to your bag")};
  const addAll=()=>{const cart=readCart();items.forEach(p=>{cart[p.id]=(cart[p.id]||0)+1});writeCart(cart);onToast("Look added to your bag")};
  return <div className="overlay" onMouseDown={e=>e.currentTarget===e.target&&onClose()}>
    <div className="look-modal">
      <button className="panel-close" onClick={onClose}><CloseIcon/></button>
      <figure><img src={look.image} alt={look.alt}/></figure>
      <div className="look-modal-body">
        <p className="eyebrow">{String(index+1).padStart(2,"0")} · POPULAR SEARCH · {look.searchTerm.toUpperCase()}</p>
        <h2>{look.title}</h2>
        <p className="look-modal-copy">{look.copy}</p>
        <div className="look-modal-list">{items.map(p=><article key={p.id}>
          <a className="look-modal-thumb" href={CATEGORY_LINK[p.category]}><img src={p.images[0]} alt={p.name}/></a>
          <div><small>{p.category}</small><h3><a href={CATEGORY_LINK[p.category]}>{p.name}</a></h3><b>£{p.price}.00</b></div>
          <div className="look-modal-actions">
            <button className={`mini-wish ${wish.includes(p.id)?"wished":""}`} onClick={()=>toggleWish(p.id)} aria-label="Save to wishlist"><HeartIcon/></button>
            <button className="button dark" onClick={()=>addOne(p.id)}>Add</button>
          </div>
        </article>)}</div>
        <button className="look-add" onClick={addAll}>Add the look to bag<BagIcon/></button>
      </div>
    </div>
  </div>;
}

function LookTile({look,index,onOpen}:{look:Look;index:number;onOpen:()=>void}){
  return <button className="look-tile-card" onClick={onOpen}>
    <span className="look-tile-number">{String(index+1).padStart(2,"0")}</span>
    <img src={look.image} alt={look.alt}/>
    <span className="look-tile-label">Shop the look</span>
  </button>;
}

export default function LooksPage(){
  const [active,setActive]=useState<number|null>(null);
  const [toast,setToast]=useState("");
  useEffect(()=>{if(!toast)return;const t=setTimeout(()=>setToast(""),2200);return()=>clearTimeout(t)},[toast]);
  const indexed=looks.map((look,i)=>({look,i}));
  const groups=TONE_ORDER.map(tone=>({tone,items:indexed.filter(x=>x.look.tone===tone)})).filter(g=>g.items.length>0);

  return <main className="looks-page">
    <header className="looks-header"><a href={ROOT} className="wordmark">FABLEROOM</a><a href={`${ROOT}#shop-the-look`} className="underlink">Back to Fashion & Lifestyle</a></header>
    <section className="looks-hero"><p className="eyebrow">THE FABLEROOM LOOK BOOK</p><h1>Ten ways to wear<br/>the everyday edit.</h1><p>Search-led combinations of bags, jewellery and scarves—built around how customers describe the outfit they want, not around campaign names.</p></section>

    {groups.map(group=><section className="lookbook-group" key={group.tone} aria-label={TONE_TITLES[group.tone]}>
      <header className="lookbook-group-head">
        <p className="eyebrow">THE LOOK BOOK</p>
        <h2>{TONE_TITLES[group.tone]}</h2>
        <p>{TONE_COPY[group.tone]}</p>
      </header>
      <div className="lookbook-grid">{group.items.map(({look,i})=><LookTile key={look.id} look={look} index={i} onOpen={()=>setActive(i)}/>)}</div>
    </section>)}

    <section className="looks-end"><p className="eyebrow light">BUILD YOUR OWN</p><h2>Start with one piece.<br/>Layer from there.</h2><div><a href={CP.bags}>Leather & suede handbags</a><a href={CP.diamond}>Diamond jewellery</a><a href={CP.gemstone}>Gemstone jewellery</a><a href={CP.scarves}>Cashmere & merino wool scarves</a></div></section>

    {active!==null&&<LookDetailModal look={looks[active]} index={active} onClose={()=>setActive(null)} onToast={setToast}/>}
    {toast&&<div className="toast" role="status">{toast}</div>}
  </main>;
}
