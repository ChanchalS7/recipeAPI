
const express = require('express');
const router = express.Router();
const multer = require("multer")
const {getRecipe, getRecipeById, createRecipe, updateRecipe, updateRecipePartial, deleteRecipe} =require("../controllers/recipe.controller")
const requireSignIn = require("../middleware/requireSignin")
// Configure multer for handling file uploads
const upload = multer({
  limits: { fileSize: 5242880 }, // 5MB file size limit
  storage: multer.memoryStorage(),
});
router.get('/api/recipes',requireSignIn,getRecipe);
router.get('/api/recipes/:id',getRecipeById);
router.post('/api/recipes', upload.single('image'), createRecipe);
router.put('/api/recipes/:id', upload.single('image'), updateRecipe);
router.patch('/api/recipes/:id', updateRecipePartial);
router.delete('/api/recipes/:id',deleteRecipe)

module.exports = router;
