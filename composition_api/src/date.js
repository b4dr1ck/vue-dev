export const useDate = () => {
  var current_date = new Date();
  return (
    current_date.getFullYear() +
    "-" +
    String(current_date.getMonth() + 1).replace(/^(\d{1})$/, "0$1") +
    "-" +
    String(current_date.getDate()).replace(/^(\d{1})$/, "0$1")
  );
};
