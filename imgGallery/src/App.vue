<script>
import { images,carousel } from "./seed";

export default {
  name: "App",
  data() {
    return {
      images: images,
      carouselHeight: 0,
      carouselItems: carousel,
    };
  },
  created() {
    this.carouselHeight = window.innerHeight - 145;
  },
  methods: {
    openImageInNewTab(src) {
      window.open(src, "_blank");
    },
  },
};
</script>

<template>
  <div>
    <h1 class="text-center">badricks-world.at</h1>
    <div style="display: flex" class="carousel-wrapper">
      <div class="responsive-carousel">
        <v-carousel
          color="white"
          cycle
          show-arrows="hover"
          :height="carouselHeight"
        >
          <v-carousel-item
            v-for="(item,id) in carouselItems"
            :key="id"
            :src="item"
            cover
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div
        class="pa-5 responsive-carousel text-center"
        style="background-color: rgba(255, 255, 255, 0.7)"
      >
        <h2 class="test-h2 my-3 text-black">Welcome To Barick's World</h2>
        <p class="text-body-1 text-black">
          <b>Lorem Ipsum</b> is simply dummy text of the printing and
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
          lease of Letraset sheets containing Lorem Ipsum passages, and more
          recently with desktop publishing software like Aldus PageMaker
          including versions of Lorem Ipsum <br /><br />
          typesetting industry. Lorem Ipsum has been the industry's standard
          dummy text ever since the 1500s, when an unknown printer took a galley
          of type and scrambled it to make a type specimen book. It has survived
        </p>
      </div>
    </div>
    <v-spacer class="ma-5"></v-spacer>
    <div id="gallery_wrapper" class="d-flex flex-wrap justify-center">
      <div v-for="image in images" :key="image.id" class="ma-1">
        <v-img
          class="cursor-pointer"
          :width="250"
          :height="250"
          aspect-ratio="1/1"
          cover
          :src="image.src"
          :lazy-src="image.lazySrc"
          @click="openImageInNewTab(image.src)"
        >
          <template v-slot:placeholder>
            <div class="d-flex align-center justify-center fill-height">
              <v-progress-circular
                color="grey-lighten-4"
                indeterminate
              ></v-progress-circular>
            </div>
          </template>
        </v-img>
      </div>
    </div>
  </div>
</template>

<style>
@font-face {
  font-family: "RocksDead";
  src: url("./src/assets/fonts/rd.ttf") format("truetype");
}

@font-face {
  font-family: "Decaydence";
  src: url("./src/assets/fonts/Decaydence.otf") format("truetype");
}

#gallery_wrapper .v-img__img:hover {
  border: 2px solid white !important;
  filter: brightness(50%);
}

h1 {
  font-family: "RocksDead", sans-serif !important;
  font-size: 90px !important;
  font-weight: normal !important;
}

.responsive-carousel {
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  flex-direction: column;
}

p,
h2 {
  line-height: 2.5 !important;
}

@media only screen and (min-width: 900px) {
  .responsive-carousel {
    width: 50%;
  }
  .carousel-wrapper {
    display: flex;
    flex-direction: row;
  }
}
</style>
