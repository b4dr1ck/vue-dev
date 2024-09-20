<script>
import { images, carousel, news } from "./seed";

export default {
  name: "App",
  data() {
    return {
      images: images,
      news: news,
      carouselHeight: 0,
      carouselItems: carousel,
      showHome: false,
      snackbar: false,
      joke: "",
    };
  },
  created() {
    this.carouselHeight = window.innerHeight;
  },
  mounted() {
    this.carouselHeight -= this.getH1Height();
    this.checkScrollHeight();
    window.addEventListener("resize", this.checkScrollHeight);
    window.addEventListener("scroll", this.checkScrollHeight);
  },
  beforeDestroy() {
    window.removeEventListener("resize", this.checkScrollHeight);
    window.removeEventListener("scroll", this.checkScrollHeight);
  },
  methods: {
    openLink(link) {
      window.open(link, "_blank");
    },
    getJoke() {
      this.snackbar = true;

      fetch("https://v2.jokeapi.dev/joke/Any?type=single", {
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => response.json())
        .then((data) => (this.joke = data.joke));
    },
    checkScrollHeight() {
      if (window.scrollY > 0) {
        this.showHome = true;
      } else {
        this.showHome = false;
      }
    },
    openImageInNewTab(src) {
      window.open(src, "_blank");
    },
    scrollToArea(destination) {
      const scrollTo = this.$refs[destination];

      if (scrollTo) {
        scrollTo.scrollIntoView({ behavior: "smooth" });
      }
      this.showHome = true;
    },
    getH1Height() {
      const h1Element = this.$refs.header;
      const divElement = this.$refs.nav;

      const h1Height = h1Element.offsetHeight;
      const divHeight = divElement.offsetHeight;

      return h1Height + divHeight;
    },
  },
};
</script>

<template>
  <div ref="home">
    <v-btn
      @click="scrollToArea('home')"
      v-if="showHome"
      z-index="10"
      size="large"
      style="z-index: 100"
      class="text-h5 ma-5 position-fixed"
      prepend-icon="mdi-home"
      >Home
    </v-btn>

    <h1 ref="header" class="text-center bg-black">
      <span><img class="logo ma-1" src="./assets/br.png" /></span
      ><span>badricks-world.at</span>
    </h1>

    <div
      ref="nav"
      id="navBar"
      class="d-flex justify-center py-3 bg-grey-darken-4"
      style="z-index: 100"
    >
      <v-btn
        variant="outlined"
        @click="scrollToArea('aboutWrapper')"
        class="mx-5"
        >About</v-btn
      >
      <v-btn
        variant="outlined"
        @click="scrollToArea('newsWrapper')"
        class="mx-5"
        >News</v-btn
      >
      <v-btn
        variant="outlined"
        @click="scrollToArea('galleryWrapper')"
        class="mx-5"
        >Gallery</v-btn
      >
      <v-btn
        variant="outlined"
        class="mx-5"
        @click="openLink('https://badricks-world.at/gallery/')"
        >Slideshow</v-btn
      >
      <v-btn variant="outlined" class="mx-5" @click="getJoke()">Nothing</v-btn>
      <v-snackbar
        v-model="snackbar"
        location="center"
        vertical
        multi-line
        timeout="10000"
        color="rgba(255,255,255,0.9)"
      >
        <h3>Just Nothing</h3>
        <br />
        Told ya, there is nothing here...<br />
        But don't be too depressed, here's a joke for you:
        <br />
        <br />
        <b style="color: red">{{ joke }}</b>
        <br />
        <br />
        <small>from https://v2.jokeapi.dev - thank you :)</small>
        <template v-slot:actions>
          <v-btn color="black" variant="text" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </div>

    <div class="carousel-wrapper d-flex">
      <div class="responsive-width">
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

      <div class="pa-5 responsive-width text-center">
        <div
          class="d-flex flex-column ma-auto justify-center"
          style="height: 100%"
        >
          <h2 class="text-h3 my-10">Welcome To Badrick's World</h2>
          <p class="text-body-1 px-5">
            You've entered the homepage of badricks-world.at - and I am
            <b>Bad Rick</b> (no shit). <br />Just let me tell a few words...
            <br />
            My real name is Patrick (who would've thought?) and this is my little online
            gallery. I am a hobby artist and like to express myself by painting
            pictures. Nowadays my preferred media to paint is the digital
            painting by using a graphic tablet.
            <br />
            The subjects of my images ranges from fantasy, horror, surrealism to
            everything obscure. I don't give much information about my pictures
            - so, just whatch and let it work.
          </p>
          <p class="mt-5">
            <v-icon class="mx-2" icon="mdi-mail"></v-icon>...and feel free to
            <a class="mt-3 text-blue" href="mailto:contact@badricks-world.at"
              >contact me!</a
            >
          </p>
        </div>
      </div>
    </div>

    <v-spacer class="ma-5"></v-spacer>

    <div
      ref="aboutWrapper"
      class="mt-5"
      style="
        background: url('./demonWall_small.png'), black;
        background-size: cover;
        background-repeat: no-repeat;
      "
    >
      <h1 class="text-center bg-black">About Me</h1>
      <div id="about" class="d-flex justify-center">
        <div
          style="
            margin: auto;
            display: flex;
            justify-content: center;
            flex-direction: column;
          "
          class="text-center responsive-width pa-5"
        >
          <h2 class="mb-5">Let me tell you a story</h2>
          <p class="text-center pa-5">
            Once there was a litte boy, who was born in the late 80s. He soon
            got a new toy, and started to like this.
            <br />
            The new toy was a pen, and the life changed soon. He started to
            draw, and the world was in tune.
            <br />
            The years passed by, and he went to the school. He imposed teachers
            and friends, with his skills and the new tool.
            <br />
            To get attention was not too hard. Because he had a weird, crazy
            style of art.
            <br />
            Later in his life, he changed his old pen. So he painted in a
            digital way since then.
            <br />
            His paper now was a big screen. It was like realising a dream.
            <br />
            This way of painting is now his passion. And I'm here now to share
            with you my creation.
            <br />
            <br />
            <span class="text-red">
              All work and no painting makes Badrick a dull boy...
            </span>
          </p>
        </div>
        <div class="d-flex ma-auto">
          <v-img
            class="ma-auto"
            aspect-ratio="1/1"
            :width="300"
            :height="500"
            cover
            style="filter: grayscale(100%)"
            src="./me.jpg"
          ></v-img>
        </div>
      </div>
    </div>

    <h1 ref="newsWrapper" class="text-center bg-black">News</h1>
    <div
      id="newsWrapper"
      class="d-flex"
      style="
        background: url('./demonWall_small.png'), black;
        background-size: cover;
        background-repeat: no-repeat;
      "
    >
      <v-img
        id="newsImage"
        class="cursor-pointer ma-2"
        height="500"
        aspect-ratio="1/1"
        :src="images[0].src"
        :lazy-src="images[0].lazySrc"
        @click="openImageInNewTab(images[0].src)"
      ></v-img>
      <div class="text-center responsive-width pa-5 d-flex ma-auto flex-column">
        <h2 class="mb-5 text-center">What's going on...</h2>
        <div :key="index" v-for="(text, index) in news">
          <p class="text-subtitle-1 text-deep-purple-lighten-2">
            <b>{{ text[0] }}</b>
          </p>
          <p class="text-body-1">
            {{ text[1] }}
          </p>
        </div>
      </div>
    </div>

    <h1 ref="galleryWrapper" class="text-center bg-black">Gallery</h1>
    <div id="gallery_wrapper" class="d-flex flex-wrap justify-center bg-black">
      <div v-for="image in images" :key="image.id" class="ma-1">
        <v-img
          class="cursor-pointer"
          :width="200"
          :height="200"
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
  src: url("../fonts/belligerent.ttf") format("truetype");
}

#gallery_wrapper .v-img__img:hover {
  border: 2px solid white !important;
  filter: brightness(50%);
}

h1 {
  font-family: "headerFont" !important;
  font-size: 70px !important;
  font-weight: normal !important;
}

h2 {
  font-family: "headerFont" !important;
}

.responsive-width {
  width: 100%;
}

.carousel-wrapper {
  display: flex;
  flex-direction: column;
}

p {
  line-height: 3 !important;
}

.logo {
  position: absolute;
  height: 95px;
  left: 0px;
  filter: invert(1);
}

#about,
#newsWrapper {
  flex-direction: column;
}

#navBar button {
  width: 120px;
}

@media only screen and (min-width: 1000px) {
  .responsive-width {
    width: 50%;
  }
  #about,
  #newsWrapper {
    flex-direction: row;
  }
  .carousel-wrapper {
    display: flex;
    flex-direction: row;
  }
}

@media only screen and (max-width: 600px) {
  .logo {
    opacity: 0;
  }

  #navBar {
    flex-direction:row;
    flex-wrap: wrap;
  }

  #navBar button{
    margin: 5px;
  }
}
</style>
