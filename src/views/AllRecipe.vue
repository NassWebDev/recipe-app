<template>
  <div class="allrecipe">
    <transition mode="out-in" name="fade">
      <p v-if="!recipes">Aucune recette, ajoutez <router-link to="/addrecipe">ici</router-link>. </p>
      <div class="listRecipes" v-else>
        <transition-group tag="ul" name="list" appear >
          <li v-for="recipe in recipes" :key="recipe._id" class="recipe">
            <div class="arecipe">
              <h2>
                {{recipe.name}}
              </h2>
              <p class="description">
                {{recipe.description}}
              </p>
              <div class="buttons">
                <router-link :to="{name: 'RecipeDetails', params: {id: recipe._id}}">
                  <button>
                    Voir la recette
                  </button>
                </router-link>
                <router-link class="edit" :to="{name: 'EditRecipe', params: {id: recipe._id}}">
                  <fa name="ri-edit-2-fill" scale="0.8"/>
                </router-link>
              </div>
            </div>
            <button @click="deleteRecipe(recipe._id)" class="delete">X</button>
          </li>
        </transition-group>
      </div>
    </transition>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue';
import axios from 'axios';

import { useAuthStore } from '../store/auth';

let recipes = ref(null);


const deleteRecipe = ((id) => {
  axios.delete(`http://127.0.0.1:8000/recipes/${id}`, {
      headers: {
        'Authorization': `Bearer ${useAuthStore().user.token}`
      }
    })
  const indexRecipe = recipes.value.findIndex(el => el._id === id);
  recipes.value.splice(indexRecipe, 1)
})

onMounted(async () => {
  if(!useAuthStore().user){
    return
  }
  const response = await axios.get('http://127.0.0.1:8000/recipes', {
      headers: {
        'Authorization': `Bearer ${useAuthStore().user.token}`
      }
    })
  const data = await response.data;
  recipes.value = data;
});
</script>

<style lang="scss" scoped>
.allrecipe{
  width: 60%;
  display: flex;
  flex-direction: column;
  align-items: center;
  flex-wrap: wrap;
  color: #ccc;
  margin-top: 30px;
  gap: 5px;

  a{
    color: var(--green);
  }
  .edit{
    color: var(--white);
    text-decoration: none;
  }


  .fade-enter-active,
  .fade-leave-active {
    transition: all 0.4s ease;
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

  .listRecipes{
    width: 100%;

    .list-enter-active,
    .list-leave-active,
    .list-move {
      transition: all 0.2s ease;
    }

    .list-enter-from,
    .list-leave-to {
      opacity: 0;
      transform: scale(0.7);
    }

    .list-enter-to,
    .list-leave-from {
      opacity: 1;
      transform: scale(1);
    }

    .list-leave-active{
      position: absolute;
    }

    ul{
      width: 100%;
      display: flex;
      flex-direction: column;
      gap: 20px;

      .recipe{
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
        position: relative;

        .arecipe{
          width: 75%;
          border: 1px solid #000;
          border-radius: 5px;
          background-color: var(--dark-blue);
          padding: 15px;

          h2{
            width: 80%;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .description{
            width: 70%;
            margin: 20px 0;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
          }

          .buttons{
            display: flex;
            align-items: center;
            column-gap: 10px;

            button{
              background-color: var(--green);
              color: var(--white);
              cursor: pointer;
            }
          }
        }

        .delete{
          height: 20px;
          margin-left: 20px;
          background-color: transparent;
          border: none;
          color: var(--white);
          cursor: pointer;
        }
      }
    }
  }
}
</style>