import React, { useState } from 'react';
import { askAIAdvisor } from '../services/geminiService';
import { Send, X, MessageCircle, Loader2 } from 'lucide-react';

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [answer, setAnswer] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!question.trim()) return;

    setLoading(true);
    setAnswer(null);
    const response = await askAIAdvisor(question);
    setAnswer(response);
    setLoading(false);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white mb-4 w-80 rounded-xl shadow-2xl border border-gray-100 overflow-hidden fade-in-up">
          <div className="bg-brand-primary p-4 flex justify-between items-center">
            <h3 className="font-semibold text-white text-sm">LioraTech Aðstoð</h3>
            <button onClick={() => setIsOpen(false)} className="text-blue-200 hover:text-white transition-colors">
              <X size={18} />
            </button>
          </div>
          
          <div className="p-4 h-64 overflow-y-auto text-sm bg-gray-50 custom-scrollbar">
            {!answer && !loading && (
              <div className="text-gray-600 leading-relaxed space-y-3">
                <p className="font-medium text-brand-dark">Hæ! 👋 Ég get svarað spurningum um:</p>
                <ul className="space-y-2 text-sm">
                  <li>• Hvernig AI getur sparað tíma í þínu fyrirtæki</li>
                  <li>• Hvað kostar innleiðing</li>
                  <li>• Hvernig ferlið virkar</li>
                </ul>
                <p className="text-sm italic">Hvað viltu vita?</p>
              </div>
            )}
            
            {loading && (
              <div className="flex items-center space-x-2 text-brand-primary">
                <Loader2 size={16} className="animate-spin" />
                <span>Sæki svar...</span>
              </div>
            )}
            
            {answer && (
              <div className="space-y-3">
                <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm text-gray-700 leading-relaxed">
                  <p>{answer}</p>
                </div>
                <button
                  onClick={() => window.location.href = '#consultation'}
                  className="w-full text-center py-2 px-3 bg-brand-primary text-white text-xs font-semibold rounded-lg hover:bg-brand-dark transition-colors"
                >
                  Bóka fund til að fá frekari upplýsingar →
                </button>
              </div>
            )}
          </div>

          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-100 flex gap-2">
            <input
              type="text"
              value={question}
              onChange={(e) => setQuestion(e.target.value)}
              placeholder="Skrifaðu spurningu..."
              className="flex-1 bg-gray-50 border border-gray-200 rounded-lg px-3 py-2 text-sm text-gray-800 focus:outline-none focus:border-brand-primary focus:ring-1 focus:ring-brand-primary transition-all"
            />
            <button 
              type="submit" 
              disabled={loading}
              className="p-2 bg-brand-primary rounded-lg text-white hover:bg-brand-dark transition-colors disabled:opacity-50"
            >
              <Send size={16} />
            </button>
          </form>
        </div>
      )}

      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-brand-primary hover:bg-brand-dark text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1 flex items-center justify-center"
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}
      </button>
    </div>
  );
};

export default AIChatWidget;