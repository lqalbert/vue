import request from '@/utils/request'

export function getData(url, perpages, nowpage) {
    return request({
        url: url,
        method: 'post',
        data: {
            perpages,
            nowpage
        }
    })
}
