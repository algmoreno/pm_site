import axios from "axios";
import { zoomOptions } from '@/constants';
import { NextResponse } from 'next/server';
import { getZoomAccessToken } from "@/app/lib/zoomAuth";

export async function POST(req, res) {
  const { email, startDatetime } = req.body;
  const accessToken = await getZoomAccessToken();
  // set zoom options 
  const options = {
    method: 'POST',
    url: 'https://api.zoom.us/v2/users/alg.moreno00@gmail.com/meetings',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${accessToken}`},
    data: {
      agenda: 'None',
      default_password: false,
      duration: 60,
      password: '123456',
      pre_schedule: true,
      schedule_for: email,
      settings: {
        contact_email: 'pmoreno@me.com',
        contact_name: 'Paula Moreno',
        email_notification: false,
        waiting_room: true,
        continuous_meeting_chat: {
          enable: false,
        },
      },
      start_time: startDatetime,
      template_id: 'Dv4YdINdTk+Z5RToadh5ug==',
      timezone: 'America/Los_Angeles',
      topic: 'My Meeting',
      tracking_fields: [{field: 'field1', value: 'value1'}],
      type: 2
    }
  };

  try {
    const { data } = await axios.request(options);
    console.log(data);
    return NextResponse.json(data, { status: 200 });
  } catch (error) {
    return NextResponse.json({ error: error.response?.data }, { status: 500 });
  }
}