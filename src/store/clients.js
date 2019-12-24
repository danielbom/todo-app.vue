import { database } from "../database";

/**
 * * Model client
 *
 * @attr {Number} id
 * @attr {String} name
 * @attr {Enum} scheme: initial | intermediary | complete
 * @attr {Enum} status: active | inactive
 *
 * * TODO: Think about change status to boolean
 *
 */

const BASE_REF = "clients";

const state = {
  all: [],
  currentId: 6
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
          let maxId = data.reduce((id, c) => (c.id > id ? c.id : id), 0);
          commit("setCurrentId", Number(maxId) + 1);
        }

        commit("setClients", data);
      });
  },

  add({ commit }, client) {
    client = { ...client, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(client.clientId)
      .set(client)
      .then(() => {
        commit("addClient", client);
        commit("setCurrentId", client.clientId + 1);
      });
  }
};

const mutations = {
  setClients(state, clients) {
    state.all = clients;
  },

  addClient(state, client) {
    state.all.push(client);
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
