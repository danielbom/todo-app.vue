<template>
  <div class="card">
    <!-- Card filters header -->
    <div class="card-header" v-on:click="showFilter = !showFilter">
      APLICAR FILTROS
    </div>
    <!-- Card filters body -->
    <div class="card-body" v-show="showFilter">
      <form>
        <!-- Card filters group task -->
        <div class="form-group">
          <label>Tarefa</label>
          <input
            type="text"
            class="form-control"
            v-model="filters.title"
            placeholder="Título"
          />
        </div>
        <!-- Card filters group task -->
        <div class="form-group">
          <label>Colaborador</label>
          <select class="form-control" v-model="filters.colaborator">
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
          <select class="form-control" v-model="filters.client">
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
    }
  }
};
</script>

<style></style>
