const { userCreationPrompt, scanNutrientFactsPrompt } = require('../helpers/promptHelper');
const { successResponse, errorResponse } = require('../helpers/responseHelper');
const { generativeModel, generativeVisionModel } = require('../lib/vertex');
const db = require('../models');
const UserCreation = db.UserCreation;

exports.getUserCreations = async (req, res) => {
    try {
        const userId = req.user.id;
        const { isFavorite } = req.body;

        const userCreations = await UserCreation.findAll({
            where: {
                userId,
                ...(isFavorite !== undefined && { isFavorite }) // Only add isFavorite to the query if it's defined
            }
        });

        return successResponse(res, 'User creations retrieved successfully', userCreations);
    } catch (error) {
        console.log(error);

        return errorResponse(res, 'User creations retrieval failed', error);
    }
};

exports.createUserCreation = async (req, res) => {
    try {
        const userId = req.user.id;
        const { ingredients, base64Image } = req.body;

        let request, result;
        // Construct request based on the presence of a base64Image
        if (base64Image) {
            const filePart = { inline_data: { data: base64Image, mimeType: 'image/jpeg' } };
            const textPart = { text: userCreationPrompt(ingredients) };
            request = {
                contents: [{ role: 'user', parts: [textPart, filePart] }],
            };
            result = await generativeVisionModel.generateContent(request);
        } else {
            request = {
                contents: [{ role: 'user', parts: [{ text: userCreationPrompt(ingredients) }] }],
            };
            result = await generativeModel.generateContent(request);
        }

        const response = result.response.candidates[0]?.content?.parts[0]?.text;

        const normalizedMessage = response.replace(/\r\n/g, '\n').trim();
        if (!normalizedMessage) {
            throw new Error('Invalid response from generative model');
        }

        try {
            const responseJson = JSON.parse(normalizedMessage);
            const creations = responseJson.map(({ name, ingredients, instruction, nutrientValue }) => {
                return {
                    userId,
                    name,
                    image: "", // Add image path or leave empty if not provided
                    ingredients: JSON.stringify(ingredients), // Serialize ingredients as JSON string
                    instruction,
                    nutrientValue: JSON.stringify(nutrientValue), // Serialize nutrientValue as JSON string
                    isFavorite: false, // Default value, adjust as needed
                };
            });

            // Bulk creation for scalability
            await UserCreation.bulkCreate(creations);

            return successResponse(res, 'Menu creation created successfully', responseJson);
        } catch (error) {
            return errorResponse(res, 'Failed to parse JSON', error.message);
        }
    } catch (error) {
        return errorResponse(res, 'Menu creation failed', error.message);
    }
};

exports.scanNutrientFacts = async (req, res) => {
    try {
        const { base64Image } = req.body;
        const filePart = { inline_data: { data: base64Image, mimeType: 'image/jpeg' } };
        const response = await generativeVisionModel.generateContent({
            contents: [{ role: 'user', parts: [{ text: scanNutrientFactsPrompt() }, filePart] }],
        });

        const nutrientFacts = response.response.candidates[0]?.content?.parts[0]?.text;
        if (!nutrientFacts) {
            throw new Error('Invalid response from generative model');
        }

        const normalizedMessage = nutrientFacts.replace(/\r\n/g, '\n').trim();
        const responseJson = normalizedMessage
            .replace(/^\[|\]$/g, '') // Remove the square brackets
            .split(/\d+\.\s*/) // Split by the numbers followed by a period and space
            .filter(item => item.trim() !== ''); // Remove empty strings

        return successResponse(res, 'Nutrient facts retrieved successfully', responseJson);
    } catch (error) {
        console.log(error);

        return errorResponse(res, 'Nutrient facts retrieval failed', error.message);
    }
};