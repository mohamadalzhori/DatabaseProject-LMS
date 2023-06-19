const express = require("express");
const router = express.Router();
const {Grades} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await Grades.findAll());
});

router.post('/', async (req, res)=>{
    await Grades.create(req.body);
    res.json(req.body);
});


module.exports = router;