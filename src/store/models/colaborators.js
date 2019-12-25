import { database } from "../../database";

/**
 * * Model colaborator
 *
 * @attr {Number} id
 * @attr {String} name
 * @attr {Enum} status: active | inactive
 *
 * * TODO: Think about change status to boolean
 *
 */

const BASE_REF = "colaborators";

const state = {
  all: [],
  currentId: 1
};

const getters = {};

const actions = {
  getAll({ commit }) {
    database
      .ref(BASE_REF)
      .once("value")
      .then(snapshot => {
        let data = (snapshot.val() || []).filter(e => !!e);

        if (data.length > 0) {
          let maxId = data.reduce((id, e) => (e.id > id ? e.id : id), 0);
          commit("setCurrentId", Number(maxId) + 1);
        }

        commit("setColaborators", data);
      });
  },

  add({ commit }, colaborator) {
    colaborator = { ...colaborator, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(colaborator.id)
      .set(colaborator)
      .then(() => {
        commit("addClient", colaborator);
        commit("setCurrentId", colaborator.id + 1);
      });
  }
};

const mutations = {
  setColaborators(state, colaborators) {
    state.all = colaborators;
  },

  addColaborator(state, colaborator) {
    state.all.push(colaborator);
  },

  setCurrentId(state, id) {
    state.currentId = id;
  }
};

export default {
  namespaced: true,
  state,
  getters,
  actions,
  mutations
};
