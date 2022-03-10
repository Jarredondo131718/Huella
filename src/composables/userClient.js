import GetDataServices from "../store/services/GetDataServices";

export default function() {
  const GetClient = async(Parameter)=>{
    console.log("parameter en functiongeneral", Parameter);
    return await GetDataServices("ExecuteSPGeneric", {
          idUser: Parameter.intIdUsuario || 0,
          intIdApp: Parameter.idApp,
          Formula: "LoadTercerosActivos",
          ExecuteQuery: "QRY",
          idTercero: Parameter.idTercero || -1,
          Document: Parameter.Document || null,
        })
  }

  return { GetClient };
}
