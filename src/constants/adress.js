/* eslint-disable no-new */
// import { UrlPlataforma } from "./UrlPlataforma.json";
let UriProduccionSF = "https://visualsmic.site:8082/";  //Production SF
let UriDeveloperNY = "https://visualsmic.com:8082/";// WEB Developer NY 
let UriDeveloper    = "http://localhost:4000/";//Local Developer

export const adress = {
  UriBase: "https://localhost",
  UriApi:  process.env.NODE_ENV == "development" ? UriDeveloper : UriDeveloperNY,
  UriAdmon: "TransactionsAdmonSystem",
  UriUser: "TransactionsUser",
  UriPortafolio: "TransactionsPortafolio",
  UriIOT: "TransactionsIOT",
  UriAlmacen: "TransactionsAlmacen",
  UriCarcaring: "TransactionsCarcaring",
  UriContabilidad: "TransactionsContabilidad",
  UriGeoLocalizacion: "TransactionsGeoLocalizacion" ,
  UriProduccionSF : UriProduccionSF,
  UriDeveloperNY:UriDeveloperNY,
  PuertoServer: '',
  Version:'1.13' 
};
