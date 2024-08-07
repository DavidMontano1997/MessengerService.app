import ROUTES from "./routes.js"; // rutas del proyecto.

class Router {
    #PARENT_DOM_ElEMENT = document.querySelector("#sectionMain"); // elmento en el cuál se va a renderizar las vistas solicitadas por el cliente.
    #URL = window.location;

    async startRouter(){
        
        if(this.#PARENT_DOM_ElEMENT){
            const HASH    = this.#getHash();             // obtiene el hash de la url.
            const SECTION = this.#getNameSection(HASH);  // obtiene el nombre de la vita.
            const ROUTE   = this.#getRoute(SECTION);     // obtiene la ruta de la vista.
    
            if(ROUTE) {
                const RESPONSE = await this.#request(ROUTE); // obtiene componente html de la vista.
    
                if(RESPONSE){
                    this.#WriteHTML(RESPONSE); // implementamos al DOM.
                };
            };
        } else {
            alert("Elemento padre no encontrado para renderizar el HTML <<#sectionMain>>");
            throw new Error("Elemento padre no encontrado para renderizar el HTML <<#sectionMain>>");
        }
    };

    #getHash(){
        return this.#URL.hash;
    };

    #getNameSection(HASH){
        // Extraemos la información que hay después del #, ya que esta nos 
        // informa la sección a la que el usuario esta tratando de acceder.
        return HASH.split("/")[1];
    };

    #getRoute(view){
        if(!view){
            return `${ROUTES.inicio}`; // En caso de que no exista un hash se cargara la vista home. La cual sera la vista por default.
        } else if(view && view in ROUTES){
            return `${ROUTES[view]}`;  // Extraemos la ruta de la vista solicitada por el usuario.
        } else { 
            // Pagina no existente "Error 404".
            const INFO = {
                status    : "404",
                statusText: "Pagina no encontrada, estas tratando de acceder a una ruta que desconocemos..."
            };

            this.#printError(INFO); // Mostramos un error en la pantalla.
            throw Error("Pagina no encontrada, estas tratando de acceder a una ruta que desconocemos.");
        };
    };

    async #request(ROUTE){
        let response;

        try {
            const REQUEST_AJAX  = await fetch(ROUTE);
            const { ok, status } = REQUEST_AJAX;

            if(!ok){ // Peticion fallida.
                const INFO = {
                    status,
                    statusText :`El recurso << ${ROUTE} >> no fue encontrado, por favor verifica la ruta a la que estas tratando de acceder.`
                };

                response = ok;
                this.#printError(INFO); // // Mostramos un error en la pantalla.
                throw Error(`Error al tratar de obtener el recurso << ${ROUTE} >>`);
            }

            response = await REQUEST_AJAX.text();// retorna el component html a imprimir.
        } catch (error) {
            console.error(error);

            if(error instanceof TypeError){
                response = false;
                this.#printError({ status: "500", statusText: "No se pudo obtener el recurso, por favor compruebe su conxión a internet." });
            };
        };

        return response;
    };

    #printError(INFO){
        const { status, statusText } = INFO;
        const CONTAINER = document.createElement("div");

        CONTAINER.className = "container";
        CONTAINER.innerHTML = `
            <h2 class="text-danger">ERROR ${status}</h2>
            <p>${statusText}</p>
            ${status === '404' ? '<button id="goBack" class="btn btn-info">Volver atrás</button>' : ''}
        `;
        
        this.#PARENT_DOM_ElEMENT.innerHTML = "";
        this.#PARENT_DOM_ElEMENT.appendChild(CONTAINER);

        // Volver atrás.
        const backButton = document.querySelector("#goBack");
        
        if(backButton){
            backButton.addEventListener("click",() => this.#goBack() );
        };
    };

    #WriteHTML(html){
        this.#PARENT_DOM_ElEMENT.innerHTML = html;
    };

    #goBack(){
        window.history.back();
    };

    routes(){
        return ROUTES;
    };

    get view(){
        return this.#getHash().split("/")[1];
    };
};

export default Router;