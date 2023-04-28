import ROUTE from "./route.js";

export default class Router {
    constructor(element){
        this.ParentDOMElement = element;// Elemento del DOM en el cual se inyectara el contenido de las vistas.
        this.URL              = window.location;
    };

    startRouter(){
        const HASH    = this.getHash();
        const SECTION = this.getNameSection(HASH);
        const VIEW    = this.getRoute(SECTION);

        console.log(VIEW);
    };

    getHash(){
        return this.URL.hash;
    };

    getNameSection(HASH){
        return HASH.split("/")[1];
    };

    getRoute(VIEW){
        if(VIEW in ROUTE){ 
            return `${ROUTE[VIEW]}`;
        } else {
            throw Error("error de enrutamiento");
        }
    };
};