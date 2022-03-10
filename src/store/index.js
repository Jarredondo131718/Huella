import { createStore } from "vuex";
import { reactive } from "vue";
import VSServices from "./services/services.js";
import DataCia from "./services/DataCia";
import DataUser from "./services/DataUser";
import GetTercero from "./services/RecordTercero";
import GetEmpresa from "./services/RecordEmpresa";
import GetDataServices from "./services/GetDataServices";
import Services from "./services/services";
export default createStore({

  modules: {
    GetEmpresa,
    GetTercero,
    DataCia,
    DataUser,
    GetDataServices,
  },
  state: {
    Services,
    Formulario: { Option: 0, Parent: 0, Label: "" },
    optionAplications: [],
    Oficinas:[],
    CngProductos:[],    
    collapsed: true,
    RecordCuentaProducto:{lngNumId:-1},
    blnVisibleTableProduct:false,
    Direccion: reactive({
      Destino: "NoOk",
      IncrementChange:0
    }),
    Region: reactive({
      Destino: "NoOk",
      NombrePais:'Colombia'
    }),   
  },

  mutations: {
    setFormulario(state, value) {
      state.Formulario = value;
      // console.log("asi quedo formulario obj ",  state.Formulario)
    },
    setDirection(state, value) {
      if(value!=null){
        state.Direccion = value;
        state.Direccion.IncrementChange ++ || 0;
        return
      }
      state.Direccion= {
        Destino: "NoOk",
      }

    },
    setRegion(state, value) {
      if(value!=null){
        state.Region = value;
        return
      }
      state.Region= {
        Destino: "NoOk1",
      }
    },
    setRecordCuentaProducto(state, value) {
      if(value==null){
        state.RecordCuentaProducto={lngNumId:-1};
        return;
      }   
      state.RecordCuentaProducto = value;
      state.RecordCuentaProducto.lngNumId  = value.DatosBasicos[0].lngNumId
    },    
    setCollapsed(state, value) {
      state.collapsed = value;
    },
  },
  actions: {
    ActDirection({ commit, state }, value) {
      
      commit("setDirection", value);
    },
    ActRegion({ commit, state }, value) {      
      commit("setRegion", value);
    }, 
    ActRecordCuentaProducto({ commit, state }, value) {      
      commit("setRecordCuentaProducto", value);
    },        
    ActFormulario({ commit, state }, value) {
      commit("setFormulario", value);
    },
    ActCollapsed({ commit, state }, value) {
      commit("setCollapsed", value);
    },
  },
  getters: {
    getFormulario(state) {
      return state.Formulario;
    },
    getDirection(state) {
      return state.Direccion;
    },
    getRegion(state) {
      return state.Region;
    },
    getRecordCuentaProducto(state) {
      return state.RecordCuentaProducto;
  },        
  },
});
