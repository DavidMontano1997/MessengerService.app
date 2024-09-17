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

        if(!eventName || !view || !service){
            throw Error("Las propiedades eventName,view,service son requeridas.");
        };

        let regex = /[0-9A-Z\W\s]/g;

        if(typeof eventName !== "string" || regex.test(eventName)){
            console.warn(`Input: ${eventName}`);
            throw Error("El nombre de evento << eventName >> debe ser de tipo string y no debe contener números,carácteres especiales ni espacios.");
        };

        if(typeof view !== "string" || regex.test(view)){
            console.warn(`Input: ${view}`);
            throw Error(`la vista << view >> debe ser de tipo string, y no debe contener números,carácteres especiales ni espacios.`);
        };

        if(typeof service !== "function"){
            throw Error(`la propiedad << service >> debe ser de tipo function, recibido: << ${typeof service} >>`);
        };
    };

    #cleanString(string){
        return string.trim();
    };

    registerEvent(eventName,configuration){
        // eventName: nombre del evento.
        // view     : la vista a la que va a pertencer el evento.
        // service  : servicio/funcion a ejecutar.
        
        let { view, service} = configuration;

        eventName = this.#cleanString(eventName);
        view      = this.#cleanString(view);

        // validamos el tipo de dato de las propiedades.
        this.#validateProperties(eventName,configuration);

        // los eventos son categorizados/agrupados por vista, para tener un mejor orden y evitar colisiones de eventos.
        let collection = this.#events[view];  

        if(!collection) {
            this.#events[view] = { [eventName] : service };
        } else {

            // Determinamos si ya hay un evento con el mismo nombre.
            const coinciden = Object.keys(collection).includes(eventName);

            if(coinciden){
                throw Error(`EL nombre de evento: ${eventName}, ya existe. Definie otro nombre para evitar colisiones.`);
            };

            // De lo contrario registramos el evento.
            collection[eventName] = service;
        };
    };
};

export default EventSystem;
