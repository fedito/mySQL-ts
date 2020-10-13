import mysql = require('mysql')


export default class MySQL {

    private static _instance: MySQL;

    cnn: mysql.Connection;
    connected: boolean = false;

    constructor() {
        console.log('Clase inicializada');

        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'newuser',
            password: '1234',
            database: 'mydb'
        });

        this.connectDB();
    };

    public static get instance() {
        return this._instance || ( this._instance = new this());
    }

    static executeQuery (query: string, callback: Function) {

        this.instance.cnn.query(query, (err, results: Object[], fields) => {
            if (err) {
                console.log('Error en query');
                console.log(err);
                return callback(err);
            }

            if (results.length === 0) {
                callback('El registro no existe')
            } else {
                callback(null, results)
            };
        })
    }

    private connectDB() {
        
        this.cnn.connect((err: mysql.MysqlError) => {

        if (err) {
            err.message;
            return;
        };

        this.connected = true;
        console.log('Base de datos online');
        });
    };
}
