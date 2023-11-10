import React from 'react'
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { clearVideoGameDetail, getVideoGamesById } from '../../redux/actions/actions';

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

  return (
    <div>
      <h3>{gameDetail.name}</h3>
      <h6>ID: {id}</h6>
      <img src={gameDetail.image}></img>
      <h4>{gameDetail.platforms}</h4>
      <h4>{gameDetail.releasedate}</h4>
      <h4>{gameDetail.rating}</h4>
      <h4>{gameDetail.description}</h4>
    </div>
  )
}

export default Detail