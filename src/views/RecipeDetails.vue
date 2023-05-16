<template>
    <div class="details">
        <button @click="back">
            Retour
        </button>
        <h1>
            Voici la présentation de "{{recipe.name}}"
        </h1>
        <p class="description">{{recipe.description}}</p>
        <p>Voici la liste des ingrédients:</p>
        <ul v-for="i in recipe.ingredients" :key="i">
            <li class="ingredient">{{i}}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';
import { useAuthStore } from '../store/auth';

const router = useRouter()
    const route = useRoute()

    let recipe = ref({})

    onMounted(async () => {
        if(!useAuthStore().user){
            return
        }
        const resp = await axios.get(`https://recipe-app-0bsa.onrender.com/recipes/${route.params.id}`, {
            headers: {
            'Authorization': `Bearer ${useAuthStore().user.token}`
            }
        });
        const data = resp.data
        recipe.value = data
        console.log(recipe.value);
    });

    const back = (() => {
        router.push('/')
    })
</script>

<style lang="scss" scoped>
.details{
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  color: var(--white);
  padding: 30px 0;
  gap: 20px;

    h1{
        width: 100%;
        font-size: 25px;
        text-align: center;
        word-wrap: break-word
    }

    .description{
        width: 100%;
        text-align: center;
        word-wrap: break-word
  }

    button{
        background-color: var(--green);
        width: 100px;
        height: 30px;
        color: var(--white);
        cursor: pointer;
    }

    ul{
        width: 100%;
        display: flex;
        flex-direction: column;
        align-items: center;
        text-align: center;
        list-style-type: none;

        .ingredient{
            width: 100%;
            text-transform: capitalize;
            word-wrap: break-word
        }
    }
}
</style>
