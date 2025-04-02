import axios from "axios";
import { zoomOptions } from '@/constants';
import { NextResponse } from 'next/server';

export async function POST(req, res) {
  const { email, startDatetime } = req.body;
  // set zoom options 
  const options = {
    method: 'POST',
    url: 'https://api.zoom.us/v2/users/alg.moreno00@gmail.com/meetings',
    headers: {'Content-Type': 'application/json', Authorization: `Bearer ${process.env.ZOOM_ACCESS_TOKEN}`},
    data: {
      agenda: 'None',
      default_password: false,
      duration: 60,
      password: '123456',
      pre_schedule: true,
      schedule_for: email,
      settings: {
        contact_email: 'alg.moreno00@gmail.com',
        contact_name: 'Alan Moreno',
        email_notification: false,
        waiting_room: true,
        continuous_meeting_chat: {
          enable: false,
          auto_add_invited_external_users: true,
          auto_add_meeting_participants: true,
          who_is_added: 'all_users'
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