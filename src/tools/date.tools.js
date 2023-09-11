// Aqui va los datos en espesifico
const date = new Date();
const fecha = date.toLocaleDateString();
const hours = date.toLocaleTimeString();
const FechaActual = fecha + " | " + hours;
console.log(FechaActual);

module.exports = {
  FechaActual,
};
