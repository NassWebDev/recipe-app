<template>
    <form @submit.prevent class="form">
      <h1>Modifier la recette</h1>
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
        Modifier
      </button>
    </form>
</template>

<script setup>
import "../styles/form.scss";
import { ref, onMounted } from 'vue';
import axios from 'axios';
import { useRoute, useRouter } from 'vue-router';
const route = useRoute();
const router = useRouter();

import { useAuthStore } from '../store/auth';

let recipes = ref([])

onMounted(async() => {
  if(!useAuthStore().user){
    return
  }
  console.log(useAuthStore().user);
  const resp = await axios.get(`http://127.0.0.1:8000/recipes/${route.params.id}`, {
    headers: {
      'Authorization': `Bearer ${useAuthStore().user.token}`
    }
  });
  const data = resp.data
  recipes.value = data;
  console.log(recipes.value);
})

const addIngredients = (() => {
  recipes.value.ingredients.length++;
});

const editRecipe = (async () => {
  if(!useAuthStore().user){
    return
  }
  await axios.patch(`http://127.0.0.1:8000/recipes/${route.params.id}`, {
    name: recipes.value.name,
    description: recipes.value.description,
    ingredients: recipes.value.ingredients
  },
  {
    headers: {
      'Authorization': `Bearer ${useAuthStore().user.token}`
    }
  }
  )
  router.push('/')
});
</script>