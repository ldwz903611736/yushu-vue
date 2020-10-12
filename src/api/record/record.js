import request from '@/utils/request'

export default {
  // 鱼漂记录
  list(page, limit, recordQuery) {
    return request({
      url: `/record/${page}/${limit}`,
      method: 'post',
      data: recordQuery
    })
  },

  removeDataById(id) {
    return request({
      url: `/record/${id}`,
      method: `delete`
    })
  },
}
