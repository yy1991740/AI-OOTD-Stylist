import { FashionAnalysis, Language, ModelId } from "../types";

// Helper to compress image and convert to Base64
const compressImage = async (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = (event) => {
      const img = new Image();
      img.src = event.target?.result as string;
      img.onload = () => {
        const canvas = document.createElement('canvas');
        const MAX_WIDTH = 800; // Limit width to 800px
        const MAX_HEIGHT = 800; // Limit height to 800px
        let width = img.width;
        let height = img.height;

        if (width > height) {
          if (width > MAX_WIDTH) {
            height *= MAX_WIDTH / width;
            width = MAX_WIDTH;
          }
        } else {
          if (height > MAX_HEIGHT) {
            width *= MAX_HEIGHT / height;
            height = MAX_HEIGHT;
          }
        }

        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        ctx?.drawImage(img, 0, 0, width, height);

        // Compress to JPEG with 0.6 quality
        const dataUrl = canvas.toDataURL('image/jpeg', 0.6);
        const base64Data = dataUrl.split(',')[1];
        resolve(base64Data);
      };
      img.onerror = reject;
    };
    reader.onerror = reject;
  });
};

export const analyzeOutfitImage = async (file: File, lang: Language, modelId: ModelId): Promise<FashionAnalysis> => {
  try {
    // Compress image before sending
    const base64Data = await compressImage(file);
    
    const response = await fetch('/api/analyze', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({
            base64Data,
            lang,
            modelId,
            fileType: 'image/jpeg' // Always sending JPEG after compression
        })
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Failed to analyze image');
    }

    const data = await response.json();
    return data as FashionAnalysis;

  } catch (error) {
    console.error("Error analyzing outfit:", error);
    throw error;
  }
};
