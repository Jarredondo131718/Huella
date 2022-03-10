"use strict";
export const vsIOTMessagesApp = {
  deseaCancelarTransaccion: [
    "Desea Cancelar la Transacción ?",
    "Do you want to Cancel the Transaction?"
  ],
  ERRORESTRUCTURAPUC: ["Error en la Estructura del PUC", "PUC Structure Error"],
  DebeSeleccionarFilaRegistro: [
    "Debe Seleccionar Registro(Fila)",
    "Must Select Register (Row)"
  ],
  GETPDIS:["Obtener Puntos (PDIS)","Get Points(PDIS) "],
  BuscarCliente: [
    "Ingrese Patron de busqueda: Celular,Documento, o Nombre",
    "Enter Search Pattern: Cellular, Document, or Name"
  ],
  errorEnElServidor: [
    "Error en el Servidor, Verifique que el servidor esté corriendo...",
    "Error in the Server, Verify that the server is running ..."
  ],
  EXISTENREGISTROSPORCONFIRMAR: [
    "Existen Registros Por Confirmar ...",
    "There Are Records To Be Confirmed .."
  ],
  ERRORCAMPOREQUERIDO: ["Campo(s) requerido(s)...", "Required field(s)...."],
  RESTRICTEDEDITION: ["Edicion Restrigida", "Restricted Edition"],  
  ERRORDEBECOMPLETARCAMPOSREQUERIDOS: [
    "Error , Debe Completar Los Campos requeridos...",
    "Error, You Must Complete The Required Fields ..."
  ],
  visitarSitio: ["Visitar Sitio", "Visit website"],
  errorTransfer: [
    "El Destino Debe Contener almenos un Registro...",
    "The Destination Must Contain at least one Record ..."
  ],
  DeseaUtilizarInformacion: [
    "Desea Utilizar Esta Información",
    "Do you want to use this information"
  ],
  TransactionNoPresentoCambios: [
    "La Transacción No Presento Cambios..., Reintenta?",
    "The Transaction I Do Not Present Changes ... Retry?"
  ],
  EstadoNoValidoParaLaTransaccion: [
    "Error: El Estado Del Registro no es valido para esta Transacción...",
    "Error: The State of the Registry is not valid for this Transaction ..."
  ],
  ERRORESTADOPROCESO: [
    "Error En Los Datos Del Vehiculo...",
    "Vehicle Data Error ..."
  ],
  MSGTRANSACCIONPORMAYORVALOR: [
    "La Transacion Fue Por Mayor Valor",
    "The Transaction Was For Greater Value"
  ], 
  MSGDATOSNUEVATRANSACCION: [
    "Datos Para La Nueva Transacción",
    "Data For The New Transaction"
  ],   
  MSGTRANSACCIONPORMENORVALOR: [
    "La Transacion Fue Por Menor Valor",
    "The Transaction Was For Less Value"
  ],    
  ERRORDATAVEHICLE: [
    "Error: El Estado Del Registro( Proceso) no es valido para esta Transacción. Verifique los procesos...",
    "Error: The Registration Status (Process) is not valid for this Transaction. Verify the processes ..."
  ],
  ERRORENLASCOTIZACIONES: [
    "Error: El Valor De Las Cotizaciones Deben Ser Mayores O Iguales A Cero...",
    "Error: The Value Of The Quotes Must Be Greater Than Or Equal To Zero ..."
  ],
  FirstClientMessage: [
    "Este es el mensaje para enviar al cliente, si no lo desea enviar ; responda con el boton close(cerrar), de lo contrario en boton confirmar(No Olvide que debe terminar la transacción con los botones para tal fin).",
    "This is the message to send to the client, if you do not want to send it; respond with the close button, otherwise in the confirm button (Do not forget that you must finish the transaction with the buttons for this purpose)."
  ],
  ERRORREGISTROEXISTE: [
    "Error: El Registro  Existe",
    "Error: The Registry Exists:"
  ],
  ERRORREGISTRONOEXISTE: [
    "Error: El Registro NO Existe",
    "Error: The Registry NOT Exists:"
  ],
  FUERADEBALANCE: ["Fuera De Balance", "Out of balance"],
  ERRORNOEXISTEINFORMACION: [
    "Error: No Existe Informacion Para Realizar Esta Operacion",
    "There is no information to perform this operation"
  ],
  ERRORBARCODEESPECIFICACIONES: [
    "El Codigo No Cumple con las especificaciones",
    "Code Does Not Meet Specifications"
  ],
  ALERTBARCODEESPECIFICACIONES: [
    "Los Datos del Producto Difieren de los Datos del Producto(Marca,Modelo o tipo)",
    "Product Data Differs from Product Data (Brand, Model or Type)"
  ],
  ALERTBARNORECIBIOMERCANCIAS: [
    "No Recibio Mercancias",
    "Did not receive merchandise"
  ],
  DesHacerCambios: [
    "Desea DesaHacer los Cambios",
    "You want to change the changes"
  ],
  msgResultTransaction: ["Numero de Referencia ", "Reference Number"],
  IngresoDatosDireccion: [
    "Ingreso de Datos Para la Direccion  ",
    "Input Data to Address"
  ],
  AbortTransactionTime: [
    "La Transacción Se Cancela Por Limite Tiempo, Desea Iniciar Un Nuevo Tiempo de Espera ?",
    "Transaction Canceled By Time Limit, Do You Want To Start A New Timeout?"
  ],
  BorrarPadresConHijos: [
    "Debe Borrar Primeros los registros asociados",
    "You must Delete the associated records First"
  ],
  CommentaryTransactionDeleteRecord: [
    "La Transaccion Borrar registros, requiere entrar una breve descripción, indicando la razon de la operacion.",
    "The Transaction Delete records, requires entering a brief description, indicating the reason for the operation."
  ],
  REQUIERENIT: [
    "Requiere Nit O Documento De Identidad",
    "Requires Nit Or Identity Document"
  ],
  DOCUMENTOREFERENCIA: ["Ingrese Referencia ", "Enter Reference"],
  SEGUROREALIZAROPERACION: [
    "Seguro de Realizar Esta Operación",
    "Sure to Perform This Operation"
  ],
  SEGUROREALIZAROPERACIONSINCONTAILIZAR: [
    "Seguro de Realizar Esta Operación, Sin Contabilizar",
    "Safe to Perform This Operation, Unaccounted for"
  ],
  ERRORFECHASHOY: [
    "Esta Fecha Debe ser mayor a Hoy(Instante)",
    "This Date mayor a Today"
  ],
  ERRORGOOGLEMAXWAYPOINTS: [
    "Llego al Limite Maximo permitido por las poloticas de google",
    "I have Reached The Maximum Limit Allowed By Google Policies"
  ],  
  SOLUTIONERRORGOOGLEMAXWAYPOINTS: [
    "Divida Las Actividades En Grupos Máximo 25 Servicios",
    "Divide The Activities Into Groups Of Maximum 25 Services"
  ],   
  ErrorFechaBetween: ["Error en Fecha", "Error Date"],
  DuplicateActivity: [
    "No se permite programar una actividad en la misma fecha y hora",
    "It is not allowed to schedule an activity on the same date and time"
  ],
  CORREOENOVALIDO: [
    "Error En el Correo Eléctronico(Email)",
    "Error in the Electronic Mail (Email)"
  ],
  CORREOENOVALIDOEMAILCOPIA: [
    "Verifique la tabla de Email Copia, Corrija los errores o elimine estos registros",
    "Check the Email table Copy, Correct errors or delete these records"
  ],  
  ERRORSINDIRECCION: [
    "Error En La Dirección",
    "Address Error"
  ],
  BIENVENIDAAPP: ['Bienvenido a VS API', 'Welcome to VS API'],
  RETURNSTATE: ['Esta Transaccion no tiene forma de reversace, Esta Seguro de realizarla ?', 
                'This Transaction has no way of reversing it, you are sure to carry it out ?'
               ],  
  ERRORENVIOCORREO: [
    "Error al enviar correo(Servidor de correos)",
    "Error to send EMail (Server Email)"
  ],
  MESSAGEENVIADO: ["Correo Enviado Con Exito", "Mail Sent Successfully"],
  TRANSACCIONEXITOSA: ["Transacción Exitosa...", "Succesful transaction..."],
  TRANSACCIONNOEXITOSA: [
    " La Transacción No Se Realizó ...",
    "The Transaction Was Not Made ..."
  ],
  FALTANPERMISOS: [
    "NO Posse Permisos Suficientes",
    "NO Possess Enough Permits"
  ],
  ERRORTIPOPERSONANATURALES: [
    "Para Realizar Cambios En Persona JURIDICA, Dirijase al Modulo Personas JURIDICAS",
    "Para Realizar Cambios En Persona Naturales, Dirijase al Modulo Personas Naturales"
  ],
  ERRORTIPOPERSONAJURIDICA: [
    "Para Realizar Cambios En Persona Natural, Dirijase al Modulo Personas Naturales",
    "Para Realizar Cambios En Persona Naturales, Dirijase al Modulo Personas Naturales"
  ],
  TRANSACCIONNOSEPUEDEREALIZAR: [
    "La Transacción No Se Puede Realizar:",
    "The Transaction Can not Be Made: "
  ],
  ERRORANTICIPOSPENDIENTES :["Anticipos Pendientes","Outstanding Advances"],
  ERROREJECUTANDOTRANSACCION: [
    "Ocurrio Un Error ejecutando Transacción...",
    "An Error Running Transaction Happened ..."
  ],
  TIPOVHSMATRICUADOS: [
    "Tiene Vehiculos Registradas",
    "Have Registered Vehicles"
  ],
  LINEASMATRICUADAS: ["No Tiene Lineas Registradas", "No Registered Lines"],
  PRODUCTOSMATRICUADOS: [
    "No Tiene Productos Registrados",
    "No Registered Products"
  ],
  DESEAREALIZARTRANSACCIONPARCIAL: [
    "Desea Realizar la Transacción ?",
    "Do you want to make the transaction?"
  ],
  DESEAREEVIARFACTURA: [
    "Factura ya fue enviada, Desea Reenviarla ?",
    "Invoice has already been sent, Do you want to resend it?"
  ],
  VAENELPROCESO: [" Va en el Proceso", "It goes in the Process"],
  Proceso: ["Proceso", "Process"],
  ENVIARFACTURA: ["Enviar factura", "Send invoice"],
  ENVIARMENSAJECLIENTE: [
    "Enviar Mensaje",
    "Send Message"
  ],  
  NOENVIARMENSAJECLIENTE: [
    "No Enviar Mensaje",
    "Do Not Send"
  ],
  TOMENOTADELPASSWORD: ["Nuevo Password", "New password"],
  GUARDESUPASSWORD: [
    "Guarde tu contraseña en un lugar seguro",
    "Keep your password in a safe place"
  ],
  ERRORDATOSTABLA: [
    "Error En Los Registros De La Tabla",
    "Table Records Error"
  ],
  PASSWORDREQUERIDO: [
    "Password Requerido",
    "Password Required"
  ],
  FileDoesNotMeetSpecifications: [
    "El Archivo No Cumple las Especificaciones",
    "File Does Not Meet Specifications"
  ]
};
