import React from 'react'
import './assets/styles/player.css'
import { Link } from 'react-router-dom';

const Player = ({ player }) => {

  return (
    <>
      <Link to={`/player/${player.id}`}>
        <div className="player" key={player.id}>
          <div className="num">{player.num}</div>
          <div className="name">{player.name}</div>
          <div className="surname">{player.surname}</div>
          <div className="score">{player.goals}</div>
          <div className="exclusions">{player.exclusions}</div>
        </div>
      </Link>
    </>

  )
}

export default Player;
