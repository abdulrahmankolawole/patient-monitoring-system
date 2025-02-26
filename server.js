require('dotenv').config()
require('express-async-errors')
const express = require("express")
const app = express()
const passport = require('passport')
require('./config/passport')(passport)




const connectDB = require("./config/connect")
const notFound  = require('./middleware/not-found')
const errorHandler = require('./middleware/error-handler')

const patientRouter = require("./routers/patientRouter")
const authRouter = require('./routers/authRouter')

app.use(express.json())
app.use(express.urlencoded({ extended: true }));

app.use(express.static('./public'));

app.use("/api/v1/patients", patientRouter)
app.use('/api/v1/auth', authRouter)


app.use(notFound)
app.use(errorHandler)

const PORT = process.env.PORT || 3000


const start = async () => {

    await connectDB(process.env.MONGO_URI)

    app.listen(PORT, ()=> {
        console.log(`Server is listening on PORT: ${PORT}`)
    })
}


start()


