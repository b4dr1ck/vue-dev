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
            v-model="newEntries[header]"
          />
        </div>
        <div class="col-md px-1">
          <button
            role="button"
            @click="addNewEntry"
            class="btn btn-primary d-inline btn-add w-100 my-1"
            :class="buttonIsActive"
          >
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
          <th style="width: 50px"></th>
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
      entriesHeader: ["Name", "Adresse", "Telefon", "Mail"],
      newEntries: {
        Name: "",
        Adresse: "",
        Telefon: "",
        Mail: "",
      },
    };
  },
  emits: ["delete-entry"],
  computed: {
    buttonIsActive() {
      for (const key in this.newEntries) {
        if (this.newEntries[key] === "") {
          return ["disabled"];
        }
      }
      return [""];
    }
  },
  methods: {
    deleteEntry(entryId) {
      const entryIndex = this.entries.findIndex(
        (entry) => entry.id === entryId
      );
      this.entries.splice(entryIndex, 1);

      // setze die id's neu
      let counter=1;
      this.entries.forEach( (entry) => {
        entry.id = counter;
        counter++;
      });
    },
    addNewEntry() {
      this.entries.push({
        id: this.entries.length + 1,
        name: this.newEntries.Name,
        address: this.newEntries.Adresse,
        phone: this.newEntries.Telefon,
        email: this.newEntries.Mail,
      });

      for (const key in this.newEntries) {
        this.newEntries[key] = "";
      }
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
