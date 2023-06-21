const mysql = require('mysql');

const connection = mysql.createConnection({
    port: '21518',
    host: 'bfkcx6cfxz485dhjdtev-mysql.services.clever-cloud.com',
    user: 'uhmp2kzulzslkrjp',
    database: 'bfkcx6cfxz485dhjdtev',
    password: 'OKKoynkYWTwMVlNzNcJ'
});
// const connection = mysql.createConnection({
//     host: 'localhost',
//     user: 'root',
//     database: 'rcservicedb',
//     password: ''
// });

connection.connect((error) => {
    if (error) {
        throw error;
    } else {
        console.log("Conexión exitosa a la base de datos");
    }
});
module.exports = connection;
