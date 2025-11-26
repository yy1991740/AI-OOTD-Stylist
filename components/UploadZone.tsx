import React, { useState } from 'react';
import { UploadCloud, Loader2 } from 'lucide-react';
import { Language } from '../types';
import { translations } from '../utils/translations';

interface UploadZoneProps {
  onImageSelected: (file: File) => void;
  isAnalyzing: boolean;
  lang: Language;
}

export const UploadZone: React.FC<UploadZoneProps> = ({ onImageSelected, isAnalyzing, lang }) => {
  const [preview, setPreview] = useState<string | null>(null);
  const t = translations[lang].upload;

  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const objectUrl = URL.createObjectURL(file);
      setPreview(objectUrl);
      onImageSelected(file);
    }
  };

  return (
    <div className="w-full max-w-md mx-auto">
      <div className={`relative group border-2 border-dashed rounded-3xl transition-all duration-300 overflow-hidden bg-white
        ${isAnalyzing ? 'border-indigo-300 cursor-wait' : 'border-slate-300 hover:border-indigo-500 hover:shadow-lg cursor-pointer'}
      `}>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          disabled={isAnalyzing}
          className="absolute inset-0 w-full h-full opacity-0 z-10 cursor-pointer disabled:cursor-not-allowed"
        />
        
        <div className="p-10 flex flex-col items-center justify-center min-h-[400px] text-center">
          {preview ? (
            <>
               {/* Image Preview Background */}
              <div className="absolute inset-0 bg-slate-900">
                <img 
                  src={preview} 
                  alt="Preview" 
                  className="w-full h-full object-cover opacity-50 blur-sm group-hover:blur-md transition-all" 
                />
              </div>
              {/* Clear focused image on top */}
              <img 
                src={preview} 
                alt="Preview Focused" 
                className="relative z-0 max-h-[300px] rounded-xl shadow-2xl border-4 border-white object-contain" 
              />
              
              {isAnalyzing && (
                <div className="absolute inset-0 z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-sm">
                  <Loader2 className="w-12 h-12 text-white animate-spin mb-3" />
                  <p className="text-white font-medium text-lg animate-pulse">{t.analyzing}</p>
                </div>
              )}
              
              {!isAnalyzing && (
                 <div className="absolute bottom-4 left-0 right-0 z-10 text-white text-sm opacity-0 group-hover:opacity-100 transition-opacity">
                    {t.changePhoto}
                 </div>
              )}
            </>
          ) : (
            <>
              <div className="w-20 h-20 bg-indigo-50 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-transform duration-300">
                <UploadCloud className="w-10 h-10 text-indigo-500" />
              </div>
              <h3 className="text-xl font-semibold text-slate-800 mb-2">{t.title}</h3>
              <p className="text-slate-500 max-w-xs">
                {t.desc}
                <br/><span className="text-xs text-slate-400 mt-2 block">{t.formats}</span>
              </p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};
