import request from '@/utils/request'

export default {
  // 请求日志
  listact(page, limit, actQuery) {
    return request({
      url: `/actlog/${page}/${limit}`,
      method: 'post',
      data: actQuery
    })
  }
}
