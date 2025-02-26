const express = require("express")
const router = express.Router()
const passport = require('passport');

const {createPatient, getAllPatient, getPatient, updatePatient, deletePatient, getPatientVitals} = require('../controllers/patientController')

router.route("").post(createPatient).get(getAllPatient)
router.route("/:id").get(passport.authenticate('jwt', { session: false }), getPatient).put(passport.authenticate('jwt', { session: false }), updatePatient).delete(passport.authenticate('jwt', { session: false }), deletePatient)
router.route("/vitals/:id").get(passport.authenticate('jwt', { session: false }), getPatientVitals)



module.exports = router