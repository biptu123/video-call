import React, { useEffect, useState } from 'react'
import { createConfig, useMicrophoneAndCameraTracks } from '../settings/agora';
import { Grid } from '@material-ui/core';
import Controls from './Controls';
import Video from './Video';

const VideoCall = (props) => {
    const { setInCall, appId, token, channelName } = props;
    const [users, setUsers] = useState([]);
    const [start, setStart] = useState(false);
    
    const { config, useClient } = createConfig(appId, token);
    const client = useClient();
    const { ready, tracks } = useMicrophoneAndCameraTracks();

    useEffect(() => {

        let init = async (name) => {
            console.log(users);
            client.on('user-published', async (user, mediaType) => {
                await client.subscribe(user, mediaType);
                if (mediaType === 'video') {
                    setUsers(prevUsers => ([...prevUsers, user]));
                }
                if (mediaType === 'audio') {
                    user.audioTrack.play();
                }
            });

            client.on('user-unpublished',  (user, mediaType) => {
                if (mediaType === 'video') {
                    setUsers(prevUsers => (prevUsers.filter(u=>u.uid !== user.uid)));
                }
                if (mediaType === 'audio') {
                    if(user.audioTrack) user.audioTrack.stop();
                }
            })

            client.on('user-left',  (user, mediaType) => {
                if (mediaType === 'audio') {
                    if(user.audioTrack) user.audioTrack.stop();
                }
            })

            try {
                await client.join(config.appId, name, config.token, null);
            } catch (error) {
                console.log(error,"joining error");
            }

            if (tracks && !start) {
                await client.publish([tracks[0], tracks[1]]);
                setStart(true);
            }
            
        }

        if (ready && tracks) {
            try {
                init(channelName);
            } catch (error) {
                console.log(error);
            }
        }

        return () => {
            client.removeAllListeners();
        };
    },[channelName, ready, tracks]);

  return (
      <Grid container direction='column' style={{ height: '100%' }}>
          <Grid item style={{height:'95%'}}>
              {start && tracks && (
                  <Video tracks={tracks} users={users} />
              )}
          </Grid>
          <Grid item style={{height:'5%'}}>
              {ready && tracks && (
                  <Controls
                      tracks={tracks}
                      setStart={setStart}
                      setInCall={setInCall}
                      appId={appId}
                      token={token}
                      channelName={channelName}
                  />
              )}
          </Grid>
          
    </Grid>
  )
}

export default VideoCall