<template>
  <div class="row">
    <!-- First col: Filters -->
    <div class="col-lg-3 col-md-6 col-sm-12 p-1 pt-2">
      <CreateTask :clients="clients" :colaborators="colaborators"></CreateTask>
      <!-- Card filters -->
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
    </div>
    <!-- Second col: Todo list -->
    <div class="col-lg-3 col-md-6 col-sm-12 p-1 pt-2">
      <!-- Number total of tasks -->
      <header>
        <h1 class="h4">
          <i class="far fa-clock"></i>
          POR FAZER
          <span class="badge badge-danger">
            {{ todoTasks.length }}
          </span>
        </h1>
      </header>
      <!-- Number of overdue tasks -->
      <div class="alert alert-danger" role="alert">
        <h1 class="h6">
          ATRASADAS
          <span class="bg-white text-dark rounded-pill px-2 lead">
            {{ overdueTasks.length }}
          </span>
        </h1>
      </div>
      <!-- Overdue tasks -->
      <CardTask
        v-for="task in overdueTasks"
        :task="task"
        :key="task['.key']"
      ></CardTask>
      <!-- Number of tomorrow tasks -->
      <div class="alert alert-keven" role="alert">
        <h1 class="h6">
          AMANHÃ
          <span class="bg-white text-dark rounded-pill px-2 lead">
            {{ tomorrowTasks.length }}
          </span>
        </h1>
      </div>
      <!-- Tomorrow tasks -->
      <CardTask
        v-for="task in tomorrowTasks"
        :task="task"
        :key="task['.key']"
      ></CardTask>
      <!-- Number of next days tasks -->
      <div class="alert alert-success" role="alert">
        <h1 class="h6">
          PRÓXIMOS DIAS
          <span class="bg-white text-dark rounded-pill px-2 lead">
            {{ lateTasks.length }}
          </span>
        </h1>
      </div>
      <!-- Next days tasks -->
      <CardTask
        v-for="task in lateTasks"
        :task="task"
        :key="task['.key']"
      ></CardTask>
    </div>
    <!-- Third col: Doing list -->
    <div class="col-lg-3 col-md-6 col-sm-12 p-1">
      <!-- Number of doing tasks -->
      <header>
        <h1 class="h4">
          <i class="far fa-play-circle"></i>
          FAZENDO
          <span class="badge badge-primary">
            {{ doingTasks.length }}
          </span>
        </h1>
      </header>
      <!-- Doing tasks -->
    </div>
    <!-- Fouth col: Done list -->
    <div class="col-lg-3 col-md-6 col-sm-12 p-1">
      <!-- Number of done tasks -->
      <header>
        <h1 class="h4">
          <i class="far fa-check-circle"></i>
          FEITAS
          <span class="badge badge-success">
            {{ doneTasks.length }}
          </span>
        </h1>
      </header>
      <!-- Done tasks -->
    </div>
  </div>
</template>

<script>
import { database } from "../database";

import CardTask from "@/components/CardTask.vue";
import CreateTask from "@/components/CreateTask.vue";

/* eslint-disable no-console */
export default {
  components: {
    CardTask,
    CreateTask
  },

  data() {
    return {
      showFilter: false,

      allTasks: [],
      clients: [],
      colaborators: [],

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

  computed: {
    tasks() {
      let tasks = this.allTasks;

      if (this.filters.title.length > 0) {
        tasks = tasks.filter(this.filters.by.title);
      }
      if (this.filters.client.length > 0) {
        tasks = tasks.filter(this.filters.by.client);
      }
      if (this.filters.colaborator.length > 0) {
        tasks = tasks.filter(this.filters.by.colaborator);
      }

      return tasks
        .sort((t1, t2) => t1.time > t2.time) // asc
        .sort((t1, t2) => t1.importance < t2.importance); // desc
    },
    // computed by state
    doneTasks() {
      // Recently completed
      return this.tasks
        .filter(({ status }) => status === "done")
        .sort((t1, t2) => t1.doneTime < t2.doneTime); // desc
    },
    doingTasks() {
      return this.tasks.filter(({ status }) => status === "doing");
    },
    todoTasks() {
      return this.tasks.filter(({ status }) => status === "todo");
    },
    // computed by time
    overdueTasks() {
      let now = new Date();
      return this.todoTasks.filter(({ time }) => time < now);
    },
    todayTasks() {
      let now = new Date();
      return this.todoTasks.filter(({ time }) => time === now);
    },
    tomorrowTasks() {
      let now = new Date();
      let tomorrow = now.setDate(now.getDate() + 1);

      return this.todoTasks.filter(({ time }) => time === tomorrow);
    },
    lateTasks() {
      let now = new Date();
      let tomorrow = now.setDate(now.getDate() + 1);

      return this.todoTasks.filter(({ time }) => time > tomorrow);
    }
  },
};
</script>

<style></style>
