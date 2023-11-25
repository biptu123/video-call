import { AgoraVideoPlayer } from "agora-rtc-react";
import { Grid } from "@material-ui/core";
import { useState, useEffect } from "react";

import React from 'react'

const Video = (props) => {
    const {users, tracks} = props;
    const [gridSpacing, setGridSpacing] = useState(12);

    useEffect(() => {
        setGridSpacing(Math.max(Math.floor(12 / (users.length + 1)), 4));
    }, [users, tracks]);

  return (
    <Grid container style={{height: "100%"}}>
          <Grid item xs={gridSpacing}>
              <AgoraVideoPlayer videoTrack={tracks[1]} style={{ width: "100%", aspectRatio: 9/4 }}/>
          </Grid>

          {
              users.length > 0 && users.map(user => {
                  if(user.videoTrack)
                      return(
                        <Grid item xs={gridSpacing}>
                            <AgoraVideoPlayer
                                videoTrack={user.videoTrack}
                                style={{ width: "100%", aspectRatio: 9/4 }}
                                key={user.uid}
                            />
                          </Grid>
                      )
                  else return null;
              })
          }
    </Grid>
  )
}

export default Video
