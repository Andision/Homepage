<template>
  <div class="hello">
    <el-row class="button-row">
      <el-col :span="12">
        <el-button class="my-button" type="primary" icon="el-icon-upload2" @click="UploadDialogVisible=true">上传文件</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="my-button" type="success" icon="el-icon-edit" @click="textarea='';isTextShow=false;TextUpDialogVisible=true">上传文本</el-button>
      </el-col>
    </el-row>
    <el-row class="button-row">
      <el-col :span="12">
        <el-button class="my-button" type="primary" icon="el-icon-download" @click="GetDialogVisible=true">下载文件</el-button>
      </el-col>
      <el-col :span="12">
        <el-button class="my-button" type="success" icon="el-icon-document" @click="GetDialogVisible=true">获取文本</el-button>
      </el-col>
    </el-row>

    <el-dialog
      title=""
      :visible.sync="UploadDialogVisible"
      width="30%"
      center>
      <el-upload
        class="upload-demo"
        drag
        :auto-upload="false"
        :limit="1"
        :on-exceed="handleExceed"
        :multiple="false">
        <i class="el-icon-upload"></i>
        <div class="el-upload__text">将文件拖到此处，或<em>点击上传</em></div>
        <div class="el-upload__text">文件大小不超过100Mb</div>
      </el-upload>
      <span slot="footer" class="dialog-footer">
        <el-button @click="UploadDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleFileUpload()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="TextUpDialogVisible"
      width="30%"
      center>
      <el-input
        type="textarea"
        :autosize="{ minRows: 8, maxRows: 8}"
        placeholder="请输入内容"
        show-word-limit
        clearable
        :autofocus="true"
        v-model="textarea">
      </el-input>
      <span slot="footer" class="dialog-footer">
        <el-button @click="TextUpDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="isTextShow?TextUpDialogVisible = false:handleTextUpload()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="GetDialogVisible"
      width="30%"
      center>
      <div class="get-dialog">
        <p>
          请输入取件码
        </p>
        <el-input
          placeholder=""
          clearable
          :autofocus="true"
          style="width: 40%;"
          v-model="getcode">
        </el-input>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GetDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="handleGet()">确 定</el-button>
      </span>
    </el-dialog>
    <el-dialog
      title=""
      :visible.sync="GetCodeDialogVisible"
      width="30%"
      center>
      <div class="get-dialog">
        <p>
          取件码
        </p>
        <p>
          {{resultcode}}
        </p>
      </div>
      <span slot="footer" class="dialog-footer">
        <el-button @click="GetCodeDialogVisible = false">取 消</el-button>
        <el-button type="primary" @click="GetCodeDialogVisible = false">确 定</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script>
export default {
  data () {
    return {
      UploadDialogVisible: false,
      TextUpDialogVisible: false,
      GetDialogVisible: false,
      GetCodeDialogVisible: false,
      isTextShow: false,
      textarea: '',
      getcode: '',
      resultcode: ''
    }
  },
  mounted: function () {
  },
  methods: {
    handleExceed (files, fileList) {
      this.$message.warning(`当前限制选择 1 个文件，本次选择了 ${files.length} 个文件，共选择了 ${files.length + fileList.length} 个文件`)
    },
    handleFileUpload () {
      this.UploadDialogVisible = false
    },
    handleTextUpload () {
      this.TextUpDialogVisible = false
      console.log('TU', this.textarea)
      let formData = new FormData()
      formData.append('msg', this.textarea)
      this.$axios.post('/api/filedrop/upload/text', formData).then((res) => {
        console.log('upload', res.data)
        if (res.status === 200) {
          if (res.data.result === 'ok') {
            console.log(res.data.msg)
            this.resultcode = res.data.msg
            this.TextUpDialogVisible = false
            this.GetCodeDialogVisible = true
          }
        }
      })
    },
    handleGet () {
      // this.GetDialogVisible = false
      let formData = new FormData()
      formData.append('code', this.getcode)
      this.$axios.post('/api/filedrop/download/text', formData).then((res) => {
        console.log('upload', res.data)
        if (res.status === 200) {
          if (res.data.result === 'ok') {
            console.log(res.data.msg)
            this.textarea = res.data.msg
            this.isTextShow = true
            this.GetDialogVisible = false
            this.TextUpDialogVisible = true
          }
        }
      })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin: 50px;
}
.button-row{
  margin-top:50px;
}
.my-button{
  font-size:x-large;
}
.get-dialog{
  text-align:center;
}
.get-dialog p{
  text-align:center;
  font-size: x-large;
}
</style>
