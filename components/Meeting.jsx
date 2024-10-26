// pages/index.js
'use client';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useGoogleLogin } from '@react-oauth/google';
import { Video } from 'lucide-react';

export default function Meeting() {
  const [meetings, setMeetings] = useState([]);
  const [meetingLink, setMeetingLink] = useState(null);
  const [title, setTitle] = useState('');
  const [date, setDate] = useState('');
  const [time, setTime] = useState('');
  const [accessToken, setAccessToken] = useState(''); 

  const fetchMeetings = async () => {
    try {
      const response = await axios.get('/api/meetings');
      setMeetings(response.data);
    } catch (error) {
      console.error('Error fetching meetings:', error);
    }
  };

  const login = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const token = tokenResponse.access_token;
      setAccessToken(token);

      try {
        const eventResponse = await axios.post(
          'https://www.googleapis.com/calendar/v3/calendars/primary/events',
          {
            summary: title || 'Google Meet Meeting',
            start: {
              dateTime: new Date(`${date}T${time}`).toISOString(),
              timeZone: 'America/Los_Angeles',
            },
            end: {
              dateTime: new Date(new Date(`${date}T${time}`).getTime() + 60 * 60 * 1000).toISOString(),
              timeZone: 'America/Los_Angeles',
            },
            conferenceData: {
              createRequest: {
                requestId: "sample123",
                conferenceSolutionKey: { type: "hangoutsMeet" },
              },
            },
          },
          {
            headers: {
              Authorization: `Bearer ${token}`,
              'Content-Type': 'application/json',
            },
            params: { conferenceDataVersion: 1 },
          }
        );

        const meetLink = eventResponse.data.hangoutLink;
        setMeetingLink(meetLink);
      } catch (error) {
        console.error('Error creating meeting:', error);
      }
    },
    onError: (error) => console.error('Login failed:', error),
  });

  const createMeeting = async () => {
    if (!title || !date || !time || !meetingLink) {
      console.error('Missing fields or meeting link');
      return;
    }

    try {
      const response = await axios.post('/api/meetings', { title, date, time, link: meetingLink });
      setMeetings([...meetings, response.data]);
      setTitle('');
      setDate('');
      setTime('');
      setMeetingLink(null);
    } catch (error) {
      console.error('Error creating meeting:', error);
    }
  };

  useEffect(() => {
    fetchMeetings();
  }, []);

  // Filter out expired meetings
  const upcomingMeetings = meetings.filter((meeting) => {
    const meetingDateTime = new Date(`${meeting.date}T${meeting.time}`);
    return meetingDateTime > new Date(); // Only keep meetings that are in the future
  });

  return (
    <div className="container mx-auto p-6 max-w-5xl flex gap-8">
      
      {/* Left Section: Create Meeting Form */}
      <div className="w-1/3 p-6 bg-gray-100 rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-6">Create Google Meet Meeting</h1>
        
        <div className="flex flex-col gap-4 mb-4">
          <input
            type="text"
            placeholder="Meeting Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="p-3 border rounded-lg"
            required
          />
        </div>

        <div className="flex gap-4 mb-6 text-xs">
          <button 
            onClick={login} 
            className="bg-black text-white font-semibold py-2 px-4 rounded-lg"
          >
            Create meeting
          </button>
          <button 
            onClick={createMeeting} 
            disabled={!meetingLink}
            className={`${
              meetingLink ? 'bg-green-600 hover:bg-green-700' : 'bg-gray-400 cursor-not-allowed'
            } text-white font-semibold py-2 px-4 rounded-lg`}
          >
            Save Meeting
          </button>
        </div>
      </div>

      {/* Right Section: Display Upcoming Meetings */}
      <div className="w-2/3 p-6 bg-white rounded-lg shadow-md">
        <h2 className="text-xl font-medium mb-4">Upcoming Meetings</h2>
        <ul className="space-y-3">
          {upcomingMeetings.map((meeting) => (
            <li key={meeting.id} className="p-4 border rounded-lg shadow-sm flex justify-between items-center">
              <div>
                <p className="font-semibold">{meeting.title}</p>
                <p className="text-sm text-gray-600">
                  {meeting.date} at {meeting.time}
                </p>
              </div>
              <a 
                href={meeting.link} 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-black flex gap-2 text-white py-2 px-3 rounded-lg"
              >
                <span>Join</span> <span><Video/></span>
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
