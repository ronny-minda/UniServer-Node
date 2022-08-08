const express = require('express');
const cors = require('cors');
const fileUpload = require('express-fileupload')

const { dbConnection } = require('../database/config');


class Server {

    constructor (){
        this.app = express();
        this.port = process.env.PORT || 3000

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            usuarios: '/api/usuarios',
            uploads: '/api/uploads'

        }
 

        // conectar a basa de datos
        this.conectarDB();

        //Middlewares es una funcion que siempre va a ejecutarse cdo levantemos nuestro server
        this.middlewares();
        
        //rutas de mi app
        this.routes();
    }

     async conectarDB(){
        //  await dbConnection();
     }

    middlewares(){
        //cors
        this.app.use( cors() ) 

        //Lectura y parseo del body
        this.app.use( express.json() )


        //directorio publico
        this.app.use( express.static('public') )

        //fileupload- carga de archivos
        // this.app.use( fileUpload({
        //     useTempFiles : true,
        //     tempFileDir : '/tmp/',
        //     createParentPath: true
        // }));
    }

    routes(){
        this.app.use( this.paths.auth, require('../routes/auth'));
        this.app.use( this.paths.buscar, require('../routes/buscar'));
        this.app.use( this.paths.categorias, require('../routes/categorias'));
        this.app.use( this.paths.productos, require('../routes/productos'));
        this.app.use( this.paths.usuarios, require('../routes/usuarios'));
        this.app.use( this.paths.uploads, require('../routes/uploads'));
        
    }

    listen(){
        this.app.listen( this.port, () => {
            console.log ('Servidor corriendo en puerto',this.port)
        });
    }
}


module.exports = Server;