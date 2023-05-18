<template>
    <form @submit.prevent="signup" class="form">
        <h1>
            Inscription
        </h1>
        <div class="inputs">
            <div class="input username">
                <input type="text" required v-model="newUser.username" id="username">
                <label for="username">
                    Nom:
                </label>
            </div>
            <div class="input email">
                <input type="email" required v-model="newUser.email" id="email">
                <label for="email">
                    Email:
                </label>
            </div>
            <div class="input password">
                <input type="password" required v-model="newUser.password" id="password">
                <label for="password">
                    Mot de passe:
                </label>
            </div>
            <div class="input password">
                <input type="password" required v-model="newUser.passwordConfirm" id="passwordConfirm">
                <label for="password">
                    Confirmer votre Mot de passe:
                </label>
            </div>
            <div class="listErrors">
                <p v-for="error in errorMsg">{{ error }}</p>
            </div>
            <p>Vous avez déja un compte ? Allez <router-link to="/login">ici</router-link>.</p>
        </div>
        <button>
            S'inscrire
        </button>
    </form>
</template>
  
<script setup>
import { ref, reactive } from 'vue';
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

const errorMsg = ref([])
    
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
                errorMsg.value = err.response.data.message
            }
        }
    })
</script>

<style lang="scss" scoped>
    @import "../styles/form.scss";
</style>