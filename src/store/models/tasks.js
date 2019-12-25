import { database } from "../../database";

/**
 * * Model task
 *
 * @attr {Number} id
 * @attr {String} title
 * @attr {String} detail
 * @attr {Enum} importance: low | normal | high | critical
 * @attr {Enum} importance: todo | doing | done

 * @attr {Date as Number} createdAt
 * @attr {Date as Number} time

 * @attr {ModelClient} client
 * @attr {ModelColaborator} colaborator
 *
 * * TODO: Think about change status to boolean
 *
 */

const BASE_REF = "tasks";

const state = {
  all: [],
  filtered: [],
  currentId: 1
};

const getters = {};

const actions = {
  getAll({ commit }) {
    database
      .ref(BASE_REF)
      .once("value")
      .then(snapshot => {
        const data = (snapshot.val() || []).filter(e => !!e);

        if (data.length > 0) {
          let maxId = data.reduce((id, e) => (e.id > id ? e.id : id), 0);
          commit("setCurrentId", Number(maxId) + 1);
        }

        commit("setTasks", data);
      });
  },

  add({ commit }, task) {
    task = { ...task, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(task.id)
      .set(task)
      .then(() => {
        commit("addTask", task);
        commit("setCurrentId", task.id + 1);
      });
  },

  setFiltered({ commit }, tasks) {
    commit("setFiltered", tasks);
  }
};

const mutations = {
  setTasks(state, tasks) {
    state.all = tasks;
    state.filtered = tasks;
  },

  addTask(state, task) {
    state.all.push(task);
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
