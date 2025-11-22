import React from 'react';
import { Sparkles, Copy, Check } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface PrayerSectionProps {
  prayer: string;
}

export const PrayerSection: React.FC<PrayerSectionProps> = ({ prayer }) => {
  const [copied, setCopied] = React.useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(prayer);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="bg-paper border border-stone-200 rounded-xl shadow-md overflow-hidden flex flex-col h-full">
      <div className="bg-stone-100/50 border-b border-stone-200 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-indigo-100 text-indigo-700 rounded-full">
            <Sparkles size={20} />
          </div>
          <h2 className="text-lg font-bold text-stone-800 font-serif">Prayer of the Faithful</h2>
        </div>
        <button 
          onClick={handleCopy}
          className="flex items-center gap-1.5 text-xs font-medium text-stone-500 hover:text-indigo-600 transition-colors"
        >
          {copied ? <Check size={14} /> : <Copy size={14} />}
          {copied ? 'Copied' : 'Copy Text'}
        </button>
      </div>

      <div className="p-8 md:p-10 font-serif text-lg md:text-xl leading-loose text-stone-800 flex-grow bg-[url('https://www.transparenttextures.com/patterns/cream-paper.png')]">
        {prayer ? (
           <div className="prose prose-stone prose-p:mb-6 prose-p:leading-loose prose-strong:font-bold prose-strong:text-stone-900 max-w-none">
             <ReactMarkdown>{prayer}</ReactMarkdown>
           </div>
        ) : (
          <p className="text-stone-400 italic text-center mt-10">The prayer will appear here...</p>
        )}
        
        <div className="mt-12 flex justify-center">
            <span className="text-stone-300">❖</span>
        </div>
      </div>
    </div>
  );
};