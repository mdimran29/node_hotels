const express = require('express');
const router = express.Router();
const Person = require('../models/Person'); // Adjust the path accordingly

//POST router to add a  person
router.post('/', async (req, res) => {
    try {
      const data = req.body; // Assuming the request body contains the person data
  
      // Create a new Person document using the Mongoose model
      const newPerson = new Person(data);
  
      // Save the new Person document to the database
      const response = await newPerson.save();
      console.log('Data saved successfully');
      res.status(200).json(response);
    } catch (err) {
      if (err.code === 11000) { // Duplicate key error
        console.log('Duplicate key error:', err);
        res.status(409).json({ error: 'Duplicate key error' });
      } else {
        console.log('Error saving person:', err);
        res.status(500).json({ error: 'Internal server error' });
      }
    }
  });

  router.get('/', async(req , res)=>{
    try {
      const data = await Person.find({});
      console.log('data fetched');
      res.status(200).json(data);
    } catch (err) {
      console.log('Error retrieving people:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })


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
  