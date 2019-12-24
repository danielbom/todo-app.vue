<template>
  <div class="card">
    <!-- Card filters header -->
    <div class="card-header btn" v-on:click="showFilter = !showFilter">
      APLICAR FILTROS
    </div>
    <!-- Card filters body -->
    <div class="card-body" v-show="showFilter">
      <form v-on:submit="e => e.preventDefault()">
        <!-- Card filters group task -->
        <div class="form-group">
          <label>Tarefa</label>
          <input
            type="text"
            class="form-control"
            v-model="filters.title"
            placeholder="Título"
            v-on:change="applyFilter()"
          />
        </div>
        <!-- Card filters group task -->
        <div class="form-group">
          <label>Colaborador</label>
          <select
            class="form-control"
            v-model="filters.colaborator"
            v-on:change="applyFilter()"
          >
            <option value="">Todos</option>
            <option
              v-for="c in colaborators"
              :value="c.colaboratorId"
              :key="c.key"
            >
              {{ c.nome }}
            </option>
          </select>
        </div>
        <!-- Card filters group client -->
        <div class="form-group">
          <label>Cliente</label>
          <select
            class="form-control"
            v-model="filters.client"
            v-on:change="applyFilter()"
          >
            <option value="">Todos</option>
            <option
              v-for="c in clients"
              v-show="c.status === 'ativo'"
              :value="c.clientId"
              :key="c['.key']"
            >
              {{ c.nome }}
            </option>
          </select>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showFilter: false,

      filters: {
        title: "",
        colaborator: "",
        client: "",
        by: {
          colaborator: task => task.colaboratorId === this.filters.client,
          client: task => task.clientId === this.filters.client,
          title: task =>
            task.title.toLowerCase().includes(this.filters.title.toLowerCase())
        }
      }
    };
  },

  computed: mapState({
    allTasks: state => state.tasks.all,
    colaborators: state => state.colaborators.all,
    clients: state => state.clients.all
  }),

  methods: {
    applyFilter() {
      let tasks = [...this.allTasks];

      if (this.filters.title.length > 0) {
        tasks = tasks.filter(this.filters.by.title);
      }
      if (this.filters.client.length > 0) {
        tasks = tasks.filter(this.filters.by.client);
      }
      if (this.filters.colaborator.length > 0) {
        tasks = tasks.filter(this.filters.by.colaborator);
      }

      tasks
        .sort((t1, t2) => t1.time > t2.time) // asc
        .sort((t1, t2) => t1.importance < t2.importance); // desc

      this.$store.dispatch("tasks/setFiltered", tasks);
    }
  }
};
</script>

<style></style>
