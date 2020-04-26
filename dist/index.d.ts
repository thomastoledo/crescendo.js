export declare function init(opt: CrescendoInitOpt): Crescendo;
export interface CrescendoInitOpt {
    categories: CrescendoCategories;
    registering: Registering;
}
interface Registering {
    [k: string]: RegisteringItem[];
}
export interface RegisteringItem {
    elemId: string;
    hideOnInput: boolean;
}
interface CrescendoCategories {
    [k: string]: string[];
}
declare class Crescendo {
    private map;
    private constructor();
    private buildMap;
    register(categoryName: string, { elemId, hideOnInput }: RegisteringItem): this | undefined;
    next(categoryName: string, elementId: string): this;
    private createErrorElement;
    hideError(categoryName: string, elemId: string): this;
    static of(opt: CrescendoInitOpt): Crescendo;
}
export {};
