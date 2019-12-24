import Vue from "vue";
import Vuex from "vuex";

// documents
import clients from "./clients";
import colaborators from "./colaborators";
import tasks from "./tasks";

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
