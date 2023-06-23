# Ablauf
## Ablaufdiagramm
```
App____
       |
       CalendarEntry
       |
       CalendarSettings
       |
       CalendarWeek___
                      |
                      CalendarDay___
                                    |
                                    CalendarEvent

```
## Ablaufbeschreibung

In der index.html ist das ```<div>``` #app (Wrapper für die gesamte App) definiert.

Danach wird in der ```main.js``` das Vue-Object (```import App from './App.vue'```) importiert, mittels ```createApp()``` die App erstellt, und mit ```mount()``` gemountet.

In der ```App.vue``` befindet sich dann die Root-Component. 
Die ```App.vue``` (bzw. alle Components) ist wie folgt aufgebaut:
- \<template\>
  - das HTML-Template
- \<script\>
  - der gesamte Vue-Code (bzw. JS-Code)
- \<style\>
  - style-sheet für die gesamte App
  - wenn es nur für die eine Componet gültig sein soll, dann ```scoped``` verwenden

In der Root-Component werden dann alle weiteren componets mit dem Import-Statement importiert:
```js
import CalendarWeek from "./components/CalendarWeek.vue";
import CalendarEntry from "./components/CalendarEntry.vue";
import CalendarSettings from "./components/CalendarSettings.vue";
```
und als components eingebunden:
```js
export default {
  name: "App",
  components: {
    CalendarWeek,
    CalendarEntry,
    CalendarSettings,
  },
};
```
In den jew. Components können dann auch noch weitere Components geladen werden.
z.B CalendarWeek hat noch CalendarDay und diese widerum CalendarEvent jew. als Child-Component. (siehe Ablaufdiagramm oben)

Die erste Component, welche der Root als Child zur Verfügung steht, ist CalendarWeek.
Diese beinhaltet auch den Import des Stores (store.js), welcher als zentraler "Daten-Speicher" verwendet wird und wie folgt aufgebaut ist.
```js
// der Store liest die seed.js ein
import { calendarWeekData } from "./seed";
import { reactive, readonly } from "vue";

// Daten 
// wir binden hier calendarWeekData (aus dem seed.js) an die state-Konstante
const state = reactive({
  calendarWeekData,
});

// Getter-Methoden um Daten zu lesen
const getters = {};

// Mutations-Methoden um Daten zu manipulieren
const mutations = {};

export default {
  state: readonly(state), 
  getters,
  mutations,
};
```
Somit kann nun in der CalendarWeek auf die Store-Daten zugegriffen werden
```js
// Importiere den Store
import Store from "../store";

// verwende die state-Daten aus dem Store
export default {
  name: "CalendarWeek",
  components: {
    CalendarDay,
  },
  data() {
    return {
      calenderWeekData: Store.state.calendarWeekData,
    };
  },
};
```
Die Daten können dann an eine Child-Component (CalendarDay) weitergegeben werden. 
Mittes ```:attributsname="prop"``` (v-bind:)
```js
<CalendarDay v-for="day in calenderWeekData" :key="day.id" :day="day" />
```
Dieses Property kann dann in der CalendarDay-Component verwendet werden, wenn es mittels ```props: {}``` zur Verfügung gestellt wird.
```js
export default {
  name: "CalendarDay",
  components: {
    CalendarEvent,
  },
  // # Array-Schreibweise: wird nicht empfohlen!
  // props: ["day"],

  // # Object-Schreibweise
  props: {
    day: Object,
  },
}
```
Dort können wir dann auf das Property zugreifen
```html
<strong>{{ day.fullName }}</strong>
```



