const express = require("express");
const router = express.Router();
const {Students} = require("../models");
const bcrypt = require('bcrypt');

const {sign} = require ("jsonwebtoken");

router.get('/',async (req,res)=>{
    res.json(await Students.findAll());
});

router.put('/', async (req, res) => {
  const { username, points } = req.body;
  
  try {
    // Find the student with the provided username in the Students table
    const student = await Students.findOne({ where: { username } });

    if (student) {
      // Update the points value of the found student
      student.points = points;
      await student.save(); // Save the changes to the database

      res.status(200).json({ message: 'Points updated successfully.' });
    } else {
      res.status(404).json({ error: 'Student not found.' });
    }
  } catch (error) {
    console.error('Error updating points:', error);
    res.status(500).json({ error: 'An internal server error occurred.' });
  }
});


router.post('/', async (req, res) => {
    const { username, password, points, grade_id } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Students.create({
        username,
        password: hash,
        points,
        grade_id,
      }).then(() => {
        res.json('success');
      });
    });
  });
  

router.post('/login', async (req, res) => {
    const { username, password} = req.body;
  
    const user = await Students.findOne({ where: { username: username } });
  
    if (!user) {
      return res.json({ error: "User doesn't exist" });
    }
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.json({ error: "Wrong Username and Password Combination" });
      }
      const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
      const studentData = {
        accessToken: accessToken,
        username: user.username, // Assuming you have a 'name' property in the 'Students' model
        grade: user.grade // Assuming you have a 'grade' property in the 'Students' model
      };
  
      res.json(studentData);
    });
  });
  


module.exports = router;