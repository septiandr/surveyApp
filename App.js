import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

const SurveyApp = () => {
  const questions = [
    {
      id: 1,
      text: 'How satisfied are you with our service?',
      answers: ['Very Satisfied', 'Satisfied', 'Not Satisfied'],
    },
    {
      id: 2,
      text: 'Would you recommend our product to others?',
      answers: ['Definitely', 'Maybe', 'Not at all'],
    },
    {
      id: 3,
      text: 'How often do you use our app?',
      answers: ['Daily', 'Weekly', 'Rarely'],
    },
    {
      id: 4,
      text: 'Are you satisfied with the user interface?',
      answers: ['Very Satisfied', 'Neutral', 'Not Satisfied'],
    },
    {
      id: 5,
      text: 'How likely are you to continue using our service?',
      answers: ['Very Likely', 'Maybe', 'Not Likely'],
    },
    {
      id: 6,
      text: 'Are you satisfied with the response time of our support team?',
      answers: ['Very Satisfied', 'Neutral', 'Not Satisfied'],
    },
    {
      id: 7,
      text: 'How do you rate the quality of our products?',
      answers: ['Excellent', 'Good', 'Poor'],
    },
    {
      id: 8,
      text: 'How likely are you to recommend our app to a friend or colleague?',
      answers: ['Very Likely', 'Neutral', 'Not Likely'],
    },
    {
      id: 9,
      text: 'Do you find our app easy to navigate?',
      answers: ['Yes, very easy', 'It could be better', 'No, it\'s difficult'],
    },
    {
      id: 10,
      text: 'Are you satisfied with the variety of features available in our app?',
      answers: ['Extremely Satisfied', 'Satisfied', 'Not Satisfied'],
    },
  ];
  

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState({});
  const [isTimeUp, setIsTimeUp] = useState(false);
  const [timer, setTimer] = useState(60); // Durasi dalam detik
  const [surveyStarted, setSurveyStarted] = useState(false);
  const [surveyCompleted, setSurveyCompleted] = useState(false);

  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prevTimer) => prevTimer - 1);
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    if (timer === 0 || currentQuestion === questions.length) {
      setIsTimeUp(true);
    }
  }, [timer, currentQuestion, questions.length]);

  const handleAnswerSelect = (answer) => {
    setSelectedAnswer({ ...selectedAnswer, [currentQuestion]: answer });
  };

  const handleSubmit = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion((prevQuestion) => prevQuestion + 1);
    } else {
      setSurveyCompleted(true);
    }
  };

  const restartSurvey = () => {
    setCurrentQuestion(0);
    setSelectedAnswer({});
    setIsTimeUp(false);
    setSurveyCompleted(false);
    setSurveyStarted(false);
    setTimer(60); // Reset timer to initial value
  };

  const startSurvey = () => {
    setSurveyStarted(true);
  };

  const back = () => {
    setCurrentQuestion(0);
    setSelectedAnswer({});
    setIsTimeUp(false);
    setSurveyCompleted(false);
    setSurveyStarted(false);
    setTimer(60);
  };

  return (
    <View style={styles.container}>
      {!surveyStarted ? (
        <View style={styles.startContainer}>
          <Text style={styles.startText}>Welcome to the Survey App</Text>
          <TouchableOpacity style={styles.button} onPress={startSurvey}>
            <Text style={styles.buttonText}>Start Survey</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.contentContainer}>
          <View style={styles.tabContainer}>
            {questions.map((question, index) => (
              <View key={index} style={[styles.tabItem, index === currentQuestion && styles.activeTab]} />
            ))}
          </View>
          {isTimeUp || surveyCompleted ? (
            <View style={styles.endContainer}>
              <Text style={styles.endText}>
                {surveyCompleted ? 'Thank you for completing the survey!' : 'Survey ended!'}
              </Text>
              {surveyCompleted ? (
                <TouchableOpacity style={styles.button} onPress={restartSurvey}>
                  <Text style={styles.buttonText}>Restart Survey</Text>
                </TouchableOpacity>
              ) : (
                <TouchableOpacity style={styles.button} onPress={back}>
                  <Text style={styles.buttonText}>Back</Text>
                </TouchableOpacity>
              )}
            </View>
          ) : (
            <View style={styles.questionContainer}>
              <Text style={styles.questionText}>Question {currentQuestion + 1}: {questions[currentQuestion].text}</Text>
              {questions[currentQuestion].answers.map((answer, index) => (
                <TouchableOpacity
                  key={index}
                  style={[styles.answerButton, selectedAnswer[currentQuestion] === answer && styles.selectedAnswer]}
                  onPress={() => handleAnswerSelect(answer)}
                  disabled={selectedAnswer[currentQuestion] !== undefined}
                >
                  <Text style={styles.buttonText}>{answer}</Text>
                </TouchableOpacity>
              ))}
              <TouchableOpacity
                style={[
                  styles.button,
                  selectedAnswer[currentQuestion] === undefined && { opacity: 0.5, backgroundColor: 'gray' },
                ]}
                onPress={handleSubmit}
                disabled={selectedAnswer[currentQuestion] === undefined}
              >
                <Text style={styles.buttonText}>Submit</Text>
              </TouchableOpacity>
              <Text style={styles.timerText}>Time left: {timer} seconds</Text>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F0F0F0',
    paddingHorizontal: 20,
    paddingVertical: 40,
  },
  startContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startText: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  contentContainer: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 15,
    padding: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
    width: '100%',
  },
  tabItem: {
    height: 5,
    backgroundColor: '#CCCCCC',
    borderRadius: 2,
    flex: 1,
  },
  activeTab: {
    backgroundColor: '#007AFF',
  },
  endContainer: {
    justifyContent: 'center',
    height: '100%',
    alignItems: 'center',
  },
  endText: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  questionContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  questionText: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
  answerButton: {
    paddingVertical: 10,
    width:200,
    paddingHorizontal: 20,
    backgroundColor: 'lightblue',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  selectedAnswer: {
    backgroundColor: 'lightgreen',
  },
  button: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: '#007AFF',
    borderRadius: 5,
    marginBottom: 10,
    alignItems: 'center',
  },
  buttonText: {
    fontSize: 16,
    color:'#fff'
  },
  timerText: {
    marginTop: 20,
    fontSize: 16,
  },
});

export default SurveyApp;
