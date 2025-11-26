
export interface ColorPaletteItem {
  hex: string;
  name: string;
}

export interface FashionAnalysis {
  score: number;
  styleCategory: string;
  colorPalette: ColorPaletteItem[];
  positiveFeedback: string[];
  improvementTips: string[];
  occasionSuitability: string;
}

export enum AppState {
  IDLE = 'IDLE',
  ANALYZING = 'ANALYZING',
  SUCCESS = 'SUCCESS',
  ERROR = 'ERROR',
}

export type Language = 'zh' | 'en' | 'id';

export type ModelId = 'doubao-1.5-vision-pro-250328' | 'doubao-seed-1-6-vision-250815';
