# FableRoom Women — Fashion & Lifestyle

The complete source for the FableRoom Women merchandising experience, including the responsive image/video hero, category discovery, independent product rails, Shop the Look, quick view, wishlist, cart drawer, product finder, trust content and FAQs.

## Live experiences

- GPT Site: https://fableroom-women-fashion.vinit-singh482832.chatgpt.site
- GitHub Pages: https://vinitsingh-del.github.io/womenWear_Fableroom/

## Run locally

Requires Node.js 22.13 or newer.

```bash
npm ci
npm run dev
```

## Production builds

- `npm run build` creates the ChatGPT Sites/Cloudflare production artifact.
- `npm run build:pages` creates the static GitHub Pages build in `docs/`.

GitHub Actions automatically builds and publishes the Pages version after each push to `main`.
