"use client";
import { useEffect, useState } from "react";
import { looks, type Look } from "../look-data";

const ROOT = import.meta.env.BASE_URL;
const CP = {
  bags: "https://fableroom.com/collections/handbags",
  jewellery: "https://fableroom.com/collections/jewellery",
  scarves: "https://fableroom.com/collections/scarves",
};

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
function ArrowIcon(){return <svg viewBox="0 0 24 24" width="14" height="14" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"><path d="M5 12h14m-5-5 5 5-5 5"/></svg>}

function LookDetailModal({look,index,onClose}:{look:Look;index:number;onClose:()=>void}){
  useEffect(()=>{
    const k=(e:KeyboardEvent)=>e.key==="Escape"&&onClose();
    addEventListener("keydown",k);
    return()=>removeEventListener("keydown",k);
  },[onClose]);
  return <div className="overlay" onMouseDown={e=>e.currentTarget===e.target&&onClose()}>
    <div className="look-modal">
      <button className="panel-close" onClick={onClose}><CloseIcon/></button>
      <figure><img src={look.image} alt={look.alt}/></figure>
      <div className="look-modal-body">
        <p className="eyebrow">{String(index+1).padStart(2,"0")} · POPULAR SEARCH · {look.searchTerm.toUpperCase()}</p>
        <h2>{look.title}</h2>
        <p className="look-modal-copy">{look.copy}</p>
        <ul className="look-modal-pieces">{look.pieces.map(piece=><li key={piece}>{piece}</li>)}</ul>
        <nav className="look-modal-links">
          <a href={CP.bags}>Shop bags<ArrowIcon/></a>
          <a href={CP.jewellery}>Shop jewellery<ArrowIcon/></a>
          <a href={CP.scarves}>Shop scarves<ArrowIcon/></a>
        </nav>
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

    <section className="looks-end"><p className="eyebrow light">BUILD YOUR OWN</p><h2>Start with one piece.<br/>Layer from there.</h2><div><a href={CP.bags}>Leather & suede handbags</a><a href={CP.jewellery}>Diamond & gemstone jewellery</a><a href={CP.scarves}>Cashmere & merino wool scarves</a></div></section>

    {active!==null&&<LookDetailModal look={looks[active]} index={active} onClose={()=>setActive(null)}/>}
  </main>;
}
