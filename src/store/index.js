import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
    state: {
        profileList: []
    },
    mutations: {
        loadProfiles(state, p) {
            state.profileList = p;
        },
        markOfFavorite(state, object) {
            const index = state.profileList.findIndex(x => {
                return x === object;
            });
            let profile = state.profileList[index];
            Object.create(profile).favorite = !object.favorite;
            state.profileList[index] = profile;
        }
    },
    actions: {},
    modules: {}
})
