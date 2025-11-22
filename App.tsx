import React, { useState, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { LoadingState } from './components/LoadingState';
import { NewsSection } from './components/NewsSection';
import { PrayerSection } from './components/PrayerSection';
import { generateIntercession } from './services/geminiService';
import { GenerationResult, AppState } from './types';
import { AlertCircle, RefreshCw } from 'lucide-react';

export default function App() {
  const [state, setState] = useState<AppState>(AppState.IDLE);
  const [data, setData] = useState<GenerationResult | null>(null);
  const [error, setError] = useState<string | null>(null);

  const handleGenerate = useCallback(async () => {
    setState(AppState.GENERATING);
    setError(null);
    try {
      const result = await generateIntercession();
      setData(result);
      setState(AppState.SUCCESS);
    } catch (err) {
      setState(AppState.ERROR);
      setError("Unable to connect to the peace service. Please try again in a moment.");
    }
  }, []);

  return (
    <div className="min-h-screen flex flex-col bg-slate-50 font-sans">
      <Header />

      <main className="flex-grow container mx-auto px-4 py-8 md:py-12 max-w-7xl">
        
        {/* Hero / Intro */}
        {state === AppState.IDLE && (
          <div className="max-w-2xl mx-auto text-center mb-16 animate-in slide-in-from-bottom-4 duration-700">
            <h2 className="text-3xl md:text-4xl font-serif font-semibold text-slate-800 mb-4">
              Transform News into Prayer
            </h2>
            <p className="text-slate-600 text-lg mb-8 leading-relaxed">
              IntercessorAI scans global headlines for "green shoots"—stories of rescue, 
              reconciliation, and mercy in conflict zones—and weaves them into a liturgical prayer 
              for your church or personal devotion.
            </p>
            <button 
              onClick={handleGenerate}
              className="bg-indigo-600 hover:bg-indigo-700 text-white text-lg font-medium px-8 py-4 rounded-full shadow-lg hover:shadow-indigo-200/50 transition-all flex items-center gap-2 mx-auto"
            >
              <RefreshCw size={20} />
              Search & Compose Prayer
            </button>
          </div>
        )}

        {/* Loading State */}
        {state === AppState.GENERATING && (
          <LoadingState />
        )}

        {/* Error State */}
        {state === AppState.ERROR && (
          <div className="max-w-md mx-auto bg-red-50 border border-red-200 rounded-lg p-6 text-center">
            <div className="flex justify-center text-red-500 mb-3">
              <AlertCircle size={32} />
            </div>
            <h3 className="text-red-800 font-semibold mb-2">Generation Failed</h3>
            <p className="text-red-600 mb-6">{error}</p>
            <button 
              onClick={handleGenerate}
              className="text-red-700 font-medium hover:underline"
            >
              Try Again
            </button>
          </div>
        )}

        {/* Results */}
        {state === AppState.SUCCESS && data && (
          <div className="animate-in fade-in duration-700">
             <div className="flex justify-end mb-6">
                <button 
                  onClick={handleGenerate} 
                  className="flex items-center gap-2 text-sm text-slate-500 hover:text-indigo-600 transition-colors bg-white border border-slate-200 px-4 py-2 rounded-lg shadow-sm"
                >
                  <RefreshCw size={14} />
                  Find New Updates
                </button>
             </div>

            <div className="grid lg:grid-cols-12 gap-8">
              {/* Left Column: News */}
              <div className="lg:col-span-5 h-full">
                <NewsSection newsItems={data.newsItems} />
              </div>

              {/* Right Column: Prayer */}
              <div className="lg:col-span-7 h-full">
                <PrayerSection prayer={data.prayer} />
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
    </div>
  );
}