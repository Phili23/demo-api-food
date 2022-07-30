const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute=require('./Recipes')
const TypeDietsRoute=require('./TypeDiets')

const router = Router();
router.use('/Recipes', recipeRoute)
router.use('/name', recipeRoute)
router.use('/TypeDiets', TypeDietsRoute)
// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
/*https://api.spoonacular.com/recipes/complexSearch?apiKey=1e4a6481af524bb2a7acc89fd08e1e31&number=100&addRecipeInformation=true*/

module.exports = router;
