import React from 'react';
import ReactMarkdown from 'react-markdown';
import { Message } from '../types';
import { Bot, User } from 'lucide-react';

interface ChatBubbleProps {
  message: Message;
}

export const ChatBubble: React.FC<ChatBubbleProps> = ({ message }) => {
  const isBot = message.role === 'model';

  return (
    <div className={`flex w-full mb-6 ${isBot ? 'justify-start' : 'justify-end'}`}>
      <div className={`flex max-w-[85%] md:max-w-[75%] ${isBot ? 'flex-row' : 'flex-row-reverse'} gap-3`}>
        
        {/* Avatar */}
        <div className={`flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center shadow-sm transition-colors duration-300 ${
            isBot 
            ? 'bg-white dark:bg-slate-900 border border-rose-200 dark:border-slate-700' 
            : 'bg-rose-400'
        }`}>
          {isBot ? <Bot size={18} className="text-rose-500" /> : <User size={18} className="text-white" />}
        </div>

        {/* Message Content */}
        <div className={`flex flex-col ${isBot ? 'items-start' : 'items-end'}`}>
          <div className={`px-4 py-3 rounded-2xl text-sm md:text-base leading-relaxed shadow-sm transition-colors duration-300 ${
            isBot 
              ? 'bg-white dark:bg-slate-900 text-slate-700 dark:text-slate-200 rounded-tl-none border border-rose-100 dark:border-slate-800 shadow-rose-100 dark:shadow-none' 
              : 'bg-rose-500 text-white rounded-tr-none shadow-rose-200 dark:shadow-none'
          }`}>
            {message.text ? (
                <div className="markdown-content space-y-2">
                   <ReactMarkdown
                     components={{
                        strong: ({node, ...props}) => <span className="font-bold text-rose-600 dark:text-rose-400" {...props} />,
                        a: ({node, ...props}) => <a className="text-pink-500 dark:text-pink-400 hover:underline font-medium" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-4 space-y-1 marker:text-rose-400" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-4 space-y-1 marker:text-rose-400" {...props} />,
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />
                     }}
                   >
                     {message.text}
                   </ReactMarkdown>
                </div>
            ) : (
              <div className="flex items-center gap-2 text-rose-300">
                <span className="typing-dot w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                <span className="typing-dot w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
                <span className="typing-dot w-1.5 h-1.5 bg-rose-400 rounded-full"></span>
              </div>
            )}
          </div>
          
          {/* Timestamp / Source Info */}
          <span className="text-[10px] text-rose-400/70 dark:text-slate-500 mt-1 px-1 font-medium">
            {isBot ? 'KhanyiBot • AI Tutor' : 'You'}
          </span>
        </div>
      </div>
    </div>
  );
};