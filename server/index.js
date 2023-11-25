const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const { RtcTokenBuilder, RtcRole } = require('agora-access-token');

const app = express();
const PORT = 5000;

app.use(bodyParser.json());
app.use(cors());

const agoraAppId = 'eed5415104134b408191e99f7276aafd';
const agoraAppCertificate = 'def4695032604f10a8fe1822a81a5b6c';

const nocache = (req, res, next) => {
  res.header('Cache-Control', 'private, no-cache, no-store, must-revaluate');
  res.header('Expires', '-1');
  res.header('Pragma', 'no-cache');
  next();
}

app.post('/create-channel',nocache,  (req, res) => {
  const { channelName, uid } = req.body;

  console.log(channelName, uid);
  // Set the expiration time for the token (in seconds)
  const expirationTimeInSeconds = 7200;
  const currentTime = Math.floor(Date.now() / 1000);
  const privilegeExpiresTime = currentTime + expirationTimeInSeconds;
  // Generate the Agora token
  const key = RtcTokenBuilder.buildTokenWithUid(
    agoraAppId,
    agoraAppCertificate,
    channelName,
    uid,
    RtcRole.PUBLISHER,
    privilegeExpiresTime
  );

  // Return the token to the client
  res.json({ token: key, appId: agoraAppId, channel: channelName});
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
