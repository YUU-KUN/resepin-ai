const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
    const User = sequelize.define('User', {
        id: {
            type: DataTypes.UUID,
            defaultValue: uuidv4,
            primaryKey: true
        },
        name: {
            type: DataTypes.STRING,
            allowNull: false,
        },
        email: {
            type: DataTypes.STRING,
            allowNull: false,
            unique: true
        },
        password: {
            type: DataTypes.STRING,
            allowNull: false,
        }
    });

    // Define associations
    User.associate = (models) => {
        // A User can have many UserCreations
        User.hasMany(models.UserCreation, {
            foreignKey: 'userId', // The foreign key in the UserCreation table
            as: 'creations', // Alias for the relation
        });
    };

    return User;
};
