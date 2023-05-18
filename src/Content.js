import React from 'react'
import Team from './Team.js'
import Player from './Player.js'

const Content = ({ isLoading, fetchError, playerTemplate, teamHome, teamGuests  }) => {
  return (
    <>
      {isLoading && <p>Loading content...</p>}
      {fetchError && <p style={{ color: "red" }}>{`Error: ${fetchError}`}</p>}
      {!fetchError && !isLoading &&
        <main className="container">
          <div className="row">
            <div className="col-md-6 teamHome">
              <Player
                player={playerTemplate}
              />
              <Team
                players={teamHome}
              />
            </div>
            <div className="col-md-6 teamGuests">
              <Player
                player={playerTemplate}
              />
              <Team
                players={teamGuests}
              />
            </div>
          </div>
        </main>
      }
    </>
  )
}

export default Content