<template>
  <div id="app">
    <GameBoard :gameOptions="gameOptions" />
  </div>
</template>

<script>
import GameBoard from './components/GameBoard.vue'

export default {
  name: 'app',
  data () {
    return {
      gameOptions: {
        tileSize: 32,
        assetsMap: 'map.png',
        assetsCharacter: {
          fixed: 'character_fixed.png',
          up: 'character_walks_up.png',
          down: 'character_walks_down.png',
          left: 'character_walks_left.png',
          right: 'character_walks_right.png'
        },
        initPositionCharacter: [2, 11],
        forbidden: [1, 2, 3],
        levels: {
          1: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 5, 1, 0],
            [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 0, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
            [0, 1, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 0, 1, 0],
            [0, 1, 0, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 1, 0],
            [0, 1, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 0, 1, 0],
            [0, 1, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 2, 0, 1, 0],
            [0, 1, 0, 0, 7, 0, 7, 0, 7, 0, 7, 0, 7, 0, 0, 1, 0],
            [0, 1, 0, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ],
          2: [
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 1, 0, 0, 7, 2, 7, 0, 7, 2, 7, 0, 7, 2, 5, 1, 0],
            [0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0],
            [0, 1, 0, 2, 7, 2, 7, 2, 7, 2, 7, 2, 7, 2, 0, 1, 0],
            [0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0],
            [0, 1, 0, 2, 7, 2, 7, 2, 7, 2, 7, 2, 7, 2, 0, 1, 0],
            [0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0],
            [0, 1, 0, 2, 7, 2, 7, 2, 7, 2, 7, 2, 7, 2, 0, 1, 0],
            [0, 1, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 2, 0, 1, 0],
            [0, 1, 0, 2, 7, 0, 7, 2, 7, 0, 7, 2, 7, 0, 0, 1, 0],
            [0, 1, 0, 3, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 1, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
          ]
        }
      }
    }
  },
  components: {
    GameBoard
  }
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
