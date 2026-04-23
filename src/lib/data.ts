/**
 * Content source — derived from the live studioro.com portfolio (46 projects).
 * Each `thumbnail` points at the Cargo Collective payload URL so the first deploy
 * looks real immediately. Swap to Sanity when the CMS goes live.
 */

export type ProjectCategory =
  | "film"
  | "fotografie"
  | "event"
  | "commercial"
  | "corporate"
  | "documentaire"
  | "musicvideo"
  | "animatie"
  | "kunst";

export type Project = {
  slug: string;
  title: string;
  client: string;
  year: number;
  category: ProjectCategory;
  categoryLabel?: string; // override display
  teaser: string;
  featured?: boolean;
  thumbnail?: string; // full URL
  palette?: [string, string]; // 2-stop gradient fallback
  videoProvider?: "vimeo" | "youtube";
  videoId?: string;
  description?: string;
};

const C = "https://payload.cargocollective.com/1/5/184005";

export const projects: Project[] = [
  {
    slug: "delft-reflexionz",
    title: "Delft RefleXionZ",
    client: "Vrij werk",
    year: 2012,
    category: "kunst",
    categoryLabel: "Reflecterende videokunst",
    teaser:
      "Mijn 'Gezicht op Delft' — doorlopend kunstproject met de grachten als spiegel.",
    description:
      "Reflecterende videokunst. Een doorlopend project waarin ik Delft door het wateroppervlak vastleg — soms letterlijk, soms als metafoor.",
    featured: true,
    thumbnail: `${C}/2684124/prt_1327610554.jpg`,
    palette: ["#0a1a1a", "#1a4a4a"],
  },
  {
    slug: "whisky-center-interwhisky-2022",
    title: "Whisky Center @ Internationaal Whisky Festival",
    client: "Whisky Center",
    year: 2022,
    category: "event",
    teaser:
      "Fotoreportage in Den Haag tijdens het grootste whisky-festival van Nederland.",
    description:
      "Fotoreportage in opdracht van Whisky Center op het Internationaal Whisky Festival 2022 in Den Haag.",
    featured: true,
    thumbnail: `${C}/14414335/prt_1669164794.jpg`,
    palette: ["#2a1a0a", "#8b3a1f"],
  },
  {
    slug: "buro-delftse-zaken",
    title: "Buro Delftse Zaken",
    client: "Omroep Delft",
    year: 2023,
    category: "documentaire",
    teaser:
      "Vier afleveringen van een TV-programma — journalistiek werk met Delftse collega's.",
    description:
      "Samen met Delftse journalistieke collega's heb ik 4 afleveringen gemaakt van het tv-programma Buro Delftse Zaken, uitgezonden op Omroep Delft.",
    featured: true,
    thumbnail: `${C}/14452155/prt_1683242702.jpg`,
    palette: ["#0a1a10", "#1a4a2a"],
  },
  {
    slug: "met-vlag-en-wimpel",
    title: "Met Vlag & Wimpel",
    client: "Delftse filmmakers collectief",
    year: 2023,
    category: "film",
    teaser:
      "Een samenwerking met Marjoleine Droog, Martien de Man, Willem de Bie, Koen Samson en muzikant Haldor Doekes.",
    description:
      "De Delftse filmmakers Marjoleine Droog, Martien de Man, Robert van Nimwegen, Willem de Bie, Koen Samson, de muzikant Haldor Doekes en fotograaf Suzanne Liem maakten samen dit project.",
    featured: true,
    thumbnail: `${C}/14452165/prt_1683243777.jpg`,
    palette: ["#140a1a", "#3a1a4a"],
  },
  {
    slug: "norwegian-gem",
    title: "Norwegian Gem",
    client: "Norwegian Cruise Line",
    year: 2013,
    category: "commercial",
    teaser:
      "Promotiefilm voor de NCL Gem — vertoond in New York City tijdens de dopingsceremonie.",
    description:
      "Norwegian Cruise Line — promotiefilm voor het cruiseschip NCL Gem, vertoond in New York City tijdens de dopingsceremonie.",
    featured: true,
    thumbnail: `${C}/2684454/prt_1384809056.jpg`,
    palette: ["#0a1a28", "#1a4a75"],
  },
  {
    slug: "epica-storm-the-sorrow",
    title: "Epica — Storm The Sorrow",
    client: "Epica / Kunststoff",
    year: 2012,
    category: "musicvideo",
    teaser:
      "Videoclip voor Epica. Regie: Remko Tielemans. Vocals: Simone Simons.",
    description:
      "Videoclip Epica — Storm The Sorrow. Regie: Remko Tielemans. Concept & productie: Kunststoff. Vocals: Simone Simons.",
    featured: true,
    thumbnail: `${C}/3274609/prt_1335334125.jpg`,
    palette: ["#14010a", "#4a0a1e"],
  },
  {
    slug: "ihc-merwede-keel-laying",
    title: "IHC Merwede — Keel Laying",
    client: "IHC Merwede",
    year: 2013,
    category: "film",
    teaser:
      "Drie pipe-laying vessels van 550 ton, tegelijkertijd gebouwd. Keel laying movie.",
    description:
      "IHC Merwede is building three 550t pipelaying vessels simultaneously. Keel laying movie.",
    thumbnail: `${C}/4901620/prt_1359835445.jpg`,
    palette: ["#0a1a20", "#1a3a55"],
  },
  {
    slug: "heijmans-bodemsanering",
    title: "Heijmans — Bodemsanering Botlek",
    client: "Heijmans",
    year: 2019,
    category: "film",
    teaser:
      "Fraaie film over een bodemsaneringsproject in de Botlek — camerawerk voor Het Videobureau.",
    description:
      "In opdracht van Het Videobureau heeft Studioro camerawerk geleverd voor deze fraaie film over een bodemsaneringsproject in de Botlek.",
    thumbnail: `${C}/13790468/prt_1550059887.jpg`,
    palette: ["#1a140a", "#4a3a1a"],
  },
  {
    slug: "strukton-werkplaats-toekomst",
    title: "De werkplaats van de toekomst",
    client: "Strukton / Gemeente Rotterdam",
    year: 2020,
    category: "corporate",
    teaser:
      "Videoproductie over de werkplaats van de toekomst — voor een grote aannemer en de Gemeente Rotterdam.",
    thumbnail: `${C}/14056005/prt_1583797958.jpg`,
    palette: ["#14141a", "#2e2e42"],
  },
  {
    slug: "strukton-immersion-projects",
    title: "Strukton — Immersion Projects",
    client: "Strukton",
    year: 2020,
    category: "documentaire",
    teaser:
      "Documentatie van de funderingswerkzaamheden voor een hangbrug in Turkije.",
    thumbnail: `${C}/14056002/prt_1583797932.jpg`,
    palette: ["#0a1a20", "#1a4a55"],
  },
  {
    slug: "orbitvu-benelux",
    title: "Orbitvu Benelux — Productvideo's",
    client: "Orbitvu Benelux",
    year: 2016,
    category: "commercial",
    teaser:
      "Alle product- en referentievideo's voor de Benelux-distributeur van Orbitvu fotostudio's.",
    description:
      "In opdracht van Orbitvu Benelux produceren wij alle productvideo's en referentievideo's.",
    thumbnail: `${C}/11950230/prt_1473714883.jpg`,
    palette: ["#1a140a", "#4a3a1a"],
  },
  {
    slug: "benelux-hondekop-220902",
    title: "Benelux Hondekop — Treinstel 220902",
    client: "Stichting Hondekop",
    year: 2019,
    category: "documentaire",
    teaser:
      "Het restauratieproces van het enige bewaard gebleven Benelux Hondekop treinstel, 220902.",
    description:
      "Een impressie van het restauratieproces van het enige bewaard gebleven Benelux Hondekop treinstel 220902.",
    thumbnail: `${C}/13846489/prt_1555712062.jpg`,
    palette: ["#0a0a0a", "#2e2a1a"],
  },
  {
    slug: "springbank-proeverij-delft",
    title: "Springbank proeverij",
    client: "Wine & More by Arjan",
    year: 2022,
    category: "event",
    teaser:
      "Sfeerimpressie van een whiskyproeverij in de historische De Waag in Delft.",
    description:
      "Sfeerimpressie Springbank proeverij van Wine & More by Arjan in De Waag in Delft.",
    thumbnail: `${C}/14417270/prt_1670370479.jpg`,
    palette: ["#1a0a0a", "#4a1a1a"],
  },
  {
    slug: "whisky-center-dingle-delft",
    title: "Whisky Center Dingle Tasting",
    client: "Whisky Center & Wine & More by Arjan",
    year: 2022,
    category: "event",
    teaser:
      "Dingle Tasting in de sfeervolle De Waag in Delft — georganiseerd door Whisky Center.",
    description:
      "Dingle Tasting organized by Whisky Center & Wine & More by Arjan at the beautiful De Waag in the pittoresk city of Delft.",
    thumbnail: `${C}/14412566/prt_1668718367.jpg`,
    palette: ["#1a140a", "#5c3a1a"],
  },
  {
    slug: "flower-factor-floraholland",
    title: "Flower Factor — Seasonal Trade Fair",
    client: "Flower Factor / Royal FloraHolland",
    year: 2017,
    category: "commercial",
    teaser:
      "Video tbv de Royal FloraHolland Seasonal Trade Fair — in opdracht van Flower Factor.",
    description:
      "In opdracht van Flower Factor deze video gemaakt tbv de Royal FloraHolland Seasonal Trade Fair.",
    thumbnail: `${C}/12592432/prt_1488970412.jpg`,
    palette: ["#0a1a0a", "#2a4a1a"],
  },
  {
    slug: "van-merksteijn-staaldraad",
    title: "Van Merksteijn — Recordhoeveelheid staaldraad",
    client: "Van Merksteijn (via FilmDesigners)",
    year: 2021,
    category: "film",
    teaser:
      "Camerawerk voor een videoproductie over het lossen van een recordhoeveelheid rollen staaldraad.",
    description:
      "In opdracht van en samen met FilmDesigners camerawerk verricht voor deze videoproductie over het lossen van een recordhoeveelheid van rollen staaldraad.",
    thumbnail: `${C}/14294893/prt_1630785243.jpg`,
    palette: ["#14140a", "#3a3a14"],
  },
  {
    slug: "cablehouse-bluesband",
    title: "CableHouse Bluesband",
    client: "CableHouse Bluesband",
    year: 2023,
    category: "fotografie",
    teaser: "Bandfotografie — gig-shots en promo.",
    thumbnail: `${C}/14473682/prt_1691914336.jpg`,
    palette: ["#1a0a0a", "#4a1a1a"],
  },
  {
    slug: "hofland-flowering-plants",
    title: "Hofland Flowering Plants",
    client: "Annemiek Hofland",
    year: 2019,
    category: "corporate",
    teaser:
      "Bedrijfsvideo-productie voor een siergewassen-specialist uit het Westland.",
    description:
      "Bedrijfsvideo-productie voor Annemiek Hofland van Hofland Flowering Plants.",
    thumbnail: `${C}/13757801/prt_1547219364.jpg`,
    palette: ["#0a1a0a", "#2a4a1a"],
  },
  {
    slug: "joulz-dedemsvaart",
    title: "Joulz Dedemsvaart",
    client: "Joulz / TenneT",
    year: 2019,
    category: "film",
    teaser:
      "Camerawerk voor een videoregistratie vol spanning en energie — letterlijk.",
    description:
      "In opdracht van FilmDesigners al het 'grond'-camerawerk geleverd voor deze videoregistratie vol spanning en energie.",
    thumbnail: `${C}/13790499/prt_1550061703.jpg`,
    palette: ["#0a141a", "#1a3a4a"],
  },
  {
    slug: "henk-fransen-zoektocht",
    title: "De zoektocht naar genezing",
    client: "Dr. Henk Fransen",
    year: 2016,
    category: "documentaire",
    teaser:
      "Meercamera-registraties, montage en vormgeving voor arts Henk Fransen (Genezend Vermogen).",
    description:
      "Voor arts Henk Fransen produceerde wij meercamera-registraties, alle videomontages en vormgeving (Genezend vermogen / Zoektocht naar genezing).",
    thumbnail: `${C}/10898322/prt_1451925592.png`,
    palette: ["#14140a", "#3a3a14"],
  },
  {
    slug: "knmi-cabauw-drone",
    title: "Behind the Scenes Cabauw",
    client: "KNMI",
    year: 2017,
    category: "documentaire",
    teaser:
      "Een bijzondere drone-inzet voor meteorologische metingen te Cabauw.",
    description:
      "Opname en montage van een bijzondere inzet met een drone — meteorologische metingen te Cabauw.",
    thumbnail: `${C}/12990408/prt_1499295561.jpg`,
    palette: ["#0a141a", "#1a3a55"],
  },
  {
    slug: "gene-jewels-dna",
    title: "Gene Jewels — DNA Promo",
    client: "Gene Jewels / BaseClear",
    year: 2015,
    category: "commercial",
    teaser:
      "Promovideo voor sieraden met daarin DNA-materiaal — samenwerking met BaseClear.",
    description:
      "Promovideo voor Gene Jewels, sieraden met daarin DNA-materiaal.",
    thumbnail: `${C}/9609750/prt_1427405352.jpg`,
    palette: ["#1a0a14", "#4a1a3a"],
  },
  {
    slug: "bling-de-film",
    title: "BLING — De Film",
    client: "Florian Vermeulen",
    year: 2011,
    category: "film",
    teaser:
      "Topproductie met Nasrdin Dchar, Birgit Schuurman, Sebastiaan Labrie, Victoria Koblenko.",
    description:
      "De topproductie van regisseur Florian Vermeulen met Nasrdin Dchar, Birgit Schuurman, Sebastiaan Labrie, Victoria Koblenko, Phi Nguyen, Nadjim — cameraverhuur, locatiespotter en figuratie.",
    palette: ["#1a140a", "#4a3a14"],
  },
  {
    slug: "dj-roy-gates-midnight-sun",
    title: "DJ Roy Gates — Midnight Sun",
    client: "DJ Roy Gates",
    year: 2012,
    category: "musicvideo",
    teaser:
      "Camerawerk, camera-assistentie en data-loading met de Red Epic camera.",
    description:
      "Voor deze productie heb ik deels camera-werk, camera-assistentie en data-loading gedaan met de Red Epic camera.",
    thumbnail: `${C}/3828188/prt_1343515816.jpg`,
    palette: ["#140a1a", "#3a1a4a"],
  },
  {
    slug: "ellen-macarthur-desso",
    title: "Ellen MacArthur @ Desso",
    client: "Desso / Studio Winterwood",
    year: 2012,
    category: "event",
    teaser:
      "Bezoek Ellen MacArthur aan Desso Waalwijk. 2e cameraman en montage.",
    description:
      "Bezoek Ellen MacArthur aan Desso in Waalwijk. 2e cameraman en montage verzorgd in opdracht van Studio Winterwood.",
    thumbnail: `${C}/2847483/prt_1329773709.jpg`,
    palette: ["#1a0a14", "#5a1a3a"],
  },
  {
    slug: "prins-filip-desso-dendermonde",
    title: "Prins Filip @ Desso Dendermonde",
    client: "Desso",
    year: 2012,
    category: "event",
    teaser:
      "Bezoek van prins Filip aan de tapijtfabriek Desso in Dendermonde, België.",
    thumbnail: `${C}/2845567/prt_1329764998.jpg`,
    palette: ["#0a0a14", "#1a1a4a"],
  },
  {
    slug: "philips-ambilight-animatie",
    title: "Philips Ambilight — Loop-animatie",
    client: "Philips (via Dreamsolution)",
    year: 2014,
    category: "animatie",
    teaser:
      "Loop-animatie voor Ambilight-banners, op basis van 6 stockfoto's.",
    description:
      "In opdracht van Dreamsolution op basis van 6 aangeleverde stockfoto's deze loop-animatie geproduceerd voor geanimeerde banners.",
    thumbnail: `${C}/8512896/prt_1410003105.png`,
    palette: ["#0a0f1a", "#1a2a4a"],
  },
  {
    slug: "smit-visual-focus-board",
    title: "Smit Visual — Focus Touch Board",
    client: "Smit Visual Supplies",
    year: 2014,
    category: "animatie",
    teaser: "3D-animatie van een interactief whiteboard.",
    description:
      "Voor Smit Visual Supplies deze 3D animatie ontwikkeld van het Focus Touch Board, interactieve whiteboard.",
    thumbnail: `${C}/8513159/prt_1410012373.jpg`,
    palette: ["#14140a", "#3a3a14"],
  },
  {
    slug: "zakelijke-trainer",
    title: "Zakelijke Trainer — Videocampagne",
    client: "Zakelijke Trainer",
    year: 2020,
    category: "corporate",
    teaser: "Alle website-video's + portretten van trainers.",
    description:
      "Voor Zakelijke Trainer alle video's voor de website en van alle trainers geproduceerd.",
    thumbnail: `${C}/14187604/prt_1605518346.jpg`,
    palette: ["#0a1a20", "#1a3a55"],
  },
  {
    slug: "bord-voor-delft-making-of",
    title: "Bord voor Delft — Making of",
    client: "Olav Slingerland & Mark van Huystee",
    year: 2017,
    category: "documentaire",
    teaser:
      "Een keramiek-en-tekening-project van Delftse kunstenaars, vastgelegd in wording.",
    description:
      "'Bord voor Delft / Making of' met Olav Slingerland en Mark van Huystee — keramiek, tekening, video.",
    thumbnail: `${C}/12570220/prt_1488499751.jpg`,
    palette: ["#0a141a", "#1a3a4a"],
  },
  {
    slug: "bts-fashion-shoot-ileenja",
    title: "Behind-the-Scenes Fashion Shoot",
    client: "Ileenja de Jong",
    year: 2015,
    category: "film",
    teaser:
      "BTS-video van een fashion shoot met fotograaf Joey Hohage en model Larissa Lisenka.",
    description:
      "Behind The Scenes video van een fashion shoot van styliste Ileenja de Jong, met fotograaf Joey Hohage, muah Devid Roodenburg en model Larissa Lisenka.",
    thumbnail: `${C}/9562728/prt_1426706445.jpg`,
    palette: ["#1a0a14", "#4a1a3a"],
  },
  {
    slug: "auxilium-portret",
    title: "Auxilium — Medewerkersportret",
    client: "Auxilium",
    year: 2012,
    category: "fotografie",
    teaser: "Portretfotografie van het voltallige team.",
    thumbnail: `${C}/2784567/prt_1328900535.jpg`,
    palette: ["#14141a", "#3a3a4a"],
  },
  {
    slug: "delfts-blauwe-panden",
    title: "Delfts Blauwe Panden",
    client: "Gemeente Delft",
    year: 2012,
    category: "documentaire",
    teaser:
      "Documentaire over een sloop-project in Delft en het ontstaan van veiligheidsgevoel.",
    description:
      "Documentaire 'Delfts Blauwe Panden'. Een verslag van de totstandkoming van dit project ter voorkoming van het gevoel van onveiligheid in dit te slopen stukje Delft.",
    thumbnail: `${C}/2711244/prt_1327993894.jpg`,
    palette: ["#0a0a14", "#1a1a4a"],
  },
  {
    slug: "captured-light",
    title: "Captured Light — Floral Food Fashion",
    client: "Captured Light",
    year: 2012,
    category: "film",
    teaser:
      "3-camera live-registratie en montage van een crossover-event.",
    description:
      "Captured Light — Floral Food Fashion film, 3-camera registratie en montage.",
    thumbnail: `${C}/2690758/prt_1328899910.jpg`,
    palette: ["#140a14", "#3a1a3a"],
  },
  {
    slug: "mark-van-huystee-stadsgezichten",
    title: "Delftse Stadsgezichten — Mark van Huystee",
    client: "Mark van Huystee",
    year: 2012,
    category: "documentaire",
    teaser:
      "De totstandkoming van stadsgezichten — tekenaar Mark van Huystee aan het werk.",
    thumbnail: `${C}/2691017/prt_1327701441.jpg`,
    palette: ["#0a1a14", "#1a4a3a"],
  },
  {
    slug: "mark-van-huystee-vier-vs",
    title: "De vier V's",
    client: "Mark van Huystee",
    year: 2013,
    category: "documentaire",
    teaser:
      "Het ontstaan van een nieuw stadsgezicht — Mark van Huystee's 'De vier V's'.",
    description:
      "Voor 'stadsgezichten-tekenaar' Mark van Huystee deze video gemaakt waarin het ontstaan van zijn nieuwste werk 'De vier V's' wordt getoond.",
    thumbnail: `${C}/4656644/prt_1356390573.jpg`,
    palette: ["#0a1a14", "#1a4a3a"],
  },
  {
    slug: "massxess",
    title: "MassXess — Vakbeurs commercial",
    client: "MassXess",
    year: 2012,
    category: "commercial",
    teaser:
      "Greenscreen-studio opname met model Anouk Sahner, alles eromheen 2D/3D geanimeerd.",
    description:
      "MassXess commercial — model Anouk Sahner in greenscreen-studio gefilmd, verder alles in 2D en 3D geanimeerd. Speelde op grote schermen tijdens vakbeurzen.",
    thumbnail: `${C}/2777698/prt_1328816307.jpg`,
    palette: ["#1a0a14", "#4a1a3a"],
  },
  {
    slug: "de-koning-staalwerken",
    title: "De Koning Staalwerken — Werkbordes",
    client: "De Koning Staalwerken / MCB Valkenswaard",
    year: 2014,
    category: "commercial",
    teaser:
      "Promovideo voor een demontabel werkbordes, opgenomen op een kraanrail bij MCB.",
    description:
      "Promovideo voor het demontabel werkbordes van De Koning Staalwerken, opgenomen bij MCB in Valkenswaard (inspectie, reparatie, kraanrail).",
    thumbnail: `${C}/7069501/prt_1389391725.jpg`,
    palette: ["#14141a", "#3a3a4a"],
  },
  {
    slug: "pvr-machining",
    title: "PvR Machining Barendrecht",
    client: "PvR Machining",
    year: 2012,
    category: "corporate",
    teaser: "Bedrijfsfilm — fijnmechanische producten in actie.",
    thumbnail: `${C}/2782772/prt_1328882546.jpg`,
    palette: ["#0a141a", "#1a3a4a"],
  },
  {
    slug: "trouwen-zoals-jullie-willen",
    title: "Trouwen zoals jullie willen",
    client: "BlikvanBoven (co-productie)",
    year: 2015,
    category: "commercial",
    teaser:
      "Co-productie met BlikvanBoven — drone-werk voor een bruiloft-service.",
    description:
      "'Trouwen zoals jullie willen' — een co-productie tussen BlikvanBoven & Studioro (DJI-drone).",
    thumbnail: `${C}/9935160/prt_200x136_1433283359.jpg`,
    palette: ["#1a140a", "#4a3a1a"],
  },
];

export const featuredProjects = projects.filter((p) => p.featured);

export const categories: { value: ProjectCategory | "all"; label: string }[] = [
  { value: "all", label: "Alles" },
  { value: "film", label: "Film" },
  { value: "fotografie", label: "Fotografie" },
  { value: "event", label: "Events" },
  { value: "commercial", label: "Commercials" },
  { value: "corporate", label: "Corporate" },
  { value: "documentaire", label: "Documentaire" },
  { value: "musicvideo", label: "Music video" },
  { value: "animatie", label: "Animatie" },
  { value: "kunst", label: "Kunst" },
];

export type Client = { name: string };
export const clients: Client[] = [
  { name: "Philips" },
  { name: "Heijmans" },
  { name: "IHC Merwede" },
  { name: "Strukton" },
  { name: "Desso" },
  { name: "Orbitvu Benelux" },
  { name: "Whisky Center" },
  { name: "Norwegian Cruise Line" },
  { name: "Flower Factor" },
  { name: "Royal FloraHolland" },
  { name: "BaseClear" },
  { name: "TenneT" },
  { name: "Joulz" },
  { name: "KNMI" },
  { name: "Omroep Delft" },
  { name: "Gemeente Delft" },
  { name: "Gemeente Rotterdam" },
  { name: "Van Merksteijn" },
  { name: "FilmDesigners" },
  { name: "Studio Winterwood" },
  { name: "Kunststoff" },
  { name: "Epica" },
  { name: "Stichting Hondekop" },
  { name: "Wine & More by Arjan" },
  { name: "De Koning Staalwerken" },
  { name: "Dreamsolution" },
  { name: "Smit Visual Supplies" },
];

export type Service = {
  n: string;
  title: string;
  description: string;
  price: string;
  example: string;
  deliverables: string[];
};

export const services: Service[] = [
  {
    n: "01",
    title: "Film & Video",
    description:
      "Commercials, bedrijfsfilms, sfeerimpressies, documentaires en kunstprojecten. Van concept tot kleurcorrectie — één aanspreekpunt, één visie.",
    price: "vanaf € 1.850",
    example: "Whisky Center @ InterWhisky",
    deliverables: [
      "Concept & script",
      "Regie & opname (1–3 camera's)",
      "Montage & sound design",
      "Kleurcorrectie (DaVinci Resolve Studio)",
      "Levering in alle formaten (broadcast, social, web)",
    ],
  },
  {
    n: "02",
    title: "Fotografie",
    description:
      "Product, portret, editorial en event. Clean pack-shot tot cinematografisch portret — altijd afgestemd op waar het beeld landt.",
    price: "vanaf € 850",
    example: "CableHouse Bluesband",
    deliverables: [
      "Locatie- of studio-shoot",
      "Professionele retouche in Capture One",
      "Web + print delivery",
      "Rechten-vrije gebruiksovereenkomst",
    ],
  },
  {
    n: "03",
    title: "Event Registratie",
    description:
      "Symposia, concerten, bedrijfsfeesten, beurzen. Multi-camera opname, livestream mogelijk, snelle social-cut binnen 48 uur.",
    price: "vanaf € 1.250",
    example: "IHC Merwede — Keel Laying",
    deliverables: [
      "2–4 camera setup",
      "Audio direct van mengtafel",
      "Optionele livestream",
      "Snelle social-cut + volledige registratie",
    ],
  },
  {
    n: "04",
    title: "Montage & Kleurcorrectie",
    description:
      "Heb je zelf al materiaal? Post-only route: ACES workflow, broadcast-ready levering, professionele sound design.",
    price: "vanaf € 450 / dag",
    example: "Take Off Now — Winterwood",
    deliverables: [
      "DaVinci Resolve Studio",
      "ACES color pipeline",
      "Pro Tools sound design",
      "Subtitling & closed captions",
    ],
  },
  {
    n: "05",
    title: "Drone & Aerial",
    description:
      "EASA A1-gecertificeerd, DJI Mavic 3 Cine. Inzetbaar als losse dienst of geïntegreerd in een groter project.",
    price: "vanaf € 650 / dagdeel",
    example: "Bodemsanering Botlek",
    deliverables: [
      "EASA A1-certificering",
      "4K / 5.1K opname",
      "Vluchtplan & veiligheidschecks",
      "Ondersteuning bij locatievergunning",
    ],
  },
  {
    n: "06",
    title: "Fotografische kunstwerken",
    description:
      "Voor aan de wand. Limited-edition prints uit de Delft RefleXionZ reeks en ander eigen werk, op premium fine-art papier.",
    price: "vanaf € 180",
    example: "Delft RefleXionZ — Oude Delft",
    deliverables: [
      "Hahnemühle fine-art print",
      "Gecertificeerd & gesigneerd",
      "Limited edition /25",
      "Optioneel ingelijst",
    ],
  },
];

export const equipment = [
  {
    h: "Camera",
    l: ["Sony FX6", "Sony A7S III", "Sony A7R V", "DJI Ronin 4D 6K"],
  },
  {
    h: "Drone",
    l: ["DJI Mavic 3 Cine", "EASA A1-licentie"],
  },
  {
    h: "Audio",
    l: ["Sennheiser MKH-416", "Rode Wireless Pro", "Zoom F6 Recorder"],
  },
  {
    h: "Licht",
    l: ["Aputure 600D Pro", "Nanlux Evoke 900C", "HMI 1.2kW"],
  },
  {
    h: "Grip",
    l: ["DJI RS3 Pro", "Motorized slider 1m", "Portable Jib 4m"],
  },
  {
    h: "Post-productie",
    l: [
      "DaVinci Resolve Studio",
      "Adobe Premiere Pro",
      "Pro Tools",
      "Capture One",
    ],
  },
];

export const principles = [
  {
    n: "01",
    title: "Verhaal",
    description:
      "Beeld zonder verhaal is decor. Elke opdracht begint met de vraag: wat moet het vertellen?",
  },
  {
    n: "02",
    title: "Vakmanschap",
    description:
      "Techniek dient het idee. Maar het moet wel kloppen — in focus, in licht, in geluid, in kleur.",
  },
  {
    n: "03",
    title: "Flexibiliteit",
    description:
      "Van solo-operatie tot full crew. Wat het project vraagt, niet wat het menu voorschrijft.",
  },
];

/** Marketing copy lifted from studioro.com — keep Dutch verbatim */
export const tagline = "Reflecterende videokunst uit Delft.";
export const quote =
  "Voorheen aan de kleurrijkste gracht van Delft — nu met de camera de wijde wereld in.";
