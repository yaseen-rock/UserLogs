import { useState, useEffect } from 'react';
import axios from 'axios';
import LogoutButton from './LogoutButton';

const HomePage = () => {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [loginHistory, setLoginHistory] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const userResponse = await axios.get('http://localhost:3000/home');
        const messagesResponse = await axios.get('http://localhost:3000/home');
        const loginHistoryResponse = await axios.get('http://localhost:3000/home');

        setUser(userResponse.data);
        setMessages(messagesResponse.data);
        setLoginHistory(loginHistoryResponse.data);
      } catch (error) {
        console.error('Data fetch error:', error);
      }
    };

    fetchData();
  }, []);

  return (
    <div>
      <h1>Welcome, {user?.name}</h1>
      <div>
        <input type="text" placeholder="Enter a message" />
        <button>Submit</button>
      </div>
      <h2>Previous Login Timestamps</h2>
      <table>
        <thead>
          <tr>
            <th>Timestamp</th>
            <th>Session Duration</th>
          </tr>
        </thead>
        <tbody>
          {loginHistory.map((entry, index) => (
            <tr key={index}>
              <td>{entry.timestamp}</td>
              <td>{entry.duration}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2>Messages</h2>
      <ul>
        {messages.map((message, index) => (
          <li key={index}>{message}</li>
        ))}
      </ul>
      <LogoutButton />
    </div>
  );
};

export default HomePage;
