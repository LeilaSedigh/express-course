class FileController {
    upload(req, res) {
        console.log(req.file)
        res.json(req.file.path.split("\\").splice(1).join("/"));
    }
}


export default new FileController()