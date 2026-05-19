import React, { useState, useRef, useEffect } from 'react';
import { Send, X, MessageCircle, Loader2, ThumbsUp, ThumbsDown } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
  feedback?: 'helpful' | 'not-helpful';
}

const INITIAL_QUESTIONS = [
  "Hvernig getur AI sparað tíma í mínu fyrirtæki?",
  "Hvað kostar þetta?",
  "Hvernig virkar ferlið?",
  "Er þetta fyrir lítið fyrirtæki?",
];

const FOLLOW_UP_QUESTIONS_BY_TOPIC: Record<string, string[]> = {
  default: [
    "Hvaða fyrirtæki hentar þetta best fyrir?",
    "Hversu langan tíma tekur innleiðing?",
    "Get ég séð dæmi um árangur?",
  ],
  cost: [
    "Hvað er innifalið í 30 daga planinu?",
    "Er hægt að fá sérsniðið tilboð?",
    "Hvaða ROI get ég búist við?",
  ],
  time: [
    "Hvaða verkefni eru oftast sjálfvirk?",
    "Hversu hratt sjáum við niðurstöður?",
    "Þarf ég mikinn tíma í innleiðingu?",
  ],
  process: [
    "Hvað gerist í fríu greiningunni?",
    "Hvernig er stuðningurinn eftir innleiðingu?",
    "Get ég prófað áður en ég skuldbind mig?",
  ],
};

const AIChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [question, setQuestion] = useState('');
  const [messages, setMessages] = useState<Message[]>([]);
  const [loading, setLoading] = useState(false);
  const [isTyping, setIsTyping] = useState(false);
  const [suggestedQuestions, setSuggestedQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Auto-scroll to bottom when new messages arrive
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages, isTyping]);

  // Focus input when chat opens
  useEffect(() => {
    if (isOpen && inputRef.current) {
      inputRef.current.focus();
    }
  }, [isOpen]);

  // Track chat opened
  useEffect(() => {
    if (isOpen && messages.length === 0) {
      trackChatEvent('chat_opened');
    }
  }, [isOpen, messages.length]);

  const trackChatEvent = (eventName: string, eventData?: any) => {
    // Track to Google Analytics
    if (typeof window !== 'undefined' && (window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'AI_Chat',
        ...eventData
      });
    }

    // Track to Facebook Pixel
    if (typeof window !== 'undefined' && (window as any).fbq) {
      (window as any).fbq('trackCustom', eventName, eventData);
    }

    // Console log for debugging
    console.log(`[AI Chat] ${eventName}`, eventData);
  };

  const handleSubmit = async (e: React.FormEvent, suggestedQuestion?: string) => {
    e.preventDefault();
    const questionToAsk = suggestedQuestion || question.trim();

    if (!questionToAsk) return;

    // Add user message
    const userMessage: Message = {
      role: 'user',
      content: questionToAsk,
      timestamp: new Date(),
    };
    setMessages(prev => [...prev, userMessage]);
    setQuestion('');
    setLoading(true);
    setIsTyping(true);

    // Track question asked
    trackChatEvent('chat_question_asked', {
      question: questionToAsk,
      is_suggested: !!suggestedQuestion,
      message_count: messages.length + 1,
    });

    try {
      // Call Netlify Function
      const response = await fetch('/.netlify/functions/ai-chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          question: questionToAsk,
          conversationHistory: messages.slice(-4), // Last 4 messages for context
        }),
      });

      const data = await response.json();

      // Simulate typing delay for better UX
      await new Promise(resolve => setTimeout(resolve, 500));

      // Add assistant message
      const assistantMessage: Message = {
        role: 'assistant',
        content: data.answer,
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, assistantMessage]);

      // Track response received
      trackChatEvent('chat_response_received', {
        question: questionToAsk,
        response_length: data.answer.length,
        conversation_length: messages.length + 2,
      });

      // Set suggested follow-up questions based on topic
      const lowerQ = questionToAsk.toLowerCase();
      let topic = 'default';

      if (lowerQ.includes('kosta') || lowerQ.includes('verð') || lowerQ.includes('krónu')) {
        topic = 'cost';
      } else if (lowerQ.includes('tíma') || lowerQ.includes('tím') || lowerQ.includes('hratt')) {
        topic = 'time';
      } else if (lowerQ.includes('ferli') || lowerQ.includes('byrja') || lowerQ.includes('virka')) {
        topic = 'process';
      }

      setSuggestedQuestions(FOLLOW_UP_QUESTIONS_BY_TOPIC[topic] || FOLLOW_UP_QUESTIONS_BY_TOPIC.default);

    } catch (error) {
      console.error('Error fetching AI response:', error);
      const errorMessage: Message = {
        role: 'assistant',
        content: 'Villa kom upp við að tengjast. Vinsamlegast reyndu aftur eða hafðu samband við okkur á ingi@lioratech.is',
        timestamp: new Date(),
      };
      setMessages(prev => [...prev, errorMessage]);

      trackChatEvent('chat_error', {
        error: 'fetch_failed',
      });
    } finally {
      setLoading(false);
      setIsTyping(false);
    }
  };

  const handleFeedback = (messageIndex: number, feedbackType: 'helpful' | 'not-helpful') => {
    setMessages(prev => prev.map((msg, idx) =>
      idx === messageIndex ? { ...msg, feedback: feedbackType } : msg
    ));

    trackChatEvent('chat_feedback', {
      feedback: feedbackType,
      message_index: messageIndex,
      message_content: messages[messageIndex].content.substring(0, 50),
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    trackChatEvent('chat_closed', {
      message_count: messages.length,
      conversation_length: messages.filter(m => m.role === 'user').length,
    });
  };

  const handleSuggestedQuestion = (question: string) => {
    const syntheticEvent = { preventDefault: () => {} } as React.FormEvent;
    handleSubmit(syntheticEvent, question);
  };

  return (
    <div className="fixed bottom-8 right-8 z-50 flex flex-col items-end font-sans">
      {isOpen && (
        <div className="bg-white mb-4 w-96 rounded-xl shadow-2xl border border-gray-100 overflow-hidden fade-in-up">
          {/* Header */}
          <div className="bg-gradient-to-r from-brand-primary to-brand-dark p-4 flex justify-between items-center">
            <div>
              <h3 className="font-semibold text-white text-base">LioraTech AI Aðstoð</h3>
              <p className="text-blue-100 text-xs mt-0.5">Spyrðu mig hvað sem er</p>
            </div>
            <button
              onClick={handleClose}
              className="text-blue-200 hover:text-white transition-colors p-1 hover:bg-white/10 rounded"
              aria-label="Loka spjalli"
            >
              <X size={20} />
            </button>
          </div>

          {/* Messages Area */}
          <div className="h-96 overflow-y-auto bg-gray-50 custom-scrollbar">
            <div className="p-4 space-y-4">
              {/* Welcome Message */}
              {messages.length === 0 && (
                <div className="space-y-4">
                  <div className="bg-white p-4 rounded-lg shadow-sm border border-gray-100">
                    <p className="text-gray-800 font-medium mb-2">
                      👋 Hæ! Ég er AI ráðgjafinn hjá LioraTech.
                    </p>
                    <p className="text-gray-600 text-sm">
                      Ég get svarað spurningum um hvernig AI getur hjálpað þínu fyrirtæki.
                    </p>
                  </div>

                  {/* Initial Suggested Questions */}
                  <div>
                    <p className="text-xs text-gray-500 mb-2 font-medium">Dæmi um spurningar:</p>
                    <div className="space-y-2">
                      {INITIAL_QUESTIONS.map((q, idx) => (
                        <button
                          key={idx}
                          onClick={() => handleSuggestedQuestion(q)}
                          className="w-full text-left text-sm bg-white hover:bg-blue-50 text-gray-700 p-3 rounded-lg border border-gray-200 hover:border-brand-primary transition-all"
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  </div>
                </div>
              )}

              {/* Message History */}
              {messages.map((message, idx) => (
                <div key={idx} className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                  <div className={`max-w-[85%] ${message.role === 'user' ? 'bg-brand-primary text-white' : 'bg-white border border-gray-200'} rounded-lg p-3 shadow-sm`}>
                    <p className={`text-sm leading-relaxed whitespace-pre-line ${message.role === 'user' ? 'text-white' : 'text-gray-800'}`}>
                      {message.content}
                    </p>

                    {/* Feedback Buttons for Assistant Messages */}
                    {message.role === 'assistant' && (
                      <div className="flex items-center gap-2 mt-3 pt-2 border-t border-gray-100">
                        <span className="text-xs text-gray-500">Var þetta hjálplegt?</span>
                        <button
                          onClick={() => handleFeedback(idx, 'helpful')}
                          className={`p-1 rounded transition-colors ${
                            message.feedback === 'helpful'
                              ? 'text-green-600 bg-green-50'
                              : 'text-gray-400 hover:text-green-600 hover:bg-green-50'
                          }`}
                          disabled={!!message.feedback}
                          aria-label="Hjálplegt"
                        >
                          <ThumbsUp size={14} />
                        </button>
                        <button
                          onClick={() => handleFeedback(idx, 'not-helpful')}
                          className={`p-1 rounded transition-colors ${
                            message.feedback === 'not-helpful'
                              ? 'text-red-600 bg-red-50'
                              : 'text-gray-400 hover:text-red-600 hover:bg-red-50'
                          }`}
                          disabled={!!message.feedback}
                          aria-label="Ekki hjálplegt"
                        >
                          <ThumbsDown size={14} />
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing Indicator */}
              {isTyping && (
                <div className="flex justify-start">
                  <div className="bg-white border border-gray-200 rounded-lg p-3 shadow-sm">
                    <div className="flex items-center space-x-2">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-brand-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                      </div>
                      <span className="text-xs text-gray-500">Að hugsa...</span>
                    </div>
                  </div>
                </div>
              )}

              {/* Follow-up Suggested Questions */}
              {!loading && !isTyping && suggestedQuestions.length > 0 && messages.length > 0 && (
                <div className="mt-2">
                  <p className="text-xs text-gray-500 mb-2 font-medium">Kannski áhugavert:</p>
                  <div className="space-y-2">
                    {suggestedQuestions.map((q, idx) => (
                      <button
                        key={idx}
                        onClick={() => handleSuggestedQuestion(q)}
                        className="w-full text-left text-xs bg-blue-50 hover:bg-blue-100 text-gray-700 p-2 rounded border border-blue-200 hover:border-brand-primary transition-all"
                      >
                        {q}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          {/* Input Area */}
          <form onSubmit={handleSubmit} className="p-3 bg-white border-t border-gray-200">
            {/* CTA Buttons after first exchange */}
            {messages.length >= 2 && (
              <div className="mb-3 space-y-2">
                <button
                  type="button"
                  onClick={() => {
                    trackChatEvent('chat_cta_clicked', {
                      message_count: messages.length,
                      cta_type: 'greining',
                    });

                    // Navigate to /greining page
                    window.location.href = '/greining';
                  }}
                  className="w-full py-2 px-3 bg-gradient-to-r from-brand-primary to-brand-dark text-white text-sm font-semibold rounded-lg hover:shadow-lg transition-all"
                >
                  🎯 Fá fría AI-greiningu →
                </button>
                <button
                  type="button"
                  onClick={() => {
                    trackChatEvent('chat_cta_clicked', {
                      message_count: messages.length,
                      cta_type: 'calendly',
                    });

                    // Open Calendly in new tab
                    window.open('https://calendly.com/ingi-lioratech/30min', '_blank');
                  }}
                  className="w-full py-2 px-3 bg-white border-2 border-brand-primary text-brand-primary text-sm font-semibold rounded-lg hover:bg-brand-primary hover:text-white transition-all"
                >
                  📅 Bóka tíma með sérfræðing
                </button>
              </div>
            )}

            <div className="flex gap-2">
              <input
                ref={inputRef}
                type="text"
                value={question}
                onChange={(e) => setQuestion(e.target.value)}
                placeholder="Skrifaðu spurningu..."
                disabled={loading}
                className="flex-1 bg-gray-50 border border-gray-300 rounded-lg px-4 py-2.5 text-sm text-gray-800 placeholder-gray-400 focus:outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/20 transition-all disabled:opacity-50"
              />
              <button
                type="submit"
                disabled={loading || !question.trim()}
                className="p-2.5 bg-brand-primary rounded-lg text-white hover:bg-brand-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center min-w-[44px]"
                aria-label="Senda"
              >
                {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
              </button>
            </div>
          </form>
        </div>
      )}

      {/* Floating Action Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-gradient-to-r from-brand-primary to-brand-dark hover:shadow-2xl text-white p-4 rounded-full shadow-lg hover:scale-110 transition-all duration-300 flex items-center justify-center group relative"
        aria-label={isOpen ? 'Loka spjalli' : 'Opna spjall'}
      >
        {isOpen ? <X size={24} /> : <MessageCircle size={24} />}

        {/* Pulse animation when closed */}
        {!isOpen && (
          <span className="absolute inset-0 rounded-full bg-brand-primary animate-ping opacity-20"></span>
        )}
      </button>
    </div>
  );
};

export default AIChatWidget;
