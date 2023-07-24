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
