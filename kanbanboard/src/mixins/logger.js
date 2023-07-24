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
