// Contiene todas las rutas de vistas de la barra de navegacion izquierdad.
const ROUTE = Object.freeze(
    {
        inicio          : "../../views/home.html",
        clientes        : "../../views/clients.html",
        registroIngresos: "../../views/incomeRecord.html",
        RegistroDeGastos: "../../views/expenseRecord.html",
        recordatorios   : "../../views/reminder.html",
        impuestos       : "../../views/taxation.html",
        seguroVehicular : "../../views/vehicleInsurance.html",
        placaCirculacion: "../../views/circulationPlate.html",
        miCuenta        : "../../views/myAccount.html",
        configuracion   : "../../views/configuration.html",
        error           : "../../views/error.html"
    }
);

export default ROUTE;