import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../store/auth';
import { defineAsyncComponent } from 'vue';

const routes = [
  {
    path: '/',
    name: 'AllRecipe',
    component: defineAsyncComponent(() => import('../views/AllRecipe.vue')),
    meta: { requiresAuth: true }
  },
  {
    path: '/addrecipe',
    name: 'AddRecipe',
    component: defineAsyncComponent(() => import('../views/AddRecipe.vue')),
    meta: { requiresAuth: true }
  },
  {
    path: '/:id',
    name: 'RecipeDetails',
    component: defineAsyncComponent(() => import('../views/RecipeDetails.vue')),
    meta: { requiresAuth: true }
  },
  {
    path: '/edit/:id',
    name: 'EditRecipe',
    component: defineAsyncComponent(() => import('../views/EditRecipe.vue')),
    meta: { requiresAuth: true }
  },
  {
    path: '/signup',
    name: 'SignUpPage',
    component: defineAsyncComponent(() => import('../views/SignUpPage.vue')),
  },
  {
    path: '/login',
    name: 'LoginPage',
    component: defineAsyncComponent(() => import('../views/LoginPage.vue')),

  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

router.beforeEach((to, from, next) => {
  if (to.meta.requiresAuth && useAuthStore().user == null) {
    next({name: 'LoginPage'})
  }
  else{
    next()
  }
})

export default router