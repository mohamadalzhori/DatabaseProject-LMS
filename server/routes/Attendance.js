const express = require("express");
const router = express.Router();
const {Attendence, Students} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await Attendence.findAll());
});

router.post('/', async (req, res)=>{
    try{
        await Attendence.create(req.body);
        res.json(req.body);

    }catch(error){
        console.error(error);
        res.status(500).json({ error: 'Internal server error' });
    }
    
});


// router.post('/', async (req, res)=>{
//     try{
//         const {username, status} = req.body;
        
//         const student = await Students.findOne({
//             where: {
//               username
//             }
//           });

//         const attend = await Attendence.create({
//             status,
//             student_id: student.id ,
//         });

//         res.json(attend);

//     }catch(error){
//         console.error(error);
//         res.status(500).json({ error: 'Internal server error' });
//     }
    
// });






module.exports = router;