import ROUTES from "./routes.js"; // objecto con las rutas.

const router = (function (){
    const _PARENT_DOM_ElEMENT = document.querySelector("#sectionMain");
    const _URL              = window.location;

    function _getHash(){
        return _URL.hash; 
    };
    
    function _getNameSection(HASH){
        // Extraemos la información que hay después del #, ya que esta nos 
        // informa la sección a la que el usuario esta tratando de acceder.
        console.log(HASH.split("/"));
        return HASH.split("/")[1];
    };
    
    function _getRoute(view){
        if(!view){
            return `${ROUTES.inicio}`; // En caso de que no exista un hash se cargara la vista home. La cual sera la vista por default.
        } else if(view && view in ROUTES){
            return `${ROUTES[view]}`;  // Extraemos la ruta de la vista solicitada por el usuario.
        } else { 
            // Pagina no existente "Error 404".
            const info = {
                status    : "404",
                statusText: "Pagina no encontrada, estas tratando de acceder a una ruta que desconocemos..."
            };

            _PrintError(info); // Mostramos un error en la pantalla.
            return null;
        };
    };

    async function _Request(ROUTE){
        let response;

        try {
            const requestAjax  = await fetch(ROUTE);
            const { ok, statusText, status } = requestAjax;

            if(!ok){ // Peticion fallida.
                const info = {
                    status,
                    statusText
                };

                _PrintError(info); // // Mostramos un error en la pantalla.
                return response = ok;
            }

            response = await requestAjax.text(); // retorna el component html a imprimir.
        } catch (error) {
            console.error(error);
        };

        return response;
    };

    function _PrintError(info){
        const { status, statusText } = info;
        const container = document.createElement("div");

        container.className = "container d-flex flex-column justify-content-center align-items-center text-center";
        container.style.height = "100%";

        container.innerHTML = `
            <h2>ERROR ${status}</h2>
            <p>${statusText}</p>
            <button>Recargar pagina</button>
        `;
        
        _PARENT_DOM_ElEMENT.innerHTML = "";
        _PARENT_DOM_ElEMENT.appendChild(container);
        throw new Error(`${status} ${statusText}`);
    };

    function _WriteHTML(html){
        _PARENT_DOM_ElEMENT.innerHTML = html;
    };

    return class Router {
        async startRouter(){
            const HASH       = _getHash(); // obtiene el hash de la url.
            const SECTION    = _getNameSection(HASH);  // obtiene el nombre de la pagina.
            const ROUTE       = _getRoute(SECTION); // obtiene la ruta de la pagina.

            if(ROUTE) {
                const RESPONSE    = await _Request(ROUTE); // obtiene componente html de la pagina

                if(RESPONSE){
                    _WriteHTML(RESPONSE); // implementamos al DOM.
                };
            };
        };

        // retorna el las rutas del proyecto.
        GetRoutes(){
            return ROUTES;
        };

        GetHash(){
            return _getHash().split("/")[1];
        };
    };
})();

export default router;