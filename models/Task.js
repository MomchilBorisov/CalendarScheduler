module.exports = (sequelize, DataTypes) => {
    const Task = sequelize.define('Task', {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true // if you want the id to auto-increme
        },
        title: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        description: {
            type: DataTypes.STRING,
            allowNull: false
        },
        done: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule_start: {
            type: DataTypes.STRING,
            allowNull: false
        },
        schedule_end: {
            type: DataTypes.STRING,
            allowNull: false
        },
        color: {
            type: DataTypes.STRING,
            allowNull: false
        }
    }, {
        // Other model options
        // You can specify additional options here
    });

    return Task;
};