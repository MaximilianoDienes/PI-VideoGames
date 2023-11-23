/* eslint-disable import/no-extraneous-dependencies */
const { expect } = require('chai');
const session = require('supertest-session');
const app = require('../../src/app.js');
const { Videogame, conn } = require('../../src/db.js');

const agent = session(app);

const videogame = {
  name: "TEST TEST",
  description: "Test test test test test test test test test test test",
  platforms: [ "PC", "PlayStation 4" ],
  image: "https://test.com.jpg",
  releasedate: "2022-09-02",
  rating: "0",
  genres: [ 1, 2 ]
};

describe('Videogame routes', () => {
  // conecta a la base de datos
  before(() => conn.authenticate()
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  }));

  // antes de cada test, se sincroniza el modelo de Videogame
  // y se crea un nuevo juego
  beforeEach(() => Videogame.sync({ force: true }));

  describe('GET /videogames', () => {
    it('should get 200 and return Games and Platforms', async function() {
      this.timeout(5000);
      const response = await agent.get('/videogames').expect(200);
      expect(response.body.allGames).to.have.lengthOf.at.least(1);
      expect(response.body.allPlatforms).to.have.lengthOf.at.least(1);

    });
  });

  describe('GET /videogames with name query', () => {
    it ('should get 200 and return expected game', async function() {
      this.timeout(5000);
      const response = await agent.get('/videogames?name=Super%20Mario%20Bros').expect(200);
      expect(response.body).to.be.an('array');
      expect(response.body).to.have.lengthOf.at.least(1);
      expect(response.body[0].name).to.equal('Super Mario Bros.');
    });
  })

  describe('GET /videogames/:id', () => {
    it('should get 200 and return expected game', async function() {
      this.timeout(5000);
      const response = await agent.get('/videogames/3498').expect(200);
      expect(response.body).to.be.an('object');
      expect(response.body.name).to.equal('Grand Theft Auto V');
    })
  })

  describe('GET /genres', () => {
    it('should get 200 and return genres', async function() {
      this.timeout(5000);
      const response = await agent.get('/genres').expect(200);
      expect(response.body).to.be.an("array");
      expect(response.body).to.have.lengthOf.at.least(19);
    })
  })

  describe('POST /videogames', () => {
    it('should get 200 and return created game', async function() {
      this.timeout(5000);
      const response = await agent.post('/videogames').send(videogame).expect(201);
      expect(response.body.name).to.equal(videogame.name);
      expect(response.body.description).to.equal(videogame.description);
    })
  })

  after(async () => {
    await Videogame.destroy({ where: { name: 'TEST TEST' } });
  });
})
