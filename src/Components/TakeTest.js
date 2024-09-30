import React, { useState, useEffect } from "react";
import axios from "axios";
import {
  Form,
  Button,
  Container,
  Row,
  Col,
  Card,
  Alert,
} from "react-bootstrap";
import "../App.css";
import { useNavigate } from "react-router-dom";
import { GrFormView } from "react-icons/gr";
import {toast} from 'react-toastify'

const TakeTest = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [userAnswers, setUserAnswers] = useState([]);
  const [score, setScore] = useState(null);
  const [percentage, setPercentage] = useState(null);
  const [submitted, setSubmitted] = useState(false);

  const [videoUrl, setVideoUrl] = useState([]);
  const fetchVideo = async () => {
    try {
      const response = await axios.get(
        "http://localhost:7000/api/auth/findvideo"
      );
      setVideoUrl(response.data.response);
    } catch (error) {
      console.error("Error fetching video:", error);
    }
  };

  const handleView = (video) => {
    console.log("View video: ", video);
    navigate("/videoplayer", { state: { video } });
  };
  useEffect(() => {
    fetchVideo();
  }, []);

  useEffect(() => {
    // const navigate = useNavigate()
    const fetchQuestions = async () => {
      try {
        const response = await axios.get(
          "http://localhost:7000/api/auth/findquestion"
        );
        setQuestions(response.data);
        setUserAnswers(
          response.data.map((q) => ({
            questionId: q._id,
            selectedOption: null,
          }))
        );
      } catch (error) {
        console.error("Error fetching questions", error);
      }
    };

    fetchQuestions();
  }, []);

  const handleOptionChange = (questionId, selectedOption) => {
    setUserAnswers((prevAnswers) =>
      prevAnswers.map((answer) =>
        answer.questionId === questionId
          ? { ...answer, selectedOption }
          : answer
      )
    );
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const unansweredQuestions = userAnswers.some(
      (answer) => answer.selectedOption === null
    );
  
    if (unansweredQuestions) {
      toast("Please answer all the questions before submitting.");
      return;
    }
  
    try {
      const response = await axios.post(
        "http://localhost:7000/api/auth/submitquestion",
        { userAnswers }
      );
      console.log("Test results:", response.data);
      setScore(response.data.score);
      setPercentage(response.data.percentage);
      setSubmitted(true);
      setUserAnswers([]); 
    } catch (error) {
      console.error("Error submitting test", error);
    }
  };
  

  const back = () => {
    setSubmitted(false);
  };

  return (
    <Container className="mt-5">
      <Row>
        <Col md={8} className="mx-auto">
          <h2 className="mb-4 text-center test-heading">Take the Test</h2>
          {submitted && (
            <div>
              <Alert variant="success" className="text-center">
                <h4>Test Submitted Successfully!</h4>
                <p>Your Score: {score}</p>
                <p>Your Percentage: {percentage}%</p>
              </Alert>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "70px",
                  justifyContent: "center",
                }}
              >
                <Button
                  style={{ width: "120px" }}
                  onClick={() => navigate("/Retest")}
                >
                  Re-Test
                </Button>
                <Button
                  style={{ width: "120px", backgroundColor: "red" }}
                  onClick={() => back()}
                >
                  Back
                </Button>
              </div>
              <div className="container mt-2">
                {videoUrl.length > 0 ? (
                  <table className="table table-bordered">
                    <thead>
                      <tr>
                        <th>Title</th>
                        <th>Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {videoUrl
                        .filter(v => 
                          v.scores.some(scoreSet => scoreSet.split(',').map(Number).includes(score))
                        )
                        .map((d, index) => (
                          <tr key={index}>
                            <td>{d.title}</td>
                            <td>
                              <GrFormView
                                size={25}
                                color="green"
                                onClick={() => handleView(d)}
                              />
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                ) : (
                  <p>No videos available</p>
                )}
              </div>
            </div>
          )}

          {!submitted && (
            <Form onSubmit={handleSubmit}>
              {questions.map((question) => (
                <Card className="mb-4 p-4 question-card" key={question._id}>
                  <Card.Body>
                    <div className="question-content">
                      <Card.Title className="question-title">
                        Question {questions.indexOf(question) + 1}
                      </Card.Title>
                      <Card.Text className="question-text">
                        {question.question}
                      </Card.Text>
                      {question.options.map((option, index) => (
                        <Form.Check
                          key={index}
                          type="radio"
                          name={`question-${question._id}`}
                          id={`option-${question._id}-${index}`}
                          label={option}
                          checked={
                            userAnswers.find(
                              (answer) => answer.questionId === question._id
                            )?.selectedOption === index
                          }
                          onChange={() =>
                            handleOptionChange(question._id, index)
                          }
                          className="mb-2 option-radio"
                        />
                      ))}
                    </div>
                  </Card.Body>
                </Card>
              ))}
              <Button
                variant="primary"
                type="submit"
                className="w-100 mt-4 submit-button"
              >
                Submit Test
              </Button>
              {/* <Button onClick={()=>setSubmitted(true)}>Back</Button> */}
            </Form>
          )}
        </Col>
      </Row>
    </Container>
  );
};

export default TakeTest;
