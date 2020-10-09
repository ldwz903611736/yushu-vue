import request from '@/utils/request'
import qs from 'qs'

export function initData(url) {
  return request({
    url: url,
    method: 'get',
  })
}

export function download(url, params) {
  return request({
    url: url + '?' + qs.stringify(params, { indices: false }),
    method: 'get',
    responseType: 'blob'
  })
}
