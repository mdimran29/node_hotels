const notes = require('./notes.js');
var _= require('lodash');


console.log('server file is available');
var age = notes.age;
var  result = notes.addNumber(age+18, 10);
console.log(age);
console.log('result is now ' + result);


var data = ["person" , "person", 1,2,1,2, 'name', 'age', '2'];
var filter = _.uniq(data);
console.log(filter);

console.log(_.isString('imran'));



//server2.js all remaning part which is copy of that file

 /*const objectToConvert = {
    name: 'John Doe',
    age: 30,
    city: 'New York'
 };
 const json = JSON.stringify(objectToConvert);//convert object to json string
 console.log(json); //print json string
 console.log(typeof json); //print type of json string      
*/


const express = require('express')
const app = express(); 
const db = require('./db');


const bodyParser = require('body-parser');
app.use(bodyParser.json()); //req.body

const MenuItem = require('./models/MenuItem')

app.get('/', (req, res) =>{
  res.send('welcome to our Hotel')
})

 


// app.post('/person', (req, res) =>{
  // const data = req.body //Assuming the request body contains the person data

  // //Create a new Person document using the Mongoose model
  // const newPerson = new Person(data);
  
  // newPerson.save((error, savedperson)=>{
  //   if(error){
  //     console.log('Error saving person:', error);
  //     res.status(500).json({error: 'Internal server error'})

  //   }
  //   else{
  //     console.log('data saved successfully');
  //     res.status(200).json(savedPerson)
  //   }
  // })

// })



  // Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes')

// Use the router middleware for the '/person' route
app.use('/person', personRoutes)
app.use('/menu', menuItemRoutes)

app.listen(3000, ()=>{
    console.log('Server is running on port 3000');//log message when server is running
})