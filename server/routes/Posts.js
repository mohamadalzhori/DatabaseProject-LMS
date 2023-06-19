const express = require("express");
const router = express.Router();
const {Posts} = require("../models");

router.get('/', async (req, res)=>{
    res.json(await Posts.findAll());
});

router.post('/', async (req, res)=>{
    await Posts.create(req.body);
    res.json(req.body);
});


module.exports = router;