<template>
  <div class="row">
    <!-- First col: Filters -->
    <div class="col-lg-3 col-md-6 col-sm-12 p-1 pt-2">
      <CreateTask></CreateTask>
      <!-- Card filters -->
      <FilterTask></FilterTask>
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
        v-for="(task, index) in overdueTasks"
        :task="task"
        :key="`overdueTasks-${index}`"
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
        v-for="(task, index) in tomorrowTasks"
        :task="task"
        :key="`tomorrowTasks-${index}`"
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
        v-for="(task, index) in lateTasks"
        :task="task"
        :key="`lateTasks-${index}`"
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
      <CardTask
        v-for="(task, index) in doingTasks"
        :task="task"
        :key="`doingTasks-${index}`"
      ></CardTask>
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
      <CardTask
        v-for="(task, index) in doneTasks"
        :task="task"
        :key="`doneTasks-${index}`"
      ></CardTask>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

import CardTask from "@/components/CardTask.vue";
import CreateTask from "@/components/CreateTask.vue";
import FilterTask from "@/components/FilterTask.vue";

export default {
  components: {
    CardTask,
    CreateTask,
    FilterTask
  },

  computed: {
    ...mapState({
      tasks: state => state.tasks.filtered,
      clients: state => state.clients.all,
      colaborators: state => state.colaborators.all
    }),
    // computed by state
    todoTasks() {
      return this.tasks.filter(({ status }) => status === "todo");
    },
    doingTasks() {
      return this.tasks.filter(({ status }) => status === "doing");
    },
    doneTasks() {
      // Recently completed
      return this.tasks
        .filter(({ status }) => status === "done")
        .sort((t1, t2) => t1.doneTime < t2.doneTime); // desc
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
  }
};
</script>

<style></style>
