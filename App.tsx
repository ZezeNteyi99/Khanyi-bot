import React, { useState, useRef, useEffect } from 'react';
import { Send, BookOpen, Menu, X, Sparkles, Moon, Sun } from 'lucide-react';
import { Message, TopicType } from './types';
import { SUGGESTED_QUESTIONS, MODULE_DATA } from './constants';
import { sendMessageStream, detectTopic } from './services/geminiService';
import { ChatBubble } from './components/ChatBubble';
import { VisualizationPanel } from './components/Visualizations';

function App() {
  // State
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 'welcome',
      role: 'model',
      text: "Hello! I'm KhanyiBot 🌸. I'm here to help you shine a light on AI fundamentals. We can discuss Machine Learning, Neural Networks, Ethics, or anything in between. Where would you like to start?",
      timestamp: new Date(),
      relatedTopic: TopicType.GENERAL
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isStreaming, setIsStreaming] = useState(false);
  const [currentTopic, setCurrentTopic] = useState<TopicType>(TopicType.GENERAL);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // For mobile
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Refs
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  // Handle Theme Toggle
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

  // Auto-scroll to bottom
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Handle Sending Messages
  const handleSendMessage = async (text: string) => {
    if (!text.trim() || isStreaming) return;

    const userMsg: Message = {
      id: Date.now().toString(),
      role: 'user',
      text: text,
      timestamp: new Date()
    };

    // Optimistically detect topic
    const detectedTopicKey = detectTopic(text);
    if (detectedTopicKey && detectedTopicKey in TopicType) {
      setCurrentTopic(TopicType[detectedTopicKey as keyof typeof TopicType]);
    }

    setMessages(prev => [...prev, userMsg]);
    setInputValue('');
    setIsStreaming(true);

    // Placeholder for bot response
    const botMsgId = (Date.now() + 1).toString();
    setMessages(prev => [...prev, {
      id: botMsgId,
      role: 'model',
      text: '',
      isStreaming: true,
      timestamp: new Date()
    }]);

    try {
      const stream = await sendMessageStream(text, messages);
      
      let accumulatedText = '';
      
      for await (const chunk of stream) {
        accumulatedText += chunk;
        
        // Update the streaming message content
        setMessages(prev => prev.map(msg => 
          msg.id === botMsgId 
            ? { ...msg, text: accumulatedText } 
            : msg
        ));
      }

      // Check if the AI response itself suggests a topic shift
      const responseTopicKey = detectTopic(accumulatedText);
      if (responseTopicKey && responseTopicKey !== detectedTopicKey && responseTopicKey in TopicType) {
          setCurrentTopic(TopicType[responseTopicKey as keyof typeof TopicType]);
      }

    } catch (error) {
      console.error("Error receiving stream", error);
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId 
          ? { ...msg, text: "I'm having trouble connecting to my neural pathways. Please check your API key and try again." } 
          : msg
      ));
    } finally {
      setIsStreaming(false);
      setMessages(prev => prev.map(msg => 
        msg.id === botMsgId ? { ...msg, isStreaming: false } : msg
      ));
    }
  };

  const handleQuickAction = (question: string) => {
    handleSendMessage(question);
  };

  const toggleSidebar = () => setIsSidebarOpen(!isSidebarOpen);

  return (
    <div className="flex h-screen bg-rose-50 dark:bg-slate-950 text-slate-700 dark:text-slate-200 overflow-hidden selection:bg-rose-200 selection:text-rose-900 dark:selection:bg-rose-900 dark:selection:text-rose-100 transition-colors duration-300">
      
      {/* Mobile Sidebar Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-sm z-20 lg:hidden"
          onClick={() => setIsSidebarOpen(false)}
        />
      )}

      {/* Sidebar / Learning Context Panel */}
      <aside className={`
        fixed lg:static inset-y-0 right-0 z-30
        w-80 lg:w-96 bg-white dark:bg-slate-900 border-l border-rose-100 dark:border-slate-800
        transform transition-all duration-300 ease-in-out
        ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full lg:translate-x-0'}
        flex flex-col shadow-xl lg:shadow-none
      `}>
        {/* Header for Sidebar */}
        <div className="h-16 border-b border-rose-100 dark:border-slate-800 flex items-center justify-between px-6 bg-white/50 dark:bg-slate-900/50 backdrop-blur-md">
          <div className="flex items-center gap-2 text-rose-500 font-bold">
             <BookOpen size={20} />
             <span>Learning Context</span>
          </div>
          <button onClick={toggleSidebar} className="lg:hidden text-slate-400 hover:text-rose-500">
            <X size={24} />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6 space-y-8">
          
          {/* Active Module Info */}
          <div className="bg-gradient-to-br from-rose-50 to-white dark:from-slate-800 dark:to-slate-900 rounded-xl p-5 border border-rose-200 dark:border-slate-700 shadow-sm">
            <div className="text-xs font-bold text-rose-400 dark:text-rose-300 uppercase mb-2">Current Module</div>
            <h2 className="text-xl font-semibold text-rose-950 dark:text-white mb-2">
              {MODULE_DATA[currentTopic]?.title || "General Overview"}
            </h2>
            <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
              {MODULE_DATA[currentTopic]?.description || "Select a topic to see module details."}
            </p>
            <div className="inline-flex items-center px-3 py-1 rounded-full text-xs font-bold bg-rose-100 dark:bg-rose-900/30 text-rose-600 dark:text-rose-300">
              {MODULE_DATA[currentTopic]?.citation || "Intro"}
            </div>
          </div>

          {/* Dynamic Visualization */}
          <div className="bg-white rounded-xl p-1 min-h-[250px] border border-rose-100 dark:border-slate-700 shadow-sm">
             <VisualizationPanel topic={currentTopic} />
          </div>

          {/* Suggested Actions */}
          <div>
             <h3 className="text-xs font-bold uppercase tracking-wider text-slate-400 dark:text-slate-500 mb-4">Quick Questions</h3>
             <div className="space-y-2">
               {SUGGESTED_QUESTIONS.map((q, i) => (
                 <button 
                   key={i}
                   onClick={() => {
                     handleQuickAction(q);
                     if(window.innerWidth < 1024) setIsSidebarOpen(false);
                   }}
                   disabled={isStreaming}
                   className="w-full text-left px-4 py-3 rounded-lg bg-white dark:bg-slate-800 hover:bg-rose-50 dark:hover:bg-slate-700 border border-slate-100 dark:border-slate-700 hover:border-rose-200 dark:hover:border-slate-600 transition-colors text-sm text-slate-600 dark:text-slate-300 hover:text-rose-600 dark:hover:text-rose-300 truncate shadow-sm"
                 >
                   {q}
                 </button>
               ))}
             </div>
          </div>
        </div>
      </aside>

      {/* Main Chat Area */}
      <main className="flex-1 flex flex-col min-w-0 bg-rose-50 dark:bg-slate-950 relative transition-colors duration-300">
        
        {/* Header */}
        <header className="h-16 border-b border-rose-200/60 dark:border-slate-800 flex items-center px-4 lg:px-8 justify-between bg-white/60 dark:bg-slate-900/80 backdrop-blur-md sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-gradient-to-tr from-rose-400 to-pink-500 rounded-xl flex items-center justify-center shadow-lg shadow-rose-200 dark:shadow-none">
              <Sparkles className="text-white" size={20} />
            </div>
            <div>
              <h1 className="font-bold text-lg text-slate-800 dark:text-white tracking-tight">KhanyiBot</h1>
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
                <span className="text-xs text-slate-500 dark:text-slate-400 font-medium">Online • AI Tutor</span>
              </div>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
             <button
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
                title={isDarkMode ? "Switch to Light Mode" : "Switch to Dark Mode"}
             >
                {isDarkMode ? <Sun size={20} /> : <Moon size={20} />}
             </button>
             <button 
                onClick={toggleSidebar} 
                className="lg:hidden p-2 text-slate-400 hover:text-rose-500 dark:hover:text-rose-300 hover:bg-rose-50 dark:hover:bg-slate-800 rounded-lg transition-colors"
             >
                <Menu size={24} />
             </button>
          </div>
        </header>

        {/* Messages List */}
        <div className={`flex-1 overflow-y-auto p-4 lg:p-8 scroll-smooth ${isDarkMode ? 'bg-slate-950' : "bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjAiIGhlaWdodD0iMjAiIHhtbG5zPSJodHRwOi8vd3d3LnczLm9yZy8yMDAwL3N2ZyI+PGNpcmNsZSBjeD0iMSIgY3k9IjEiIHI9IjEiIGZpbGw9InJnYmEoMjUzLCAxMTMsIDEzMywgMC4wNSkiLz48L3N2Zz4=')]"} transition-all duration-300`}>
          <div className="max-w-3xl mx-auto">
            {messages.map((msg) => (
              <ChatBubble key={msg.id} message={msg} />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 lg:p-6 bg-white dark:bg-slate-900 border-t border-rose-100 dark:border-slate-800 shadow-[0_-10px_40px_-15px_rgba(0,0,0,0.05)] transition-colors duration-300">
          <div className="max-w-3xl mx-auto relative">
            <form 
              onSubmit={(e) => {
                e.preventDefault();
                handleSendMessage(inputValue);
              }}
              className="relative flex items-end gap-2 bg-rose-50/50 dark:bg-slate-800 p-2 rounded-2xl border border-rose-200 dark:border-slate-700 focus-within:border-rose-400 focus-within:ring-1 focus-within:ring-rose-400 transition-all"
            >
              <input 
                ref={inputRef}
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask about Machine Learning, Ethics, etc..."
                className="w-full bg-transparent text-slate-800 dark:text-slate-100 placeholder-slate-400 dark:placeholder-slate-500 px-4 py-3 focus:outline-none resize-none font-medium"
                disabled={isStreaming}
              />
              <button 
                type="submit"
                disabled={!inputValue.trim() || isStreaming}
                className="p-3 bg-rose-500 hover:bg-rose-600 text-white rounded-xl disabled:opacity-50 disabled:cursor-not-allowed transition-all shadow-lg shadow-rose-500/30 flex-shrink-0"
              >
                {isStreaming ? <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" /> : <Send size={20} />}
              </button>
            </form>
            <div className="text-center mt-2">
                <span className="text-[10px] text-slate-400 dark:text-slate-500 font-medium">
                    KhanyiBot can make mistakes. Please review bootcamp materials for critical info.
                </span>
            </div>
          </div>
        </div>

      </main>
    </div>
  );
}

export default App;