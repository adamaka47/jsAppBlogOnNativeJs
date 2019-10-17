import { Component } from '../files/component'
import { Form } from '../files/form'
import { Validators } from '../files/validators'
import { apiService } from '../services/api'

export class CreateComponent extends Component {
    constructor(id) {
        super(id)

    }

    init() {
        this.el.addEventListener('submit', submitHandler.bind(this))

        this.form = new Form(this.el, {
            title: [Validators.required],
            fulltext: [Validators.required, Validators.minLength(5)]
        })
    }
}

async function submitHandler() {
    event.preventDefault();

    if (this.form.isValid()) {

        const formData = {
            type: this.el.type.value,
            date: new Date().toLocaleDateString(),
            ...this.form.value()
    
        }

        await apiService.createPost(formData)

        this.form.clear()

        alert('Запись успешно отправлена в базу данных!')
    
    }
}