const { Videogame, conn } = require('../../src/db.js');
const chai = require('chai')
const { expect } = require('chai');
const chaiAsPromised = require('chai-as-promised');
const _ = require('lodash');
const assert = require('assert');

chai.use(chaiAsPromised);

const videogame = {
  name: "TEST TEST",
  description: "Test test test test test test test test test test test",
  platforms: [ "PC", "PlayStation 4" ],
  image: "https://test.com.jpg",
  releasedate: "2022-09-02",
  rating: "0"
};

describe('Videogame model', () => {
  before(() => conn.authenticate()
    .catch((err) => {
      console.error('Unable to connect to the database:', err);
    }));
  describe('Validators', () => {
    beforeEach(() => Videogame.sync({ force: true })); // sincroniza la DB antes de todos los test

    describe('name', () => {
      it('should throw an error if name is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.name = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.name cannot be null');
      });
      it ('should throw an error if name is an empty string', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.name = "";
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Name cannot be empty');
      })
      it ('should throw an error if name is shorter than 3 characters', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.name = "Mx";
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Name must be at least 3 characters long');
      })
      it ('should throw an error if name is not a string', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.name = [1, 2];
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'string violation: name cannot be an array or an object');
      })
    });

    describe('description', () => {
      it('should throw an error if description is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.description = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.description cannot be null');
      })
      it('should throw an error if description is shorter than 50 characters', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.description = 'h3G9sL8p2o4A7i1V6e5r0y8o2u1w9a3n4t2o7eH874IhnFRS0';
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Description must be 50 characters or more');
      })
      it ('should throw an error if description is anything else than a string', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.description = {imNotAString: true};
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'string violation: description cannot be an array or an object');
      })
    });

    describe('platforms', () => {
      it('should throw an error if platforms is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.platforms = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.platforms cannot be null');
      })
      it('should throw an error if platforms has no strings inside', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.platforms = [];
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Platforms cannot be an empty array');
      })
      it('should throw an error if platforms has anything other than strings inside', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.platforms = ["PC", "PlayStation 4", 1];
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Each element in platforms must be a string');
      })
    })

    describe('image', () => {
      it('should throw an error if image is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.image = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.image cannot be null');
      })
      it('should throw an error if image is anything but a string', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.image = [];
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'string violation: image cannot be an array or an object');
      })
      it('should throw an error if it is not a valid URL', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.image = "facebook";
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Validation isUrl on image failed');
      })
      it('should throw an error if URL does not have an image extension', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.image = "facebook.com";
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: URL does not point to an actual image');
      })
    })

    describe('releasedate', () => {
      it('should throw an error if releasedate is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.releasedate = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.releasedate cannot be null');
      })
      it('should throw an error if image is anything but a string', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.releasedate = [];
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'string violation: releasedate cannot be an array or an object');
      })
      it('should throw an error if releasedate is not in the valid format', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.releasedate = "29-02-2004";
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Invalid date format. Use YYYY-MM-DD.');
      })
    })

    describe('releasedate', () => {
      it('should throw an error if rating is null', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.rating = null;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'notNull Violation: videogame.rating cannot be null');
      })
      it('should throw an error if rating is higher than 5', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.rating = 6;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Validation max on rating failed');
      })
      it('should throw an error if rating is lower than 0', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.rating = -1;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Validation error: Validation min on rating failed');
      })
      it('should throw an error if rating has more than two decimals', async function() {
        const modifiedVideogame = _.cloneDeep(videogame);
        modifiedVideogame.rating = 4.981;
        await expect(Videogame.create(modifiedVideogame)).to.be.rejectedWith(Error, 'Invalid rating format. Use up to two decimal places');
      })
    })

    describe('valid', () => {
      it('should work when fields are valid', async function() {
        const result = await Videogame.create(videogame);
        assert.ok(result); // el valor es truthy
        assert.ok(result.id); // tiene ID
      });
    })
  });
});
