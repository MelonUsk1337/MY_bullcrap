# HANGRY – prototyp v0.1

Stapla burgaren upp till kundens mun. Tap släpper lagret, swipe åt sidan slänger skräp, swipe upp serverar. En enda HTML-fil, inga beroenden, inga assets (ljud syntetiseras, grafik ritas på canvas).

**Spela direkt på mobilen:** https://claude.ai/artifact/84VJfD8Z6pqzhaHLNVNHgF
(privat länk – dela från sidans Share-meny om fler ska testa).

## Köra lokalt

```bash
cd game
python3 -m http.server 8080
# öppna http://<din-dators-ip>:8080 på mobilen (samma wifi)
```

Fungerar även genom att öppna `index.html` direkt i en webbläsare. På desktop: mellanslag = tap, piltangenter = swipe, Esc = meny.

## Styrning

| Gest | Effekt |
|---|---|
| Tap | Släpp biten |
| Swipe ⇣ | Slam (snabbare fall, bonus) |
| Swipe ⇠ / ⇢ | Släng biten. Skräp = +5. Mat = kunden tar en tugga (översta lagret krymper 25 %) |
| Swipe ⇡ | Servera tidigt (≥ 3 lager, ej i duell) |
| Tap på "MENY" nere till vänster | Tillbaka till menyn |

## Lägen

- **Spela** – ny slumpad seed varje runda, rekord sparas lokalt.
- **Dagens utmaning** – seed = dagens datum, alla får samma burgare, eget dagsrekord.
- **Utmana en vän** – efter game over: länk med `#s=SEED&t=POÄNG`. Vännen får exakt samma bit-sekvens och ser "ATT SLÅ".
- **Duell · 2 spelare** – samma mobil, turas om per bit. Den som får burgaren att rasa eller staplar skräp förlorar rundan. Vinster räknas tills man går till menyn.

## Tuning

Alla konstanter ligger i `CFG` överst i skriptet: startbredd, perfekt-tolerans, återväxt, svängfart och ramp, kundaptiter, skräp- och guldsannolikhet, swipe-tröskel. Haptik-mönster i `haptics`, ljud i `audio`, kundens repliker i `SAY`.

## Haptik

- **Android (Chrome):** `navigator.vibrate` med mönster – fungerar efter första trycket.
- **iPhone:** Safari saknar vibrations-API. Canvasen ligger i en `<label>` kopplad till en `<input type="checkbox" switch>`, vilket ger systemets haptiska tick vid varje riktigt tryck (iOS 17.4+). Händelse-tick via script fungerar bara på iOS ≤ 26.4. För riktig haptik (Light/Medium/Heavy) krävs en native-wrapper – Capacitor + `@capacitor/haptics`.
- Vibration och ljud kan stängas av i menyn (sparas lokalt).

## Nästa steg (förslag, i ordning)

1. Testa på riktiga telefoner: 10-sekunderstestet, rundlängd, omstarter per session (se `docs/RESEARCH.md` §9).
2. Justera ramp och skräpfrekvens efter testet.
3. Grafik: riktiga ingredienser i stället för emoji, kundkaraktärer, bakgrund.
4. Streak för dagens utmaning, kompisens spöke (spara tap-tidslinje per seed).
5. Capacitor-paketering med riktig haptik, sedan Play (sluten test) och App Store.
