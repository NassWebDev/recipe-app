import { createRouter, createWebHistory } from 'vue-router'

import AllRecipe from '../views/AllRecipe.vue';
import AddRecipe from '../views/AddRecipe.vue';
import RecipeDetails from '../views/RecipeDetails.vue';
import LoginPage from '../views/LoginPage.vue';
import RegisterPage from '../views/RegisterPage.vue';
import PasswordForgot from '../views/PasswordForgot.vue';


const routes = [
  {
    path: '/',
    name: 'AllRecipe',
    component: AllRecipe,
    // meta: { requiresAuth: true }
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: AddRecipe,
    // meta: { requiresAuth: true }
  },
  {
    path: '/:id',
    name: 'RecipeDetails',
    component: RecipeDetails,
    // meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: LoginPage
  },
  {
    path: '/register',
    name: 'RegisterPage',
    component: RegisterPage
  },
  {
    path: '/forgot',
    name: 'PasswordForgot',
    component: PasswordForgot
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

// router.beforeEach((to, from, next) => {
//   if (to.meta.requiresAuth && store.state.currentUid == null) {
//     next('/login')
//   }
//   // else if(to.name == 'AllRecipe' && store.state.allrecipe.length <= 0){
//   //   next('/addrecipe')
//   // }
//   else{
//     next()
//   }
// })

export default router
