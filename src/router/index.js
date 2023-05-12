import { createRouter, createWebHistory } from 'vue-router'

import AllRecipe from '../views/AllRecipe.vue';
import AddRecipe from '../views/AddRecipe.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import EditRecipe from '../views/EditRecipe.vue';
import SignUpPage from '../views/SignUpPage.vue';
import LoginPage from '../views/LoginPage.vue';
import { useAuthStore } from '../store/auth';


const routes = [
  {
    path: '/',
    name: 'AllRecipe',
    component: () => import('../views/AllRecipe.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: () => import('../views/AddRecipe.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/:id',
    name: 'RecipeDetails',
    component: () => import('../views/RecipeDetails.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'EditRecipe',
    component: () => import('../views/EditRecipe.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: () => import('../views/SignUpPage.vue'),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: () => import('../views/LoginPage.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && useAuthStore().user == null) {
    next('/login')
  }
  else{
    next()
  }
})

export default router