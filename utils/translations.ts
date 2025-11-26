
import { Language } from '../types';

export const translations = {
  zh: {
    header: {
      titlePrefix: "AI 穿搭",
      titleSuffix: "评分",
      poweredBy: "Powered by Doubao",
      modelSelect: "模型"
    },
    upload: {
      analyzing: "正在分析您的风格...",
      changePhoto: "点击更换照片",
      title: "上传您的 OOTD",
      desc: "点击或拖拽上传您的穿搭照片",
      formats: "支持 JPG, PNG, WEBP"
    },
    result: {
      styleCategory: "风格类别",
      occasion: "推荐场合：",
      aiScore: "AI 评分",
      totalScore: "总分 100",
      highlights: "亮点分析",
      improvements: "改进建议",
      palette: "配色分析",
      summaryTitle: "造型师总结",
      analyzeNext: "分析另一套穿搭",
      summaryTemplate: (style: string, score: number) => `这套搭配很好地展现了 ${style} 风格。综合评分 ${score} 分，说明你的品味不错。建议在细节上多加注意，能让整体造型更上一层楼。`
    },
    app: {
      titlePrefix: "AI 穿搭",
      titleSuffix: "评分",
      subtitle: "上传您的穿搭照片，让 AI 造型师为您分析搭配、配色及整体风格。",
      errorGeneric: "无法分析该图片。请确保上传清晰的全身或半身穿搭照片后重试。"
    }
  },
  en: {
    header: {
      titlePrefix: "AI Outfit",
      titleSuffix: "Rater",
      poweredBy: "Powered by Doubao",
      modelSelect: "Model"
    },
    upload: {
      analyzing: "Analyzing your style...",
      changePhoto: "Click to change photo",
      title: "Upload your OOTD",
      desc: "Click or drag to upload your outfit photo",
      formats: "Supports JPG, PNG, WEBP"
    },
    result: {
      styleCategory: "Style Category",
      occasion: "Occasion: ",
      aiScore: "AI Score",
      totalScore: "Total 100",
      highlights: "Highlights",
      improvements: "Improvements",
      palette: "Color Palette",
      summaryTitle: "Stylist Summary",
      analyzeNext: "Analyze Another Outfit",
      summaryTemplate: (style: string, score: number) => `This outfit showcases the ${style} style well. With a score of ${score}, you have great taste. Paying attention to details could elevate your look further.`
    },
    app: {
      titlePrefix: "AI Outfit",
      titleSuffix: "Rater",
      subtitle: "Upload your outfit photo and let the AI stylist analyze your mix, colors, and overall style.",
      errorGeneric: "Unable to analyze image. Please ensure you upload a clear full-body or half-body outfit photo."
    }
  },
  id: {
    header: {
      titlePrefix: "Penilai",
      titleSuffix: "OOTD AI",
      poweredBy: "Didukung oleh Doubao",
      modelSelect: "Model"
    },
    upload: {
      analyzing: "Menganalisis gaya...",
      changePhoto: "Klik untuk ganti foto",
      title: "Unggah OOTD Anda",
      desc: "Klik atau seret untuk unggah foto",
      formats: "Mendukung JPG, PNG, WEBP"
    },
    result: {
      styleCategory: "Kategori Gaya",
      occasion: "Acara: ",
      aiScore: "Skor AI",
      totalScore: "Total 100",
      highlights: "Sorotan",
      improvements: "Saran Perbaikan",
      palette: "Palet Warna",
      summaryTitle: "Ringkasan Penata Gaya",
      analyzeNext: "Analisis Pakaian Lain",
      summaryTemplate: (style: string, score: number) => `Pakaian ini menampilkan gaya ${style} dengan baik. Skor ${score} menunjukkan selera Anda bagus. Perhatian pada detail dapat meningkatkan penampilan Anda.`
    },
    app: {
      titlePrefix: "Penilai",
      titleSuffix: "OOTD AI",
      subtitle: "Unggah foto pakaian Anda dan biarkan penata gaya AI menganalisis padu padan, warna, dan gaya keseluruhan.",
      errorGeneric: "Tidak dapat menganalisis gambar. Pastikan Anda mengunggah foto pakaian yang jelas."
    }
  }
};

export const getPrompts = (lang: Language) => {
  const prompts = {
    zh: {
      system: "你是一位专业且眼光独到的时尚造型师。你的任务是发现穿搭中的亮点，给予热情、鼓励性的评价。请注意：AI模型通常倾向于给出保守的70-80分，你需要克服这一点，对于好看的穿搭要大胆给出90分以上的高分。",
      user: `分析这张穿搭照片并给出100分制的评分。

              ⚠️ 核心打分原则（请务必遵守）：
              请打破常规 AI 评分的保守倾向！我们鼓励自信和个性。
              - 只要搭配整洁、没有明显错误，请从 **80分** 起评。
              - 只要有一两个亮点（如色彩呼应、单品独特、氛围感好），请直接给出 **90分以上**。
              - 对于非常有型、自信或照片质感好的穿搭，请毫不犹豫地给出 **95-100分**！
              - 只有在搭配极度混乱或极其不协调时，才给出 60-70 分。

              评分标准参考：
              1. 🌟 90-100分：【惊艳/优秀】搭配有想法，有风格，看着很舒服。一定要敢于给高分！
              2. ✨ 80-89分：【良好】整体不错，日常穿搭的优秀水平。
              3. 👌 70-79分：【普通】中规中矩，无功无过。
              4. ⚠️ 70分以下：需要较大改进。

              任务：
              1. 根据上述激进的高分策略打分。
              2. 识别风格。
              3. 提取主要配色（提供精确HEX值）。
              4. 给出具体反馈（多夸奖，建议要委婉实用）。
              
              请务必返回以下结构的有效 JSON 对象（不要使用 Markdown 代码块，所有文本内容必须使用简体中文）：
              {
                "score": number (1-100 的整数),
                "styleCategory": "string (例如：法式慵懒、美式复古、简约通勤)",
                "colorPalette": [{"hex": "#RRGGBB", "name": "颜色名称"}, {"hex": "#RRGGBB", "name": "颜色名称"}, ...],
                "positiveFeedback": ["string (夸夸搭配)", "string (夸夸单品)", ...],
                "improvementTips": ["string (温和的建议)", "string", ...],
                "occasionSuitability": "string"
              }`
    },
    en: {
      system: "You are a professional fashion stylist with a keen eye. Your task is to spot highlights in outfits and give enthusiastic, encouraging feedback. Note: AI models tend to be conservative (70-80 scores); you must overcome this and boldly give 90+ scores for good looks.",
      user: `Analyze this outfit photo and rate it out of 100.

              ⚠️ Core Scoring Principles (Strictly Follow):
              Break the conservative AI scoring bias! We encourage confidence and individuality.
              - If the outfit is neat and has no obvious errors, start scoring from **80**.
              - If there are 1-2 highlights (e.g., color matching, unique items, great vibe), go directly to **90+**.
              - For stylish, confident, or aesthetic photos, do not hesitate to give **95-100**!
              - Only give 60-70 if the outfit is extremely chaotic or mismatched.

              Scoring Reference:
              1. 🌟 90-100: [Stunning/Excellent] Stylish, thoughtful, comfortable look. Be bold with high scores!
              2. ✨ 80-89: [Good] Great overall, excellent for daily wear.
              3. 👌 70-79: [Average] Standard, safe choice.
              4. ⚠️ Below 70: Needs major improvement.

              Tasks:
              1. Score based on the aggressive high-score strategy above.
              2. Identify style.
              3. Extract main color palette (exact HEX codes).
              4. Provide specific feedback (Compliment more, keep advice gentle and practical).
              
              Please return a valid JSON object with the following structure (Do not use Markdown code blocks, all text content must be in English):
              {
                "score": number (integer 1-100),
                "styleCategory": "string (e.g., Streetwear, Minimalist)",
                "colorPalette": [{"hex": "#RRGGBB", "name": "Color Name"}, {"hex": "#RRGGBB", "name": "Color Name"}, ...],
                "positiveFeedback": ["string", "string", ...],
                "improvementTips": ["string", "string", ...],
                "occasionSuitability": "string"
              }`
    },
    id: {
      system: "Anda adalah penata gaya busana profesional. Tugas Anda adalah menemukan sorotan dalam pakaian dan memberikan umpan balik yang antusias. Catatan: Model AI cenderung konservatif (skor 70-80); Anda harus mengatasinya dan berani memberikan skor 90+ untuk penampilan yang bagus.",
      user: `Analisis foto pakaian ini dan beri nilai dari 100.

              ⚠️ Prinsip Penilaian Utama (Ikuti dengan Ketat):
              Hancurkan bias penilaian AI yang konservatif!
              - Jika pakaian rapi dan tidak ada kesalahan nyata, mulai penilaian dari **80**.
              - Jika ada 1-2 sorotan (misal: paduan warna, barang unik, kesan bagus), langsung beri **90+**.
              - Untuk pakaian yang bergaya, percaya diri, atau estetis, jangan ragu memberikan **95-100**!
              - Hanya beri 60-70 jika pakaian sangat kacau.

              Referensi Penilaian:
              1. 🌟 90-100: [Memukau/Luar Biasa] Bergaya, penuh pertimbangan. Berani beri skor tinggi!
              2. ✨ 80-89: [Bagus] Bagus secara keseluruhan.
              3. 👌 70-79: [Rata-rata] Standar, pilihan aman.
              4. ⚠️ Di bawah 70: Perlu perbaikan besar.

              Tugas:
              1. Beri skor berdasarkan strategi skor tinggi di atas.
              2. Identifikasi gaya.
              3. Ekstrak palet warna utama (kode HEX yang tepat).
              4. Berikan umpan balik spesifik.
              
              Harap kembalikan objek JSON yang valid dengan struktur berikut (Jangan gunakan blok kode Markdown, semua konten teks harus dalam Bahasa Indonesia):
              {
                "score": number (bilangan bulat 1-100),
                "styleCategory": "string",
                "colorPalette": [{"hex": "#RRGGBB", "name": "Nama Warna"}, {"hex": "#RRGGBB", "name": "Nama Warna"}, ...],
                "positiveFeedback": ["string", "string", ...],
                "improvementTips": ["string", "string", ...],
                "occasionSuitability": "string"
              }`
    }
  };
  return prompts[lang];
};
