import React from 'react';
import { Globe, ExternalLink } from 'lucide-react';
import ReactMarkdown from 'react-markdown';

interface NewsSectionProps {
  newsItems: string[];
}

export const NewsSection: React.FC<NewsSectionProps> = ({ newsItems }) => {
  return (
    <div className="bg-white rounded-xl border border-slate-200 overflow-hidden shadow-sm h-full flex flex-col">
      <div className="bg-emerald-50/50 border-b border-emerald-100 px-6 py-4 flex items-center gap-3">
        <div className="p-2 bg-emerald-100 text-emerald-700 rounded-full">
          <Globe size={20} />
        </div>
        <h2 className="text-lg font-bold text-slate-800">Hopeful News This Week</h2>
      </div>
      
      <div className="p-6 flex-grow">
        <ul className="space-y-5">
          {newsItems.length > 0 ? (
            newsItems.map((item, idx) => (
              <li key={idx} className="flex gap-3 text-slate-700 leading-relaxed">
                <span className="text-emerald-500 font-bold text-lg leading-none mt-1.5">•</span>
                <div className="prose prose-slate prose-sm max-w-none prose-p:m-0 prose-a:text-indigo-600 prose-a:no-underline hover:prose-a:underline prose-strong:font-bold prose-strong:text-slate-900">
                  <ReactMarkdown
                    components={{
                      a: ({node, ...props}) => (
                        <a 
                          {...props} 
                          target="_blank" 
                          rel="noopener noreferrer" 
                          className="inline-flex items-baseline gap-1 font-medium text-indigo-600 hover:text-indigo-800 bg-indigo-50 px-1.5 py-0.5 rounded text-xs transform translate-y-[-1px] ml-1"
                        >
                          <ExternalLink size={10} className="self-center" />
                          {props.children}
                        </a>
                      )
                    }}
                  >
                    {item}
                  </ReactMarkdown>
                </div>
              </li>
            ))
          ) : (
            <p className="text-slate-500 italic">Searching for hopeful updates...</p>
          )}
        </ul>
      </div>
    </div>
  );
};