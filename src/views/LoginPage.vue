<template>
  <form @submit.prevent="login" class="form">
    <h1>
        Connexion
    </h1>
    <div class="inputs">
        <div class="input email">
            <input type="email" required v-model="User.email" id="email">
            <label for="email">
                Email:
            </label>
        </div>
        <div class="input password">
            <input type="password" required v-model="User.password" id="password">
            <label for="password">
                Mot de passe:
            </label>
            <p>Vous avez oublié votre mot de passe ? <router-link to="/forgot">Ici</router-link></p>
        </div>
        <p>Vous n'avez pas de compte ? Allez <router-link to="/signup">ici</router-link>.</p>
    </div>
    <button>
        Se connecter
    </button>
  </form>
</template>

<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
const router = useRouter();

import { useAuthStore } from '../store/auth';

const User = reactive({
    email: "",
    password: ""
})

const login = (async () => {
    if(!User.email || !User.password){
        alert("Vous devez remplir les champs.")
    }
    else{
        try{
            const resp = await axios.post('http://127.0.0.1:8000/auth/login', User);
            console.log(resp.data);
            Object.assign(User, {
                email: "",
                password: ""
            });
            router.push('/');
            localStorage.setItem('user', JSON.stringify(resp.data));
            useAuthStore().login(resp.data);
        }
        catch(err){
            console.error(err);
        }
    }
})
</script>