const express = require('express')
require('./src/db/mongoose')
//models
const User = require('./src/models/user')
const UserRouter = require('./src/routers/user')

const app = express()
const port = process.env.PORT || 3000

app.use(express.json())
app.use(UserRouter)

app.listen(port,()=>{
    console.log('server is up and listening on port, '+ port)
})