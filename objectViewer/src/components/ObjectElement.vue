<script>
export default {
  name: "ObjectElement",
  props: ["value", "_key"],
  data() {
    return {
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
};
</script>

<template>
  <div>
    <div
      :class="`border ma-1 pa-1 ${colorMapping['default']}`"
      v-if="value !== null && typeof value === 'object' && Object.keys(value).length > 0">
      {{ _key }}
      <object-element
        class="border ma-1 pa-1"
        v-for="(value1, key1) in value"
        :_key="key1"
        :value="value1"></object-element>
    </div>
    <!-- Render null values -->
    <div class="border ma-1 pa-1" v-else-if="value === null">
      {{ _key }}
      <span :class="colorMapping['null']">null</span>
    </div>
    <!-- Render undefined values-->
    <div class="border ma-1 pa-1" v-else-if="value === undefined">
      {{ _key }}
      <span :class="colorMapping['null']">undefined</span>
    </div>
    <!-- Render empty arrays -->
    <div class="border ma-1 pa-1" v-else-if="Array.isArray(value) && value.length === 0">
      {{ _key }}
      <span :class="colorMapping['null']">[]</span>
    </div>
    <!-- Render empty objects -->
    <div class="border ma-1 pa-1" v-else-if="typeof value === 'object' && Object.keys(value).length === 0">
      {{ _key }}
      <span :class="colorMapping['null']">{} (empty object)</span>
    </div>
    <!-- Render primitive values -->
    <div class="border ma-1 pa-1" v-else>
      {{ _key }}
      <div class="border ma-1 pa-1">
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
}
</style>
