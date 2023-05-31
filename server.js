const express = require('express');
require('dotenv').config()
const beefRoutes = require('./routes/beef')
const app = express();
const port = 4000
const mongoose = require('mongoose')



//middleware
app.use(express.json())

app.use( (req,res, next ) => {
    console.log(req.path, req.method)
    next()
})

//routes
app.use('/api/beef',beefRoutes)

//connect to DB
mongoose.connect(process.env.MONG_URI)
  .then(() => {
    //listen for requests once we connect to DB
    app.listen(port, () => {
      console.log(`connected to database and port ${port}`);
    })
  })
  .catch((error) => {
      console.log(error)
      process.exit(1);
  })


