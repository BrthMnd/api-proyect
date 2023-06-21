const express = require("express");
const router = express.Router();
const db = require("../BD/db");



router.get("/", (req, res) => {
  const sql = "SELECT * FROM inmueble";
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send(result);
  });
});

//get2

router.get('/:id_inmueble', (req, res) => {
  const id_inmueble = req.params.id_inmueble
  const sql = `SELECT * FROM inmueble WHERE id = ${id_inmueble}`

  mysql.query(sql, (error, results) => {
    if (error) throw error
    if (results.length > 0) {
      res.json(results)
    } else {
      res.send('No hay datos')
    }
  })
})

// Insertar un nuevo registro.
router.post("/", (req, res) => {
  const { direccion, tipo, propietarioName, email, estado, documento } = req.body;

  const sql = `INSERT INTO inmueble (direccion, tipo, precio) VALUES ('${direccion}', '${tipo}', '${propietarioName}','${email}', '${estado}', '${documento}')`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send("Registro insertado correctamente");
  });
});

// Actualizar un registro.
router.put("/inmueble/:id", (req, res) => {
  const id = req.params.id;
  const { direccion, tipo, propietarioName, email, estado, documento } = req.body;
  const sql = `UPDATE inmueble SET direccion = '${direccion}', tipo = '${tipo}', precio = '${precio}', propietarioName = '${propietarioName}', email = '${email}', estado = '${estado}', documento = '${documento}', WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send("Registro actualizado correctamente");
  });
});

// Eliminar un registro.
router.delete("/:id", (req, res) => {
  const id = req.params.id;
  const sql = `DELETE FROM inmueble WHERE id = ${id}`;
  db.query(sql, (error, result) => {
    if (error) {
      throw error;
    }
    res.send("Registro eliminado correctamente");
  });
});

module.exports = router;
