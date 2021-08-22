<template>
  <div class="hello">
    <el-table
      :data="tableData"
      :default-sort = "{prop: 'avemine', order: 'ascending'}"
      stripe
      style="width: 100%">
      <el-table-column
        prop="date"
        sortable
        :formatter="handleDate"
        label="日期">
      </el-table-column>
      <el-table-column
        prop="name"
        label="姓名">
      </el-table-column>
      <el-table-column
        prop="w"
        sortable
        label="宽度">
      </el-table-column>
      <el-table-column
        prop="h"
        sortable
        label="高度">
      </el-table-column>
      <el-table-column
        prop="mine"
        sortable
        label="雷数">
      </el-table-column>
      <el-table-column
        prop="time"
        :formatter="handleTime"
        label="用时">
      </el-table-column>
      <el-table-column
        prop="avemine"
        label="平均雷用时 /s"
        sortable
      >
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
export default {
  data () {
    return {
      tableData: []
    }
  },
  mounted: function () {
    // var that = this
    this.$axios.get('/api/mine/score').then((res) => {
      console.log('upload', res.data)
      if (res.status === 200) {
        this.tableData = res.data
      }
    })
  },
  methods: {
    handleTime (row, column, cellValue, index) {
      // console.log(row)
      return row.m + ':' + row.s
    },
    handleDate (row, column, cellValue, index) {
      return row.t1 + ' ' + row.t2
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.hello{
  margin: 50px;
}
</style>
