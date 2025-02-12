# Planificación del Proyecto Dashboard SPA

## 1. Definición del Ámbito del Proyecto
El proyecto busca desarrollar un **dashboard SPA** para gestionar la información financiera basíca del negocio(**Servicios de mensajería**) y la automatización de tareas repetitivas como la generación de facturas en formato pdf, reportes financieros,administrar información de clientes. A su vez proporcionar una base de datos que  facilite guardar o acceder a información de un período en especifico.

### Problemas a resolver :
1. Mala gestión de la contabilidad básica (ingresos, gastos, deudas, ganancias).

2. Dificultad para obtener estados financieros por periodos de trabajo (quincena/mensual).

3. Proceso manual y tedioso de creación o gestión de facturas en Excel.

4. Falta de una base de datos dinámica para guardar información de clientes,facturas y reportes financieros.

5. Manipulación complicada de Excel en dispositivos móviles.

6. Dificultad para generar informes anúales para el pago de impuestos.

## 2. Requerimientos

- Automatizar la gestión contable (ingresos, gastos, deudas, ganancias, fondo de ahorros).

- Facilitar la administración y generación de facturas en formato PDF.

- Ofrecer reportes financieros por quincena, mes y año.

- Centralizar la base de datos de clientes,facturas y periodos de operación.

- Hacer accesible la información desde cualquier dispositivo.

- Construir un historial que me permita acceder a períodos de operaciones pasados y obtener toda la información relacionada a este.

- Implementar roles de usuario con permisos diferenciados.

    - **Administrador:** Acceso total para gestionar la información financiera y manipular datos.

    - **Contador:** Acceso de solo lectura para obtener la información contable necesaria.

## 3. Tecnologías Seleccionadas

### **Frontend**
- Html5
- Bootstrap.
- Javascript.

### **Backend**
- Firebase / Supabase.

### **Base de Datos**
- Firebase / Supabase.

### **Generación de Facturas PDF**
- (**No definido**)

## 4. Módulos Principales

### **Módulo de Finanzas**
- Registro de ingresos y gastos.
- Control de deudas y ganancias.
- Generación de reportes financieros.

### **Módulo de Facturación**
- Creación de facturas en PDF.
- Envio de facturas a clientes.
- Historial de facturación.

### **Módulo de Clientes**
- Base de datos de clientes.
- Registro y actualización de datos.
- Consultas y filtros avanzados.

### **Módulo de Reportes**
- Reportes financieros por periodos definidos.
- Exportación de informes en formatos PDF o CSV.

### **Módulo de Usuarios y Permisos**
- Perfiles de usuario (Administrador / Contador).
- Control de acceso a información sensible.

### **Módulo de Configuración**
- Personalización de datos de empresa y facturación.
- Opciones generales del sistema.

## 5. Arquitectura del Sistema

![Arquitectura del proyecto](./architecture.png?raw=true)

## 6. Planificación del Desarrollo

### **Fase 1: Planificación y diseño**
- Definir en detalle cada módulo.
- Crear mockups de la interfaz.
- Elegir tecnologías y estructura del código.

### **Fase 2: Implementación del Frontend**
- Implementación del router.
- Creación de las vistas principales (Dashboard, Clientes, Facturación).
- Implementación del sistema de eventos.
- Implementación del estado global.
- Desarrollar la conexión reactiva entre los componenete de la UI y el estado global.

### **Fase 3: Implementación de la Lógica de Negocio**

**No definido**

### **Fase 4: Integración de Base de Datos**

**No definido**

### **Fase 5: Seguridad y Control de Accesos**
- Implementación de roles de usuario (Administrador vs. Contador).
- Restricción de acceso a datos sensibles.

### **Fase 6: Pruebas y Optimización**
- Pruebas de usabilidad.
- Optimización de rendimiento.
- Corrección de errores.

### **Fase 7: Despliegue y Mantenimiento**

**No definido**


