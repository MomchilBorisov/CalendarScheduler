const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const config = require('../config');

const sequelize = new Sequelize(config.development.database, config.development.username, config.development.password, {
    host: config.development.host,
    dialect: config.development.dialect
});

const db = {};

// Load models dynamically
fs.readdirSync(__dirname)
    .filter(file => file !== 'index.js') // Exclude this file
    .forEach(file => {
        const model = require(path.join(__dirname, file))(sequelize, Sequelize);
        db[model.name] = model;
    });

// Apply associations if needed
Object.values(db).forEach(model => {
    if (model.associate) {
        model.associate(db);
    }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;