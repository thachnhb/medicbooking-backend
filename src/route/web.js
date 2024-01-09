import express from 'express'
import homeController from '../controllers/homeController'
// import userController from '../controller/userController'
// import doctorController from '../controller/doctorController'
// import patientController from '../controller/patientController'
// import specialtyController from '../controller/specialtyController'
// import clinicController from '../controller/clinicController'
// import { authJwt } from '../middleware/authJwt'
// import { verifyToken, isAdmin, isDoctor, isDoctorOrAdmin } from '../middleware/authJwt'

let router = express.Router()

const initWebRoute = (app) => {
    router.get('/', homeController.getHomepage)
    router.get('/crud', homeController.getCRUD)
    router.post('/post-crud', homeController.postCRUD)
    router.get('/get-crud', homeController.getAllUser)
    // router.post('/api/login', userController.handleLogin);
    // router.get('/api/allcode', userController.getAllCode);
    // router.get('/api/top-doctor-home', doctorController.getTopDoctorHome);
    // router.get('/api/get-detail-doctor-by-id', doctorController.getDetailDoctorById);
    // router.get('/api/get-schedule-doctor-by-date', doctorController.getScheduleByDate);
    // router.get('/api/get-extra-infor-doctor-by-id', doctorController.getExtraInforDoctorById);
    // router.get('/api/get-profile-doctor-by-id', doctorController.getProfileDoctorById);
    // router.post('/api/patient-book-appointment', patientController.postBookAppointment);
    // router.post('/api/verify-book-appointment', patientController.postVerifyBookAppointment);
    // router.get('/api/get-specialty', specialtyController.getAllSpecialty);
    // router.get('/api/get-detail-specialty-by-id', specialtyController.getDetailSpecialtyById);
    // router.get('/api/get-clinic', clinicController.getAllClinic);
    // router.get('/api/get-detail-clinic-by-id', clinicController.getDetailClinicById);
    // router.put('/api/edit-user', userController.handleEditUser);
    // router.post('/api/save-infor-doctors', doctorController.postInforDoctor);
    // router.post('/api/bulk-create-schedule', doctorController.bulkCreateSchedule);

    return app.use('/', router)
}
export default initWebRoute
