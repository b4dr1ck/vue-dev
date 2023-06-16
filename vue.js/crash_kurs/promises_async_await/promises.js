// => asynce Funktion in JS
// setTimeout(() => {
//   console.log("Hallo, nach 2 Sekunden!");
// }, 2000);

// console.log("Hallo!");
//-----------------------------------------------------

// => Promise
// const greeting = new Promise((resolve, reject) => {
//   setTimeout(() => {
//     console.log("Hallo, nach 2 Sekunden!");
//     resolve("Erledigt!");
//   }, 2000);
// });

// const startGreeting = () => {
//     // then-Block wird aufgerufen, sobald resolve() erreicht wird.
//     greeting.then( (result) => {
//         console.log(result);
//         console.log("Hallo!");
//     // catch-Block wird aufgerufen, sobald reject() aufgerufen wird.
//     }).catch(( ) => {
//         console.log("***ERROR!");
//     })
// };
// -----------------------------------------------------

// => Async/Wait
const greeting = new Promise((resolve, reject) => {
  setTimeout(() => {
    console.log("Hallo, nach 2 Sekunden!");
    resolve("Erledigt!");
  }, 2000);
});

const startGreeting = async () => {
  // try-Block wird aufgerufen, sobald resolve() erreicht wird.
  try {
    const result = await greeting; // Parameter von resolve speichern (result)
    console.log(result);
    console.log("Hallo!");
    // catch-Block wird aufgerufen, sobald reject() erreicht wird.
  } catch (error) {
    console.log(error);
  }
};

startGreeting();
