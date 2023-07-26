<template>
  <div class="container-fluid">
    <h1 class="text-center"><span>🕮</span> Telefonbuch</h1>
    <div class="container-fluid">
      <div class="row bg-gray">
        <div
          class="col-md px-1"
          v-bind:key="'input_' + header"
          v-for="header in entriesHeader"
        >
          <label class="sr-only" v-bind:for="header"></label>
          <input
            tpye="text"
            class="form-control d-inline my-1"
            v-bind:id="header"
            v-bind:placeholder="header"
          />
        </div>
        <div class="col-md px-1">
          <button class="btn btn-primary d-inline btn-add w-100 my-1">
            Hinzufügen
          </button>
        </div>
      </div>
    </div>
    <hr />
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <th v-bind:key="header" v-for="header in entriesHeader">
            {{ header }}
          </th>
          <th style="width: 50px;"></th>
        </tr>
      </thead>
      <tbody>
        <EntryComponent
          v-bind:key="entry.id"
          v-for="entry in entries"
          :entry="entry"
          @delete-entry="deleteEntry($event)"
        />
      </tbody>
    </table>
  </div>
</template>

<script>
import { entries } from "./seed";

import EntryComponent from "./components/EntryComponent.vue";

export default {
  name: "App",
  components: {
    EntryComponent,
  },
  data() {
    return {
      entries: entries,
      entriesHeader: ["Name", "Adresse", "Telefon", "E-Mail"],
    };
  },
  emits: ["delete-entry"],
  computed: {},
  methods: {
    deleteEntry(entryId) {
      const entryIndex = this.entries.findIndex(
        (entry) => entry.id === entryId
      );
      this.entries.splice(entryIndex, 1);
    },
  },
};
</script>

<style>
@import "~bootstrap/dist/css/bootstrap.min.css";

.bg-gray {
  background-color: lightgray;
}

table {
  table-layout: fixed;
}
</style>
