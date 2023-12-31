import { Grid, Button } from '@material-ui/core';
import MicIcon from '@material-ui/icons/Mic';
import MicOffIcon from '@material-ui/icons/MicOff';
import VideocamIcon from '@material-ui/icons/Videocam';
import VideocamOffIcon from '@material-ui/icons/VideocamOff';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';

import React, { useState } from 'react'
// import {  createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";
import { createConfig } from '../settings/agora';

const Controls = (props) => {
    
    const { tracks, setStart, setInCall, appId, token, channelName } = props;
    const { useClient } = createConfig(appId, token);
    const client = useClient();

    const [trackState, setTrackState] = useState({ video: true, audio: true });

    const leaveChannel = async () => {
        await client.leave();
        client.removeAllListeners();
        tracks[0].close();
        tracks[1].close();
        setStart(false);
        setInCall(false);
    }

    const mute = async (type) => {
        if (type === 'audio') {
            await tracks[0].setEnabled(!trackState.audio);
            setTrackState(ps=>({...ps, audio: !ps.audio}))
        }
        if (type === 'video') {
            await tracks[1].setEnabled(!trackState.video);
            setTrackState(ps=>({...ps, video: !ps.video}))
        }
    }
  return (
    <Grid container spacing={2} alignItems='center'>
          <Grid item>
              <Button
                  variant='contained'
                  color={trackState.audio ? "primary" : "secondary"}
                  onClick={()=> mute('audio')}
              >
                  {trackState.audio ? <MicIcon/> : <MicOffIcon/>}
              </Button>
          </Grid>    
         <Grid item>
              <Button
                  variant='contained'
                  color={trackState.video ? "primary" : "secondary"}
                  onClick={()=> mute('video')}
              >
                  {trackState.video ? <VideocamIcon/> : <VideocamOffIcon/>}
              </Button>
          </Grid>
          <Grid item>
              <Button
                  variant='contained'
                  color="default"
                  onClick={()=> leaveChannel()}
              >
                  Leave <ExitToAppIcon/>
              </Button>
          </Grid>
    </Grid>
  )
}

export default Controls
