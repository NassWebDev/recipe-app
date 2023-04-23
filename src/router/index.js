import { createRouter, createWebHistory } from 'vue-router'

import AllRecipe from '../views/AllRecipe.vue';
import AddRecipe from '../views/AddRecipe.vue';
import RecipeDetails from '../views/RecipeDetails.vue';


const routes = [
  {
    path: '/',
    name: 'AllRecipe',
    component: AllRecipe,
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: AddRecipe,
  },
  {
    path: '/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router