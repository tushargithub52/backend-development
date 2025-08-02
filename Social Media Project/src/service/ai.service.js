const { GoogleGenAI } = require("@google/genai");

const ai = new GoogleGenAI({});

async function generateCaption(base64ImageFile) {
  const contents = [
        {
            inlineData: {
                mimeType: "image/jpeg",
                data: base64ImageFile,
            },
        },
        { text: "Caption this image." },
    ];

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash",
        contents: contents,
        config: {
            systemInstruction: `
            You are an expert in crafting Instagram captions.  
            Generate **one** short, aesthetic, and Gen Z-friendly caption for a given image.  
            The caption should be concise, catchy, and vibe with today's social media trends.  
            Incorporate relevant emojis and hashtags that enhance the post's reach and visual appeal.  
            Avoid long sentences or formal tones — keep it effortlessly cool.
            `
        }
    });

    return response.text
}

module.exports = generateCaption;