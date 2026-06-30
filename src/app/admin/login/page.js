'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import './login.css';

export default function AdminLoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const res = await fetch('/api/admin/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();

      if (res.ok && data.success) {
        // Redirect to admin dashboard
        router.push('/admin');
        router.refresh();
      } else {
        setError(data.error || 'Invalid credentials');
      }
    } catch (err) {
      console.error('Login error:', err);
      setError('An error occurred. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-wrapper">
      <div className="login-card">
        <div className="login-logo-container">
          <img src="/logo.png" alt="AdPulse Logo" className="login-logo" />
        </div>
        <div className="login-header">
          <h2>ADMIN PANEL</h2>
          <p>Enter credentials to access the CMS dashboard</p>
        </div>
        
        {error && <div className="login-error-msg" id="login-error-alert">{error}</div>}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Enter username"
              required
              disabled={loading}
              className="login-input"
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter password"
              required
              disabled={loading}
              className="login-input"
            />
          </div>

          <button
            type="submit"
            id="login-submit-btn"
            disabled={loading}
            className="login-btn btn-gradient"
          >
            {loading ? 'Authenticating...' : 'LOG IN'}
          </button>
        </form>
      </div>
    </div>
  );
}
