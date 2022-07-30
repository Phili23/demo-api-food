const axios = require('axios');
const { Recipe, TypeDiet } = require('../db')
const { Sequelize } = require('sequelize');
const { API_KEY, URL,spoonacularURL } = process.env;
//const URL = "https://api.spoonacular.com/recipes/"; 


const getApiInfo = async () => {
    let apiUrlOne=await axios.get(`${URL}/complexSearch?apiKey=${API_KEY}&number=10&addRecipeInformation=true`)
    console.log('yo soy ',apiUrlOne)
    const apiInfo = await apiUrlOne.data.results.map(el => {
        return {
            id: el.id,
            name: el.title,
            summary: el.summary,
            spoonacularScore: el.spoonacularScore,
            healthScore: el.healthScore,
            image: el.image,
            typeDiets: el.diets.map((d) => { return { name: d } }),
            steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps ? el.analyzedInstructions[0].steps.map(item => item.step).join(" \n") : '')
        }
    })
console.log('yo soy ',apiInfo)
    return apiInfo;

}
const getDbInfo = async () => {
    return await Recipe.findAll({
        include: {
            model: TypeDiet,
            attributes: ['name'],
            through: {
                attributes: []
            }
        }
    })
} 
 
const getAllRecipes = async () => {
    const apiInfo = await getApiInfo();
    const dbInfo = await getDbInfo()
    const allInfo = apiInfo.concat(dbInfo);
    console.log(allInfo)
    return allInfo;
}; 


module.exports = {
    getAllRecipes,
    getApiInfo

}