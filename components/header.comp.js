import {Component} from'../files/component'

export class HeaderComponent extends Component {
    constructor(id) {
        super(id)
    }

    init() {
        if (localStorage.getItem('checked') === 'true') {
            this.hide();
        }
        const btn = this.el.querySelector('.js-btn-start');
        btn.addEventListener('click', btnHandler.bind(this))
    }
}

function btnHandler() {
    localStorage.setItem('checked', true);
    this.hide()
}