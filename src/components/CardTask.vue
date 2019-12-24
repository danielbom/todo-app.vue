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
        :class="{ 'badge-danger': task.colaboratorId < 6 }"
      >
        <i class="far fa-user"></i>
        <strong class="pl-2">
          {{ task.colaboratorName }}
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
      <p class="font-weight-bold">{{ task.title }} - {{ task.clientName }}</p>
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
import EventBus from "@/event-bus";
import { database } from "../database";
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
    ref() {
      return database.ref("task").child(this.task[".key"]);
    },
    updateStatus(status) {
      this.ref().update({ status, doneTime: new Date() });
    },
    remove() {
      if (confirm("Deletar tarefas?")) {
        this.ref().remove();
        alert("Tarefa deletada!");
      }
    },
    edit() {
      EventBus.$emit("edit-task", {
        task: this.task
      });
    }
  }
};
</script>

<style></style>
