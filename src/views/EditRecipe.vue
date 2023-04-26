<template>
    <form @submit.prevent class="form">
      <h1>Ajouter une recette</h1>
      <div class="inputs">
        <div class="input">
          <input type="text" required v-model="recipes.name"/>
          <label>
            Nom
          </label>
        </div>
        <div class="input textarea"> 
          <textarea type="text" required v-model="recipes.description"/>
          <label>
            Description
          </label>
        </div>
        <div class="ingredients">
          <div v-for="(ingredient, index) in recipes.ingredients" :key="index" class="input ingredient">
            <input type="text" v-model="recipes.ingredients[index]"/>
            <label>
              Ingredient
            </label>
          </div>
          <button @click="addIngredients" class="addingredients">
            Ajouter Ingredient
          </button>
        </div>
      </div>
      <button @click="editRecipe" class="addrecipe">
        Ajouter la recette
      </button>
    </form>
</template>

<script setup>
import "../styles/form.scss";
import { ref, reactive, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

let recipes = ref([])

onMounted(async() => {
    try{
      const resp = await axios.get(`http://127.0.0.1:3000/recipes/${route.params.id}`);
      const data = resp.data
      recipes.value = data;
      // newRecipe = reactive({
      //   name: recipes.value.name,
      //   description: recipes.value.description,
      //   ingredients: recipes.value.ingredients
      // })
      // console.log(JSON.stringify(newRecipe));
    }
    catch (err) {
        console.log(err);
    }
})

let newRecipe = reactive({
                    name: "",
                    description: "",
                    ingredients: []
                  })


const addIngredients = (() => {
  recipes.value.ingredients.length++;
});

const editRecipe = (async () => {
  try{
    await axios.patch(`https://recipe-app-chi-five.vercel.app/recipes/${route.params.id}`, {
      name: recipes.value.name,
      description: recipes.value.description,
      ingredients: recipes.value.ingredients
    })
    router.push('/')
  }
  catch(err){
    console.error(err);
  }
});
</script>