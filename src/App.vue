<template>
  <nav>
    <router-link to="/">Recettes</router-link>
    <router-link v-if="currentUser" to="/addrecipe">Ajouter une recette</router-link>
    <router-link v-else-if="!currentUser && $route.name == 'SignUpPage'" to="/login" id="login">Login</router-link>
    <router-link v-else to="/signup" id="signup">Sign Up</router-link>
    <button v-if="currentUser" @click="logout">Logout</button>
  </nav>
  <router-view v-slot="{ Component }">
    <Transition name="fade" mode="out-in">
      <suspense timeout="0">
        <template #default>
          <component :is="Component" :key="$route.path"></component>
        </template>
        <template #fallback>
          <SpinnerLoading/>
        </template>
      </suspense>
    </Transition>
  </router-view>
</template>

<script setup>
import { computed } from 'vue';
import { useAuthStore } from './store/auth';
import { useRouter } from 'vue-router';
import SpinnerLoading from './components/SpinnerLoading.vue';
const router = useRouter();


const currentUser = computed(() => {
  return useAuthStore().isAuthenticated;
})

const logout = (() => {
  useAuthStore().logout();
  localStorage.removeItem('user')
  router.push('/login')
})
</script>

<style>
:root{
  --green: #40926d;
  --white: #ccc;
  --blue: #20203b;
  --dark-blue: #1a182b;
}

*{
  margin: 0;
  padding: 0;
  font-family: sans-serif;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: var(--blue);
  min-height: 100vh;
}

nav{
  width: 50%;
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
  align-items: center;
}

nav a {
  font-weight: bold;
  color: #ccc;
}

nav a.router-link-exact-active {
  color: var(--green);
}

#login, #signup, button {
  border: 1px solid #ccc;
  color: var(--white);
  background-color: var(--green);
  font-weight: bold;
  padding: 5px 10px;
  text-decoration: none;
}

button{
  cursor: pointer;
}

.fade-enter-active,
.fade-leave-active {
  transition: all 0.2s ease;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: scale(0.7);
}

.fade-enter-to,
.fade-leave-from {
  opacity: 1;
  transform: scale(1);
}
</style>
