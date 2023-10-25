<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'App',
};
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #ffffff;
  background-color: rgb(226, 222, 222);
}

body {
  margin: 0;
}

button {
  margin: 0;
  padding: 5px;
  border: none;
  background-color: #007bff;
  border-radius: 5px;
  font: inherit;
  color: inherit;
  text-align: center;
  cursor: pointer;
  width: 100px;
  height: 35px;
}

button:hover {
  background-color: #0056b3;
}

input {
  margin: 10px;
  padding: 5px;
  border: 1px solid grey;
  border-radius: 5px;
  background: none;
  font: inherit;
  color: inherit;
  text-align: inherit;
  width: 120px;
}

</style>
