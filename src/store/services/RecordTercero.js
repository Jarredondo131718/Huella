import GetDataServices from "./GetDataServices";
const state = {
    RecordTercero: []
};

const mutations = {
    SAVERECORDTERCERO(state, value) {
    state.RecordTercero = value[0] || null},
};

const getters = {
    GetRecordTercero(state) {
        return state.RecordTercero;
    },

};
const actions = {
    GETRECORDTERCERO: async (context, value) => {
    
        if(value==null){
            state.RecordTercero =  []
            return;
        }
        context.commit("SAVERECORDTERCERO", await GetDataServices("ExecuteSPGeneric", {
            idUser: value.intIdUsuario || 0,
            intIdApp: value.idApp,
            Formula: "LoadTercerosActivos",
            ExecuteQuery: "QRY",
            idTercero: value.idTercero || -1,
            Document : value.Document || null
          }))
    }
};

export default {
    state,
    mutations,
    getters, actions
};
