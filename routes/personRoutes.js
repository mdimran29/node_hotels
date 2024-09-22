const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // Adjust the path accordingly
const {jwtAuthMiddleware,generateToken} = require('../jwt')
//POST router to add a  person
router.post('/signup', async (req, res) => {
    try {
      const data = req.body; // Assuming the request body contains the person data
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
  
      // Save the new Person document to the database
      const response = await newPerson.save();
      console.log('Data saved successfully');
      const payload = {
        id: response.id,
        username: response.username
      }
      const token = generateToken(payload);
      console.log(JSON.stringify(payload));
      console.log("Token is :", token);

      res.status(200).json({response: response ,token: token });

    } catch (err) {
      if (err.code === 11000) {
         // Duplicate key error
        console.log('Duplicate key error:', err);
        res.status(409).json({ error: 'Duplicate key error' });
      } else {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  router.post('/login', async (req, res) => {
    try {
      // Extract username and password fromm request body 
      const { username, password } = req.body;
      // Find the user  by username
      const user = await Person.findOne({username: username});
      // If user not found or password does not match, return unauthorized error 401
      if (!user || !(await user.comparePassword(password))) {
        return res.status(401).json({ error: 'Invalid username or password' });
      }
      //generate Token
      const payload = {
        id: user.id,
        username: user.username
      }
      
      
      const token = generateToken(payload);
      //resturn token as response
      console.log(JSON.stringify(payload));
      console.log("Token is :", token);
      res.status(200).json({token: token});

    } catch (err) {
      console.error(err);
      res.status(500).json({ error: 'Internal server error' });
    }

  });

  router.get('/profile', jwtAuthMiddleware, async (req, res)=>{
    try{
        const userData = req.user;
        console.log("User Data: ", userData);
        
        const userId = userData.id;
        const user = await Person.findById(userId);

        res.status(200).json({user});
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.get('/' , jwtAuthMiddleware, async(req, res) =>{
    try{
      const response = await Person.find({});
      console.log('data fetched');
      res.status(200).json(response);
    }
    catch(err){
      console.log(err);
      res.status(500).json({ error: 'Internal server error' });
    }
   });



  router.get('/:workType', async(req, res)=>{
    try{
      const workType = req.params.workType;
      if(workType == 'chef' || workType == 'manager' || workType == 'waiter'){
  
        const response = await Person.find({work: workType});
        console.log('data fetched');
        res.status(200).json(response);
  
      }
      else{
        res.status(404).json({ error: 'invalid work type' });
      }
    }
    catch(err){
      console.log('Error retrieving person:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  router.put('/:id', async(req, res)=>{
    try{
      const personId = req.params.id; // Extract the id from the URL parameter
      const updatedPersonData = req.body;// Updated data for the person
      const response = await Person.findByIdAndUpdate(personId, updatedPersonData, {
        new: true, // Return the updated document
        runValidators: true //Run Mongoose Validation

      }); 
      if(!response) {
      return res.status(404).json({ error: 'Person not found' });
      }
      console.log('data updated');
      res.status(200).json(response);
    }
    catch(err){
      console.log('Error updating person:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


  router.delete('/:id',  async(req , res) =>{
    try{
      const personId = req.params.id; // Extract the person's ID from the URL parameter

      // Delete the person from the database using Mongoose's findByIdAndDelete method
      const response = await Person.findByIdAndDelete(personId);
      if(!response) {
        return res.status(404).json({ error: 'Person not found' });
      }
      console.log('data deleted');
      res.status(200).json({message: 'person Deleted Successfully'});
    }
    catch(err){
      console.log('Error deleting person:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })

  module.exports = router;
  