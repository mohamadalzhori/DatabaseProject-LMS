const express = require("express");
const router = express.Router();
const { Lessons, Subjects } = require("../models");

// Fetch lessons by subject ID and grade ID
router.get('/:gradeId', async (req, res) => {
  const { gradeId } = req.params;

  try {
    const lessons = await Lessons.findAll({
      where: {  
        grade_id: gradeId },
    });

    res.json(lessons);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// easy sol for a picky error
router.get('/', async (req, res)=>{
  res.json(await Lessons.findAll());
});



router.post('/', async (req, res) => {
  try {
    const lesson = await Lessons.create(req.body);
    res.json(lesson);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
