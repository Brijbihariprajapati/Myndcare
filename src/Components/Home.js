import { Container, Row, Col, Button } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../App.css';

const Home = () => {
  const navigate = useNavigate();

  const [token, setToken] = useState(localStorage.getItem('token'));

  useEffect(() => {
    if (!token) {
      navigate('/login');
    }
  }, [token, navigate]);

  const checkAuth = async () => {
    try {
      const auth = await axios.get('http://localhost:7000/api/auth/home', {
        headers: { 'Authorization': `Bearer ${token}` }
      });
      console.log(auth);
    } catch (error) {
      localStorage.removeItem('token');
      navigate('/login');
    }
  };

  useEffect(() => {
    if (token) {
      checkAuth();
    }
  }, [token]);

  return (
    <div>
      <section className="hero-section bg-light text-center d-flex align-items-center" style={{ height: '100vh' }}>
        <Container>
          <Row>
            <Col>
              <h1 style={{ color: "wheat" }} className="display-4">Welcome to Myndcare</h1>
              <p style={{ color: 'whitesmoke' }} className="lead mt-4">
                Discover more about your mental well-being through our carefully designed mind test.
                Your mental health matters, and we are here to guide you.
              </p>
              <Button onClick={() => navigate('/test')} variant="primary" size="lg" className="mt-3">
                Start the Mind Test
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="py-5">
        <Container>
          <Row>
            <Col md={4}>
              <h3>Why Myndcare?</h3>
              <p>
                We offer a scientifically designed mind test to help you understand your mental health better. 
                With personalized feedback, we guide you toward a healthier mind.
              </p>
            </Col>
            <Col md={4}>
              <h3>How It Works</h3>
              <p>
                Take a few minutes to answer our questions. Based on your responses, 
                we’ll provide you with insights to better manage your mental well-being.
              </p>
            </Col>
            <Col md={4}>
              <h3>Your Privacy Matters</h3>
              <p>
                We ensure that your data is private and secure. Your responses will be kept confidential and used 
                only for generating personalized results.
              </p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="bg-dark text-white py-5 text-center">
        <Container>
          <h2>Ready to Explore Your Mind?</h2>
          <p className="lead">Start your mind test now and get insights that matter.</p>
          <Button variant="light" size="lg" onClick={() => navigate('/test')}>
            Begin Test
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default Home;
