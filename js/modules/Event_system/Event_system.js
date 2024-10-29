import ROUTES from "./routes.js";

class EventSystem {
    static #instance;
    #events = {}; // almacena los eventos.
    // Categorias validas para el registro de eventos.
    #categoryIndex = ["home","clients","income_record","expense_record","reminder","account","configuration"];

    constructor(){
        if(EventSystem.#instance){
            // Evitamos la creación de más intancias ya que es importante mantener un estado global de este modulo. 
            // Para ello utlizamos el patron singletón.
            throw Error("El sistema de eventos ya ha sido instanciado. Usa 'EventSystem.instance' para acceder a la instancia.");
        };

        EventSystem.#instance = this;
    };

    static get instance(){ // Propiedad estatica para tener acceso de forma global a la instancia única.
        if(!EventSystem.#instance){
            throw Error("El sistema de eventos no ha sido instanciado. Crea una instancia usando << new EventSystem() >>.");
        };
        
        return EventSystem.#instance;
    };

    async fileUpload(view){
        const getCategory = view ? view : "inicio"; // Definimos "inicio" en caso de que no se obtenga una vista
        // especifica en la ruta puesto que es esta la vista por defautl. (ver router.js)
        
        if(!this.#events[getCategory]){
            const route = this.#getFilePath(getCategory); //obtiene la ruta.

            if(route){
                try {
                    await import(route);
                } catch (error) {
                    console.error(`Error al tratar de cargar el fichero: ${route} \n`,error);
                    alert(`Error al tratar de cargar el fichero: ${route}`);
                };
            } else {
                console.error(`No se logró cargar fichero de eventos para la vista: <<< ${getCategory} >>.`);
            };
        };

        return;
    };

    #getFilePath(getCategory){
        const route = ROUTES[getCategory];

        if(!route){
            console.warn(`No se encontro un fichero de eventos para la vista: <<< ${getCategory} >>>, Verifica la ruta a la que tratas de acceder.`);
            return;
        };

        return route;
    };

    #validateProperties(eventName,configuration){
        let { view, service} = configuration;

        const action = "REGISTRO DE EVENTO"; // Identifica el contexto/acción de lo que se esta tratando de hacer 
        // para dar más detalle al momento de mostrar un error.

        if(!eventName || !view || !service){
            this.#showError({
                eventName,
                action, 
                view,
                message:"Las propiedades eventName,view,service son requeridas."
            });
        };

        let regex = /[0-9A-Z\W\s]/g;

        if(typeof eventName !== "string" || regex.test(eventName)){
            this.#showError({
                eventName,
                action,
                view,
                message: "El nombre de evento << eventName >> debe ser de tipo string y no debe contener números,carácteres especiales ni espacios."
            });
        };

        if(typeof view !== "string" || regex.test(view)){
            this.#showError({
                eventName,
                action,
                view,
                message: "la vista << view >> debe ser de tipo string, y no debe contener números,carácteres especiales ni espacios."
            });
        };

        if(typeof service !== "function"){
            this.#showError({
                eventName,
                action,
                view,
                message:`la propiedad << service >> debe ser de tipo function, recibido: << ${typeof service} >>`
            });
        };
    };

    #cleanString(string){
        return string.trim();
    };

    #validityCategory(eventName,configuration,action){
        const { view, service  } = configuration;
        const existingCategory = this.#categoryIndex.includes(view);

        // Validamos que la categoria este registrada en el sistema.
        if(existingCategory){
            this.#events[view] = { [eventName] : service };
        } else { 
            this.#showError({
                eventName, 
                action, 
                view,
                message: "La categoría no existe en los registro del sistema de eventos." 
            });
        };
    };

    registerEvent(eventName,configuration){
        // eventName: nombre del evento.
        // view     : la vista a la que va a pertencer el evento.
        // service  : servicio/funcion a ejecutar.
        const action = "REGISTRO DE EVENTO";
        let { view, service} = configuration;

        try {
            eventName = this.#cleanString(eventName);
            view      = this.#cleanString(view);
    
            // validamos el tipo de dato de las propiedades.
            this.#validateProperties(eventName,configuration);
    
            // los eventos son categorizados/agrupados por vista, para tener un mejor orden y evitar colisiones de eventos.
            let collection = this.#events[view];  
    
            if(!collection) {
                // Validamos que la categoria sea valida.
                this.#validityCategory(eventName,configuration,action);
            } else {
                // Determinamos si ya hay un evento con el mismo nombre.
                const coinciden = Object.keys(collection).includes(eventName);
    
                if(coinciden){
                    throw Error(`EL nombre de evento: ${eventName}, ya existe. Definie otro nombre para evitar colisiones.`);
                };
    
                // De lo contrario registramos el evento.
                collection[eventName] = service;
            };
        } catch (error) {
            alert(`Error: Algo salió mal al tratar de registrar un evento.`);
            console.error(error);
        };
    };

    #showError(data){
        // inptu   : valor recibido.
        // action  : ¿Que se esta tratando de hacer?.
        // message : descripción del error.
        const { eventName, action, view, message } = data;

        let error = ` context: ${action} \n event: ${eventName ? eventName : undefined} \n view: ${view ? view : undefined} \n`;

        console.warn(error);
        throw Error(message);
    };

    emitEvents(eventName,infoEvent){
        const { view, data, context } = infoEvent;
        const action = "EJECUCION DE EVENTO";

        try {
            if(!eventName || !view){
                this.#showError({
                    eventName,
                    action,
                    view,
                    message: "Las propiedades eventName,view son requeridas."
                });
            };

            const category = this.#events[view]; // Categoría/grupo al que pertenece el evento.
            
            if(!category){
                this.#showError({
                    eventName,
                    action,
                    view,
                    message: "La vista no esta registrada."
                });
            };
            
            const callback  = category[eventName];

            if(!callback){
                this.#showError({
                    eventName,
                    action,
                    view,
                    message: "El evento que solicitas no existe en los registro del sistema de eventos."
                });
            }; 

            if(context){ // Se define "this", en caso de que el evento lo requiera.
                callback.call(context,data ? data : false);
                return;
            };

            callback(data ? data : false);
        } catch (error) {
            alert(`Error: Algo salió mal al tratar de ejecutar un evento.`); // Para esto se implementara un mensaje de alerta mas personalizado en un futuro.
            console.error(error);
        };
    };
};

export default EventSystem;
