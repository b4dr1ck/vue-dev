<https://vuejs.org/guide/introduction.html>

# Vue.js Glossar
## Root-Component
```js
const app = Vue.createApp({
  // Optionen
  data: function () {
    return {
    };
  },

  // - wird ausgeführt  wenn sich abhängige Daten ändern
  // - verwendet man wenn Daten von anderen abhängen (z.B totalVotes)
  computed: {
      functionName() {
      },
  },

  // - wird ausgeführt wenn sich "sichtabre" Daten ändern (wenn das Template neu gerendert werden muss)
  // - verwendet man für Daten die sich permanent ändern (z.B Event-Listener (click))
  methods: {
      functionName() {
      },
  },

  // wird ausgeführt wenn sich die beobatchteten Daten ändern
  // verwendet man für z.B localStorage, HTTP-Requests etc (was sich nicht direkt auf das Template auswirkt)
  watch: {
      functionName: {
          handler(newValue, oldValue) {
          },
          deep: true,       // benötigt man für komplexere Datentypen wie z.B Array
          immediate: true   // der Watcher wird initial (nach Erstellung der Componet) ausgeführt
      },
  },
});

// Components:
// Globale Component
app.component("NameDerComponent", {
  // Optionen
  props: [""], // props die vom Eltern-Component geerbt werden sollen
  methods: {
  },
  template: '<html></html>'
});
// wird dann im HTML-Template so angegeben
<name-der-component></name-der-component>
// oder einfach so
<NameDerComponent/>

// Liefert die Instanz zur Root-Component zurück
const vm = app.mount("#app");
```

Man kann Vue-Code an ein Template binden. Es wirkt dann die Interpolation auf alle untergeordneten Elemente. 
Das ```<template>``` wird nach dem Laden des eigentlichen DOM gelöscht!

```<template></template>```

 Interpolation mit Mustache-Syntax

```{{ data }}```

## Directives
Iteration über ein Array/Object
```js
v-for="(element, index) in myArray"
v-for="(value, key, index) in myObject"
```

zeigt das Element nur an wenn Expression wahr ist.
Die Else-Bedingung muss immer direkt im nächsten HTML-Element definiert werden.
```js
v-if="expression"  
v-else
v-else-if="expression"
```
togglet zwischen show und hide wenn die Expression wahr ist. 
Das Element wird allerdings immer gerendert. (mit ```display:none``` versteckt)
```js
v-show="expression" 
```
versteckt noch nicht fertig kompilierte Elemente bis sie fretig geladen sind
```js
v-cloak    
```
```css
/*CCS-Code dazu*/
[v-cloak] {
    display: none;
  }
```
Eindeutige ID für ein Element.  <https://v3-migration.vuejs.org/breaking-changes/key-attribute.html>
```js
v-bind:key="uniqueID"       
```
Ein HTML-Attribut (z.B scr-Attribut beim ```<img>```) an Vue binden
```js
v-bind:htmlAttribut="data"  
:attribut   // Abkürzung
```
Das DOM wird hier nur einmal gerndert, auch wenn sich die Daten im Hintergrund noch ändern können.

```v-once```

Event-Listener (click-Event). $event speichert das Event-Object
```js
v-on:click="handler(parameter1 ..., $event")  
@click // Abkürzung
```
Gibt Daten als HTML-Text aus. HTML-Tags werden interpretiert

```v-html=data```

Text wird ohne Interpretation ausgegeben

```v-pre```

## v-model
Mit dieser Directive kann ein Two-Way-Bindung zu einem Formular-Input-Element hergestellt werden.

Der Syntax sieht wie folgt aus:
```js
v-model="propName"
```
Das v-model kann dann z.B in einem Input-Element verwendet werden.
```message``` wird dann automatisch für den value im Input eingetragen.
Wenn dieser Input verändert wird, wird auch automatisch das ```<p>``` Tag verändert.
```js
// Vue-App mit Daten erstellen
Vue.createApp({
  // Optionen
  data: function () {
    return {
      message: "Test-Message",
    };
  },
}).mount("#app");

```

```html
  <!--Daten mittels v-model im HTML Template verwenden-->
  <p>{{message}}</p>
  <input type="text" v-model="message"/>
```

## Slots 
Slot-Directive:
```js
// named slot
v-slot:slotname="slotProps"
// kurze Schreibweise
#slotname="slotProps"
// default-slot (wird für nicht benannte Slots verwendet)
v-slot
```
In einer Component einen Slot verwenden.
Innerhalb des ```<slot>``` Tag's steht der Fallback-Content.
```html
<slot name="mySlotName" v-bind:data="myData">
  Unbekannt
</slot>
```
Im Elternobjekt den Slot und die daran gebundenen Properties verwenden
```html
<template v-slot:mySlotName="slotProps">
  {{ slotProps.data }}
</template>
```

## Entwicklungsumgebung einrichten mittels VUE-CLI
Installieren von VUE-CLI 
```
npm install -g @vue/cli // -g für globale Installation
```

Erstellen der Entwicklungsumgebung
```
vue create <appname>
```

Kompilieren der Vue-Anwndung und starten eines Webservers
```
npm run serve
```

## Aufbau einer Vue-App
* App.vue (root component)
* package.json (config der installierten Packages)
* src/
  * components/
    * Component.vue (weitere components)
    * Component2.vue (usw.)
  * assets/
    * img.png (weitere Ressourcen, wie z.B Bilder)
* babel.config.js (Config für Babel <https://babeljs.io/>)
* node_modules/ (weitere installierte Module - z.B bootstrap)

## Store einbinden
Wird als eigene store.js angelegt
```js
import { daten } from "./seed.js";
import { reactive, readonly } from "vue";

// binde state in das reactivity-system von Vue ein mittels der importierten Funktion reactive()
const state = reactive({
  daten,
});

const getters = {
  functionName: function() {},
};

const mutations = {
  functionName: function() {},
};

export default {
  // mache state nur lesend mit der Funktion readonly()
  state: readonly(state), 
  getters,
  mutations,
};
```
und kann dann in die Component importiert werden
```js 
import Store from "../store";
```