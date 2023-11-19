import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getGenres, getVideoGames, postVideogame } from '../../redux/actions/actions';
import Validation from './Validation';
import Navbar from '../../components/navbar/Navbar';
import styles from "./Create.module.css";

const Form = () => {

  useEffect(() => {
    dispatch(getGenres());
    dispatch(getVideoGames());
  }, [])

  const dispatch = useDispatch();

  const allGenres = useSelector(state => state.allGenres);
  const allPlatforms = useSelector(state => state.allPlatforms);


  const [gameData, setGameData] = useState({
    name: '',
    description: '',
    platforms: [],
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
  }

  useEffect(() => {
    setErrors(Validation(gameData));
  }, [gameData]);

  const handleCheckbox = (e) => {
    if (e.target.name === "genres") {
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
    if (e.target.name === "platforms") {
      if (e.target.checked) {
        setGameData({
          ...gameData,
          platforms: [...gameData.platforms, e.target.value]
        })
        setErrors(
          Validation({
            ...gameData,
            platforms: [...gameData.platforms, e.target.value]
          })
        )
      } else {
        setGameData({
          ...gameData,
          platforms: gameData.platforms.filter((p) => p !== e.target.value)
        });
        setErrors(
          Validation({
            ...gameData,
            platforms: gameData.platforms.filter((p) => p !== e.target.value)
          })
        )
      }
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
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <Navbar></Navbar>
      </div>

      <form className={styles.form}>
        <h1 className={styles.title}>Create Videogame</h1>
        <label className={styles.title} htmlFor="name">Name</label>
        <input onChange={handleChange} value={gameData.name} name='name' id="name"></input>
        <br></br>
        <p className={styles.danger}>{errors.name ? errors.name : null}</p>

        <label htmlFor="description" className={styles.title}>Description</label>
        <input onChange={handleChange} value={gameData.description} name='description' id="description"></input>
        <br></br>
        <p className={styles.danger}>{errors.description ? errors.description : null}</p>


        <label htmlFor="platforms" className={styles.title}>Platforms</label>
        {allPlatforms.map((p) => (
          <div key={p}>
            <input type='checkbox' name='platforms' value={p}
            onChange={handleCheckbox} checked={gameData.platforms.includes(p)}
            id={p}
            >
            </input>
            <label htmlFor={p}>{p}</label>
          </div>
        ))}
        <br></br>
        <p className={styles.danger}>{errors.platforms ? errors.platforms : null}</p>


        <label htmlFor="image" className={styles.title}>Image</label>
        <input onChange={handleChange} value={gameData.image} name='image' id="image"></input>
        <br></br>
        <p className={styles.danger}>{errors.image ? errors.image : null}</p>


        <label htmlFor="releasedate" className={styles.title}>Release Date</label>
        <input onChange={handleChange} value={gameData.releasedate} name='releasedate' id="releasedate"></input>
        <br></br>
        <p className={styles.danger}>{errors.releasedate ? errors.releasedate : null}</p>

        <label htmlFor="rating" className={styles.title}>Rating</label>
        <input onChange={handleChange} value={gameData.rating} name='rating' id="rating"></input>
        <br></br>
        <p className={styles.danger}>{errors.rating ? errors.rating : null}</p>

        <label className={styles.title}>Genres</label>
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
        <p className={styles.danger}>{errors.genres ? errors.genres : null}</p>

        <button className={styles.button} type='submit' onClick={handleSubmit} disabled={(Object.keys(errors).length > 0) ? true : false}>POST</button>
      </form>
    </div>
  )
}

export default Form