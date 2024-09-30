import React, { useState,useEffect } from 'react';
import { Form, Button, Container, Row, Col } from 'react-bootstrap';
import {useNavigate} from 'react-router-dom'
import axios from 'axios';
import { toast } from 'react-toastify';

const ContactForm = () => {
    const navigate = useNavigate()
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });
    const [token,setToken] = useState(localStorage.getItem('token'))
  const checkAuth = async ()=>{
   if(!token){
    navigate('/login')
    return
   }
   try {
    const data = await axios.get('http://localhost:7000/api/auth/usercontact',{headers:{Authorization: `Bearer ${token}`}})
    console.log(data);
    
   } catch (error) {
    localStorage.removeItem('token')
    navigate('/login')
   }
  }

  useEffect(()=>{
    checkAuth()
  },[navigate])
  const { name, email, message } = formData;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:7000/api/auth/contact', formData);
      toast.success('Message sent successfully!');
      setFormData({
        name: '',
        email: '',
        message: '',
      });
    } catch (error) {
      toast.error('Failed to send message!');
    }
  };

  return (
    <Container className="mt-5">
      <Row className="justify-content-center">
        <Col md={6}>
          <h2 className="text-center mb-4">Contact Us</h2>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="formName">
              <Form.Label className="text-start">Name</Form.Label>
              
                <Form.Control
                  type="text"
                  name="name"
                  value={name}
                  onChange={handleChange}
                  required
                  placeholder="Enter your name"
                />
              
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formEmail">
              <Form.Label className="text-start">Email</Form.Label>
              
                <Form.Control
                  type="email"
                  name="email"
                  value={email}
                  onChange={handleChange}
                  required
                  placeholder="Enter your email"
                />
            
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="formMessage">
              <Form.Label className="text-start">Message</Form.Label>
              
                <Form.Control
                  as="textarea"
                  name="message"
                  rows={4}
                  value={message}
                  onChange={handleChange}
                  required
                  placeholder="Write your message"
                />
            
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100">
              Send Message
            </Button>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default ContactForm;
