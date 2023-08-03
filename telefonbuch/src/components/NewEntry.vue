<template>
  <div class="row bg-gray rounded">
    <p role="button" @click="toggleNewEntry" class="fs-5 mb-0">Neuer Eintrag</p>
    <div class="row" v-if="showNewEntry">
      <div class="col-md px-1" v-bind:key="'input_' + header" v-for="header in entriesHeader">
        <label class="sr-only" v-bind:for="header"></label>
        <input
          type="text"
          class="form-control d-inline my-1"
          v-bind:id="header"
          v-bind:placeholder="header"
          v-model="newEntry[header]"
        />
      </div>
      <div class="col-md px-1">
        <button
          role="button"
          @click="emitNewEntry()"
          class="btn btn-primary d-inline btn-add w-100 my-1"
          :class="buttonIsActive"
        >
          Hinzufügen
        </button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewEntry",
  props: ["entriesHeader"],
  data() {
    return {
      newEntry: {
        Name: "",
        Adresse: "",
        Telefon: "",
        "E-Mail": "",
      },
      showNewEntry: true,
    };
  },
  computed: {
    buttonIsActive() {
      for (const key in this.newEntry) {
        if (this.newEntry[key] === "") {
          return ["disabled"];
        }
      }
      return [""];
    },
  },
  methods: {
    emitNewEntry() {
      this.$emit("new-entry", this.newEntry);

      for (const key in this.newEntry) {
        this.newEntry[key] = "";
      }
    },
    toggleNewEntry() {
      this.showNewEntry = !this.showNewEntry;
    },
  },
};
</script>

<style></style>
