import React from 'react';
import { TopicType } from '../types';

interface VisualizationProps {
  topic: TopicType;
}

const AiVsMlViz = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto rounded-lg bg-white/60 dark:bg-white/90 border border-rose-100 p-4 transition-colors duration-300">
    {/* AI Circle */}
    <circle cx="200" cy="150" r="140" fill="#fb7185" fillOpacity="0.1" stroke="#fb7185" strokeWidth="2" />
    <text x="200" y="40" textAnchor="middle" fill="#e11d48" className="font-bold">Artificial Intelligence</text>
    
    {/* ML Circle */}
    <circle cx="200" cy="170" r="100" fill="#c026d3" fillOpacity="0.1" stroke="#c026d3" strokeWidth="2" />
    <text x="200" y="95" textAnchor="middle" fill="#a21caf" className="font-bold">Machine Learning</text>
    
    {/* DL Circle */}
    <circle cx="200" cy="190" r="60" fill="#db2777" fillOpacity="0.2" stroke="#db2777" strokeWidth="2" />
    <text x="200" y="155" textAnchor="middle" fill="#be185d" className="font-bold">Deep Learning</text>
    
    <text x="200" y="200" textAnchor="middle" fill="#881337" fontSize="10">Neural Networks</text>
  </svg>
);

const NeuralNetworkViz = () => (
  <svg viewBox="0 0 400 300" className="w-full h-auto rounded-lg bg-white/60 dark:bg-white/90 border border-rose-100 p-4 transition-colors duration-300">
    <defs>
      <marker id="arrow" viewBox="0 0 10 10" refX="5" refY="5" markerWidth="6" markerHeight="6" orient="auto-start-reverse">
        <path d="M 0 0 L 10 5 L 0 10 z" fill="#fda4af" />
      </marker>
    </defs>
    
    {/* Inputs */}
    <circle cx="50" cy="75" r="15" fill="#f43f5e" />
    <circle cx="50" cy="150" r="15" fill="#f43f5e" />
    <circle cx="50" cy="225" r="15" fill="#f43f5e" />
    <text x="50" y="40" textAnchor="middle" fill="#e11d48" fontSize="12">Input Layer</text>

    {/* Hidden Layer 1 */}
    <circle cx="150" cy="100" r="15" fill="#d946ef" />
    <circle cx="150" cy="200" r="15" fill="#d946ef" />

    {/* Hidden Layer 2 */}
    <circle cx="250" cy="75" r="15" fill="#d946ef" />
    <circle cx="250" cy="150" r="15" fill="#d946ef" />
    <circle cx="250" cy="225" r="15" fill="#d946ef" />
    <text x="200" y="40" textAnchor="middle" fill="#c026d3" fontSize="12">Hidden Layers</text>

    {/* Output */}
    <circle cx="350" cy="112" r="15" fill="#f9a8d4" />
    <circle cx="350" cy="188" r="15" fill="#f9a8d4" />
    <text x="350" y="40" textAnchor="middle" fill="#db2777" fontSize="12">Output Layer</text>

    {/* Connections (Simplified) */}
    <path d="M65 75 L135 100" stroke="#fda4af" strokeWidth="1" opacity="0.6" />
    <path d="M65 150 L135 100" stroke="#fda4af" strokeWidth="1" opacity="0.6" />
    <path d="M65 225 L135 200" stroke="#fda4af" strokeWidth="1" opacity="0.6" />
    
    <path d="M165 100 L235 75" stroke="#e879f9" strokeWidth="1" opacity="0.6" />
    <path d="M165 100 L235 150" stroke="#e879f9" strokeWidth="1" opacity="0.6" />
    
    <path d="M265 150 L335 188" stroke="#f9a8d4" strokeWidth="1" opacity="0.8" />
  </svg>
);

const NLPViz = () => (
    <svg viewBox="0 0 400 300" className="w-full h-auto rounded-lg bg-white/60 dark:bg-white/90 border border-rose-100 p-4 transition-colors duration-300">
      <rect x="20" y="100" width="100" height="60" rx="8" fill="#f43f5e" />
      <text x="70" y="135" textAnchor="middle" fill="white" fontSize="14">Raw Text</text>
      
      <path d="M130 130 L170 130" stroke="#fda4af" strokeWidth="2" markerEnd="url(#arrow)" />
      
      <rect x="180" y="80" width="100" height="100" rx="8" fill="#d946ef" fillOpacity="0.1" stroke="#d946ef" strokeDasharray="4" />
      <text x="230" y="110" textAnchor="middle" fill="#a21caf" fontSize="12">Tokenization</text>
      <text x="230" y="130" textAnchor="middle" fill="#a21caf" fontSize="12">&</text>
      <text x="230" y="150" textAnchor="middle" fill="#a21caf" fontSize="12">Embedding</text>
      
      <path d="M290 130 L330 130" stroke="#fda4af" strokeWidth="2" markerEnd="url(#arrow)" />
      
      <rect x="340" y="100" width="40" height="60" rx="4" fill="#f9a8d4" />
      <text x="360" y="125" textAnchor="middle" fill="#831843" fontSize="10">0.89</text>
      <text x="360" y="145" textAnchor="middle" fill="#831843" fontSize="10">Vec</text>
    </svg>
  );

const EthicsViz = () => (
    <div className="w-full p-4 bg-white/60 dark:bg-white/90 border border-rose-100 rounded-lg flex flex-col gap-4 text-sm text-slate-700 transition-colors duration-300">
        <div className="flex items-center gap-3">
            <div className="p-2 bg-rose-100 rounded text-rose-600 font-bold">Bias</div>
            <span>Data reflects human errors.</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-fuchsia-100 rounded text-fuchsia-600 font-bold">Privacy</div>
            <span>Surveillance vs Safety trade-off.</span>
        </div>
        <div className="flex items-center gap-3">
            <div className="p-2 bg-pink-100 rounded text-pink-600 font-bold">Work</div>
            <span>Automation vs Augmentation.</span>
        </div>
    </div>
);

const GeneralViz = () => (
  <div className="flex flex-col items-center justify-center h-full p-6 text-center text-rose-300 dark:text-rose-300/80">
    <div className="mb-4 text-6xl opacity-50">🌸</div>
    <p>Ask Khanyi a question to see diagrams!</p>
  </div>
);

export const VisualizationPanel: React.FC<VisualizationProps> = ({ topic }) => {
  const renderContent = () => {
    switch (topic) {
      case TopicType.AI_VS_ML:
        return <AiVsMlViz />;
      case TopicType.NEURAL_NETWORKS:
        return <NeuralNetworkViz />;
      case TopicType.NLP:
        return <NLPViz />;
      case TopicType.ETHICS:
        return <EthicsViz />;
      case TopicType.CV:
        return <NeuralNetworkViz />; 
      default:
        return <GeneralViz />;
    }
  };

  return (
    <div className="h-full w-full flex flex-col">
       <h3 className="text-xs font-bold uppercase tracking-wider text-rose-400 dark:text-rose-300 mb-4">Visual Context</h3>
       <div className="flex-1 flex items-center justify-center">
         {renderContent()}
       </div>
    </div>
  );
};