export function init(opt: CrescendoInitOpt) {
    return Crescendo.of(opt);
};

export interface CrescendoInitOpt {
    categories: CrescendoCategories;
    registering: Registering;
}

interface CrescendoMap {
    [k: string]: CrescendoMapItem
}

interface CrescendoMapItem {
    messages: string[]; 
    elements: CrescendoMapItemElements;
}

interface CrescendoMapItemElements {
    [elemId: string]: CrescendoMapItemElement
}

interface CrescendoMapItemElement {
    hideOnInput: boolean;
    msgIdx: number;
    errorElement: HTMLElement;
}

interface Registering {
    [k: string]: RegisteringItem[];
}

export interface RegisteringItem {
    elemId: string;
    hideOnInput: boolean;
}

export interface CrescendoCategories {
    [k: string]: string[]
}

class Crescendo {
    private map: CrescendoMap;

    private constructor({categories, registering = {}}: CrescendoInitOpt) {
        this.map = this.buildMap(categories);

        Object.entries(registering)
            .forEach(([cat, registeredIds]: [string, RegisteringItem[]]) => {
                registeredIds.forEach(({elemId, hideOnInput = true}: RegisteringItem) => {this.register(cat, {elemId, hideOnInput});})
            });

    }

    private buildMap(categories: CrescendoCategories): CrescendoMap {
        return Object.entries(categories)
            .map(([catName, messages]: [string, string[]]) => {
            const obj: CrescendoMap = {};
            obj[catName] = {messages, elements: {}};
            return obj
        }).reduce((acc: CrescendoMap, curr: CrescendoMap) => ({...acc, ...curr}));
    }

    public register(categoryName: string, {elemId, hideOnInput = true}: RegisteringItem) {

        const elem: HTMLElement | null = document.getElementById(elemId);
        
        if (!elem) {
            console.error(`Element of id ${elemId} was not found`);
            return;
        }

        if (!this.map[categoryName]) {
            return;
        }

        if (this.map[categoryName].elements[elemId]) {
            console.error(`Element of id ${elemId} already registered`);
            return;
        }
        

        if (elem) {
            const errorElement: HTMLElement = this.createErrorElement();
            elem.insertAdjacentElement('afterend', errorElement);
            this.map[categoryName].elements[elemId] = {hideOnInput, msgIdx: 0, errorElement};
        }
        
        if (hideOnInput) {
            elem.addEventListener('input', () => {
                this.hideError(categoryName, elemId);
            });
        }
        return this;
    }

    public next(categoryName: string, elementId: string) {
        if (this.map[categoryName]) {
            let elem: CrescendoMapItemElement = this.map[categoryName].elements[elementId];
            if (elem) {
              elem.errorElement.innerHTML = this.map[categoryName].messages[elem.msgIdx];
              elem.errorElement.style.display = 'block';
              if (elem.msgIdx < this.map[categoryName].messages.length - 1) {
                  elem.msgIdx++;
              }
            }
        }
        return this;
    }

    private createErrorElement() {
        const errorElem = document.createElement('p');
        errorElem.style.display = 'none';
        return errorElem;
    }

    public hideError(categoryName: string, elemId: string) {
        if (this.map[categoryName]) {
            let elem: CrescendoMapItemElement = this.map[categoryName].elements[elemId];
            if (elem) {
                elem.errorElement.style.display = 'none';
            }
        }
        return this;
    }

    static of(opt: CrescendoInitOpt): Crescendo {
        return new Crescendo(opt);
    }
}
