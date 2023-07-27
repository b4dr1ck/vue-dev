<template>
  <div class="container-fluid">
    <h1 class="text-center"><span>🕮</span> Telefonbuch</h1>
    <div class="container-fluid">
      <NewEntry
        @new-entry="addNewEntry($event)"
        :entriesHeader="entriesHeader"
      />
    </div>
    <hr />
    <table class="table table-hover table-striped">
      <thead>
        <tr>
          <EntryHeader
            role="button"
            v-bind:key="header"
            v-for="header in entriesHeader"
            :header="header"
            @sort-by-field="sortByHeaderField($event)"
          />
          <th style="width: 50px"></th>
        </tr>
      </thead>
      <tbody>
        <BookEntry
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

import BookEntry from "./components/BookEntry.vue";
import NewEntry from "./components/NewEntry.vue";
import EntryHeader from "./components/EntryHeader.vue";

export default {
  name: "App",
  components: {
    BookEntry,
    NewEntry,
    EntryHeader,
  },
  data() {
    return {
      entries: entries,
      entriesHeader: [ "Name", "Adresse", "Telefon", "E-Mail"],
    };
  },
  emits: ["delete-entry", "new-entry", "sort-by-field"],
  computed: {},
  methods: {
    deleteEntry(entryId) {
      const entryIndex = this.entries.findIndex(
        (entry) => entry.id === entryId
      );
      this.entries.splice(entryIndex, 1);

      // setze die id's neu
      let counter = 1;
      this.entries.forEach((entry) => {
        entry.id = counter;
        counter++;
      });
    },
    addNewEntry(newEntry) {
      const newEntryObject = newEntry;
      this.entries.push({
        id: this.entries.length + 1,
        name: newEntryObject.Name,
        address: newEntryObject.Adresse,
        phone: newEntryObject.Telefon,
        email: newEntryObject["E-Mail"],
      });
    },
    sortByHeaderField(headerField) {
      let sortByKey;

      switch (headerField) {
        case "Name":
          sortByKey = "name";
          break;
        case "Adresse":
          sortByKey = "address";
          break;
        case "Telefon":
          sortByKey = "phone";
          break;
        case "E-Mail":
          sortByKey = "email";
          break;
      }

      this.entries = this.entries.sort((a, b) => {
        if (a[sortByKey].toLowerCase() < b[sortByKey].toLowerCase()) {
          return -1;
        }
        if (a[sortByKey].toLowerCase() > b[sortByKey].toLowerCase()) {
          return 1;
        }
        return 0;
      });
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
