
const axios=require('axios')
const{Recipe,TypeDiet} = require('../db')
const {Sequelize} = require('sequelize');
const { API_KEY,URL } = process.env;
const {temps} = require('../controllers/jsonDiets');





const  getApiInfo=async()=>{
    let apiUrlOne=await axios.get(`${URL}?apiKey=${API_KEY}&number=5&addRecipeInformation=true`)
    console.log(apiUrlOne)
     
   const apiInfo=await apiUrlOne.data.results.map(el=>{
    return{
        id:el.id,
        name:el.title,
        summary:el.summary,
        spoonacularScore:el.spoonacularScore,
        healthScore:el.healthScore,
        image:el.image,
        typeDiets: el.diets.map((d)=> {return{name:d}}),
        steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
        
    }})
   console.log('yo soy apiInfo',apiInfo)
    return apiInfo;
}



async function getAllDietss() {
    // devuelvo solo los temperamentos
        
    let dietList = apiInfo.flatMap((el) => {
        console.log('yo soy listas la dietas', el.dietList)
        console.log('yo soy typos de dietas', el.typeDiets)
     /*  return el.typeDiets; */
    });

    TypeDiet.bulkCreate(dietList) 
    console.log('base de datos cargada')
}         




 
    
module.exports = { 
getApiInfo,
getAllDietss 
}