const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const { Recipe, TypeDiet } = require('../db')
const { getAllRecipes,getApiInfo } = require('../controllers/getRecipes')
const { API_KEY } = process.env;
const { axios } = require('axios')

const router = Router();
//busqueda por title
router.get('/', async (req, res) => {
  try {
    const { name } = req.query;
    const dogsTotal = await getAllRecipes(name);
    if (name) {
      let dogsName = await dogsTotal.filter(e => e.name.toLowerCase().includes(name.toLowerCase()))
      dogsName.length ?
        res.status(200).send(dogsName) :
        res.status(404).send("Lo siento, no se encontro el Perrito Buscado");
    }
    else {

      res.status(200).send(dogsTotal)
    };
  } catch (error) {
    console.log("Se encontro una falla en el get /food", error)
  }


});


//busqueda por id

router.get('/:id', async (req, res, next) => {
  const { id } = req.params
  try {
    const recipeId = await getAllRecipes(id);
    let recipeById = recipeId.filter(v => v.id == id)
    if (recipeById.length > 0) return res.status(200).send(recipeById);
    res.status(404).send('Receta no encontrada');
  } catch (error) {
    res.status(404).send('Receta no encontrada en cgtch');
  }
})


//agregar una receta

router.post('/', async (req, res) => {
  try {
    let { name, summary, spoonacularScore, healthScore, image, typeDiets, steps, created } = req.body;

    let createdRecipe = await Recipe.create({
      name,
      summary,
      spoonacularScore,
      healthScore,
      image,
      steps,
      created

    });
    let typeDietDb = await TypeDiet.findAll({
      where: { name: typeDiets }
    }); //name de tabla TypeDiets
    createdRecipe.addTypeDiet(typeDietDb);
    /*  res.send('Succesfull'); */
    res.status(200).send('receta creada')
  } catch (error) {
    console.log(error)
  }
});

// eliminar receta  de la base dtos*/
router.delete('/delete/:id', async (req, res) => {
  const { id } = req.params;
  try {
    if (id) {
      const allRecipe = await Recipe.destroy({
        where: { id: id }
      })
      res.send('eliminado de la base de datos')
    }
  } catch (error) {
    res.send(`Error in route /Dog/delete ${error}`);
  }

});



module.exports = router;
