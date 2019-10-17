import { Component } from '../files/component'
import { apiService } from './../services/api';

export class FavoriteComponent extends Component {
    constructor(id, options) {
        super(id)

        this.loader = options.loader
    }

    init() {
        this.el.addEventListener('click', linkClick.bind(this))
    }


    onShow() {
        const bestPosts = JSON.parse(localStorage.getItem('best'))
        const html = renderList(bestPosts)
        this.el.insertAdjacentHTML('afterbegin', html)
    }

    onHide() {
        this.el.innerHTML = ''
    }

}


function renderPost(post) {
    const tag = post.type === 'news' ? `<li class="tag tag-blue tag-rounded">Новость</li>` :
    `<li class="tag tag-rounded">Заметка</li>`



    return `
        <div class="panel">
            <div class="panel-head">
                <p class="panel-title">${post.title}</p>
                <ul class="tags">
                    ${tag}
                </ul>
            </div>
            <div class="panel-body">
                <p class="multi-line">${post.fulltext}</p>
            </div>
            <div class="panel-footer w-panel-footer">
            <small>${post.date}</small>
            </div>
    </div>
    `
}


function renderList(list = []) {
    if (list && list.length) {
        return `
            <ul>
                ${list.map(item => `<li><a href="#" class="list-link">${item.title}</a></li>`).join('')}
            </ul>
        
        `
    }

    return `<p class="center">Пока еще ничего не добавили</p>`
}

async function linkClick(event) {
    event.preventDefault();

    if (event.target.classList.contains('list-link')) {
        const postId = event.target.textContent;

        this.el.innerHTML = ''

        this.loader.show()

        const post = await apiService.fetchPostById(postId)

        this.loader.hide()

        this.el.insertAdjacentHTML('afterbegin', renderPost(post))
    }
}
