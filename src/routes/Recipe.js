const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const{Recipe,TypeDiet}=require('../db')
const{getAllRecipes}= require('../controllers/getRecipes')
const{getAllRecipesId}= require('../controllers/getRecipesId')
const { API_KEY } = process.env;
const {axios}=require('axios')

const router = Router();
const getApiByName = async (name) => {
           
    try{
        const resAxios = await axios.get(`${URL}/recipes/complexSearch?apiKey=${API_KEY}&addRecipeInformation=true`);
        const { results } = resAxios.data;
        if(results.length > 0){
            let response = results?.map((el) => {
                return {
                    id:el.id,
                    name:el.title,
                    summary:el.summary,
                    spoonacularScore:el.spoonacularScore,
                    healthScore:el.healthScore,
                    image:el.image,
                    typeDiets: el.diets.map((d)=> {return{name:d}}),
                    steps: (el.analyzedInstructions[0] && el.analyzedInstructions[0].steps?el.analyzedInstructions[0].steps.map(item=>item.step).join(" \n"):'')
                }
            })
      return response           
    }

    else{
        console.log("NO hay coincidencia en la API");
        //return ('error');
    }

    }catch (error) {
        console.error(error);
        return ('error')
    }
}

//!                   5
const getDBByName = async (name) => {
    try{
        const DBInfo = await getDBInfo();
        const filtByName = DBInfo.filter(recipe => recipe.name.includes(name));
       
        return filtByName;
    }catch (error) {
        return ('error')
    } 
}
//!                   6     
const getInfoByName = async (name) => {
    try{
        const apiByName = await getApiByName(name)
        const DBByName = await getDBByName(name)
        const infoTotal = apiByName.concat(DBByName)
        return infoTotal
    }catch (error) {
        return ('error')
    }
}     

//^       
1
router.get('/name', async (req, res) => {

const { name } = req.query

if (name) {

    const infoByName = await getInfoByName(name);
    if (infoByName !== 'error'){
        console.log("Se encontro coincidencia con name")
        infoByName.length > 0 ? res.json(infoByName) : res.status(400).json([{ name: 'not found any recipes'}]);
    }else{
        console.log("Error")
        res.status(404).json([{ name: 'Error'}])
    }

}else{
   // para no confundir a home, si no hay un name de busqueda muestra toda la info.
    const allDate = await getAllInfo() 
    if (allDate !== 'error'){  
        res.json(allDate);
    }else{
        res.status(404).json({message:'Error en la búsqueda de datos'})
    }

}
});


module.exports = router;
