<template>
  <TheTwoColumnsLayout
    :leftColumnClass="'col-md-8 bg-vue'"
    :rightColumnClass="'col-md-4'"
    :fullSize="true"
  >
    <template #leftCol>
      <div class="mt-5 text-center">
        <div class="display-1 my-5">Der Shop</div>
        <div class="display-4 my-5">
          Erhalten Sie Zugriff auf exklusive Artikel
        </div>
        <div class="my-5 offset-4 col-4">
          <img src="@/assets/shopping.svg" class="img-fluid" />
        </div>
      </div>
    </template>
    <template #rightCol><RegisterAuth /></template>
  </TheTwoColumnsLayout>
</template>

<script>
import TheTwoColumnsLayout from "@/components/layouts/TheTwoColumnsLayout";
import RegisterAuth from "@/components/auth/RegisterAuth";

export default {
  name: "HomePage",
  components: {
    TheTwoColumnsLayout,
    RegisterAuth,
  },
};
</script>

<style scoped></style>
