# crescendo.js

A brand new useless framework

## What
Allowing your team to create in a simple way many error messages for your forms.

Have you ever wanted to display an evolving error message, as the user would type wrong things in your forms? For instance, going from "The email is invalid" to "Please use your brain and type a valid email" in 3.5?

I have. And now there is CrescendoJS, a simple library to allow me to do that (and you too). What a time to be alive.

## How
```sh
npm install crescendojs --save
# or
yarn add crescendojs
```

In your app, initialize a Crescendo object by passing what is called a `CrescendoInitOpt` object. A `CrescendoInitOpt` object contains a `CrescendoCategories` object and a `Registering` object.
Example:

```js
const options = {
    categories: {
        emailFormat: [
            'The email is invalid',
            'The email is still invalid',
            'Please use your brain and type a valid email',
        ],
        emptyValues: [
            'This field is mandatory, please specify a value',
            'What part of "mandatory" do you not understand?',
            'Are you for real? This field is  m a n d a t o r y.',
        ]
    },
    // the registering property is optional
    // and you don't have to register everything at init
    registering: {
        // you specify for which category you want to register the form control
        // you specify the form control id
        // you specify if you want the error message to be hidden when the user starts typing again (default is true)
        emailFormat: [{elemId: 'email', hideOnInput: true}],
    }
}
```

Then, you init a crescendo object:

```js
import { init } from 'crescendo';

const crescendo = init(options);
```

You can register as many elements as you want:

```js
crescendo.register('emptyValues', {elemId: 'firstname'})
         .register('emptyValues', {elemId: 'lastname'});
```

Then, you want to display an error message:

```js
document.getElementById('email').addEventListener('blur', (e) => {
    // do your stuff

    // and if there are any mistake
    crescendo.next('emailFormat', 'email');

    // if everything is fine, you can just hide the error
    crescendo.hideError('emailFormat', 'email');
});
```

## What's next

Yes.
