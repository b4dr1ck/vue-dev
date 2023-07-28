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
        <tr class="border">
          <EntryHeader
            role="button"
            v-bind:key="header"
            v-for="header in entriesHeader"
            :header="header"
            :sortBy="sortBy"
            :sortASC="sortASC"
            @sort-by-field="sortByHeaderField($event)"
          />
          <th style="width: 50px"></th>
        </tr>
      </thead>
      <tbody>
        <BookFilter
          :entriesHeader="entriesHeader"
          @set-filter="setFilter($event)"
        />
        <BookEntry
          v-bind:key="entry.id"
          v-for="entry in sortedEntries"
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
import BookFilter from "./components/BookFilter.vue";

export default {
  name: "App",
  components: {
    BookEntry,
    NewEntry,
    EntryHeader,
    BookFilter,
  },
  data() {
    return {
      entries: entries,
      entriesHeader: ["Name", "Adresse", "Telefon", "E-Mail"],
      keyHeaderMap: {
        Name: "name",
        Adresse: "address",
        Telefon: "phone",
        "E-mail": "email",
      },
      sortBy: "Name",
      sortASC: true,
      filterActive: false,
      filterEntry: [],
    };
  },
  emits: ["delete-entry", "new-entry", "sort-by-field"],
  computed: {
    sortedEntries() {
      let sortByKey;
      let entries = this.entries;

      if (this.filterActive) {
        entries = entries.filter((entry) => {
          if (
            entry.name.indexOf(this.filterEntry.Name) >= 0 &&
            entry.address.indexOf(this.filterEntry.Adresse) >= 0 &&
            entry.phone.indexOf(this.filterEntry.Telefon) >= 0 &&
            entry.email.indexOf(this.filterEntry["E-Mail"]) >= 0
          ) {
            return true;
          }
        });
      }

      sortByKey = this.keyHeaderMap[this.sortBy]

      if (this.sortASC) {
        return entries.sort((a, b) => {
          if (a[sortByKey].toLowerCase() < b[sortByKey].toLowerCase()) {
            return -1;
          }
          if (a[sortByKey].toLowerCase() > b[sortByKey].toLowerCase()) {
            return 1;
          }
          return 0;
        });
      }

      return entries.sort((a, b) => {
        if (a[sortByKey].toLowerCase() > b[sortByKey].toLowerCase()) {
          return -1;
        }
        if (a[sortByKey].toLowerCase() < b[sortByKey].toLowerCase()) {
          return 1;
        }
        return 0;
      });
    },
  },
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
      if (this.sortBy === headerField.header) {
        this.sortASC = headerField.sortASC;
      }
      this.sortBy = headerField.header;
    },
    setFilter(filterObj) {
      this.filterEntry = filterObj;
      this.filterActive = false;
      for (const key in filterObj) {
        if (filterObj[key] !== "") {
          this.filterActive = true;
        }
      }
    },
  },
};
</script>

<style scoped>
@import "~bootstrap/dist/css/bootstrap.min.css";

.bg-gray {
  background-color: lightgray;
}

table {
  table-layout: fixed;
}
</style>
