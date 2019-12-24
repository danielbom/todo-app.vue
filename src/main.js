import Vue from "vue";
import App from "./App.vue";

import router from "./router";
import store from "./store";

// Extern libraries
import "@fortawesome/fontawesome-free/js/all";
import "jquery/dist/jquery";
import "popper.js/dist/umd/popper";
import "bootstrap/dist/js/bootstrap";
import moment from "moment";
moment.locale("pt-br");

Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");
