<template>
  <div class="map-container">
    <form>
      <div>Options:</div>
      <label>
        <span>Rows:</span>
        <input type="number" min="1" v-model="rows">
      </label>
      <label>
        <span>Columns:</span>
        <input type="number" min="1" v-model="cols">
      </label>
    </form>
    <table @mousedown="start" @mouseover="end" @mouseup="stop" @touchstart="start" @touchend="stop" @touchcancel="stop">
      <tr v-for="(row, indexRow) in parseInt(rows)" :key="indexRow">
        <td v-for="(col, indexCol) in parseInt(cols)" :key="indexCol" @click="presetTile(indexRow, indexCol)" :style="{backgroundPosition: getTileBg(indexRow, indexCol)}" :data-row="indexRow" :data-col="indexCol"></td>
      </tr>
    </table>
    <div class="modal" v-if="tilesToSet.length > 0">
      <ul>
        <li v-for="i in 8" :key="i" @click="setTiles(i - 1)">
          <span class="image" :style="{backgroundPosition: '-' + ((i - 1) * 32) + 'px 0'}"></span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  name: 'MapGenerator',
  data () {
    return {
			rows: '15',
      cols: '15',
      savedTiles: [],
      showSetTileModal: false,
      tilesToSet: [],
      tileBeginArea: false
    }
  },
  methods: {
    start(e) {
      if (!this.tileBeginArea) {
        this.tileBeginArea = [parseInt(e.target.getAttribute('data-row')), parseInt(e.target.getAttribute('data-col'))]
      }
    },
    stop(e) {
      if (this.tileBeginArea) {
        this.tilesToSet = []
        let areaTiles = this.getAreaTiles([this.tileBeginArea[0], this.tileBeginArea[1]], [e.target.getAttribute('data-row'), e.target.getAttribute('data-col')])
        for (var i = areaTiles.begin[0]; i <= areaTiles.end[0]; i++) {
          for (var j = areaTiles.begin[1]; j <= areaTiles.end[1]; j++) {
            this.tilesToSet.push([i, j])
          }
        }
      }
      this.tileBeginArea = false
    },
    end(e) {
      if (this.tileBeginArea) {
        let areaTiles = this.getAreaTiles([this.tileBeginArea[0], this.tileBeginArea[1]], [e.target.getAttribute('data-row'), e.target.getAttribute('data-col')])
        document.querySelectorAll('tr').forEach((row, indexRow) => {
          if (indexRow >= areaTiles.begin[0] && indexRow <= areaTiles.end[0]) {
            row.querySelectorAll('td').forEach((col, indexCol) => {
              if (indexCol >= areaTiles.begin[1] && indexCol <= areaTiles.end[1]) {
                col.className = 'hovered'
              } else {
                col.className = ''
              }
            })
          } else {
            row.querySelectorAll('td').forEach(td => td.className = '')
          }
        })
      } else {
        document.querySelectorAll('td').forEach(td => td.className = '')
      }
    },
    getAreaTiles(begin, end) {
      let areaTiles = {
        begin: [parseInt(begin[0]), parseInt(begin[1])],
        end: [parseInt(end[0]), parseInt(end[1])]
      }
      if (areaTiles.begin[0] > areaTiles.end[0] && areaTiles.begin[1] > areaTiles.end[1]) {
        areaTiles = {
          begin: [parseInt(end[0]), parseInt(end[1])],
          end: [parseInt(begin[0]), parseInt(begin[1])]
        }
      }
      return areaTiles
    },
    getTileBg(indexRow, indexColumn) {
      var foundItem = this.savedTiles.find(st => st.row === indexRow && st.col === indexColumn)
      if (foundItem) {
        return '-' + foundItem.value * 32 + 'px 0px'
      }
      return false
    },
    presetTile(row, col) {
      this.tilesToSet = [[row, col]]
    },
    setTiles(i) {
      // loop on tiles to set
      this.tilesToSet.map(t => {
        // remove previous item
        this.savedTiles = this.savedTiles.filter(st => !(st.row === t[0] && st.col === t[1]))
        // reinsert the new value
        this.savedTiles.push({
          row: t[0],
          col: t[1],
          value: i
        })
      })
      this.tilesToSet = []
    }
  }
}
</script>

<style lang="scss" scoped>
form {
  position: fixed;
  bottom: 15px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  background-color: #ecf0f1;

  label {
    text-align: left;
    display: flex;
    align-items: center;
    margin-top: 1rem;

    span {
      flex: 1 1 auto;
      margin-right: 1rem;
    }
    input {
      appearance: none;
      border: 0;
      font-size: 1rem;
    }
  }
}

table {
  border-collapse: collapse;

  td {
    width: 30px;
    height: 30px;
    border: 1px solid black;
    background-image: url(../assets/map.png);
    background-repeat: no-repeat;
    background-size: auto 32px;

    &:hover,
    &.hovered {
      cursor: pointer;
      background-color: rgba(255, 255, 255, 0.4);
    }
  }
}

.modal {
  &::before {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    z-index: 0;
    background-color: rgba(0, 0, 0, 0.5);
  }
  ul {
    margin: 0;
    padding: 0;
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
    display: flex;
    list-style: none;
    background-color: #ecf0f1;

    li {
      padding: 15px;
      transition: .3s all;
      cursor: pointer;

      &:hover {
        background-color: #fff;
      }
      .image {
        display: block;
        width: 32px;
        height: 32px;
        background-image: url(../assets/map.png);
        background-repeat: no-repeat;
        background-size: auto 32px;
      }
    }
  }
}
</style>
