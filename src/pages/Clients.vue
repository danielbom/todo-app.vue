<template>
  <div class="container-fluid">
    <div class="row">
      <!-- First col -->
      <div class="col-12" id="accordion">
        <div class="card">
          <!-- Card header -->
          <div class="card-header">
            <h1 class="h6">
              <button
                class="btn btn-link"
                data-toggle="collapse"
                data-target="#collapse"
                aria-expanded="false"
                aria-controls="collapse"
              >
                ADICIONAR CLIENTE
              </button>
            </h1>
          </div>
          <div id="collapse" class="collapse" data-parent="#accordion">
            <div class="card-body">
              <!-- Form group client id -->
              <div class="form-group m-0">
                <label>id</label>
                <input
                  class="form-control"
                  v-model="client.clientId"
                  type="number"
                  placeholder="ex: 169"
                />
              </div>
              <!-- Form group client name -->
              <div class="form-group m-0">
                <label>Nome</label>
                <textarea
                  rows="1"
                  class="form-control"
                  v-model="client.name"
                ></textarea>
              </div>
              <!-- Form group client scheme -->
              <div class="form-group">
                <label>Programa</label>
                <select class="form-control" v-model="client.scheme">
                  <option
                    v-for="(scheme, index) in SCHEMES"
                    :key="`scheme-${index}`"
                    :value="scheme"
                  >
                    {{ SCHEME_VIEW[scheme] }}
                  </option>
                </select>
              </div>
              <!-- Form group client status -->
              <div class="form-group">
                <label>Status</label>
                <select class="form-control" v-model="client.status">
                  <option :value="'active'">ativo</option>
                  <option :value="'inactive'">inativo</option>
                </select>
              </div>
              <button
                type="button"
                class="btn btn-primary btn-block"
                v-on:click="create()"
              >
                SALVAR
              </button>
            </div>
          </div>
        </div>
      </div>
      <!-- Second col -->
      <div class="col-12 pt-2">
        <table class="table tabl-dark">
          <thead>
            <tr>
              <th scope="col">id</th>
              <th scope="col">Nome</th>
              <th scope="col">Programa</th>
              <th scope="col">Status</th>
              <th scope="col">Editar</th>
            </tr>
          </thead>
          <tbody>
            <tr
              v-for="client in clients"
              :key="client['.key']"
              :class="SCHEME_CLS[client.scheme]"
            >
              <th scope="row">{{ client.clientId }}</th>
              <td>{{ client.name }}</td>
              <td>{{ SCHEME_VIEW[client.scheme] }}</td>
              <td>{{ client.status }}</td>
              <td>
                <button class="btn btn-sm btn-outline" v-on:click="edit()">
                  editar
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
</template>

<script>
import { database } from "../database";

/* eslint-disable no-console */
export default {
  data() {
    return {
      client: {
        clientId: "",
        name: "",
        scheme: "initial",
        status: "active"
      },

      SCHEME_VIEW: {
        initial: "INICIAL",
        intermediary: "INTERMEDIÁRIO",
        complete: "COMPLETO",
        inative: "inativo"
      },
      SCHEME_CLS: {
        initial: "table-primary",
        intermediary: "table-success",
        complete: "table-info",
        inative: "table-warning"
      },
      SCHEMES: ["initial", "intermediary", "complete", "inactive"]
    };
  },

  methods: {
    create() {
      database
        .ref("clients")
        .child(this.client.clientId)
        .set(this.client);
      this.clear();
      console.log("Created");
    },

    edit(client) {
      this.client = { ...client };
    },

    clear() {
      this.client = {
        clientId: "",
        name: "",
        scheme: "initial",
        status: "active"
      };
    }
  },

  computed: {
    clients() {
      return (this.allClients || []).filter(e => !!e);
    }
  }
};
</script>

<style></style>
