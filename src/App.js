import React, { useState, useEffect } from 'react';
import Team from './Team.js';
import './App.css';
import Player from './Player.js';
import apiRequest from './apiRequest.js';
import Header from './Header.js';
import Nav from './Nav.js';
import Content from './Content.js';
import PlayerDetails from './PlayerDetails.js';
import NewPlayer from './NewPlayer.js';
import EditPlayer from './EditPlayer.js';
import { Route, Routes, useNavigate } from 'react-router-dom';
import api from './api/players';

function App() {

  const API_URL = 'http://localhost:8000';

  const [homeTeamName, setHomeTeamName] = useState('players_home')
  const [guestsTeamName, setGuestsTeamName] = useState('players_guests')
  const [teamHome, setTeamHome] = useState([]);
  const [teamGuests, setTeamGuests] = useState([]);
  const [fetchError, setFetchError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [playerTemplate, setPlayerTemplate] = useState({
    num: "Num",
    name: "Imię",
    surname: "Nazwisko",
    exclusions: "W",
    goals: "G"
  })

  const navigate = useNavigate ();

  const [editNum, setEditNum] = useState(0);
  const [editName, setEditName] = useState('');
  const [editSurname, setEditSurname] = useState('');
  const [editGoals, setEditGoals] = useState(0);
  const [editExclusions, setEditExclusions] = useState(0);


  useEffect(() => {
    const fetchTeam = async (teamSide) => {
      try {
        const response = await api.get(`/${teamSide}`);
        if (teamSide === homeTeamName) {
          setTeamHome(response.data)
        } else {
          setTeamGuests(response.data)
        }
      } catch (error) {
        if (error.response) {
           // Not inside 200 response range
          console.log(error.response.data)
          console.log(error.response.status)
          console.log(error.response.headers)
        }
      } finally {
        setIsLoading(false);
      }
    }
    fetchTeam(homeTeamName);
    fetchTeam(guestsTeamName);
  }, [])

  const handleEdit = async (id) => {
    const updatedPlayer = {
      id,
      num: editNum,
      name: editName,
      surname: editSurname,
      goals: editGoals,
      exclusions: editExclusions
    }
    try {
      if (parseInt(id, 10) >= 0 && parseInt(id, 10) <= 12) {
        const response = await api.put(`/${homeTeamName}/${id}`, updatedPlayer);
        setTeamHome(teamHome.map(player => player.id === id ? { ...response.data } : player))
        setEditNum(0);
        setEditName('');
        setEditSurname('');
        setEditGoals(0);
        setEditExclusions(0);
        navigate('/');
      } else {
        const response = await api.put(`/${guestsTeamName}/${id}`, updatedPlayer);
        setTeamGuests(teamGuests.map(player => player.id === id ? { ...response.data } : player))
        setEditNum(0);
        setEditName('');
        setEditSurname('');
        setEditGoals(0);
        setEditExclusions(0);
        navigate('/');
      }

    } catch (error) {

    }
  }


  // useEffect(() => {
  //   const fetchTeam = async (teamSide) => {
  //     try {
  //       const response = await fetch(`${API_URL}/${teamSide}`)
  //       if (!response.ok) throw Error('Did not received expected data');
  //       const listPlayers = await response.json();
  //       if (teamSide === homeTeamName) {
  //         setTeamHome(listPlayers)
  //       } else {
  //         setTeamGuests(listPlayers)
  //       }
  //       setFetchError(null);
  //     } catch (err) {
  //       setFetchError(err.message);
  //     } finally {
  //       setIsLoading(false);
  //     }
  //   }
  //   setTimeout(() => {
  //     (async () => await fetchTeam(homeTeamName))();
  //     (async () => await fetchTeam(guestsTeamName))();
  //   }, 2000)

  // }, [])

  return (
    <div className="App">
      <Header />
      <Nav />
      <Routes >

        <Route exact path='/' element={
          <Content
            isLoading={isLoading}
            fetchError={fetchError}
            playerTemplate={playerTemplate}
            teamHome={teamHome}
            teamGuests={teamGuests}
          />
        }>
        </Route>

        {/* <Route exact path='/player' element={
          <NewPlayer
            // handleSubmit={handleSubmit}
            // playerNum={playerNum}
          />
          }
        >
        </Route> */}

        <Route path="/edit/:id" element={
          <EditPlayer
            teamHome={teamHome}
            teamGuests={teamGuests}
            handleEdit={handleEdit}
            editNum={editNum}
            setEditNum={setEditNum}
            editName={editName}
            setEditName={setEditName}
            editSurname={editSurname}
            setEditSurname={setEditSurname}
            editGoals={editGoals}
            setEditGoals={setEditGoals}
            editExclusions={editExclusions}
            setEditExclusions={setEditExclusions}
          />
          }
        >
        </Route>

        <Route path='/player/:id' element={
          <PlayerDetails
            teamHome={teamHome}
            teamGuests={teamGuests}
          />}>
        </Route>

      </Routes>
    </div>
  );
}

export default App;
