const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

module.exports = (sequelize) => {
  const UserCreation = sequelize.define('UserCreation', {
    id: {
      type: DataTypes.UUID,
      defaultValue: uuidv4,
      primaryKey: true
    },
    userId: {
      type: DataTypes.UUID,
      allowNull: false,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    image: {
      type: DataTypes.STRING,
      allowNull: true,
    },
    ingredients: {
      type: DataTypes.JSON,
      // type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
    },
    instruction: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    nutrientValue: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    isFavorite: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
    }
  });

  // Define associations
  UserCreation.associate = (models) => {
    // A UserCreation belongs to a User
    UserCreation.belongsTo(models.User, {
      foreignKey: 'userId', // The foreign key in the UserCreation table
      as: 'user', // Alias for the relation
    });
  };


  return UserCreation;
};
