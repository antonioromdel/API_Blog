const path = require("path")
const fs = require("fs")

const getImage = (nameFile,req, res) => {
    
    const ruta = "./images/" + nameFile

    fs.access(ruta, (error) => {

        if(!error){
            return res.sendFile(path.resolve(ruta))
        } else {
            return res.status(400).json({
                status: "Error",
                mensaje: "Fichero no existe"
            })
        }
    })

}

module.exports = getImage