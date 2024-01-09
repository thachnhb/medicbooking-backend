import db from '../models/index'
import crudService from '../services/crudService'

let getHomepage = async (req, res) => {
    try {
        let dataUser = await db.User.findAll()
        return res.render('index.ejs', { dataUser: dataUser })
    } catch (error) {
        console.log(error)
    }
}
let getCRUD = async (req, res) => {
    return res.render('crud.ejs')
}

let postCRUD = async (req, res) => {
    let message = await crudService.createNewUser(req.body)
    return res.send('test postCRUD')
}

let getAllUser = async (req, res) => {
    let dataUser = await crudService.getAllUser()
    return res.render('index.ejs', { dataUser: dataUser })
}
module.exports = {
    getHomepage,
    getCRUD,
    postCRUD,
    getAllUser,
    // , getDetailPage, createNewUser, deleteUser, getEditPage, postUpdateUser, getUploadFilePage,
    // handleUploadFile, handleUploadMultipleFiles
}
