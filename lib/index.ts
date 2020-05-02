export function init({categories, registering = {}}: CrescendoInitOpt) {
    return Crescendo.of({categories, registering});
};

export function builtInCategories(): CrescendoCategories {
    return Crescendo.builtInCategories;
}

export interface CrescendoInitOpt {
    categories: CrescendoCategories;
    registering?: Registering;
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
    hideOnInput?: boolean;
}

export interface CrescendoCategories {
    [k: string]: string[]
}

class Crescendo {
    private map: CrescendoMap;

    private static readonly BUILT_IN_CATEGORIES: CrescendoCategories = {
        invalidFormat: [
            `Invalid format.`,
            `Invalid format.`,
            `Invalid format.`,
            `Invalid format.`,
            `Invalid format.`,
            `Are you for real? Invalid format.`,
            `Invalid format.`,
            `Invalid format.`,
            `I've got all my time. Invalid format.`,
            `In va lid  for mat.`,
            `Are you drunk? Invalid format.`,
            `Aw come on! You know it's invalid.`,
            `Believe in yourself. The format is invalid.`,

        ],
        emptyValue: [
            `This field is mandatory`,
            `This field is mandatory`,
            `This field is **mandatory**`,
            `This field is: mandatory`,
            `This field is: **mandatory**`,
            `This field is:  m a n d a t o r y`,
            `This field is:  M A N D A T O R Y`,
            `ffs do you even read me? This field is MANDATORY`,
            `Bruh. Mandatory.`,
            `GODDAMMIT. Mandatory!`,
            `Just type something in this field. Please.`,
            `OK you know what? I'm not validating. It's mandatory.`,
            `Nu-huh. This field is mandatory.`
        ],
    };
    
    public static get builtInCategories() {
        return {...Crescendo.BUILT_IN_CATEGORIES};
    }

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
        errorElem.classList.add('crescendo__error-msg');
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

    static of({categories, registering = {}}: CrescendoInitOpt): Crescendo {
        return new Crescendo({categories, registering});
    }
}
