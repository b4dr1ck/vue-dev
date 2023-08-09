<template>
  <div style="width: 19rem; min-height: 19rem" class="card m-1 border-2" :class="todoColor">
    <TodoOptions @delete-todo="deleteTodo" @edit-todo="editTodo" />
    <template v-if="!edit">
      <div class="card-body">
        <h5 class="card-title">{{ header }}</h5>
        <p class="card-text">{{ text }}</p>
      </div>
      <div class="row">
        <i v-if="deadline" :title="deadline" class="mb-1 bi bi-alarm col"></i>
      </div>
    </template>
    <template v-else>
      <div class="card-body">
        <input v-model="headerInput" type="text" class="form-control m-1" placeholder="Header" />
        <textarea v-model="textInput" class="form-control m-1" aria-label="With textarea" placeholder="Text"></textarea>
        <input v-model="daedLineInput" type="text" class="form-control m-1" placeholder="dd.mm.yyyy hh:mm" />
        <div class="row">
          <div
            @click="changeColor($event, index)"
            role="button"
            style="height: 25px"
            class="border col m-1"
            :class="colorStyle(color, index)"
            :key="color"
            v-for="(color, index) in colors"
          ></div>
        </div>
        <div class="row text-center justify-content-md-center">
          <i @click="commitEdit" role="button" class="mb-1 bi bi-check2 col col-lg-2 fs-4"></i>
          <i @click="cancelEdit" role="button" class="mb-1 bi bi-x col col-lg-2 fs-4"></i>
        </div>
      </div>
    </template>
  </div>
</template>

<script>
import TodoOptions from "./TodoOptions.vue";

export default {
  name: "TodoEntry",
  components: {
    TodoOptions,
  },
  props: {
    id: Number,
    header: String,
    text: String,
    deadline: String,
    color: Number,
    edit: Boolean,
    ctime: String,
  },
  emits: ["edit-todo", "delete-todo", "cancel-edit", "commit-edit", "change-color"],
  data() {
    return {
      colors: ["light", "primary", "secondary", "success", "danger", "warning", "info"],
      textInput: this.text,
      headerInput: this.header,
      daedLineInput: this.deadline,
    };
  },
  computed: {
    todoColor() {
      return ["text-bg-" + this.colors[this.color]];
    },
  },
  methods: {
    editTodo() {
      this.$emit("edit-todo", this.id);
    },
    deleteTodo() {
      this.$emit("delete-todo", this.id);
    },
    cancelEdit() {
      this.$emit("cancel-edit", this.id);
    },
    commitEdit() {
      this.$emit("commit-edit", {
        id: this.id,
        text: this.textInput,
        header: this.headerInput,
        deadline: this.daedLineInput,
      });
    },
    colorStyle(color, index) {
      let classes = ["bg-" + color];
      if (this.color === index) {
        classes.push("border-3");
        classes.push("border-" + color + "-subtle");
      }
      return classes;
    },
    changeColor(event, colorId) {
      this.$emit("change-color", { id: this.id, newColor: colorId });
    },
  },
};
</script>

<style scoped>
i:hover {
  color: black;
}
</style>
