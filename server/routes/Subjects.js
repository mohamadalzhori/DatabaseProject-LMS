const express = require("express");
const router = express.Router();
const {Subjects} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await Subjects.findAll());
});

router.post('/', async (req, res)=>{
    await Subjects.create(req.body);
    res.json(req.body);
});


module.exports = router;