<template>
    <form @submit.prevent class="form">
      <h1>Ajouter une recette</h1>
      <div class="inputs">
        <div class="input">
          <input type="text" required v-model="newRecipe.name"/>
          <label>
            Nom
          </label>
        </div>
        <div class="input textarea"> 
          <textarea type="text" required v-model="newRecipe.description"/>
          <label>
            Description
          </label>
        </div>
        <div class="ingredients">
          <div v-for="ingredient in newRecipe.ingredientsRow" :key="ingredient" class="input ingredient">
            <input type="text" required v-model="newRecipe.ingredients[ingredient-1]"/>
            <label>
              Ingredient
            </label>
          </div>
          <button @click="addIngredients" class="addingredients">
            Ajouter Ingredient
          </button>
        </div>
      </div>
      <button @click="addRecipe" class="addrecipe">
        Ajouter la recette
      </button>
    </form>
</template>

<script setup>
import "../styles/form.scss";
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

const newRecipe = reactive({
                    name: "",
                    description: "",
                    ingredients: [],
                    ingredientsRow: 1,
                  })

const addIngredients = (() => {
  newRecipe.ingredientsRow++;
});

const addRecipe = (async () => {
  if(!newRecipe.name || !newRecipe.description || newRecipe.ingredients.length == 0){
    alert("Vous devez remplir les champs.")
  }
  else{
    try{
      const resp = await axios.post('http://127.0.0.1:3000/recipes', newRecipe);
      console.log(resp.data);
      Object.assign(newRecipe, {
                    name: "",
                    description: "",
                    ingredients: [],
                    ingredientsRow: 1,
                  });
      router.push('/')
    }
    catch(err){
      console.error(err);
    }
  }
})
</script>