
export class Crescendo {
    constructor({categories, registering = []}) {
        this.map = this.buildMap(categories);

        Object.entries(registering)
            .forEach(([cat, registeredIds]) => {
                registeredIds.forEach(({id, hideOnInput}) => {this.register(cat, id, hideOnInput);})
            });

    }

    register(category, id, hideOnInput = true) {
        const elem = document.getElementById(id);
        if (!this.map[category]) {
            return;
        }

        if (elem) {
            const errorElem = this.createErrorElement();
            elem.insertAdjacentElement('afterend', errorElem);
            this.map[category].ids.push({id, idx: 0, errorElem});

        } else {
            throw `Element of id ${id} was not found`;
        }
        
        if (hideOnInput) {
            elem.addEventListener('input', () => {
                this.hideError(category, id);
            });
        }
        return this;
    }

    next(category, elementId) {
        if (this.map[category]) {
            let elem = this.map[category].ids.find(({id}) => elementId === id);
            if (elem && elem.idx < this.map[category].messages.length) {
              elem.errorElem.innerHTML = this.map[category].messages[elem.idx];
              elem.errorElem.style.display = 'block';
              elem.idx++;
            }
        }
        return this;
    }

    buildMap(categories) {
        return Object.entries(categories)
            .map(([catName, messages]) => {
            const obj = {};
            obj[catName] = {messages, ids: []};
            return obj
        })
            .reduce((acc, curr) => ({...acc, ...curr}));
    }

    createErrorElement() {
        const errorElem = document.createElement('p');
        errorElem.style.display = 'none';
        return errorElem;
    }

    hideError({category, elementId}) {
        if (this.map[category]) {
            let elem = this.map[category].ids.find(({id}) => elementId === id);
            if (elem) {
                elem.errorElem.style.display = 'none';
            }
        }
        return this;
    }
}

