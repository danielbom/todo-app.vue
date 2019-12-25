import Vue from "vue";
import Vuex from "vuex";

// models
import clients from "./models/clients";
import colaborators from "./models/colaborators";
import tasks from "./models/tasks";

import createLogger from "./logger.js";

Vue.use(Vuex);

const debug = process.env.NODE_ENV !== "production";

export default new Vuex.Store({
  modules: {
    clients,
    colaborators,
    tasks
  },
  strict: debug,
  plugins: debug ? [createLogger()] : []
});
