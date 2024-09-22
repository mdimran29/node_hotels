const express = require('express')
const app = express(); 
const db = require('./db');
require('dotenv').config();
const passport = require('./Auth');

const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body
const PORT = process.env.PORT || 3000;

//Middleware Function
const logRequest = (req , res , next)=>{
  console.log(`[${new Date().toLocalString}] Request Made to :  ${req.originalUrl}`);
  next(); // Move on to the next phase
  
}
app.use(logRequest);



app.use(passport.initialize());
const localAuthMiddleware = passport.authenticate('local', {session: false })
app.get('/',localAuthMiddleware,function (req, res) {
  res.send('welcome to our Hotel')
})



// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

// Use the router middleware for the '/person' route
app.use('/person', personRoutes);
app.use('/menu',localAuthMiddleware, menuItemRoutes);

app.listen(PORT, ()=>{
    console.log('Server is running on port 3000');//log message when server is running
})