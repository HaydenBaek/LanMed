import React from 'react';
import { useNavigate } from 'react-router-dom';

const NotFoundPage = () => {
  const navigate = useNavigate();

  const handleGoHome = () => {
    navigate('/');
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>404 - Page Not Found</h1>
      <p style={styles.text}>
        Oops! The page you're looking for doesn't exist or may have been moved.
      </p>
      <p style={styles.text}>
        This app uses client-side routing, meaning refreshing on certain pages may lead to this issue.
      </p>
      <button style={styles.button} onClick={handleGoHome}>
        Go Back Home
      </button>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: {
    textAlign: 'center',
    marginTop: '15%',
    fontFamily: 'Arial, sans-serif'
  },
  heading: {
    fontSize: '3rem',
    marginBottom: '1rem'
  },
  text: {
    fontSize: '1.2rem',
    marginBottom: '2rem',
    color: '#666'
  },
  button: {
    padding: '10px 20px',
    fontSize: '1rem',
    color: '#fff',
    backgroundColor: '#007BFF',
    border: 'none',
    borderRadius: '5px',
    cursor: 'pointer'
  }
};

export default NotFoundPage;
