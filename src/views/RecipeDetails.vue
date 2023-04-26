<template>
    <div class="details">
        <button @click="back">
            Retour
        </button>
        <h1>
            Voici la présentation de "{{recipes.name}}"
        </h1>
        <p class="description">{{recipes.description}}</p>
        <p>Voici la liste des ingrédients:</p>
        <ul v-for="i in recipes.ingredients" :key="i">
            <li class="ingredient">{{i}}</li>
        </ul>
    </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import { useRecipeStore } from '../store';
import { useRouter, useRoute } from 'vue-router';
import axios from 'axios';

const store = useRecipeStore();

const router = useRouter()
const route = useRoute()

let recipes = ref(null)

onMounted(async () => {
    try {
      const resp = await axios.get(`https://recipe-app-chi-five.vercel.app/recipes/${route.params.id}`);
      const data = resp.data
      console.log(data);
      recipes.value = data
    } catch (err) {
        // Handle Error Here
        console.error(err);
    }
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
  color: #ccc;
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
        background-color: #42b983;
        width: 100px;
        height: 30px;
        color: rgb(26, 24, 43);
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
