import { defineStore } from 'pinia';

export const useRecipeStore = defineStore('recipeStore', {
  state: () => ({
    allrecipe:[],
    currentUid: null,
  }),
  actions: {
    addRecipe(payload){
      this.allrecipe.push(payload)
    },
    removeAllRecipe(payload){
      this.allrecipe = [];
    },
    // async getAllRecipes(){
    //   await fetch("http://localhost:3000/recipe").then((response) => response.json()).then((data) => this.allrecipe = data);
    //   console.log(this.allrecipe);
    //   // this.allrecipe = this.allrecipe[0]
    // }
  }
})
