<script>
export default {
  name: "ObjectElement",
  props: ["value", "_key"],
  data() {
    return {
      //defaultClass: "border-b border-s border-opacity-50 my-1 py-1 ps-2",
      defaultClass: "border border-opacity-25 ms-1 mb-1 mt-1 me-0 ps-1 pb-1 pt-1 pe-0",
      colorMapping: {
        number: "text-green",
        string: "text-blue",
        boolean: "text-red",
        null: "text-grey",
        function: "text-pink",
        default: "text-white",
      },
    };
  },
  methods: {
    hideChildren(event) {
      event.stopPropagation(); // Stop the event from propagating further
      // Toggle visibility of children elements
      const element = event.currentTarget;
      element.querySelectorAll("div").forEach((child) => {
        if (child !== element) {
          child.classList.toggle("hidden");
        }
      });
    },
  },
};
</script>

<template>
  <div>
    <div
      @click="hideChildren($event)"
      :class="`${defaultClass} ${colorMapping['default']}`"
      v-if="value !== null && typeof value === 'object' && Object.keys(value).length > 0">
      {{ _key }}
      <object-element
        :class="defaultClass"
        v-for="(value1, key1) in value"
        :_key="key1"
        :value="value1"></object-element>
    </div>
    <!-- Render null values -->
    <div :class="defaultClass" v-else-if="value === null">
      {{ _key }}
      <span :class="colorMapping['null']">null</span>
    </div>
    <!-- Render undefined values-->
    <div :class="defaultClass" v-else-if="value === undefined">
      {{ _key }}
      <span :class="colorMapping['null']">undefined</span>
    </div>
    <!-- Render empty arrays -->
    <div :class="defaultClass" v-else-if="Array.isArray(value) && value.length === 0">
      {{ _key }}
      <span :class="colorMapping['null']">[]</span>
    </div>
    <!-- Render empty objects -->
    <div :class="defaultClass" v-else-if="typeof value === 'object' && Object.keys(value).length === 0">
      {{ _key }}
      <span :class="colorMapping['null']">{} (empty object)</span>
    </div>
    <!-- Render primitive values -->
    <div @click="hideChildren($event)" :class="defaultClass" v-else>
      {{ _key }}
      <div :class="defaultClass">
        <div v-if="typeof value === 'string'">
          <span :class="colorMapping['string']">"{{ value }}"</span>
        </div>
        <div v-else-if="typeof value === 'number'">
          <span :class="colorMapping['number']">{{ value }}</span>
        </div>
        <div v-else-if="typeof value === 'boolean'">
          <span :class="colorMapping['boolean']">{{ value }}</span>
        </div>
        <div v-else-if="typeof value === 'function'">
          <span :class="colorMapping['function']">{{ value }}</span>
        </div>
        <div v-else>
          <span :class="colorMapping['default']">{{ value }}</span>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
div {
  width: 99%;
  cursor: pointer;
}

div:hover {
  border-color: white !important;
}

.hidden {
  display: none;
}


</style>
