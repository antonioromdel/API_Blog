const Article = require("../models/Articles")
const validate = require("../helpers/validatorData")
const fs = require("fs")
const path = require("path")
const getImageById = require("../helpers/getImage")

const createArticle = (req, res) => {

    // Recoger parametros por post a guardar
    let params = req.body;

    // Validar datos
    validate(req, res, params)

    // Crear el objeto a guardar

    const article = new Article(params)

    // Asignar valores a objeto basado en el modelo (manual o automatico)
    // manual
    // article.title = params.title // El problema de hacerlo manual es que si tenemos 50 datos es muy complejo gestionar todos
    // automatico -> se pasa los parametros al Article creado

    // Guardar el artículo en la base de datos

        try{

            article.save()

            return res.status(200).json({
                status: "Succes",
                articulo: article,
                mensaje: "Se ha guardado el articulo"
            })

        } catch (error) {

            return res.status(400).json({
                status: "Error",
                mensaje: "No se ha guardado el articulo"
            })

        }

}

const getArticles = async (req, res) => {

    try{
        let query = await Article.find()

        return res.status(200).send({
            mensaje: "success",
            result: query
        })

    } catch (error) {

        return res.status(404).json({
            status: "error",
            mensaje: "No hay articulos guardados"
        })
    }
}

const getOneArticle = async (req, res) => {

    let id = req.params.id

    try 
    {
        let myQuery = await Article.findById(id)

        return res.status(200).send({
            result: myQuery
        })
    } catch (error) {
        return res.status(404).json({
            status: "Error",
            mensaje: "Articulo no encontrado"
        })
    }

}

const deleteArticle = async (req, res) => {

    let id = req.params.id

    try {

        await Article.deleteOne({_id: id})
        let query = await Article.find()

        return res.status(200).send({
            status: "success",
            mensaje: "Articulo borrado",
            articles: query
        })

    } catch (error) {
        return res.status(404).json({
            status: "Error",
            mensaje: "Articulo no encontrado"
        })

    }
}

const updateArticle = async (req, res) => {

    let id = req.params.id
    let newParams = req.body

    validate(req, res, newParams)

    try {

        await Article.findOneAndUpdate({_id:id}, newParams)

        return res.status(200).send({
            status: "succes",
            mensaje: "Articulo actualizado",
            result: newParams
        })

    } catch (error) {

        return res.status(404).json({
            status: "Error",
            mensaje: "Articulo no encontrado"
    })

    }

}

const upFile = async (req, res) => {

    // Configurar multer
    // Recoger el ficher de imagen subido
    let file = req.file
    let id = req.params.id

    // Nombre del archivo
    let fileName = file.originalname

    let fileSplit = fileName.split("\.")
    let fileExtension = fileSplit[1]
    let extensions = ["png", "jpg", "jpeg", "gif"]

    const checkExtension = extensions.some( e => e === fileExtension)

    if(!checkExtension){

        fs.unlink(file.path, (error) => {

            return res.status(400).json({
                status: "error",
                mensaje: "Error al subir archivo, formato no valido."
            })
        })

    } else {

        await Article.findOneAndUpdate({_id:id}, {image: file.filename})
        let queryArticle = await Article.findById(id)

        return res.status(200).json({
            status: "success",
            mensaje: "Archivo subido correctamente",
            queryArticle        
        })
    }
   
}

const image = (req, res) => {
    let fichero = req.params.fichero
    getImageById(fichero, req, res)

}

const getImageArticle = async (req, res) => {

    let id = req.params.id

    try {

        let query = await Article.findOne({_id:id}, 'image')
        getImageById(query.image, req, res)
        

    } catch (error) {
        return res.status(400).json({
            status: "Error",
            mensaje: "Articulo no encontrado"
        })
    }

}

const searchArticles = async (req, res) => {

    let name = req.params.name

    try{

        let searchingArticles = await Article.find({"$or":[
            {"title": {"$regex": name, "$options": "i"}},
            {"content": {"$regex": name, "$options": "i"}}
        ]}).sort({fecha: -1})

        if(searchingArticles.length > 0){
            return res.status(200).send({
                searchingArticles
            })
        } else {
            return res.status(404).json({
                status: "Error",
                mensaje: "No hay articulos encontrados."
            })
        }

    } catch (error) {

        return res.status(404).json({
            status:"error",
            mensaje:"Articulo no encontrado"

        })

    }

}

module.exports = {
    createArticle,
    getArticles,
    getOneArticle,
    deleteArticle,
    updateArticle,
    upFile,
    image,
    getImageArticle,
    searchArticles
}
