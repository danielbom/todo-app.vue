<template>
  <div id="app">
    <nav class="navbar navbar-expand-lg bg-dark mb-2">
      <button
        class="navbar-toggler"
        type="button"
        data-toggle="collapse"
        data-target="#navbarToggler"
        aria-controls="navbarToggler"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span class="text-white">
          <i class="fas fa-bars"></i>
        </span>
      </button>
      <a href="#" class="navbar-brand text-white">
        {{ title }}
      </a>

      <div class="collapse navbar-collapse" id="navbarToggler">
        <ul class="navbar-nav">
          <!-- Link to tasks -->
          <li class="nav-item">
            <router-link class="nav-link" to="/">
              <i class="far fa-check-circle"></i>
              <span class="ml-3">Tarefas</span>
            </router-link>
          </li>
          <!-- Link to clients -->
          <li class="nav-item">
            <router-link class="nav-link" to="/client">
              <i class="far fa-user"></i>
              <span class="ml-3">Clientes</span>
            </router-link>
          </li>
          <!-- Link to notes -->
          <li class="nav-item">
            <router-link class="nav-link" to="/note">
              <i class="far fa-sticky-note"></i>
              <span class="ml-3">Notas</span>
            </router-link>
          </li>
        </ul>
      </div>
    </nav>
    <!-- Content -->
    <div class="container-fluid">
      <router-view />
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: "Painel de controle"
    };
  },
  watch: {
    $route(to) {
      document.title = to.meta.title || "Painel de controle";
      this.title = to.meta.title;
    }
  }
};
</script>

<style lang="scss">
@import "./assets/scss/custom.scss";
@import "./assets/scss/variables.scss";
@import "bootstrap/scss/bootstrap";
@import "./assets/scss/bootswatch.scss";
</style>
