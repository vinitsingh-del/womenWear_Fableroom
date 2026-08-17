import { looks } from "../look-data";

const ROOT = import.meta.env.BASE_URL;
const CP = {
  bags: "https://fableroom.com/collections/handbags",
  jewellery: "https://fableroom.com/collections/jewellery",
  scarves: "https://fableroom.com/collections/scarves",
};

export default function LooksPage(){
  return <main className="looks-page">
    <header className="looks-header"><a href={ROOT} className="wordmark">FABLEROOM</a><a href={`${ROOT}#shop-the-look`} className="underlink">Back to Fashion & Lifestyle</a></header>
    <section className="looks-hero"><p className="eyebrow">THE FABLEROOM LOOK BOOK</p><h1>Ten ways to wear<br/>the everyday edit.</h1><p>Search-led combinations of bags, jewellery and scarves—built around how customers describe the outfit they want, not around campaign names.</p></section>
    <section className="all-looks" aria-label="All FableRoom looks">{looks.map((look,index)=><article className={`full-look full-look-${(index%4)+1}`} id={look.id} key={look.id}>
      <figure><img src={look.image} alt={look.alt}/><figcaption>{String(index+1).padStart(2,"0")}</figcaption></figure>
      <div><p className="look-search">Popular search · {look.searchTerm}</p><h2>{look.title}</h2><p>{look.copy}</p><ul>{look.pieces.map(piece=><li key={piece}>{piece}</li>)}</ul><nav><a href={CP.bags}>Shop bags</a><a href={CP.jewellery}>Shop jewellery</a><a href={CP.scarves}>Shop scarves</a></nav></div>
    </article>)}</section>
    <section className="looks-end"><p className="eyebrow light">BUILD YOUR OWN</p><h2>Start with one piece.<br/>Layer from there.</h2><div><a href={CP.bags}>Leather & suede handbags</a><a href={CP.jewellery}>Diamond & gemstone jewellery</a><a href={CP.scarves}>Cashmere & merino wool scarves</a></div></section>
  </main>;
}

