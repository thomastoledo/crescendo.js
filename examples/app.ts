import * as Crescendo from '../lib/index.js';

const firstname = document.getElementById('firstname') as HTMLInputElement;
const email = document.getElementById('email') as HTMLInputElement;


const crescendo = Crescendo.init({
    categories: {
        ...Crescendo.builtInCategories()
    },
    registering: {
        emptyValue: [{elemId: 'firstname'}]
    }
});

firstname.addEventListener('blur', function() {
    if (!this.value) {
        crescendo.next('emptyValue', this.id);
    }
});

email.addEventListener('blur', function() {
    const mailReg = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

    if (!this.value) {
        crescendo.next('emptyValue', this.id);
    }

    if (!mailReg.test(this.value)) {
        crescendo.next('invalidFormat', this.id);
    }

});