<template>
  <canvas id="game" ref="game" :width="widthCanvas" :height="heightCanvas"></canvas>
</template>

<script>
export default {
  name: 'GameBoard',
  props: ['gameOptions'],
  data () {
    return {
      direction: 'down',
      isWalking: false,
      counterForMVMT: null,
      whileWalking: false,
      keyName: null,
      resettingGame: false
    }
  },
  computed: {
    widthCanvas () {
      return this.gameOptions.map[0].length * this.gameOptions.tileSize
    },
    heightCanvas () {
      return this.gameOptions.map.length * this.gameOptions.tileSize
    }
  },
  methods: {
    mapCreation () {
      var spriteImgMap = new Image()
      spriteImgMap.src = require('../assets/' + this.gameOptions.assetsMap)
      spriteImgMap.width = this.gameOptions.tileSize
      spriteImgMap.height = this.gameOptions.tileSize

      var ctx = this.$refs.game.getContext('2d')
      ctx.clearRect(0, 0, this.gameOptions.map[0].length * this.gameOptions.tileSize, this.gameOptions.map.length * this.gameOptions.tileSize)

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
      for (var i = 0; i < this.gameOptions.map.length; i++) {
        var row = this.gameOptions.map[i]
        for (var j = 0; j < row.length; j++) {
          var tileSize = this.gameOptions.tileSize
          ctx.drawImage(spriteImgMap, parseInt(row[j]) * tileSize, 0, tileSize, tileSize, tileSize * j, tileSize * i, tileSize, tileSize)
        }
      }
    },
    async initCharacter () {
      var preloadImage = new Image();
      preloadImage.src = require('../assets/' + this.gameOptions.assetsCharacter.up)
      preloadImage = new Image();
      preloadImage.src = require('../assets/' + this.gameOptions.assetsCharacter.down)
      preloadImage = new Image();
      preloadImage.src = require('../assets/' + this.gameOptions.assetsCharacter.left)
      preloadImage = new Image();
      preloadImage.src = require('../assets/' + this.gameOptions.assetsCharacter.right)

      var spriteImgCharacter = new Image()
      spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.fixed)
      spriteImgCharacter.width = this.gameOptions.tileSize
      spriteImgCharacter.height = this.gameOptions.tileSize

      var ctx = this.$refs.game.getContext('2d')

      spriteImgCharacter.onload = await function () {
        var tileSize = this.gameOptions.tileSize
        ctx.drawImage(spriteImgCharacter, 0, 0, tileSize, tileSize, this.positionCharacter[0] * tileSize, this.positionCharacter[1] * tileSize, tileSize, tileSize)
      }.bind(this)

      document.addEventListener('keydown', (event) => {
        event.preventDefault()
        this.keyName = event.key
      })
      document.addEventListener('keyup', (event) => {
        event.preventDefault()
        this.keyName = null
      })
    },
    drawCharacter (position) {
      var tileSize = this.gameOptions.tileSize
      var spriteImgCharacter = new Image()
      spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.fixed)
      var positionOnSprite = 0
      var positionX = 0
      var positionY = 0
      if (this.direction === 'up') {
        if (this.isWalking && this.counterForMVMT) {
          spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.up)
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
          spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.left)
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
          spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.right)
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
          spriteImgCharacter.src = require('../assets/' + this.gameOptions.assetsCharacter.down)
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

      ctx.drawImage(spriteImgCharacter, positionOnSprite, 0, tileSize, tileSize, positionX, positionY, tileSize, tileSize)
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
      this.counterForMVMT = 6
      var mvmt = setInterval(function() {
        this.drawCharacter(this.positionCharacter)
        this.counterForMVMT--
        if (this.counterForMVMT < 0) {
          this.whileWalking = false
          this.isWalking = false
          this.counterForMVMT = null
          clearInterval(mvmt)
          if (this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0]] === 5 && !this.resettingGame) {
            this.resettingGame = true
            this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0]] = 6
            setTimeout(function() {
              this.resetGame()
            }.bind(this), 1000)
          }
        }
      }.bind(this), 20)
    },
    canMove (direction) {
      var nextTile = null
      if (this.whileWalking) {
        nextTile = this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0]]
      } else {
        switch (direction) {
          case 'up':
            nextTile = this.gameOptions.map[this.positionCharacter[1] - 1] ? this.gameOptions.map[this.positionCharacter[1] - 1][this.positionCharacter[0]] : undefined
            break
          case 'down':
            nextTile = this.gameOptions.map[this.positionCharacter[1] + 1] ? this.gameOptions.map[this.positionCharacter[1] + 1][this.positionCharacter[0]] : undefined
            break
          case 'left':
            nextTile = this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0] - 1]
            break
          case 'right':
            nextTile = this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0] + 1]
            break
        }
      }
      return typeof nextTile !== 'undefined' && this.gameOptions.forbidden.indexOf(nextTile) < 0
    },
    resetGame () {
      this.resettingGame = false
      this.gameOptions.map[this.positionCharacter[1]][this.positionCharacter[0]] = 5
      this.positionCharacter = Object.assign([], this.gameOptions.initPositionCharacter)
    }
  },
  async mounted () {
    this.positionCharacter = Object.assign([], this.gameOptions.initPositionCharacter)

    // Map generation
    this.initMap()

    // Init character
    await this.initCharacter()

    setInterval(function () {
      if (this.keyName && !this.isWalking && !this.resettingGame) {
        this.moveCharacter(this.keyName)
      }
      this.drawMap()
      if (!this.resettingGame) {
        this.drawCharacter(this.positionCharacter)
      }
    }.bind(this), 20)
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style lang="scss" scoped>

</style>
