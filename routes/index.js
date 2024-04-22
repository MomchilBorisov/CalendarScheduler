var express = require('express');
var router = express.Router();
var models = require('../models')

/* GET home page. */
router.get('/', async function(req, res, next) {
  try {
    // Fetch all tasks from the database
    let tasks = await models.Task.findAll();

    // Transform each Sequelize model instance into a plain JavaScript object
    tasks = tasks.map(task => task.get({ plain: true }));
    console.log(tasks);
    // Render the view with the fetched tasks
    res.render('index', { tasks });
  } catch (error) {
    // Handle errors
    next(error);
  }
});

module.exports = router;
