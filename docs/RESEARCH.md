# Casual-spel som fastnar: research, fem idéer och valet

*Sammanställt 2026-09-19, uppdaterat 2026-09-20. Syfte: hitta det optimalt "beroendeframkallande" men enkla mobilspelet för korta sessioner (tunnelbanan), styrt med swipe/tap, med haptik, en galen twist och ett gemensamt moment. Vinnaren blev **HANGRY**, men alla fem idéer är nu byggda som prototyper (se `game/README.md`), plus **Sysslor** – gamification av vardagssysslor (`docs/CHORES.md`).*

---

## TL;DR

- **Vinnarna på båda butikerna 2025–26 är extremt enkla, portrait, en-tumme, sessioner på 3–5 minuter, ingen timer, omedelbar omstart.** Block Blast! (368 M nedladdningar 2025, mest nedladdade spelet i världen 2025 och Q1 2026) är mallen: en regel, inga tutorials, tusentals A/B-tester.
- **Belöningscentrum triggas av fyra saker som går att koda på en dag:** oförutsägbar belöning (variable ratio), synliga "nära-missar", stigande combo-feedback (ljud + ljus + vibration inom samma frame) och en social jämförelse mot *kompisar*, inte världen (Wordle-effekten).
- **Swipe är i sig en belöningsmekanik:** Tinder-swipen är designad som ett variable-ratio-schema, och forskning visar att swipe ökar upplevd njutning och kontroll jämfört med enbart tap.
- **Vinnande idé: HANGRY** – Stack/Tower Bloxx-mekaniken (tap = släpp, perfekt = blocket växer tillbaka) + swipe åt sidan för att slänga skräp + swipe upp för att servera + en gigantisk *hangry* kund vars mun är målet ("CHOMP"). Duell på samma mobil (turas om, den som får burgaren att rasa förlorar) och "samma burgare"-utmaning via länk.
- **Teknik:** ren HTML/canvas nu (öppna länken på mobilen), Phaser 4 + Capacitor för butiksrelease med riktig haptik. iPhone-webben saknar vibrations-API; prototypen använder ett switch-trick som ger ett tick per tryck.

---

## 1. Vad toppar App Store och Google Play 2025–26

Källor: AppMagic via PocketGamer.biz/Mobilegamer.biz, Sensor Tower *State of Gaming 2026*, Appfigures. Siffror mellan analyshus skiljer (olika Kina-hantering); avrundade.

### Mest nedladdade 2025 (båda butikerna)

| # | Spel | Utgivare | Nedladdningar 2025 | Typ |
|---|---|---|---|---|
| 1 | Block Blast! | Hungry Studio | ~356–368 M | Blockpussel, ad-only |
| 2 | Roblox | Roblox Corp | ~286–295 M | UGC-plattform |
| 3 | Free Fire + MAX | Garena | ~280 M | Battle royale |
| 4 | Subway Surfers | Sybo | ~187 M | Swipe-runner |
| 5 | Pizza Ready! | Supercent | ~150–161 M | Idle-arcade (hybrid-casual) |
| 6 | Ludo King | Gametion | ~151 M | Brädspel, socialt |
| 7 | Vita Mahjong | Vita Studio | ~122 M | Tile-match |
| 8 | Hole.io | Voodoo | ~121 M | Hyper-casual |
| 9 | EA SPORTS FC Mobile | EA | – | Sport |
| 10 | My Talking Tom 2 | Outfit7 | ~122 M | Virtuellt husdjur |

2026 hittills: Block Blast! fortsatt #1 (Jan–Mar), Free Fire MAX, Roblox, nykomlingen **Arrows – Puzzle Escape** (lanserad aug 2025, ~110 M på ett år), Subway Surfers, Pizza Ready. Kumulativt jan 2025–jul 2026: Block Blast 526 M, Roblox 506 M, Free Fire 487 M.

### Mest intäkter 2025 (IAP)

| # | Spel | Utgivare | ~Intäkt 2025 |
|---|---|---|---|
| 1 | Honor of Kings | Tencent | $1,7–2,4 mdr (nästan allt Kina) |
| 2 | Last War: Survival | FirstFun | $1,6–2,2 mdr (+42 %) |
| 3 | Roblox | Roblox | $1,45–2,0 mdr |
| 4 | Whiteout Survival | Century Games | $1,4–1,9 mdr |
| 5 | Royal Match | Dream Games | $1,4–1,9 mdr |
| 6 | MONOPOLY GO! | Scopely | $1,36 mdr |
| 7 | PUBG Mobile | Tencent/Krafton | >$1 mdr |
| 8 | Candy Crush Saga | King | >$1 mdr |
| 9 | Pokémon TCG Pocket | Pokémon/DeNA | ~$0,5–1 mdr |
| 10 | Coin Master | Moon Active | – |

Marknad: ~$80 mdr IAP 2025, nedladdningar sjunker (−7 % till −12 %), men **hybrid-casual växer +20–23 %** och är det enda segment där IAP ökar. Reklamintäkter jan–maj 2026: Block Blast $127 M, Vita Mahjong $90 M.

### Hyper-/hybrid-casual specifikt

- **Block Blast!**: 70 M DAU / 300 M MAU, ~$0,8–1,1 M/dag i annonser, IAP försumbar, >10 000 A/B-tester. Regeln: dra – matcha – rensa. Ingen timer.
- **Pizza Ready!**: 400 M livstid, annonser först efter ~3 minuters spel.
- **Color Block Jam**: $175 k → $25,5 M på ett kvartal; **Screwdom** $29 M/kvartal; skruvpussel dubblade intäkten 2025.
- **Capybara Go!**: >$100 M på tre månader (roguelite-casual).
- **Crossy Road, Flappy Bird, Alto's, Stack** finns inte längre på 2025–26-listorna – men deras mekaniker lever i nästan varje hit ovan.
- Utmärkelser 2025: Pokémon TCG Pocket (Apple + Google), Google "Pick Up & Play": Candy Crush Solitaire.

### Snabbast växande subgenrer 2025–26

Blockpussel (10× IAP på ett år), sort-pussel (+116 %, tredubblat H1 2026), skruvpussel, tile-match/mahjong, merge-2 (Gossip Harbor), idle-arcade, roguelite-casual. Klassisk match-3, hidden object och ordspel minskar.

## 2. Vad förenar vinnarna

1. **10-sekunders-hooken.** En regel, inga tutorial-väggar, lär genom att göra (Block Blast: dra–matcha–rensa).
2. **En tumme, porträttläge.** Allt nås med tummen på ett håll i tunnelbanan.
3. **Korta sessioner, täta misslyckanden, ingen timer, omstart på under en sekund.** Medianssession 3,1–3,5 min, ~3,8 sessioner/dag, ~12 min/dag (GameAnalytics 2026). Hyper-casual 3–5 min × 5–10 ggr/dag.
4. **Svårighetskurva som är tajmad**, ofta dynamisk: första sessionen ska vara 20–30 minuter "lätt vinst", sedan stramas den åt.
5. **Rewarded ads som "rädda mig"** – frivilliga, i rätt ögonblick (rekordrunda). Hybrid-monetisering ger +28 % ARPU vs ad-only.
6. **Meta-progression och samlande**: skins/karaktärer (Subway Surfers, Crossy Road), samlingar i 80 % av live-ops-spelen, **win-streaks i 48 %** och användningen ökar +50 %.
7. **Live-ops i hög takt**: 89 events/månad i toppspelen; dagliga uppdrag, säsonger, "World Tour".
8. **Sociala rötter**: kompisgraf, streaks, sunk progression – "roots, not spikes". Sociala band förutsäger retention bäst på sikt.
9. **Juice**: varje handling får ljud + ljus + rörelse + haptik samtidigt.
10. **Obarmhärtig testning och snabb kopiering**: Rollic idégenererar ~1 000 spel/månad; >2 000 blockpussel släpptes H1 2026.

## 3. Så maximerar man belöningscentrum (och hur vi använder det)

### Psykologin (definition → exempel → så gör HANGRY)

| Mekanism | Vad forskningen säger | Exempel | I HANGRY |
|---|---|---|---|
| **Variable ratio** (Skinner) | Oförutsägbar belöning ger högst och mest utrotningsresistent beteende | Crossy Roads slumpade karaktärsautomat | Guldbitar (5 %) värda 5×, slumpat skräp, varierande kunder |
| **Reward prediction error** (Schultz 1997) | Dopamin fyras av *förväntan* och *oväntad* belöning, inte konsumtion | Wobblet innan prisautomaten avslöjar | Bitens fall (150 ms väntan) → PERFEKT-ring + ton + vibration |
| **Nära-miss** (Clark 2009) | Nästan-vinster aktiverar vinst-kretsen och ökar lusten att fortsätta – *om spelaren hade kontroll* | Flappy Bird nuddar röret ett poäng från rekord | "SÅ NÄRA!" när man är ≤20 px från perfekt; överhänget som trillar av visar exakt hur nära |
| **Flow-kanalen** (Csikszentmihalyi) | Utmaning måste följa skicklighet | Alto's Adventure | Hastighet +9 px/s per bit, bredden krymper vid miss, växer vid perfekt |
| **Zeigarnik** | Oavslutade uppgifter gnager | Geometry Dash "dog vid 95 %" | "5/6 LAGER" i HUD; kundens mun är synligt målet |
| **Förlustaversion** (Kahneman) | Förluster väger ~2× | Subway Surfers "Save me" | Servera tidigt (swipe upp) = ta pengarna vs fortsätta mot CHOMP-bonus |
| **Endowed progress** | Förskott ökar fullföljande (34 % vs 19 %) | Stämpelkort med 2 stämplar | Första kunden vill bara ha 6 lager |
| **Streaks** | Duolingo: 600+ experiment; förlåtande streaks *ökar* återkomst | Snapchat, Duolingo | Dagens utmaning (samma burgare för alla) – nästa steg: streak |
| **Hook-modellen** (Eyal) | Trigger → handling → variabel belöning → investering | Wordle | Push/datum → tap → CHOMP → rekord/kompislänk |
| **Social jämförelse** (Festinger) | Man jämför sig med *liknande* andra; globala topplistor motiverar inte | Wordles emoji-rutnät | "Utmana en vän"-länk med *exakt samma* burgare + poäng att slå |

### Game feel

- **"Juice it or lose it"** (Jonasson & Purho, GDC 2012) och Vlambeers *Art of Screenshake*: skärmskak, hit-stop, squash & stretch, partiklar, redundant feedback för en enda handling.
- **Stigande tonhöjd per combo** (Peggle spelar en diatonisk skala uppåt) – i HANGRY stiger perfekt-tonen två halvtoner per combo.
- **Evidens:** visuella utsmyckningar höjer tilltalande (Hicks 2019, n=72); vibrotaktila utsmyckningar förbättrar spelupplevelsen om de följer animationsprinciper (Singhal & Schneider, CHI 2021); haptik höjer avsikten att spela igen (CHI 2026, n=60).
- **Apples regler** (WWDC19): *Causality* (uppenbar orsak), *Harmony* (haptik + ljud + bild i synk, "även liten latens bryter upplevelsen"), *Utility* (använd sparsamt).

### Varför swipe känns bra

- Tinders Jonathan Badeen: swipen är ett medvetet variable-ratio-schema ("du swipar, du *kanske* får en match"). Tristan Harris: pull-to-refresh är en enarmad bandit.
- Dou & Sundar 2016 (n=252): swipe utöver tap höjde upplevd njutning, intresse och kontroll.
- Reigns (Alliot, GDC 2017): nöjet är gapet mellan en slarvig flick och enorm konsekvens – förseglat med en vibration när man släpper.
- Mekanismen: en swipe packar fysisk *commitment*, direkt manipulation och avslöjande i ~300 ms – handling, förväntan och utfall i samma gest.

### Haptik-karta för HANGRY (ms, Android-mönster)

| Händelse | Mönster | Ljud |
|---|---|---|
| Tap (släpp) | 10 | – |
| Normal landning | 18 | dov duns + brus |
| Perfekt | 40 · combo≥2: 25-40-45 · combo≥5: 20-30-20-30-20-30-60 | stigande ton |
| Skräp bortswipat | 35 | whoosh |
| CHOMP | 70-50-70-50-140 | två sågtandstuggor |
| Miss/spya | 140-70-220 | fallande ton |
| Rekord/vinst | 40×6 + 160 | fanfar |

## 4. Referensspelen nedplockade

| Spel | Kärnan | Vad vi stjäl |
|---|---|---|
| **Stack** (Ketchapp 2016) | Tap = skiva. Perfekt = blocket växer tillbaka, ton, blixt | Hela grundloopen: synlig krympning = spänning, perfekt = belöning som *gör spelet lättare* |
| **Tower Bloxx** (2005) | Kran-timing, perfekt ger stabilitet och invånare | Svängande bit, "huset som rasar" |
| **Flappy Bird** | En tumme, brutal, omstart direkt, ständiga nära-missar | Omstart på ett tryck, ingen förlåtelse för skräp |
| **Crossy Road** | 12 veckors bygge, 10 M första månaden; inga timers, gacha-karaktärer, opt-in ads | Skins som meta senare, aldrig energi |
| **Subway Surfers** | Tre filer, swipe, 4,5 mdr nedladdningar; månatlig World Tour | Swipe-vokabulären (upp/ner/vänster/höger), live-ops-tänk |
| **Alto's Adventure** | Tap = hopp, håll = backflip, Zen-läge utan fail | Flow, "Zen-läge" som möjlig framtida mode |
| **Geometry Dash** | Musik styr hoppet, %-mätare, practice-checkpoints | Progressmätare (x/y lager), rytmisk ljudstege |
| **Tetris** | Tetris-effekten (bilder i sömnen), 3 min Tetris dämpar begär | Enkel geometri som hjärnan fortsätter simulera |
| **Wordle** | En per dag, samma för alla, emoji-delning: 90 → 2 M spelare på tio veckor | Dagens utmaning + delningslänk med samma seed |
| **Reigns** | Binär swipe med enorm konsekvens | Skräp-swipen: en flick avgör allt |
| **Block Blast!** | Ingen timer, rad+kolumn rensas, combos, klarhet först | Ingen timer, combo-multiplikator, klarhet före grafik |
| **Plants vs Zombies / Smurfs' Village** | Appointment-mekanik, samlande, "kom tillbaka om 4 h" | Framtida meta (kunder som "beställer" till imorgon) |
| **Roblox** | Socialt, UGC, spela *med* kompisar | Delat moment på samma mobil nu, online-duell sen |

## 5. Fem spelidéer att testa mekaniken på

### 1. HANGRY (Stack × Tower Bloxx × Burger Time) — **vinnaren**
En jättekund gapar högst upp. Ingredienser svänger in. **Tap** släpper, perfekt landning ger combo och bredd tillbaka, snett = överhänget trillar av. **Swipe ⇠⇢** slänger skräp (strumpa, sko, bomb) – staplar du skräp spyr kunden. **Swipe ⇡** serverar tidigt (säkra poäng, ny kund) – eller fortsätt mot munnen för **CHOMP**-bonus. **Swipe ⇣** = slam (snabbare fall, +bonus). Twist: kunden blir argare för varje lager, ögonen följer biten, muns­torleken växer. Delat moment: **duell på samma mobil** (turas om, den som rasar förlorar) + **"samma burgare"-länk**.

### 2. DÖRRVAKTEN (Reigns × Stroop)
Gäster kommer till klubbdörren. Skylten visar regeln ("bara hattar", "inga röda"). Swipe ⇢ släpp in, ⇠ avvisa, ⇡ VIP, ⇣ visitera. Regeln byts var tionde gäst, tempot ökar. Twist: "motsatt dag" vänder alla regler, dörrvakten blir full och skärmen vinglar. Delat moment: stafett – skicka mobilen efter varje miss, samma seed.

### 3. TUNNELBANAN (Gravity Guy × Subway Surfers)
Du springer *utanpå* ett tunnelbanetåg. Swipe ⇡ flippar gravitationen till taket, ⇣ tillbaka, ⇠⇢ byter spår. Stationer "äter" den som är på fel sida. Twist: konduktören jagar dig och tågen byter riktning. Delat moment: ghost-race på samma seed (kompisens spöke syns).

### 4. SUSHI-KAST (Fruit Ninja × Paper Toss)
Sushitallrikar glider förbi i mitten. Fyra gäster sitter upp/ner/vänster/höger med en ikon på vad de vill ha. Swipa tallriken *mot* rätt gäst. Fel eller för sent = arg gäst. Twist: katter stjäl sushi, swipa wasabi på katten. Delat moment: delad skärm, två spelare kastar samtidigt från var sin halva.

### 5. JENGA-HUSET (den där balans-lekan, med riktig fysik)
Tap släpper våningar med kran, swipe ⇠⇢ knuffar hela tornet för att motbalansera, riktig fysik (Matter.js). Twist: jordbävningar och duvor som landar på ena sidan. Delat moment: hot-seat Jenga – turas om, den som välter förlorar.

### Matris (1–5, högre är bättre; kodtid 5 = snabbast)

| Idé | 10-sek-förståelse | Swipe/tap-rikedom | Haptik-tillfällen | "En gång till" | Delat moment | Twist | Kodtid | Klon-risk låg | Summa |
|---|---|---|---|---|---|---|---|---|---|
| **HANGRY** | 5 | 5 | 5 | 5 | 5 | 4 | 4 | 3 | **36** |
| Dörrvakten | 5 | 5 | 4 | 4 | 3 | 4 | 5 | 4 | 34 |
| Sushi-kast | 4 | 5 | 4 | 4 | 4 | 3 | 4 | 4 | 32 |
| Jenga-huset | 5 | 3 | 4 | 4 | 5 | 3 | 2 | 3 | 29 |
| Tunnelbanan | 5 | 4 | 3 | 4 | 4 | 3 | 3 | 2 | 28 |

**Varför HANGRY vinner:** den enda idén som kombinerar en *bevisad* one-tap-hook (Stack) med alla fyra swipe-riktningarna som *meningsfulla* beslut, en inbyggd risk/belöning (servera nu eller gambla mot CHOMP), ett synligt, roligt mål (munnen) och ett delat moment som inte kräver nätverk. Dörrvakten är den snabbaste att koda och ett bra andraspel; Jenga-huset har det bästa hot-seat-momentet men fysik-tuning tar dagar.

## 6. HANGRY – designdokument (light)

**Kärnloop (20–60 s):** bit svänger → tap → landning (perfekt/trim/miss) → nästa bit snabbare → … → CHOMP (ny, hungrigare kund, bredden återställs) → … → rasar → poäng, "IGEN".

**Regler**
- Startbredd 210 px (logisk 390 px-skärm). Perfekt-tolerans 8 px, "SÅ NÄRA" ≤ 20 px. Perfekt ger +7 px bredd tillbaka (max start).
- Skräp: från bit 3, sannolikhet 7 % + 0,45 %/bit, max 26 %, aldrig två i rad. Första skräpet svänger i 60 % fart och kunden ropar "SKRÄP! SWIPA BORT".
- Guld: 5 % (aldrig bottenbulle/toppbulle). Perfekt guld = 5× poäng.
- Svängfart: 210 px/s + 9/bit, max 640. Startsida slumpad.
- Kundens aptit: 6 → 8 → 10 → 12 → 14 lager (växer per CHOMP). Bulle tvingas som första och sista lager.
- Att slänga *mat* är tillåtet men kunden tar en tugga: översta lagret krymper 25 %.
- Servera (swipe ⇡) kräver ≥ 3 lager. Ej i duell.

**Poäng:** normal +10, perfekt +10 + 10×combo, slam +10/+5, guld ×5, skräp bort +5, servera 15×lager, CHOMP 50×lager.

**Lägen:** Fritt spel (ny seed), Dagens utmaning (seed = datum, egen highscore), Utmaning (seed + poäng i länk-hash: `#s=SEED&t=POÄNG`), Duell (turas om, färgad tur-banner, vinsträknare).

**Determinism:** all slump per bit-index via seed (`mulberry32(xmur3(seed:i))`), så två spelare får identisk bit-sekvens oavsett vad de gör.

**Retention-meta (inte i prototypen, i ordning):** streak för dagens utmaning → kompisens spöke i realtid (lagra tap-tidslinje per seed) → skins/kunder att samla → online-duell med "skräp-garbage" till motståndaren (Tetris 99) → veckoturnering.

## 7. Motorval

| Motor | Kostnad | Prototyp-tid för stack/swipe | Haptik på mobil |
|---|---|---|---|
| **Ren HTML/canvas** (det vi byggt) | 0 | timmar, öppna en länk | Android: `navigator.vibrate`; iOS: bara switch-trick |
| **Phaser 4.2** (MIT) | 0 | snabbast för JS-utvecklare, Matter.js inbyggt, officiell Capacitor-guide | via Capacitor Haptics |
| **Godot 4.7** (MIT) | 0 | snabb, inbyggd 2D-fysik, `Input.vibrate_handheld()` med amplitud på iOS | inbyggt; iOS kräver Mac |
| **Defold 1.13** | 0 | snabb (Lua), små byggen | extension-vibrate (utan styrkor) |
| **Unity 6** | gratis < $200 k intäkt | långsammast att prototypa | bara `Handheld.Vibrate()`, styrkor kräver plugin |
| Construct 3 / GDevelop | abonnemang / gratis med gränser | mycket snabbt utan kod | begränsat, iOS via byggtjänst |

**Rekommendation:** testa mekaniken i webbläsaren *idag* (klart), fortsätt i JS (ren canvas eller Phaser 4) och paketera med **Capacitor 8 + @capacitor/haptics** (`impact({style: Light/Medium/Heavy})`, `notification()`, `selection…`) när grafiken är putsad. Byt till **Godot 4** bara om ni vill ha riktig fysik och editor (Jenga-huset).

**Butik:** Apple Developer Program $99/år. Google Play $25 engångsavgift; nya privatkonton måste köra sluten test med 12 testare i 14 dagar före lansering. En PWA kan läggas på Play via TWA (PWABuilder) men inte på App Store utan wrapper (Capacitor).

## 8. Haptik i mobilwebben – verifierat läge (sept 2026)

- **iOS Safari har inget vibrations-API** i någon version (17–26), WebKit motsätter sig standarden. Ingen ny web-haptik-API i iOS 26.
- **Switch-tricket:** `<input type="checkbox" switch>` (iOS 17.4+) ger systemets haptiska tick när den togglas. Script-klick via `label.click()` fungerar på iOS 17.4–26.4; **iOS 26.5 täppte till scriptvägen** – bara ett riktigt fingertryck triggar. Prototypen lägger därför canvasen i en `<label for="hxs">`, så varje tap/swipe togglar switchen (tick vid varje tryck på alla iOS-versioner), plus script-tick vid händelser där det fortfarande går.
- **Android Chrome:** `navigator.vibrate` fungerar efter första trycket på sidan, mönster upp till 99 element, ingen styrkekontroll.
- **Riktig haptik** (Light/Medium/Heavy, Success/Warning) kräver native-wrapper: Capacitor Haptics (gratis, MIT).

## 9. Vad vi ska mäta när mekaniken testas

- **10-sekunderstestet:** en kompis förstår utan förklaring. Om inte: förenkla, inte förklara.
- **"En gång till"-kvot:** omstarter per session (mål > 5).
- **Rundlängd:** 20–60 s i snitt (kortare = för svårt, längre = för lätt).
- **Delningsgrad:** andel game over som leder till "Utmana en vän".
- **Skräp-missar:** andelen som staplar skräp de första 3 rundorna (om > 30 %: tydligare skräp).
- Senare: D1/D7-retention, sessioner/dag, session-längd (benchmark 3–5 min, 4–10 ggr/dag).

## 10. Etik-rad

Zagal m.fl. definierar dark patterns som design mot spelarens intresse utan samtycke (grind, spela-på-avtalad-tid, betala-för-att-slippa). Apple och Google kräver oddsredovisning för betalda slumpföremål. Vår linje: skicklighetsbaserad loop, ärliga nära-missar, ingen betald slump, förlåtande streaks, sessioner som tar slut naturligt. Eyals *regret test*: skulle spelaren göra samma sak om hen visste det vi vet? Ja.

## Källor

**Listor och marknad:** pocketgamer.biz/the-most-downloaded-mobile-games-of-2025 · pocketgamer.biz/the-top-grossing-mobile-games-of-2025 · mobilegamer.biz/the-top-grossing-mobile-games-of-2025 · mobilegamer.biz (2026 top-10 downloads so far) · sensortower.com/report/state-of-gaming-2026 · sensortower.com/blog/h1-2026-digital-gaming-market-index · businesswire.com (Block Blast Q1 2026) · appmagic.rocks/research/casual-report-2025 · appmagic.rocks/research/casual-report-H12026 · appmagic.rocks/blog/hybridcasual-q1-2025 · appmagic.rocks/research/liveops-report-2025 · land.appfigures.com/2025-mobile-games-trends-report · deconstructoroffun.com (State of Mobile Gaming 2025; From Tetris to Block Blast) · naavik.co/digest/puzzle-games-go-super · gameanalytics.com/reports/2026-mobile-pc-gaming-benchmarks · adjust.com/blog/gaming-app-insights-2026 · felixbraberg.substack.com (Block Blast review) · gamigion.com (2025 hybridcasual overview) · apple.com/newsroom (App Store Awards 2025) · blog.google (Best of Google Play 2025).

**Psykologi och game feel:** Hopson, *Behavioral Game Design* (gamedeveloper.com) · Schultz, Dayan & Montague 1997 (pubmed 9054347) · Clark et al. 2009, *Neuron* (PMC2658737) · Chen 2007, *Flow in Games* · Nunes & Drèze 2006 · Lenny's Newsletter: Duolingo streaks · Eyal, *Hooked* / regret test (nirandfar.com) · gamedeveloper.com: The Compulsion Loop Explained · GDC Vault: *Juice It or Lose It* (1016789) · Vlambeer, *Art of Screenshake* · Hicks et al. 2019 CHI PLAY (10.1145/3311350.3347171) · Singhal & Schneider 2021 CHI (10.1145/3411764.3445463) · CHI 2026 (10.1145/3772318.3791144) · Apple WWDC19 *Designing Audio-Haptic Experiences* · Dou & Sundar 2016 IJHCI · GDC Vault: *The Casual (but Regal) Swipe* (1024278) · Tinder/Badeen (iflscience) · Harris, *How Technology Hijacks People's Minds* · Stickgold 2000, *Science* · Skorka-Brown 2015 · Wordle: theconversation.com, buzzfeednews.com, blog.x.com · Crossy Road GDC (1021897) · Tower Bloxx postmortem (gamedeveloper.com) · Subway Surfers (revenuecat.com Sub Club 2025) · Park et al. 2017 (arXiv 1702.08005) · Zagal, Björk & Lewis 2013 · darkpattern.games.

**Teknik:** caniuse vibration.json · MDN browser-compat-data Navigator.json · WebKit standards-positions #267 · WICG/web-haptics · ionic-framework #29942 / #29945 · m1ckc3s/project-fathom · tijnjh/ios-haptics · chromium vibration_controller.cc · ionic-team/capacitor-haptics · phaserjs/phaser releases · phaser.io Capacitor-tutorial · godotengine/godot releases + Input.xml · defold/defold LICENSE · unity.com (runtime fee cancelled) · 80.lv (Unity 2026 prices) · developer.apple.com/programs · support.google.com (Play 12-testers rule) · macrumors.com (EU web apps) · webkit.org (Safari 26 features).
