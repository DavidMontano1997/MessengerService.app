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

        const action = "Registro de evento"; // Identifica el contexto/acción de lo que se esta tratando de hacer 
        // para dar más detalle al momento de mostrar un error.

        if(!eventName || !view || !service){
            this.#showError({
                eventName,
                action, 
                message:"Las propiedades eventName,view,service son requeridas."
            });
        };

        let regex = /[0-9A-Z\W\s]/g;

        if(typeof eventName !== "string" || regex.test(eventName)){
            this.#showError({
                eventName,
                input:eventName,
                action,
                message: "El nombre de evento << eventName >> debe ser de tipo string y no debe contener números,carácteres especiales ni espacios."
            });
        };

        if(typeof view !== "string" || regex.test(view)){
            this.#showError({
                eventName,
                input:view,
                action,
                message: "la vista << view >> debe ser de tipo string, y no debe contener números,carácteres especiales ni espacios."
            });
        };

        if(typeof service !== "function"){
            this.#showError({
                eventName,
                input:service,
                action,
                message:`la propiedad << service >> debe ser de tipo function, recibido: << ${typeof service} >>`
            });
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

    #showError(data){
        // inptu   : valor recibido.
        // action  : ¿Que se esta tratando de hacer?.
        // message : descripción del error.
        const { eventName, input, action, message } = data;

        let error = ` event: ${eventName} \n context: ${action} \n`;

        if(input) error += ` input: ${input}`;
        console.warn(error);
        throw Error(message);
    };
};

export default EventSystem;
