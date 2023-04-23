<template>
  <nav>
    <router-link to="/">Recettes</router-link>
    <router-link to="/addrecipe">Ajouter une recette</router-link>
  </nav>
  <router-view/>
</template>

<style>
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
  background-color: #20203b;
  min-height: 100vh;
}

nav{
  width: 50%;
  padding: 20px 0;
  display: flex;
  justify-content: space-evenly;
}

nav a {
  font-weight: bold;
  color: #ccc;
}

nav a.router-link-exact-active {
  color: #42b983;
}
</style>
