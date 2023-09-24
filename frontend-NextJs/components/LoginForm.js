// components/LoginForm.js
import { useState } from 'react';
import axios from 'axios';

const LoginForm = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    mobile: '',
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:3000/auth/login', formData);
      if (response.data.message === 'Login successful') {
        // Redirect to the home page after successful login
        window.location.href = '/home';
      }
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="name"
        placeholder="Name"
        value={formData.name}
        onChange={handleInputChange}
        required
      />
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={formData.email}
        onChange={handleInputChange}
        required
      />
      <input
        type="tel"
        name="mobile"
        placeholder="Mobile Number"
        value={formData.mobile}
        onChange={handleInputChange}
        required
      />
      <button type="submit">Login</button>
    </form>
  );
};

export default LoginForm;
