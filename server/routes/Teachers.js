const express = require("express");
const router = express.Router();
const {Teachers} = require("../models");
const bcrypt = require('bcrypt');
const {sign} = require ("jsonwebtoken");


router.post('/', async (req, res) => {
    const { username, password } = req.body;
    bcrypt.hash(password, 10).then((hash) => {
      Teachers.create({
        username: username,
        password: hash,
      }).then(() => {
        res.json('success');
      });
    });
  });
  

router.post('/login', async (req, res) => {
    const { username, password } = req.body;
  
    const user = await Teachers.findOne({ where: { username: username } });
  
    if (!user) {
      return res.json({ error: "User doesn't exist" });
    }
  
    bcrypt.compare(password, user.password).then((match) => {
      if (!match) {
        return res.json({ error: "Wrong Username and Password Combination" });
      }
      
      const accessToken = sign({username: user.username, id: user.id}, "importantsecret");
      const teacherData = {
        accessToken: accessToken,
        username: user.username, // Assuming you have a 'username' property in the 'teachers' model
      };
  
      res.json(teacherData);
    });
  });
  


module.exports = router;