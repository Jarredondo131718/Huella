// import { stat } from "fs";

const state = {
    DataCia: {id: 0,strSigla:'' }
};

const mutations = {
    SAVECIA(state, value) {
    state.DataCia = value},
};

const getters = {
    GettersCIA(state) {
        return state.DataCia;
    },

};
const actions = {
    ActSaveCia: (context, value) => {
        context.commit("SAVECIA", value)
    }
};

export default {
    state,
    mutations,
    getters, actions
};
