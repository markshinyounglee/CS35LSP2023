const express = require('express');
require('dotenv').config()
const beefRoutes = require('./routes/beef')
const app = express();
const port = 4000;


//middleware
app.use(express.json())

app.use( (req,res, next ) => {
    console.log(req.path, req.method)
    next()
})


//routes
app.use('/api/beef',beefRoutes)


app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
