<template>
  <div class="all">
    <div class="section main">
      <h3>
        <small>Hello, I am</small>
        <br />
        Andision Zhang
      </h3>
      <h1>欢迎来到我的主页</h1>
    </div>

    <div class="section">
      <div class="section-title">关于我</div>
      <div class="section-content">
        <el-row :gutter="50">
          <el-col :span="16">
            <el-image
              src="https://s1.ax1x.com/2020/07/29/aVDS3j.jpg"
              style="height: 410px"
            ></el-image>
          </el-col>
          <el-col :span="8" style="text-align: left">
            <br />
            <br />
            <p>THU CST本科在读</p>
            <p>XJBT No.2 Sch.毕业生</p>
            <br />
            <p>喜欢折腾，喜欢钻研</p>
            <p>计算机、音乐、ACGN、旅行……</p>
            <br />
            <p>乐于交友，欢迎交流ヾ(≧▽≦*)o</p>
          </el-col>
        </el-row>
      </div>
    </div>

    <div class="section">
      <div class="section-title">近期工作</div>
      <div class="section-content">
        <el-row :gutter="50">
          <el-col :span="8">
            <div class="post-format-content">
              <div class="post-thumbnail">
                <img
                  src="https://z3.ax1x.com/2021/07/20/WNlA7F.png"
                  class="attachment-thumbnail wp-post-image"
                />
              </div>
              <div class="content-wrap">
                <h1 class="entry-title">
                  <a
                    href="/#/gallery"
                    class="featured-image"
                    rel="bookmark"
                    >
                    <div class="hover-word-title">时光相册</div>
                    <div class="hover-word-content">记录生活中的点滴美好</div>
                    </a
                  >
                </h1>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="post-format-content">
              <div class="post-thumbnail">
                <img
                  src="https://z3.ax1x.com/2021/07/20/WNKJts.png"
                  class="attachment-thumbnail wp-post-image"
                />
              </div>
              <div class="content-wrap">
                <h1 class="entry-title">
                  <a
                    href="/#/codepic"
                    class="featured-image"
                    rel="bookmark"
                    ><div class="hover-word-title">字符画</div>
                    <div class="hover-word-content">将图片转换为字符</div></a
                  >
                </h1>
              </div>
            </div>
          </el-col>
          <el-col :span="8">
            <div class="post-format-content">
              <div class="post-thumbnail">
                <img
                  src="https://z3.ax1x.com/2021/08/22/hSlsun.png"
                  class="attachment-thumbnail wp-post-image"
                />
              </div>
              <div class="content-wrap">
                <h1 class="entry-title">
                  <a
                    href="/#/game/mine"
                    class="featured-image"
                    rel="bookmark"
                    ><div class="hover-word-title">扫雷</div>
                    <div class="hover-word-content">回顾经典游戏</div></a
                  >
                </h1>
              </div>
            </div>
          </el-col>
          <!-- <el-col :span="8">
            <div class="post-format-content">
              <div class="post-thumbnail">
                <img
                  src="https://z3.ax1x.com/2021/07/20/WNlPXV.png"
                  class="attachment-thumbnail wp-post-image"
                />
              </div>
              <div class="content-wrap">
                <h1 class="entry-title">
                  <a
                    href="http://baidu.com"
                    class="featured-image"
                    rel="bookmark"
                    ><div class="hover-word-title">敬请期待</div>
                    <div class="hover-word-content"> </div></a
                  >
                </h1>
              </div>
            </div>
          </el-col> -->
        </el-row>
      </div>
    </div>

    <div class="section">
      <div class="section-title">联络方式</div>
      <div class="section-content">
        <el-row :gutter="0">
          <el-col :span="12">
            <div>
              <el-form ref="form" :model="msg" label-width="80px" label-position="top">
                <el-form-item label="您的名称">
                  <el-input
                    v-model="msg.name"
                    placeholder="如何称呼您？"
                  ></el-input>
                </el-form-item>
                <el-form-item label="联系方式">
                  <el-input v-model="msg.mail" placeholder="如何联系您？"></el-input>
                </el-form-item>
                <el-form-item label="您的留言">
                  <el-input
                    type="textarea"
                    :rows="4"
                    placeholder="您想说的话~"
                    v-model="msg.msg"
                  >
                  </el-input>
                </el-form-item>
                <el-form-item style="text-align:right;">
                  <el-button type="primary" @click="onSubmit">发送</el-button>
                </el-form-item>
              </el-form>
            </div>
          </el-col>
          <el-col :span="12">
            <div style="margin-top: 40px; margin-left:80px;">
              <el-row>
              <a href="mailto:andision.zhang@qq.com">
                <a-button type="dashed" size="large" class="contract">
                  <a-icon type="mail" theme="filled" />
                  andision.zhang@qq.com
                </a-button>
              </a>
              </el-row>
              <el-row>
              <a href="https://github.com/Andision">
                <a-button type="dashed" size="large" class="contract">
                  <a-icon type="github" theme="filled" />
                  github.com/Andision
                </a-button>
              </a>
              </el-row>
              <el-row>
              <a href="https://s1.ax1x.com/2020/07/29/aVDIaT.jpg">
                <a-button type="dashed" size="large" class="contract">
                  <a-icon type="wechat" theme="filled" />
                  AndisionZhang
                </a-button>
              </a>
              </el-row>
              <el-row>
              <a href="https://www.zhihu.com/people/andision">
                <a-button type="dashed" size="large" class="contract">
                  <a-icon type="zhihu" />
                  Andision
                </a-button>
              </a>
              </el-row>
              <el-row>
              <a href="https://music.163.com/#/user/home?id=356838641">
                <a-button type="dashed" size="large" class="contract">
                  <IconFont type="icon-netease" />
                  Andision
                </a-button>
              </a>
              </el-row>
            </div>
          </el-col>
        </el-row>
      </div>
    </div>
  </div>
</template>

<script>
import { Icon } from 'ant-design-vue'

const IconFont = Icon.createFromIconfontCN({
  scriptUrl: '//at.alicdn.com/t/font_2680142_f0t0dcbuyyv.js'
})
export default {
  components: {
    IconFont
  },
  data () {
    return {
      msg: {
        name: '',
        mail: '',
        msg: ''
      }
    }
  },
  methods: {
    onSubmit () {
      console.log(this.msg)
      let formData = new FormData()
      formData.append('name', this.msg.name)
      formData.append('mail', this.msg.mail)
      formData.append('msg', this.msg.msg)
      this.$axios.post('/api/msg', formData).then(res => {
        console.log('send', res)
        if (res.status === 200) {
          this.$message({
            message: '发送成功',
            type: 'success'
          })
        }
      })
    }
  }
}
</script>

<style>
.main{
  background-color: white;
}
.el-form-item__label{
  font-size: medium;
  color: black;
  font-weight: bold;
}
</style>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.all {
  overflow-x: hidden;
  margin-bottom: 100px;
}
.section {
  margin-top: 10%;
  margin-left: 20%;
  margin-right: 20%;
  text-align: left;
}
.main {
  margin-top: 10%;
}
.main h3 {
  font-weight: 700;
  font-size: 65px;
  line-height: 80px;
}

.section-title {
  font-size: 40px;
  font-family: "Poppins", serif;
  font-weight: bolder;
}

.section-content {
  margin-top: 50px;
}
.contract{
  margin: 10px;
}

.hover-word-title{
  font-size: xx-large;
}
.hover-word-content{
  font-size: x-large;
}
</style>

<style scoped>
.post-format-content {
  position: relative;
  border:5px solid #ababab;
  border-radius:25px;
}

.post-thumbnail {
  max-width: 100%;
  height: auto;
  overflow: hidden;
  border-radius: 20px;
}
.content-wrap {
  padding: 0;
  position: absolute;
  text-align: center;
  width: 100%;
  top: 0;
  bottom: 0;
  display: table-cell;
  vertical-align: middle;
  overflow: hidden;
}
.content-wrap h1.entry-title {
  display: table;
  font-size: 110%;
  height: 100%;
  text-transform: uppercase;
  width: 100%;
  margin: 0;
}
.edit-link {
  z-index: 2;
}
.featured-image {
  display: table-cell;
  position: relative;
  transition: opacity 0.25s ease-in-out, background 0.25s ease-in-out;
  -moz-transition: opacity 0.25s ease-in-out, background 0.25s ease-in-out;
  -webkit-transition: opacity 0.25s ease-in-out, background 0.25s ease-in-out;
  vertical-align: middle;
  z-index: 1;
  color: #fff;
  text-decoration: none;
  opacity: 0;
  padding: 10%;
  border-radius: 20px;
}
.featured-image:hover {
  opacity: 0.9;
  color: #fff;
  background: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
}
.post-thumbnail img {
  display: block;
}
.wp-post-image {
  width: 100%;
  height: 100%;
  border-radius: 20px;
}
</style>
