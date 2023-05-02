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


routes.get('/:Id_propietario', (req, res) => {
    const Id_propietario = req.params.Id_propietario
    const sql = `SELECT * FROM propietario WHERE Id_propietario = ${Id_propietario}`

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
            Id_propietario,
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



routes.put('/:Id_propietario', (req, res) => {

    const { Numero_Identificacion_D, Nombres, Apellidos, TelefonoUCelular } = req.body
    const Id_propietario = req.params.Id_propietario
    const sql = `UPDATE propietario SET Numero_Identificacion_D='${Numero_Identificacion_D}', Nombres = '${Nombres}', Apellidos = '${Apellidos}', TelefonoUCelular = '${TelefonoUCelular}' WHERE Id_propietario = ${Id_propietario}`
    mysql.query(sql, error => {
        if (error) throw error
        res.send("Actualizado exitosamente")
    })
})


routes.delete('/:Id_propietario', (req, res) => {
    const Id_propietario = req.params.Id_propietario
    const sql = `DELETE FROM propietario WHERE Id_propietario = ${Id_propietario}`;

    mysql.query(sql, error => {
        if (error) throw error
        res.send("Eliminado exitosamente")
    })
})

module.exports = routes