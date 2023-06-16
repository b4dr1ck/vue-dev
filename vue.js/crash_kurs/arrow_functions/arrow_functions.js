// => normale Funktion
// const square = function (a) {
//   return a * a;
// };
//------------------------------------------------------

// => Arrow-Function
// const square = (a) => {
//   return a * a;
// };
//------------------------------------------------------

// => simplified Arrow-Function
// const square = (a) =>  a * a;
//------------------------------------------------------

// => Unterschied von "this" bei Arrow-Function und normaler Function
const car = {
    model: "A3",
    manufacturer: "Audi",
    // - kurze Schreibweise
    fullname() {
        return `${this.manufacturer} ${this.model}`;
    }
    // - normale Schreibweise
    // fullname: function() {
    //     return `${this.manufacturer} ${this.model}`;
    // }

}
const car2 = {
    model: "A3",
    manufacturer: "Audi",
    fullname: () => {
        return `${this.manufacturer} ${this.model}`;
    }
}
//------------------------------------------------------

// => Ausgabe
console.log(car.fullname());
console.log(car2.fullname());
