import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white font-sans text-brand-dark">
      {/* Header */}
      <header className="border-b border-gray-100 bg-white sticky top-0 z-50 shadow-sm">
        <div className="container mx-auto px-6 py-4 flex items-center justify-between">
          <Link to="/" className="text-2xl font-serif font-bold text-gray-800">
            Liora<span className="text-brand-primary">Tech</span>
          </Link>
          <Link
            to="/"
            className="text-gray-600 hover:text-brand-primary transition-colors flex items-center gap-2"
          >
            <ArrowLeft size={20} />
            <span className="hidden sm:inline">Til baka</span>
          </Link>
        </div>
      </header>

      {/* Content */}
      <div className="container mx-auto px-6 py-16 max-w-4xl">
        <div className="bg-white">
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Persónuverndarstefna</h1>
          <p className="text-sm text-gray-500 mb-12">
            <strong>Gildistökudagur:</strong> 12. mars 2026
          </p>

          <div className="prose prose-lg max-w-none space-y-8">

            {/* Inngangur */}
            <section className="text-gray-700">
              <p>
                Lioraheim ehf. (sem rekur LioraTech) tekur persónuvernd mjög alvarlega. Þessi persónuverndarstefna lýsir því
                hvaða persónuupplýsingar við söfnum, hvernig við notum þær, réttindi þín og hvernig við verndum þær.
                Stefnan er sett fram í samræmi við lög nr. 90/2018 um persónuvernd og vinnslu persónuupplýsinga og
                Reglugerð Evrópuþingsins og ráðsins (ESB) 2016/679 (GDPR).
              </p>
            </section>

            {/* 1. Ábyrgðaraðili */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">1. Ábyrgðaraðili Gagna</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ábyrgðaraðili vinnslu persónuupplýsinga samkvæmt þessari stefnu er:
              </p>
              <div className="bg-gray-50 border-l-4 border-brand-primary rounded-r-lg p-6 space-y-2">
                <p className="text-brand-dark"><strong className="font-bold">Lioraheim ehf.</strong></p>
                <p className="text-gray-700">Kennitala: 660625-1860</p>
                <p className="text-gray-700">Netfang: <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a></p>
                <p className="text-gray-700">Símanúmer: +354 696 0156</p>
                <p className="text-gray-700">Vefsíða: <a href="https://lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">lioratech.is</a></p>
              </div>
            </section>

            {/* 2. Hvaða gögn við söfnum */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">2. Hvaða Persónuupplýsingar Við Söfnum</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">2.1 Upplýsingar sem þú veitir beint</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Þegar þú hefur samband við okkur í gegnum samskiptaform á vefsíðunni eða Meta Lead Ads, söfnum við eftirfarandi upplýsingum:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li><strong className="text-brand-dark">Nafn</strong> – til að geta ávarpa þig persónulega</li>
                <li><strong className="text-brand-dark">Netfang</strong> – til að hafa samband og senda þér upplýsingar</li>
                <li><strong className="text-brand-dark">Símanúmer</strong> – ef þú velur að veita það, til að geta haft símasamband</li>
                <li><strong className="text-brand-dark">Fyrirtækjanafn og starfssvið</strong> – ef við á, til að geta sérsniðið þjónustu okkar</li>
                <li><strong className="text-brand-dark">Skilaboð og spurningar</strong> – innihald þess sem þú skrifar í samskiptaform</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">2.2 Upplýsingar sem safnast sjálfkrafa</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Þegar þú heimsækir lioratech.is safnast eftirfarandi upplýsingar sjálfkrafa í gegnum vafrakökur og greiningartæki:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li><strong className="text-brand-dark">IP-tala</strong> – lýsandi staðsetningaupplýsingar (land/borg, ekki nákvæm staðsetning)</li>
                <li><strong className="text-brand-dark">Vafragerð og stýrikerfi</strong> – tæknilegar upplýsingar um tækið þitt</li>
                <li><strong className="text-brand-dark">Síður sem þú heimsækir</strong> – til að skilja hvernig notendur nota vefsíðuna</li>
                <li><strong className="text-brand-dark">Tími heimsókna og dvöl</strong> – til að greina notkun og bæta upplifun</li>
                <li><strong className="text-brand-dark">Tilvísunarsíður</strong> – hvaðan þú komst á vefsíðuna</li>
              </ul>
            </section>

            {/* 3. Hvernig við notum gögnin */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">3. Tilgangur og Lagalegur Grundvöllur Vinnslu</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.1 Að svara fyrirspurnum og hafa samband</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong className="text-brand-dark">Tilgangur:</strong> Við notum nafn, netfang og símanúmer til að svara fyrirspurnum, senda tilboð og fylgja eftir samskiptum.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-brand-dark">Lagalegur grundvöllur:</strong> Réttmætir hagsmunir (6. gr. 1. mgr. f. lið GDPR) – við höfum lögmætan áhuga á að svara þeim sem hafa samband við okkur.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.2 Að veita þjónustu</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong className="text-brand-dark">Tilgangur:</strong> Við notum upplýsingarnar til að undirbúa og afhenda AI-greiningar og ráðgjöf.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-brand-dark">Lagalegur grundvöllur:</strong> Samningur (6. gr. 1. mgr. b. lið GDPR) – vinnslan er nauðsynleg til að efna samning.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.3 Markaðssetning og kynning</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong className="text-brand-dark">Tilgangur:</strong> Ef þú hefur gefið samþykki, getum við sent þér fréttir og tilboð um þjónustu okkar.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-brand-dark">Lagalegur grundvöllur:</strong> Samþykki (6. gr. 1. mgr. a. lið GDPR) – þú getur afturkallað samþykki hvenær sem er með því að senda tölvupóst á <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a>.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.4 Greining og umbætur á vefsíðu</h3>
              <p className="text-gray-700 leading-relaxed mb-2">
                <strong className="text-brand-dark">Tilgangur:</strong> Við notum gögn úr greiningartækjum til að skilja hvernig vefsíðan er notuð og til að bæta upplifun notenda.
              </p>
              <p className="text-gray-700 leading-relaxed">
                <strong className="text-brand-dark">Lagalegur grundvöllur:</strong> Samþykki (6. gr. 1. mgr. a. lið GDPR) – við innleiðum vafrakökusamþykki áður en greiningarvafrakökur eru settar.
              </p>
            </section>

            {/* 4. Vafrakökur og rakning */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">4. Vafrakökur og Rakningstæki</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Vefsíðan notar vafrakökur (cookies) og svipuð tækni. Nauðsynlegar vafrakökur eru settar án samþykkis,
                en greiningarvafrakökur og markaðsvafrakökur krefjast samþykkis þíns.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.1 Google Analytics</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við notum Google Analytics (Google LLC) til að greina umferð og notkun á vefsíðunni.
                Google Analytics safnar nafnlausum (anonymized) gögnum um hegðun notenda.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Gögn eru send til Google og geymd á netþjónum Google (gætu verið utan EES)</li>
                <li>Við höfum virkjað IP-nafnleysi (IP anonymization)</li>
                <li>Þú getur afþakkað Google Analytics með Google Analytics Opt-out Browser Add-on</li>
                <li>Frekari upplýsingar: <span className="text-gray-600">policies.google.com/privacy</span></li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.2 Meta Pixel (Facebook)</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við notum Meta Pixel (Meta Platforms, Inc.) til að mæla árangur auglýsinga og sýna viðeigandi auglýsingar á Facebook og Instagram.
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Meta Pixel safnar gögnum um aðgerðir á vefsíðunni (t.d. heimsóknir, innsending forms)</li>
                <li>Gögn eru send til Meta og gætu verið unnin utan EES</li>
                <li>Þú getur stjórnað auglýsingastillingum á: <span className="text-gray-600">facebook.com/ads/preferences</span></li>
                <li>Frekari upplýsingar: <span className="text-gray-600">facebook.com/privacy/explanation</span></li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.3 Nauðsynlegar vafrakökur</h3>
              <p className="text-gray-700 leading-relaxed">
                Sumar vafrakökur eru nauðsynlegar til að vefsíðan virki rétt, t.d. til að geyma samþykki vafrakakaval þíns.
                Þessar vafrakökur krefjast ekki samþykkis.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.4 Stjórnun vafrakakaval</h3>
              <p className="text-gray-700 leading-relaxed">
                Þú getur stjórnað og eytt vafrakökum í gegnum stillingar vafrans þíns. Athugaðu að ef þú lokar á
                allar vafrakökur gæti hluti vefsíðunnar ekki virkað sem skyldi.
              </p>
            </section>

            {/* 5. Deilding gagna */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">5. Deilding Persónuupplýsinga</h2>

              <p className="text-gray-700 leading-relaxed mb-4">
                <strong className="text-brand-dark">LioraTech deilir ekki persónuupplýsingum með þriðja aðilum</strong> nema í eftirfarandi tilvikum:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li>
                  <strong className="text-brand-dark">Lagaleg skylda:</strong> Ef lög, reglugerðir eða dómsúrskurðir krefjast þess að við deilum upplýsingum með stjórnvöldum eða dómstólum.
                </li>
                <li>
                  <strong className="text-brand-dark">Þjónustuaðilar:</strong> Við gætum deilt gögnum með treystum þjónustuaðilum sem aðstoða okkur við rekstur (t.d. tækniþjónusta, greiðslumiðlun) sem eru bundnir trúnaðar- og vinnslusamningum.
                </li>
                <li>
                  <strong className="text-brand-dark">Samþykki þitt:</strong> Við gætum deilt gögnum með öðrum aðilum ef þú hefur gefið skýrt samþykki.
                </li>
              </ul>
              <p className="mt-6 text-gray-700 leading-relaxed">
                Við selja aldrei persónuupplýsingar eða deilum þeim í markaðslegum tilgangi.
              </p>
            </section>

            {/* 6. Millifærslur til þriðju landa */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">6. Millifærslur til Þriðju Landa</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Sum greiningartæki (Google Analytics, Meta Pixel) kunna að flytja gögn til Bandaríkjanna og annarra landa
                utan Evrópska efnahagssvæðisins (EES). Slíkar millifærslur eru framkvæmdar á grundvelli:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Staðlaðra samningsskilmála (Standard Contractual Clauses) samþykktra af Framkvæmdastjórn ESB</li>
                <li>Viðeigandi verndarráðstafana skv. 46. gr. GDPR</li>
              </ul>
            </section>

            {/* 7. Geymsla og eyðing */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">7. Geymsla og Eyðing Gagna</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.1 Geymslutími</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við geymum persónuupplýsingar einungis eins lengi og þörf er á fyrir þann tilgang sem þær voru safnaðar:
              </p>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li><strong className="text-brand-dark">Samskiptagögn</strong> (netfang, nafn, símanúmer úr forms): allt að 3 ár frá síðasta samskipti</li>
                <li><strong className="text-brand-dark">Þjónustugögn</strong> (tengd keyptri þjónustu): allt að 7 ár vegna bókhaldsskyldu</li>
                <li><strong className="text-brand-dark">Greiningargögn</strong> (Google Analytics): 26 mánuðir (í samræmi við stillingar Google)</li>
                <li><strong className="text-brand-dark">Markaðsgögn</strong> (Meta Pixel): í samræmi við stefnu Meta, allt að 180 dagar</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.2 Öryggi gagna</h3>
              <p className="text-gray-700 leading-relaxed">
                Við notum viðeigandi tæknilegar og skipulagslegar öryggisráðstafanir til að vernda persónuupplýsingar
                gegn óheimilum aðgangi, birting, breytingum, misnotkun eða tapi. Öll samskipti við vefsíðuna eru
                dulkóðuð með SSL/TLS.
              </p>
            </section>

            {/* 8. Réttindi einstaklinga */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">8. Réttindi Þín</h2>

              <p className="text-gray-700 leading-relaxed mb-6">
                Samkvæmt lögum um persónuvernd og GDPR hefur þú eftirfarandi réttindi varðandi persónuupplýsingar þínar:
              </p>

              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til aðgangs (15. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að fá staðfestingu á því hvort við vinnum persónuupplýsingar um þig og fá aðgang að þeim.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til leiðréttingar (16. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að biðja um leiðréttingu á röngum eða ófullnægjandi persónuupplýsingum um þig.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til eyðingar ("réttur til gleymskunnar") (17. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að biðja um eyðingu persónuupplýsinga þinna þegar þær eru ekki lengur nauðsynlegar
                    eða þú afturkallar samþykki þitt, að teknu tilliti til lagalegra skyldna okkar.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til takmarkaðrar vinnslu (18. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að biðja um takmörkun á vinnslu persónuupplýsinga þinna í tilteknum tilvikum.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til gagnaflutninga (20. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að fá persónuupplýsingar þínar á skipulögðu, algengu og vélalesanlegu sniði
                    og flytja þær til annars ábyrgðaraðila þar sem við á.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Réttur til mótmæla (21. gr. GDPR)</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þú hefur rétt til að mótmæla vinnslu persónuupplýsinga þinna, þ.m.t. vinnslu í markaðslegum tilgangi.
                  </p>
                </div>
                <div>
                  <h3 className="text-xl font-semibold text-brand-dark mb-2">Afturköllun samþykkis</h3>
                  <p className="text-gray-700 leading-relaxed">
                    Þegar vinnsla er byggð á samþykki getur þú afturkallað það hvenær sem er. Afturköllun hefur ekki
                    afturvirk áhrif á lögmæti vinnslu sem fór fram fyrir afturköllunina.
                  </p>
                </div>
              </div>

              <div className="mt-8 bg-gray-50 border-l-4 border-brand-primary rounded-r-lg p-6">
                <p className="text-gray-700 leading-relaxed">
                  Til að nýta þessi réttindi, eða ef þú hefur spurningar um vinnslu persónuupplýsinga þinna, sendu
                  tölvupóst á <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a>.
                  Við munum svara beiðni þinni innan 30 daga.
                </p>
              </div>
            </section>

            {/* 9. Kvartanir */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">9. Kvartanir til Persónuverndar</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Ef þú telur að vinnsla persónuupplýsinga þinna brjóti í bága við lög um persónuvernd hefurðu rétt til
                að leggja fram kvörtun hjá Persónuvernd (íslenska eftirlitsstofnunin):
              </p>
              <div className="bg-gray-50 border-l-4 border-brand-primary rounded-r-lg p-6 space-y-2">
                <p className="text-brand-dark"><strong className="font-bold">Persónuvernd</strong></p>
                <p className="text-gray-700">Rauðarárstíg 10, 105 Reykjavík</p>
                <p className="text-gray-700">Netfang: <span className="text-gray-600">postur@personuvernd.is</span></p>
                <p className="text-gray-700">Vefsíða: <span className="text-gray-600">personuvernd.is</span></p>
              </div>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Við hvetjum þig þó til að hafa samband við okkur fyrst svo við getum reynt að leysa málið með beinum hætti.
              </p>
            </section>

            {/* 10. Breytingar */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">10. Breytingar á Persónuverndarstefnu</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við kunnum að uppfæra þessa persónuverndarstefnu reglulega til að endurspegla breytingar á þjónustu
                okkar eða lagalegum kröfum. Nýjasta útgáfan er alltaf aðgengileg á <span className="text-gray-600">lioratech.is/personuvernd</span>.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Við verulegar breytingar munum við tilkynna þér með tölvupósti (ef við höfum netfang þitt) eða með
                áberandi tilkynningu á vefsíðunni.
              </p>
            </section>

            {/* 11. Tengiliðaupplýsingar */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">11. Tengiliðaupplýsingar</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ef þú hefur spurningar eða athugasemdir varðandi þessa persónuverndarstefnu eða vinnslu
                persónuupplýsinga þinna, hafðu samband:
              </p>
              <div className="bg-gray-50 border-l-4 border-brand-primary rounded-r-lg p-6 space-y-2">
                <p className="text-brand-dark"><strong className="font-bold">Lioraheim ehf. (LioraTech)</strong></p>
                <p className="text-gray-700">Kennitala: 660625-1860</p>
                <p className="text-gray-700">Netfang: <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a></p>
                <p className="text-gray-700">Símanúmer: +354 696 0156</p>
                <p className="text-gray-700">Vefsíða: <a href="https://lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">lioratech.is</a></p>
              </div>
            </section>

            {/* Gildistökudagur */}
            <section className="mt-16 pt-8 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600 italic">
                Þessi persónuverndarstefna er í gildi frá 12. mars 2026. Lioraheim ehf., kt. 660625-1860.
              </p>
            </section>

          </div>
        </div>

        {/* Back to home button */}
        <div className="mt-12 text-center">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors"
          >
            <ArrowLeft size={20} />
            Til baka á forsíðu
          </Link>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-50 border-t border-gray-100 py-8 mt-16">
        <div className="container mx-auto px-6 text-center text-sm text-gray-500">
          &copy; {new Date().getFullYear()} LioraTech Ráðgjöf. Allur réttur áskilinn.
        </div>
      </footer>
    </div>
  );
}
