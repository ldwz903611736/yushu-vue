import request from '@/utils/request'

export default {
  // 请求日志
  listlog(page, limit, sysLogQuery) {
    return request({
      url: `/syslog/${page}/${limit}/INFO`,
      method: 'post',
      data: sysLogQuery
    })
  },

  listerlog(page, limit, sysLogQuery) {
    return request({
      url: `/syslog/${page}/${limit}/ERROR`,
      method: 'post',
      data: sysLogQuery
    })
  },

  getErrDetail(id) {
    return request({
      url: `/syslog/exception/${id}`,
      method: 'get'
    })
  }
}
