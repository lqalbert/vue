import request from '@/utils/request'



export function getRoles() {
    return request({
        url: '/roles/list',
        method: 'post'
    })
}


