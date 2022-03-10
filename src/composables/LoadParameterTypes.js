import { ref } from "vue";
import { useStore } from "vuex";

import GetDataServices from "../store/services/GetDataServices";
export default function () {
  const ValidarEmail = (PEmail) => {
    const   emailRE = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
    return emailRE.test(PEmail);
  }
  const GetParametrosVS = async(Parameter)=>{
    return await GetDataServices("ExecuteSPGeneric", {
          idUser: store.getters.GetUSER.intIdUsuario,//store.getters.GetUSER.
          intIdApp:store.getters.getFormulario.Parent,
          Formula: "LoadParametsTypesFormula",
          ExecuteQuery: "Lst",
          Parameter: { Formula: Parameter.Formula, Disable: Parameter.Disable, strSearchFor: Parameter.strSearchFor },
        })}

  const Estratos = ref([{label:'Uno',value:1},{label:'Dos',value:2},{label:'Tres',value:3},{label:'Cuatro',value:4},{label:'Cinco',value:5},{label:'Seis',value:6}]);
  const store = useStore();
  const ClearStore = () => {
    store.dispatch("ActFormulario", {
      Option: 0,
      Parent: 0,
      Label: "",
    });
    store.dispatch("GETRECORDTERCERO", null);
    store.dispatch("ActRecordCuentaProducto", null);    
    store.dispatch("ActDirection", null);
    store.state.blnVisibleTableProduct = false;
  };
  return { ValidarEmail,ClearStore,Estratos,GetParametrosVS };
}
