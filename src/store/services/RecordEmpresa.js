import GetDataServices from "./GetDataServices";
const state = {
  RecordEmpresa: {},
  RecordCentroCostosEmpresa: [],
};

const mutations = {
  SaveRecordEmpresa(state, value) {
    state.RecordEmpresa = value.length > 0 ? value[0] : null;
  },

  SaveRecordEmpresaCentroCostos(state, value) {
    state.RecordCentroCostosEmpresa = value.length > 0 ? value : null;
  },
};

const getters = {
  GetRecordEmpresa(state) {
    return state.RecordEmpresa;
  },
  GetRecordEmpresaCentroCostos(state) {
    return state.RecordCentroCostosEmpresa;
  },
};
const actions = {
  ActSaveEmpresa: async (context, value) => {
    if (value == null) {
      state.RecordEmpresa = {};
      return;
    }

    let Result = await GetDataServices("ExecuteSPGeneric", {
      idUser: value.intIdUsuario || 0,
      intIdApp: value.idApp,
      Formula: "LoadEmpresa",
      ExecuteQuery: "QRY",
      Parameter: {
        IdEmpresa: value.lngNumId || -1,
        strNitEmp: value.strNitEmp || null,
        IncluyeCentroCostos: value.IncluyeCentroCostos,
      },
    });
    context.commit("SaveRecordEmpresa", Result);
    if (value.IncluyeCentroCostos) {
      let Result = await GetDataServices("ExecuteSPGeneric", {
        idUser: value.intIdUsuario || 0,
        intIdApp: value.idApp,
        Formula: "LoadEmpresaCentroCosto",
        ExecuteQuery: "LST",
        Parameter: {
          IdEmpresa: value.lngNumId || -1,
          strNitEmp: value.strNitEmp || null,
          IncluyeCentroCostos: value.IncluyeCentroCostos,
        },
      });
      context.commit("SaveRecordEmpresaCentroCostos", Result);
    }
  },
};

export default {
  state,
  mutations,
  getters,
  actions,
};
