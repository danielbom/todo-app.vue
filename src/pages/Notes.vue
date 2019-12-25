<template>
  <div class="container-fluid">
    <!-- First row: Form note -->
    <div class="row">
      <div class="col-12 pb-2">
        <div class="card rounded">
          <!-- Card header -->
          <div class="card-header">ADICIONAR NOTA</div>
          <!-- Card body -->
          <div class="card-body">
            <div class="form-group">
              <textarea
                rows="4"
                type="text"
                class="form-control"
                v-model="note.content"
                placeholder="Anotar aqui coisas que não são tarefas, e não podemos esquecer"
              ></textarea>
              <button class="btn btn-info btn-block mt-1" v-on:click="save()">
                SALVAR NOTA
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Second row:  -->
    <div class="row">
      <div
        class="col-lg-3 col-md-4 col-sm-12"
        v-for="(note, index) in notes"
        :key="`note-${index}`"
      >
        <div class="card bg-igor text-dark mb-3">
          <!-- Card header: Buttons -->
          <div class="card-header bg-igor d-flex justify-content-end">
            <!-- Button edit -->
            <button class="btn btn-sm btn-outline-dark mr-3">
              <i class="far fa-edit"></i>
            </button>
            <!-- Button delete -->
            <button class="btn btn-sm btn-outline-dark">
              <i class="far fa-trash-alt"></i>
            </button>
          </div>
          <!-- Card body: note content -->
          <div class="card-body text-justify">
            {{ note.content }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from "vuex";

export default {
  data() {
    return {
      note: {
        content: ""
      }
    };
  },

  methods: {
    save() {
      this.$store.dispatch("notes/add", this.note);
    }
  },

  computed: mapState({
    notes: state => state.notes.all,
    noteId: state => state.notes.currentId,
  }),
};
</script>

<style></style>
