class EventSystem {
    static #instance;
    #events = {}; // almacena los eventos.

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

    #validateProperties(eventName,configuration){
        let { view, service} = configuration;

        // Validar la existencia de las propiedades.
        if(!view || !service){
            throw Error("Las propiedades << view >> y << service >> son requeridas.")
        };

        // Validamos que sea el tipo de dato correcto: String.
        if(typeof view !== "string"){
            throw Error(`la propiedad << view >> debe ser de tipo string, recibido: << ${typeof view} >>`);
        };

        // Validamos que sea el tipo de dato correcto: function.
        if(typeof service !== "function"){
            throw Error(`la propiedad << service >> debe ser de tipo function, recibido: << ${typeof service} >>`);
        };
    };

    registerEvent(eventName,configuration){
        // eventName: nombre del evento.
        // view     : la vista a la que va a pertencer el evento.
        // service  : servicio/funcion a ejecutar.
        
        const { view, service} = configuration;

        this.#validateProperties(eventName,configuration);

        let collection = this.#events[view]; // los eventos son categorizados/agrupados por vista.

        if(!collection) {
            this.#events[view] = { [eventName] : service };
        } else {

            // Determinamos si ya hay un evento con el mismo nombre.
            const coinciden = Object.keys(collection).includes(eventName);

            if(coinciden){
                throw Error(`Ya existe ese nombre de evento: ${eventName}`);
            };

            // De lo contrario registramos el evento.
            collection[eventName] = service;
        };
    };
};

export default EventSystem;
