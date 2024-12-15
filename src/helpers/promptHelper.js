const ingredientsFormat = `
        name: string,
        ingredients: [
            {
                name: string,
                quantity: number,
                unit: string
            }
        ],
        instruction: string,
        nutrientValue: {
            calories: string,
            protein: string,
            fat: string,
            carbohydrates: string,
            fiber: string,
            sugar: string,
            sodium: string
            cholesterol: string,
            etc...
        }
    `;

const textIngredientPrompt = (ingredients) => `I have the following ingredients: ${ingredients.join(', ')}.`
const imageIngredientPrompt = 'I have ingredients as seen on the picture.'

exports.userCreationPrompt = (ingredients) => {
    return `
        ${ingredients ? textIngredientPrompt(ingredients) : imageIngredientPrompt}

        Can you create me array of JSON data for cooking menu recommendations? 
        Please create at least one dish that uses all of these ingredients, and 2 more dishes that use some of these ingredients. so you can create max 3 dishes.
        
        ${ingredientsFormat}

        Use string if the value is like 1/3, 1/2 cup, 1/4 cup, etc.
        Respond with only the JSON data, do not include any other text.
        Do not include '''JSON''' in the response.
        if you  can't create any dishes, respond with empty array.
    `;
};

exports.scanNutrientFactsPrompt = () => {
    return `
        Can you scan that nutrient fact image and provide me the summary of nutrient facts of the ingredients?
        The nutrient facts must be in strings with ordered list.
        Here's the example: [1.Seasalt,2.Sugar,3.Fat,4.Protein,5.Carbohydrate,6.Fiber,7.Calories,8.Sodium,9.Cholesterol]
        if you  can't create any dishes, respond with empty array.
    `;
}