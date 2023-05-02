const express = require('express');
const routes = express.Router()
const mysql = require('../BD/db');

routes.get('/', (req, res) => {
    const sql = 'SELECT * FROM usuarios'
    mysql.query(sql, (error, results) => {
        if (error) throw error
        if (results.length > 0) {
            res.json(results)
        } else {
            res.send('No hay datos')
        }
    })
})


routes.get('/:Id_usuarios', (req, res) => {
    const Id_usuarios = req.params.Id_usuarios
    const sql = `SELECT * FROM usuarios WHERE id = ${Id_usuarios}`

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
    const sql = 'INSERT INTO usuarios SET ?'
    const Arreglo =
        {
            nombre,
            apellido,
            NumeroIdentificacionPersonal,
            telefono,
            direccion,
            fechaRegistro,
            estadoUsuario,
            rol
        } = req.body

    mysql.query(sql, Arreglo, error => {
        if (error) throw error;
        res.send("Agregado exitosamente")
    })
})



routes.put('/:Id_usuarios', (req, res) => {

    const { nombre,
        apellido,
        NumeroIdentificacionPersonal,
        telefono,
        direccion,
        fechaRegistro,
        estadoUsuario,
        rol } = req.body
    const Id_usuarios = req.params.Id_usuarios
    const sql = `UPDATE usuarios SET nombre='${nombre}', apellido = '${apellido}', NumeroIdentificacionPersonal = '${NumeroIdentificacionPersonal}',telefono = '${telefono}',  direccion = '${direccion}', direccion = '${direccion}', fechaRegistro = '${fechaRegistro}', estadoUsuario = '${estadoUsuario}', rol = '${rol}' WHERE id = '${Id_usuarios}'`
    mysql.query(sql, error => {
        if (error) throw error
        res.send("Actualizado exitosamente")
    })
})


routes.delete('/:Id_usuarios', (req, res) => {
    const Id_usuarios = req.params.Id_usuarios
    const sql = `DELETE FROM usuarios WHERE id = ${Id_usuarios}`;

    mysql.query(sql, error => {
        if (error) throw error
        res.send("Eliminado exitosamente")
    })
})

module.exports = routes