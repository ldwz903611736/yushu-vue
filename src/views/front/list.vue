<template>
  <div class="app-container">
    <el-form :inline="true" class="demo-form-inline">

      <el-form-item label="关键字">
        <el-input v-model="bookQuery.key" placeholder="ISBN号或其他关键字"/>
      </el-form-item>
      <el-form-item label="开始时间">
        <el-date-picker
          v-model="bookQuery.begin"
          type="date"
          placeholder="选择日期"
          style="width: 100%;"
        />
      </el-form-item>
      <el-form-item label="结束时间">
        <el-date-picker
          v-model="bookQuery.end"
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
      :data="list"
      element-loading-text="数据加载中"
      border
      fit
      highlight-current-row
    >
      <el-table-column type="expand">
        <template slot-scope="props">
          <el-form label-position="left" inline class="demo-table-expand">
            <el-form-item label="出版社">
              <span>{{ props.row.press }}</span>
            </el-form-item>
            <el-form-item label="出版日期">
              <span>{{ props.row.publicationYear }}</span>
            </el-form-item>
            <el-form-item label="图书简介">
              <span>{{ props.row.description }}</span>
            </el-form-item>
          </el-form>
        </template>
      </el-table-column>

      <el-table-column label="序号" width="70" align="center">
        <template slot-scope="scope">{{ (page - 1) * limit + scope.$index + 1 }}</template>
      </el-table-column>

      <el-table-column prop="isbn" label="ISBN"/>

      <el-table-column label="图书封面">
        <template slot-scope="scope">
          <el-popover placement="top-start" title="" trigger="hover">
            <img :src="scope.row.image" alt="" style="width: 150px;height: 200px">
            <img slot="reference" :src="scope.row.image" style="width: 30px;height: 30px">
          </el-popover>
        </template>
      </el-table-column>

      <el-table-column prop="bookName" label="图书名"/>

      <el-table-column prop="author" label="作者"/>

      <el-table-column prop="pages" label="页数"/>

      <el-table-column prop="price" label="价格" width="100px" />

      <el-table-column label="首页显示" align="center">
        <template slot-scope="{row}">
          <el-switch
            v-model="row.status"
            :active-value="1"
            :inactive-value="0"
            @change="change(row.status, row.id)"/></template>
      </el-table-column>
      <el-table-column label="操作" width="200" align="center">
        <template slot-scope="scope">
          <router-link :to="'/book/edit/'+scope.row.id">
            <el-button type="primary" size="mini" icon="el-icon-edit">修改</el-button>
          </router-link>
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
import book from '@/api/front/book'

export default {
  // 写核心代码
  data() {
    return {
      list: null, // 查询结果
      page: 1, // 当前页
      limit: 10, // 每页记录数
      total: 0, // 总记录数
      bookQuery: {}
    }
  },
  created() {
    this.getList()
  },
  methods: {
    getList(page = 1) {
      this.page = page
      book.list(this.page, this.limit, this.bookQuery)
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
      this.bookQuery = {}
      // 查询所有
      this.getList()
    },
    change(status, id) {
      book.changeStatus(status, id)
    },
    removeDataById(id) {
      this.$confirm('此操作将永久删除该文件, 是否继续?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      })
        .then(() => {
          book.removeDataById(id).then(response => {
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
    }
  }
}
</script>
