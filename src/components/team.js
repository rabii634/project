import axios from 'axios';
import React, { useState, useEffect } from 'react';
const TeamsTable = () => {
    const [teamsData, setTeamsData] = useState([]);
    const [selectedTeamId, setSelectedTeamId] = useState(null);
    const [playersData, setPlayersData] = useState([]);
  
    useEffect(() => {
      const fetchTeamsData = async () => {
        try {
          const response = await axios.get('http://localhost:4044/api/team/list');
          setTeamsData(response.data);
        } catch (error) {
          console.error('Error fetching teams data:', error);
        }
      };
  
      fetchTeamsData();
    }, []);
  
    const fetchPlayersData = async (teamId) => {
      try {
        // Fetch the team by ID
        const response = await axios.get(`http://localhost:4044/api/team/getById/${teamId}`);
        // Assuming the response contains a team object that has a 'players' array
        const players = response.data.players;
        
        setPlayersData(players);
        setSelectedTeamId(teamId); // Keep track of which team's players are being displayed
      } catch (error) {
        console.error('Error fetching players data:', error);
      }
    };
    
const styles = {
    table: {
      width: '100%',
      borderCollapse: 'collapse',
      marginTop: '20px',
    },
    th: {
      border: '1px solid #ddd',
      padding: '8px',
      backgroundColor: '#f2f2f2',
      color: 'black',
    },
    td: {
      border: '1px solid #ddd',
      padding: '8px',
      textAlign: 'center',
    },
    tr: {
      ':hover': {
        backgroundColor: '#e2e2e2',
      }
    }
  };

  return (
    <div>
      <table style={styles.table}>
        <thead>
          <tr>
            <th style={styles.th}>Name</th>
            <th style={styles.th}>City</th>
            <th style={styles.th}>Stadium</th>
            <th style={styles.th}>Players</th>
          </tr>
        </thead>
        <tbody>
          {teamsData.map((team) => (
            <tr key={team.id} style={styles.tr}>
              <td style={styles.td}>{team.name}</td>
              <td style={styles.td}>{team.city}</td>
              <td style={styles.td}>{team.stadium}</td>
              
              <td style={styles.td}>
                <button onClick={() => fetchPlayersData(team.id)}>Show Players</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      {selectedTeamId && (
        <div>
          <h3>Players for Team ID {selectedTeamId}</h3>
          <ul>
            {playersData.map((player) => (
              <li key={player.id}>{player.name}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default TeamsTable;
