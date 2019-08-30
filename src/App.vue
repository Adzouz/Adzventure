<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@font-face {
  font-family: 'Karmatic Arcade';
  src: url('./assets/fonts/ka1.woff2') format('woff2'),
        url('./assets/fonts/ka1.woff') format('woff');
  font-weight: normal;
  font-style: normal;
}

body {
  background-color: #7fc35d;
  margin: 0;
}

#app {
  font-family: 'Karmatic Arcade', 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #000;
  text-align: center;
  width: 100vw;
  height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
