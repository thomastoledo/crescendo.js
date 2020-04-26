import { init } from './crescendo';

const categories = {
    emailFormat: [
      `Le format de l'email n'est pas bon.`,
      `Le format de l'email n'est pas bon.`,
      `Toujours pas.`,
      `Nope.`,
      `Nu-huh.`,
      `Heh.`,
      `Je constate qu'on est joueur ?`,
      `T'es un.e p'tit.e marrant.e toi`,
      `Haha. On a bien rigolé. Allez tape un vrai email maintenant.`,
      `J'ai tout mon temps moi hein.`,
      `Bon.`,
      `Je crois qu'il y a un malentendu là.`,
      `Mais tu lis les messages où pas ?`,
      `Allez on dit qu'on arrête ?`,
      `Viens on se tape.`,
      `J'vais te soulever. Tape un email correct.`,
    ],
    telFormat: [
        `Format incorrect`,
        `J'ai dit : format in-co-rrect.`,
        `I N C O R R E C T`,
        `. . . C'est un test de patience ?`,
        `Tu sais taper un numéro de téléphone ou pas ?`,
        `OLALAAAA`,
    ],
    emptyValue: [
        `Prière d'entrer une valeur.`,
        `Prière d'entrer une valeur.`,
        `Non mais il faut rentrer quelque chose dans le champ.`,
        `Are you for real?`,
        `Octogone sans règle.`,
    ]
};

const crescendo = init({
    categories, 
    registering: {
        emailFormat: [{elemId: 'email', hideOnInput: false}],
        telFormat: [{elemId: 'tel', hideOnInput: true}]
    }, 
});

crescendo.register('emptyValue', {elemId: 'prenom', hideOnInput: true});
crescendo.register('emptyValue', {elemId: 'nom', hideOnInput: true});

document.getElementById('email').addEventListener('blur', () => {
    crescendo.next('emailFormat', 'email');
});

document.getElementById('tel').addEventListener('blur', () => {
    crescendo.next('telFormat', 'tel');
});

document.getElementById('prenom').addEventListener('blur', () => {
    crescendo.next('emptyValue', 'prenom');
});

document.getElementById('nom').addEventListener('blur', () => {
    crescendo.next('emptyValue', 'nom');
});