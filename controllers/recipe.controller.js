  const Recipe = require("../models/recipe.Model")
 
  // Get all recipes
  const getRecipe= async (req, res) => {
    try {
      const recipes = await Recipe.find();
      res.status(200).json({ recipes });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
const getRecipeById=  async (req, res) => {
    try {
      const recipe = await Recipe.findById(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
      res.status(200).json({ recipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  // Create a new recipe
  const createRecipe = async (req, res) => {
    try {
      const { title, price, description } = req.body;
      const image = req.file.buffer;
      const recipe = new Recipe({ title, image, price, description });
      await recipe.save();
      res.status(201).json({ message: 'Recipe created successfully.', recipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  const updateRecipe = async (req, res) => {
    try {
      const { title, price, description } = req.body;
      const image = req.file.buffer;
      const recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { title, image, price, description },
        { new: true }
      );
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
      res.status(200).json({ message: 'Recipe updated successfully.', recipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
  const updateRecipePartial = async (req, res) => {
    try {
      const { title, price, description } = req.body;
      const recipe = await Recipe.findByIdAndUpdate(
        req.params.id,
        { $set: { title, price, description } },
        { new: true }
      );
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
      res.status(200).json({ message: 'Recipe updated successfully.', recipe });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };

  // Delete a recipe
  const deleteRecipe= async (req, res) => {
    try {
      const recipe = await Recipe.findByIdAndDelete(req.params.id);
      if (!recipe) {
        return res.status(404).json({ message: 'Recipe not found.' });
      }
      res.status(200).json({ message: 'Recipe deleted successfully.' });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  };
module.exports={getRecipe, getRecipeById, createRecipe, updateRecipe, updateRecipePartial, deleteRecipe};