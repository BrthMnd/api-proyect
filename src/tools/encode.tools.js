function EncodeToken(token) {
  const tokenConPorcentaje = token.replace(/\./g, "rcservice");
  return tokenConPorcentaje;
}
function DecodeToken(token) {
  const tokenConPuntos = token.replace(/rcservice/g, ".");
  return tokenConPuntos;
}
module.exports = {
  EncodeToken,
  DecodeToken,
};
