export class Form {
    constructor(form, validations) {
        this.form = form;
        this.validations = validations;
    }

    clear() {
        Object.keys(this.validations).forEach(valid => {
            this.form[valid].value = ''
        })
    }

    value() {
        const value = {};

        Object.keys(this.validations).forEach(valid => {
            value[valid] = this.form[valid].value
        })

        return value;
    }

    isValid() {
        let isFormValid = true;

        Object.keys(this.validations).forEach(valid => {
            const validators = this.validations[valid]

            let isValid = true

            validators.forEach(validator => {
                isValid = validator(this.form[valid].value) && isValid
            })

            if (!isValid) {
                setError(this.form[valid]);
            } else {
                clearError(this.form[valid])
            }

            isFormValid = isFormValid && isValid
        })

        return isFormValid;
    }
}

function setError(err) {
    clearError(err)
    const error = '<p class="valid-error">Произошла ошибочка</p>';
    err.classList.add('invalid');
    err.insertAdjacentHTML('afterend', error);
}

function clearError(err) {
    err.classList.remove('invalid')

    if (err.nextSibling) {

        err.closest('.form-control').removeChild(err.nextSibling);

    }
}