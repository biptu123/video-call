import {  createClient, createMicrophoneAndCameraTracks } from "agora-rtc-react";

const appCertificate = 'def4695032604f10a8fe1822a81a5b6c';

export const createConfig = (appId, token) => {
    return {
        config: {
            mode: 'rtc',
            codec: 'vp8',
            appId,
            token
        },
        useClient: createClient({
                                    mode: 'rtc',
                                    codec: 'vp8',
                                    appId,
                                    token
                                })
        }
}
    

// export const useClient = (config) => createClient(config);
export const useMicrophoneAndCameraTracks = createMicrophoneAndCameraTracks();
export const channelName = 'main';