import request from '@/utils/request'

export function getUsers() {
    return request({
        url: '/menus/getDetails',
        method: 'post'
    })
}

export function create(formData) {
    return request({
        url: '/menus/create',
        method: 'post',
        data: formData
    })
}
export function show() {
    return request({
        url: '/menus/show',
        method: 'post',
    })
}

export function findOne(rid) {
    return request({
        url: '/menus/one',
        method: 'post',
        data: {
            rid
        }
    })
}


