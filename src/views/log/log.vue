<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">
      <el-form-item label="IP">
        <el-input v-model="sysLogQuery.ip" placeholder="IP"/>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="sysLogQuery.begin"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="sysLogQuery.end"
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
    <!--<el-row>
      <el-button type="danger" size="mini" icon="el-icon-delete">清空</el-button>
      <el-button type="success" size="mini" icon="el-icon-download" @click="downloadInfo()">导出</el-button>
    </el-row>
    <br/>-->
    <el-table
      v-loading="listLoading"
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="请求方法">
              <span>{{ props.row.method }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column prop="username" label="用户名" />

      <el-table-column prop="requestIp" label="IP" />

      <el-table-column prop="description" label="描述" />

      <el-table-column prop="browser" label="浏览器" />

      <el-table-column label="请求耗时" align="center">
        <template slot-scope="{row}">
          <el-tag>{{ row.time }} ms</el-tag>
        </template>
      </el-table-column>

      <el-table-column prop="gmtCreate" label="创建时间" width="160" />

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
import log from '@/api/log/log'
import download from "../../utils/download";

/*import {
  initData,
  download
} from '@/api/data'*/

export default {
  // 写核心代码
  data() {
    return {
      list: null, // 查询结果
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      sysLogQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      log.listlog(this.page, this.limit, this.sysLogQuery)
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
      this.sysLogQuery = {}
      // 查询所有
      this.getList()
    },

    downloadInfo() {
      download.downloadMethod()
    }
  }
}
</script>
