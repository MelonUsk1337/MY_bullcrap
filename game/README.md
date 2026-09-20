# Prototyper – sex casual-spel för swipe, tap och vibration

Alla är enskilda HTML-sidor utan byggsteg. `lib/core.js` är det delade kärnbiblioteket (canvas, input, haptik, syntljud, effekter, seedad slump, menyer, delning). `lib/matter.min.js` (MIT) används bara av Jenga-huset.

| Spel | Fil | Spela på mobilen | Mekanik | Tvåspelarläge |
|---|---|---|---|---|
| HANGRY | `hangry.html` | https://claude.ai/artifact/84VJfD8Z6pqzhaHLNVNHgF | Tap = släpp, ⇠⇢ = släng skräp, ⇡ = servera, ⇣ = slam | Turas om på samma burgare, den som rasar förlorar |
| Dörrvakten | `dorrvakten.html` | https://claude.ai/artifact/YGMrf1N1EF8hFWdmVNZjZE | ⇢ in, ⇠ nej, ⇡ VIP, ⇣ visitera; regler byts var 8:e gäst, motsatt dag | Turas om, samma kö, jämför poäng |
| Sushi-kast | `sushi.html` | https://claude.ai/artifact/FNdfGTkRzdds2EXWSSWuFC | Swipa tallriken mot gästen som beställt; katt och wasabi | Delad skärm samtidigt, swipe mot mitten kastar till motståndaren |
| Jenga-huset | `jenga.html` | https://claude.ai/artifact/PEFHgZyow47GhH6ytZrSdZ | Tap = släpp våning (Matter.js-fysik), ⇠⇢ = knuffa tornet, ⇡ = skräm duvan; jordbävning var 8:e våning | Turas om, den vars våning fäller huset förlorar |
| Tunnelbanan | `tunnelbanan.html` | https://claude.ai/artifact/XymYkqzoTjbrM7dDGJnsr3 | ⇡⇣ = flippa gravitation, ⇢ = rusa; tåg, hinder, mynt, nära-miss-bonus | Kompisens spöke via länk (flipp-tidslinje i URL:en), turas om med spöke |
| Sysslor (Chores) | `chores.html` | https://claude.ai/artifact/F8BthVPjQrCCbYaSyR29N6 | Fyra sysslor: gräs (snake-swipe), fönster (dra), tvätt (swipe-sortering), dammsuga (snake-swipe) | Två profiler, samma smuts per dag, hushållets poängtavla, städ-streak |

Länkarna är privata artifacts. Dela från sidans Share-meny om fler ska testa. Alla spel har även "Dagens utmaning" (samma seed för alla) och "Utmana en vän" (länk med seed + poäng att slå).

## Köra lokalt

```bash
cd game
python3 -m http.server 8080
# öppna http://<din-dators-ip>:8080 på mobilen (samma wifi) – index.html listar alla sex
```

På desktop: mellanslag = tap, piltangenter = swipe, Esc = meny. Sushi-duell: WASD styr övre halvan.

## Haptik

- Android Chrome: `navigator.vibrate` med mönster, fungerar efter första trycket.
- iPhone: Safari saknar vibrations-API. Canvasen ligger i en `<label>` kopplad till `<input type="checkbox" switch>`, som ger systemets haptiska tick vid varje riktigt tryck (iOS 17.4+). Script-tick vid händelser fungerar bara på iOS ≤ 26.4. Riktig haptik (Light/Medium/Heavy) kräver Capacitor + `@capacitor/haptics`.
- Vibration och ljud kan stängas av i varje meny (sparas lokalt per spel).

## Tuning

Konstanterna ligger överst i varje spels skript (`CFG`, `SEG`, `LOT_W`, klassernas `start()`), haptik-mönster i `Core.haptics`, ljud i `Core.audio`. Repliker och regler ligger i `SAY`, `RULES`, `CHORES`.

## Struktur

```
game/
  index.html        nav till alla sex
  hangry.html       fristående (eget inbyggt kärnbibliotek, äldst)
  dorrvakten.html   sushi.html  jenga.html  tunnelbanan.html  chores.html
  lib/core.js       delat kärnbibliotek
  lib/matter.min.js fysik (MIT, matter-js 0.20.0)
```

## Nästa steg

1. Testa alla sex på riktiga telefoner enligt mätpunkterna i `docs/RESEARCH.md` §9 och `docs/CHORES.md`.
2. Välj 1–2 att gå vidare med. Flytta HANGRY till `lib/core.js` om den blir vald.
3. Grafik, ljud och karaktärer. Sedan Capacitor-paketering med riktig haptik.
