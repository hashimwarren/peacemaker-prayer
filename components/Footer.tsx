import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="w-full py-8 mt-12 border-t border-slate-200 bg-slate-50 text-center">
      <p className="text-slate-500 text-sm">
        Generated with compassion by IntercessorAI using Google Gemini models.
      </p>
      <p className="text-slate-400 text-xs mt-2">
        Always review AI-generated content for theological and factual accuracy before public reading.
      </p>
    </footer>
  );
};