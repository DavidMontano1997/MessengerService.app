import CONTROLLER_EVENTS from "@eventSystem/Event_system.js"; // sistema de eventos.
import ENUMS_EVENT_NAME_HOME from "@eventNames_enums/enums_home.js"; // objecto con los nombres de eventos.
import Logica from "../../../../helpers/LogicaPRUEBA.js"; // Archivo de prueba: Contiene toda la logica de negocio.

const CATEGORY = CONTROLLER_EVENTS.categoryIndex[0]; // Definimos la categoría para registrar los eventos.
const enums = ENUMS_EVENT_NAME_HOME;

CONTROLLER_EVENTS.registerEvent(enums.GET_INCOME_FULL,{
    view: CATEGORY,
    service: Logica.getIngresoFull
});