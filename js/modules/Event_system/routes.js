// Rutas de los ficheros que contienen los eventos de cada vista.
const ROUTES = Object.freeze(
    {
        inicio          : "./EventFiles/home.js",
        clientes        : "./EventFiles/clients.js",
        registroIngresos: "./EventFiles/incomeRecord.js",
        RegistroDeGastos: "./EventFiles/expenseRecord.js",
        recordatorios   : "./EventFiles/reminder.js",
        miCuenta        : "./EventFiles/myAccount.js",
        configuracion   : "./EventFiles/configuration.js",
        error           : "./EventFiles/error.js"
    }
);

export default ROUTES;