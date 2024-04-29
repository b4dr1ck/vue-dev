#!/bin/bash

project_path=$1
project_name=$2

if [[ -z $project_path || -z $project_name ]]; then
  echo ""
  echo "*** Parameterfehler ***"
  echo ""
  echo "usage:"
  echo "vuetifyMe Project-Path Project-Name"
  echo ""
  exit 1
fi

cd "$project_path" || exit

echo ""
echo -e "\e[32m* Installiere Vite-Environment\e[0m"
npm create vue@latest "$project_name" || exit

cd "$project_name" || exit

npm i || exit

echo ""
echo -e "\e[32m* Installiere Vuetify\e[0m"
npm i vuetify || exit

echo ""
echo -e "\e[32m* Installiere MDI-Icons\e[0m"
npm install @mdi/font -D || exit

echo ""
echo -e "\e[32m* Lösche Inhalt von src/components\e[0m"
echo ""
rm -rfv src/components/* || exit

echo ""
echo -e "\e[32m* Schreibe src/App.vue\e[0m"
echo ""
cat << END > src/App.vue
<script>
  export  default {
    name: 'App',
    data() {
      return {
        
      }
    }
  }
</script>

<template>

</template>

<style>

</style>
END

echo -e "\e[32m* Schreibe src/main.js\e[0m"
echo ""
cat << END > src/main.js
import '@mdi/font/css/materialdesignicons.css'
import { createApp } from "vue";
import App from "./App.vue";

// Vuetify
import "vuetify/styles";
import { createVuetify } from "vuetify";
import { aliases, mdi } from "vuetify/iconsets/mdi";
import * as components from "vuetify/components";
import * as directives from "vuetify/directives";

const vuetify = createVuetify({
  theme: {
    defaultTheme: "dark",
  },
  icons: {
    defaultSet: "mdi",
    aliases,
    sets: {
      mdi,
    },
  },
  components,
  directives,
});

createApp(App).use(vuetify).mount("#app");
END

