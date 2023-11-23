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
      defaultValue: () => uuidv4(), // id única
      primaryKey: true, // y es la PK
    },
    name: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        notEmpty: {
          msg: "Name cannot be empty",
        },
        len: {
          args: [3, Infinity],
          msg: 'Name must be at least 3 characters long',
        }
      }
    },
    description: {
      type: DataTypes.TEXT,
      allowNull: false,
      validate: {
        len: {
          args: [50],
          msg: "Description must be 50 characters or more",
        }
      }
    },
    platforms: {
      type: DataTypes.ARRAY(DataTypes.STRING),
      allowNull: false,
      validate: {
      notEmpty: {
        args: true,
        msg: 'Platforms cannot be an empty array',
      },
      isValidStrings(value) {
        if (!Array.isArray(value)) { // valido que sea un array
          throw new Error('Platforms must be an array');
        }
        if (value.length > 0) {
          value.forEach((platform) => {
            if (typeof platform !== 'string') { // y solo puede contener strings!
              throw new Error('Each element in platforms must be a string');
            }
          });
        }
      },
    },
  },
    image: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isUrl: true,
        isValidImageURL: function(value) { // verifico de vuelta que sea http o https, y que tenga una extensión de imagen.
          if (!isValidImageURL(value)) {
            throw new Error('URL does not point to an actual image'); 
          }
        }
      }
    },
    releasedate: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        isValidDateFormat(value) {
          if (!/^\d{4}-\d{2}-\d{2}$/.test(value)) {
            throw new Error('Invalid date format. Use YYYY-MM-DD.');
          }
        }
      }
    },
    rating: {
      type: DataTypes.FLOAT,
      allowNull: false,
      validate: {
        max: 5,
        min: 0,
        isDecimalWithTwoDecimals(value) {
          const decimalRegex = /^\d+(\.\d{1,2})?$/;
          if (!decimalRegex.test(value)) {
            throw new Error('Invalid rating format. Use up to two decimal places');
          }
        } 
      }
    }
  }, {
    timestamps: false
  });
};
