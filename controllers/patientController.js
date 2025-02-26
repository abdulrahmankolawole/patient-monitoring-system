const Patient = require("../models/Patient")


const createPatient = async (req, res) => {
    const { email, password } = req.body

    if (!email || !password) {
        return res.status(400).json({msg: 'Please provide email and password'})
    }

    let patient = await Patient.findOne({ email })
    if (patient) return res.json({msg: `Patient with email: ${email} already exists. Please try logging in`});
   
    patient = await Patient.create(req.body)

    const {name, age, heartRates, bloodPressure, status} = patient
    const token = await patient.createJWT()
    return res.status(201).json({ patient: {name, age, heartRates, bloodPressure, status, email}, token })
    

}


const getAllPatient = async (req, res) => {
    const patients = await Patient.find().select("-password")
    return res.status(200).json(patients)
}

const getPatient = async (req, res) => {
    
    const {id} = req.params
    // console.log(req.params)
    const patient = await Patient.findById(id).select('-password')
    console.log(patient)
    if (!patient) {
        return res.status(404).send(`No patient with id: ${id} found`)
    }
    return res.status(200).json(patient)
}


const updatePatient = async (req, res) => {
    const {name, age, heartRates, bloodPressure, status} = req.body
    const {id} = req.params

    const patient = await Patient.findById(id).select('-password')
    if (!patient) {
        return res.status(404).send(`No patient with id: ${id} found`)
    }
    if (name) patient.name = name
    if (age) patient.age = age
    
    if (heartRates) patient.heartRates = [...patient.heartRates, ...heartRates]
    if (bloodPressure) patient.bloodPressure = bloodPressure
    if (status) patient.status = status
    patient.save()
    return res.status(200).json(patient)
}

const deletePatient = async (req, res) => {
    const {id} = req.params
    const patient = await Patient.findByIdAndDelete(id)
    if (!patient) {
        return res.status(404).send(`No patient with id: ${id} found`)
    }
    return res.status(204).send()
}

// Endpoint to simulate real-time updates
const getPatientVitals = async (req, res) => {
    const {id} = req.params
  
    const interval = setInterval(async () => {
        const heartRate = Math.floor(Math.random() * (100 - 60 + 1)) + 60; // Random heart rate between 60 and 100
    
        const patient = await Patient.findById(id);

        if (!patient) {
            return res.status(404).send(`No patient with id: ${id} found`)
        }
        patient.heartRates.push(heartRate)
        patient.save()
    
        // Send updated vitals to the client
        console.log(`data: { heartRate: ${heartRate}}\n`);
        res.write(`data: { heartRate: ${heartRate}}\n`)
    }, 2000);
      
      
  
    // Clear interval when the client disconnects
    req.on('close', () => {
      clearInterval(interval);
    });
}


module.exports = {createPatient, getAllPatient, getPatient, updatePatient, deletePatient, getPatientVitals}