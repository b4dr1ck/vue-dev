<script>
import { images, carousel } from "./seed";

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
    this.carouselHeight = window.innerHeight - 96;
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
    <h1 class="text-center text-h1">badricks-world.at</h1>
    <div style="display: flex" class="carousel-wrapper">
      <div class="responsive-carousel">
        <v-carousel
          color="white"
          cycle
          show-arrows="hover"
          :height="carouselHeight"
        >
          <v-carousel-item
            v-for="(item, id) in carouselItems"
            :key="id"
            :src="item"
            cover
          ></v-carousel-item>
        </v-carousel>
      </div>
      <div class="pa-5 responsive-carousel text-center bg-black">
        <div
          style="
            margin: auto;
            display: flex;
            justify-content: center;
            flex-direction: column;
            height: 100%;
          "
        >
          <h2 class="text-h3 my-5">Welcome To Badrick's World</h2>
          <p class="text-body-1 px-5">
            You've entered the homepage of badricks-world.at - and I am
            <b>Bad Rick</b>. <br />Just let me tell a few words...
            <br />
            My name is Patrick (aka Bad Rick) and this is my little online
            gallery. I am a hobby artist and like to express myself by painting
            pictures. Nowadays my preferred media to paint is the digital
            painting
            <br />
            The subjects of my images ranges from fantasy, horror, surrealism to
            everything obscure. I don't give much information about my pictures
            - so just let it work.
            <br />
            <br />
            Hope you like it!
          </p>
          <p class="mt-5"><v-icon class="mx-2" icon="mdi-mail"></v-icon>
            <a class="mt-3 text-blue" href="mailto:contact@badricks-world.at"
              >Contact Me!</a
            >
          </p>
        </div>
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
  font-family: "headerFont";
  src: url("./src/assets/fonts/belligerent.ttf") format("truetype");
}

#gallery_wrapper .v-img__img:hover {
  border: 2px solid white !important;
  filter: brightness(50%);
}

h1 {
  font-family: "headerFont" !important;
  font-size: 90px !important;
  font-weight: normal !important;
}

h2 {
  font-family: "headerFont" !important;
}

.responsive-carousel {
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  flex-direction: column;
}

p {
  line-height: 3 !important;
}

@media only screen and (min-width: 1000px) {
  .responsive-carousel {
    width: 50%;
  }
  .carousel-wrapper {
    display: flex;
    flex-direction: row;
  }
}
</style>
