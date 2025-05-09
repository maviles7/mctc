import { useState } from 'react';
import * as authService from '../../services/authService';

export default function SignUpPage({ setUser }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
    email: '',
    password: '',
    confirm: '',
  });
  const [errorMsg, setErrorMsg] = useState('');

  async function handleSubmit(evt) {
    evt.preventDefault();
    try {
      const user = await authService.signUp(formData);
      setUser(user);
    } catch (err) {
      // An error occurred
      console.log(err);
      setErrorMsg('Sign Up Failed - Try Again');
    }
  }

  function handleChange(evt) {
    setFormData({ ...formData, [evt.target.name]: evt.target.value });
    setErrorMsg('');
  }

  const disable = formData.password !== formData.confirm;

  return (
    <>
      <h2>Sign Up!</h2>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <label>First Name</label>
        <input
          type="text"
          name="firstName"
          value={formData.firstName}
          onChange={handleChange}
          required
        />
        <label>Last Name</label>
        <input
          type="text"
          name="lastName"
          value={formData.lastName}
          onChange={handleChange}
          required
        />
        <label>username</label>
        <input
          type="text"
          name="username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <label>Email</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
        />
        <label>Password</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <label>Confirm</label>
        <input
          type="password"
          name="confirm"
          value={formData.confirm}
          onChange={handleChange}
          required
        />
        <button type="submit" disabled={disable}>
          SIGN UP
        </button>
      </form>
      <p className="error-message">&nbsp;{errorMsg}</p>
    </>
  );
}
