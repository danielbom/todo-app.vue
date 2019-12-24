<template>
  <div class="card" :key="task['.key']">
    <!-- Header card -->
    <div class="card-header d-flex justify-content-between">
      <!-- Importance -->
      <span class="badge" :class="CLS_IMPORTANCE[task.importance]">
        <i class="far fa-flag"></i> {{ IMPORTANCE[task.importance] }}
      </span>
      <!-- Colaborator -->
      <span
        class="badge text-uppercase"
        :class="{ 'badge-danger': task.colaborator.id < 6 }"
      >
        <i class="far fa-user"></i>
        <strong class="pl-2">
          {{ task.colaborator.name }}
        </strong>
      </span>
      <!-- Time -->
      <span class="badge badge-dark" v-show="status !== 'done'">
        <i class="far fa-calendar-alt"></i>
        <strong class="pl-2">
          {{ formatDate(task.time) }}
        </strong>
      </span>
    </div>
    <!-- Body card -->
    <div class="card-body" v-on:click="showTask = !showTask">
      <!-- Title -->
      <p class="font-weight-bold">{{ task.title }} - {{ task.client.name }}</p>
      <!-- Detail -->
      <p
        class="card-text"
        :class="{ 'text-truncate': !showTask }"
        v-show="showTask"
      >
        {{ task.detail }}
      </p>
    </div>
    <!-- Footer card -->
    <div class="card-footer d-flex justify-content-between">
      <!-- Group buttons of control status task -->
      <div class="btn-group-sm btn-group">
        <button class="btn btn-outline" v-on:click="updateStatus('todo')">
          <i class="far fa-clock"></i>
        </button>
        <button class="btn btn-outline" v-on:click="updateStatus('doing')">
          <i class="far fa-play-circle"></i>
        </button>
        <button class="btn btn-outline" v-on:click="updateStatus('done')">
          <i class="far fa-check-circle"></i>
        </button>
      </div>
      <div class="btn-group-sm btn-group">
        <button class="btn btn-outline" v-on:click="edit()">
          editar
        </button>
        <button class="btn btn-outline" v-on:click="remove()">
          deletar
        </button>
      </div>
    </div>
  </div>
</template>

<script>
import moment from "moment";
moment.locale("pt-br");

export default {
  data() {
    return {
      status: "",
      showTask: false,

      IMPORTANCE: ["", "BAIXA", "NEUTRA", "ALTA", "CRÍTICA"],
      CLS_IMPORTANCE: [
        "",
        "badge-primary",
        "badge-success",
        "badge-warning",
        "badge-danger"
      ]
    };
  },

  props: {
    task: {
      required: true
    }
  },

  methods: {
    formatDate(date) {
      return moment(date).format("D [de] MMM");
    },
    // Update task
    updateStatus(status) {
      status;
    },
    remove() {
      if (confirm("Deletar tarefas?")) {
        alert("Tarefa deletada!");
      }
    },
    edit() {
    }
  }
};
</script>

<style></style>
