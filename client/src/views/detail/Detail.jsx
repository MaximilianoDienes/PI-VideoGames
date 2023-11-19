import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideoGameDetail, getVideoGamesById } from '../../redux/actions/actions';
import Navbar from '../../components/navbar/Navbar';
import styles from "./Detail.module.css"

const Detail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  const gameDetail = useSelector((state) => state.gameDetail);

  useEffect(() => {
    dispatch(getVideoGamesById(id));
    return () => {
      dispatch(clearVideoGameDetail());
    }
  }, [dispatch, id])

  const strippedDescription = gameDetail.description ? gameDetail.description.replace(/<br\s*\/?>/gi, '').replace(/<p\s*\/?>/gi, '').replace(/<\/p\s*\/?>/gi, ''): '';
  return (
    <div className={styles.background}>
      <div className={styles.sidebar}>
        <Navbar></Navbar>
      </div>
      <div className={styles.detailcard}>
        <h1>{gameDetail.name}</h1>
        <div>
          <h6>ID: {id}</h6>
          <h6>{id.includes("-") ? 'CLIENT' : 'API'}</h6>
        </div>
        <img className={styles.image} src={gameDetail.image}></img>
        <div>
          <h4>Platforms: {gameDetail.platforms}</h4>
          <h4>Release date: {gameDetail.releasedate}</h4>
          <h4>Rating: {gameDetail.rating}</h4>
        </div>
        <h4>{strippedDescription}</h4>
      </div>
    </div>
  )
}

export default Detail