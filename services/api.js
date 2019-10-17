class ApiService {
    constructor(url) {
        this.url = url
    }

    async createPost(post) {
        try {

            const request = new Request(this.url + '/posts.json', {
                method: 'post',
                body: JSON.stringify(post)
            });
            const info = await fetch(request)

            return await info.json()

        }

        catch(err) {
            console.error(err)
        }

    }

    async fetchPosts() {
        try {
            const request = new Request(`${this.url}/posts.json`, {
                method: 'get'
            })
            const info = await fetch(request)
            return await info.json()
        } catch(err) {

        }
    }
    async fetchPostById(id) {
        try {
            const request = new Request(`${this.url}/posts/${id}.json`, {
                method: 'get'
            })
            const info = await fetch(request)
            return await info.json()
        } catch(err) {

        }
    }
}

export const apiService = new ApiService('https://js-blog-af333.firebaseio.com')