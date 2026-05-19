export interface BlogPost {
  id: string
  slug: string
  title: string
  excerpt: string
  pillar: 1 | 2 | 3 | 4 | 5
  pillarName: string
  format: 'blog'
  readTime: number // mínútur
  publishedAt: string // ISO8601
  featured: boolean
  image?: string
  body: string // HTML
}

const body_c001 = `<p>Sentu þú reikninginn handvirkt í dag? Opnaðir Excel, fylltu inn tölurnar, vistaðir sem PDF, sendirðu á viðskiptavininn?</p>

<p>Ef já — þá veistu nákvæmlega hvað ég er að tala um.</p>

<p>Við höldum öll að við séum að vinna þegar við erum að vinna. En hluti af þeirri vinnu er ekki raunveruleg vinna — það er að halda kerfinu gangandi. Að senda staðfestingar. Að svara sömu spurningum. Að setja saman skýrslur sem enginn les alvarlega.</p>

<p>Þetta er "vinna um vinnu". Og hún kostar þig meira en þú heldur.</p>

<p>Hér eru fimm hlutir sem flest þjónustufyrirtæki eyða of miklum tíma í — og tölurnar á bak við hvert þeirra.</p>

<h2>1. Staðfestingarpóstur eftir bókun</h2>

<p>Viðskiptavinur bókar tíma. Þú sérð bókunina. Þú skrifar: "Hæ Jóhanna, takk kærlega fyrir bókunina, við sjáumst þriðjudaginn 8. apríl kl. 14:00..."</p>

<p>3–5 mínútur í hvert skipti. Ef þú hefur 20 bókanir á viku er þetta <strong>1–2 klukkustundir.</strong></p>

<p>Og svo kemur áminningin daginn áður. Og ef viðskiptavinurinn þarf að breyta — þá byrjar samskiptaþráðurinn aftur.</p>

<p>Þetta er verkefni sem ætti að gerast sjálfkrafa. Alltaf. Án þess að þú hugsir um það.</p>

<h2>2. Reikningagerð og sendingar</h2>

<p>Þú opnar Excel eða Word. Skrifar nafn viðskiptavinar, dagsetningu, þjónustuna, upphæðina. Vistar. Breytir í PDF. Sendir.</p>

<p>Ef það gengur vel tekur þetta 10–15 mínútur á reikning. Ef eitthvað er rangt — lengur.</p>

<p>Rannsóknir sýna að eigendur lítilla fyrirtækja eyða <strong>5+ klukkustundum á viku</strong> í bókhald og reikningagerð. Það eru 240 klukkustundir á ári. Rúmlega 6 vinnuvikur.</p>

<p>Spurningin er ekki hvort þú getir gert þetta. Þú getur. Spurningin er hvort þú <em>átt</em> að vera að gera þetta.</p>

<h2>3. Svara sömu spurningum aftur og aftur</h2>

<p>"Hvað kostar þetta?" "Eruð þið opin á laugardögum?" "Hvernig bóka ég tíma?"</p>

<p>Þessar spurningar koma á Facebook, Instagram, í tölvupósti, á síma. Og þú svarar þeim. Og þú svarar þeim aftur. Og aftur.</p>

<p>Ef þú eyðir 5 mínútum á dag í þetta er það <strong>25 mínútur á viku</strong>. Ekki mikið? Hugsaðu um það sem 100+ klukkustundir yfir 20 ár í rekstri. Alltaf sömu svörin.</p>

<p>Og þetta er ekki bara tímaeyðsla. Það er þreyta. Þú ert að nota heilaorku í eitthvað sem kerfið gæti séð um.</p>

<h2>4. Handvirkur vaktaplán og dagskrá</h2>

<p>Starfsmaður veiknar. Þú hringir í annan. Hann getur ekki. Þú uppfærir Excel-skjalið. Sendir á alla á WhatsApp. Einhver sér ekki. Þú hringir.</p>

<p>Þetta er ekki vandamál sem kerfið þitt bjó til — þetta er vandamál sem kerfið þitt gæti leyst. Sjálfkrafa tilkynningar, sjálfkrafa uppfærslur, sjálfkrafa samhæfing.</p>

<p>Rannsóknir sýna að handvirk gagnafærsla og dagskrástjórnun kostar fyrirtæki <strong>3–5 klukkustundir á viku</strong> í meðaltali. Hjá þér gæti þetta verið meira.</p>

<h2>5. Mánaðarleg skýrsla sem er gerð handvirkt</h2>

<p>Í lok mánaðar sækir þú tölurnar úr einu kerfi. Setur þær inn í annað. Leiðréttir formatið. Reiknar. Skoðar. Sendir eða kynnir.</p>

<p>3–4 klukkustundir á mánuð. <strong>36–48 klukkustundir á ári.</strong></p>

<p>Og ef eitthvað er rangt í gögnunum þegar þú ert búinn — þá byrjar þú aftur.</p>

<h2>Hvað þýðir þetta í krónum?</h2>

<p>Við skulum vera íhaldssöm. Við segjum að þú eyðir <strong>10 klukkustundum á viku</strong> í þessa fimm hluti. Það er minna en meðaltalið.</p>

<p>Meðal tímagjald í þjónustugreinum á Íslandi — með launakostnaði og álagi — er um <strong>5.000 kr á klukkustund.</strong></p>

<ul>
  <li>10 klst/viku × 5.000 kr = <strong>50.000 kr/viku</strong></li>
  <li>× 48 vikur á ári = <strong>2.400.000 kr/ár</strong></li>
</ul>

<p>Þetta eru 2,4 milljónir króna sem fara í að halda kerfinu gangandi — í stað þess að fara í sölu, þjónustu eða hvíld.</p>

<p>Og þetta er bara tíminn. Þetta tekur ekki með þreytuna, mistökin sem gerast þegar maður er að gera eitthvað handvirkt, eða tækifærin sem glatast þegar þú ert í þessum verkefnum.</p>

<h2>Hvar tapar þitt fyrirtæki tíma?</h2>

<p>Þetta eru fimm algeng svæði. Hjá þér gætu verið fleiri — eða önnur. Það fer eftir rekstrinum.</p>

<p>Við hjá LioraTech bjóðum upp á ókeypis tímagreiningu þar sem við skoðum nákvæmlega hvar þú eyðir tíma í verkefni sem hægt er að gera sjálfvirk. Þú færð skýra mynd — án þess að þurfa að kaupa neitt.</p>

<p><strong>Viltu vita nákvæmlega hvar þitt fyrirtæki tapar tíma?</strong> Hafðu samband og við setjum upp fund — það kostar þig ekkert.</p>`

const body_c007 = `<p>Þú notar ChatGPT á hverjum degi. Þú ert enn að eyða 10 klukkustundum á viku í handvinnu. Hvernig gengur?</p>

<p>Þetta er ekki gagnrýni. Þetta er spurning sem við heyrum oft þegar við tölum við fyrirtæki. Eigandinn notar AI. Starfsmennirnir nota AI. Allir eru spenntir fyrir tækninni.</p>

<p>En reksturinn keyrir nákvæmlega eins og hann gerði fyrir tveimur árum.</p>

<p>Ástæðan er einföld: það er munur á því að <em>nota</em> AI og því að <em>innleiða</em> AI. Og það er munurinn sem skiptir máli.</p>

<h2>Hvað er munurinn nákvæmlega?</h2>

<p>Þegar þú opnar ChatGPT og biður hann um að hjálpa þér að skrifa tölvupóst — þá er það ad-hoc notkun. Þú notar tólið þegar þér dettur það í hug. Niðurstaðan er góð. En hún fer á skjáborðið þitt og ekki lengra.</p>

<p>AI innleiðing er eitthvað annað. Þar er AI <strong>innbyggt í ferlana sem reksturinn keyrir á.</strong> Það gerist sjálfkrafa. Þú þarft ekki að hugsa um það. Kerfið sér um það.</p>

<ul>
  <li><strong>Ad-hoc notkun:</strong> Þú skrifar tölvupóst með ChatGPT. Tekur 2 mínútur í stað 5.</li>
  <li><strong>AI innleiðing:</strong> Þegar bókun berst, sendir kerfið sjálfkrafa staðfestingu, bætir í dagatal og sendir áminning daginn áður. Þú gerir ekkert.</li>
</ul>

<p>Báðar leiðirnar nota AI. Önnur sparar þér 3 mínútur. Hin sparar þér 2 klukkustundir á viku — alla ævi rekstrarins.</p>

<h2>3 dæmi um raunverulega AI innleiðingu</h2>

<h2>Dæmi 1: Bókanir og staðfestingar</h2>

<p>Viðskiptavinur bókar tíma á netinu. Kerfið þekkir hvern er að bóka, hvað hann er að bóka og hvenær. AI sér um að senda rétta staðfestingu — persónulega, ekki stöðluða. Kerfið sér um áminninguna daginn áður. Ef viðskiptavinurinn hættir við — uppfærist dagatalið sjálfkrafa og annar getur bókað.</p>

<p>Þú gerir ekkert af þessu. Þú sérð bara í dagatalinu þinn tíma og mætir.</p>

<h2>Dæmi 2: Algengar spurningar og þjónustuver</h2>

<p>Viðskiptavinur sendir Facebook-skilaboð kl. 22:00: "Hvað kostar meðferðin?" Kerfið svarar strax. Persónulegt svar, nákvæmt, með verðið og hvernig á að bóka.</p>

<p>Ef spurningin er flóknari — einhver kvörtun eða sérstakt vandamál — fær manneskjan tilkynningu og svarar. Kerfið síaði allt hið einfalda burtu.</p>

<p>Gallup rannsóknir sýna að <strong>75% fyrirtækja nota AI</strong> einhvern tímann — en aðeins <strong>24%</strong> hafa innleitt það í raunveruleg ferla. Þú getur verið í þeim 24%.</p>

<h2>Dæmi 3: Mánaðarleg skýrslugerð</h2>

<p>Í stað þess að fara í gegnum gögn handvirkt í lok mánaðar — safnast þau sjálfkrafa. AI setur saman skýrsluna. Þú opnar hana, lest hana, tekur ákvarðanir. Þú eyðir 15 mínútum í stað 3–4 klukkustunda.</p>

<p>Sama gögnin. Sama niðurstaðan. Önnur upplifun.</p>

<h2>Af hverju gerir fólk þetta ekki?</h2>

<p>Við heyrum þrjár ástæður aftur og aftur.</p>

<p><strong>"Við erum of lítil."</strong><br>
Þetta er algengasta misskilningurinn. AI innleiðing hentar best lítil fyrirtæki — þar sem ein manneskja þarf að gera meira. Stór fyrirtæki hafa þegar fólk til að gera þessi verkefni. Þú hefur ekki. Þess vegna er sjálfvirkni meira þess virði hjá þér.</p>

<p><strong>"Við þurfum tæknifræðing."</strong><br>
Ekki lengur. Verkfæri eins og Make, n8n og Zapier eru hönnuð fyrir fólk sem kann ekki að skrifa kóða. Flest innleiðingar sem við gerum hjá LioraTech krefjast engrar forritunarkunnáttu. Þær eru tengingar á milli kerfa sem þú ert þegar að nota.</p>

<p><strong>"Við vitum ekki hvar á að byrja."</strong><br>
Þetta er eina ástæðan sem við tökum alvarlega. Hér er svarið: byrjaðu á greiningu. Skoðaðu hvað þú ert að gera hvern dag. Finndu þrjú verkefni sem þú ert alltaf að gera á sama máta. Þar er upphafspunkturinn.</p>

<h2>Hvað þýðir 10 klukkustundir á viku í krónum?</h2>

<p>Við reiknuðum þetta í annarri grein, en hér er hún aftur:</p>

<ul>
  <li>10 klst/viku × 5.000 kr/klst = 50.000 kr/viku</li>
  <li>× 48 vikur = <strong>2.400.000 kr/ár</strong></li>
</ul>

<p>Þetta er launakostnaður á verkefnum sem kerfið gæti séð um. Eða þú gætir nýtt þennan tíma í sölu, þróun, eða bara í að vinna minna.</p>

<p>Samanburðurinn við ad-hoc notkun ChatGPT: ef þú sparar 30 mínútur á dag með ChatGPT og nýtir þann tíma vel — er það u.þ.b. <strong>625.000 kr/ár</strong> í virði. Gott. En fjórðungur af innleiðingarsparnaðinum.</p>

<p>Við erum ekki að segja að þú eigir að hætta að nota ChatGPT. Við erum að segja að það er ekki sama og innleiðing. Þau eru bæði góð — en þau eru ekki sama hluturinn.</p>

<h2>Hvar byrjarðu?</h2>

<p>Við hjá LioraTech gerum ókeypis greiningu þar sem við skoðum reksturinn þinn og finnum þrjú til fimm svæði þar sem AI innleiðing skilar mestum árangri — með raunverulegum tölum á hverjum stað.</p>

<p>Þetta er ekki söluferli. Þetta er greining. Þú ferð með mynd af rekstrinum þínum. Hvort sem þú velur að vinna með okkur eða ekki.</p>

<p><strong>Vilt þú vita hvar þú getur byrjað?</strong> Hafðu samband og við finnum tíma.</p>`

export const blogPosts: BlogPost[] = [
  {
    id: 'c-001',
    slug: 'hversu-margar-klukkustundir',
    image: '/blog/blog-timi-og-sparnadur.jpg',
    title: 'Hversu margar klukkustundir eyðir þú í þessa 5 hluti á viku?',
    excerpt: 'Flest fyrirtæki eyða 10–15 klukkustundum á viku í verkefni sem hægt er að sjálfvirknivæða. Hér eru helstu syndararnir.',
    pillar: 1,
    pillarName: 'Tími og sparnaður',
    format: 'blog',
    readTime: 5,
    publishedAt: '2026-04-02T00:00:00.000Z',
    featured: true,
    body: body_c001,
  },
  {
    id: 'c-003',
    slug: 'ai-i-bokunarkerfi',
    title: 'Hvað gerist þegar þú notar AI í bókunarkerfi — raunverulegt dæmi',
    excerpt: 'Við hjálpuðum þjónustufyrirtæki að setja upp sjálfvirkt bókunarkerfi. Hér er hvað gerðist.',
    pillar: 4,
    pillarName: 'Case studies',
    format: 'blog',
    readTime: 4,
    publishedAt: '2026-04-02T00:00:00.000Z',
    featured: false,
    body: '<p>Placeholder — grein kemur fljótlega.</p>',
  },
  {
    id: 'c-007',
    slug: 'chatgpt-er-ekki-ai-innleiding',
    image: '/blog/blog-chatgpt-vs-innleiding.jpg',
    title: 'ChatGPT er ekki AI-innleiðing. Þetta er munurinn',
    excerpt: 'Að nota ChatGPT á hverjum degi er gott — en það er ekki sama og að innleiða AI í reksturinn þinn.',
    pillar: 3,
    pillarName: 'AI í daglega rekstri',
    format: 'blog',
    readTime: 6,
    publishedAt: '2026-04-02T00:00:00.000Z',
    featured: false,
    body: body_c007,
  },
]
