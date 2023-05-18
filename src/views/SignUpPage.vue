<template>
    <form @submit.prevent="signup" class="form">
        <h1>
            Inscription
        </h1>
        <div class="inputs">
            <div class="input username">
                <input type="text" required v-model="newUser.username" id="username" autocomplete="off">
                <label for="username">
                    Nom:
                </label>
                <p class="errorMsg">{{ errMsg.username }}</p>
            </div>
            <div class="input email">
                <input type="email" required v-model="newUser.email" id="email" autocomplete="off">
                <label for="email">
                    Email:
                </label>
                <p class="errorMsg">{{ errMsg.email }}</p>
            </div>
            <div class="input password">
                <input type="password" required v-model="newUser.password" id="password" autocomplete="off">
                <label for="password">
                    Mot de passe:
                </label>
                <p class="errorMsg">{{ errMsg.password }}</p>
            </div>
            <div class="input password">
                <input type="password" required v-model="newUser.passwordConfirm" id="passwordConfirm" autocomplete="off">
                <label for="password">
                    Confirmer votre Mot de passe:
                </label>
                <p class="errorMsg">{{ errMsg.passwordConfirm }}</p>
            </div>
            <p>Vous avez déja un compte ? Allez <router-link to="/login">ici</router-link>.</p>
        </div>
        <button>
            S'inscrire
        </button>
    </form>
</template>
  
<script setup>
import { reactive } from 'vue';
import axios from 'axios';
import { useRouter } from 'vue-router';
    
const router = useRouter();

import { useAuthStore } from '../store/auth';
    
    const newUser = reactive({
        username: "",
        email: "",
        password: "",
        passwordConfirm: ""
    })

const errMsg = reactive({
    username: "",
    email: "",
    password: "",
    passwordConfirm: ""
})
    
    const signup = (async () => {
        if(!newUser.username || !newUser.email || !newUser.password || !newUser.passwordConfirm){
            alert("Vous devez remplir les champs.")
        }
        else{
            try{
                const resp = await axios.post('https://recipe-app-0bsa.onrender.com/auth/signup', newUser);
                console.log(resp.data);
                Object.assign(newUser, {
                    username: "",
                    email: "",
                    password: "",
                    passwordConfirm: ""
                });
                router.push('/')
                localStorage.setItem('user', JSON.stringify(resp.data));
                useAuthStore().login(resp.data);
            }
            catch(err){
                for (const error in err.response.data.message) {
                    errMsg[error] = err.response.data.message[error];
                }
                console.log(errMsg);
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "../styles/form.scss";
</style>