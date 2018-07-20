import request from '@/utils/request'

export function getRoles() {
    return request({
        url: '/roles/list',
        method: 'post'
    })
}

export function save(formData) {
    return request({
        url: '/roles/save',
        method: 'post',
        data: formData
    })
}
export function findOne(rid) {
    return request({
        url: '/roles/one',
        method: 'post',
        data: {
            rid
        }
    })
}


