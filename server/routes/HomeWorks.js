const express = require("express");
const router = express.Router();
const { HomeWorks } = require("../models");

// Fetch homeworks by grade ID
router.get('/:gradeId', async (req, res) => {
  const { gradeId } = req.params;

  try {
    const homeworks = await HomeWorks.findAll({
      where: {  
        grade_id: gradeId },
    });

    res.json(homeworks);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

// easy sol for a picky error
router.get('/', async (req, res)=>{
  res.json(await HomeWorks.findAll());
});


router.post('/', async (req, res) => {
  try {
    const homework = await HomeWorks.create(req.body);
    res.json(homework);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Internal server error' });
  }
});

module.exports = router;
