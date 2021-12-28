<template>
  <div class="game-container">
    <el-row style="margin-bottom: 50px;">
        <el-col :span="8">
          <span style="font-size: 60px">⌛</span>
          <div style="font-size: 30px">{{ time.m }} : {{ time.s }}</div>
        </el-col>
        <el-col :span="8">
          <span style="font-size: 60px">💣</span>
          <div style="font-size: 30px">
            {{ selectedMineCount }} / {{ mineCount }}
          </div>
        </el-col>
        <el-col :span="8">
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
        </el-col>
    </el-row>
    <div class="mine-sweeper-container" @contextmenu.prevent>
      <el-row>
        <div v-for="i in height" :key="i" class="mine-sweeper-row">
          <div
            v-for="j in width"
            :key="j"
            class="mine-sweeper-item"
            :class="{ 'is-open': openStatus[(i - 1) * width + j - 1] || isEnd }"
            @click.left="handleLeftClick(i - 1, j - 1)"
            @click.right="handleRightClick(i - 1, j - 1)"
          >
            <template v-if="isEnd">
              <div v-if="mines[(i - 1) * width + (j - 1)] && i - 1 == last.x && j - 1 == last.y" class="icon" style="background-color: red;"
                >💀</div
              >
              <div v-if="mines[(i - 1) * width + (j - 1)] && markStatus[(i - 1) * width + (j - 1)] === 1" class="icon" style="background-color: green;"
                >💥</div
              >
              <div v-if="!mines[(i - 1) * width + (j - 1)] && markStatus[(i - 1) * width + (j - 1)] === 1" class="icon" style="background-color: red;"
                >{{ neighbourMineCount[(i - 1) * width + (j - 1)] }}</div
              >
              <div v-else-if="mines[(i - 1) * width + (j - 1)]" class="icon"
                >💥</div
              >
              <div v-else-if="neighbourMineCount[(i - 1) * width + (j - 1)] > 0">
                {{ neighbourMineCount[(i - 1) * width + (j - 1)] }}
              </div>
            </template>
            <div
              v-else-if="markStatus[(i - 1) * width + (j - 1)] === 1"
              class="icon"
              >🚩
            </div>
            <div
              v-else-if="markStatus[(i - 1) * width + (j - 1)] === 2"
              class="icon"
              >❓
            </div>
            <template v-else-if="openStatus[(i - 1) * width + (j - 1)]">
              <div v-if="mines[(i - 1) * width + (j - 1)]" class="icon"
                >💥</div
              >
              <div v-else-if="neighbourMineCount[(i - 1) * width + (j - 1)] > 0">
                {{ neighbourMineCount[(i - 1) * width + (j - 1)] }}
              </div>
            </template>
          </div>
        </div>
      </el-row>
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
      selectedMineCount: 0,
      last: {
        x: -1,
        y: -1
      }
    }
  },
  mounted: function () {
    var user = document.getElementById('user')
    user.oncontextmenu = (e) => { return false }
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
      // var that = this
      this.$confirm(
        '<div>用时' +
          this.time.m +
          ':' +
          this.time.s +
          '</div>',
        '成功！',
        {
          dangerouslyUseHTMLString: true,
          confirmButtonText: '确定',
          cancelButtonText: '取消'
          // inputPattern: /(.)+/,
          // inputErrorMessage: '格式不正确'
        }
      )
        .then(({ value }) => {
          // let formData = new FormData()
          // formData.append('m', that.time.m)
          // formData.append('s', that.time.s)
          // formData.append('w', that.width)
          // formData.append('h', that.height)
          // formData.append('mine', that.mineCount)
          // formData.append('name', value)
          // this.$axios.post('/api/mine', formData).then((res) => {
          //   console.log('upload', res)
          //   if (res.status === 200) {
          //     that.$message({
          //       message: '提交成功',
          //       type: 'success'
          //     })
          //   }
          // })
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
      if (this.isEnd) {
        return
      }
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
      this.last.x = x
      this.last.y = y
      var isOver = false
      if (this.isEnd) {
        return
      }
      const index = x * this.width + y

      if (this.isFirst) {
        // if (this.mines[index]) {
        //   var t = 0
        //   while (!this.mines[t]) {
        //     this.mines[t] = 1
        //     this.mines[index] = 0
        //     this.handleLeftClick(x, y)
        //   }
        // }
      }

      if (this.markStatus[index] === 1 || this.markStatus[index] === 2) {
        return
      }

      if (this.openStatus[index] === 1) {
        // console.log('autoopen')
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
          if (this.isFirst) {
            this.$alert('Sorry, this is a mine... To be honest, this is a bug🤪 I will fix it ASAP😵. Thank you for your patience.')
          } else {
            this.$alert('Oops! You dead...... Good luck next time🤪')
          }
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
              // console.log(dx[i], dx[j], dindex)
              if (this.markStatus[dindex] === 1) {
                markMine = markMine + 1
              }
            }
          }
        }
        // console.log(markMine, markMine === this.neighbourMineCount[index])
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
      // console.log('ff', x, y, t)
      if (x < 0 || y < 0 || x === this.height || y === this.width) {
        // console.log('ff1')
        return
      }
      const index = x * this.width + y
      if (this.mines[index]) {
        return
      }
      if (this.openStatus[index] === 1) {
        if (!t) {
          // console.log('ff2')
          return
        }
      }
      this.openStatus.splice(index, 1, 1)
      if (this.neighbourMineCount[index] > 0) {
        // console.log('ff3')
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
.icon{
  margin: 0;
  padding: 0;
  width: 100%;
  height: 100%;
  overflow: hidden;
}
.game-container {
  /* display: flex; */
  /* justify-content: space-between; */
  padding: 0 20px;
  /* overflow: auto; */
  white-space: nowrap;
}

.mine-sweeper-container {
  width: fit-content;
  margin: 0 auto;
  background-color: #f2f1f0;
}

.mine-sweeper-row {
  display: flex;
}

.mine-sweeper-item {
  width: 30px;
  height: 30px;
  margin: 2px;
  /* line-height: 50px; */
  font-size: 20px;
  text-align: center;
  vertical-align: middle;
  background-color: #babdb6;
  cursor: pointer;
  overflow: auto;
}

.mine-sweeper-item.is-open {
  background-color: #dededc;
}

.panel-container {
  margin-left: 20px;
  width: 100px;
  /* display: flex; */
  display: inline-block;
  flex-direction: column;
  justify-content: space-between;
}

.panel-data-container {
  padding-top: 15px;
  text-align: center;
}
</style>
