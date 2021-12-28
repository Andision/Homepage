<template>
  <div class="all">
    <div class="select" style="margin: auto;" v-if="!isShowGame">
      <el-row style="width: 500px">
        <el-col :span="12">
          <el-row style="margin-bottom: 20px"
            ><el-button type="success" @click="showGame(10,10,10)"><div style="margin-bottom:10px;">新手</div><div>10×10 10💣</div></el-button></el-row
          >
          <el-row style="margin-bottom: 20px"
            ><el-button type="success" @click="showGame(16,16,40)"><div style="margin-bottom:10px;">专家</div><div>16×16 40💣</div></el-button></el-row
          >
          <el-row style="margin-bottom: 20px"
            ><el-button type="success" @click="showGame(20,16,99)"><div style="margin-bottom:10px;">大师</div><div>20×16 99💣</div></el-button></el-row
          >
          <el-row style="margin-bottom: 20px"
            ><el-link type="primary" disabled href="/#/game/leaderboard">排行榜</el-link></el-row
          >
        </el-col>
        <el-col :span="12">
          <el-form
            :model="ruleForm"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="100px"
            class="demo-ruleForm"
            style="width: 300px"
          >
            <el-form-item label="宽度" prop="width">
              <el-input v-model.number="ruleForm.width"></el-input>
            </el-form-item>
            <el-form-item label="高度" prop="height">
              <el-input v-model.number="ruleForm.height"></el-input>
            </el-form-item>
            <el-form-item label="雷数" prop="mine">
              <el-input v-model.number="ruleForm.mine"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="submitForm('ruleForm')"
                >开始 !</el-button
              >
              <el-button @click="resetForm('ruleForm')">重置</el-button>
            </el-form-item>
          </el-form>
        </el-col>
      </el-row>
    </div>
      <div class="app-main" v-show="isShowGame">
        <!-- <SelectDifficulty class="app-section" @showGame="showGame" /> -->

        <MineSweeper
          :play="isShowGame"
          :width="width"
          :height="height"
          :mine-count="mineCount"
          class="app-section"
          v-on:close="handleReset"
        />
      </div>
  </div>
</template>

<script>
import MineSweeper from '@/components/MineSweeper'
export default {
  components: {
    MineSweeper
  },
  methods: {
    handleReset () {
      this.isShowGame = false
    },
    showGame (width, height, mineCount) {
      this.width = width
      this.height = height
      this.mineCount = mineCount
      this.isShowGame = true
    },
    selectDifficulty () {
      this.isShowGame = false
    },
    submitForm (formName) {
      this.$refs[formName].validate((valid) => {
        if (valid) {
          // alert('submit!')
          // this.isShowGame = true
          // console.log(
          //   this.ruleForm.width,
          //   this.ruleForm.height,
          //   this.ruleForm.mine
          // )
          this.showGame(
            this.ruleForm.width,
            this.ruleForm.height,
            this.ruleForm.mine
          )
        } else {
          console.log('error submit!!')
          return false
        }
      })
    },
    resetForm (formName) {
      this.$refs[formName].resetFields()
    }
  },
  data () {
    var checkMine = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          var t = this.ruleForm.width * this.ruleForm.height * 0.3
          // console.log('M', this.ruleForm.width, this.ruleForm.height, t)
          if (value < 1 || value >= t) {
            callback(new Error('数量错误,需在0~' + (t - 1) + '之间'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 1 || value > 30) {
            callback(new Error('宽高需在0~30之间'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      isShowGame: false,
      width: 0,
      height: 0,
      mineCount: 0,
      ruleForm: {
        width: '',
        height: '',
        mine: ''
      },
      rules: {
        width: [{ validator: checkAge, trigger: 'blur' }],
        height: [{ validator: checkAge, trigger: 'blur' }],
        mine: [{ validator: checkMine, trigger: 'blur' }]
      }
    }
  }
}
</script>

<style scoped>
.all{
  margin: 50px;
  align-items: center;
  display: flex;
}

.app-main {
  width: 100%;
  display: flex;
  align-items: center;
  transition: transform 1s ease;
}

.app-main.show-game {
  transform: translateX(-100%);
}

.app-section {
  width: 100%;
  flex: 0 0 auto;
}
</style>
