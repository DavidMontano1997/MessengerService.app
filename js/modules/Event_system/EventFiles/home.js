import EventSystem from "@eventSystem/Event_system.js";
import ENUMS_EVENT_NAME_HOME from "@eventNames_enums/enums_home.js"; // nombres de eventos.
import Logica from "../../../../helpers/LogicaPRUEBA.js"; // Archivo de prueba: Contiene toda la logica de negocio.


const CATEGORY = "home"; // Definimos la categoria o vista en la cuál se van a registrar los eventos en el
// sistema.

const HOME_EVENT_STORE = EventSystem.instance; // obtenemos la única instancia al sistema de eventos.

// Registro de eventos
HOME_EVENT_STORE.registerEvent(ENUMS_EVENT_NAME_HOME.GET_INCOME_FULL,{
    view: CATEGORY, // Vista/categoria en la cuál se va almacenar el evento
    service: Logica.getIngresoFull // Servicio o logica de negocio que debera ejecutar una vez que la UI dispare el evento.
});