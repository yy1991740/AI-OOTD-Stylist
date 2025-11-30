'use client';

import { useState, useEffect } from 'react';
import { Header } from '../components/Header';
import { UploadZone } from '../components/UploadZone';
import { ResultCard } from '../components/ResultCard';
import { analyzeOutfitImage } from '../services/doubaoService';
import { AppState, FashionAnalysis, Language, ModelId } from '../types';
import { AlertCircle } from 'lucide-react';
import { translations } from '../utils/translations';

export default function Home() {
  const [appState, setAppState] = useState<AppState>(AppState.IDLE);
  const [analysisResult, setAnalysisResult] = useState<FashionAnalysis | null>(null);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [language, setLanguage] = useState<Language>('zh');
  const [currentModel, setCurrentModel] = useState<ModelId>('doubao-1.5-vision-pro-250328');
  const [loadingText, setLoadingText] = useState<string>('');

  const t = translations[language].app;

  const loadingMessages = {
    zh: ["正在压缩图片...", "正在分析色彩搭配...", "正在识别时尚单品...", "正在生成造型建议...", "马上就好..."],
    en: ["Compressing image...", "Analyzing colors...", "Identifying items...", "Generating advice...", "Almost there..."],
    id: ["Mengompres gambar...", "Menganalisis warna...", "Mengidentifikasi item...", "Menghasilkan saran...", "Hampir selesai..."]
  };

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (appState === AppState.ANALYZING) {
      let index = 0;
      const messages = loadingMessages[language];
      setLoadingText(messages[0]);
      
      interval = setInterval(() => {
        index = (index + 1) % messages.length;
        setLoadingText(messages[index]);
      }, 2000); // Change message every 2 seconds
    }
    return () => clearInterval(interval);
  }, [appState, language]);

  const handleImageSelected = async (file: File) => {
    setAppState(AppState.ANALYZING);
    setErrorMsg(null);
    
    try {
      const result = await analyzeOutfitImage(file, language, currentModel);
      setAnalysisResult(result);
      setAppState(AppState.SUCCESS);
    } catch (error) {
      console.error(error);
      setAppState(AppState.ERROR);
      setErrorMsg(t.errorGeneric);
    }
  };

  const handleReset = () => {
    setAppState(AppState.IDLE);
    setAnalysisResult(null);
    setErrorMsg(null);
  };

  return (
    <div className="min-h-screen bg-slate-50 pb-20">
      <Header 
        currentLang={language} 
        onLanguageChange={setLanguage}
        currentModel={currentModel}
        onModelChange={setCurrentModel}
      />
      
      <main className="max-w-4xl mx-auto px-4 pt-10">
        {/* Hero Text */}
        <div className={`text-center mb-12 transition-all duration-500 ${appState === AppState.SUCCESS ? 'opacity-0 h-0 overflow-hidden mb-0' : 'opacity-100'}`}>
          <h2 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">
            {t.titlePrefix} <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-600 to-violet-600">{t.titleSuffix}</span>
          </h2>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto leading-relaxed">
            {t.subtitle}
          </p>
        </div>

        {/* Main Content Area */}
        <div className="transition-all duration-500">
          {appState === AppState.ERROR && (
            <div className="max-w-md mx-auto mb-8 p-4 bg-red-50 border border-red-100 rounded-xl flex items-start gap-3 text-red-700 animate-pulse">
              <AlertCircle className="w-5 h-5 mt-0.5 shrink-0" />
              <p>{errorMsg}</p>
            </div>
          )}

          {appState !== AppState.SUCCESS ? (
            <UploadZone 
              onImageSelected={handleImageSelected} 
              isAnalyzing={appState === AppState.ANALYZING}
              lang={language}
              loadingText={loadingText}
            />
          ) : (
            analysisResult && (
              <ResultCard 
                data={analysisResult} 
                onReset={handleReset} 
                lang={language}
              />
            )
          )}
        </div>
      </main>
    </div>
  );
}
