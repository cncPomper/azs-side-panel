import { useParams, Link } from "react-router-dom"
import './assets/styles/PlayerStats.css'

const PlayerDetails = ({ teamHome, teamGuests }) => {
  const { id } = useParams();
  let player = '';

  if (parseInt(id, 10) >= 0 && parseInt(id, 10) <= 12) {
    player = teamHome.find(player => (player.id).toString() === id)
  } else {
    player = teamGuests.find(player => (player.id).toString() === id)
  }

  return (
    <main>
      <article className="PlayerStats">
        {
          player &&
          <>
            <h2>Numer czepka: {player.num}</h2>
            <h2>Imię: {player.name}</h2>
            <h2>Nazwisko: {player.surname}</h2>
            <h2>Wykluczenia: {player.exclusions}</h2>
            <h2>Zdobyte bramki: {player.goals}</h2>
            <Link to={`/edit/${player.id}`}><button className="editButton">Edit Player</button></Link>
          </>
        }
        {!player &&
          <>
            <h2>Player not found</h2>
              <p>
                <Link to='/'>Back to Home</Link>
              </p>
          </>
        }
      </article>
    </main>

  )
}

export default PlayerDetails