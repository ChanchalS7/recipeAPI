  // Define recipe schema
  const mongoose =require("mongoose")
  const recipeSchema = new mongoose.Schema({
    title: { 
      type: String, 
      required: true 
    },
    image: { 
      type: Buffer, 
      required: true
     },
    price: { 
      type: Number,
       required: true
       },
    description: { 
      type: String, 
      required: true 
    },
  });

  // Define recipe model
  const Recipe = mongoose.model('Recipe', recipeSchema);
  module.exports=Recipe;