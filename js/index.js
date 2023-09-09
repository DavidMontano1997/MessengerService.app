import Router from "./modules/router.js";

// helpers
import ShowModal from "./../helpers/Show_modal_window.js";

document.addEventListener("DOMContentLoaded", Main);

function Main(){
    // Carga dinamica de las vistas en base al cambio del hash.
    const ROUTER = new Router();
    ROUTER.startRouter();

    // helpers = Funcion de ayuda renderiza la ventana modal de la factura.
    ShowModal(ROUTER);

    window.addEventListener("hashchange", (e) => {
        ROUTER.startRouter();
        
        // helpers = Funcion de ayuda renderiza la ventana modal de la factura.
        ShowModal(ROUTER);
    });
};