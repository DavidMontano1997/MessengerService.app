// Se debe inicializar la información sobre los tooltips antes de poder utilizarla. Una forma 
// de hacer esto sería seleccionarlos por su data-bs-toggle atributo, esto permite aplicarle todas 
// las caracteristicas necesarias para esta funcionalidad a todos los tooltips que existan en el proyecto.
function TooltipGenerate(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');

    // No hay tooltips retorne.
    if(tooltipTriggerList.length === 0) return

    // En caso de que haya mas 1 elemento se procede a iterar.
    if(tooltipTriggerList.length > 1) {
        const tooltipList = [...tooltipTriggerList];    
        tooltipList.forEach(tooltipTriggerEl => new bootstrap.Tooltip(tooltipTriggerEl));
    };

    // En caso de que solo exista 1 elemento.
    new bootstrap.Tooltip(tooltipTriggerList.item(0));  
};

export default TooltipGenerate;