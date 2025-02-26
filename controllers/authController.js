const Patient = require('../models/Patient')

const login = async (req, res) => {
    const { email, password } = req.body
    if (!email || !password) {
        return res.status(401).json({msg: 'Please provide email and password'})
    }
    const patient = await Patient.findOne({ email })

    if (!patient) {
        return res.status(404).json({msg: 'Invalid credentials. Please check email or password'})
    }
    const isCorrect = await patient.comparePasswords(password)
    if (!isCorrect) {
        return res.status(401).json('Invalid Credentials. Please check email or password')
    }
    const token = await patient.createJWT()
    res.status(200).json({ patient: patient.email, token })
}


module.exports = login