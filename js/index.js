import Router from "./modules/router.js";

document.addEventListener("DOMContentLoaded", Main);

function Main(){
    const ParentDOMElemen = document.querySelector("#sectionMain");
    const ROUTER          = new Router(ParentDOMElemen);

    window.addEventListener("hashchange", (e) => {
        ROUTER.startRouter();
    });
};