import express from "express";
import RecipeModel from "../model/recipe.model.js";
import dataJSON from "../data.json" assert { type: "json" };

const recipeRoute = express.Router();

//Iteracao 2
recipeRoute.post("/create", async (req, res) => {
  try {
    const newRecipe = await RecipeModel.create({ ...req.body });
    return res.status(201).json(newRecipe.title);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

//Iteracao 3
recipeRoute.post("/create-many", async (req, res) => {
  try {
    await RecipeModel.insertMany(dataJSON);
    return res.status(201).json(RecipeModel);
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

recipeRoute.get("/getAll", async (req, res) => {
  try {

    const allRecipes = await RecipeModel.find({})
    return res.status(200).json(allRecipes)
  } catch (error) {
    console.log(error.errors);
    return res.status(500).json(error.errors);
  }
});

recipeRoute.patch("/update", async (req, res) => {
    try {  
        const updatedRecipe = await RecipeModel.findOneAndUpdate({"title": "Rigatoni alla Genovese"}, {duration: 100}, {new:true, runValidators: true})
        return res.status(200).json(updatedRecipe);        
    } catch (error) {
        console.log(error.errors);
        return res.status(500).json(error.errors);
    }
})

recipeRoute.delete("/delete", async (req, res) => {
    try {
        await RecipeModel.deleteOne({'title': "Carrot Cake"})
        return res.status(200).json(RecipeModel)
    } catch (error) {
        console.log(error.errors);
        return res.status(500).json(error.errors);
    }
})

export default recipeRoute;
