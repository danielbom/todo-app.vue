import { database } from "../database";

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
        commit(
          "setTasks",
          (snapshot.val() || []).filter(e => !!e)
        );
      });
  },

  add({ commit }, task) {
    task = { ...task, createdAt: Date.now() }; // timestamped

    database
      .ref(BASE_REF)
      .child(task.taskId)
      .set(task)
      .then(() => {
        commit("addTask", task);
        commit("setCurrentId", task.taskId + 1);
      });
  },

  setFiltered({ commit }, tasks) {
    commit("setFiltered", tasks);
  }
};

const mutations = {
  setFiltered(state, tasks) {
    state.filtered = tasks;
  },

  setTasks(state, tasks) {
    state.all = tasks;
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
