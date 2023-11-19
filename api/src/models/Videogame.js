const { DataTypes } = require('sequelize');
const { v4: uuidv4 } = require('uuid');

const isValidImageURL = (value) => {
  const imageExtensions = /\.(jpeg|jpg|png|gif|bmp|tiff|tif|webp|svg)$/i;
  return imageExtensions.test(value);
};

// Exportamos una funcion que define el modelo
// Luego le injectamos la conexion a sequelize.
module.exports = (sequelize) => {
  // defino el modelo
  sequelize.define('videogame', {
    id: {
      type: DataTypes.UUID,
      defaultValue: () => uuidv4(),
      primaryKey: true,
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false
    },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        isValidImageURL: function(value) {
          if (!isValidImageURL(value)) {
            throw new Error('La URL no apunta a una imagen válida');
          }
        }
      }
    },
    releasedate: {
      type: DataTypes.STRING,
      allowNull: false
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,    
      }
    }
  }, {
    timestamps: false
  });
};
