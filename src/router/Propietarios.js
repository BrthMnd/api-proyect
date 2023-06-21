const express = require('express');
const routes = express.Router()
const mysql = require('../BD/db');

routes.get('/', (req, res) => {
    const sql = 'SELECT * FROM propietario'
    mysql.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
        } else {
            res.send('No hay datos')
        }
    })
})


routes.get('/:id', (req, res) => {
    const id = req.params.id
    const sql = `SELECT * FROM propietario WHERE id = ${id}`

    mysql.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
        } else {
            res.send('No hay datos')
        }
    })
})


routes.post('/', (req, res) => {
    const sql = 'INSERT INTO propietario SET ?'
    const Arreglo =
        {
            id,
            Numero_Identificacion_D,
            Nombres,
            Apellidos,
            TelefonoUCelular
        } = req.body

    mysql.query(sql, Arreglo, error => {
        if (error) throw error;
        res.send("Agregado exitosamente")
    })
})



routes.put('/:id', (req, res) => {

    const { Numero_Identificacion_D, Nombres, Apellidos, TelefonoUCelular } = req.body
    const id = req.params.id
    const sql = `UPDATE propietario SET Numero_Identificacion_D='${Numero_Identificacion_D}', Nombres = '${Nombres}', Apellidos = '${Apellidos}', TelefonoUCelular = '${TelefonoUCelular}' WHERE id = ${id}`
    mysql.query(sql, error => {
        if (error) throw error
        res.send("Actualizado exitosamente")
    })
})


routes.delete('/:id', (req, res) => {
    const id = req.params.id
    const sql = `DELETE FROM propietario WHERE id = ${id}`;

    mysql.query(sql, error => {
        if (error) throw error
        res.send("Eliminado exitosamente")
    })
})

module.exports = routes