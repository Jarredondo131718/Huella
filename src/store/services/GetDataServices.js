import HTTP from "../services/DataService.js"; 
import { adress } from "@/constants";
import Swal from "sweetalert2";
const FURL =  (PURL,Parameter) => {
    let URL =adress.UriApi+PURL;

    URL +="/"

    return URL
}
const GetDataServices = async (Url, Parameter, EmitMessage) => {
    Parameter.Token = 'jose';
  
  const data = await HTTP.postService(FURL(Url), Parameter)
    .then((response) => {
      // console.log("respondio 1 ",response, ' mess ',response.data.message,
      // ' status boo ',!response.data.status,
      // ' IF ',(response.data.data == null && !response.data.status))
      if( response.status !=200 ){
        // console.log("respondio 1.1 ",response)
        Swal.fire({
          icon: "error",
          title: "Error En Services DB",
          text: response.data.message,
        });
        return []        
      }
      // console.log("respondio 1.1 ",response)
      // console.log("respondio 2 ",  response.data.data )
      // console.log("respondio 3 ", response.data)
      // console.log("respondio 3 ", response.data.data ? true: false)      
      return response.data;
    })
    .catch((e) => {
      console.log("respondio 1.1 catch",e)
      Swal.fire({
        icon: "error",
        title: "Error En Services DB",
        text: e,
      });      
      console.log(
        "este errror leyendo DB ",
        e,
        " URL ",
        Url,
        " Parameter ",
        Parameter
      );
      return [];
    });
  return data.data || [];

};




export default GetDataServices;