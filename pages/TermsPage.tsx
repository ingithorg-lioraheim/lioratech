import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

export default function TermsPage() {
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
          <h1 className="text-4xl md:text-5xl font-bold text-brand-dark mb-4">Skilmálar og Kjör</h1>
          <p className="text-sm text-gray-500 mb-12">
            <strong>Síðast uppfært:</strong> 29. desember 2025
          </p>

          <div className="prose prose-lg max-w-none space-y-8">

            {/* Intro */}
            <section className="text-gray-700">
              <p>
                Velkomin á lioratech.is. Með því að nota vefsíðuna okkar og þjónustu samþykkir þú eftirfarandi skilmála og kjör.
                Vinsamlegast lestu þá vandlega áður en þú notar þjónustuna okkar.
              </p>
            </section>

            {/* 1. Skilgreiningar */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">1. Skilgreiningar</h2>
              <ul className="list-disc list-inside space-y-3 text-gray-700 ml-4">
                <li><strong className="text-brand-dark">"LioraTech"</strong> eða <strong className="text-brand-dark">"við"</strong> vísar til Lioraheim ehf., kt. 660625-1860</li>
                <li><strong className="text-brand-dark">"Þjónusta"</strong> vísar til allra þjónustu sem LioraTech býður upp á, þar með talið AI-greining, 30 daga framkvæmdaáætlanir og sérsniðnar lausnir</li>
                <li><strong className="text-brand-dark">"Viðskiptavinur"</strong> eða <strong className="text-brand-dark">"þú"</strong> vísar til einstaklinga eða fyrirtækja sem nota þjónustu okkar</li>
                <li><strong className="text-brand-dark">"Greining"</strong> vísar til frírar AI-greiningar á viðskiptamöguleikum</li>
                <li><strong className="text-brand-dark">"30 daga plan"</strong> vísar til nákvæmrar framkvæmdaáætlunar sem keypt er fyrir 69.900 ISK</li>
              </ul>
            </section>

            {/* 2. Þjónusta */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">2. Þjónustulýsing</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">2.1 Frí AI Greining</h3>
              <p className="text-gray-700 leading-relaxed">
                LioraTech býður upp á fría AI-drifna greiningu á viðskiptamöguleikum fyrir íslensk SMB fyrirtæki.
                Greiningin er afhent í pdf-formi innan 24 klukkustunda og inniheldur 3-5 skýr tækifæri raðað eftir mögulegum áhrifum.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">2.2 30 Daga Framkvæmdaáætlun</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Gegn greiðslu veitir LioraTech nákvæma 30 daga framkvæmdaáætlun sem inniheldur:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Ítarlega greiningu á völdu tækifæri</li>
                <li>Skref-fyrir-skref leiðbeiningar</li>
                <li>Tímalínu og forgangsröðun</li>
                <li>Áhættumöt og mótvægisaðgerðir</li>
                <li>Mælikvarða til að fylgjast með árangri</li>
              </ul>
              <p className="mt-4 text-gray-700">
                <strong className="text-brand-dark">Verð:</strong> 69.900 ISK (virðisaukaskattur innifalinn)
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">2.3 Sérsniðnar Lausnir</h3>
              <p className="text-gray-700 leading-relaxed">
                LioraTech býður einnig upp á sérsniðnar AI-innleiðingarlausnir. Verðtilboð er gefið út fyrir hvert verkefni fyrir sig
                eftir umfang og þarfir viðskiptavinar.
              </p>
            </section>

            {/* 3. Greiðsluskilmálar */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">3. Greiðsluskilmálar</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.1 Greiðslumátar</h3>
              <p className="text-gray-700 leading-relaxed">
                Fyrir 30 daga framkvæmdaáætlun þarf að greiða með kredit-/debetkortum í gegnum örugga greiðslugátt Rapyd.
                Fyrir sérsniðnar lausnir gefum við út reikninga sem greiða þarf innan 30 daga frá útgáfudegi.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.2 Greiðsla fyrir afhendingu</h3>
              <p className="text-gray-700 leading-relaxed">
                Greiðsla fyrir 30 daga framkvæmdaáætlun þarf að fara fram áður en vinna hefst. Greiningin verður afhent innan
                3-5 virkra daga frá greiðsludegi.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">3.3 Verðbreytingar</h3>
              <p className="text-gray-700 leading-relaxed">
                LioraTech áskilur sér rétt til að breyta verði með 14 daga fyrirvara. Verðbreytingar hafa ekki áhrif á
                þjónustu sem þegar hefur verið greidd fyrir.
              </p>
            </section>

            {/* 4. Endurgreiðslustefna */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">4. Endurgreiðslustefna</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.1 Skilyrði fyrir endurgreiðslu</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við bjóðum upp á endurgreiðslu á 30 daga framkvæmdaáætlun ef:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Greiningin er ekki í takt við rekstur og starfsemi fyrirtækisins</li>
                <li>Greiningin inniheldur verulegar staðreyndaskekkjur</li>
                <li>Þjónustan var ekki afhent innan tilgreinds tímaramma</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.2 Tímamörk</h3>
              <p className="text-gray-700 leading-relaxed">
                Beiðni um endurgreiðslu þarf að berast innan 14 daga frá afhendingu greiningarinnar ásamt rökstuddri
                skýringu á því hvers vegna greiningin uppfyllir ekki skilyrði.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.3 Ferli</h3>
              <p className="text-gray-700 leading-relaxed">
                Endurgreiðslubeiðni skal send á <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a>.
                Við munum fara yfir beiðnina og svara innan 5 virkra daga. Ef endurgreiðsla er samþykkt verður hún innt af
                hendi innan 10 virkra daga á sama greiðslumáta og notaður var við kaup.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">4.4 Undantekningar</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Endurgreiðsla á sér ekki stað ef:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Viðskiptavinur veitti rangar eða ófullnægjandi upplýsingar</li>
                <li>Greiningin var notuð eða innleidd að hluta eða í heild</li>
                <li>Beiðni um endurgreiðslu kemur eftir 14 daga tímamörk</li>
              </ul>
            </section>

            {/* 5. Hugverkaréttindi */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">5. Hugverkaréttindi</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">5.1 Eignarhald á greiningum</h3>
              <p className="text-gray-700 leading-relaxed">
                Viðskiptavinur á fullan hugverkarétt að greiningunni og 30 daga framkvæmdaáætluninni sem afhent er.
                Viðskiptavinur hefur rétt til að nota, breyta, og innleiða innihald greiningarinnar að eigin geðþótta.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">5.2 Afrit hjá LioraTech</h3>
              <p className="text-gray-700 leading-relaxed">
                LioraTech áskilur sér rétt til að geyma afrit af öllum greiningum og áætlunum í þágu gæðaeftirlits,
                lagalegra krafna, og bættrar þjónustu.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">5.3 Hugbúnaður og vörumerki</h3>
              <p className="text-gray-700 leading-relaxed">
                Öll hugverkaréttindi tengd vefsíðu, hönnun, vörumerkjum, og hugbúnaði LioraTech eru í eigu Lioraheim ehf.
                og eru vernduð af íslenskum og alþjóðlegum lögum um hugverkarétt.
              </p>
            </section>

            {/* 6. Gagnanotkun og persónuvernd */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">6. Gagnanotkun og Persónuvernd</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">6.1 Söfnun gagna</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LioraTech safnar upplýsingum sem viðskiptavinir veita í greiningarformum, þar á meðal:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Nafn og netfang tengiliðar</li>
                <li>Fyrirtækjaupplýsingar (nafn, starfsemi, árlegar tekjur, fjöldi starfsmanna)</li>
                <li>Markmið og áskoranir fyrirtækisins</li>
                <li>Skrár og viðhengi sem viðskiptavinur hleður upp</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">6.2 Notkun gagna</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Við notum gögnin til að:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Búa til nákvæmar og viðeigandi AI-greiningar</li>
                <li>Bæta gæði og nákvæmni AI-módelanna okkar</li>
                <li>Senda niðurstöður og fylgigögn</li>
                <li>Veita viðskiptavinaþjónustu</li>
                <li>Uppfylla lagalegar skuldbindingar</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">6.3 Deilding gagna</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LioraTech deilir ekki persónuupplýsingum eða viðskiptaupplýsingum til þriðju aðila nema:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Með skýlausu samþykki viðskiptavinar</li>
                <li>Við þjónustuveitendur sem aðstoða okkur (t.d. greiðsluvinnsla, geymsla)</li>
                <li>Þegar lög eða reglugerðir krefjast þess</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">6.4 Gagnaöryggi</h3>
              <p className="text-gray-700 leading-relaxed">
                Við notum viðeigandi tæknilegar og skipulagslegar aðgerðir til að vernda gögnin þín gegn óheimilli
                aðgangi, breytingum, birtingu eða eyðingu.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">6.5 Réttindi viðskiptavina</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Samkvæmt persónuverndarlögum hefur þú rétt til að:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Fá aðgang að gögnum sem við höfum um þig</li>
                <li>Biðja um leiðréttingu á röngum upplýsingum</li>
                <li>Biðja um eyðingu persónuupplýsinga</li>
                <li>Mótmæla tiltekinni vinnslu gagna</li>
              </ul>
              <p className="mt-4 text-gray-700">
                Hafðu samband á <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a> til
                að nýta þessi réttindi.
              </p>
            </section>

            {/* 7. Takmarkanir á ábyrgð */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">7. Takmarkanir á Ábyrgð</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.1 Eðli þjónustunnar</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                AI-greiningarnar og framkvæmdaáætlanirnar eru ráðleggingar byggðar á upplýsingum sem viðskiptavinur veitir.
                LioraTech ábyrgist ekki:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Tiltekinn viðskiptalegan árangur eða tekjuaukningu</li>
                <li>Að allar tillögur séu framkvæmanlegar í öllum tilfellum</li>
                <li>Að niðurstöður verði nákvæmlega eins og spáð var fyrir um</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.2 Ábyrgðartakmarkanir</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LioraTech ber ekki ábyrgð á:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Óbeinum, tilfallandi eða afleiddum tjónum</li>
                <li>Tapaðri hagnaði eða tekjum</li>
                <li>Gagnamissi eða skemmdum</li>
                <li>Tjóni sem stafar af röngum eða ófullnægjandi upplýsingum frá viðskiptavini</li>
              </ul>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.3 Hámarksábyrgð</h3>
              <p className="text-gray-700 leading-relaxed">
                Heildarábyrgð LioraTech gagnvart viðskiptavini skal aldrei fara fram úr þeirri upphæð sem viðskiptavinur
                greiddi fyrir þjónustuna sem ágreiningur snýst um.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">7.4 Ábyrgð viðskiptavinar</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                Viðskiptavinur ber ábyrgð á:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Að veita nákvæmar og fullnægjandi upplýsingar</li>
                <li>Mat á því hvort tillögur séu viðeigandi fyrir viðkomandi fyrirtæki</li>
                <li>Innleiðingu og framkvæmd ráðlegginga</li>
                <li>Að fara eftir gildandi lögum og reglugerðum við innleiðingu</li>
              </ul>
            </section>

            {/* 8. Uppsögn og stöðvun */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">8. Uppsögn og Stöðvun Þjónustu</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">8.1 Uppsögn af hálfu viðskiptavinar</h3>
              <p className="text-gray-700 leading-relaxed">
                Viðskiptavinur getur hætt við pöntun áður en vinna hefst með því að hafa samband á
                <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold"> ingi@lioratech.is</a>.
                Full endurgreiðsla á sér þá stað innan 5 virkra daga.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">8.2 Uppsögn af hálfu LioraTech</h3>
              <p className="text-gray-700 leading-relaxed mb-4">
                LioraTech áskilur sér rétt til að neita þjónustu eða stöðva vinnu ef:
              </p>
              <ul className="list-disc list-inside space-y-2 ml-4 text-gray-700">
                <li>Viðskiptavinur brýtur gegn þessum skilmálum</li>
                <li>Viðskiptavinur vanrækir að veita nauðsynlegar upplýsingar</li>
                <li>Starfsemin eða markmið eru ólögleg eða siðferðislega vafasöm</li>
                <li>Greiðsla hefur verið synjað eða afturkölluð</li>
              </ul>
              <p className="mt-4 text-gray-700 leading-relaxed">
                Ef LioraTech stöðvar þjónustu af ástæðum sem rekja má til viðskiptavinar ber LioraTech ekki að endurgreiða
                greiddar upphæðir.
              </p>
            </section>

            {/* 9. Breytingar á skilmálum */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">9. Breytingar á Skilmálum</h2>
              <p className="text-gray-700 leading-relaxed mb-4">
                LioraTech áskilur sér rétt til að uppfæra þessa skilmála hvenær sem er. Breytingar taka gildi þegar
                uppfærðir skilmálar eru birtir á vefsíðunni. Viðskiptavinir verða tilkynntir um verulegar breytingar
                með tölvupósti ef við höfum aðgang að netfangi.
              </p>
              <p className="text-gray-700 leading-relaxed">
                Áframhaldandi notkun þjónustunnar eftir birtingu breyttra skilmála þýðir samþykki á nýjum skilmálum.
              </p>
            </section>

            {/* 10. Gildandi lög */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">10. Gildandi Lög og Úrlausn Ágreinings</h2>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">10.1 Löggjöf</h3>
              <p className="text-gray-700 leading-relaxed">
                Þessir skilmálar og öll þjónusta LioraTech fellur undir íslensk lög.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">10.2 Dómstólar</h3>
              <p className="text-gray-700 leading-relaxed">
                Allur ágreiningur sem kann að koma upp vegna þessara skilmála eða þjónustunnar skal leystur fyrir
                Héraðsdómi Reykjavíkur.
              </p>

              <h3 className="text-2xl font-semibold text-brand-primary mt-8 mb-4">10.3 Samningur</h3>
              <p className="text-gray-700 leading-relaxed">
                Við hvetjum viðskiptavini til að hafa samband við okkur áður en lagalegar ráðstafanir eru gripið til.
                Markmið okkar er alltaf að leysa ágreining á vingjarnlegan og sanngjarn hátt.
              </p>
            </section>

            {/* 11. Tengiliðaupplýsingar */}
            <section>
              <h2 className="text-3xl font-bold text-brand-dark mt-12 mb-6 border-b-2 border-brand-primary pb-2">11. Tengiliðaupplýsingar</h2>
              <p className="text-gray-700 leading-relaxed mb-6">
                Ef þú hefur spurningar um þessa skilmála eða þjónustu okkar, vinsamlegast hafðu samband:
              </p>
              <div className="bg-gray-50 border-l-4 border-brand-primary rounded-r-lg p-6 space-y-2">
                <p className="text-brand-dark"><strong className="font-bold">Lioraheim ehf.</strong></p>
                <p className="text-gray-700">Kennitala: 660625-1860</p>
                <p className="text-gray-700">Netfang: <a href="mailto:ingi@lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">ingi@lioratech.is</a></p>
                <p className="text-gray-700">Símanúmer: +354 696 0156</p>
                <p className="text-gray-700">Vefsíða: <a href="https://lioratech.is" className="text-brand-primary hover:text-brand-dark font-semibold">lioratech.is</a></p>
              </div>
            </section>

            {/* Samþykki */}
            <section className="mt-16 pt-8 border-t-2 border-gray-200">
              <p className="text-sm text-gray-600 italic">
                Með því að nota þjónustu LioraTech staðfestir þú að þú hafir lesið, skilið og samþykkt þessa skilmála og kjör.
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
