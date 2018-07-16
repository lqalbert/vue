export function formateEnum(data, fields) {
    let enums = []
    let enumsMap = {}
    for (let field in fields) {
        let perfield = fields[field]
        if (perfield.Type.substr(0, 4) === 'enum') {
            let fieldName = perfield.Field
            enums.push(fieldName)
            let percomment = (perfield.Comment.split(':'))[1]
            let newobj = {}
            percomment = percomment.split(',')
            for (let i = 0; i < percomment.length; i++) {
                let perobj = percomment[i].split('=')
                newobj[perobj[0]] = perobj[1]
                enumsMap[fieldName] = newobj
            }

        }
    }
    for (let key in data) {
        for (let k in data[key]) {
            if (inArray(k, enums)) {
                data[key][k] = enumsMap[k][data[key][k]]
            }
        }
    }
    return data;
}

function inArray(needle, haystack) {
    var length = haystack.length;
    for (var i = 0; i < length; i++) {
        if (haystack[i] == needle) return true;
    }
    return false;
}