import { Component } from '../files/component'
import { apiService } from '../services/api'
import { Transform } from '../services/trf'

export class PostsComponent extends Component {
    constructor(id, {loader}) {
        super(id)
        this.loader = loader
    }

    init() {
        this.el.addEventListener('click', saveHandler.bind(this))
    }

    async onShow() {
        this.loader.show();
        const data = await apiService.fetchPosts();
        const posts = Transform.objToArray(data);
        const html = posts.map(post => renderPost(post))
        this.loader.hide()
        this.el.insertAdjacentHTML('afterbegin', html.join(' '))
    }

    onHide() {
        this.el.innerHTML = ''
    }
}

function renderPost(post) {
    const tag = post.type === 'news' ? `<li class="tag tag-blue tag-rounded">Новость</li>` :
    `<li class="tag tag-rounded">Заметка</li>`

    const bestPosts = JSON.parse(localStorage.getItem('best')) || []
    const pers = bestPosts.find(posts => posts.id === post.id)

    let btnSave = pers ? `<button class="button-round button-small button-danger" data-id="${post.id}" data-title="${post.title}">Удалить</button>` : `<button class="button-round button-small button-primary" data-id="${post.id}" data-title="${post.title}">Сохранить</button>`



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
            ${btnSave}
            </div>
    </div>
    `
}


function saveHandler() {

        const target = event.target;
        const id = target.dataset.id;
        const title = target.dataset.title
        if (id) {
            let bestPosts = JSON.parse(localStorage.getItem('best')) || []
            const pers = bestPosts.find(post => post.id === id)

            if (bestPosts.includes(id)) {
                // delete
                target.textContent = 'Сохранить'
                target.classList.add('button-primary')
                target.classList.remove('button-danger')
                bestPosts = bestPosts.filter(post => post.id !== id)

            } else {
                // add
                target.classList.remove('button-primary')
                target.classList.add('button-danger')
                target.textContent = 'Удалить'
                bestPosts.push({id, title});
            }
            localStorage.setItem('best', JSON.stringify(bestPosts));
        }


}