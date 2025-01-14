import Router from "@router/router.js";

document.addEventListener("DOMContentLoaded", Main);

function Main(){
    // Carga dinamica de las vistas en base al cambio del hash.
    const ROUTER = new Router();
    ROUTER.startRouter();

    window.addEventListener("hashchange", (e) => {
        ROUTER.startRouter();
    });
};