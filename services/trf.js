export class Transform {
    static objToArray(data) {
        return Object.keys(data).map(key => {
            const item = data[key]
            item.id = key
            return item
        })
    }
}