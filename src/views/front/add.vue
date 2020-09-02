<template>
  <div class="app-container">
    <el-form ref="book" :model="book" :rules="rules" label-width="80px">
      <el-form-item label="ISBN" prop="isbn">
        <el-input v-model="book.isbn" style="width: 530px;"/>
      </el-form-item>
      <el-form-item label="图书名" prop="bookName">
        <el-input v-model="book.bookName" style="width: 530px;"/>
      </el-form-item>
      <el-form-item label="作者" prop="author">
        <el-input v-model="book.author" style="width: 530px;"/>
      </el-form-item>
      <el-form-item label="封面" prop="image">
        <el-input v-model="book.image" style="width: 530px;"/>
      </el-form-item>
      <el-form-item label="出版社" prop="press">
        <el-input v-model="book.press" style="width: 530px;"/>
      </el-form-item>
      <el-form-item label="出版日期" prop="publicationYear">
        <el-date-picker v-model="book.publicationYear" type="date" placeholder="选择日期"/>
      </el-form-item>
      <el-row>
        <el-col span="6">
          <el-form-item label="页数" prop="pages">
            <el-input v-model.number="book.pages" style="width: 200px;"/>
          </el-form-item>
        </el-col>
        <el-col span="6">
          <el-form-item label="价格" prop="price">
            <el-input v-model.number="book.price" style="width: 200px;"/>
          </el-form-item>
        </el-col>
      </el-row>
      <el-form-item label="图书简介" prop="description">
        <el-input v-model="book.description" type="textarea" rows="4" style="width: 530px"/>
      </el-form-item>

      <el-form-item>
        <el-button type="primary" @click="insertBook('book')">提交</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>
<script>

import book from '@/api/front/book'

export default {
  data() {
    return {
      book: {
        isbn: '',
        bookName: '',
        author: '',
        image: '',
        press: '',
        publicationYear: '',
        pages: '',
        price: '',
        description: ''
      },
      rules: {
        isbn: [
          { required: true, message: '请输入ISBN号', trigger: 'blur' },
          { min: 13, max: 13, message: '作者名长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        bookName: [
          { required: true, message: '请输入图书名', trigger: 'blur' },
          { min: 3, max: 15, message: '图书名长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        author: [
          { required: true, message: '请输入作者', trigger: 'blur' },
          { min: 3, max: 15, message: '作者名长度在 3 到 15 个字符', trigger: 'blur' }
        ],
        publicationYear: [
          { required: true, message: '请选择出版日期', trigger: 'blur' }
        ],
        pages: [
          { required: true, message: '请输入页数', trigger: 'blur' },
          { type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
        price: [
          { required: true, message: '请输入价格', trigger: 'blur' },
          { type: 'number', message: '必须是数字', trigger: 'blur' }
        ],
        press: [
          { required: true, message: '请输入图书出版社', trigger: 'blur' },
          {
            min: 10,
            max: 50,
            message: '出版社名长度在 10 到 50 个字符',
            trigger: 'blur'
          }
        ],
        description: [
          { required: true, message: '请输入简介', trigger: 'blur' }
        ]
      },
      saveBtnDisabled: false // 保存按钮是否禁用
    }
  },
  methods: {
    insertBook(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          // 校验通过
          // 进行添加操作
          book.addBook(this.book).then(response => {
            // 输出成功信息
            this.$message({
              message: '添加成功！',
              type: 'success'
            })
            // 路由跳转到讲师列表
            this.$router.push({ path: '/book/list' })
          })
        } /*  else {
             this.$message({
             message: '添加失败！',
             type: 'false'
            });
          } */
      })
    },
    cancel() {
      // 跳转到讲师列表
      this.$router.push({ path: '/book/list' })
    }
  }
}
</script>
