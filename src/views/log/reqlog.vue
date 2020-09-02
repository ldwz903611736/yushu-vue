<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="IP">
        <el-input v-model="reqQuery.ip" placeholder="IP"/>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="reqQuery.begin"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="reqQuery.end"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="time" label="请求时间" width="160" />

      <el-table-column prop="ip" label="IP" />

      <el-table-column label="方法" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.method }}</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="path" label="路径" />

      <el-table-column prop="executionTime" label="执行时长" />
    </el-table>
    <el-pagination
      :current-page="page"
      :page-size="limit"
      :total="total"
      background
      layout="prev, pager, next"
      @current-change="getList"
    />
  </div>
</template>

<script>
// 引入调用的相关api下的js文件
import req from '@/api/log/req'

export default {
  // 写核心代码
  data() {
    return {
      list: null, // 查询结果
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      reqQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      req.listreq(this.page, this.limit, this.reqQuery)
        .then(response => {
          this.list = response.data.rows
          this.total = response.data.total
        })
        .catch(error => {
          console.log(error)
        })
    },
    resetData() {
      // 将表单中的数据清空
      this.reqQuery = {}
      // 查询所有
      this.getList()
    }
  }
}
</script>
