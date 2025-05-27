import React, { useState } from 'react';

const RegisterForm = () => {
  const [form, setForm] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState({});
  const [serverError, setServerError] = useState(null);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const newErrors = {};
    if (!form.username.trim()) newErrors.username = 'Benutzername ist erforderlich';
    if (!form.email.trim()) newErrors.email = 'E-Mail ist erforderlich';
    else if (!/\S+@\S+\.\S+/.test(form.email)) newErrors.email = 'Ungültige E-Mail-Adresse';

    const pass = form.password;
    if (!pass) {
      newErrors.password = 'Passwort ist erforderlich';
    } else {
      if (pass.length < 8) newErrors.password = 'Passwort muss mindestens 8 Zeichen lang sein';
      else if (!/[A-Z]/.test(pass)) newErrors.password = 'Passwort muss mindestens einen Großbuchstaben enthalten';
      else if (!/[!@#$%^&*(),.?":{}|<>]/.test(pass)) newErrors.password = 'Passwort muss mindestens ein Sonderzeichen enthalten';
    }

    if (form.password !== form.confirmPassword) newErrors.confirmPassword = 'Passwörter stimmen nicht überein';

    return newErrors;
  };

  const handleChange = (e) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError(null);
    const validationErrors = validate();
    setErrors(validationErrors);

    if (Object.keys(validationErrors).length === 0) {
      setLoading(true);
      try {
        const response = await fetch('http://api-test.mshome.net:3001/register', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            username: form.username,
            email: form.email,
            password: form.password,
          }),
        });

        if (!response.ok) {
          const errData = await response.json();
          throw new Error(errData.message || 'Serverfehler');
        }

        setSubmitted(true);
      } catch (err) {
        setServerError(err.message);
      } finally {
        setLoading(false);
      }
    }
  };

  if (submitted) {
    return <div className="alert alert-success mt-4">Erfolgreich registriert!</div>;
  }

  return (
    <div className="container mt-4" style={{ maxWidth: '400px' }}>
      <h2 className="mb-4">Registrieren</h2>
      {serverError && <div className="alert alert-danger">{serverError}</div>}
      <form onSubmit={handleSubmit} noValidate>
        <div className="mb-3">
          <label htmlFor="username" className="form-label">Benutzername</label>
          <input
            type="text"
            id="username"
            name="username"
            className={`form-control ${errors.username ? 'is-invalid' : ''}`}
            value={form.username}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.username && <div className="invalid-feedback">{errors.username}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">E-Mail</label>
          <input
            type="email"
            id="email"
            name="email"
            className={`form-control ${errors.email ? 'is-invalid' : ''}`}
            value={form.email}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.email && <div className="invalid-feedback">{errors.email}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="password" className="form-label">Passwort</label>
          <input
            type="password"
            id="password"
            name="password"
            className={`form-control ${errors.password ? 'is-invalid' : ''}`}
            value={form.password}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.password && <div className="invalid-feedback">{errors.password}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="confirmPassword" className="form-label">Passwort bestätigen</label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            className={`form-control ${errors.confirmPassword ? 'is-invalid' : ''}`}
            value={form.confirmPassword}
            onChange={handleChange}
            disabled={loading}
          />
          {errors.confirmPassword && <div className="invalid-feedback">{errors.confirmPassword}</div>}
        </div>

        <button type="submit" className="btn btn-primary w-100" disabled={loading}>
          {loading ? 'Registriere...' : 'Registrieren'}
        </button>
      </form>
    </div>
  );
};

export default RegisterForm;
