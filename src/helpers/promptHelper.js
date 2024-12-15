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
    
    
    // const conditionalPrompt = ingredients ? `with the following ingredients: ${ingredients.join(', ')}` : 'with the ingredients on the picture';

    // I need each cooking menu to have the following fields: name, ingredients, instruction, and nutrientValue.
    // with the type of each field as follows:

    // Make sure the JSON data is valid and complete.
    //     
    // Please create a menu for me that includes at least one dish that uses all of these ingredients, and 2 more dishes that use some of these ingredients. so you can create max 3 dishes.
    
    // Please provide the name of the dish, the ingredients used, the instruction to make the dish, and the nutrient value of the dish.
    // Please provide the response in JSON format.
    // I need each cooking menu to have the following fields: name, ingredients, instruction, and nutrientValue.
    //     with the type of each field as follows:
    //     name: string,
    //     ingredients: [
    //         {
    //             name: string,
    //             quantity: number,
    //             unit: string
    //         }
    //     ],
    //     instruction: string,
    //     nutrientValue: {
    //         calories: number,
    //         protein: number,
    //         fat: number,
    //         carbohydrates: number,
    //         fiber: number,
    //         sugar: number,
    //         sodium: number
    //         cholesterol: number,
    //         etc...
    //     }
    //     Respond with only the JSON data, do not include any other text.
