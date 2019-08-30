<template>
  <div class="game-container">
    <div class="left-controls">
      <button class="up"></button>
      <button class="left"></button>
    </div>
    <div class="score">Score: {{ score }}</div>
    <canvas id="game" ref="game" :width="widthCanvas" :height="heightCanvas"></canvas>
    <div class="right-controls">
      <button class="right"></button>
      <button class="down"></button>
    </div>
  </div>
</template>

<script>
import gameOptions from '../gameOptions'

export default {
  name: 'GameBoard',
  data () {
    return {
      direction: 'down',
      isWalking: false,
      counterForMVMT: null,
      whileWalking: false,
      keyName: null,
      touchEvent: null,
      resettingGame: false,
      score: 0,
      map: null,
      currentLevel: 1
    }
  },
  computed: {
    widthCanvas () {
      return this.map[0].length * gameOptions.tileSize
    },
    heightCanvas () {
      return this.map.length * gameOptions.tileSize
    }
  },
  methods: {
    mapCreation () {
      var spriteImgMap = new Image()
      const imgUrl = gameOptions.assetsMap
      spriteImgMap.src = require('@/assets/' + imgUrl)
      spriteImgMap.width = gameOptions.tileSize
      spriteImgMap.height = gameOptions.tileSize

      var canvas = this.$refs.game
      canvas.width = this.widthCanvas * 2
      canvas.height = this.heightCanvas * 2
      canvas.style.width = this.widthCanvas + 'px'
      canvas.style.height = this.heightCanvas + 'px'
      this.$refs.game.getContext('2d').scale(2, 2)
      var ctx = this.$refs.game.getContext('2d')
      ctx.clearRect(0, 0, this.map[0].length * gameOptions.tileSize, this.map.length * gameOptions.tileSize)

      return {
        ctx,
        spriteImgMap
      }
    },
    initMap () {
      var { ctx, spriteImgMap } = this.mapCreation()

      spriteImgMap.onload = function () {
        this.drawAction(ctx, spriteImgMap)
      }.bind(this)
    },
    drawMap () {
      var { ctx, spriteImgMap } = this.mapCreation()
      this.drawAction(ctx, spriteImgMap)
    },
    drawAction (ctx, spriteImgMap) {
      for (var i = 0; i < this.map.length; i++) {
        var row = this.map[i]
        for (var j = 0; j < row.length; j++) {
          var tileSize = gameOptions.tileSize
          ctx.drawImage(spriteImgMap, parseInt(row[j]) * (tileSize * 2), 0, tileSize * 2, tileSize * 2, tileSize * j, tileSize * i, tileSize, tileSize)
        }
      }
    },
    async initCharacter () {
      var preloadImage = new Image();
      const imgUpUrl = gameOptions.assetsCharacter.up
      preloadImage.src = require('@/assets/' + imgUpUrl)
      preloadImage = new Image();
      const imgDownUrl = gameOptions.assetsCharacter.down
      preloadImage.src = require('@/assets/' + imgDownUrl)
      preloadImage = new Image();
      const imgLeftUrl = gameOptions.assetsCharacter.left
      preloadImage.src = require('@/assets/' + imgLeftUrl)
      preloadImage = new Image();
      const imgRightUrl = gameOptions.assetsCharacter.right
      preloadImage.src = require('@/assets/' + imgRightUrl)

      var spriteImgCharacter = new Image()
      const imgCharacterUrl = gameOptions.assetsCharacter.fixed
      spriteImgCharacter.src = require('@/assets/' + imgCharacterUrl)
      spriteImgCharacter.width = gameOptions.tileSize
      spriteImgCharacter.height = gameOptions.tileSize

      var ctx = this.$refs.game.getContext('2d')

      spriteImgCharacter.onload = await function () {
        var tileSize = gameOptions.tileSize
        ctx.drawImage(spriteImgCharacter, 0, 0, tileSize * 2, tileSize * 2, this.positionCharacter[0] * tileSize, this.positionCharacter[1] * tileSize, tileSize, tileSize)
      }.bind(this)

      window.addEventListener('keydown', (event) => {
        this.keyName = event.key
      }, true)
      window.addEventListener('keyup', () => {
        this.keyName = null
      }, true)

      document.querySelector('.left-controls .up').addEventListener('touchstart', (event) => {
        event.preventDefault()
        this.touchEvent = 'ArrowUp'
      })
      document.querySelector('.left-controls .up').addEventListener('touchend', (event) => {
        event.preventDefault()
        this.touchEvent = null
      })

      document.querySelector('.right-controls .down').addEventListener('touchstart', (event) => {
        event.preventDefault()
        this.touchEvent = 'ArrowDown'
      })
      document.querySelector('.right-controls .down').addEventListener('touchend', (event) => {
        event.preventDefault()
        this.touchEvent = null
      })

      document.querySelector('.left-controls .left').addEventListener('touchstart', (event) => {
        event.preventDefault()
        this.touchEvent = 'ArrowLeft'
      })
      document.querySelector('.left-controls .left').addEventListener('touchend', (event) => {
        event.preventDefault()
        this.touchEvent = null
      })

      document.querySelector('.right-controls .right').addEventListener('touchstart', (event) => {
        event.preventDefault()
        this.touchEvent = 'ArrowRight'
      })
      document.querySelector('.right-controls .right').addEventListener('touchend', (event) => {
        event.preventDefault()
        this.touchEvent = null
      })
    },
    drawCharacter (position) {
      var tileSize = gameOptions.tileSize
      var spriteImgCharacter = new Image()
      const imgCharacterUrl = gameOptions.assetsCharacter.fixed
      spriteImgCharacter.src = require('@/assets/' + imgCharacterUrl)
      var positionOnSprite = 0
      var positionX = 0
      var positionY = 0
      if (this.direction === 'up') {
        if (this.isWalking && this.counterForMVMT) {
          const imgCharacterUpUrl = gameOptions.assetsCharacter.up
          spriteImgCharacter.src = require('@/assets/' + imgCharacterUpUrl)
          positionOnSprite = tileSize * (6 - this.counterForMVMT)
          positionX = position[0] * tileSize
          if (this.canMove(this.direction)) {
            positionY = (position[1] + 1) * tileSize - Math.round(tileSize / this.counterForMVMT)
          } else {
            positionY = position[1] * tileSize
          }
        } else {
          positionX = position[0] * tileSize
          positionY = position[1] * tileSize
          positionOnSprite = tileSize * 2
        }
      } else if (this.direction === 'left') {
        if (this.isWalking && this.counterForMVMT) {
          const imgCharacterLeftUrl = gameOptions.assetsCharacter.left
          spriteImgCharacter.src = require('@/assets/' + imgCharacterLeftUrl)
          positionOnSprite = tileSize * (6 - this.counterForMVMT)
          if (this.canMove(this.direction)) {
            positionX = (position[0] + 1) * tileSize - Math.round(tileSize / this.counterForMVMT)
          } else {
            positionX = position[0] * tileSize
          }
          positionY = position[1] * tileSize
        } else {
          positionX = position[0] * tileSize
          positionY = position[1] * tileSize
          positionOnSprite = tileSize * 3
        }
      } else if (this.direction === 'right') {
        if (this.isWalking && this.counterForMVMT) {
          const imgCharacterRightUrl = gameOptions.assetsCharacter.right
          spriteImgCharacter.src = require('@/assets/' + imgCharacterRightUrl)
          positionOnSprite = tileSize * (6 - this.counterForMVMT)
          if (this.canMove(this.direction)) {
            positionX = (position[0] - 1) * tileSize + Math.round(tileSize / this.counterForMVMT)
          } else {
            positionX = position[0] * tileSize
          }
          positionY = position[1] * tileSize
        } else {
          positionX = position[0] * tileSize
          positionY = position[1] * tileSize
          positionOnSprite = tileSize
        }
      } else if (this.direction === 'down') {
        if (this.isWalking && this.counterForMVMT) {
          const imgCharacterDownUrl = gameOptions.assetsCharacter.down
          spriteImgCharacter.src = require('@/assets/' + imgCharacterDownUrl)
          positionOnSprite = tileSize * (6 - this.counterForMVMT)
          positionX = position[0] * tileSize
          if (this.canMove(this.direction)) {
            positionY = (position[1] - 1) * tileSize + Math.round(tileSize / this.counterForMVMT)
          } else {
            positionY = position[1] * tileSize
          }
        } else {
          positionX = position[0] * tileSize
          positionY = position[1] * tileSize
        }
      }
      spriteImgCharacter.width = tileSize
      spriteImgCharacter.height = tileSize

      var ctx = this.$refs.game.getContext('2d')

      ctx.drawImage(spriteImgCharacter, positionOnSprite * 2, 0, tileSize * 2, tileSize * 2, positionX, positionY, tileSize, tileSize)
    },
    moveCharacter (keyName) {
      switch (keyName) {
        case 'ArrowUp':
          this.direction = 'up'
          this.isWalking = true
          if (this.canMove(this.direction)) {
            this.whileWalking = true
            this.positionCharacter = [this.positionCharacter[0], this.positionCharacter[1] - 1]
          }
          break
        case 'ArrowDown':
          this.direction = 'down'
          this.isWalking = true
          if (this.canMove(this.direction)) {
            this.whileWalking = true
            this.positionCharacter = [this.positionCharacter[0], this.positionCharacter[1] + 1]
          }
          break
        case 'ArrowLeft':
          this.direction = 'left'
          this.isWalking = true
          if (this.canMove(this.direction)) {
            this.whileWalking = true
            this.positionCharacter = [this.positionCharacter[0] - 1, this.positionCharacter[1]]
          }
          break
        case 'ArrowRight':
          this.direction = 'right'
          this.isWalking = true
          if (this.canMove(this.direction)) {
            this.whileWalking = true
            this.positionCharacter = [this.positionCharacter[0] + 1, this.positionCharacter[1]]
          }
          break
      }
      
      this.counterForMVMT = 2
      var mvmt = setInterval(function() {
        this.drawCharacter(this.positionCharacter)
        this.counterForMVMT--
        if (this.counterForMVMT < 0) {
          this.whileWalking = false
          this.isWalking = false
          this.counterForMVMT = null
          if (this.map[this.positionCharacter[1]][this.positionCharacter[0]] === 7) {
            this.map[this.positionCharacter[1]][this.positionCharacter[0]] = 0
            this.score++
          }
          clearInterval(mvmt)
          if (this.map[this.positionCharacter[1]][this.positionCharacter[0]] === 5 && !this.resettingGame) {
            this.resettingGame = true
            this.currentLevel++
            this.direction = 'down'
            this.map[this.positionCharacter[1]][this.positionCharacter[0]] = 6
            setTimeout(function() {
              this.resetGame()
            }.bind(this), 1000)
          }
        }
      }.bind(this), 50)
    },
    canMove (direction) {
      var nextTile = null
      if (this.whileWalking) {
        nextTile = this.map[this.positionCharacter[1]][this.positionCharacter[0]]
      } else {
        switch (direction) {
          case 'up':
            nextTile = this.map[this.positionCharacter[1] - 1] ? this.map[this.positionCharacter[1] - 1][this.positionCharacter[0]] : undefined
            break
          case 'down':
            nextTile = this.map[this.positionCharacter[1] + 1] ? this.map[this.positionCharacter[1] + 1][this.positionCharacter[0]] : undefined
            break
          case 'left':
            nextTile = this.map[this.positionCharacter[1]][this.positionCharacter[0] - 1]
            break
          case 'right':
            nextTile = this.map[this.positionCharacter[1]][this.positionCharacter[0] + 1]
            break
        }
      }
      return typeof nextTile !== 'undefined' && gameOptions.forbidden.indexOf(nextTile) < 0
    },
    resetGame () {
      this.resettingGame = false
      if (!gameOptions.levels[this.currentLevel]) {
        this.currentLevel = 1
      }
      this.map = JSON.parse(JSON.stringify(gameOptions.levels[this.currentLevel]))
      this.positionCharacter = Object.assign([], gameOptions.initPositionCharacter)
    },
    loopGame () {
      if ((this.keyName || this.touchEvent) && !this.isWalking && !this.resettingGame) {
        this.moveCharacter(this.keyName || this.touchEvent)
      }
      this.drawMap()
      if (!this.resettingGame) {
        this.drawCharacter(this.positionCharacter)
      }

      setTimeout(this.loopGame, 40)
    },
  },
  created () {
    this.map = JSON.parse(JSON.stringify(gameOptions.levels[this.currentLevel]))
  },
  async mounted () {
    this.positionCharacter = Object.assign([], gameOptions.initPositionCharacter)

    // Map generation
    this.initMap()

    // Init character
    await this.initCharacter()

    this.loopGame() 
  }
}
</script>

<style lang="scss" scoped>
.left-controls,
.right-controls {
  display: none;
  flex-direction: column;
  position: fixed;
  top: 0;
  bottom: 0;

  @media screen and (orientation: landscape) and (max-device-width: 768px) {
    display: flex;
  }
  button {
    display: block;
    flex: 1;
    width: 150px;
    appearance: none;
    background: transparent;
    border: none;
  }
}
.left-controls {
  left: 0;
}
.right-controls {
  right: 0;
}
.score {
  font-size: 20px;
}
</style>
