import { database } from "../../database";

/**
 * * Model note
 *
 * @attr {Number} id
 * @attr {String} content
 * @attr {Date as Number} createdAt
 *
 */

const BASE_REF = "notes";

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
          let maxId = data.reduce((id, c) => (c.id > id ? c.id : id), 0);
          commit("setCurrentId", Number(maxId) + 1);
        }

        commit("setNotes", data);
      });
  },

  add({ commit }, note) {
    note = { ...note, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(note.id)
      .set(note)
      .then(() => {
        commit("addNote", note);
        commit("setCurrentId", note.id + 1);
      });
  }
};

const mutations = {
  setNotes(state, notes) {
    state.all = notes;
  },

  addNote(state, note) {
    state.all.push(note);
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
