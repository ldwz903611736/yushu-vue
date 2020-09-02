import request from '@/utils/request'

export default {
  // 请求日志
  list(page, limit, bookQuery) {
    return request({
      url: `/book/${page}/${limit}`,
      method: 'post',
      data: bookQuery
    })
  },

  changeStatus(status, id) {
    return request({
      url: `/book/status/${status}/${id}`,
      method: 'put'
    })
  },

  removeDataById(id) {
    return request({
      url: `/book/${id}`,
      method: `delete`
    })
  },

  getById(id) {
    return request({
      url: `/book/${id}`,
      method: 'get'
    })
  },

  updateById(book) {
    return request({
      url: '/book',
      method: 'put',
      data: book
    })
  },

  addBook(book) {
    return request({
      url: `/book`,
      method: 'post',
      data: book
    })

  }
}
