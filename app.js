import { Crescendo } from './crescendo.js';

const categories = {
    emailFormat: [
      `Le format de l'email n'est pas bon`,      
      `Le format de l'email n'est pas bon`,
      `Le format de l'email n'est pas bon`,
      `Le format de l'email n'est pas bon`,
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
    ]
};

const crescendo = new Crescendo({
    categories, 
    registering: {
        emailFormat: [{id: 'email', hideOnInput: false}]
    }, 
});

// crescendo.register('emailFormat', 'email', true);

email.addEventListener('blur', () => {
    crescendo.next('emailFormat', 'email');
});