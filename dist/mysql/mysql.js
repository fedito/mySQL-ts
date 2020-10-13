"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.connected = false;
        console.log('Clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'newuser',
            password: '1234',
            database: 'mydb'
        });
        this.connectDB();
    }
    ;
    static get instance() {
        return this._instance || (this._instance = new this());
    }
    static executeQuery(query, callback) {
        this.instance.cnn.query(query, (err, results, fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('El registro no existe');
            }
            else {
                callback(null, results);
            }
            ;
        });
    }
    connectDB() {
        this.cnn.connect((err) => {
            if (err) {
                err.message;
                return;
            }
            ;
            this.connected = true;
            console.log('Base de datos online');
        });
    }
    ;
}
exports.default = MySQL;
