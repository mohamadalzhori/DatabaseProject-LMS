const express = require("express");
const router = express.Router();
const { Marks } = require("../models");

// Fetch homeworks by grade ID
router.get('/:gradeId', async (req, res) => {
  const { gradeId } = req.params;

  try {
    const marks = await Marks.findAll({
      where: {  
        grade_id: gradeId },
    });

    res.json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// easy sol for a picky error
router.get('/', async (req, res)=>{
  res.json(await Marks.findAll());
});



router.post('/', async (req, res) => {
  try {
    const marks = await Marks.create(req.body);
    res.json(marks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
