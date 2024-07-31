
const express = require('express')
const app = express(); 
const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const MenuItem = require('./models/MenuItem')

app.get('/', (req, res) =>{
  res.send('welcome to our Hotel')
})

 

  // Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

// Use the router middleware for the '/person' route
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');//log message when server is running
})