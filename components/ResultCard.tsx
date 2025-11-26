
import React from 'react';
import { FashionAnalysis, Language } from '../types';
import { CheckCircle2, Lightbulb, Palette, Tag } from 'lucide-react';
import { translations } from '../utils/translations';

interface ResultCardProps {
  data: FashionAnalysis;
  onReset: () => void;
  lang: Language;
}

export const ResultCard: React.FC<ResultCardProps> = ({ data, onReset, lang }) => {
  const t = translations[lang].result;

  const getScoreColor = (score: number) => {
    if (score >= 90) return 'text-emerald-600 bg-emerald-50 ring-emerald-200';
    if (score >= 75) return 'text-indigo-600 bg-indigo-50 ring-indigo-200';
    if (score >= 60) return 'text-amber-600 bg-amber-50 ring-amber-200';
    return 'text-rose-600 bg-rose-50 ring-rose-200';
  };

  return (
    <div className="bg-white rounded-3xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in-up">
      {/* Header Section with Score */}
      <div className="p-8 border-b border-slate-100 flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Tag className="w-4 h-4 text-slate-400" />
            <span className="text-sm font-medium text-slate-500 uppercase tracking-wider">{t.styleCategory}</span>
          </div>
          <h2 className="text-3xl font-bold text-slate-900">{data.styleCategory}</h2>
          <p className="text-slate-600 mt-1 flex items-center gap-2">
             {t.occasion} <span className="font-semibold text-slate-800">{data.occasionSuitability}</span>
          </p>
        </div>

        <div className="flex items-center gap-4">
           <div className="text-right hidden md:block">
              <div className="text-sm text-slate-500 font-medium">{t.aiScore}</div>
              <div className="text-xs text-slate-400">{t.totalScore}</div>
           </div>
           <div className={`relative w-24 h-24 rounded-full flex items-center justify-center text-3xl font-bold ring-4 ${getScoreColor(data.score)}`}>
             {data.score}
           </div>
        </div>
      </div>

      <div className="p-8 grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Feedback Column */}
        <div className="space-y-6">
          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <CheckCircle2 className="w-5 h-5 text-emerald-500" />
              {t.highlights}
            </h3>
            <ul className="space-y-3">
              {data.positiveFeedback.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 bg-slate-50 p-3 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
              <Lightbulb className="w-5 h-5 text-amber-500" />
              {t.improvements}
            </h3>
            <ul className="space-y-3">
              {data.improvementTips.map((item, idx) => (
                <li key={idx} className="flex items-start gap-3 text-slate-600 bg-amber-50/50 p-3 rounded-lg">
                  <span className="w-1.5 h-1.5 rounded-full bg-amber-400 mt-2 shrink-0" />
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Palette & Details Column */}
        <div>
          <h3 className="text-lg font-semibold text-slate-900 mb-4 flex items-center gap-2">
            <Palette className="w-5 h-5 text-indigo-500" />
            {t.palette}
          </h3>
          
          {/* Improved Color Palette Display */}
          <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 mb-8">
             {data.colorPalette.map((colorItem, idx) => {
               // Fallback for backward compatibility or if model hallucinates old string format
               // If it's a string and looks like a hex, use it as hex. Otherwise assume it's a name with generic hex.
               const itemRaw = colorItem as any;
               const hex = typeof itemRaw === 'string' 
                  ? (itemRaw.startsWith('#') ? itemRaw : '#cccccc') 
                  : itemRaw.hex;
               
               const name = typeof itemRaw === 'string' 
                  ? (itemRaw.startsWith('#') ? 'Color' : itemRaw) 
                  : itemRaw.name;
               
               return (
                 <div key={idx} className="flex items-center gap-3 p-2 rounded-xl bg-slate-50 border border-slate-100 hover:border-indigo-100 transition-colors">
                   <div 
                      className="w-10 h-10 rounded-full shadow-sm border border-slate-200 ring-1 ring-white shrink-0"
                      style={{ backgroundColor: hex }}
                   />
                   <div className="min-w-0 flex-1">
                     <p className="text-sm font-semibold text-slate-800 truncate" title={name}>{name}</p>
                     <p className="text-[10px] text-slate-400 font-mono uppercase tracking-wide">{hex}</p>
                   </div>
                 </div>
               );
             })}
          </div>
          
          <div className="bg-slate-50 rounded-2xl p-6 border border-slate-100">
            <h4 className="text-sm font-semibold text-slate-900 uppercase tracking-wide mb-3">{t.summaryTitle}</h4>
            <p className="text-slate-600 italic leading-relaxed">
              "{t.summaryTemplate(data.styleCategory, data.score)}"
            </p>
          </div>

          <button 
            onClick={onReset}
            className="mt-8 w-full py-3 px-4 bg-slate-900 hover:bg-slate-800 text-white rounded-xl font-medium transition-colors shadow-lg shadow-slate-200"
          >
            {t.analyzeNext}
          </button>
        </div>
      </div>
    </div>
  );
};
