import { database } from "../database";

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
        let colaborators = (snapshot.val() || []).filter(e => !!e);

        if (colaborators.length > 0) {
          let maxId = colaborators.reduce(
            (id, c) => (c.clientId > id ? c.clientId : id),
            0
          );
          commit("setCurrentId", Number(maxId) + 1);
        }

        commit("setColaborators", colaborators);
      });
  },

  add({ commit }, colaborator) {
    colaborator = { ...colaborator, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(colaborator.colaboratorId)
      .set(colaborator)
      .then(() => {
        commit("addClient", colaborator);
        commit("setCurrentId", colaborator.colaboratorId + 1);
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
