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
  emits: [""] // Daten die vom Kind-Component an das Eltern-Component übergeben 
  werden sollen
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

## Life Cycle einer Component

<https://vuejs.org/guide/essentials/lifecycle.html#lifecycle-diagram>

Ein Hook kann in der Component wie folgt defniert werden

```js
mounted() {
  console.log(`Component wurde erstellt`);
}
```

## Component Aufbau

Eine Component erstellen ...
```js
export default {
  name: "ComponentName",
};
```
... und in einer andere Component importieren 
(in diesem Fall in die App-Component)
```js
import ComponentName from "./components/ComponentName.vue";

export default {
  name: "App",
  components: {
    ComponentName,
  },
};

```
## Daten an Child-Component übergeben (props)

In der Elten-Component können die Daten der Child-Component, wie folgt, übergeben werden.
```html
  <!-- statischer Inhalt-->
  <ComponentName title="Hello World" />
  <!-- oder dynamischer Inhalt per v-bind-->
  <ComponentName :title="title" />
```
Welche dann im Child mittels ```props``` entgegen genommen werden...
```js
export default {
  name: "ComponentName",
  props: ["title"],
};
```
...und dann verwendet werden können.
```html
<template>
  <div>
    <h1>{{ title }}</h1>
  </div>
</template>

```
**ACHTUNG: ```props``` sind read-only!**

## Daten an Eltern-Component übergeben (emits)
Wenn Daten an eine Eltern-Componten übergeben werden müssen, muss dies mit Hilfe eines Events geschehen.
Die Kind-Component löst ein Event aus, auf welches das Eltern-Component horcht und dann dessen Daten (Payload) auslesen kann.

Zunächst wird ein Event ausgelöst (z.B ein Click-Event)
```html
 <button @click="submitAnything()">Click Me!</button>
```
Danach muss in den ```methods``` die entsprechende Methode definiert und mittels der Funktion ```$emit(event-name,datenObjekt)``` an die Eltern-Component übergeben (emittet) werden.
```js
  submitAnything() {
    // Custom-Event. Empfohlen wird kebab-case Schreibweise

    // arg1: Event-Name
    // arg2: Payload (beliebig viele Argumente möglich)
    this.$emit("new-event", 1);
  },
```
In den ```emits```-Optionen muss nun das Event, auf welches gelauscht werden soll, angegeben werden.
```js
// kurze Schreibweise
emits: ["new-event"]

// lange Schreibweise
emits: {
  "new-event":(data) => {
    // Validierung
    if (data.length === 0) {
      console.warn("Daten dürfen nicht leer sein")
      return false;
    }
    return true;
  };
}
```
Die Eltern-Component kann mittels Auslösen des Events dann auf den Payload zugreifen, welcher sich im Event-Objekt befindet.
```html
 <ComponentName @new-event="myFunction($event)" />
```
```js
methods: {
  myFunction(data) {
    // in "data" befinden sich nun die Daten die vom Child übergeben wurden.
    // (in diesem Beispiel müsste die dann 1 sein)
    console.log(data)
  }
},
``` 

## Directives
```v-for``` iteriert über ein Array/Object
```js
v-for="(element, index) in myArray"
v-for="(value, key, index) in myObject"
```

```v-if="expression"```zeigt das Element nur an wenn die Expression wahr ist.
Die Else-Bedingung muss immer direkt im nächsten HTML-Element definiert werden.
```js
v-if="expression"  
v-else
v-else-if="expression"
```
```v-show="expression"``` togglet zwischen show und hide, wenn die Expression wahr ist. Das Element wird allerdings immer gerendert.

```v-cloak``` versteckt noch nicht fertig kompilierte Elemente bis sie fretig geladen sind
```css
/*CCS-Code dazu*/
[v-cloak] {
    display: none;
  }
```
```v-bind:attribute``` bindet ein Attribut (z.B scr-Attribut beim ```<img>```) an die Daten.telefonbuch
```js
v-bind:attribute="data"  
:attribut   // Abkürzung
```
Eindeutige ID für ein Element.  <https://v3-migration.vuejs.org/breaking-changes/key-attribute.html>
```js
v-bind:key="uniqueID"       
```
Mit ```v-once``` wird das DOM-Element nur einmal gerendert, auch wenn sich die Daten im Hintergrund noch ändern können.

```v-on:event.modifier``` wird verwendet um einen Event-Listener zu erstellen. $event speichert das Event-Object.
```js
v-on:click="handler(parameter1 ..., $event)"
v-on:keyup.enter="handler()" // mit Event-Modifier
@click // Abkürzung
```
```v-html=data``` gibt Daten als HTML-Text aus. HTML-Tags werden interpretiert.

```v-pre``` wird verwendet um Text  ohne Interpretation ausgegeben

```@[eventname]="submitData"``` -  Argument eines Attribut dynamisch binden

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

## Custom Directives
Man kann auch eigenen Directives erstellen, welche dann im Template ebenfalls wie folgt verwendet werden können:

```html
v-[directive-name]="parameter"
``` 

die Funktionalität des Directives lagert man am Besten in ein eigenes JS-Script in einem Unterverzeichnis ```directives/``` aus.

**Beispiel: Focus auf Input-Element setzen**
```js
/* ./src/directives/focus.js */
export default {
  // arg 1: das aktuelle Element auf den die Directive verwendet wird
  // arg 2: zusätzliche Parameter die der Directive übergeben wurden
  mounted(el, binding) {
    // console.log(binding);
    if ("color" in binding.value) {
      el.addEventListener("focus", function () {
        this.style.borderColor = binding.value.color;
        this.style.borderWidth = "2px";
      });
      el.addEventListener("focusout", function () {
        this.style.borderColor = "";
        this.style.borderWidth = "1px";
      });
    }
    el.focus();
  },
};
```
Dieses Script wird dann in der main.js importiert und dem App in der Config übergeben.
```js
import focus from "./directives/focus";

const app = createApp(App);
app.directive("focus", focus);
app.mount("#app");
```

## Mixins

Um Code wiederverwenden zu können, kann man entsprechende Funktionen in sogenannte Mixnis auslagern.
Man erstellt dazu am Besten ein eigens Verzeichnis ```mixins/``` und erstellt dort das gewünschte Script.

Wenn in einer Component z.B bereits ein Mounted-Hook existiert, wird die Funktionalität vom Mixin gemerged und nicht überschrieben.

```js
/* ./src/mixins/logger.js */
export default {
  mounted() {
    this.writeLogEntry(`${this.$options.name}-Component vollständig geladen.`);
  },
  methods: {
    writeLogEntry(text) {
      console.log(text);
    },
  },
};
```

Eingebunden wird es, ähnlich wie die Custom Directives, global über die main.js

```js
import logger from "./mixins/logger";

const app = createApp(App);
app.mixin(logger);

```
Und kann dann im gesamten Projekt verwendet werden
```js
methods: {
  addTask(task) {
    task.id = Math.random();
    this.tasks.push(task);
    // kommt aus den mixins
    this.writeLogEntry("Neue Aufgabe hinzugefügt");
  },
}
```

Kann natürlich auch lokal für z.B nur eine Component verwendet werden: 
```js
import logger from "./mixins/logger";

export default {
  name: "App",
  mixins: [logger],
}
```

## Spezielle Variablen

```$refs``` kann verwendet werden wenn bei einem HTML-Element ein ref-Attribut gesetzt ist um einen direkt Zugriff auf das DOM-Element zu erlauben.
```html
<p ref=myParagraph>Text</p>
```
```js
console.log(this.$refs.myParagraph);
```
```$event``` wird verwendet wenn man einen Event-Listener aufruft und explizit auf das Event-Objekt zugreifen möchte. (Wenn man z.B auch noch andere Argumente mitgibt)
```html
  <button @click="incrementCounter(amount,$event)">Add Counter</button>
```
```js
  incrementCounter(amount,event) {
    const buttonObject = event.target;
    /*...*/
  }
```

## Provide & Inject

Um Properties an ein Kind direkt zu übergeben (z.B ein "Ur-Enkel") kann man dies mit Provide & Inject machen. So kann man "Prop Drilling" vermeiden.
<https://vuejs.org/guide/components/provide-inject.html#prop-drilling>

Ein Property "providen":
```js
provide() {
  return {
    maxNumberOfChars: 255,
  };
},
```
Das enstprechende Property "injecten":
```js
inject: ["maxNumberOfChars"],
```
**Nachteile**
- das Property ist nicht reaktiv
- man kann nicht auf einem Blick die Quelle des Properties erkennen

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

## Teleport
Man kann gewisse Teile aus dem Template eine Component in eine andere "teleportieren", und zwar wie folgt.

Mit ```to="destination"``` wird angegeben wohin der Teil teleportiert werden soll.
Dazu muss es natürlich ein entsprechendes Element geben.
```html
<teleport to="#settings">
  <select v-model="mode" class="form-select">
    <option value="click">Einfacher Klick</option>
    <option value="dblclick">Doppelklick</option>
  </select>
</teleport>
```

## Dynamische Components

Components können mit ```<component>``` auch dynamisch erstellt werden. Man muss dazu da ```is``` Attribut binden und den Component-Name als Wert angeben.

```<keep-alive>``` sorgt dafür das die Component nicht gelöscht wird wenn sie nicht mehr angezeigt wird. Somit können z.B in Inputfeldern bereits eingetragener Text erhalten bleiben.

```html
  <keep-alive>
    <component :is="componentName" /> 
  </keep-alive>
```

```defineAsyncComponent``` kann dazu verwendet werden um Components asynchronen zu erstellen. Die Component wird erst dann erstellt wenn sie tatsächlich benötigt wird. 

```js
import { defineAsyncComponent } from "vue";

  ComponentName: defineAsyncComponent(() => {
    // muss ein Promise zurückliefern
    return import("./components/ComponentName.vue");
  }),

``` 

## Store einbinden

Ein Store dient zur zentralen Verwaltung der Daten und kann eigens in die App eingebunden werden. Er besteht in der Regel aus:
* state
* getters
* mutations
und wird in einem eigenen JS-File (```store.js```) direkt im src-Verzeichnis erstellt: 

```js
// src/store.js

import { daten } from "./seed.js"; /* Datenquelle */
import { reactive, readonly } from "vue";

// binde state in das Reactivity-System von Vue ein mittels der importierten Funktion reactive()
const state = reactive({
  daten,
});

// Getter-Methoden
const getters = {
  functionName: function() {},
};

// Setter-Mehoden
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

Anschließend kann der Store in die Component, wo er benötigt wird, importiert werden.

```js 
import Store from "@/store";
```

Verwende den Store.

```js
methods: {
  getName() {
    return Store.getters.getName();
  },
}
```

## Vue-App erstellen mittels VUE-CLI
Installieren von VUE-CLI 
```
npm install -g @vue/cli // -g für globale Installation
```
Erstellen einer App
```
vue create <appname>
```
Kompilieren der Vue-Anwndung und starten eines Webservers
```
cd <appnam>

npm run serve
-- oder --
vue serve
```
Die App builden
```
npm run build
-- oder --
vue build
```

## Aufbau einer Vue-App

* node_modules/ (installierte Module - z.B bootstrap)
* package.json (config der installierten Packages)
* dist/ (vorhanden sobald die App mittels *build* gebaut wurde)
* public/
  * index.html
  * favicon.ico
* src/
  * App.vue (root component)
  * components/
    * Component.vue (weitere components)
    * Component2.vue (usw.)
  * assets/
    * img.png (weitere Ressourcen, wie z.B Bilder)
* babel.config.js (Config für Babel <https://babeljs.io/>)

