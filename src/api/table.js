import request from '@/utils/request'

export  function getData(url) {
    return request({
        url: url,
        method: 'post'
    })
}
