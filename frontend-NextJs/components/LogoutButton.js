import { useEffect } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';

const LogoutButton = () => {
  const router = useRouter();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:3000/auth/logout'); 
      router.push('/'); 
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default LogoutButton;
