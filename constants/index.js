"use client";
import { SiPersonio } from "react-icons/si";
import { CgProfile } from "react-icons/cg";
import { TiContacts } from "react-icons/ti";
import { RiShoppingBag2Line } from "react-icons/ri";
import { RiCalendarLine } from "react-icons/ri";
import { FaPeopleRobbery } from "react-icons/fa6";
import { UserDropdown } from '@/components/index';

export const navOptions = [
  {
    name: "About",
    href: "/#about",
    icon: <SiPersonio size={25} className="m-auto"/>,
  },
  {
    name: "Services",
    href: "/#services",
    icon: <FaPeopleRobbery size={25} className="m-auto"/>
  },
  {
    name: "Contact",
    href: "/contact",
    icon: <TiContacts size={25} className="m-auto"/>
  },
  {
    name: "Schedule",
    href: "/schedule",
    icon: <RiCalendarLine size={25} className="m-auto"/>
  },
  // {
  //   href: "",
  //   key: "UserDropdown",
  //   name: <UserDropdown />,
  //   icon: <CgProfile size={25} className="m-auto"/>
  // }
]

export const zoomOptions = {
  data: {
    agenda: 'None',
    default_password: false,
    duration: 60,
    password: '123456',
    pre_schedule: true,
    schedule_for: '',
    settings: {
      additional_data_center_regions: ['TY'],
      allow_multiple_devices: true,
      alternative_hosts: '',
      alternative_hosts_email_notification: false,
      approval_type: 2,
      approved_or_denied_countries_or_regions: {approved_list: ['CX'], denied_list: ['CA'], enable: false, method: 'approve'},
      audio: 'telephony',
      audio_conference_info: 'test',
      authentication_domains: 'gmail.com',
      authentication_exception: [{email: '', name: ''}],
      authentication_option: 'signIn_D8cJuqWVQ623CI4Q8yQK0Q',
      auto_recording: 'none',
      breakout_room: {enable: false, rooms: [{name: 'room1', participants: ['']}]},
      calendar_type: 1,
      close_registration: false,
      cn_meeting: false,
      contact_email: 'pmoreno@me.com',
      contact_name: 'Paula Moreno',
      email_notification: true,
      encryption_type: 'enhanced_encryption',
      focus_mode: true,
      global_dial_in_countries: ['US'],
      host_video: true,
      in_meeting: false,
      jbh_time: 0,
      join_before_host: false,
      question_and_answer: {
        enable: false,
        allow_submit_questions: true,
        allow_anonymous_questions: true,
        question_visibility: 'all',
        attendees_can_comment: true,
        attendees_can_upvote: true
      },
      meeting_authentication: false,
      meeting_invitees: [{email: ''}],
      mute_upon_entry: false,
      participant_video: true,
      private_meeting: false,
      registrants_confirmation_email: true,
      registrants_email_notification: true,
      registration_type: 1,
      show_share_button: true,
      use_pmi: false,
      waiting_room: true,
      watermark: false,
      host_save_video_order: false,
      alternative_host_update_polls: false,
      internal_meeting: false,
      continuous_meeting_chat: {
        enable: false,
        auto_add_invited_external_users: true,
        auto_add_meeting_participants: true,
        who_is_added: 'all_users'
      },
      participant_focused_meeting: false,
      push_change_to_calendar: false,
      resources: [
        {
          resource_type: 'whiteboard',
          resource_id: 'X4Hy02w3QUOdskKofgb9Jg',
          permission_level: 'editor'
        }
      ],
      auto_start_meeting_summary: false,
      who_will_receive_summary: 1,
      auto_start_ai_companion_questions: false,
      who_can_ask_questions: 1,
      device_testing: false,
      allow_host_control_participant_mute_state: false,
      disable_participant_video: false
    },
    start_time: '',
    template_id: 'Dv4YdINdTk+Z5RToadh5ug==',
    timezone: 'America/Los_Angeles',
    topic: 'Meeting with Paula',
    tracking_fields: [{field: '', value: ''}],
    type: 2
  }
};
