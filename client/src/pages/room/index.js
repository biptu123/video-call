import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { decrypt} from '../../utils/cryptoUtils';
import VideoCall from '../../components/VideoCall';
import { Button, Grid } from '@material-ui/core';

const Room = () => {
  const  { roomID }  = useParams();
  const decodedLink = decodeURIComponent(roomID);
  const { token, channel, appId } = decrypt(decodedLink);
  const [inCall, setInCall] = useState(false);
  
  return (
      inCall ? < VideoCall setInCall={setInCall} appId={appId} token={token} channelName={channel} />
      :
      <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }}>
        <Grid item xs={6}>
          <div>{ appId }</div>
        </Grid>
        <Grid item xs={6}>
          <div>{ token }</div>
        </Grid>
        <Grid item xs={6}>
          <div>{ channel }</div>
        </Grid>
        <Grid item xs={6}>
          <Button variant='contained' color="primary" onClick={() => setInCall(true)}>Join </Button>
        </Grid>
      </Grid>
  )
};

export default Room;
