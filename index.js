const { connect } = require("./database/connect") 
const express = require("express")
const cors = require("cors")

// Realizamos la conexion a la base de datos con el método que hemos creado en el archivo connect
connect()

// Creamos el servidor Node
const app = express()
const puerto = "3900"

// Configuramos cors
app.use(cors())

// Convertir body a objeto js
app.use(express.json()) // Recibir datos con content-type app/json
app.use(express.urlencoded({extended:true})) // Recibir datos por form-urlencoded

// Creamos servidor y escuchar peticiones http
app.listen(puerto, () => {
    console.log(`Servidor funcionando en puerto: ${puerto}`)
})

// Creacion de rutas

// Cargamos todas las rutas que tengamos en el archivo articlesRoute.js
const routes = require("./routes/ArticlesRoute")
app.use("/api", routes)

