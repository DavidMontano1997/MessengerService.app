# Sistema de Eventos

### Descripción General

Esta implementación permite registrar y ejecutar eventos dinámicamente según la vista activa en una aplicación. El sistema está diseñado para ser modular, eficiente y escalable, utilizando patrones como Singleton y carga dinámica de archivos.

### Modúlos del Sistema

Esta conformado por los siguientes modulos:

1. `index.js` : Punto de entrada principal que inicializa el sistema de eventos. También maneja la navegación y la carga dinámica de eventos.

2. `EventSystem.js` : Módulo central que gestiona: 

    - Registro de eventos.
    - Emisión de eventos.
    - Validación y categorización de eventos.
    - Carga dinámica de archivos asociados con cada vista.
    - Manejo de un estado centralizado.
    - Unica instancia(Patrón Singleton).

    #### Metodos Claves

    | **Método**               | **Descripción**                                                                                                                                          | **Parámetros**                                                                                                                                                                                                                           | **Restricciones/Lógica**                                                                                                      |
    |--------------------------|----------------------------------------------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------|
    | `CONTROLLER_EVENTS` | Variable de acceso global  | N/A | Instancia del sistema de eventos. |
    | `EventSystem.instance` | Metodo de clase | N/A | Obtiene la instancia global al sistema.
    | `registerEvent(eventName, configuration)` | Registra un evento.                                                                                                                                       | - `eventName` (string): Nombre del evento.<br>- `configuration` (object):<br> &nbsp;&nbsp;&nbsp;&nbsp;- `view` (string): Categoría o vista a la que pertenece el evento.<br> &nbsp;&nbsp;&nbsp;&nbsp;- `service` (function): Función a ejecutar. | - `eventName` y `view` deben ser strings alfabéticos en minúsculas  y sin espacios.<br>- No se permiten eventos duplicados.                              |
    | `emitEvents(eventName, infoEvent)`         | Ejecuta un evento.                                                                                                                                       | - `eventName` (string): Nombre del evento.<br>- `infoEvent` (object):<br> &nbsp;&nbsp;&nbsp;&nbsp;- `view` (string): Vista o categoría del evento.<br> &nbsp;&nbsp;&nbsp;&nbsp;- `data` (any): Datos opcionales para el evento.<br> &nbsp;&nbsp;&nbsp;&nbsp;- `context` (object): Contexto para `this`, en caso de ser necesario. | - `eventName` y `view` deben ser strings alfabéticos en minúsculas  y sin espacios.<br>- No se permiten eventos duplicados.                                                                                                             |
    | `fileUpload(file)`                         | Carga dinámicamente el archivo de eventos según la vista.                                                                                                | - `file` (string): Ruta o nombre del archivo a cargar dinámicamente.                                                                                                                                                                     | Usa `import()` para cargar únicamente los eventos necesarios.                                                                |
    | `categoryIndex()` | Metodo de propiedad | N/A | Retorna las categorías/vistas registradas en las que se pueden agrupar eventos. |
----

3. `routes.js` :Define las rutas a los ficheros que contienen los registros de eventos de cada vista.

    ```js
    const ROUTES = {
        inicio: "./EventFiles/home.js",
        clientes: "./EventFiles/clients.js",
        configuracion: "./EventFiles/configuration.js",
        ...
    };
    ```

4. <a name="registro-de-eventos"></a>Archivos de Registro de Eventos (ejemplo:  `home.js` ) : Cada archivo registra eventos específicos de la vista correspondiente utilizando el sistema central de eventos.

    ```js
    import CONTROLLER_EVENTS from "@eventSystem/Event_system.js"; // sistema de eventos.
    import ENUMS_EVENT_NAME_HOME from "@eventNames_enums/enums_home.js"; // objecto con los nombres de eventos.
    import Logica from "../../../../helpers/LogicaPRUEBA.js"; // Archivo de prueba: Contiene toda la logica de negocio.

    const enums = ENUMS_EVENT_NAME_HOME;

    // Definimos la categoría/vista en la que vamos a registrar los eventos.
    const CATEGORY = CONTROLLER_EVENTS.categoryIndex[0]; // "home"

    CONTROLLER_EVENTS.registerEvent(enums.GET_INCOME_FULL,{
        view: CATEGORY,
        service: Logica.getIngresoFull
    });
    ```


5. Archivos Enum (ejemplo : `enums_home.js`) : Definen nombres de eventos constantes para evitar errores y garantizar consistencia.

    ```js
        const ENUMS_EVENT_NAME_HOME = Object.freeze({
            GET_ANNUAL_INCOME : "get_annual_income"
        });

        export default ENUMS_EVENT_NAME_HOME;
    ```

----

### Registro/definición de categorías

En la fichero central del sistema [Event_system.js](../js/modules/Event_system/Event_system.js) , Se define una propiedad  `#categoryIndex`  la cuál es privadad y de tipo **Array**, donde se deben definir las diferentes vista/categorías de forma manual, para la agrupación de eventos. 

Una vez registrada la categoría se puede pasar a [registrar eventos](#registro-de-eventos).

```js
// Categorias validas para el registro de eventos.
#categoryIndex = ["home","clients","income_record","expense_record","reminder","account","configuration"];
```