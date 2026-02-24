
import { GoogleGenAI, Type, Modality } from "@google/genai";
import { StudyProfile, StudyPlan, QuizResult } from "../types";
import { STUDY_SYSTEM_INSTRUCTION } from "../constants";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

const cleanJsonString = (str: string) => {
  return str.replace(/```json/g, "").replace(/```/g, "").trim();
};

export const generateDetailedStudyPlan = async (profile: StudyProfile, quizAnswers: string[], isThinking: boolean): Promise<StudyPlan> => {
  const prompt = `
    Hồ sơ học sinh:
    - Lớp: ${profile.grade}
    - Thế mạnh: ${profile.strengths}
    - Yếu điểm: ${profile.weaknesses}
    - Thách thức: ${profile.challenges}
    - Mục tiêu: ${profile.goals}
    - Sức bền tập trung: ${profile.focusTime} giờ/ngày
    - Giấc ngủ: ${profile.sleepDuration} giờ/ngày
    
    Kết quả 8 câu hỏi Mini-test:
    ${quizAnswers.map((a, i) => `Câu ${i+1}: ${a}`).join('\n')}

    Hướng dẫn: Tạo lộ trình 4 bước chiến lược. ${isThinking ? "Hãy sử dụng tư duy sâu để đưa ra các phân tích mang tính bước ngoặt." : ""}
  `;

  try {
    const response = await ai.models.generateContent({
      model: isThinking ? 'gemini-3-pro-preview' : 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        systemInstruction: STUDY_SYSTEM_INSTRUCTION,
        responseMimeType: "application/json",
        thinkingConfig: isThinking ? { thinkingBudget: 24576 } : undefined, // Giảm nhẹ budget để tránh quota Pro
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            roadmap: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                properties: {
                  title: { type: Type.STRING },
                  content: { type: Type.STRING },
                },
                required: ["title", "content"]
              }
            },
            summary: { type: Type.STRING },
            advice: { type: Type.STRING },
            motivationalQuote: { type: Type.STRING },
          },
          required: ["roadmap", "summary", "advice", "motivationalQuote"]
        },
      },
    });

    const text = response.text || "{}";
    return JSON.parse(cleanJsonString(text));
  } catch (error) {
    console.error("Lỗi generateDetailedStudyPlan:", error);
    throw error;
  }
};

export const generateVividAudio = async (text: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash-preview-tts",
      contents: [{ parts: [{ text: `Hãy đọc đoạn văn sau với giọng điệu truyền cảm hứng, ấm áp như một người bạn: ${text}` }] }],
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Kore' },
          },
        },
      },
    });

    const base64Audio = response.candidates?.[0]?.content?.parts?.[0]?.inlineData?.data;
    return base64Audio || "";
  } catch (error) {
    console.error("Lỗi generateVividAudio:", error);
    return "";
  }
};

export const chatWithAssistant = async (message: string, useSearch: boolean) => {
  // Ưu tiên Flash cho chat thông thường để tránh lỗi quota 429 của bản Pro
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview', 
      contents: message,
      config: {
        tools: useSearch ? [{ googleSearch: {} }] : undefined,
        systemInstruction: "Bạn là MindStudy GPT - một trợ lý học tập cực kỳ Gen Z, năng động và thông thái. Bạn có khả năng giải quyết mọi bài tập từ tự nhiên đến xã hội, viết code đỉnh cao và tư vấn tâm lý học đường cực 'vibe'. Trả lời bằng tiếng Việt, sử dụng Markdown và LaTeX khi cần thiết để trình bày công thức toán học/vật lý một cách chuyên nghiệp. Luôn giữ thái độ thân thiện, khích lệ và thỉnh thoảng dùng từ lóng Gen Z phù hợp."
      },
    });

    return {
      text: response.text,
      sources: response.candidates?.[0]?.groundingMetadata?.groundingChunks || []
    };
  } catch (error: any) {
    console.error("Lỗi chatWithAssistant:", error);
    if (error.message?.includes('429') || error.message?.toLowerCase().includes('quota')) {
      throw new Error("429");
    }
    throw error;
  }
};

export const fastSummary = async (content: string) => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Tóm tắt cực ngắn nội dung sau trong 1 câu kiểu Gen Z: ${content}`,
    });
    return response.text;
  } catch (error) {
    return "Tóm tắt đang bị nghẽn xíu, chờ tớ nha!";
  }
};

export const generateRelaxSuggestions = async (stressSource: string): Promise<string> => {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: `Người dùng đang cảm thấy mệt mỏi hoặc căng thẳng do: ${stressSource}. Hãy đưa ra lời khuyên thư giãn bằng các hành động cụ thể (đọc sách, chạy bộ, làm việc nhà, đan len...) một cách ngắn gọn, ấm áp và cực kỳ Gen Z.`,
    });
    return response.text || "Hãy dành chút thời gian hít thở sâu và nghỉ ngơi nhé.";
  } catch (error) {
    return "Hơi quá tải một chút, hãy thử hít thở sâu và vận động nhẹ nhàng nhé!";
  }
};
