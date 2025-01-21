import Router from "@router/router.js";
// Codigo de prueba.
import CONTROLLER_EVENTS from "@eventSystem/Event_system.js";
import ENUMS_EVENT_NAME_HOME from "@eventNames_enums/enums_home.js"
// Codigo de prueba.

document.addEventListener("DOMContentLoaded", Main);

async function Main(){
    // Carga dinamica de las vistas en base al cambio del hash.
    const ROUTER = new Router();
    ROUTER.startRouter();

    // Codigo de prueba: sistema de eventos.
    await CONTROLLER_EVENTS.fileUpload(ROUTER.view); // Cargando los ficheros que se encargan de registrar los eventos.

    if(ROUTER.view === "inicio"){
        CONTROLLER_EVENTS.emitEvents(ENUMS_EVENT_NAME_HOME.GET_INCOME_FULL,{
            view: CONTROLLER_EVENTS.categoryIndex[0],
        });
    };
    // Codigo de prueba: sistema de eventos.

    window.addEventListener("hashchange", (e) => {
        ROUTER.startRouter();
    });
};