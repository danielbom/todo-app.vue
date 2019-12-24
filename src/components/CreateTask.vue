<template>
  <div class="card">
    <div class="card-header" v-on:click="showCreator = !showCreator">
      CRIAR TAREFA
    </div>
    <div class="card-body" v-show="showCreator">
      <!-- Form group task title -->
      <div class="form-group m-8">
        <label class="mb-0">
          O que é preciso fazer?
        </label>
        <input type="text" class="form-control" v-model="task.title" />
      </div>
      <!-- Form group task detail -->
      <div class="form-group m-0">
        <label class="mb-0">Detalhes</label>
        <textarea
          rows="2"
          class="form-control"
          v-model="task.detail"
        ></textarea>
      </div>
      <!-- Form group task client -->
      <div class="form-group m-o">
        <label class="mb-0">Para quem?</label>
        <select class="form-control" m-model="task.client">
          <option
            v-for="client in clients"
            :value="client"
            :key="client['.key']"
          >
            {{ client.name }}
          </option>
        </select>
      </div>
      <!-- Form group task colaborator -->
      <div class="form-group m-0">
        <label class="mb-0">Quem vai fazer?</label>
        <select class="form-control" v-model="task.colaborator">
          <option
            v-for="colaborator in colaborators"
            :value="colaborator"
            :key="colaborator['.key']"
          >
            {{ colaborator.name }}
          </option>
        </select>
      </div>
      <!-- Form group task importance -->
      <div class="form-group">
        <label class="mb-0">Qual a prioridade?</label>
        <select class="form-control" v-model="task.importance">
          <option selected value="1">Baixa prioridade</option>
          <option value="2">Neutra</option>
          <option value="3">Alta prioridade</option>
          <option value="4">Crítica</option>
        </select>
      </div>
      <!-- Form group task time -->
      <div class="form-group">
        <label class="mb-0">Para quando?</label>
        <input type="date" class="form-control" v-model="task.time" />
      </div>
      <!-- Form group task create button -->
      <button
        class="btn btn-primary btn-block"
        type="button"
        v-on:click="create()"
      >
        CRIAR TAREFA
      </button>
      <!-- Form group task edit button -->
      <button
        class="btn btn-primary btn-block"
        type="button"
        v-on:click="edit()"
      >
        EDITAR TAREFA
      </button>
    </div>
  </div>
</template>

<script>
export default {
  props: {
    clients: {
      required: true
    },
    colaborators: {
      required: true
    }
  },

  data() {
    return {
      showCreator: false,

      task: {
        title: "",
        detail: "",
        client: {},
        colaborator: {},
        importance: 1,
        time: new Date()
      }
    }
  }
};
</script>

<style></style>
