class Register {
    constructor() {
        this.nip = document.querySelector('.form-nip span');
        this.email = document.querySelector('.form-email span')
        this.password = document.querySelector('.form-password span')
        this.password2 = document.querySelector('.form-password2 span')
        this.buttonSubmit = document.querySelector('.form-login-btn span')
        this.inputs = [...document.getElementsByTagName('input')];
        this.init();
    }

    isValid(e) {
        e.preventDefault();
        console.log(e.target.value)
    }

    giveThemListener() {
        this.inputs.forEach((el) => {
            el.addEventListener('input', this.isValid);
        });
    }

    init() {
        this.giveThemListener()
    }

}

document.addEventListener('DOMContentLoaded', () => {
    new Register()
})

