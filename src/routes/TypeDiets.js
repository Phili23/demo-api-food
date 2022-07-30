const { Router } = require('express');
const router = Router();
const {TypeDiet,getAllDietss} = require('../db');

const axios=require('axios')

 let diets = [{name: 'gluten free'},{name: 'ketogenic'},{name: 'vegetarian'},{name: 'fodmap friendly'},
{name: 'lacto ovo vegetarian'},{name: 'vegan'},{name: 'pescatarian'},{name: 'paleolithic'},{name: 'primal'},
{name: 'whole 30'}, {name: 'dairy Free'}]; 



router.get('/',async(req,res)=>{
   /*  console.log(diets) */
    TypeDiet.findAll()
    .then((response)=>{
       
        if(response.length >0){
           
         return res.json(response).status(200)}
        else{ TypeDiet.bulkCreate(diets) 
            
        .then((response)=>{
            console.log('base de datos cargada')
            return res.json(response);
        })
        .catch((err)=>{next(err);})
    }
    })


})
    
    

module.exports = router;
