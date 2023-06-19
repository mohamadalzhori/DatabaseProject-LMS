const express = require("express");
const router = express.Router();
const {Students} = require("../models");
const bcrypt = require('bcrypt');

const {sign} = require ("jsonwebtoken");

router.post('/', async (req, res) => {
    const { username, password, grade } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Students.create({
        username: username,
        password: hash,
        grade: grade,
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
        name: user.username, // Assuming you have a 'name' property in the 'Students' model
        grade: user.grade // Assuming you have a 'grade' property in the 'Students' model
      };
  
      res.json(studentData);
    });
  });
  


module.exports = router;