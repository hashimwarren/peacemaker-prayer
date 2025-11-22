import React from 'react';
import { Loader2, Sun } from 'lucide-react';

export const LoadingState: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center py-20 animate-in fade-in duration-700">
      <div className="relative mb-6">
        <div className="absolute inset-0 bg-indigo-100 rounded-full animate-ping opacity-75"></div>
        <div className="relative bg-white p-4 rounded-full shadow-md border border-indigo-50">
          <Sun className="text-amber-500 animate-pulse" size={48} />
        </div>
      </div>
      <h3 className="text-lg font-semibold text-slate-700 mb-2">Scanning for hope...</h3>
      <p className="text-slate-500 text-center max-w-md">
        Searching global news for stories of peace, rescue, and mercy to guide our prayers.
      </p>
      <div className="mt-6 flex items-center gap-2 text-sm text-indigo-600">
        <Loader2 className="animate-spin" size={16} />
        <span>Interceding</span>
      </div>
    </div>
  );
};