<template>
  <div class="card">
    <div class="card-header btn" v-on:click="showCreator = !showCreator">
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
        <select class="form-control" v-model="task.client">
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
            v-for="(colaborator, index) in colaborators"
            :value="colaborator"
            :key="`colaborator-${index}`"
          >
            {{ colaborator.name }}
          </option>
        </select>
      </div>
      <!-- Form group task importance -->
      <div class="form-group">
        <label class="mb-0">Qual a prioridade?</label>
        <select class="form-control" v-model="task.importance">
          <option selected value="low">Baixa prioridade</option>
          <option value="normal">Normal</option>
          <option value="high">Alta prioridade</option>
          <option value="critical">Crítica</option>
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
      <!--
      <button
        class="btn btn-primary btn-block"
        type="button"
        v-on:click="edit()"
      >
        EDITAR TAREFA
      </button>
      -->
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      showCreator: false,

      task: {
        title: "",
        detail: "",
        client: {},
        colaborator: {},
        importance: 1,
        time: ""
      }
    };
  },

  methods: {
    create() {
      this.$store.dispatch("tasks/add", {
        ...this.task,
        id: this.taskId,
        time: new Date(this.task.time).getTime(),
        status: "todo"
      });
      this.clear();
    },

    clear() {
      this.task = {
        title: "",
        detail: "",
        client: {},
        colaborator: {},
        importance: 1,
        createdAt: new Date(),
        time: new Date()
      };
    }
  },

  computed: mapState({
    clients: state => state.clients.all,
    colaborators: state => state.colaborators.all,
    taskId: state => state.tasks.currentId
  })
};
</script>

<style></style>
