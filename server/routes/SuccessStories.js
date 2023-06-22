const express = require("express");
const router = express.Router();
const {SuccessStories} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await SuccessStories.findAll());
});

router.post('/', async (req, res)=>{
    await SuccessStories.create(req.body);
    res.json(req.body);
});


module.exports = router;