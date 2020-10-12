<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="申请人">
        <el-input v-model="recordQuery.applicantName" placeholder="申请人"/>
      </el-form-item>
      <el-form-item label="赠送人">
        <el-input v-model="recordQuery.givingName" placeholder="赠送人"/>
      </el-form-item>
      <el-form-item label="图书名">
        <el-input v-model="recordQuery.bookName" placeholder="图书名"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="getList()">查询</el-button>
        <el-button type="default" @click="resetData()">清空</el-button>
      </el-form-item>
    </el-form>

    <el-table
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="applicantName" label="申请人"/>

      <el-table-column prop="givingName" label="赠送人"/>

      <el-table-column prop="bookName" label="图书名"/>

      <el-table-column prop="gmtCreate" label="创建时间"/>

      <el-table-column prop="gmtModified" label="最后更改时间"/>

      <el-table-column label="状态" align="center">
        <template slot-scope="{row}">
          <el-tag :type="formatTagType(row.status)">
            {{ row.status == 0 ? '未处理' : row.status == 1 ? '已邮寄' : '已拒绝' }}
          </el-tag>
        </template>
      </el-table-column>

      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <el-button
            type="danger"
            size="mini"
            icon="el-icon-delete"
            @click="removeDataById(scope.row.id)"
          >删除</el-button>
        </template>
      </el-table-column>
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
  import record from '@/api/record/record'

  export default {
    // 写核心代码
    data() {
      return {
        list: null, // 查询结果
        page: 1, // 当前页
        limit: 10, // 每页记录数
        total: 0, // 总记录数
        recordQuery: {}
      }
    },
    created() {
      this.getList()
    },
    methods: {
      getList(page = 1) {
        this.page = page
        record.list(this.page, this.limit, this.recordQuery)
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
        this.recordQuery = {}
        // 查询所有
        this.getList()
      },
      change(status, id) {
        record.changeStatus(status, id)
      },
      removeDataById(id) {
        this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning'
        })
          .then(() => {
            record.removeDataById(id).then(response => {
              // 删除成功
              // 提示成功信息
              this.$message({
                type: 'success',
                message: '删除成功!'
              })
              // 重新刷新列表
              this.getList()
            })
          })
          .catch(() => {
            this.$message({
              type: 'info',
              message: '已取消删除'
            })
          })
      },
      formatTagType(status) {
        if (status == 0) return 'info'
        else if (status == 1) return 'success'
        else return 'danger'
      }
    }
  }
</script>
