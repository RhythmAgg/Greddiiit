require('dotenv').config()
require('express-async-errors')
const express = require('express')
const app = express()
const path = require('path')
const cookieParser = require('cookie-parser')
const cors = require('cors')
const corsOptions = require('./config/corsOptions')
const connectDB = require('./config/dbConn')
const mongoose = require('mongoose')
const PORT = process.env.PORT || 3500

connectDB()

app.use(cors(corsOptions))

app.use(express.json())

app.use(cookieParser())

app.use(express.static(path.join(__dirname,'./public')))


app.use('/register', require('./routes/registerRoutes'));

app.use('/login', require('./routes/authRoutes'));

app.use('/user', require('./routes/userRoutes'));

app.use('/mySubGreddiiit', require('./routes/mySubGreddiiitRoutes'));

app.use('/allSubGreddiiit', require('./routes/allSubGreddiiitRoutes'));

app.use('/follo', require('./routes/folloRoutes'));

app.use('/SubGreddiiitPage', require('./routes/SubGreddiiitPageRoutes'));



app.use(express.urlencoded({extended:false}));




mongoose.connection.once('open', () => {
    console.log('Connected to MongoDB')
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`))
})

// mongoose.connection.on('error', err => {
//     console.log(err)
//     logEvents(`${err.no}: ${err.code}\t${err.syscall}\t${err.hostname}`, 'mongoErrLog.log')
// })