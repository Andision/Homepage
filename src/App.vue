<template>
  <div id="app">
    <el-container class="container" style="padding: 0;">
      <el-header class="header" style="padding: 0;">
        <el-menu
          class="el-menu"
          mode="horizontal"
          @select="handleMenuSelect"
        >
          <a href="/" style="color:black;">
            <div
              style="float: left; margin-top:10px; margin-left: 50px; padding: 5px; font-size: x-large; cursor: pointer;"
              @click="handleGoHomePage"
            >
              AndisionZhang
            </div>
          </a>

          <!-- <el-menu-item class="menu-item" index="7" style="float: right;">{{
            language.app_User
          }}</el-menu-item>
          <el-menu-item class="menu-item" index="6" style="float: right;">{{
            language.app_Download
          }}</el-menu-item>
          <el-menu-item class="menu-item" index="5" style="float: right;">{{
            language.app_Submit
          }}</el-menu-item>
          <el-menu-item class="menu-item" index="4" style="float: right;">{{
            language.app_Paper
          }}</el-menu-item>
          <el-menu-item class="menu-item" index="3" style="float: right;">{{
            language.app_FAQ
          }}</el-menu-item>
          <el-menu-item class="menu-item" index="2" style="float: right;">{{
            language.app_Leaderboard
          }}</el-menu-item> -->
          <el-menu-item class="menu-item" index="1" style="float: right;">{{
            language.title_homepage
          }}</el-menu-item>
        </el-menu>
      </el-header>
      <el-main class="main" style="padding: 0;"><router-view /></el-main>
      <el-footer class="footer" style="padding: 0;">
        <el-row class="footer-map">
          <a href="https://clustrmaps.com/site/1blnh"  title="Visit tracker">
            <img src="//www.clustrmaps.com/map_v2.png?d=hVHFoyIkf6OBi1GeEAbP6dS0jZDUgGC8LtqJKr_mjK4&cl=ffffff" />
          </a>
          <!-- <el-col :span="12">
          </el-col>
          <el-col :span="12">
          </el-col> -->
        </el-row>
        <el-row class="footer-div">
          © 2020 Andision Zhang. All Rights Reserved | <a href="http://beian.miit.gov.cn/" style="color:white;">京ICP备20029294号</a> | Design by Andision with ❤
        </el-row>
      </el-footer>
    </el-container>
  </div>
</template>

<script>
import defaultLanguage from '@/components/default.json'
export default {
  name: 'App',
  data () {
    return {
      language: defaultLanguage,
      dialogLoginVisible: false,
      dialogForgetVisible: false,
      token: '',
      isLogin: false
    }
  },
  mounted: function () {
    // this.checkLogin()
  },
  methods: {
    handleMenuSelect (key, keyPath) {
      console.log(key, keyPath)
      switch (key) {
        case '1':
          // this.$router.push({path: '/'})
          window.location.href = '/'
          break
        case '2':
          this.$router.push({path: '/leaderboard'})
          break
        case '3':
          this.$router.push({path: '/faq'})
          break
        case '4':
          // this.$router.push({path: 'http://www.baidu.com'})
          window.open('/api/get_paper')
          break
        case '5':
          this.$router.push({path: '/submit'})
          break
        case '6':
          this.$router.push({path: '/download'})
          break
        case '6-2':
          this.$router.push({path: '/judging'})
          break
        case '7':
          // this.$router.push({path: '/user'})
          this.toLogin()
          break
        case '8':
          // this.$router.push({path: '/user'})
          this.toLogout()
          break
      }
    },
    handleGoHomePage () {
      this.$router.push({path: '/'})
    }
  }
}
</script>

<style>
#app {
  font-family: -apple-system,BlinkMacSystemFont,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol","Segoe UI","PingFang SC","Hiragino Sans GB","Microsoft YaHei","Helvetica Neue",Helvetica,Arial,sans-serif;;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  position: relative;
}

html,
body,
#app {
  height: 100%;
  width: 100%;
  min-width: 1000px;
}

body,
#app {
  min-height: 99%;
  min-width: 99%;
  margin: 0;
}

.el-menu {
  margin: 0;
  width: 100%;
  font-weight: bolder;
}
.menu-item{
  color: white;
}

.header,
.footer {
  width: 100%;
  padding: 0;
}

.container,
.main {
  min-height: 100%;
  padding: 0;
}
.footer-map{
  height: 180px;
  background-color: black;
  color: white;
  padding-top: 30px;
}

.footer-div {
  height: 50px;
  background-color: black;
  color: white;
  padding-top: 10px;
}

.el-menu--horizontal>.el-menu-item.is-active {
    border-bottom: none;
}
</style>
