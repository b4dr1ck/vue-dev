<template>
  <nav class="navbar navbar-expand-lg bg-vue navbar-dark">
    <div class="container">
      <router-link to="/shop" class="navbar-brand">Der Shop</router-link>
      <ul class="navbar-nav me-auto">
        <li class="nav-item active">
          <router-link to="/shop" class="nav-link">Startseite</router-link>
        </li>
        <li class="nav-item">
          <router-link to="/shop/create/product" class="nav-link">Neuer Artikel</router-link>
        </li>
      </ul>
      <button class="btn bg-vue me-3"><i class="fas fa-shopping-cart"></i> Warenkorb (10 €)</button>
      <button @click="signout()" class="btn bg-vue2">
        <i class="fas fa-sign-out-alt"></i> Logout
      </button>
    </div>
  </nav>
</template>

<script>
export default {
  name: "TheNavbar",
  methods: {
    async signout() {
      try {
        // dispatch liefert ein Promise retour, daher kann mit async/await darauf gewartet werden.
        await this.$store.dispatch("signOut"); 
        this.$router.push("/");
      } catch (error) {
        console.log(error);
      }
    },
  },
};
</script>

<style scoped></style>
