import request from '@/utils/request'

export function getUsers() {
    return request({
        url: '/users/getDetails',
        method: 'post'
    })
}

export function create(formData) {
    return request({
        url: '/users/create',
        method: 'post',
        data: formData
    })
}
export function show() {
    return request({
        url: '/users/show',
        method: 'post',
    })
}

export function findOne(rid) {
    return request({
        url: '/users/one',
        method: 'post',
        data: {
            rid
        }
    })
}


