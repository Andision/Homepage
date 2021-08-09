<template>
  <div class="all">
    <el-row>
      <el-col :span="12">
        <div class="section main">
          <h3>
            <small>Codepic</small>
            <br />
            字符画
          </h3>
          <h1>帮您将图片转换为字符</h1>
        </div>

        <div class="section" style="width: 30%">
          <!-- <el-upload
            class="upload-demo"
            action="http://127.0.0.1:5000/codepic"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :before-remove="beforeRemove"
            multiple
            :limit="1"
            :on-exceed="handleExceed"
            :file-list="fileList"
            accept="image/png, image/jpeg"
          >
            <el-button size="large" type="primary">点击选择图片</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload> -->
          <!-- <el-form :model="size"
            status-icon
            :rules="rules"
            ref="ruleForm"
            label-width="50px"
            class="demo-ruleForm"
          >
            <el-form-item label="高度">
              <el-input v-model="size.h" prop="h"></el-input>
            </el-form-item>
            <el-form-item label="宽度">
              <el-input v-model="size.w" prop="w"></el-input>
            </el-form-item>
          </el-form> -->
          <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="50px" class="demo-ruleForm">
            <el-form-item label="高度" prop="h">
              <el-input v-model.number="ruleForm.h"></el-input>
            </el-form-item>
            <el-form-item label="宽度" prop="w">
              <el-input v-model.number="ruleForm.w"></el-input>
            </el-form-item>
          </el-form>
          <el-upload
            class="upload-demo"
            ref="upload"
            action="/api/codepic"
            accept="image/png, image/jpeg"
            :data="ruleForm"
            :limit="1"
            :on-preview="handlePreview"
            :on-remove="handleRemove"
            :on-success="handleSuccess"
            :file-list="fileList"
            :auto-upload="false">
            <el-button style="margin: 10px;" slot="trigger" size="small" type="primary">选取文件</el-button>
            <el-button style="margin: 10px;" size="small" type="success" @click="submitForm('ruleForm')">生成</el-button>
            <!-- <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div> -->
          </el-upload>
        </div>
      </el-col>
      <el-col :span="12">
        <div class="mytext">
          <el-input
            type="textarea"
            :autosize="{ minRows: 20, maxRows: 30}"
            placeholder=""
            readonly
            v-model="textarea">
          </el-input>
        </div>
      </el-col>
    </el-row>
  </div>
</template>

<script>
export default {
  data () {
    var checkAge = (rule, value, callback) => {
      if (!value) {
        return callback(new Error('尺寸不能为空'))
      }
      setTimeout(() => {
        if (!Number.isInteger(value)) {
          callback(new Error('请输入数字值'))
        } else {
          if (value < 10 || value > 2000) {
            callback(new Error('必须在10~2000之间'))
          } else {
            callback()
          }
        }
      }, 1000)
    }
    return {
      fileList: [],
      textarea: '',
      ruleForm: {
        w: 100,
        h: 100
      },
      rules: {
        h: [{ validator: checkAge, trigger: 'blur' }],
        w: [{ validator: checkAge, trigger: 'blur' }],
        age: [
          { validator: checkAge, trigger: 'blur' }
        ]
      }

    }
  },
  methods: {
    handleRemove (file, fileList) {
      console.log(file, fileList)
    },
    handlePreview (file) {
      console.log(file)
    },
    submitUpload () {
      console.log(this.fileList)
      // if (this.fileList.length === 0) {
      //   this.$message({
      //     message: '请选择文件',
      //     type: 'warning'
      //   })
      // }
      this.$refs.upload.submit()
    },
    handleSuccess (response, file, fileList) {
      // console.log(response.data)
      this.textarea = response.data
      this.fileList = []
    },
    handleExceed (files, fileList) {
      this.$message.warning(
        '请只选择一个文件！'
        // `当前限制选择 3 个文件，本次选择了 ${files.length} 个文件，共选择了 ${
        //   files.length + fileList.length
        // } 个文件`
      )
    },
    beforeRemove (file, fileList) {
      // return this.$confirm(`确定移除 ${file.name}？`)
    },
    submitForm (formName) {
      console.log(this.ruleForm)
      var that = this
      this.$refs[formName].validate((valid) => {
        if (valid) {
          that.submitUpload()
        } else {
          return false
        }
      })
    }
  }
}
</script>

<style>
.main {
  background-color: white;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all {
  overflow-x: hidden;
  margin-bottom: 100px;
}
.main {
  margin-top: 10%;
}
.main h3 {
  font-weight: 700;
  font-size: 65px;
  line-height: 80px;
}
.section {
  margin-top: 10%;
  margin-left: 20%;
  margin-right: 20%;
  text-align: left;
}
.mytext {
  vertical-align: -webkit-baseline-middle;
  margin-top: 150px;
  width: 70%;
}
</style>
