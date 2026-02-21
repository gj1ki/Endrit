import React from 'react';
import { Link } from 'react-router-dom';

const NotFoundPage = () => {
  return (
    <div style={{ textAlign: 'center', padding: '50px' }}>
      <h1>404</h1>
      <h2>Oops! Page not found.</h2>
      <p>The page you are looking for doesn't exist or has been moved.</p>
      <Link to="/" style={{ color: 'blue', textDecoration: 'underline' }}>
        Go back to Dashboard
      </Link>
    </div>
  );
};

export default NotFoundPage;