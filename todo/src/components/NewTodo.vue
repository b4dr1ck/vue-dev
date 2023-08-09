<template>
  <div
    id="newTodo"
    role="button"
    style="width: 19rem; min-height: 19rem; border-style: dashed"
    class="card m-1 border-2 text-bg-dark border-secondary"
  >
    <div class="card-body d-flex align-items-center justify-content-center">
      <i class="fs-1 bi bi-plus-circle text-secondary"></i>
    </div>
  </div>
</template>

<script>
export default {
  name: "NewTodo",
};
</script>

<style scoped>
#newTodo:hover {
  border-color: rgb(228, 228, 228) !important;
}
</style>
