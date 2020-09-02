import request from '@/utils/request'

export default {
  // 请求日志
  getData(searchObj) {
    return request({
      url: `/statistics/showChart/${searchObj.type}/${searchObj.begin}/${searchObj.end}`,
      method: 'get',
    })
  }
}
