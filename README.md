# Musicando Poemas — site institucional

Site estático premium (HTML + CSS + JS puro, zero build, zero npm).
Sobe em qualquer lugar: Vercel, Netlify, GitHub Pages, hospedagem comum.

## Rodar localmente

```bash
cd ~/Desktop/musicando-poemas
python3 -m http.server 5410
# http://localhost:5410
```

## Estrutura

```
index.html              página única, com SEO + Open Graph + Schema.org
assets/css/style.css    sistema visual completo (tokens no :root)
assets/js/main.js       animações, canvas e os dados das seções
assets/img/             logo, favicon, og-image
_referencias/           print do painel da distribuidora (não vai pro ar)
robots.txt · sitemap.xml
```

## Identidade

| Token | Valor | Uso |
|---|---|---|
| `--ink` | `#111111` | texto e seções escuras |
| `--white` | `#FFFFFF` | base |
| `--mist` | `#F6F6F6` | seções alternadas |
| `--gold` | `#D79A1F` | **só destaque** — nunca área grande |

**Tipografia:** `Instrument Serif` (títulos) + `Inter Tight` (texto).
A escolha do serif priorizou legibilidade: uma Didone (Bodoni/Didot) combina
mais com o logo, mas os traços finos somem na tela.
Para trocar, altere `--serif` em `style.css` e o `<link>` do Google Fonts.

## Stack de animação (tudo via CDN)

GSAP + ScrollTrigger · Lenis (scroll suave) · SplitType (revelação por palavra)
· dois `<canvas>` próprios (partículas douradas na hero, ondas na CTA).

Respeita `prefers-reduced-motion`: sem preloader, sem canvas, sem parallax.
Se o CDN cair, uma rede de segurança revela todo o conteúdo mesmo assim.

## Onde editar o conteúdo

Quase tudo é dado, não marcação. Em `assets/js/main.js`, no topo:

- `APLICACOES` — os 10 cards da seção Aplicações
- `PLATAFORMAS` — as 42 plataformas de distribuição
- `GALERIA` — os cards de vídeo

Os textos das demais seções estão direto no `index.html`.

### Plataformas

A lista foi transcrita do painel da distribuidora
(`_referencias/plataformas-distribuidora.jpeg`). São **42 confirmadas**;
o print estava cortado no rodapé, então pode haver mais algumas.
Para incluir, basta adicionar ao array — o contador da seção Números
mostra `45+` conforme o briefing.

Os logotipos vêm de `cdn.simpleicons.org`. O catálogo deles muda com o tempo:
se um ícone sair do ar, o card cai sozinho num monograma tipográfico
(já é o caso de Amazon Music, Qobuz, Anghami, JioSaavn e KkBox).
Para usar o logo oficial nesses casos, salve o SVG em `assets/img/plataformas/`
e troque o `src`.

## ⚠️ Pendências antes de publicar

1. **WhatsApp** — `index.html`, botão da CTA: trocar `5500000000000`
   pelo número real.
2. **Redes sociais** — os `@musicandopoemas` de Instagram, TikTok e YouTube
   aparecem no header, no rodapé e no JSON-LD. Conferir se são os perfis certos.
3. **Galeria** — os 5 cards apontam para os perfis, não para vídeos específicos.
   Trocar os `url` em `GALERIA` pelos links reais das publicações.
4. **Domínio** — `musicandopoemas.com.br` está chumbado nas metatags canônicas,
   Open Graph, `sitemap.xml` e `robots.txt`. Ajustar se for outro.
5. **Imagem de compartilhamento** — hoje é o logo em 512px. Uma arte 1200×630
   funciona muito melhor no WhatsApp e no Instagram.
