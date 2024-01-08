require('dotenv').config();
const axios = require('axios');

let token = process.env.TOKEN;

const refreshToken = process.env.REFRESH_TOKEN;

async function refreshAccessToken() {
    try{
        const response = await axios.post('https://zoom.us/oauth/token',null,{
              params:{
                  grant_type: 'refresh_token',
                  refresh_token: process.env.REFRESH_TOKEN
              },
              headers:{
                  'Host': 'zoom.us',
                  'Authorization':`Basic ${Buffer.from(`${process.env.ZOOM_API_KEY}:${process.env.ZOOM_API_SECRET}`).toString('base64')}`,
                  'Content-type': 'application/z-www-form-urlencoded'
              }
          });

    token = response.data.access_token;

    console.log('Access Token Refreshed');
  } catch (error) {
    console.error('Error refreshing access token:', error);
  }
}

async function getMeetings(){
    try{
        const response = await axios.get('https://api.zoom.us/v2/users/me/meetings',{
            headers:{
                'Authorization':`Bearer ${token}`
            }
        });
        const data = response.data;
        return data;
    }catch(error){
        console.error('Error',error);
    }
}

async function createMeeting(topic, start_time,type,duration,timezone,agenda){
    try{
        const response = await axios.post('https://api.zoom.us/v2/users/me/meetings',{
            topic,
            type,
            start_time,
            duration,
            timezone,
            agenda,
            settings:{
                host_video:true,
                participant_video:true,
                join_before_host:false,
                mute_upon_entry:true,
                watermark:false,
                use_pmi:false,
                approval_type:0,
                audio:'both',
                auto_recording:'none'
            }
        },{
            headers:{
                'Authorization':`Bearer ${token}`
            },

        });

        const joinUrl = response.data.join_url;
        console.log(`Meeting Join URL: ${joinUrl}`);

        const body = response.data;
        return body;
    }catch(error){
        console.error('Error',error);
    }
}


module.exports = {
    createMeeting,
    getMeetings,
    refreshAccessToken,
}
