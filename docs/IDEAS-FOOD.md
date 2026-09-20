# 20 spelidéer på mat-temat (uppföljning till HANGRY och Sushi-kast)

*2026-09-20. Kriterier: swipe/tap, 20–60 s per runda, haptik i varje moment, en galen twist, ett delat moment, snabbt att prototypa på `game/lib/core.js`.*

## Vad som redan finns på temat

| Kategori | Spel | Kärnan |
|---|---|---|
| Burgare | Sky Burger (NimbleBit 2009), Papa's Burgeria (Flipline), Burger Please! (Supercent), BurgerTime (arkad 1982) | Fånga fallande ingredienser med lutning, bygg efter order, idle-arcade, klassikern |
| Sushi | Sushi Go Round (Flash-klassiker), Sushi Cat (fysik), Sushi Roll 3D (hyper-casual) | Servera från band, studsa katten, rulla |
| Servera/kasta | Tapper (arkad 1983), Diner Dash / Cooking Dash, Cook Serve Delicious, Overcooked | Skjut öl längs baren, time management, snabb input, kaos-co-op (riktmärket för delat moment) |
| Matlagningssim | Cooking Fever, Cooking Madness, Good Pizza Great Pizza, Cooking Mama | Hundratals miljoner nedladdningar; ordrar, tempo, gest-minispel |
| Hyper-casual mat | Fruit Ninja (över en miljard), Sandwich!, Perfect Slices, Cut the Rope, Pizza Ready (400 M) | Swipa/skär/vik/mata; "satisfying" |

Luckan: nästan inget av dem är byggt kring *en* fysisk gest + *en* absurd kund + ett tvåspelarmoment på samma mobil. Det är vår nisch.

## De 20 idéerna

| # | Namn | Kärnmekanik | Input | Galen twist | Delat moment | Dagar | Närmast |
|---|---|---|---|---|---|---|---|
| 1 | **Pannkakstornet** | Vänd pannkakan i exakt rätt ögonblick (rå → gyllene → bränd), skjut den på stapeln | ⇡ vänd, tap = skjut på | Sirapen hälls först när tornet når kundens mun; en fluga landar på toppen | Turas om att vända, den som bränner förlorar | 1 | HANGRY + timing |
| 2 | **Köttbullsregn** | Fånga fallande köttbullar med tallriken, undvik lingonen som stänker | ⇠⇢ byt fil | Ikea-kön: kunderna skriker "MER SÅS" och regnet blir horisontellt | Delad skärm, missade bullar rullar över till motståndaren | 1 | Sky Burger |
| 3 | **Kebabspettet** | Skär skivor från det roterande spettet i rätt fas, fyll pitan till linjen utan spill | ⇣ skär (längd = tjocklek), ⇠⇢ flytta pitan | Spettet varvar upp, kunden vill ha "allt, mycket, stark" | Samma seed, jämför fyllnadsgrad | 1,5 | Perfect Slices |
| 4 | **Pizzaskäraren** | Dela pizzan i exakt N lika bitar med swipes, kasta sedan varje bit till rätt gäst | swipe = skär, swipe mot gäst = kasta | Girige farbrorn vill ha störst bit och blir grön av avund | Samma pizza för två, rättvisast vinner | 1,5 | Sushi-kast + precision |
| 5 | **Glasstornet** | Stapla kulor som smälter medan du staplar; servera innan det droppar | tap = kula, ⇡ servera | Fiskmås stjäl toppkulan (swipa bort), solen går in och ut ur moln | Turas om, droppet avgör | 1 | HANGRY + urgency |
| 6 | **Perfekt portion** | Håll för att hälla (ris, sås, läsk), släpp exakt vid linjen | håll/släpp | Kundens mun öppnas och stängs i rytm; hälla i munnen ger bonus | Samma ordrar, minsta spill vinner | 0,5 | "Perfect pour"-spel |
| 7 | **Köttbullekanonen** | Flicka köttbullar in i munnar på olika avstånd, fläkten ger vind | swipe = riktning + kraft | Hunden hoppar upp och snor i luften; chefen gapar bara var tredje sekund | Turas om, samma mål, minigolf-känsla | 1 | Paper Toss |
| 8 | **Buffé-rush** | Tallriken springer genom buffélinjen i tre filer, plocka rätt rätter, tallriken har kapacitet | ⇠⇢ fil, ⇡ till bordet | Nysande gästen, tomma kantiner, "sista räkan" som alla vill ha | Spöke på samma buffé | 1,5 | Subway Surfers |
| 9 | **Grillmästaren** | 3×3 galler; vänd när undersidan är klar, servera när båda är klara | tap = vänd, ⇡ servera, ⇣ lägg på ny | Flammor att släcka (tap), grannen vill ha "medium rare, exakt" | Två grillar delad skärm, vem serverar flest | 1,5 | Cooking Mama / Overcooked-lite |
| 10 | **Smoothiemixern** | Fånga frukter i rätt färg så att blandningen blir kundens färg (rött + gult = orange), mixa | ⇠⇢ fil, ⇡ mixa | Färgblind kund som ångrar sig, spenat som gör allt brunt | Samma beställning, närmast färg vinner | 1,5 | Färgmixning + catch |
| 11 | **Woken** | Kasta woken; varje kast lagar ett steg, för hårt = spill, för lite = bränt | ⇡ kast (kraft = längd), ⇠⇢ tilta för sås | Flamman skjuter i taket, kocken tappar mustaschen | Rytmduell turvis | 1 | Rytm/fysik |
| 12 | **Matkriget** | Delad skärm: kasta mat i motståndarens ansikte, ducka i sidled | swipe mot motståndaren, ⇠⇢ ducka | Träff = splat som täcker motståndarens halva i två sekunder, på riktigt | Hela spelet är momentet | 1 | Sushi-duellen |
| 13 | **Kylskåpstetris** | Packa in veckans matkasse: ägg får inget ovanpå, mjölk måste stå, glass bara i frysraden | ⇠⇢ flytta, tap rotera, ⇣ släpp | Barnet öppnar dörren och allt tinar; en påse går sönder | Samma kasse, snyggast packning | 2 | Tetris |
| 14 | **Fiskmåsen** | Du är måsen: dyk och snappa maten ur turisternas händer, undvik paraplyer | ⇣ dyk, ⇡ stig | Hangry barnet slår tillbaka; korvgubben har vattenpistol | Samma strandpromenad, spöke | 1,5 | Reverse role, Flappy-timing |
| 15 | **Korvmojet kl 03** | Nattkunder sluddrar ("en mä mos å räksalla") – tolka, tryck topping i ordning, servera | tap toppings, ⇢ servera | Beställningen förvrängs mer ju senare på natten, polisen kommer förbi | Turas om, samma kö | 1 | Papa's, svensk humor |
| 16 | **Fikapausen** | Doppa kexet: håll för att doppa, släpp innan det går av | håll/släpp | Kexet blir mjukare för varje sekund, bonus för "nästan av"; chefen kommer in | Samma kex, mjukast utan att gå av | 0,5 | Ren en-knapps-spänning |
| 17 | **Kräftskivan** | Swipe-kombon i takt med snapsvisan (vrid, dra, knäck), SKÅL vid tap-markeringar | swipes i takt, tap | Tempot ökar för varje vers, sur granne, lyktan slocknar | Delad skärm, vem skalar flest | 1,5 | Rytm (Geometry Dash-känsla) |
| 18 | **Brickan** | Bär en bricka med drinkar genom lokalen, balansera lutningen med swipes | ⇠⇢ motvikt | Gäster knuffar, barnet springer, koppen är för full | Turas om på samma rutt | 1 | Jenga-huset-balans |
| 19 | **Världens längsta macka** | Co-op: två spelare i var sin ände bygger *en* macka mot mitten i rätt ordning | swipe mot mitten | Bussen kommer om 40 s; den som lägger fel får hela gänget att skratta | Samarbete på samma mobil, inte mot varandra | 1 | Overcooked-känsla |
| 20 | **Ättävlingen** | Korvätartävling: tappa för att tugga, ⇣ svälj, ⇡ drick när "kvävmätaren" fylls | mash + ⇡⇣ | Domaren räknar, magen växer, sista korven är jättestor | Delad skärm-mash, först till tio | 0,5 | Button-mash-duell |

## Tre att prototypa först

1. **Matkriget** – starkast delat moment, återanvänder Sushi-kastets delade skärm, splat-mekaniken är billig och elak.
2. **Pannkakstornet** – HANGRY-koden plus en vändtiming; två dopaminlopp i ett (vänta på gyllene, sedan stapla).
3. **Fikapausen** – en halv dag att bygga, förstås på tre sekunder, perfekt för att testa "en gång till"-kvoten och haptik i ren form.

Svensk bonus för spridning: **Korvmojet kl 03** och **Kräftskivan**.
