// agoraIntegration.js
import axios from 'axios';

const agoraAppId = 'eed5415104134b408191e99f7276aafd';
const agoraAppCertificate = 'def4695032604f10a8fe1822a81a5b6c';
const agoraApiBaseUrl = 'https://api.agora.io/v1';

async function createChannelAndGenerateToken(channelName, uid) {
  try {
    // Step 1: Create a Channel
    const createChannelResponse = await axios.post(
      `${agoraApiBaseUrl}/channel`,
      {
        cname: channelName,
        type: 1, // 1 for communication, 2 for live broadcasting
        uid: uid, // Optional: If you have a specific UID you want to assign
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${agoraAppId}:${agoraAppCertificate}`)}`,
        },
      }
    );

    // Step 2: Generate a Token
    const generateTokenResponse = await axios.post(
      `${agoraApiBaseUrl}/channel/key`,
      {
        cname: channelName,
        uid: uid,
        expirationTimeInSeconds: 3600, // Token expiration time in seconds
      },
      {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Basic ${btoa(`${agoraAppId}:${agoraAppCertificate}`)}`,
        },
      }
    );

    const channelKey = generateTokenResponse.data.key;
    return { channelKey, channelName };
  } catch (error) {
    if (error.response && error.response.data) {
      console.error('Error in createChannelAndGenerateToken:', error.response.data);
    } else {
      console.error('Error in createChannelAndGenerateToken:', error.message);
    }
    throw error; // Ensure you still throw the error to propagate it to the calling code
  }
}



export default createChannelAndGenerateToken;
