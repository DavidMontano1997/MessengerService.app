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

    registerEvent(eventName,configuration){
        // eventName: nombre del evento.
        // view     : la vista a la que va a pertencer el evento.
        // service  : servicio/funcion a ejecutar.
        
        const { view, service} = configuration;
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
