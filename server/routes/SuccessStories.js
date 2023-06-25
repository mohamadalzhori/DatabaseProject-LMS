const express = require("express");
const router = express.Router();
const {SuccessStories, Students} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await SuccessStories.findAll());
});

router.post('/', async (req, res)=>{
    try{
        const {username, story} = req.body;
        
        const student = await Students.findOne({
            where: {
              username
            }
          });

        const successstory = await SuccessStories.create({
            story,
            student_id: student.id ,
        });

        res.json(successstory);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});


module.exports = router;