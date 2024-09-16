const mongoose = require('mongoose')

const connect = async () => {

    try {
        const url = "mongodb://localhost:27017/mi_blog"
        await mongoose.connect(url)

        // Parametros dentro de objeto // solo en caso de aviso
        //useNewUrlParser: true
        // useUnifiedTopology: true
        // use CreateIndex: true

        console.log("Conectado correctamente a la base de datos mi_blog")

    } catch (error) {
        throw new Error("No se ha podido conectar a la base de datos")
    }

}

module.exports = {
    connect
}