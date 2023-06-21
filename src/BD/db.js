const mysql = require('mysql');

const connection = mysql.createConnection({
    port: '3306',
    host: 'bhlkc9q4ftwoeikw2gyi-mysql.services.clever-cloud.com',
    user: 'uhoyl9myesucqlw8',
    database: 'bhlkc9q4ftwoeikw2gyi',
    password: 'Vgr7z0GtFy7Amhd991xp'
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
