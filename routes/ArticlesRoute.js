const {Router} = require("express")
const router = Router()
const multer = require("multer")

const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "./images")
    },
    filename: function (req, file, cb) {
        cb(null, "articulo" + Date.now() + file.originalname)
    }
})

const uploaded = multer({storage:storage})

// Cargar controlador
const articleController = require("../controllers/ArticleController")

router.post("/createArticle", articleController.createArticle)
router.get("/getArticles", articleController.getArticles)
router.get("/getOneArticle/:id", articleController.getOneArticle)
router.delete("/deleteArticle/:id", articleController.deleteArticle)
router.put("/updateArticle/:id", articleController.updateArticle)
router.post("/upFile/:id", [uploaded.single("file")], articleController.upFile)
router.get("/image/:fichero", articleController.image)
router.get("/getImageArticle/:id", articleController.getImageArticle)
router.get("/search/:name", articleController.searchArticles)

module.exports = router
