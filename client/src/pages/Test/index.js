import React, { useState } from 'react'
import VideoCall from '../../components/VideoCall'
import { Button } from '@material-ui/core';

const Test = () => {
    const appId = 'eed5415104134b408191e99f7276aafd';
    const token = '007eJxTYEj0Xnioy6G148w9reVMmmp3/3vYzr8Y1sHHlT9zXvEbthsKDKmpKaYmhqaGBiaGxiZJJgYWhpaGqZaWaeZG5maJiWkpz1clpjYEMjJIvetjYmSAQBCfhSE3MTOPgQEAL3IfPw==';
    const channel = 'main';
    const [inCall, setInCall] = useState(false);
    return (
         inCall ?  < VideoCall setInCall={setInCall} appId={appId} token={token} channelName={channel} />: <Button variant='contained' color="primary" onClick={()=> setInCall(true)}>Join </Button>
  )
}

export default Test
