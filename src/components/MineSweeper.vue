<template>
  <div class="game-container">
    <div class="mine-sweeper-container" @contextmenu.prevent>
      <div v-for="i in height" :key="i" class="mine-sweeper-row">
        <div
          v-for="j in width"
          :key="j"
          class="mine-sweeper-item"
          :class="{ 'is-open': openStatus[(i - 1) * width + j - 1] }"
          @click.left="handleLeftClick(i - 1, j - 1)"
          @click.right="handleRightClick(i - 1, j - 1)"
        >
          <span
            v-if="markStatus[(i - 1) * width + (j - 1)] === 1"
            class="iconfont"
            >🚩</span
          >
          <span
            v-else-if="markStatus[(i - 1) * width + (j - 1)] === 2"
            class="iconfont"
            >❓</span
          >
          <template v-else-if="openStatus[(i - 1) * width + (j - 1)]">
            <span v-if="mines[(i - 1) * width + (j - 1)]" class="iconfont"
              >💣</span
            >
            <span v-else-if="neighbourMineCount[(i - 1) * width + (j - 1)] > 0">
              {{ neighbourMineCount[(i - 1) * width + (j - 1)] }}
            </span>
          </template>
        </div>
      </div>
    </div>
    <div class="panel-container">
      <div class="panel-data-container">
        <div style="font-size: 30px">{{ time.m }} : {{ time.s }}</div>
        <span class="iconfont" style="font-size: 60px">💣</span>
        <div style="font-size: 30px">
          {{ selectedMineCount }} / {{ mineCount }}
        </div>
        <div style="margin-top: 20px">
          <el-button type="primary" style="width: 100px" @click="reStart"
            >新游戏</el-button
          >
        </div>
        <div style="margin-top: 20px">
          <el-button
            type="danger"
            style="width: 100px"
            @click="handleBack"
            >选择难度</el-button
          >
        </div>
      </div>
    </div>
  </div>
</template>

<script>
function shuffle (mines, start) {
  for (let i = start; i < mines.length; i++) {
    const randomIndex = Math.floor(Math.random() * (i + 1))
    const tmp = mines[randomIndex]
    mines[randomIndex] = mines[i]
    mines[i] = tmp
  }
}

export default {
  props: {
    play: {
      type: Boolean,
      required: true
    },
    width: {
      type: Number,
      required: true
    },
    height: {
      type: Number,
      required: true
    },
    mineCount: {
      type: Number,
      required: true
    }
  },
  data () {
    return {
      isEnd: false,
      time: {
        m: 0,
        s: 0,
        t: 0,
        c: 0,
        stamp: 0
      },
      isFirst: true,
      mines: [],
      openStatus: [],
      markStatus: [],
      selectedMineCount: 0
    }
  },
  computed: {
    neighbourMineCount () {
      const result = new Array(this.width * this.height).fill(0)
      for (let i = 0; i < result.length; i++) {
        if (!this.mines[i]) {
          continue
        }
        const y = i % this.width
        const x = (i - y) / this.width
        for (let j = -1; j < 2; j++) {
          const newX = x + j
          if (newX < 0 || newX === this.height) {
            continue
          }
          for (let k = -1; k < 2; k++) {
            const newY = y + k
            if (newY < 0 || newY === this.width) {
              continue
            }
            result[newX * this.width + newY]++
          }
        }
      }
      return result
    }
  },
  watch: {
    play () {
      if (!this.play) {
        return
      }
      this.init(this.width, this.height, this.mineCount)
    },
    selectedMineCount () {
      if (this.selectedMineCount === this.mineCount) {
        const match = this.mines.every((isMine, index) => {
          if (
            (isMine && this.markStatus[index] === 1) ||
            (!isMine && this.markStatus[index] !== 1)
          ) {
            return true
          }
          return false
        })
        if (match) {
          this.$nextTick(() => {
            // alert('win')
            this.handleSubmitScore()
          })
          this.isEnd = true
        }
      }
    }
  },
  methods: {
    handleSubmitScore () {
      var that = this
      this.$prompt(
        '<div>用时' +
          this.time.m +
          ':' +
          this.time.s +
          '</div><div>请留下您的大名</div>',
        '成功！',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          inputPattern: /(.)+/,
          inputErrorMessage: '格式不正确'
        }
      )
        .then(({ value }) => {
          let formData = new FormData()
          formData.append('m', that.time.m)
          formData.append('s', that.time.s)
          formData.append('w', that.width)
          formData.append('h', that.height)
          formData.append('mine', that.mineCount)
          formData.append('name', value)
          this.$axios.post('/api/mine', formData).then((res) => {
            console.log('upload', res)
            if (res.status === 200) {
              that.$message({
                message: '提交成功',
                type: 'success'
              })
            }
          })
        })
        .catch(() => {
          // this.$message({
          //   type: 'info',
          //   message: '取消输入'
          // })
        })
    },
    handleBack () {
      this.$emit('close', '')
    },
    reStart () {
      this.init(this.width, this.height, this.mineCount)
    },
    init (width, height, mineCount) {
      console.log('INIT', width, height, mineCount)
      this.isFirst = true
      this.isEnd = false
      const total = width * height
      const mines = new Array(total).fill(0)
      for (let i = 0; i < mineCount; i++) {
        mines[i] = 1
      }
      shuffle(mines, mineCount)
      this.mines = mines
      this.openStatus = new Array(total).fill(0)
      this.markStatus = new Array(total).fill(0)
      this.selectedMineCount = 0

      this.time.m = 0
      this.time.c = 0
      this.time.s = 0
      this.time.stamp = parseInt(Date.parse(new Date())) / 1000
      this.time.t = setInterval(this.timer, 100)
    },
    timer () {
      this.time.c = this.time.c + 100
      // if (this.time.c >= 1000) {
      //   this.time.c = 0
      //   this.time.s = this.time.s + 1
      // }
      // if (this.time.s >= 60) {
      //   this.time.s = 0
      //   this.time.m = this.time.m + 1
      // }
      var t = parseInt(Date.parse(new Date())) / 1000
      // console.log(t)
      this.time.s = (t - this.time.stamp) % 60
      this.time.m = parseInt((t - this.time.stamp) / 60)
    },
    handleLeftClick (x, y) {
      console.log('L', x, y)
      var isOver = false
      if (this.isEnd) {
        return
      }
      const index = x * this.width + y

      if (this.isFirst) {
        if (this.mines[index]) {
          var t = 0
          while (!this.mines[t]) {
            this.mines[t] = 1
            this.mines[index] = 0
            this.handleLeftClick(x, y)
          }
        }
      }

      if (this.markStatus[index] === 1 || this.markStatus[index] === 2) {
        return
      }

      if (this.openStatus[index] === 1) {
        console.log('autoopen')
        isOver = this.autoOpen(x, y)
        console.log('autoopen', isOver)
        // var dx = [0, 1, -1]
        // var markMine = 0
        // for (var i in dx) {
        //   for (var j in dx) {
        //     if (dx[i] === 0 && dx[j] === 0) {
        //       continue
        //     } else {
        //       if (
        //         x + dx[i] < 0 ||
        //         y + dx[j] < 0 ||
        //         x + dx[i] === this.height ||
        //         y + dx[j] === this.width
        //       ) {
        //         continue
        //       }
        //       const dindex = (x + dx[i]) * this.width + (y + dx[j])
        //       console.log(dx[i], dx[j], dindex)
        //       if (this.markStatus[dindex] === 1) {
        //         markMine = markMine + 1
        //       }
        //     }
        //   }
        // }
        // // console.log(markMine, markMine === this.neighbourMineCount[index])
        // if (markMine === this.neighbourMineCount[index]) {
        //   for (i in dx) {
        //     for (j in dx) {
        //       if (
        //         x + dx[i] < 0 ||
        //         y + dx[j] < 0 ||
        //         x + dx[i] === this.height ||
        //         y + dx[j] === this.width
        //       ) {
        //         continue
        //       }
        //       const dindex = (x + dx[i]) * this.width + (y + dx[j])
        //       if (this.markStatus[dindex] !== 1) {
        //         this.openStatus[dindex] = 1
        //         if (this.mines[dindex]) {
        //           isOver = true
        //           break
        //         }
        //       }
        //     }
        //   }
        // }
      }

      if (this.mines[index] || isOver) {
        this.openStatus.splice(index, 1, 1)
        this.isEnd = true
        this.$nextTick(() => {
          this.$alert('Oops! You dead...... Good luck next time🤪')
        })

        return
      }

      if (this.neighbourMineCount[index] > 0) {
        this.openStatus.splice(index, 1, 1)
        if (!this.isFirst) {
          return
        }
      }
      this.floodfill(x, y, true)
      this.isFirst = false
    },
    autoOpen (x, y) {
      const index = x * this.width + y
      if (x < 0 || y < 0 || x >= this.width || y >= this.height) {
        return false
      }
      if (this.openStatus[index] === 1) {
        var dx = [0, 1, -1]
        var markMine = 0
        for (var i in dx) {
          for (var j in dx) {
            if (dx[i] === 0 && dx[j] === 0) {
              continue
            } else {
              if (
                x + dx[i] < 0 ||
                y + dx[j] < 0 ||
                x + dx[i] === this.height ||
                y + dx[j] === this.width
              ) {
                continue
              }
              const dindex = (x + dx[i]) * this.width + (y + dx[j])
              console.log(dx[i], dx[j], dindex)
              if (this.markStatus[dindex] === 1) {
                markMine = markMine + 1
              }
            }
          }
        }
        console.log(markMine, markMine === this.neighbourMineCount[index])
        if (markMine === this.neighbourMineCount[index]) {
          for (i in dx) {
            for (j in dx) {
              if (
                x + dx[i] < 0 ||
                y + dx[j] < 0 ||
                x + dx[i] === this.height ||
                y + dx[j] === this.width
              ) {
                continue
              }
              const dindex = (x + dx[i]) * this.width + (y + dx[j])
              if (this.markStatus[dindex] !== 1) {
                if (this.mines[dindex]) {
                  this.openStatus[dindex] = 1
                  return true
                }
                if (!(this.neighbourMineCount[dindex] > 0) && this.openStatus[dindex] === 0) {
                  this.openStatus[dindex] = 1
                  this.floodfill(x + dx[i], y + dx[j], true)
                }
                this.openStatus[dindex] = 1
              }
            }
          }
        }
      }
      for (i in dx) {
        for (j in dx) {
          this.autoOpen(x + dx[i], y + dx[y])
        }
      }
      return false
    },
    floodfill (x, y, t) {
      console.log('ff', x, y, t)
      if (x < 0 || y < 0 || x === this.height || y === this.width) {
        console.log('ff1')
        return
      }
      const index = x * this.width + y
      if (this.mines[index]) {
        return
      }
      if (this.openStatus[index] === 1) {
        if (!t) {
          console.log('ff2')
          return
        }
      }
      this.openStatus.splice(index, 1, 1)
      if (this.neighbourMineCount[index] > 0) {
        console.log('ff3')
        if (!t || !this.isFirst) {
          return
        }
      }
      for (let i = -1; i < 2; i++) {
        for (let j = -1; j < 2; j++) {
          this.floodfill(x + i, y + j, false)
        }
      }
    },
    handleRightClick (x, y) {
      if (this.isEnd) {
        return
      }
      const index = x * this.width + y
      if (this.openStatus[index] === 1) {
        return
      }
      this.markStatus.splice(index, 1, (this.markStatus[index] + 1) % 3)
      if (this.markStatus[index] === 1) {
        this.selectedMineCount++
      } else if (this.markStatus[index] === 2) {
        this.selectedMineCount--
      }
    }
  }
}
</script>

<style scoped>
.game-container {
  display: flex;
  justify-content: space-between;
  padding: 0 15px;
}

.mine-sweeper-container {
  overflow: hidden;
  width: fit-content;
  margin: 0 auto;
  background-color: #f2f1f0;
}

.mine-sweeper-row {
  display: flex;
}

.mine-sweeper-item {
  width: 50px;
  height: 50px;
  margin: 2px;
  line-height: 50px;
  font-size: 34px;
  text-align: center;
  background-color: #babdb6;
  cursor: pointer;
}

.mine-sweeper-item.is-open {
  background-color: #dededc;
}

.panel-container {
  width: 180px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

.panel-data-container {
  padding-top: 15px;
  text-align: center;
}
</style>
