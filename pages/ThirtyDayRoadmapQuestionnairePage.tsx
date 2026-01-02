import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { CheckCircle2, ArrowRight, ArrowLeft } from 'lucide-react';

const ThirtyDayRoadmapQuestionnairePage: React.FC = () => {
  const [formData, setFormData] = useState({
    // Section 1: Contact Info
    companyName: '',
    name: '',
    email: '',
    phone: '',
    website: '',

    // Section 2: Company & Operations
    industry: '',
    employees: '',
    operationsDepartment: '',
    targetAudience: '',
    revenueStream: [] as string[],
    dataQuality: '',

    // Section 3: AI Experience & Context
    previousAiExperience: '',
    whatTriggeredInterest: '',
    competitorsUsingAi: '',

    // Section 4: Challenges
    biggestChallenges: '',
    timeTakingTasks: [] as string[],
    timeSavingsPriority1: '',
    timeSavingsPriority2: '',
    timeSavingsPriority3: '',

    // Section 5: Tools, Data & AI
    currentTools: '',
    dataStorage: [] as string[],
    crmName: '',
    aiGoals: '',
    implementationSpeed: '',
    successMetrics: [] as string[],
    monthlyBudget: '',
    supportLevel: '',

    // Section 6: Team & Change
    teamOpenness: '',

    // Section 7: Consultation
    preferredDays: [] as string[],
    preferredTime: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleCheckboxChange = (field: string, value: string) => {
    const currentValues = formData[field as keyof typeof formData] as string[];
    if (currentValues.includes(value)) {
      setFormData({
        ...formData,
        [field]: currentValues.filter(v => v !== value)
      });
    } else {
      setFormData({
        ...formData,
        [field]: [...currentValues, value]
      });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Send to new questionnaire webhook
      const response = await fetch('https://lioratech.app.n8n.cloud/webhook/30-day-questionnaire-submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        const data = await response.json();
        const orderId = data.orderId;

        if (!orderId) {
          throw new Error('No orderId received from server');
        }

        // Store form data and orderId for payment page
        localStorage.setItem('roadmap_order_id', orderId);
        localStorage.setItem('roadmap_form_data', JSON.stringify(formData));

        // Redirect to payment page with orderId
        window.location.href = `/30dagaplan/payment?orderId=${orderId}`;
      } else {
        alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
      }
    } catch (error) {
      console.error('Error:', error);
      alert('Eitthvað fór úrskeiðis. Vinsamlegast reyndu aftur.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-brand-light py-12">
      <div className="container mx-auto px-6 max-w-4xl">
        {/* Back button */}
        <Link to="/30dagaplan" className="inline-flex items-center gap-2 text-brand-primary hover:text-brand-dark transition-colors mb-8">
          <ArrowLeft size={20} />
          <span>Til baka</span>
        </Link>

        <div className="text-center mb-12">
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-brand-dark mb-4">30 Daga Framkvæmdaáætlun</h1>
          <p className="text-gray-600 max-w-2xl mx-auto">Svaraðu spurningum um reksturinn þinn svo við getum búið til sérsniðna 30 daga áætlun.</p>
        </div>

        {submitted ? (
          <div className="bg-green-50 border-2 border-green-200 rounded-2xl p-12 text-center">
            <div className="w-16 h-16 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={32} className="text-white" />
            </div>
            <h3 className="text-2xl font-bold text-brand-dark mb-4">Takk fyrir!</h3>
            <p className="text-gray-600 mb-2">Við höfum móttekið upplýsingarnar þínar og munum senda þér 30 daga áætlun innan 3-5 virkra daga.</p>
            <p className="text-gray-600 mb-8">Athugaðu tölvupóstinn þinn á <span className="font-semibold text-brand-primary">{formData.email}</span></p>
            <Link to="/" className="inline-flex items-center gap-2 px-6 py-3 bg-brand-primary text-white font-semibold rounded-lg hover:bg-brand-dark transition-colors">
              Til baka á forsíðu
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-card border border-gray-100 p-8 md:p-12">
            <form onSubmit={handleSubmit} className="space-y-10">

              {/* Section 1: Contact Information */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">1. Upplýsingar um aðila</h2>
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Nafn fyrirtækis *</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                        placeholder="Fyrirtæki ehf."
                        value={formData.companyName}
                        onChange={(e) => setFormData({...formData, companyName: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Þitt nafn *</label>
                      <input
                        required
                        type="text"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                        placeholder="Jón Jónsson"
                        value={formData.name}
                        onChange={(e) => setFormData({...formData, name: e.target.value})}
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Netfang *</label>
                      <input
                        required
                        type="email"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                        placeholder="jon@fyrirtaeki.is"
                        value={formData.email}
                        onChange={(e) => setFormData({...formData, email: e.target.value})}
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Símanúmer *</label>
                      <input
                        required
                        type="tel"
                        className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                        placeholder="000-0000"
                        value={formData.phone}
                        onChange={(e) => setFormData({...formData, phone: e.target.value})}
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Vefsíða fyrirtækis</label>
                    <input
                      type="url"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      placeholder="https://fyrirtaeki.is"
                      value={formData.website}
                      onChange={(e) => setFormData({...formData, website: e.target.value})}
                    />
                  </div>
                </div>
              </div>

              {/* Section 2: Company & Operations */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">2. Fyrirtæki & rekstur</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Iðnaður *</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      placeholder="T.d. smásala, ráðgjöf, þjónusta, tækni..."
                      value={formData.industry}
                      onChange={(e) => setFormData({...formData, industry: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Fjöldi starfsmanna *</label>
                    <select
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      value={formData.employees}
                      onChange={(e) => setFormData({...formData, employees: e.target.value})}
                    >
                      <option value="">Veldu fjölda...</option>
                      <option value="1-5">1-5 starfsmenn</option>
                      <option value="6-20">6-20 starfsmenn</option>
                      <option value="21-50">21-50 starfsmenn</option>
                      <option value="50+">50+ starfsmenn</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Ertu með sérstaka rekstrardeild eða teymi? *</label>
                    <p className="text-xs text-gray-500 mb-3">T.d. markaður, sala, þjónusta</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="operationsDepartment"
                          value="Já"
                          checked={formData.operationsDepartment === 'Já'}
                          onChange={(e) => setFormData({...formData, operationsDepartment: e.target.value})}
                          required
                        />
                        <span>Já</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="operationsDepartment"
                          value="Nei"
                          checked={formData.operationsDepartment === 'Nei'}
                          onChange={(e) => setFormData({...formData, operationsDepartment: e.target.value})}
                        />
                        <span>Nei</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="operationsDepartment"
                          value="Hluta til"
                          checked={formData.operationsDepartment === 'Hluta til'}
                          onChange={(e) => setFormData({...formData, operationsDepartment: e.target.value})}
                        />
                        <span>Hluta til</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hver er helsti markhópur fyrirtækisins? *</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      placeholder="T.d. smáfyrirtæki, neytendur, stórfyrirtæki..."
                      value={formData.targetAudience}
                      onChange={(e) => setFormData({...formData, targetAudience: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvernig lítur tekjuflæði fyrirtækisins út? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.revenueStream.includes('Endurteknar tekjur')}
                          onChange={() => handleCheckboxChange('revenueStream', 'Endurteknar tekjur')}
                        />
                        <span>Endurteknar tekjur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.revenueStream.includes('Ein-skiptis þjónusta')}
                          onChange={() => handleCheckboxChange('revenueStream', 'Ein-skiptis þjónusta')}
                        />
                        <span>Ein-skiptis þjónusta</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.revenueStream.includes('Blanda')}
                          onChange={() => handleCheckboxChange('revenueStream', 'Blanda')}
                        />
                        <span>Blanda</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hversu skipulögð eru gögnin ykkar í dag? *</label>
                    <p className="text-xs text-gray-500 mb-3">Skipuleg gögn gera AI innleiðingu auðveldari</p>
                    <select
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      value={formData.dataQuality}
                      onChange={(e) => setFormData({...formData, dataQuality: e.target.value})}
                    >
                      <option value="">Veldu stig...</option>
                      <option value="Mjög óskipulögð">Mjög óskipulögð - gögn dreifð og ósamræmd</option>
                      <option value="Frekar óskipulögð">Frekar óskipulögð - sum gögn skipulögð</option>
                      <option value="Í meðallagi">Í meðallagi - gögn nokkuð skipulögð</option>
                      <option value="Frekar skipulögð">Frekar skipulögð - flest gögn aðgengileg</option>
                      <option value="Mjög skipulögð">Mjög skipulögð - öll gögn vel skipulögð</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Section 3: AI Experience & Context */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">3. AI reynsla & samhengi</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hafið þið reynt AI eða sjálfvirkni áður?</label>
                    <textarea
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                      placeholder="T.d. prufuðum ChatGPT, eða notum Zapier fyrir sjálfvirkni..."
                      value={formData.previousAiExperience}
                      onChange={(e) => setFormData({...formData, previousAiExperience: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvað kom af stað áhuganum á AI núna? *</label>
                    <textarea
                      required
                      rows={3}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                      placeholder="T.d. of mikill tími í handvirkum verkum, samkeppnisaðilar eru að nota AI, vildum prófa nýja tækni..."
                      value={formData.whatTriggeredInterest}
                      onChange={(e) => setFormData({...formData, whatTriggeredInterest: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Eru keppinautar ykkar að nota AI/sjálfvirkni? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="competitorsUsingAi"
                          value="Já"
                          checked={formData.competitorsUsingAi === 'Já'}
                          onChange={(e) => setFormData({...formData, competitorsUsingAi: e.target.value})}
                          required
                        />
                        <span>Já</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="competitorsUsingAi"
                          value="Nei"
                          checked={formData.competitorsUsingAi === 'Nei'}
                          onChange={(e) => setFormData({...formData, competitorsUsingAi: e.target.value})}
                        />
                        <span>Nei</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="competitorsUsingAi"
                          value="Óviss/-ur"
                          checked={formData.competitorsUsingAi === 'Óviss/-ur'}
                          onChange={(e) => setFormData({...formData, competitorsUsingAi: e.target.value})}
                        />
                        <span>Óviss/-ur</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 4: Current Challenges */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">4. Núverandi rekstraráskoranir</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hverjar eru 2-3 stærstu áskoranirnar í dag? *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                      placeholder="T.d. of mikill tími fer í handvirkar uppfærslur, erfitt að halda utan um verkefni..."
                      value={formData.biggestChallenges}
                      onChange={(e) => setFormData({...formData, biggestChallenges: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvaða verk þér finnst taka of mikinn tíma í dag?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Þjónustuborð / fyrirspurnir')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Þjónustuborð / fyrirspurnir')}
                        />
                        <span>Þjónustuborð / fyrirspurnir</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Markaðssetning')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Markaðssetning')}
                        />
                        <span>Markaðssetning</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Reikningar / bókhald')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Reikningar / bókhald')}
                        />
                        <span>Reikningar / bókhald</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Söluleiðir')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Söluleiðir')}
                        />
                        <span>Söluleiðir</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Innviðir / IT')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Innviðir / IT')}
                        />
                        <span>Innviðir / IT</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.timeTakingTasks.includes('Annað')}
                          onChange={() => handleCheckboxChange('timeTakingTasks', 'Annað')}
                        />
                        <span>Annað</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Raðaðu þessum svæðum eftir forgangi (1 = mikilvægast) *</label>
                    <p className="text-xs text-gray-500 mb-3">Hvar viltu helst sjá tímasparnað næstu 30 dögum?</p>
                    <div className="space-y-3">
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">1. forgangs svæði *</label>
                        <select
                          required
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                          value={formData.timeSavingsPriority1}
                          onChange={(e) => setFormData({...formData, timeSavingsPriority1: e.target.value})}
                        >
                          <option value="">Veldu svæði...</option>
                          <option value="Þjónusta">Þjónusta</option>
                          <option value="Sala">Sala</option>
                          <option value="Markaðssetning">Markaðssetning</option>
                          <option value="Innri ferlar">Innri ferlar</option>
                          <option value="Verkefnastjórnun">Verkefnastjórnun</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">2. forgangs svæði</label>
                        <select
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                          value={formData.timeSavingsPriority2}
                          onChange={(e) => setFormData({...formData, timeSavingsPriority2: e.target.value})}
                        >
                          <option value="">Veldu svæði...</option>
                          <option value="Þjónusta">Þjónusta</option>
                          <option value="Sala">Sala</option>
                          <option value="Markaðssetning">Markaðssetning</option>
                          <option value="Innri ferlar">Innri ferlar</option>
                          <option value="Verkefnastjórnun">Verkefnastjórnun</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-medium text-gray-600 mb-1">3. forgangs svæði</label>
                        <select
                          className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                          value={formData.timeSavingsPriority3}
                          onChange={(e) => setFormData({...formData, timeSavingsPriority3: e.target.value})}
                        >
                          <option value="">Veldu svæði...</option>
                          <option value="Þjónusta">Þjónusta</option>
                          <option value="Sala">Sala</option>
                          <option value="Markaðssetning">Markaðssetning</option>
                          <option value="Innri ferlar">Innri ferlar</option>
                          <option value="Verkefnastjórnun">Verkefnastjórnun</option>
                        </select>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 5: Tools, Data & AI */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">5. Tól, gögn & AI vilji</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvaða tól notið þið í dag? *</label>
                    <input
                      required
                      type="text"
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      placeholder="T.d. Excel, Slack, Google Workspace, Salesforce..."
                      value={formData.currentTools}
                      onChange={(e) => setFormData({...formData, currentTools: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvernig eru gögn geymd í dag?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.dataStorage.includes('Google Drive')}
                          onChange={() => handleCheckboxChange('dataStorage', 'Google Drive')}
                        />
                        <span>Google Drive</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.dataStorage.includes('SharePoint')}
                          onChange={() => handleCheckboxChange('dataStorage', 'SharePoint')}
                        />
                        <span>SharePoint</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.dataStorage.includes('CRM')}
                          onChange={() => handleCheckboxChange('dataStorage', 'CRM')}
                        />
                        <span>CRM</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.dataStorage.includes('Excel / Sheets')}
                          onChange={() => handleCheckboxChange('dataStorage', 'Excel / Sheets')}
                        />
                        <span>Excel / Sheets</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.dataStorage.includes('Annað')}
                          onChange={() => handleCheckboxChange('dataStorage', 'Annað')}
                        />
                        <span>Annað</span>
                      </label>
                    </div>
                  </div>

                  {/* Conditional CRM field */}
                  {formData.dataStorage.includes('CRM') && (
                    <div className="ml-6 p-4 bg-blue-50 border border-blue-100 rounded-lg">
                      <label className="block text-sm font-medium text-gray-700 mb-2">Hvaða CRM notið þið?</label>
                      <input
                        type="text"
                        className="w-full bg-white border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                        placeholder="T.d. Salesforce, HubSpot, Pipedrive..."
                        value={formData.crmName}
                        onChange={(e) => setFormData({...formData, crmName: e.target.value})}
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvað viltu ná með AI? *</label>
                    <textarea
                      required
                      rows={4}
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all resize-none"
                      placeholder="T.d. spara tíma í þjónustuveri, sjálfvirka markaðssetningu, greina gögn betur..."
                      value={formData.aiGoals}
                      onChange={(e) => setFormData({...formData, aiGoals: e.target.value})}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hversu hratt viltu innleiða? *</label>
                    <select
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      value={formData.implementationSpeed}
                      onChange={(e) => setFormData({...formData, implementationSpeed: e.target.value})}
                    >
                      <option value="">Veldu tímaramma...</option>
                      <option value="Eins fljótt og hægt er">Eins fljótt og hægt er</option>
                      <option value="Innan 1-3 mánaða">Innan 1-3 mánaða</option>
                      <option value="Innan 3-6 mánaða">Innan 3-6 mánaða</option>
                      <option value="Sveigjanlegur">Sveigjanlegur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvað er árangur fyrir þig í tölum?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.successMetrics.includes('Tímasparnaður (klst/viku)')}
                          onChange={() => handleCheckboxChange('successMetrics', 'Tímasparnaður (klst/viku)')}
                        />
                        <span>Tímasparnaður (klst/viku)</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.successMetrics.includes('Meiri tekjur')}
                          onChange={() => handleCheckboxChange('successMetrics', 'Meiri tekjur')}
                        />
                        <span>Meiri tekjur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.successMetrics.includes('Styttri svörunartími')}
                          onChange={() => handleCheckboxChange('successMetrics', 'Styttri svörunartími')}
                        />
                        <span>Styttri svörunartími</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.successMetrics.includes('Færri mistök')}
                          onChange={() => handleCheckboxChange('successMetrics', 'Færri mistök')}
                        />
                        <span>Færri mistök</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.successMetrics.includes('Hagræðing (kr/mán)')}
                          onChange={() => handleCheckboxChange('successMetrics', 'Hagræðing (kr/mán)')}
                        />
                        <span>Hagræðing (kr/mán)</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hver er áætlaður mánaðarlegur fjárhagsrammi fyrir AI innleiðingu? *</label>
                    <p className="text-xs text-gray-500 mb-3">Hjálpar okkur að sérsníða lausnir sem passa við þitt budget</p>
                    <select
                      required
                      className="w-full bg-gray-50 border border-gray-200 rounded-lg p-3 text-brand-dark focus:border-brand-primary focus:ring-1 focus:ring-brand-primary outline-none transition-all"
                      value={formData.monthlyBudget}
                      onChange={(e) => setFormData({...formData, monthlyBudget: e.target.value})}
                    >
                      <option value="">Veldu budget...</option>
                      <option value="Undir 50.000 kr">Undir 50.000 kr/mán</option>
                      <option value="50.000 - 150.000 kr">50.000 - 150.000 kr/mán</option>
                      <option value="150.000 - 300.000 kr">150.000 - 300.000 kr/mán</option>
                      <option value="Yfir 300.000 kr">Yfir 300.000 kr/mán</option>
                      <option value="Óviss/-ur">Óviss/-ur</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Viltu fylgja 30 daga plani sjálf/-ur eða með okkar aðstoð? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="supportLevel"
                          value="Sjálfstætt"
                          checked={formData.supportLevel === 'Sjálfstætt'}
                          onChange={(e) => setFormData({...formData, supportLevel: e.target.value})}
                          required
                        />
                        <span>Sjálfstætt</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="supportLevel"
                          value="Samvinna"
                          checked={formData.supportLevel === 'Samvinna'}
                          onChange={(e) => setFormData({...formData, supportLevel: e.target.value})}
                        />
                        <span>Samvinna</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="supportLevel"
                          value="Óákveðið"
                          checked={formData.supportLevel === 'Óákveðið'}
                          onChange={(e) => setFormData({...formData, supportLevel: e.target.value})}
                        />
                        <span>Óákveðið</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 6: Team & Change Management */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">6. Teymi & breytingastjórnun</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Er teymið almennt opið fyrir nýjum tólum og breytingum? *</label>
                    <p className="text-xs text-gray-500 mb-3">Hjálpar okkur að skipuleggja innleiðingu og þjálfun</p>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="teamOpenness"
                          value="Já - mjög opið"
                          checked={formData.teamOpenness === 'Já - mjög opið'}
                          onChange={(e) => setFormData({...formData, teamOpenness: e.target.value})}
                          required
                        />
                        <span>Já - mjög opið</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="teamOpenness"
                          value="Hluta til - sumir opnir, aðrir ekki"
                          checked={formData.teamOpenness === 'Hluta til - sumir opnir, aðrir ekki'}
                          onChange={(e) => setFormData({...formData, teamOpenness: e.target.value})}
                        />
                        <span>Hluta til - sumir opnir, aðrir ekki</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="teamOpenness"
                          value="Nei - nokkur mótstaða"
                          checked={formData.teamOpenness === 'Nei - nokkur mótstaða'}
                          onChange={(e) => setFormData({...formData, teamOpenness: e.target.value})}
                        />
                        <span>Nei - nokkur mótstaða</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="teamOpenness"
                          value="Óviss/-ur"
                          checked={formData.teamOpenness === 'Óviss/-ur'}
                          onChange={(e) => setFormData({...formData, teamOpenness: e.target.value})}
                        />
                        <span>Óviss/-ur</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Section 7: Consultation Scheduling */}
              <div>
                <h2 className="text-2xl font-bold text-brand-dark mb-6 pb-3 border-b-2 border-brand-primary/20">7. Samráðssetning</h2>
                <div className="space-y-6">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvaða vikudaga hentar best 30-45 mín kickoff símtal?</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredDays.includes('Mánudagur')}
                          onChange={() => handleCheckboxChange('preferredDays', 'Mánudagur')}
                        />
                        <span>Mánudagur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredDays.includes('Þriðjudagur')}
                          onChange={() => handleCheckboxChange('preferredDays', 'Þriðjudagur')}
                        />
                        <span>Þriðjudagur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredDays.includes('Miðvikudagur')}
                          onChange={() => handleCheckboxChange('preferredDays', 'Miðvikudagur')}
                        />
                        <span>Miðvikudagur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredDays.includes('Fimmtudagur')}
                          onChange={() => handleCheckboxChange('preferredDays', 'Fimmtudagur')}
                        />
                        <span>Fimmtudagur</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="checkbox"
                          checked={formData.preferredDays.includes('Föstudagur')}
                          onChange={() => handleCheckboxChange('preferredDays', 'Föstudagur')}
                        />
                        <span>Föstudagur</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">Hvenær dags hentar? *</label>
                    <div className="space-y-2">
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="Fyrirmiðdag"
                          checked={formData.preferredTime === 'Fyrirmiðdag'}
                          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                          required
                        />
                        <span>Fyrirmiðdag</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="Eftir hádegi"
                          checked={formData.preferredTime === 'Eftir hádegi'}
                          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        />
                        <span>Eftir hádegi</span>
                      </label>
                      <label className="flex items-center gap-2">
                        <input
                          type="radio"
                          name="preferredTime"
                          value="Seinnipartur"
                          checked={formData.preferredTime === 'Seinnipartur'}
                          onChange={(e) => setFormData({...formData, preferredTime: e.target.value})}
                        />
                        <span>Seinnipartur</span>
                      </label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full py-4 bg-brand-primary text-white font-bold rounded-lg hover:bg-brand-dark transition-colors shadow-lg text-lg disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {loading ? 'Sendi...' : 'Senda inn'} <ArrowRight size={20} />
              </button>

              <p className="text-center text-xs text-gray-500 mt-4">
                Við deilum aldrei upplýsingum þínum og sendum 0 ruslpóst
              </p>
            </form>
          </div>
        )}
      </div>
    </div>
  );
};

export default ThirtyDayRoadmapQuestionnairePage;
