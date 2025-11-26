
import React from 'react';
import { Camera, Sparkles, Globe, Bot } from 'lucide-react';
import { Language, ModelId } from '../types';
import { translations } from '../utils/translations';

interface HeaderProps {
  currentLang: Language;
  onLanguageChange: (lang: Language) => void;
  currentModel: ModelId;
  onModelChange: (model: ModelId) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentLang, onLanguageChange, currentModel, onModelChange }) => {
  const t = translations[currentLang].header;

  const getModelName = (id: ModelId) => {
    if (id === 'doubao-1.5-vision-pro-250328') return 'Doubao 1.5 Pro';
    if (id === 'doubao-seed-1-6-vision-250815') return 'Doubao 1.6 Vision';
    return id;
  };

  return (
    <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-4xl mx-auto px-4 h-16 flex items-center justify-between">
        <div className="flex items-center gap-2 text-indigo-600">
          <div className="bg-indigo-100 p-2 rounded-lg">
            <Camera size={24} />
          </div>
          <h1 className="text-xl font-bold tracking-tight text-slate-900">
            {t.titlePrefix} <span className="text-indigo-600">{t.titleSuffix}</span>
          </h1>
        </div>
        
        <div className="flex items-center gap-4">
          
          {/* Model Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors py-1">
              <Bot size={18} />
              <span className="text-sm font-medium hidden sm:inline-block">{getModelName(currentModel)}</span>
            </button>
            
            <div className="absolute right-0 top-full pt-2 w-56 hidden group-hover:block z-50">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
                <button 
                  onClick={() => onModelChange('doubao-1.5-vision-pro-250328')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${currentModel === 'doubao-1.5-vision-pro-250328' ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}
                >
                  Doubao 1.5 Pro
                </button>
                <button 
                  onClick={() => onModelChange('doubao-seed-1-6-vision-250815')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${currentModel === 'doubao-seed-1-6-vision-250815' ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}
                >
                  Doubao 1.6 Vision
                </button>
              </div>
            </div>
          </div>

          <div className="w-px h-4 bg-slate-300 mx-1"></div>

          {/* Language Selector */}
          <div className="relative group">
            <button className="flex items-center gap-1 text-slate-600 hover:text-indigo-600 transition-colors py-1">
              <Globe size={18} />
              <span className="text-sm font-medium uppercase">{currentLang}</span>
            </button>
            
            <div className="absolute right-0 top-full pt-2 w-32 hidden group-hover:block z-50">
              <div className="bg-white rounded-xl shadow-xl border border-slate-100 overflow-hidden animate-fade-in">
                <button 
                  onClick={() => onLanguageChange('zh')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${currentLang === 'zh' ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}
                >
                  中文
                </button>
                <button 
                  onClick={() => onLanguageChange('en')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${currentLang === 'en' ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}
                >
                  English
                </button>
                <button 
                  onClick={() => onLanguageChange('id')}
                  className={`w-full text-left px-4 py-2 text-sm hover:bg-slate-50 ${currentLang === 'id' ? 'text-indigo-600 font-medium' : 'text-slate-600'}`}
                >
                  Indonesia
                </button>
              </div>
            </div>
          </div>

          <div className="hidden sm:flex items-center gap-1 text-sm font-medium text-slate-600 bg-slate-100 px-3 py-1 rounded-full">
            <Sparkles size={14} className="text-amber-500" />
            <span>{t.poweredBy}</span>
          </div>
        </div>
      </div>
    </header>
  );
};
