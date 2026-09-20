# CHORES / SYSSLOR – gamification av tråkiga vardagssysslor

*Konceptdokument 2026-09-20. Prototypen ligger i `game/chores.html` (arbetsnamn SYSSLOR).*

## Kort svar: ja, det går, och marknaden är bevisad – men namnet är taget

- **"Satisfying"-genren är stor.** PowerWash Simulator: 17 M spelare (mars 2025). Oxford-studie på 8 695 spelare: 72 % får humörlyft, mest under de första 15 minuterna. Hole.io ~420 M installationer, Sand Balls 100 M+, Mow My Lawn ~42 M, Deep Clean Inc. 3D ~40 M, House Flipper Mobile 50 M+.
- **"Chores!" finns redan.** Lion Studios (AppLovin/Tripledot) har ett live hyper-casual-spel med exakt konceptet: mini-spel med strumpsortering, strykning, gräsklippning, krattning, toalettstädning. 10 M+ nedladdningar, uppdaterat jan 2026. Direkt kollision i både titel och koncept. "Chore Wars" (webb-RPG 2007) stängde mars 2025 och namnet återanvänds av minst tre appar. Vi behöver ett annat namn och en tydlig egen twist.
- **Gamification av *riktiga* sysslor är svårare än det låter.** Deci, Koestner & Ryan (1999, 128 studier): förväntade yttre belöningar sänker inre motivation, starkast hos barn. Habitica-fältstudie (2019): alla 45 deltagare upplevde kontraproduktiva effekter. Chore-appar tappar användare efter ~1 månad. Det som fungerar: feedback och synlig progression (inte betalning per syssla), streaks med förlåtelse (Duolingo), och att hela familjen är med.

## Vad vi bygger: spelet *om* sysslor, med hushållet som motståndare

Kärnidé: fyra sysslor du hatar i verkligheten blir fyra 45–60-sekunders spel som är sjukt tillfredsställande. Alla i hushållet får **samma gräsmatta, samma smutsiga ruta, samma tvätthög och samma golv** varje dag (seed = datum). Poängen jämförs på samma mobil. Den som gör alla fyra får "HELA HUSET RENT" och en städ-streak.

| Syssla | Mekanik | Från idé # | Twist | Belöningsloop |
|---|---|---|---|---|
| **Klippa gräset** | Snake-styrning med swipe, klippt gräs avslöjas i ränder | Tunnelbanan (lane/coverage) | Mullvaden gräver upp det du klippt, kör över den för bonus. Hundbajs smetar ut skärmen. Grannen klagar efter 60 s | Varje ruta = tick i handen + klipp-ljud. Procentmätare. Blommor = liv |
| **Torka fönster** | Dra fingret, smutsen försvinner cell för cell, envisa fläckar kräver tre drag | Ny (wipe-reveal, Deep Clean-mekaniken) | Fåglar bajsar på rutan (tryck innan de hinner), flugor landar (tryck). Regnet kommer efter 45 s | Kontinuerlig haptik medan du torkar. Utsikten avslöjas. Tidsbonus |
| **Sortera tvätt** | Swipe åt fyra håll: vitt ⇠, kulört ⇢, fintvätt ⇡, trasigt ⇣ | Dörrvakten (swipe-sortering) | Ljusrosa är inte vitt. Hål slår allt. 40 plagg, tempot ökar. Tre fel = mamma tar över | Combo-multiplikator, stigande ton, förklaring vid fel |
| **Dammsuga** | Snake-styrning, dammet sugs in med partiklar | Samma motor som gräset | Katten klöser om du kör på den och flyr. Lego fastnar i slangen. Katten vill sova efter 60 s | Sug-partiklar mot munstycket, tick per ruta |

Nästa sysslor med redan byggda mekaniker: **Diska/stapla disk** (HANGRY-stapling), **Källsortering** (Sushi-kastets fyra-håll-kast: glas/papper/plast/metall), **Packa flyttlådor** (Jenga-fysiken), **Hänga tvätt**, **Städa kattlådan**.

## Vad som skiljer oss från Lion Studios "Chores!"

1. **Hushållet spelar mot varandra på samma mobil, samma dag, samma smuts.** Lokal leaderboard med namn, "vem städar bäst i dag". Ingen server behövs för v1.
2. **Dagens hus som ritual.** Fyra sysslor, sedan är huset rent. Streak med en frysdag i veckan (förlåtande streaks ökade Duolingos DAU).
3. **Frivillig verklighetskoppling (v2), rätt gjord.** *Temptation bundling* (Milkman 2014: +51 % gymbesök när ljudboken bara fick lyssnas på gymmet): den riktiga sysslan låser upp en bonus i spelet (extra liv, guldmullvad), inte tvärtom. Ingen betalning per syssla, ingen bestraffning. Feedback och progression, aldrig "vad får jag?".
4. **Sessioner som tar slut naturligt.** Varje syssla är 45–60 s. Fyra sysslor = fyra minuter. Det matchar tunnelbanan och undviker dark patterns.

## Prototypen (v0.1) innehåller

- Hub med fyra sysslo-kort, stjärnor och dagens poäng per spelare, två profiler med namn, städ-streak.
- Intro-skärm per syssla med tre piktogram, sedan 45–60 s spel, sedan resultat med stjärnor (0–3), "NÄSTA SYSSLA" som hoppar till nästa ogjorda.
- Dagens seed per syssla (identisk för alla), utmaningslänk (`#c=grass&s=SEED&t=POÄNG`).
- Haptik: tick per klippt/sugen/torkad ruta (max var 80–90 ms), medel vid fågelbajs och lego, fail vid blommor och katt, vinstmönster vid klart.
- Balans (i koden): gräs/dammsugning 10 kolumner × ~17 rader, 0,16 s per ruta, 60 s; fönster 27 × ~46 celler à 12 px, 45 s, envisa fläckar hp 3; tvätt 40 plagg, 2,6 → 1,0 s per plagg, 3 liv.

## Namn

"Chores" är beskrivande och upptaget. Kandidater att kolla mot varumärkesregister: **SYSSLOR** (svenskt, ovanligt), **HUSFRID**, **Städkriget**, **Tidy Rush**, **Dust & Glory**, **Hemmafix**. Undvik "Chore Wars". Kolla USPTO/EUIPO innan lansering (sökningen var blockerad i vår research).

## Mätpunkter för testet

- Andel som lägger till spelare 2 (hushålls-adoption).
- Andel dagar med alla fyra sysslor klara.
- Stjärnfördelning per syssla (för svårt/för lätt).
- Vilken syssla som spelas om mest ("en gång till"-kvot per syssla).
- D1/D7-retention när det finns fler än fyra sysslor.

## Källor

PowerWash Simulator 17 M (vgchartz.com) · Oxford-studien (ox.ac.uk/news 2024-09-25; Nature Sci Data 2023) · Unpacking 1 M (gamedeveloper.com) · A Little to the Left 999 999 (wearesecretmode.com) · House Flipper (Wikipedia; worthplaying.com; AppBrain) · Hole.io, Mow My Lawn, Deep Clean Inc., Clean Up 3D (AppBrain-estimat, Android) · Sand Balls (pocketgamer.biz) · Azur Games om "satisfaction"-genren (wnhub.io) · Supersonic om retention (supersonic.com/learn) · Habitica (habitica.com; Diefenbach & Müssig 2019, IJHCS) · Sweepy (indiehackers.com) · Tody (todyapp.com) · Nipto, OurHome, Chorsee, Homey, ChoreMonster (AppBrain; nestboard; prnewswire; Wikipedia) · Finch (sparrowapps.io) · "Chores!" Lion Studios (Google Play com.chitralekha.tinyiron; App Store id1482395931) · Chore Wars (chorewars.com; Washington Post 2007) · Deci, Koestner & Ryan 1999 · Milkman et al. 2014, Management Science · Nature 2021 megastudy · Duolingo streaks (businessofapps.com; Lenny's Newsletter) · Sailer & Homner 2020; Koivisto & Hamari 2019 · White, DeBoer & Scharf 2019 (JDBP) · Hexa Sort, Water Sort, Sort It 3D (gamesalchemy; socialpeta; AppBrain) · Tenjin om "Chores!" som första task-per-level-spelet.
