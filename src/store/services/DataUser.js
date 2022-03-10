const state = {
    DataUser: {lngNumIdTerc: 0 }

};

const mutations = {
    SAVEUSER(state, value) {
        state.DataUser = value
        
    }
};

const getters = {
    GetUSER(state) {
        return state.DataUser;
    },

};
const actions = {
    ActSaveUser: (context, value) => {
        context.commit("SAVEUSER", value)
    }
};

export default {
    state,
    mutations,
    getters, actions
};
