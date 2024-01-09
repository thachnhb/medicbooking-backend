import express from 'express'
import homeController from '../controller/homeController'
import userController from '../controller/userController'
import doctorController from '../controller/doctorController'
import patientController from '../controller/patientController'
import specialtyController from '../controller/specialtyController'
import clinicController from '../controller/clinicController'
// import { authJwt } from '../middleware/authJwt'
// import { verifyToken, isAdmin, isDoctor, isDoctorOrAdmin } from '../middleware/authJwt'

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.getAllUser)
    return app.use('/', router)
}
export default initWebRoute
