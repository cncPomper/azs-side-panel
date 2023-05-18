import React from 'react'
import Player from './Player.js'

const Team = ({ players }) => {
  return (
    <div>
      {players?.map(player =>
        <Player
          key={player.id}
          player={player}
        />
      )}
    </div>
  )
}

export default Team








