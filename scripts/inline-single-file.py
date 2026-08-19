#!/usr/bin/env python3
"""Fold the single-chunk build into one self-contained HTML file.

Every asset the bundle references under ./fr/ (and the loose SVGs) is embedded
as a base64 data URI, so the result runs from the local filesystem with no
network and no sibling files.
"""
import base64
import mimetypes
import re
import sys
from pathlib import Path

BUILD = Path(sys.argv[1] if len(sys.argv) > 1 else ".singlefile")
OUT = Path(sys.argv[2] if len(sys.argv) > 2 else "../outputs/fableroom-women.html")

mimetypes.add_type("image/webp", ".webp")
mimetypes.add_type("image/svg+xml", ".svg")
mimetypes.add_type("video/mp4", ".mp4")

# Vite keeps the template literals, so assets appear as `${BASE}/dir/file.ext`
# where BASE resolves to "./fr". Three of them interpolate a second variable and
# are rewritten to a runtime lookup instead.
ASSET_DIRS = "motion|generated|bags|editorial|drive|lifestyle|scarves|diamond|lookbanners"
STATIC_RE = re.compile(r"\$\{(\w+)\}(/(?:" + ASSET_DIRS + r")/[^`$)'\"\s]*)")
CSS_URL_RE = re.compile(r"""url\((['"]?)(\.{0,2}/(?:fr/)?[^)'"]+\.(?:webp|png|jpg|svg|mp4))\1\)""")

cache: dict[str, str] = {}
missing: set[str] = set()
embedded: list[tuple[str, int]] = []


def data_uri(rel: str) -> str | None:
    key = rel.lstrip("./")
    if key in cache:
        return cache[key]
    src = BUILD / key
    if not src.is_file():
        missing.add(key)
        return None
    raw = src.read_bytes()
    mime = mimetypes.guess_type(src.name)[0] or "application/octet-stream"
    uri = f"data:{mime};base64,{base64.b64encode(raw).decode('ascii')}"
    cache[key] = uri
    embedded.append((key, len(raw)))
    return uri


def inline_js(text: str) -> str:
    def repl(m: re.Match) -> str:
        uri = data_uri("fr" + m.group(2))
        return m.group(0) if uri is None else uri

    return STATIC_RE.sub(repl, text)


def inline_css(text: str) -> str:
    def repl(m: re.Match) -> str:
        uri = data_uri(m.group(2))
        return m.group(0) if uri is None else f"url({uri})"

    return CSS_URL_RE.sub(repl, text)


css = inline_css((BUILD / "bundle.css").read_text(encoding="utf-8"))
js = inline_js((BUILD / "bundle.js").read_text(encoding="utf-8"))
# Three references interpolate a second variable, so they cannot be resolved
# statically. Embed every remaining asset and swap the base for a lookup table
# that maps the original path to its data URI.
DYNAMIC_RE = re.compile(r"`\$\{(\w+)\}(/[^`]*\$\{[^`]*)`")
dynamic_bases = set(DYNAMIC_RE.findall(js))
if dynamic_bases:
    base_ident = next(iter(dynamic_bases))[0]
    table = {}
    for asset in sorted((BUILD / "fr").rglob("*")):
        if not asset.is_file():
            continue
        rel = asset.relative_to(BUILD).as_posix()
        uri = data_uri(rel)
        if uri:
            table["/" + rel.split("/", 1)[1]] = uri
    lookup = "{" + ",".join(f'{k!r}:{v!r}' for k, v in table.items()) + "}"
    js = (
        f"const __FR_ASSETS__={lookup};"
        + js
    )
    # `${BASE}/a/${x}.webp` -> __FR_LOOKUP__(`/a/${x}.webp`)
    js = DYNAMIC_RE.sub(lambda m: f"__FR_LOOKUP__(`{m.group(2)}`)", js)
    js = "function __FR_LOOKUP__(p){return __FR_ASSETS__[p]||p}" + js

html = (BUILD / "index.html").read_text(encoding="utf-8")

# drop the tags that pointed at the now-inlined files, then re-add inline
html = re.sub(r'\s*<script[^>]*src="[^"]*bundle\.js"[^>]*></script>', "", html)
html = re.sub(r'\s*<link[^>]*href="[^"]*bundle\.css"[^>]*>', "", html)
html = re.sub(r'\s*<link[^>]*rel="modulepreload"[^>]*>', "", html)
html = inline_css(html)

# closing tags inside a classic script block would end it early
js = js.replace("</script>", "<\\/script>")

html = html.replace("</head>", f"<style>\n{css}\n</style>\n</head>")
html = html.replace("</body>", f'<script type="module">\n{js}\n</script>\n</body>')

OUT.parent.mkdir(parents=True, exist_ok=True)
OUT.write_text(html, encoding="utf-8")

embedded.sort(key=lambda x: -x[1])
print(f"embedded {len(embedded)} assets, {sum(s for _, s in embedded) / 1e6:.2f} MB raw")
for name, size in embedded[:6]:
    print(f"   {size/1e6:6.2f} MB  {name}")
if missing:
    print(f"MISSING ({len(missing)}):")
    for m in sorted(missing):
        print("   ", m)
print(f"output {OUT} -> {OUT.stat().st_size / 1e6:.2f} MB")
