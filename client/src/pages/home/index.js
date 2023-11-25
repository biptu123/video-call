import React from 'react';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router-dom';
import { encrypt} from '../../utils/cryptoUtils';

const Home = () => {
  const navigate = useNavigate();

  const handleStartRoom = async () => {
    const channelName = 'main';
    const uid = 0;

    try {
      const response = await fetch('http://localhost:5000/create-channel', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ channelName, uid }),
      });

      if (!response.ok) {
        throw new Error(`Request failed with status ${response.status}`);
      }

      const json = await response.json();
      const encryptedData = encrypt(json);

      console.log(json, encryptedData);

      const encodedLink = encodeURIComponent(encryptedData);
      navigate(`/room/${encodedLink}`);
      
    } catch (error) {
      console.error('Error in handleStartRoom:', error.message);
    }
  };

  return (
    <div>
      <h1>Video Chat App</h1>
      <Button variant="contained" color="primary" onClick={handleStartRoom}>
        Start Room
      </Button>
    </div>
  );
};

export default Home;
