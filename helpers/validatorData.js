const validator = require("validator")

const validarDatas = (req, res, params) => {
    
    try {
        let validarTitulo = !validator.isEmpty(params.title) && 
                            validator.isLength(params.title, {min:2, max: 220})
        let validarContent = !validator.isEmpty(params.content)

        if(!validarContent || !validarTitulo){
            throw new Error("No se ha validado la informacion")
        }


    } catch (error){
        return res.status(400).json({
            status: "Error",
            mensaje: "Faltan datos por enviar"
        })
    }
}

module.exports = validarDatas