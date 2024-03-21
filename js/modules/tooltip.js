// Se debe inicializar la información sobre los tooltips antes de poder utilizarla. Una forma 
// de hacer esto sería seleccionarlos por su data-bs-toggle atributo, esto permite aplicarle todas 
// las caracteristicas necesarias para esta funcionalidad a todos los tooltips que existan en el proyecto.
function TooltipGenerate(){
    const tooltipTriggerList = document.querySelectorAll('[data-bs-toggle="tooltip"]');
    const tooltipList        = [...tooltipTriggerList];

    tooltipList.map(tooltipTriggerEl =>{
        const element = new bootstrap.Tooltip(tooltipTriggerEl);
    });
};

export default TooltipGenerate;