
<template>
  <div class="all">
    <el-row :gutter="20">
      <el-col :span="24/stride" v-for="(col,index1) in colnum" :key="index1">
        <el-row v-for="(row,index2) in rownum" :key="index2" class="row">
          <el-image
            style="width: 100%;"
            :src="srcList[row*stride+col]"
            :preview-src-list="srcList"
            lazy
          >
            <div slot="error" class="image-slot">
              <!-- <i class="el-icon-picture-outline"></i> -->
            </div>
          </el-image>
        </el-row>
      </el-col>
    </el-row>
  </div>
</template>

<script>
import pics from '@/components/gallery.json'
export default {
  data () {
    return {
      url: 'https://fuss10.elemecdn.com/e/5d/4a731a90594a4af544c0c25941171jpeg.jpeg',
      srcList: pics.pics,
      rownum: [],
      colnum: [],
      stride: pics.stride
    }
  },
  mounted: function () {
    var l = this.srcList.length
    var s = Math.ceil(l / this.stride)
    for (var i = 0; i < s; i++) {
      this.rownum.push(i)
    }
    for (var j = 0; j < this.stride; j++) {
      this.colnum.push(j)
    }
  }
}
</script>

<style scoped>
.all{
  padding: 100px;
  background-color: black;
}
.row{
  margin-top: 20px;
}
</style>
