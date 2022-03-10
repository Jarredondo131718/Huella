import { ref } from "vue";
import { useStore } from "vuex";

import GetDataServices from "../store/services/GetDataServices";
export default function() {
  const GetCuentaProducto = async (PParameter) => {
    store.dispatch("ActRecordCuentaProducto", null);
    let MParameter= {
      idUser: store.getters.GetUSER.intIdUsuario, //store.getters.GetUSER.
      intIdApp: store.getters.getFormulario.Parent,
      Transaction: `Tbl${PParameter.Formula}`,
      Formula: PParameter.Formula,
      LoadChildren:PParameter.LoadChildren,
      ExecuteQuery: "QRY",
      intCodigoSuca: PParameter.Oficina,
      intProducto: PParameter.Product,
      lngConsecutivo: PParameter.Consecutivo,
    };

    console.log("helper ",' Parameter ',MParameter)    
    let Record = await GetDataServices("Portafolio",MParameter);
    console.log("helper ",Record)
    return Record;
  };
  const GetCuentasProducto = async (Parameter) => {
    console.log("GetCuentasProducto ",Parameter)
    //Obtiente el Lst De la Tabla De Productos
    return await GetDataServices("ExecuteSPGeneric", Parameter);
  };

  const columnsTblProductos = ref([
    {
      title: "Documento",
      dataIndex: "Nit",
      width: "13%",      
    },
    {
      title: "Cuenta",
      dataIndex: "Cuenta",
      width: "15%",
    },
    {
      title: "Nombre",
      dataIndex: "Nombre",
      width: "20%",
    },
    {
      title: "Celular",
      dataIndex: "Celular",
    },
    {
      title: "Telefono",
      dataIndex: "Fijo",
    },

    {
      title: "Direccion",
      dataIndex: "DirPrincipal",
      width: "30%",
    },
    // {
    //   title: "Email",
    //   dataIndex: "Email",
    // },
    {
      title: "Relacion",
      dataIndex: "RelacionTipo",
    },
    {
      title: "Operación",
      // dataIndex: "lngNumId",
      // key: "lngNumId",
      slots: {
        customRender: "action",
      },
    },
  ]);
  const rowClassTblProductos = (record, index) => {
    switch (record.RelacionTipo) {
      case "Asociados":
        if (record.Genero == "Femenino") return "classFemeninoSocio";
        else return "classMasculinoSocio";
      case "Terceros":
        if (record.Genero == "Femenino") return "classFemeninoTercero";
        else return "classMasculinoTercero";
      default:
        if (record.Genero == "Femenino") return "classFemeninoMenores";
        else return "classMasculinoTercero";
        break;
    }
  };
  const store = useStore();

  return {
    GetCuentaProducto,
    GetCuentasProducto,
    columnsTblProductos,
    rowClassTblProductos,
  };
}
