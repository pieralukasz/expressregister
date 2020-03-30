// class Register {
//     constructor() {
//         this.nip = document.querySelector('.form-nip span');
//         this.email = document.querySelector('.form-email span')
//         this.password = document.querySelector('.form-password span')
//         this.password2 = document.querySelector('.form-password2 span')
//         this.buttonSubmit = document.querySelector('.form-login-btn span')
//         this.inputs = [...document.getElementsByTagName('input')];
//         this.validate = new Bouncer('.form-register')
//         this.init();
//     }

//     checkEmail(email) {
//         const pattern = /^\w+@[a-zA-Z_]+?\.[a-zA-Z]{2,3}$/;
//         alert(email.match(pattern));

//     }

//     isValid(e) {
//         this.checkEmail(e.target.value)
//     }

//     giveThemListener() {
//         this.inputs.forEach((el) => {
//             el.addEventListener('input', this.isValid);
//         });
//     }

//     init() {
//         this.giveThemListener()

//     }

// }

// document.addEventListener('DOMContentLoaded', () => {
//     new Register()
// })

