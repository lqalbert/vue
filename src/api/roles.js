import request from '@/utils/request'

export function getList(params) {
  return request({
    url: '/roles',
    method: 'get',
    params
  })
}
