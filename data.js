/* ============================================================
   MAPA RECEPTORÓW OUN — baza danych
   Klasy: iono (jonotropowe/LGIC), gs (Gs/Golf), gi (Gi/o),
          gq (Gq/11), rtk (kinazy tyrozynowe / neurotrofiny)
   ============================================================ */

const CLASS_META = {
  iono: { label: "Jonotropowy (LGIC)", short: "LGIC", color: "emerald" },
  gs:   { label: "GPCR — Gαs/Gαolf",   short: "Gs/Golf", color: "sky" },
  gi:   { label: "GPCR — Gαi/o",       short: "Gi/o", color: "coral" },
  gq:   { label: "GPCR — Gαq/11",      short: "Gq/11", color: "amber" },
  rtk:  { label: "Receptor kinazy tyrozynowej (RTK)", short: "RTK", color: "violet" },
};

const FAMILY_META = {
  glu: "Glutaminianergiczny",
  gaba: "GABA-ergiczny / Glicynergiczny",
  ach: "Cholinergiczny",
  da: "Dopaminergiczny",
  ht: "Serotoninergiczny",
  ne: "Adrenergiczny / Noradrenergiczny",
  opioid: "Opioidowy",
  cb: "Kannabinoidowy",
  hist: "Histaminergiczny",
  pur: "Purynergiczny",
  pep: "Neuropeptydowy",
  trk: "Neurotroficzny (RTK)",
  sensory: "Czuciowy (ASIC/TRP)",
  taar: "Aminy śladowe (TAAR)",
  mel: "Melatoninowy",
  met: "Metaboliczny (insulina/IGF)",
  axon: "Naprowadzanie aksonów (Eph/efryna)",
};

const RECEPTORS = [
  // ---------------- IONOTROPOWE ----------------
  {
    id: "ampa", name: "AMPA", genes: "GRIA1–4 (GluA1–GluA4)", class: "iono", family: "glu",
    conductance: "Na⁺, K⁺ (Ca²⁺ przy braku edytowanego GluA2)",
    localization: "Powszechny w całym OUN — kora, hipokamp, prążkowie",
    structure: "Tetramer (homo- lub heterotetramer podjednostek GluA1–4).",
    pathway: [
      "Związanie glutaminianu w domenie S1-S2 podjednostek GluA",
      "Otwarcie kanału kationowego → napływ Na⁺ / wypływ K⁺",
      "Szybka depolaryzacja błony (wczesna faza EPSP, ~1 ms)",
      "Edycja RNA Q/R w GluA2 blokuje przepuszczalność dla Ca²⁺ (kanały CP-AMPA bez GluA2 przewodzą Ca²⁺)"
    ],
    crosstalk: "Fosforylacja Ser845 (PKA, poprzez DARPP-32) i Ser831 (CaMKII) zwiększa przewodnictwo kanału i jego wbudowanie w błonę — kluczowe dla LTP.",
    pharm: [
      { drug: "Perampanel", note: "niekonkurencyjny antagonista allosteryczny — lek przeciwpadaczkowy" },
      { drug: "Ampakiny", note: "pozytywne modulatory allosteryczne — badania nad funkcjami poznawczymi" },
      { drug: "Cyklotiazyd", note: "blokuje desensytyzację kanału — klasyczne narzędzie elektrofizjologiczne" }
    ],
    clinical: "Kanały CP-AMPA (bez GluA2) — udział w ekscytotoksyczności i patomechanizmie SLA.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=41"]
  },
  {
    id: "nmda", name: "NMDA", genes: "GRIN1–3 (GluN1, GluN2A–D, GluN3A–B)", class: "iono", family: "glu",
    conductance: "Ca²⁺ ≫ Na⁺, K⁺ (najwyższa przepuszczalność wapniowa wśród LGIC)",
    localization: "Kora, hipokamp (CA1/CA3), prążkowie — gęsto w kolcach dendrytycznych",
    structure: "Heterotetramer — zwykle 2×GluN1 + 2×GluN2 (koincydencja ligand + napięcie).",
    pathway: [
      "Depolaryzacja błony (zwykle za sprawą AMPA) do ok. −30…−20 mV",
      "Elektrostatyczne usunięcie blokady Mg²⁺ z poru kanału",
      "Jednoczesne związanie glutaminianu (GluN2) i koagonisty — glicyny/D-seryny (GluN1)",
      "Masywny napływ Ca²⁺ do cytoplazmy",
      "Ca²⁺/kalmodulina → CaMKII (LTP) lub kalcyneuryna PP2B (LTD)"
    ],
    crosstalk: "Działa jako biologiczny detektor koincydencji łączący AMPA (depolaryzacja) z sygnałem presynaptycznym. Interakcja białko-białko z receptorem D1 (kompleks NMDA–D1) stabilizuje kanał w błonie.",
    pharm: [
      { drug: "Ketamina, fencyklidyna (PCP)", note: "antagoniści kanału (blokada w porze) — działanie dysocjacyjne" },
      { drug: "Memantyna", note: "antagonista o niskim powinowactwie — choroba Alzheimera" },
      { drug: "Esketamina", note: "antagonista — donosowy lek na depresję lekooporną (Spravato)" },
      { drug: "D-cykloseryna", note: "częściowy agonista miejsca glicynowego (koagonistycznego) — wspomaganie terapii ekspozycyjnej w PTSD/fobiach" },
      { drug: "Dekstrometorfan", note: "antagonista niekompetycyjny o niskim powinowactwie — składnik leków przeciwkaszlowych, także w terapii depresji (Auvelity)" }
    ],
    clinical: "Centralny mechanizm LTP/LTD, pamięci i plastyczności synaptycznej; nadmierna aktywacja → ekscytotoksyczność (udar, padaczka).",
    refs: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC3629906/"]
  },
  {
    id: "kainate", name: "Receptor kainianowy", genes: "GRIK1–5 (GluK1–GluK5)", class: "iono", family: "glu",
    conductance: "Na⁺, K⁺",
    localization: "Hipokamp (włókna kiciaste CA3), rdzeń kręgowy",
    structure: "Tetramer, wolniejsza kinetyka inaktywacji niż AMPA.",
    pathway: [
      "Związanie glutaminianu",
      "Wolno inaktywujący się prąd kationowy",
      "Postsynaptycznie: powolny komponent EPSP",
      "Presynaptycznie: dwukierunkowa autoregulacja wyrzutu Glu/GABA"
    ],
    crosstalk: "Presynaptyczne autoreceptory kainianowe modulują uwalnianie zarówno glutaminianu, jak i GABA — rzadka dwukierunkowa rola.",
    pharm: [
      { drug: "Kwas kainowy", note: "agonista — eksperymentalny model padaczki skroniowej" },
      { drug: "Kwas domoikowy", note: "silny agonista — neurotoksyna morska (zatrucie skorupiakami/rybami), ostra encefalopatia z amnezją" },
      { drug: "Topiramat", note: "jeden z mechanizmów przeciwpadaczkowych — częściowa blokada podjednostki GluK1" }
    ],
    clinical: "Model padaczki limbicznej (iniekcja dokomorowa kwasu kainowego).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=42"]
  },
  {
    id: "gabaa", name: "GABA_A", genes: "GABRA1-6, GABRB1-3, GABRG1-3 i in.", class: "iono", family: "gaba",
    conductance: "Cl⁻, HCO₃⁻",
    localization: "Powszechny w całym OUN — synaptycznie i pozasynaptycznie",
    structure: "Heteropentamer, klasycznie 2α₁2β₂1γ₂; podjednostki δ/α4/α6 lokalizują się pozasynaptycznie.",
    pathway: [
      "Związanie GABA na styku podjednostek α/β",
      "Otwarcie kanału Cl⁻",
      "Napływ Cl⁻ → hiperpolaryzacja lub hamowanie bocznikujące (shunting)",
      "Podjednostki δ/α4/α6 → toniczny prąd hamujący modulowany neurosteroidami"
    ],
    crosstalk: "Miejsce wiązania benzodiazepin wymaga obecności podjednostki γ2 obok α1/2/3/5. Receptory pozasynaptyczne wrażliwe na etanol i neurosteroidy.",
    pharm: [
      { drug: "Benzodiazepiny (diazepam)", note: "modulatory allosteryczne — miejsce α/γ" },
      { drug: "Barbiturany, propofol", note: "modulatory/agoniści — anestezja" },
      { drug: "Neurosteroidy (allopregnanolon)", note: "modulatory receptorów δ pozasynaptycznych" },
      { drug: "Etanol", note: "wzmacnia prąd GABA_A (zwłaszcza podjednostki δ pozasynaptyczne) — kluczowy mechanizm działania depresyjnego alkoholu" },
      { drug: "Flumazenil", note: "antagonista miejsca benzodiazepinowego — odwracanie przedawkowania BZD" }
    ],
    clinical: "Zaburzenie E/I (padaczka, lęk); podtyp GABA_A-ρ (dawniej GABA_C) w siatkówce.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=72"]
  },
  {
    id: "glyr", name: "Receptor glicynowy (GlyR)", genes: "GLRA1–4, GLRB", class: "iono", family: "gaba",
    conductance: "Cl⁻",
    localization: "Rdzeń kręgowy, pień mózgu, siatkówka",
    structure: "Pentamer α(1–4)/β, zakotwiczony w błonie przez gefirynę.",
    pathway: [
      "Związanie glicyny",
      "Otwarcie kanału Cl⁻",
      "Hiperpolaryzacja motoneuronu",
      "Hamowanie zwrotne przez komórki Renshawa"
    ],
    crosstalk: "Kotransmisja z GABA_A w niektórych synapsach rdzeniowych; gefiryna łączy oba receptory w błonie postsynaptycznej.",
    pharm: [
      { drug: "Strychnina", note: "antagonista konkurencyjny — zatrucie drgawkowe" },
      { drug: "Iwermektyna", note: "pozytywny modulator allosteryczny GlyR — częściowo odpowiada za działanie przeciwpasożytnicze i neurotoksyczność przy przedawkowaniu" }
    ],
    clinical: "Hamowanie motoneuronów somatycznych i modulacja nocycepcji w rogach tylnych rdzenia.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=73"]
  },
  {
    id: "nachr-a7", name: "nAChR α7", genes: "CHRNA7", class: "iono", family: "ach",
    conductance: "Na⁺, K⁺, Ca²⁺ (wysoka przepuszczalność Ca²⁺)",
    localization: "Hipokamp, kora, presynaptycznie na zakończeniach DA/Glu/5-HT",
    structure: "Homopentamer α7, szybka desensytyzacja.",
    pathway: ["Związanie ACh lub nikotyny", "Szybkie otwarcie kanału", "Napływ Ca²⁺", "Ułatwienie uwalniania neuroprzekaźników presynaptycznie"],
    crosstalk: "Presynaptyczna facylitacja wyrzutu dopaminy, glutaminianu i serotoniny.",
    pharm: [
      { drug: "Nikotyna", note: "agonista — uzależnienie" },
      { drug: "α-bungarotoksyna", note: "nieodwracalny antagonista — narzędzie badawcze do znakowania receptora" },
      { drug: "Enceniklina (badawczo)", note: "częściowy agonista α7 — próby kliniczne w schizofrenii (deficyty poznawcze), przerwane z powodu działań niepożądanych" }
    ],
    clinical: "Cel badań w schizofrenii (deficyt filtracji sensorycznej) i chorobie Alzheimera.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=76"]
  },
  {
    id: "nachr-a4b2", name: "nAChR α4β2", genes: "CHRNA4, CHRNB2", class: "iono", family: "ach",
    conductance: "Na⁺, K⁺, Ca²⁺",
    localization: "VTA, kora, wzgórze — wysokie powinowactwo do nikotyny",
    structure: "Heteropentamer (α4)₂(β2)₃ lub (α4)₃(β2)₂.",
    pathway: ["Związanie nikotyny/ACh", "Otwarcie kanału kationowego", "Depolaryzacja neuronów DA w VTA", "Wzmożone uwalnianie dopaminy w NAc"],
    crosstalk: "Kluczowy cel molekularny uzależnienia od nikotyny poprzez pętlę nagrody VTA–NAc.",
    pharm: [
      { drug: "Wareniklina", note: "częściowy agonista — terapia odwykowa nikotynizmu" },
      { drug: "Cytyzyna", note: "naturalny częściowy agonista — tańszy odpowiednik warenikliny w terapii odwykowej" }
    ],
    clinical: "Główny receptor odpowiedzialny za uzależnienie od tytoniu.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=76"]
  },
  {
    id: "5ht3", name: "5-HT₃", genes: "HTR3A–E", class: "iono", family: "ht",
    conductance: "Na⁺, K⁺, Ca²⁺",
    localization: "Area postrema (pień mózgu), interneurony korowe/hipokampalne GABA-ergiczne",
    structure: "Pentamer kationowy — jedyny jonotropowy receptor serotoninowy.",
    pathway: ["Związanie serotoniny", "Szybka depolaryzacja", "W area postrema: aktywacja ośrodka wymiotnego", "W korze: szybkie hamowanie sieciowe via interneurony GABA"],
    crosstalk: "Pośredniczy w odruchu wymiotnym niezależnie od GPCR-owych receptorów 5-HT.",
    pharm: [
      { drug: "Ondansetron, granisetron", note: "antagoniści — leki przeciwwymiotne (chemioterapia)" },
      { drug: "Alosetron", note: "antagonista — zespół jelita drażliwego z dominującą biegunką" }
    ],
    clinical: "Cel terapeutyczny w nudnościach pochemioterapeutycznych i zespole jelita drażliwego.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=68"]
  },
  {
    id: "p2x7", name: "P2X7", genes: "P2RX7", class: "iono", family: "pur",
    conductance: "Na⁺, K⁺, Ca²⁺ (przy przedłużonej aktywacji: makropor)",
    localization: "Mikroglej, astrocyty",
    structure: "Trimer bramkowany wysokim stężeniem zewnątrzkomórkowego ATP.",
    pathway: [
      "Wysokie stężenie ATP w przestrzeni zewnątrzkomórkowej (uszkodzenie/stres)",
      "Aktywacja trimeru P2X7",
      "Formowanie dużego poru błonowego, wypływ K⁺",
      "Aktywacja inflamasomu NLRP3",
      "Uwalnianie IL-1β → neurozapalenie"
    ],
    crosstalk: "Węzeł łączący sygnalizację purynergiczną z odpowiedzią immunologiczną OUN (neuroinflammacja, mikroglej reaktywny).",
    pharm: [
      { drug: "Antagoniści P2X7 (eksperymentalnie)", note: "badania nad depresją i chorobami neurozwyrodnieniowymi" },
      { drug: "JNJ-54175446 (badawczo)", note: "antagonista P2X7 — badania kliniczne w depresji lekoopornej" }
    ],
    clinical: "Aktywacja NLRP3/IL-1β — udział w neurodegeneracji i przewlekłym bólu.",
    refs: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC5424302/"]
  },
  {
    id: "p2x-other", name: "P2X1–P2X6", genes: "P2RX1–P2RX6", class: "iono", family: "pur",
    conductance: "Na⁺, K⁺, Ca²⁺",
    localization: "Neurony i glej w całym OUN, zakończenia presynaptyczne",
    structure: "Trimeryczne kanały kationowe bramkowane ATP.",
    pathway: ["Związanie ATP", "Szybkie otwarcie kanału", "Depolaryzacja / napływ Ca²⁺", "Modulacja pobudliwości i wyrzutu neuroprzekaźników"],
    crosstalk: "Kotransmisja purynergiczna równolegle do klasycznych układów Glu/GABA.",
    pharm: [{ drug: "Suramina", note: "nieswoisty antagonista receptorów P2 — klasyczne narzędzie badawcze" }],
    clinical: "Modulacja przewodnictwa bólowego (rogi tylne rdzenia).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=77"]
  },
  {
    id: "asic1a", name: "ASIC1a", genes: "ASIC1 (ACCN2)", class: "iono", family: "sensory",
    conductance: "Na⁺ (homomer ASIC1a przewodzi też niewielki Ca²⁺)",
    localization: "Ciało migdałowate, hipokamp, kora — neurony centralne i zwoje czuciowe",
    structure: "Trimer bramkowany zakwaszeniem środowiska zewnątrzkomórkowego (kanał protono-bramkowany, nadrodzina ENaC/DEG).",
    pathway: [
      "Spadek pH zewnątrzkomórkowego (niedokrwienie, intensywna aktywność neuronalna, lęk)",
      "Protonacja domeny zewnątrzkomórkowej otwiera kanał",
      "Napływ Na⁺ (i Ca²⁺ w homomerach ASIC1a) → depolaryzacja",
      "W ciele migdałowatym: wzmocnienie odpowiedzi lękowej i unikania"
    ],
    crosstalk: "Bezpośrednia interakcja z białkiem rusztowaniowym PICK1 stabilizuje kanał przy synapsie; nasila sygnalizację NMDA w warunkach kwasicy tkankowej.",
    pharm: [
      { drug: "Amilorid", note: "nieswoisty bloker kanałów Na⁺ (w tym ASIC) — narzędzie badawcze" },
      { drug: "PcTx1 (toksyna ptasznika)", note: "selektywny bloker ASIC1a — narzędzie badawcze neuroprotekcji po udarze" }
    ],
    clinical: "Udział w neuronalnym uszkodzeniu niedokrwiennym (kwasica tkanki mózgowej po udarze) oraz w obwodach lęku ciala migdałowatego.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=118"]
  },
  {
    id: "trpv1", name: "TRPV1 (waniloidowy)", genes: "TRPV1", class: "iono", family: "sensory",
    conductance: "Ca²⁺, Na⁺ (niewybiórczy kanał kationowy)",
    localization: "Zwoje czuciowe (rdzeniowe DRG, zwój trójdzielny), podwzgórze, istota szara okołowodociągowa",
    structure: "Homotetramer, polimodalny integrator bodźców (ciepło >43°C, kapsaicyna, niskie pH, lipidy).",
    pathway: [
      "Bodziec nocyceptywny (ciepło szkodliwe, kapsaicyna, kwasica tkankowa)",
      "Zmiana konformacyjna domeny porowej",
      "Napływ Ca²⁺/Na⁺ → depolaryzacja zakończenia czuciowego",
      "Uwolnienie substancji P i CGRP z zakończeń obwodowych — zapalenie neurogenne"
    ],
    crosstalk: "Sensybilizowany przez mediatory zapalne (bradykinina, NGF poprzez TrkA) via PKC/PKA — obniżenie progu aktywacji leży u podstaw hiperalgezji zapalnej.",
    pharm: [
      { drug: "Kapsaicyna", note: "agonista — miejscowe plastry/kremy przeciwbólowe (odczulanie po przejściowej aktywacji)" },
      { drug: "Resiniferatoksyna", note: "ultrapotentny agonista — badania nad przewlekłym bólem trzewnym i stawowym" }
    ],
    clinical: "Cel terapii miejscowej bólu neuropatycznego; udział w termoregulacji i nocycepcji trzewnej.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=78"]
  },

  // ---------------- GPCR — Gs/Golf ----------------
  {
    id: "d1d5", name: "D1, D5", genes: "DRD1, DRD5", class: "gs", family: "da",
    conductance: "Gαs (kora) / Gαolf (prążkowie)",
    localization: "Prążkowie (MSN drogi bezpośredniej), kora przedczołowa",
    structure: "GPCR 7TM, sprzężony z białkiem stymulującym cyklazę adenylanową.",
    pathway: ["Dopamina wiąże D1/D5", "Gαs/olf-GTP aktywuje cyklazę adenylanową", "↑cAMP → aktywacja PKA", "PKA fosforyluje DARPP-32 (Thr34) i CREB (Ser133)"],
    crosstalk: "W D1-MSN blokada PP1 przez ufosforylowane DARPP-32 utrwala wzmocnienie AMPA/NMDA — droga bezpośrednia, ułatwianie ruchu.",
    pharm: [
      { drug: "SKF-38393", note: "agonista D1 (badawczy)" },
      { drug: "Ecopipam", note: "antagonista D1" },
      { drug: "Fenoldopam", note: "agonista D1 — zastosowanie w stanach nagłego nadciśnienia, działa głównie obwodowo (słabo przenika BBB)" }
    ],
    clinical: "Kluczowy węzeł drogi bezpośredniej zwojów podstawy; cel badań w chorobie Parkinsona i schizofrenii.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=20"]
  },
  {
    id: "5ht4", name: "5-HT₄", genes: "HTR4", class: "gs", family: "ht",
    conductance: "Gαs",
    localization: "Hipokamp, prążkowie, przewód pokarmowy",
    structure: "GPCR 7TM.",
    pathway: ["Serotonina wiąże 5-HT4", "↑cAMP/PKA", "Modulacja uwalniania ACh i pobudliwości neuronalnej"],
    crosstalk: "Nasila neuroplastyczność i procesy pamięciowe w hipokampie.",
    pharm: [
      { drug: "Prukalopryd", note: "agonista — prokinetyk (poza OUN)" },
      { drug: "RS 67333 (badawczo)", note: "częściowy agonista — badania prokognitywne w modelach choroby Alzheimera" }
    ],
    clinical: "Cel badań prokognitywnych i przeciwdepresyjnych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=1"]
  },
  {
    id: "5ht6", name: "5-HT₆", genes: "HTR6", class: "gs", family: "ht",
    conductance: "Gαs",
    localization: "Prążkowie, kora, hipokamp",
    structure: "GPCR 7TM.",
    pathway: ["Serotonina wiąże 5-HT6", "↑cAMP/PKA", "Modulacja transmisji cholinergicznej i glutaminianergicznej"],
    crosstalk: "Interakcja funkcjonalna z układem cholinergicznym — cel prokognitywny.",
    pharm: [
      { drug: "Idalopirdyna (badawczo)", note: "antagonista — otępienie" },
      { drug: "SB-742457 (badawczo)", note: "antagonista — próby kliniczne w chorobie Alzheimera (wyniki niejednoznaczne)" }
    ],
    clinical: "Badany w chorobie Alzheimera jako cel prokognitywny.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=1"]
  },
  {
    id: "5ht7", name: "5-HT₇", genes: "HTR7", class: "gs", family: "ht",
    conductance: "Gαs",
    localization: "Jądro nadskrzyżowaniowe podwzgórza, wzgórze, hipokamp",
    structure: "GPCR 7TM.",
    pathway: ["Serotonina wiąże 5-HT7", "↑cAMP/PKA", "Regulacja rytmu okołodobowego i termoregulacji"],
    crosstalk: "Cel niektórych leków przeciwdepresyjnych i przeciwpsychotycznych (np. lurazydon) jako antagonista.",
    pharm: [
      { drug: "Lurazydon", note: "antagonista 5-HT7 (dodatkowy mechanizm)" },
      { drug: "SB-269970 (badawczo)", note: "selektywny antagonista — narzędzie badawcze nad rytmem dobowym i nastrojem" }
    ],
    clinical: "Rytm dobowy, nastrój, termoregulacja.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=1"]
  },
  {
    id: "beta-adr", name: "β1/β2/β3-adrenergiczne", genes: "ADRB1–3", class: "gs", family: "ne",
    conductance: "Gαs",
    localization: "Ciało migdałowate, hipokamp, kora",
    structure: "GPCR 7TM.",
    pathway: ["Noradrenalina/adrenalina wiąże receptor β", "↑cAMP/PKA", "Fosforylacja GluA1 i kanałów Cav1.2", "Konsolidacja śladów pamięci emocjonalnej"],
    crosstalk: "Kluczowe dla konsolidacji pamięci wywołanej stresem (interakcja z ciałem migdałowatym i hipokampem).",
    pharm: [
      { drug: "Propranolol", note: "antagonista — osłabia konsolidację pamięci emocjonalnej, PTSD (off-label)" },
      { drug: "Izoprenalina", note: "nieselektywny agonista β — narzędzie farmakologiczne (kardiologia)" }
    ],
    clinical: "Rola w reakcji stresowej i konsolidacji pamięci lękowej.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=4"]
  },
  {
    id: "a2a", name: "A2A (adenozynowy)", genes: "ADORA2A", class: "gs", family: "pur",
    conductance: "Gαs/Gαolf",
    localization: "Prążkowie — neurony drogi pośredniej (D2-MSN)",
    structure: "GPCR 7TM, tworzy funkcjonalne heterodimery z D2.",
    pathway: ["Adenozyna wiąże A2A", "↑cAMP/PKA", "Wzmocnienie drogi pośredniej (hamowanie ruchu)", "Antagonizm allosteryczny wobec D2 w heterodimerze"],
    crosstalk: "Kompleks A2A–D2: związanie adenozyny obniża powinowactwo dopaminy do D2 — molekularna podstawa działania kofeiny i istradefyliny.",
    pharm: [
      { drug: "Kofeina", note: "nieswoisty antagonista A1/A2A — pobudzenie" },
      { drug: "Istradefylina", note: "antagonista A2A — choroba Parkinsona" },
      { drug: "Tozadenant (badawczo)", note: "antagonista A2A — próby kliniczne w chorobie Parkinsona, przerwane z powodów bezpieczeństwa" }
    ],
    clinical: "Cel terapeutyczny wspomagający leczenie L-DOPA w chorobie Parkinsona.",
    refs: ["https://pmc.ncbi.nlm.nih.gov/articles/PMC7915359/"]
  },
  {
    id: "h2", name: "H2 (histaminowy)", genes: "HRH2", class: "gs", family: "hist",
    conductance: "Gαs",
    localization: "Kora, hipokamp",
    structure: "GPCR 7TM.",
    pathway: ["Histamina wiąże H2", "↑cAMP/PKA", "Wspomaganie czuwania i aktywacji korowej"],
    crosstalk: "Współdziała z H1 (Gq) w utrzymaniu stanu czuwania z jąder guzowo-suteczkowatych podwzgórza.",
    pharm: [
      { drug: "Famotydyna", note: "antagonista H2 (głównie obwodowo)" },
      { drug: "Ranitydyna (wycofana)", note: "dawny antagonista H2 — wycofany globalnie w 2020 r. z powodu zanieczyszczeń NDMA" }
    ],
    clinical: "Regulacja cyklu sen-czuwanie.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=33"]
  },
  {
    id: "taar1", name: "TAAR1 (aminy śladowe)", genes: "TAAR1", class: "gs", family: "taar",
    conductance: "Gαs (w niektórych układach również Gαq)",
    localization: "Śródmózgowie (VTA, istota czarna) — wewnątrzkomórkowo na zakończeniach dopaminergicznych",
    structure: "GPCR 7TM aktywowany przez aminy śladowe (tyramina, β-fenyloetyloamina) i pochodne amfetaminy; lokalizuje się głównie wewnątrzkomórkowo.",
    pathway: [
      "Aminy śladowe/amfetaminy przenikają do wnętrza neuronu i wiążą wewnątrzkomórkowy TAAR1",
      "↑cAMP/PKA",
      "Fosforylacja transportera DAT → częściowa internalizacja lub odwrócenie kierunku transportu",
      "Toniczne hamowanie aktywności neuronów dopaminergicznych (heterodimeryzacja z D2)"
    ],
    crosstalk: "Tworzy funkcjonalny heterodimer z D2 — aktywacja TAAR1 tonizuje nadmierną transmisję dopaminergiczną, co stanowi podstawę nowej klasy leków przeciwpsychotycznych działających bez bezpośredniej blokady D2.",
    pharm: [
      { drug: "Ulotaront", note: "agonista TAAR1/5-HT1A — lek przeciwpsychotyczny nowej generacji, bez klasycznej blokady D2" },
      { drug: "Amfetamina", note: "substrat/agonista pośredni — część działania uwalniającego dopaminę przebiega przez TAAR1" }
    ],
    clinical: "Cel terapeutyczny w schizofrenii jako alternatywa dla klasycznej blokady D2 — mniej objawów pozapiramidowych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=64"]
  },
  {
    id: "mc4r", name: "MC4R (melanokortynowy)", genes: "MC4R", class: "gs", family: "pep",
    conductance: "Gαs",
    localization: "Jądro przykomorowe i łukowate podwzgórza",
    structure: "GPCR 7TM aktywowany przez α-MSH (pochodną POMC), hamowany przez odwróconego agonistę AgRP.",
    pathway: [
      "α-MSH uwalniane z neuronów POMC wiąże MC4R",
      "↑cAMP/PKA",
      "Pobudzenie anoreksygennych neuronów PVN",
      "Zmniejszenie łaknienia i zwiększenie wydatku energetycznego"
    ],
    crosstalk: "Antagonizowany przez AgRP uwalniany z neuronów NPY/AgRP jądra łukowatego — dwa przeciwstawne obwody podwzgórzowe wspólnie wyznaczają bilans energetyczny.",
    pharm: [{ drug: "Setmelanotyd", note: "agonista — leczenie otyłości monogenowej (niedobór MC4R/POMC/LEPR)" }],
    clinical: "Mutacje MC4R — najczęstsza monogenowa przyczyna otyłości u ludzi.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=38"]
  },
  {
    id: "crhr1", name: "CRHR1 (kortykoliberynowy)", genes: "CRHR1", class: "gs", family: "pep",
    conductance: "Gαs",
    localization: "Przysadka (komórki kortykotropowe), ciało migdałowate, hipokamp, miejsce sinawe",
    structure: "GPCR 7TM klasy B (sekretynopodobny), wiąże kortykoliberynę (CRH).",
    pathway: [
      "Stres → podwzgórze uwalnia CRH do układu wrotnego przysadki",
      "CRH wiąże CRHR1 na komórkach kortykotropowych",
      "↑cAMP/PKA → uwolnienie ACTH",
      "Aktywacja osi podwzgórze-przysadka-nadnercza (HPA) → kortyzol"
    ],
    crosstalk: "Poza przysadką, CRHR1 w ciele migdałowatym i miejscu sinawym integruje behawioralną i autonomiczną odpowiedź na stres z odpowiedzią hormonalną osi HPA.",
    pharm: [{ drug: "Antagoniści CRHR1 (badawczo)", note: "próby kliniczne w depresji i lęku — dotąd bez sukcesu rejestracyjnego" }],
    clinical: "Centralny regulator osi HPA; przewlekła nadaktywność powiązana z depresją i PTSD.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=19"]
  },

  // ---------------- GPCR — Gi/o ----------------
  {
    id: "gabab", name: "GABA_B", genes: "GABBR1, GABBR2", class: "gi", family: "gaba",
    conductance: "Gαi/o (obligatoryjny heterodimer GABA_B1+GABA_B2)",
    localization: "Powszechny — presynaptycznie i postsynaptycznie (dendryty)",
    structure: "Obligatoryjny heterodimer: GABA_B1 wiąże ligand, GABA_B2 sprzęga z Gi.",
    pathway: ["GABA wiąże podjednostkę GABA_B1", "Aktywacja Gαi/o przez GABA_B2", "↓cAMP + uwolnienie Gβγ", "Otwarcie GIRK (powolny IPSP) lub blokada Cav2.1/2.2 presynaptycznie"],
    crosstalk: "Presynaptyczny hamulec uwalniania glutaminianu — długotrwałe, powolne hamowanie w przeciwieństwie do szybkiego GABA_A.",
    pharm: [
      { drug: "Baklofen", note: "agonista — spastyczność" },
      { drug: "Fenibut", note: "agonista GABA_B (i słaby GABA_A) — stosowany jako lek anksjolityczny/nootropowy w niektórych krajach, wysokie ryzyko uzależnienia i odstawienia" }
    ],
    clinical: "Powolny IPSP dendrytyczny; cel w spastyczności i badaniach nad uzależnieniami.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=26"]
  },
  {
    id: "d2d3d4", name: "D2, D3, D4", genes: "DRD2 (D2S/D2L), DRD3, DRD4", class: "gi", family: "da",
    conductance: "Gαi/o, Gβγ",
    localization: "Prążkowie (droga pośrednia), VTA, istota czarna (autoreceptory)",
    structure: "D2S (krótka) — autoreceptor presynaptyczny; D2L (długa) — postsynaptyczna.",
    pathway: ["Dopamina wiąże D2", "↓cAMP, Gβγ uwolniony", "Otwarcie GIRK → hiperpolaryzacja", "Blokada Cav2.1/2.2 → zahamowanie wyrzutu DA (autoreceptor)"],
    crosstalk: "Heterodimer A2A–D2 w prążkowiu oraz D1–D2 w jądrze półleżącym (sprzężenie z Gq zamiast Gs/Gi).",
    pharm: [
      { drug: "Haloperidol, klozapina", note: "antagoniści — leki przeciwpsychotyczne" },
      { drug: "Pramipeksol", note: "agonista — choroba Parkinsona" },
      { drug: "Arypiprazol", note: "częściowy agonista D2 — 'stabilizator dopaminergiczny', lek przeciwpsychotyczny III generacji" }
    ],
    clinical: "Główny cel klasycznych i atypowych leków przeciwpsychotycznych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=20"]
  },
  {
    id: "5ht1", name: "5-HT₁A/1B/1D", genes: "HTR1A, HTR1B, HTR1D", class: "gi", family: "ht",
    conductance: "Gαi/o, Gβγ",
    localization: "5-HT1A: jądra szwu (autoreceptor somatodendrytyczny) i hipokamp; 5-HT1B/1D: zakończenia aksonalne",
    structure: "GPCR 7TM.",
    pathway: ["Serotonina wiąże 5-HT1", "↓cAMP, otwarcie GIRK", "5-HT1A: wygaszenie wyładowań neuronu serotoninergicznego", "5-HT1B/1D: hamowanie wyrzutu na terminalu aksonu"],
    crosstalk: "Ujemne sprzężenie zwrotne kontrolujące własną syntezę i uwalnianie serotoniny w całym mózgu.",
    pharm: [
      { drug: "Buspiron", note: "częściowy agonista 5-HT1A — anksjolityk" },
      { drug: "Sumatryptan", note: "agonista 5-HT1B/1D — migrena" },
      { drug: "Ergotamina", note: "częściowy agonista 5-HT1B/1D i receptorów α-adrenergicznych — migrena" }
    ],
    clinical: "5-HT1A postsynaptyczny w hipokampie ma działanie anksjolityczne.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=1"]
  },
  {
    id: "mor-dor-kor", name: "MOR (μ), DOR (δ), KOR (κ)", genes: "OPRM1, OPRD1, OPRK1", class: "gi", family: "opioid",
    conductance: "Gαi/o, Gβγ",
    localization: "Rogi tylne rdzenia, istota szara okołowodociągowa (PAG), VTA",
    structure: "GPCR 7TM, rodzina opioidowa.",
    pathway: ["Opioid wiąże MOR/DOR/KOR", "↓cAMP, otwarcie GIRK, blokada Cav", "Hiperpolaryzacja neuronów bólowych i interneuronów hamujących w VTA", "Odhamowanie neuronów dopaminergicznych VTA (µ) → euforia"],
    crosstalk: "MOR w VTA hamuje interneurony GABA-ergiczne → odhamowanie (disinhibition) neuronów dopaminergicznych — mechanizm nagrody.",
    pharm: [
      { drug: "Morfina, fentanyl, buprenorfina", note: "agoniści MOR — analgezja" },
      { drug: "Nalokson", note: "antagonista — odwracanie przedawkowania" },
      { drug: "Metadon", note: "pełny agonista MOR o długim okresie półtrwania — terapia substytucyjna uzależnień" },
      { drug: "Naltrekson", note: "antagonista długo działający — terapia uzależnień od opioidów i alkoholu" }
    ],
    clinical: "Kluczowy szlak analgezji i uzależnienia od opioidów.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=50"]
  },
  {
    id: "cb1", name: "CB1 (kannabinoidowy)", genes: "CNR1", class: "gi", family: "cb",
    conductance: "Gαi/o, Gβγ",
    localization: "Kora, hipokamp, móżdżek, zwoje podstawy — presynaptycznie",
    structure: "Najliczniejszy GPCR w mózgu ssaków.",
    pathway: ["2-AG/anandamid wiąże presynaptyczny CB1", "Aktywacja Gαi/o", "Gβγ blokuje Cav2.1/2.2", "Zahamowanie egzocytozy neuroprzekaźnika (DSI/DSE)"],
    crosstalk: "Retrogradny hamulec uwalniania zarówno GABA (DSI), jak i glutaminianu (DSE) — patrz szlak endokannabinoidowy.",
    pharm: [
      { drug: "THC", note: "częściowy agonista — psychoaktywny składnik konopi" },
      { drug: "Rimonabant", note: "odwrócony agonista (wycofany — działania psychiatryczne)" },
      { drug: "Kannabidiol (CBD)", note: "słaby ujemny modulator allosteryczny — niepsychoaktywny składnik konopi, złożony mechanizm" }
    ],
    clinical: "Retrogradna neuromodulacja synaptyczna; cel badań nad bólem, padaczką, lękiem.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=13"]
  },
  {
    id: "mglur23", name: "mGluR2/3 (grupa II)", genes: "GRM2, GRM3", class: "gi", family: "glu",
    conductance: "Gαi/o",
    localization: "Presynaptycznie na zakończeniach glutaminianergicznych",
    structure: "GPCR 7TM, dimeryczne (obligatoryjne homodimery).",
    pathway: ["Wysokie stężenie glutaminianu w szczelinie", "Aktywacja presynaptycznego mGluR2/3", "↓cAMP, Gβγ blokuje Cav", "Zmniejszenie dalszego wyrzutu Glu (autoreceptor bezpiecznikowy)"],
    crosstalk: "Tworzy heterokompleks z 5-HT2A w korze — aktywacja mGluR2 wygasza efekty halucynogenne agonistów 5-HT2A (cel leków przeciwpsychotycznych nowej generacji).",
    pharm: [
      { drug: "Agoniści mGluR2/3 (badawczo)", note: "potencjalne leki przeciwpsychotyczne/przeciwlękowe" },
      { drug: "Pomaglumetad (badawczo)", note: "prolek agonisty mGluR2/3 — nie osiągnął istotności w badaniach III fazy w schizofrenii" }
    ],
    clinical: "Neuroprotekcja przed ekscytotoksycznością glutaminianową.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=40"]
  },
  {
    id: "mglur478", name: "mGluR4/7/8 (grupa III)", genes: "GRM4, GRM7, GRM8", class: "gi", family: "glu",
    conductance: "Gαi/o",
    localization: "Strefy aktywne synaps presynaptycznych w całym OUN",
    structure: "GPCR 7TM, autoreceptory presynaptyczne o niskim powinowactwie.",
    pathway: ["Bardzo wysokie [Glu] w synapsie", "Aktywacja mGluR4/7/8", "↓cAMP, hamowanie Cav", "Silne ograniczenie wyrzutu neuroprzekaźnika"],
    crosstalk: "Działa jako bezpiecznik przy ekstremalnym wyrzucie glutaminianu — próg aktywacji wyższy niż mGluR2/3.",
    pharm: [{ drug: "Pozytywne modulatory allosteryczne mGluR4 (badawczo)", note: "badania w chorobie Parkinsona — potencjalne działanie objawowe i neuroprotekcyjne" }],
    clinical: "Cel badań w padaczce i chorobie Parkinsona (mGluR4).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=40"]
  },
  {
    id: "alpha2", name: "α2A/2B/2C-adrenergiczne", genes: "ADRA2A–C", class: "gi", family: "ne",
    conductance: "Gαi/o, Gβγ",
    localization: "Locus coeruleus (autoreceptor), grzbietowo-boczna kora przedczołowa",
    structure: "GPCR 7TM.",
    pathway: ["Noradrenalina wiąże α2", "↓cAMP, Gβγ", "W PFC: zamknięcie kanałów HCN", "Wzmocnienie siły sygnału synaptycznego i skupienia uwagi"],
    crosstalk: "Jako autoreceptor w locus coeruleus hamuje dalsze uwalnianie noradrenaliny (ujemne sprzężenie zwrotne).",
    pharm: [
      { drug: "Guanfacyna", note: "agonista α2A — ADHD" },
      { drug: "Klonidyna, deksmedetomidyna", note: "agoniści — nadciśnienie, sedacja" },
      { drug: "Tizanidyna", note: "agonista α2 — lek zwiotczający mięśnie szkieletowe (spastyczność)" }
    ],
    clinical: "Cel terapeutyczny w ADHD (poprawa funkcji wykonawczych PFC).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=4"]
  },
  {
    id: "a1-adenosine", name: "A1 (adenozynowy)", genes: "ADORA1", class: "gi", family: "pur",
    conductance: "Gαi",
    localization: "Powszechny w OUN (kora, hipokamp)",
    structure: "GPCR 7TM.",
    pathway: ["Adenozyna wiąże A1", "↓cAMP, otwarcie GIRK", "Hiperpolaryzacja i zmniejszenie pobudliwości", "Presynaptyczne ograniczenie wyrzutu Glu"],
    crosstalk: "Homeostatyczna presja senna — narastające stężenie adenozyny w czasie czuwania.",
    pharm: [
      { drug: "Kofeina", note: "antagonista nadrzędny A1/A2A — działanie pobudzające" },
      { drug: "Teofilina", note: "nieswoisty antagonista receptorów adenozynowych — bronchodylatator, pobudza również OUN" }
    ],
    clinical: "Neuroprotekcja w niedotlenieniu/niedokrwieniu; regulacja snu.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=3"]
  },
  {
    id: "m2m4", name: "M2, M4 (muskarynowe)", genes: "CHRM2, CHRM4", class: "gi", family: "ach",
    conductance: "Gαi/o, Gβγ",
    localization: "Przodomózgowie (M2), prążkowie (M4)",
    structure: "GPCR 7TM.",
    pathway: ["ACh wiąże M2/M4", "↓cAMP, otwarcie GIRK", "Autoreceptorowe hamowanie uwalniania ACh", "M4: hamowanie neuronów cholinergicznych prążkowia, modulacja DA"],
    crosstalk: "M4 w prążkowiu moduluje uwalnianie dopaminy poprzez interneurony cholinergiczne.",
    pharm: [
      { drug: "Ksanomelina (z trospium, KarXT/Cobenfy)", note: "agonista M1/M4 — nowa generacja leków przeciwpsychotycznych" },
      { drug: "Atropina", note: "nieswoisty antagonista muskarynowy — odwracanie bradykardii, zatrucie fosforoorganiczne" }
    ],
    clinical: "Cel leku Cobenfy (ksanomelina-trospium) w schizofrenii — pierwszy niedopaminergiczny mechanizm od dekad.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=2"]
  },
  {
    id: "cb2", name: "CB2 (kannabinoidowy)", genes: "CNR2", class: "gi", family: "cb",
    conductance: "Gαi/o",
    localization: "Mikroglej i inne komórki odpornościowe OUN — ekspresja neuronalna minimalna w stanie spoczynku, nasilona w zapaleniu",
    structure: "GPCR 7TM, homolog CB1 o odmiennej dystrybucji tkankowej.",
    pathway: [
      "2-AG/endokannabinoidy wiążą CB2 na mikrogleju",
      "↓cAMP, uwolnienie Gβγ",
      "Zahamowanie uwalniania cytokin prozapalnych (TNF-α, IL-6)",
      "Modulacja migracji i fagocytozy mikrogleju"
    ],
    crosstalk: "Działa równolegle do CB1, ale skupia się na neuroimmunomodulacji, a nie na presynaptycznym hamowaniu klasycznych neuroprzekaźników.",
    pharm: [{ drug: "Selektywni agoniści CB2 (badawczo)", note: "potencjalne działanie przeciwzapalne bez efektów psychoaktywnych związanych z CB1" }],
    clinical: "Cel badań nad neurozapaleniem w stwardnieniu rozsianym i chorobach neurodegeneracyjnych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=13"]
  },
  {
    id: "mt1mt2", name: "MT1, MT2 (melatoninowe)", genes: "MTNR1A, MTNR1B", class: "gi", family: "mel",
    conductance: "Gαi/o",
    localization: "Jądro nadskrzyżowaniowe podwzgórza (SCN) — główny zegar biologiczny",
    structure: "GPCR 7TM.",
    pathway: [
      "Melatonina (wydzielana przez szyszynkę w ciemności) wiąże MT1/MT2 w SCN",
      "↓cAMP (głównie MT1) — hamowanie neuronalnej aktywności SCN",
      "MT2 dodatkowo przesuwa fazę rytmu okołodobowego",
      "Synchronizacja rytmu sen-czuwanie z cyklem światło-ciemność"
    ],
    crosstalk: "MT1 hamuje wyładowania neuronów SCN promujących czuwanie; MT2 moduluje fazę zegara — komplementarne działanie chronobiotyczne.",
    pharm: [
      { drug: "Melatonina", note: "agonista endogenny — suplement na zaburzenia rytmu dobowego" },
      { drug: "Ramelteon", note: "selektywny agonista MT1/MT2 — lek nasenny bez potencjału uzależniającego benzodiazepin" }
    ],
    clinical: "Terapia zaburzeń rytmu okołodobowego (jet lag, praca zmianowa, bezsenność).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=39"]
  },
  {
    id: "npy-y", name: "Y1, Y2, Y5 (neuropeptyd Y)", genes: "NPY1R, NPY2R, NPY5R", class: "gi", family: "pep",
    conductance: "Gαi/o",
    localization: "Jądro łukowate podwzgórza, hipokamp, ciało migdałowate",
    structure: "GPCR 7TM aktywowany przez neuropeptyd Y (NPY), współwydzielany z AgRP.",
    pathway: [
      "NPY uwalniany z neuronów jądra łukowatego wiąże Y1/Y5 postsynaptycznie",
      "↓cAMP, Gβγ → otwarcie GIRK",
      "Silne pobudzenie łaknienia (działanie orexigenne)",
      "Y2 presynaptycznie — autoreceptor hamujący dalsze uwalnianie NPY"
    ],
    crosstalk: "Działa antagonistycznie do układu melanokortynowego (POMC/MC4R) w regulacji bilansu energetycznego; w ciele migdałowatym NPY wykazuje działanie anksjolityczne.",
    pharm: [{ drug: "Antagoniści Y5 (badawczo)", note: "próby kliniczne w leczeniu otyłości — ograniczona skuteczność" }],
    clinical: "Najsilniejszy endogenny stymulator łaknienia w OUN; badany w PTSD ze względu na działanie anksjolityczne.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=46"]
  },
  {
    id: "sst", name: "SST2, SST5 (somatostatynowe)", genes: "SSTR2, SSTR5", class: "gi", family: "pep",
    conductance: "Gαi/o",
    localization: "Kora, hipokamp — głównie interneurony hamujące SST+",
    structure: "GPCR 7TM.",
    pathway: [
      "Somatostatyna uwalniana z interneuronów SST+ wiąże receptory na sąsiednich neuronach",
      "↓cAMP, otwarcie GIRK",
      "Hamowanie postsynaptyczne dystalnych dendrytów (komplementarne do PV+/GABA_A perisomatycznego)",
      "Autoregulacja uwalniania hormonu wzrostu w osi podwzgórze-przysadka"
    ],
    crosstalk: "Interneurony SST+ (typu Martinotti) celują w dystalne dendryty neuronów piramidowych — warstwa hamowania komplementarna do perisomatycznego hamowania PV+ (patrz szlak równowagi E/I).",
    pharm: [{ drug: "Oktreotyd", note: "analog somatostatyny — zastosowanie głównie endokrynologiczne (obwodowo)" }],
    clinical: "Utrata interneuronów SST+ powiązana ze schizofrenią i depresją lekooporną.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=61"]
  },
  {
    id: "p2y12", name: "P2Y12", genes: "P2RY12", class: "gi", family: "pur",
    conductance: "Gαi/o",
    localization: "Mikroglej w stanie spoczynkowym (rozgałęziony fenotyp); płytki krwi obwodowo",
    structure: "GPCR 7TM aktywowany przez ADP.",
    pathway: [
      "ADP uwolniony z uszkodzonych neuronów/astrocytów wiąże P2Y12 na mikrogleju",
      "↓cAMP",
      "Chemotaksja mikrogleju w kierunku źródła ADP",
      "Wysunięcie wypustek mikrogleju i otoczenie miejsca uszkodzenia w ciągu minut"
    ],
    crosstalk: "Kluczowy sensor uszkodzenia tkanki nerwowej dla mikrogleju — szybka odpowiedź 'sensingu' niezależna od klasycznej neurotransmisji.",
    pharm: [{ drug: "Klopidogrel, tikagrelor", note: "antagoniści P2Y12 — leki przeciwpłytkowe (działanie głównie obwodowe)" }],
    clinical: "Utrata sygnalizacji P2Y12 osłabia odpowiedź mikrogleju na uszkodzenie OUN (np. udar).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=52"]
  },

  // ---------------- GPCR — Gq/11 ----------------
  {
    id: "mglur15", name: "mGluR1, mGluR5 (grupa I)", genes: "GRM1, GRM5", class: "gq", family: "glu",
    conductance: "Gαq/11",
    localization: "Móżdżek (mGluR1), hipokamp/kora/prążkowie (mGluR5) — postsynaptycznie",
    structure: "GPCR 7TM, dimeryczne, sprzężone z PLCβ.",
    pathway: ["Glutaminian wiąże mGluR1/5", "Aktywacja PLCβ", "Hydroliza PIP2 → IP3 + DAG", "IP3: uwolnienie Ca²⁺ z ER; DAG: aktywacja PKC i synteza 2-AG"],
    crosstalk: "Silna depolaryzacja postsynaptyczna + aktywacja mGluR1/5 → produkcja 2-AG → retrogradne hamowanie CB1 (DSE).",
    pharm: [
      { drug: "Antagoniści mGluR5 (badawczo)", note: "zespół łamliwego chromosomu X, lęk" },
      { drug: "Basimglurant (badawczo)", note: "ujemny modulator allosteryczny mGluR5 — badania w depresji i zespole łamliwego chromosomu X" }
    ],
    clinical: "Nadaktywność mGluR5 powiązana z zespołem łamliwego chromosomu X.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=40"]
  },
  {
    id: "5ht2ac", name: "5-HT₂A, 5-HT₂C", genes: "HTR2A, HTR2C", class: "gq", family: "ht",
    conductance: "Gαq/11",
    localization: "Warstwa V kory nowej, płytki krwi (2A); splot naczyniówkowy (2C)",
    structure: "GPCR 7TM; 5-HT2A tworzy heterokompleks z mGluR2 w korze.",
    pathway: ["Serotonina/agonista wiąże 5-HT2A", "↑PLCβ → IP3/DAG", "↑Ca²⁺, aktywacja PKC", "Wyrzut glutaminianu w korze"],
    crosstalk: "Kompleks 5-HT2A–mGluR2: agoniści psychodeliczni (LSD, psylocyna) zmieniają konformację heterotrimeru, sygnalizując przez Gαi zamiast klasycznego Gq — mechanizm działań halucynogennych.",
    pharm: [
      { drug: "LSD, psylocyna", note: "agoniści — działanie psychodeliczne" },
      { drug: "Olanzapina, klozapina", note: "antagoniści — leki przeciwpsychotyczne" },
      { drug: "Ketanseryna", note: "selektywny antagonista 5-HT2A — narzędzie badawcze, dawny lek hipotensyjny" }
    ],
    clinical: "Cel neurobiologii psychodelików i atypowych leków przeciwpsychotycznych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=1"]
  },
  {
    id: "m1m3m5", name: "M1, M3, M5 (muskarynowe)", genes: "CHRM1, CHRM3, CHRM5", class: "gq", family: "ach",
    conductance: "Gαq/11",
    localization: "Hipokamp, kora mózgowa",
    structure: "GPCR 7TM.",
    pathway: ["ACh wiąże M1/M3/M5", "↑PLCβ → IP3/DAG", "Zamknięcie kanałów potasowych typu M (Kv7/KCNQ)", "Zniesienie prądu hamującego → zwiększona pobudliwość"],
    crosstalk: "Kluczowy mechanizm modulacji uwagi i pamięci — hipoteza cholinergiczna choroby Alzheimera.",
    pharm: [
      { drug: "Ksanomelina (Cobenfy — z trospium)", note: "agonista M1/M4 — schizofrenia" },
      { drug: "Skopolamina", note: "antagonista — majaczenie polekowe" },
      { drug: "Pilokarpina", note: "nieswoisty agonista — model padaczki skroniowej (dokomorowo) oraz leczenie jaskry i kserostomii" }
    ],
    clinical: "Cel terapeutyczny w schizofrenii i badaniach nad otępieniem.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=2"]
  },
  {
    id: "alpha1", name: "α1-adrenergiczne", genes: "ADRA1A, ADRA1B, ADRA1D", class: "gq", family: "ne",
    conductance: "Gαq/11",
    localization: "Kora, formacja siatkowata pnia mózgu",
    structure: "GPCR 7TM.",
    pathway: ["Noradrenalina wiąże α1", "↑PLCβ → IP3/DAG", "Uwolnienie Ca²⁺, aktywacja PKC", "Zwiększenie czujności i pobudliwości korowej"],
    crosstalk: "Współdziała z receptorami β w regulacji stanu czuwania i reakcji stresowej (odwrócona krzywa U-kształtna zależności dawka-efekt na funkcje poznawcze).",
    pharm: [
      { drug: "Prazosyna", note: "antagonista — koszmary senne w PTSD" },
      { drug: "Fenylefryna", note: "agonista α1 — obwodowo jako dekongestant i lek presyjny" }
    ],
    clinical: "Nadmierna aktywacja α1 w PFC upośledza funkcje wykonawcze (stres).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=4"]
  },
  {
    id: "h1", name: "H1 (histaminowy)", genes: "HRH1", class: "gq", family: "hist",
    conductance: "Gαq/11",
    localization: "Kora, podwzgórze (jądro guzowo-suteczkowate)",
    structure: "GPCR 7TM.",
    pathway: ["Histamina wiąże H1", "↑PLCβ → IP3/DAG", "Depolaryzacja i aktywacja korowa", "Podtrzymanie stanu czuwania"],
    crosstalk: "Blokada H1 przez leki przeciwhistaminowe I generacji → sedacja (przenikanie przez BBB).",
    pharm: [
      { drug: "Difenhydramina", note: "antagonista I generacji — działanie nasenne" },
      { drug: "Doksepina (małe dawki)", note: "silny antagonista H1 — zarejestrowana jako lek nasenny w bezsenności" }
    ],
    clinical: "Główny mechanizm sedacji poantyhistaminowej.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=33"]
  },
  {
    id: "oxtr", name: "OXTR (oksytocynowy)", genes: "OXTR", class: "gq", family: "pep",
    conductance: "Gαq/11",
    localization: "Jądro przykomorowe, ciało migdałowate, jądro półleżące",
    structure: "GPCR 7TM.",
    pathway: ["Oksytocyna wiąże OXTR", "↑PLCβ → IP3/DAG → Ca²⁺", "Modulacja obwodów społecznych ciała migdałowatego"],
    crosstalk: "Interakcje z układem dopaminergicznym jądra półleżącego w zachowaniach przywiązania.",
    pharm: [
      { drug: "Oksytocyna donosowa", note: "badania nad zaburzeniami społecznymi (autyzm) — efekty niejednoznaczne w dużych próbach klinicznych" },
      { drug: "Atosyban", note: "antagonista OXTR — tokolityk hamujący poród przedwczesny (zastosowanie położnicze)" }
    ],
    clinical: "Badania nad zaburzeniami ze spektrum autyzmu i więzią społeczną.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=66"]
  },
  {
    id: "avpr1a", name: "V1a (wazopresynowy)", genes: "AVPR1A", class: "gq", family: "pep",
    conductance: "Gαq/11",
    localization: "Ciało migdałowate, boczne jądro przegrody, podwzgórze",
    structure: "GPCR 7TM, homologiczny do OXTR (wspólne pochodzenie ewolucyjne).",
    pathway: [
      "Wazopresyna (AVP) uwalniana centralnie wiąże V1a",
      "↑PLCβ → IP3/DAG → Ca²⁺",
      "Modulacja obwodów agresji, terytorializmu i więzi społecznej (zależnie od gatunku i płci)"
    ],
    crosstalk: "Działa często antagonistycznie do OXTR w modulacji zachowań społecznych — równowaga OXTR/V1a różni się między płciami.",
    pharm: [{ drug: "Balowaptan (badawczo)", note: "antagonista V1a — próby kliniczne w zaburzeniach ze spektrum autyzmu" }],
    clinical: "Badany w kontekście zaburzeń społecznych (autyzm) oraz zaburzeń lękowych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=66"]
  },
  {
    id: "ntsr1", name: "NTSR1 (neurotensynowy)", genes: "NTSR1", class: "gq", family: "pep",
    conductance: "Gαq/11 (sprzęga się także z Gi w niektórych tkankach)",
    localization: "VTA, istota czarna, jądro półleżące",
    structure: "GPCR 7TM.",
    pathway: [
      "Neurotensyna współuwalniana z dopaminą w VTA wiąże NTSR1",
      "↑PLCβ → IP3/DAG",
      "Depolaryzacja neuronów dopaminergicznych VTA",
      "Nasilenie uwalniania dopaminy w jądrze półleżącym"
    ],
    crosstalk: "Funkcjonalny antagonista receptorów D2 na poziomie sieci — neurotensyna 'odczula' autoreceptory D2, nasilając transmisję dopaminergiczną.",
    pharm: [{ drug: "Agoniści NTSR1 (badawczo)", note: "potencjalne działanie przeciwpsychotyczne poprzez modulację DA bez bezpośredniej blokady D2" }],
    clinical: "Cel badań w schizofrenii jako alternatywna droga modulacji układu dopaminergicznego.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=47"]
  },
  {
    id: "cck", name: "CCK1, CCK2 (cholecystokininowe)", genes: "CCKAR, CCKBR", class: "gq", family: "pep",
    conductance: "Gαq/11",
    localization: "CCK2 (dominujący w OUN): kora, hipokamp, ciało migdałowate; CCK1: pień mózgu, jądro pasma samotnego",
    structure: "GPCR 7TM.",
    pathway: [
      "Cholecystokinina (częsty kotransmiter z dopaminą/GABA) wiąże CCK2",
      "↑PLCβ → IP3/DAG → Ca²⁺",
      "Nasilenie pobudliwości korowej i limbicznej",
      "CCK1 w pniu mózgu: udział w regulacji sytości"
    ],
    crosstalk: "CCK jest częstym kotransmiterem uwalnianym razem z dopaminą w zakończeniach mezolimbicznych — moduluje odpowiedź lękową i napady paniki.",
    pharm: [{ drug: "Pentagastryna / CCK-4", note: "agoniści CCK2 — wykorzystywani do prowokacji napadów paniki w modelach badawczych" }],
    clinical: "CCK2 powiązany z patofizjologią napadów paniki i zaburzeń lękowych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=15"]
  },
  {
    id: "p2y1", name: "P2Y1", genes: "P2RY1", class: "gq", family: "pur",
    conductance: "Gαq/11",
    localization: "Neurony i astrocyty w całym OUN",
    structure: "GPCR 7TM aktywowany przez ADP.",
    pathway: [
      "ADP uwalniane z pęcherzyków/uszkodzonych komórek wiąże P2Y1",
      "↑PLCβ → IP3/DAG",
      "Fale wapniowe w sieciach astrocytarnych (komunikacja glejowa)",
      "Modulacja pobudliwości neuronalnej za pośrednictwem gliotransmisji"
    ],
    crosstalk: "Kluczowy dla propagacji fal Ca²⁺ między astrocytami — łącznik sygnalizacji purynergicznej z komunikacją glejową.",
    pharm: [{ drug: "MRS 2179 (badawczo)", note: "selektywny antagonista P2Y1 — narzędzie badawcze fal wapniowych astrocytów" }],
    clinical: "Udział w falach wapniowych astrocytów i neurozapaleniu potourazowym.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=52"]
  },
  {
    id: "oxr", name: "OX1R, OX2R (oreksynowe)", genes: "HCRTR1, HCRTR2", class: "gq", family: "pep",
    conductance: "Gαq/11",
    localization: "Podwzgórze boczne (neurony źródłowe), miejsce sinawe, jądra szwu",
    structure: "GPCR 7TM.",
    pathway: ["Oreksyna/hipokretyna wiąże OX1R/OX2R", "↑PLCβ → IP3/DAG", "Pobudzenie neuronów monoaminergicznych", "Stabilizacja stanu czuwania"],
    crosstalk: "Utrata neuronów oreksynowych → narkolepsja (dysregulacja przejść sen-czuwanie).",
    pharm: [
      { drug: "Suworeksant, lemboreksant", note: "antagoniści dwureceptorowi — leki nasenne" },
      { drug: "Danaworekston (badawczo)", note: "selektywny agonista OX2R — badania nad narkolepsją" }
    ],
    clinical: "Narkolepsja typu 1 (deficyt oreksyny); cel leków nasennych nowej generacji.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=51"]
  },

  // ---------------- RTK / Neurotrofiny ----------------
  {
    id: "trkb", name: "TrkB", genes: "NTRK2", class: "rtk", family: "trk",
    conductance: "Brak kanału — autofosforylacja kinazy tyrozynowej",
    localization: "Kora, hipokamp, neurony cholinergiczne przodomózgowia",
    structure: "Receptor jednoprzejściowy z wewnętrzną domeną kinazową.",
    pathway: [
      "BDNF/NT-4 wiąże i dimeryzuje TrkB",
      "Autofosforylacja reszt tyrozynowych (Tyr515, Tyr816 i in.)",
      "Tyr515 → Shc/Grb2 → Ras-Raf-MEK1/2-ERK1/2 → CREB → ekspresja Arc/c-Fos",
      "Tyr816 → PLCγ1 → IP3/DAG → wzmocnienie funkcji NMDA",
      "PI3K-Akt → inaktywacja GSK-3β/Bad (przeżycie) i aktywacja mTORC1 (translacja lokalna w dendrycie)"
    ],
    crosstalk: "Węzeł integrujący plastyczność strukturalną (LTP), przeżycie neuronu i lokalną syntezę białek dendrytycznych.",
    pharm: [
      { drug: "Leki przeciwdepresyjne (SSRI i in.)", note: "zwiększają ekspresję BDNF/sygnalizację TrkB w terapii przewlekłej" },
      { drug: "7,8-dihydroksyflawon (badawczo)", note: "mały agonista TrkB przenikający barierę krew-mózg — narzędzie badawcze neuroplastyczności" }
    ],
    clinical: "Kluczowy dla neuroplastyczności; obniżona sygnalizacja BDNF-TrkB powiązana z depresją.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=326"]
  },
  {
    id: "trka", name: "TrkA", genes: "NTRK1", class: "rtk", family: "trk",
    conductance: "Brak kanału — autofosforylacja",
    localization: "Neurony cholinergiczne przodomózgowia podstawnego, zwoje czuciowe",
    structure: "Receptor NGF o wysokim powinowactwie.",
    pathway: ["NGF wiąże i dimeryzuje TrkA", "Autofosforylacja", "Ras-MAPK i PI3K-Akt", "Przeżycie i różnicowanie neuronów cholinergicznych"],
    crosstalk: "Transport retrogradny kompleksu NGF-TrkA z zakończeń aksonalnych do ciała komórki.",
    pharm: [{ drug: "Tanezumab", note: "przeciwciało monoklonalne anty-NGF — blokuje sygnalizację NGF/TrkA w przewlekłym bólu (głównie obwodowo, np. w chorobie zwyrodnieniowej stawów)" }],
    clinical: "Zwyrodnienie neuronów cholinergicznych podstawy przodomózgowia w chorobie Alzheimera wiąże się z deficytem sygnalizacji NGF/TrkA.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=326"]
  },
  {
    id: "trkc", name: "TrkC", genes: "NTRK3", class: "rtk", family: "trk",
    conductance: "Brak kanału — autofosforylacja",
    localization: "Móżdżek, hipokamp",
    structure: "Receptor neurotrofiny-3 (NT-3).",
    pathway: ["NT-3 wiąże i dimeryzuje TrkC", "Autofosforylacja", "Ras-MAPK, PI3K-Akt, PLCγ", "Rozwój i przeżycie neuronów, synaptogeneza móżdżkowa"],
    crosstalk: "Istotny dla rozwoju obwodów proprioceptywnych i móżdżkowych.",
    pharm: [{ drug: "Rekombinowany NT-3 (badawczo)", note: "badania eksperymentalne nad neuropatią obwodową i regeneracją nerwów" }],
    clinical: "Rola rozwojowa — mutacje NTRK3 powiązane z zaburzeniami neurorozwojowymi.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=326"]
  },
  {
    id: "p75ntr", name: "p75NTR", genes: "NGFR", class: "rtk", family: "trk",
    conductance: "Brak kanału (rodzina TNFR)",
    localization: "Neurony cholinergiczne, komórki Schwanna, neurony rozwijające się",
    structure: "Receptor niskiego powinowactwa, należy do nadrodziny TNFR (nie jest klasycznym RTK).",
    pathway: ["Pro-neurotrofina (np. proBDNF) wiąże p75NTR (często z sortiliną)", "Aktywacja kaskady kaspaz / JNK", "W opozycji do TrkB: indukcja apoptozy lub LTD"],
    crosstalk: "Antagonistyczna para z TrkB — dojrzałe neurotrofiny faworyzują Trk (przeżycie), pro-formy faworyzują p75NTR (apoptoza/LTD) — 'yin-yang' neurotroficzny.",
    pharm: [{ drug: "LM11A-31 (badawczo)", note: "mały modulator p75NTR — badania neuroprotekcyjne w chorobie Alzheimera" }],
    clinical: "Kluczowy dla przycinania synaptycznego (synaptic pruning) w rozwoju i neurodegeneracji.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=334"]
  },
  {
    id: "ret-gfra", name: "Ret + GFRα", genes: "RET, GFRA1-4", class: "rtk", family: "trk",
    conductance: "Brak kanału — autofosforylacja",
    localization: "Neurony dopaminergiczne istoty czarnej i VTA",
    structure: "Kompleks koreceptorowy: GFRα wiąże GDNF, Ret przekazuje sygnał.",
    pathway: ["GDNF wiąże GFRα1 zakotwiczony w błonie (GPI)", "Kompleks rekrutuje i dimeryzuje Ret", "Autofosforylacja Ret", "Ras-MAPK i PI3K-Akt → przeżycie neuronów dopaminergicznych"],
    crosstalk: "Kluczowy czynnik troficzny dla neuronów dopaminergicznych — cel terapii genowej w chorobie Parkinsona.",
    pharm: [{ drug: "Rekombinowany GDNF (badawczo)", note: "infuzja dordzeniowa/terapia genowa w chorobie Parkinsona — dotychczasowe próby kliniczne dały niejednoznaczne wyniki" }],
    clinical: "Badania nad GDNF jako terapią neuroprotekcyjną w chorobie Parkinsona.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=794"]
  },
  {
    id: "insr", name: "INSR (receptor insulinowy)", genes: "INSR", class: "rtk", family: "met",
    conductance: "Brak kanału — autofosforylacja",
    localization: "Podwzgórze (jądro łukowate), hipokamp, kora",
    structure: "Konstytutywny heterotetramer α2β2 (odmiennie od większości RTK niewymagający dimeryzacji indukowanej ligandem).",
    pathway: [
      "Insulina wiąże podjednostkę α INSR",
      "Autofosforylacja podjednostki β → rekrutacja IRS-1/2",
      "Aktywacja PI3K-Akt → hamowanie GSK-3β",
      "W podwzgórzu: hamowanie neuronów NPY/AgRP i pobudzenie POMC → uczucie sytości"
    ],
    crosstalk: "Insulinooporność mózgowa prowadzi do nadmiernej fosforylacji białka tau (poprzez zmniejszoną aktywność hamującą wobec GSK-3β) — hipoteza 'cukrzycy typu 3' łącząca insulinooporność z chorobą Alzheimera.",
    pharm: [{ drug: "Insulina donosowa (badawczo)", note: "badania nad łagodnymi zaburzeniami poznawczymi i chorobą Alzheimera" }],
    clinical: "Insulinooporność OUN powiązana z otyłością i zwiększonym ryzykiem choroby Alzheimera.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=321"]
  },
  {
    id: "igf1r", name: "IGF1R", genes: "IGF1R", class: "rtk", family: "met",
    conductance: "Brak kanału — autofosforylacja",
    localization: "Powszechny w rozwijającym się i dojrzałym OUN — hipokamp, móżdżek",
    structure: "Heterotetramer α2β2, strukturalnie homologiczny do INSR.",
    pathway: [
      "IGF-1 wiąże IGF1R",
      "Autofosforylacja → IRS-1",
      "PI3K-Akt-mTOR → wzrost komórkowy i synaptogeneza",
      "Równolegle Ras-MAPK → proliferacja progenitorów nerwowych"
    ],
    crosstalk: "Znaczne nakładanie ścieżek sygnałowych z receptorem insulinowym (możliwe heterodimery INSR/IGF1R).",
    pharm: [{ drug: "Mekasermina (rhIGF-1)", note: "stosowana w niedoborze IGF-1; badania neuroprotekcyjne w SLA" }],
    clinical: "Kluczowy dla neurogenezy rozwojowej; cel badań neuroprotekcyjnych w stwardnieniu zanikowym bocznym (SLA).",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=321"]
  },
  {
    id: "eph", name: "EphA4, EphB2 (naprowadzanie aksonalne)", genes: "EPHA4, EPHB2", class: "rtk", family: "axon",
    conductance: "Brak kanału — autofosforylacja (sygnalizacja dwukierunkowa)",
    localization: "Hipokamp (kolce dendrytyczne), rdzeń kręgowy, strefy neurogenne",
    structure: "Receptor jednoprzejściowy wiążący błonowo zakotwiczone efryny — wymaga bezpośredniego kontaktu komórka-komórka (sygnalizacja kontaktowa, nie dyfuzyjna).",
    pathway: [
      "Efryna-A/B na jednej komórce wiąże Eph na sąsiedniej komórce",
      "Dimeryzacja i obustronna autofosforylacja ('forward' w komórce z Eph i 'reverse' w komórce z efryną)",
      "Aktywacja RhoA → kolaps cytoszkieletu aktynowego",
      "Odpychanie stożka wzrostu aksonu / przebudowa kolców dendrytycznych"
    ],
    crosstalk: "EphB2 współdziała z receptorami NMDA w dojrzewaniu kolców dendrytycznych i plastyczności synaptycznej.",
    pharm: [{ drug: "Inhibitory EphA4 (badawczo)", note: "badania neuroprotekcyjne po urazie rdzenia kręgowego — blokada odpychania aksonalnego" }],
    clinical: "Sygnalizacja EphA4 hamuje regenerację aksonalną po urazie rdzenia kręgowego — cel terapii proregeneracyjnych.",
    refs: ["https://www.guidetopharmacology.org/GRAC/FamilyDisplayForward?familyId=327"]
  },
];

/* ============================================================
   SZLAKI / WORKFLOWS — kaskady sygnałowe krok po kroku
   ============================================================ */

const PATHWAYS = [
  {
    id: "glu-iono",
    title: "Transmisja glutaminianergiczna: AMPA → NMDA",
    subtitle: "Detekcja koincydencji i indukcja LTP/LTD",
    receptors: ["ampa", "nmda"],
    steps: [
      { title: "Uwolnienie glutaminianu", desc: "Pęcherzyk presynaptyczny uwalnia glutaminian do szczeliny synaptycznej.", node: "ligand" },
      { title: "Aktywacja AMPA", desc: "Glutaminian wiąże receptor AMPA → napływ Na⁺/K⁺ → szybka depolaryzacja (−70 mV → −30 mV).", node: "receptor" },
      { title: "Usunięcie bloku Mg²⁺", desc: "Depolaryzacja elektrostatycznie wypycha jon Mg²⁺ z poru kanału NMDA.", node: "effector" },
      { title: "Otwarcie NMDA", desc: "Przy jednoczesnym związaniu glutaminianu i glicyny/D-seryny kanał NMDA otwiera się — masywny napływ Ca²⁺.", node: "receptor" },
      { title: "Rozwidlenie sygnału Ca²⁺", desc: "Wapń aktywuje dwie przeciwstawne kinazy/fosfatazy w zależności od amplitudy i dynamiki sygnału.", node: "junction" },
      { title: "CaMKII → LTP", desc: "Duży, szybki napływ Ca²⁺ aktywuje CaMKII, która fosforyluje GluA1 — długotrwałe wzmocnienie synaptyczne.", node: "outcome-pos" },
      { title: "Kalcyneuryna (PP2B) → LTD", desc: "Mały, przedłużony napływ Ca²⁺ aktywuje kalcyneurynę, defosforylującą GluA1/DARPP-32 — długotrwałe osłabienie.", node: "outcome-neg" }
    ]
  },
  {
    id: "gpcr-branches",
    title: "Trzy gałęzie sygnalizacji GPCR",
    subtitle: "Gαs/Golf, Gαi/o i Gαq/11 — wspólny punkt wyjścia, różne efektory",
    receptors: ["d1d5", "d2d3d4", "mglur15"],
    steps: [
      { title: "Ligand wiąże GPCR", desc: "Neuroprzekaźnik/modulator aktywuje receptor 7TM, wywołując zmianę konformacyjną.", node: "ligand" },
      { title: "Rozwidlenie na białko G", desc: "Receptor sprzęga się z jednym z trzech typów heterotrimerycznego białka G.", node: "junction" },
      { title: "Gałąź Gαs/Golf", desc: "↑ cyklaza adenylanowa → ↑ cAMP → aktywacja PKA → fosforylacja CREB, DARPP-32, GluA1.", node: "outcome-pos" },
      { title: "Gałąź Gαi/o", desc: "↓ cyklaza adenylanowa, uwolnienie Gβγ → otwarcie GIRK (hiperpolaryzacja) + blokada Cav2.1/2.2 (mniejszy wyrzut transmitera).", node: "outcome-neg" },
      { title: "Gałąź Gαq/11", desc: "↑ PLCβ → hydroliza PIP2 → IP3 (uwolnienie Ca²⁺ z ER) + DAG (aktywacja PKC, synteza 2-AG).", node: "outcome-pos" }
    ]
  },
  {
    id: "darpp32",
    title: "Kaskada DARPP-32 — pętla prążkowia",
    subtitle: "Integracja sygnałów dopaminy, adenozyny i glutaminianu w MSN",
    receptors: ["d1d5", "d2d3d4", "a2a", "nmda"],
    steps: [
      { title: "Droga bezpośrednia (D1-MSN)", desc: "Dopamina + D1/Gαolf → ↑cAMP → ↑PKA → fosforylacja DARPP-32 na Thr34.", node: "ligand" },
      { title: "Droga pośrednia — hamowanie przez D2", desc: "Dopamina + D2/Gαi → ↓cAMP → ↓PKA (przeciwnie do D1).", node: "outcome-neg" },
      { title: "Droga pośrednia — pobudzenie przez A2A", desc: "Adenozyna + A2A/Gαs → ↑cAMP → ↑PKA — antagonizowane allosterycznie przez dopaminę w heterodimerze A2A–D2.", node: "junction" },
      { title: "Fosforylacja Thr34-DARPP-32", desc: "Aktywne PKA (D1 lub A2A) fosforyluje DARPP-32, które następnie inaktywuje fosfatazę PP1.", node: "effector" },
      { title: "Sygnał wygaszający: NMDA → kalcyneuryna", desc: "Napływ Ca²⁺ przez NMDA aktywuje kalcyneurynę (PP2B), która defosforyluje Thr34 — usuwa hamulec z PP1.", node: "outcome-neg" },
      { title: "Efekt końcowy na AMPA/NMDA", desc: "Aktywne PP1 defosforyluje GluA1/GluN2B → internalizacja kanałów i osłabienie transmisji (LTD); zablokowane PP1 → utrzymanie wzmocnienia (LTP).", node: "outcome-pos" }
    ]
  },
  {
    id: "ei-balance",
    title: "Równowaga pobudzenie/hamowanie (E/I)",
    subtitle: "Pętla pyramidalno-koszyczkowa i presynaptyczne autoreceptory",
    receptors: ["ampa", "nmda", "gabaa", "gabab", "mglur23"],
    steps: [
      { title: "Wyrzut glutaminianu", desc: "Neuron piramidowy pobudza sąsiednie neurony oraz interneurony GABA-ergiczne PV+ (komórki koszyczkowe) przez AMPA/NMDA.", node: "ligand" },
      { title: "Szybkie wyładowania PV+", desc: "Interneurony PV+ generują wysokoczęstotliwościowe wyładowania i uwalniają GABA perisomatycznie.", node: "receptor" },
      { title: "Hamowanie bocznikujące (GABA_A)", desc: "GABA_A generuje silne, szybkie hamowanie perisomatyczne — zapobiega nadmiernej synchronizacji (antypadaczkowo).", node: "outcome-neg" },
      { title: "Wolne hamowanie dendrytyczne (GABA_B)", desc: "Presynaptyczne/dendrytyczne GABA_B generuje powolny, długotrwały IPSP.", node: "outcome-neg" },
      { title: "Autoregulacja presynaptyczna", desc: "mGluR2/3 na zakończeniach glutaminianergicznych ograniczają dalszy wyrzut Glu przez Gβγ → blokadę Cav2.1.", node: "effector" },
      { title: "Skutek zaburzenia E/I", desc: "Przesunięcie równowagi w stronę nadpobudliwości leży u podstaw padaczki; zaburzenia interneuronów PV+ wiążą się ze schizofrenią i autyzmem.", node: "outcome-neg" }
    ]
  },
  {
    id: "endocannabinoid",
    title: "Retrogradna sygnalizacja endokannabinoidowa",
    subtitle: "DSI (GABA) i DSE (glutaminian) — CB1 jako presynaptyczny hamulec",
    receptors: ["cb1", "mglur15", "nmda"],
    steps: [
      { title: "Silna depolaryzacja postsynaptyczna", desc: "Otwarcie NMDA/VGCC lub aktywacja mGluR1/5 (Gq) podnosi cytozolowe [Ca²⁺].", node: "ligand" },
      { title: "Aktywacja DAGLα", desc: "Ca²⁺ i Gαq stymulują lipazę diacyloglicerolową (DAGLα), przekształcającą DAG w 2-AG.", node: "effector" },
      { title: "Dyfuzja retrogradna 2-AG", desc: "2-AG, jako cząsteczka lipofilna, dyfunduje przez błonę do szczeliny synaptycznej i dalej wstecznie do błony presynaptycznej.", node: "junction" },
      { title: "Aktywacja presynaptycznego CB1", desc: "2-AG wiąże CB1 sprzężony z Gαi/o na zakończeniu presynaptycznym.", node: "receptor" },
      { title: "Blokada Cav2.1/2.2 przez Gβγ", desc: "Uwolniony Gβγ bezpośrednio hamuje kanały wapniowe typu N/P/Q, blokując napływ Ca²⁺ niezbędny do egzocytozy.", node: "outcome-neg" },
      { title: "DSI vs DSE", desc: "W synapsach GABA-ergicznych: DSI (odhamowanie neuronu postsynaptycznego). W synapsach glutaminianergicznych: DSE (ochrona przed ekscytotoksycznością).", node: "outcome-pos" }
    ]
  },
  {
    id: "gq-plc",
    title: "Szlak Gαq/11 — PLCβ — IP3/DAG",
    subtitle: "Mobilizacja wapnia i aktywacja PKC",
    receptors: ["mglur15", "5ht2ac", "m1m3m5", "alpha1"],
    steps: [
      { title: "Aktywacja PLCβ", desc: "Gαq/11-GTP aktywuje fosfolipazę C-β związaną z błoną.", node: "ligand" },
      { title: "Hydroliza PIP2", desc: "PLCβ rozszczepia fosfatydyloinozytolo-4,5-bisfosforan (PIP2) na dwa przekaźniki wtórne.", node: "receptor" },
      { title: "IP3 → uwolnienie Ca²⁺", desc: "IP3 dyfunduje do siateczki śródplazmatycznej i otwiera receptory IP3R, uwalniając Ca²⁺ do cytoplazmy.", node: "outcome-pos" },
      { title: "DAG → aktywacja PKC", desc: "DAG pozostaje w błonie i wraz z Ca²⁺ aktywuje konwencjonalne izoformy kinazy białkowej C.", node: "outcome-pos" },
      { title: "Zamknięcie kanałów Kv7/M", desc: "Spadek PIP2 i fosforylacja przez PKC zamykają kanały potasowe typu M (KCNQ) → zniesienie prądu hamującego, wzrost pobudliwości.", node: "effector" },
      { title: "Synteza 2-AG", desc: "DAG może być alternatywnie przekształcony przez DAGLα w endokannabinoid 2-AG (patrz szlak retrogradny).", node: "junction" }
    ]
  },
  {
    id: "gi-girk",
    title: "Szlak Gαi/o — GIRK i blokada VGCC",
    subtitle: "Hamowanie poprzez hiperpolaryzację i ograniczenie wyrzutu",
    receptors: ["gabab", "d2d3d4", "mor-dor-kor", "cb1"],
    steps: [
      { title: "Dysocjacja Gαi-Gβγ", desc: "Aktywacja receptora Gi/o powoduje dysocjację podjednostki Gαi (hamuje cyklazę adenylanową) od dimeru Gβγ.", node: "ligand" },
      { title: "Gαi hamuje cyklazę adenylanową", desc: "Spadek cAMP wygasza aktywność PKA.", node: "outcome-neg" },
      { title: "Gβγ otwiera kanały GIRK (Kir3)", desc: "Bezpośrednie związanie Gβγ z GIRK zwiększa przewodnictwo K⁺ → powolna hiperpolaryzacja postsynaptyczna.", node: "outcome-neg" },
      { title: "Gβγ blokuje Cav2.1/2.2", desc: "Bezpośrednie hamowanie presynaptycznych kanałów wapniowych typu P/Q i N zmniejsza prawdopodobieństwo egzocytozy pęcherzyków.", node: "outcome-neg" },
      { title: "Efekt sieciowy", desc: "Wypadkowy efekt to zahamowanie postsynaptyczne (GIRK) i presynaptyczne (VGCC) — mechanizm wspólny dla GABA_B, opioidów, CB1 i D2.", node: "effector" }
    ]
  },
  {
    id: "trkb-bdnf",
    title: "Szlak neurotroficzny TrkB–BDNF",
    subtitle: "Od autofosforylacji receptora do lokalnej translacji białek",
    receptors: ["trkb", "p75ntr"],
    steps: [
      { title: "Dimeryzacja receptora", desc: "BDNF (dimer) wiąże i dimeryzuje dwie cząsteczki TrkB.", node: "ligand" },
      { title: "Autofosforylacja", desc: "Domeny kinazowe wzajemnie fosforylują reszty tyrozynowe (m.in. Tyr515, Tyr816).", node: "receptor" },
      { title: "Rozwidlenie na trzy szlaki", desc: "Ufosforylowane reszty rekrutują różne białka adaptorowe.", node: "junction" },
      { title: "Ras-Raf-MEK-ERK → CREB", desc: "Shc/Grb2 aktywują szlak MAPK, prowadząc do fosforylacji CREB i ekspresji genów wczesnej odpowiedzi (Arc, c-Fos) — konsolidacja LTP.", node: "outcome-pos" },
      { title: "PLCγ1 → IP3/DAG", desc: "Hydroliza PIP2 wzmacnia funkcję receptorów NMDA poprzez wzrost Ca²⁺ i aktywację PKC.", node: "outcome-pos" },
      { title: "PI3K-Akt → mTORC1", desc: "Inaktywacja GSK-3β/Bad promuje przeżycie neuronu; aktywacja mTORC1 indukuje lokalną translację białek w dendrycie.", node: "outcome-pos" },
      { title: "Antagonista: p75NTR", desc: "Pro-BDNF (forma niedojrzała) preferencyjnie wiąże p75NTR, uruchamiając kaskadę kaspaz i efekt przeciwny — apoptozę lub LTD.", node: "outcome-neg" }
    ]
  },
  {
    id: "heterodimers",
    title: "Heterodimeryzacja i przesłuchy receptorowe",
    subtitle: "Kompleksy receptorowe o unikalnych właściwościach farmakologicznych",
    receptors: ["a2a", "d2d3d4", "5ht2ac", "mglur23", "d1d5", "nmda", "gabaa"],
    steps: [
      { title: "Kompleks A2A–D2 (prążkowie)", desc: "Związanie adenozyny z A2A allosterycznie zmniejsza powinowactwo dopaminy do D2 — mechanizm działania kofeiny i istradefyliny w chorobie Parkinsona.", node: "junction" },
      { title: "Kompleks 5-HT2A–mGluR2 (kora)", desc: "Heterodimer Gq (5-HT2A) + Gi (mGluR2). Agoniści psychodeliczni zmieniają sygnalizację całego kompleksu przez Gαi; aktywacja mGluR2 wygasza efekty halucynogenne.", node: "junction" },
      { title: "Heterodimer D1–D2 (jądro półleżące)", desc: "Nietypowe sprzężenie z Gαq (zamiast Gs/Gi) — jednoczesna aktywacja obu receptorów wyzwala wyrzut Ca²⁺ zależny od PLCβ.", node: "junction" },
      { title: "Kompleks NMDA–D1 / GABA_A–D5", desc: "Bezpośrednie interakcje białko-białko domen cytoplazmatycznych (np. ogon C-końcowy GluN1 z pętlą C-końcową D1) stabilizują NMDA w błonie postsynaptycznej.", node: "effector" },
      { title: "Konsekwencja funkcjonalna", desc: "Heterooligomeryzacja tworzy nowe jednostki sygnalizacyjne o odmiennym profilu farmakologicznym niż suma pojedynczych receptorów — kluczowe dla projektowania leków allosterycznych.", node: "outcome-pos" }
    ]
  },
  {
    id: "hypothalamic-energy",
    title: "Podwzgórzowa regulacja bilansu energetycznego",
    subtitle: "POMC/MC4R kontra NPY/AgRP — dwa przeciwstawne obwody łaknienia",
    receptors: ["insr", "mc4r", "npy-y", "igf1r"],
    steps: [
      { title: "Sygnały obwodowe docierają do jądra łukowatego", desc: "Insulina i leptyna (proporcjonalne do zapasów tłuszczu) przenikają barierę krew-mózg i wiążą receptory na dwóch przeciwstawnych populacjach neuronów.", node: "ligand" },
      { title: "Aktywacja neuronów POMC (anoreksygennych)", desc: "INSR/leptyna pobudzają neurony POMC → uwolnienie α-MSH, który wiąże MC4R w PVN.", node: "receptor" },
      { title: "Hamowanie neuronów NPY/AgRP (orexygennych)", desc: "Te same sygnały hamują sąsiednie neurony NPY/AgRP, zmniejszając uwalnianie NPY (Y1/Y5) i AgRP.", node: "outcome-neg" },
      { title: "Rozwidlenie na MC4R", desc: "α-MSH (agonista) i AgRP (odwrócony agonista) rywalizują o ten sam receptor MC4R w PVN — matematyczna suma sygnałów wyznacza stan sytości.", node: "junction" },
      { title: "Efekt anoreksygenny (przewaga α-MSH)", desc: "MC4R/Gαs → ↑cAMP/PKA → pobudzenie neuronów PVN → zmniejszenie łaknienia, ↑ wydatek energetyczny.", node: "outcome-pos" },
      { title: "Efekt orexygenny (przewaga AgRP/NPY)", desc: "Zablokowany MC4R + aktywny Y1/Y5 (Gαi/GIRK) → silne pobudzenie łaknienia.", node: "outcome-neg" },
      { title: "Modulacja troficzna IGF1R", desc: "Sygnalizacja IGF1R równolegle wspiera przeżycie i plastyczność neuronów podwzgórzowych biorących udział w obwodzie (PI3K-Akt-mTOR).", node: "effector" }
    ]
  },
  {
    id: "stress-hpa-axis",
    title: "Oś stresu: CRH → HPA → zwrotne hamowanie",
    subtitle: "Neuropeptydowa kaskada od podwzgórza po korę nadnerczy",
    receptors: ["crhr1", "avpr1a", "cck"],
    steps: [
      { title: "Bodziec stresowy", desc: "Percepcja zagrożenia aktywuje neurony przykomorowe podwzgórza (PVN) uwalniające CRH (i wspomagająco AVP) do układu wrotnego przysadki.", node: "ligand" },
      { title: "CRHR1 na przysadce", desc: "CRH wiąże CRHR1 (Gαs) na kortykotropach → ↑cAMP/PKA → uwolnienie ACTH do krwiobiegu.", node: "receptor" },
      { title: "Wzmocnienie przez V1a", desc: "Wazopresyna synergistycznie nasila uwalnianie ACTH poprzez V1a (Gαq/PLCβ) na tych samych komórkach przysadki.", node: "effector" },
      { title: "Kortyzol z kory nadnerczy", desc: "ACTH stymuluje wydzielanie kortyzolu, który krąży ogólnoustrojowo i przenika z powrotem do OUN.", node: "outcome-pos" },
      { title: "Ujemne sprzężenie zwrotne w hipokampie", desc: "Kortyzol wiąże receptory glukokortykoidowe w hipokampie, hamując dalsze wydzielanie CRH z PVN — pętla homeostatyczna.", node: "outcome-neg" },
      { title: "Modulacja lękowa CCK2", desc: "Niezależnie, cholecystokinina w obwodach korowo-limbicznych (CCK2/Gαq) może nasilać odpowiedź lękową i wyzwalać napady paniki — równoległy, częściowo niezależny obwód.", node: "junction" }
    ]
  },
  {
    id: "purinergic-glia",
    title: "Purynergiczna sygnalizacja glejowa",
    subtitle: "ATP/ADP jako alarm tkankowy dla astrocytów i mikrogleju",
    receptors: ["p2y1", "p2y12", "p2x7"],
    steps: [
      { title: "Uwolnienie ATP/ADP", desc: "Uszkodzenie tkanki, intensywna aktywność neuronalna lub apoptoza uwalniają ATP do przestrzeni zewnątrzkomórkowej, gdzie ektonukleotydazy przekształcają je częściowo w ADP.", node: "ligand" },
      { title: "P2Y1 na astrocytach", desc: "ADP/ATP wiążą P2Y1 (Gαq/PLCβ) → IP3 → uwolnienie Ca²⁺ z ER w jednym astrocycie.", node: "receptor" },
      { title: "Propagacja fali wapniowej", desc: "Ca²⁺ i IP3 przechodzą przez złącza szczelinowe (koneksyny) do sąsiednich astrocytów, tworząc rozprzestrzeniającą się falę międzykomórkową.", node: "junction" },
      { title: "P2Y12 na mikrogleju spoczynkowym", desc: "Równolegle ADP wiąże P2Y12 (Gαi/o) na mikrogleju, wywołując chemotaksję i szybkie wysunięcie wypustek w kierunku źródła sygnału.", node: "effector" },
      { title: "P2X7 przy wysokich stężeniach ATP", desc: "Masywne uszkodzenie tkanki (bardzo wysokie [ATP]) otwiera jonotropowy P2X7 → napływ Ca²⁺/Na⁺ i aktywacja inflamasomu NLRP3.", node: "outcome-neg" },
      { title: "Skutek sieciowy", desc: "Skoordynowana odpowiedź glejowa: astrocyty synchronizują aktywność sieciową (P2Y1), mikroglej migruje i fagocytuje uszkodzone struktury (P2Y12), a przy przeciążeniu uruchamia się neurozapalenie (P2X7).", node: "outcome-pos" }
    ]
  }
];
