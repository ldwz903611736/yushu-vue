import request from '@/utils/request'

export default {
  // 请求日志
  listreq(page, limit, reqQuery) {
    return request({
      url: `/reqlog/${page}/${limit}`,
      method: 'post',
      data: reqQuery
    })
  }
}
