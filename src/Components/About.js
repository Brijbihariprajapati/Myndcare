import React,{useState,useEffect} from 'react';
import { Container, Row, Col, Button } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import axios from'axios'
import '../App.css'

const About = () => {
    const navigate = useNavigate();

    const [token , settoken] = useState(localStorage.getItem('token'))

    const checkauth = async ()=>{
        try {
            const data = await axios.get('http://localhost:7000/api/auth/userabout',{headers: {'Authorization': `Bearer ${token}`}})
            console.log(data);
            
        } catch (error) {
            localStorage.removeItem('token')
            navigate('/login')
            console.log('login');
            
        }
    }

    useEffect(() => {
        if (!token) {
          checkauth();
        }
      }, [token]);

  return (
    <div>
      <section className="about-section py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h1 className="display-4">About Myndcare</h1>
              <p className="lead">
                Myndcare is your companion for better mental well-being, offering insights and support for your mental health journey.
              </p>
            </Col>
          </Row>

          <Row>
            <Col md={6}>
              <h3>Our Mission</h3>
              <p>
                At Myndcare, our mission is to empower individuals to understand and take care of their mental health.
                We believe that mental health is just as important as physical health, and our platform is designed to make mental wellness accessible to everyone.
                Through scientifically designed tests and personalized feedback, we aim to help users gain deeper insights into their mental state.
              </p>
            </Col>
            <Col md={6}>
              <h3>What We Offer</h3>
              <p>
                Myndcare provides users with a carefully curated mental health test that helps assess various aspects of mental well-being. 
                Our tests are simple yet effective, offering you insights and suggestions based on your responses. 
                Whether you're looking for better stress management or deeper self-understanding, we are here to guide you.
              </p>
            </Col>
          </Row>

          <Row className="mt-5">
            <Col md={6}>
              <h3>Why Choose Myndcare?</h3>
              <ul>
                <li>Scientifically designed mind tests.</li>
                <li>Personalized feedback and insights.</li>
                <li>Simple and user-friendly experience.</li>
                <li>Data privacy and confidentiality ensured.</li>
              </ul>
            </Col>
            <Col md={6}>
              <h3>Our Commitment to Privacy</h3>
              <p>
                We value your privacy and understand that mental health is a sensitive topic. 
                Myndcare is committed to protecting your data and ensuring confidentiality. 
                All your responses are securely stored and are used solely to generate personalized results. 
                We never share your data with third parties without your consent.
              </p>
            </Col>
          </Row>

          <Row className="text-center mt-5">
            <Col>
              <Button variant="primary" size="lg" onClick={() => navigate('/test')}>
                Take the Mind Test
              </Button>
            </Col>
          </Row>
        </Container>
      </section>

      {/* Team Section */}
      <section className="team-section bg-light py-5">
        <Container>
          <Row className="text-center mb-4">
            <Col>
              <h2>Meet Our Team</h2>
              <p className="lead">Dedicated professionals passionate about mental health and well-being.</p>
            </Col>
          </Row>

          <Row>
            <Col md={4} className="text-center">
              <img
                src="https://www.sonicseo.com/wp-content/uploads/2020/07/surgeon.jpg"
                alt="Founder"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h4>Dr. Jane Doe</h4>
              <p>Founder & Mental Health Expert</p>
            </Col>
            <Col md={4} className="text-center">
              <img
                src="https://img.freepik.com/premium-photo/male-doctor_931473-41.jpg"
                alt="Psychologist"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h4>John Smith</h4>
              <p>Lead Psychologist</p>
            </Col>
            <Col md={4} className="text-center">
              <img
                src="https://www.pulseheadlines.com/wp-content/uploads/2016/12/jejeje-1.jpg"
                alt="Tech Lead"
                className="rounded-circle mb-3"
                style={{ width: '150px', height: '150px' }}
              />
              <h4>Emily Johnson</h4>
              <p>Technology Lead</p>
            </Col>
          </Row>
        </Container>
      </section>

      <section className="cta-section bg-dark text-white py-5 text-center">
        <Container>
          <h2>Ready to Take Control of Your Mental Health?</h2>
          <p className="lead">Start your mind test today and get personalized insights.</p>
          <Button variant="light" size="lg" onClick={() => navigate('/test')}>
            Start the Test
          </Button>
        </Container>
      </section>
    </div>
  );
};

export default About;
