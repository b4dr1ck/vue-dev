<template>
  <div>
    <TheNavBar />
    <main>
      <div class="container">
        <div class="row">
          <div class="col-12">
            <router-view></router-view>
          </div>
        </div>
      </div>
    </main>
  </div>
</template>

<script>
import TheNavBar from "@/components/TheNavBar.vue";

export default {
  name: "TheShopLayout",
  components: {
    TheNavBar,
  },
};
</script>

<style scoped></style>
