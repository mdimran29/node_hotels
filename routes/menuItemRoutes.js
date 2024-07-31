const express = require('express');
const router = express.Router();

const MenuItem = require('../models/MenuItem')

router.post('/', async (req, res)=>{
    try{
      const data = req.body;
      const newMenuItem = new MenuItem(data);
      const response = await newMenuItem.save();
      console.log('data saved successfully');
      res.status(200).json(response);
    }
    catch(err){
      console.log('Error saving menu item:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  
  
  
  router.get('/', async (req,res)=>{
    try{
      const data = await MenuItem.find({});
      console.log('data fetched');
      res.status(200).json(data);
    }
    catch(err){
      console.log('Error retrieving menu item:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  router.get('/:tasteType', async(req, res)=>{
    try{
      const tasteType = req.params.tasteType;
      if( tasteType =='sweet' || tasteType =='savory' || tasteType =='spicy'|| tastes =='bitter'){
  
        const response = await MenuItem.find({taste: tasteType});
        console.log('data fetched');
        res.status(200).json(response);
  
      }
      else{
        res.status(404).json({ error: 'invalid taste of dishes' });
      }
    }
    catch(err){
      console.log('Error retrieving person:', err);
      res.status(500).json({ error: 'Internal server error' });
    }
  })
  // comment adding for testing purposes
  module.exports = router;
