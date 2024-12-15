
const {
    FunctionDeclarationSchemaType,
    HarmBlockThreshold,
    HarmCategory,
    VertexAI
} = require('@google-cloud/vertexai');
const GEMINI_API_KEY = process.env.GEMINI_API_KEY;
const project = 'resepin';
const location = 'us-central1';
const textModel = 'gemini-1.5-pro';
const visionModel = 'gemini-1.0-pro-vision';
// const visionModel = 'imagen-3.0-fast-generate-001';
const vertexAI = new VertexAI({ project: project, location: location });
// const genAI = new GoogleGenerativeAI("YOUR_API_KEY");

const generationConfig = { maxOutputTokens: 256 }
const safetySettings = [{ category: HarmCategory.HARM_CATEGORY_DANGEROUS_CONTENT, threshold: HarmBlockThreshold.BLOCK_MEDIUM_AND_ABOVE }]
const systemInstruction = {
    role: 'system',
    parts: [{ text: `You are a helpful chef who can recommend recipes based on ingredients.` }]
};

// Instantiate Gemini models
exports.generativeModel = vertexAI.getGenerativeModel({
    model: textModel,
    safetySettings,
    systemInstruction,
});

exports.generativeVisionModel = vertexAI.getGenerativeModel({
    model: visionModel,
    safetySettings,
    // systemInstruction
});

exports.generativeModelPreview = vertexAI.preview.getGenerativeModel({
    model: textModel,
});