import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, postVideogame, getVideoGamesById } from '../../redux/actions/actions';
import Validation from './Validation';

const Form = () => {
  useEffect(() => {
    dispatch(getGenres());
  }, [])

  const dispatch = useDispatch();

  const allGenres = useSelector(state => state.allGenres);

  const [gameData, setGameData] = useState({
    name: '',
    description: '',
    platforms: '',
    image: '',
    releasedate: '',
    rating: '',
    genres: []
  })

  const [errors, setErrors] = useState({})

  const handleChange = (e) => {
    setGameData({
      ...gameData,
      [e.target.name]: e.target.value
    })

    setErrors(Validation({
      ...gameData,
      [e.target.name]: e.target.value})
    ) 
  }

  const handleCheckbox = (e) => {
    const genreId = Number(e.target.value)
    if (e.target.checked) {
      setGameData({
        ...gameData,
        genres: [...gameData.genres, genreId]
      })
      setErrors(
        Validation({
          ...gameData,
          genres: [...gameData.genres, genreId]
        })
      )
    } else {
      setGameData({
        ...gameData,
        genres: gameData.genres.filter((g) => g !== genreId)
      });
      setErrors(
        Validation({
          ...gameData,
          genres: gameData.genres.filter((g) => g !== genreId)
        })
      )
    }
  }

  const handleSubmit = (e) => {
    if (errors.name || errors.description || errors.platforms || errors.image || errors.releasedate || errors.rating || errors.genres) {
      e.preventDefault();
      alert("Verifique los datos ingresados");
    } else {
      dispatch(postVideogame(gameData));
    }
  }

  

  return (
    <div>
      <h1>Este es el form</h1>

      <form>
        <label htmlFor="name">Name</label>
        <input onChange={handleChange} value={gameData.name} name='name' id="name"></input>
        <br></br>
        <p className="danger">{errors.name ? errors.name : null}</p>

        <label htmlFor="description">Description</label>
        <input onChange={handleChange} value={gameData.description} name='description' id="description"></input>
        <br></br>
        <p className="danger">{errors.description ? errors.description : null}</p>


        <label htmlFor="platforms">Platforms</label>
        <input onChange={handleChange} value={gameData.platforms} name='platforms' id="platforms"></input>
        <br></br>
        <p className="danger">{errors.platforms ? errors.platforms : null}</p>


        <label htmlFor="image">Image</label>
        <input onChange={handleChange} value={gameData.image} name='image' id="image"></input>
        <br></br>
        <p className="danger">{errors.image ? errors.image : null}</p>


        <label htmlFor="releasedate">Release Date</label>
        <input onChange={handleChange} value={gameData.releasedate} name='releasedate' id="releasedate"></input>
        <br></br>
        <p className="danger">{errors.releasedate ? errors.releasedate : null}</p>

        <label htmlFor="rating">Rating</label>
        <input onChange={handleChange} value={gameData.rating} name='rating' id="rating"></input>
        <br></br>
        <p className="danger">{errors.rating ? errors.rating : null}</p>

        <label>Genres</label>
        {allGenres.map((g) => (
          <div key={g.id}>
            <input type='checkbox' name='genres' value={g.id}
            onChange={handleCheckbox} checked={gameData.genres.includes(g.id)}
            id={g.id}
            >
            </input>
            <label htmlFor={g.id}>{g.name}</label>
          </div>
        ))}
        <br></br>
        <p className="danger">{errors.genres ? errors.genres : null}</p>

        <button type='submit' onClick={handleSubmit}>POST</button>
      </form>
    </div>
  )
}

export default Form