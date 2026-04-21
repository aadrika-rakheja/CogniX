import axios from 'axios';
import sampleQuestions from '../data/sampleQuestions.js';

const addSampleQuestions = async () => {
  const token = localStorage.getItem('token');

  if (!token) {
    console.error('No token found. Please login first.');
    return;
  }

  try {
    for (const question of sampleQuestions) {
      const response = await axios.post(
        'https://cognix-v9mv.onrender.com/api/questions',
        question,
        {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          }
        }
      );
      console.log('Added question:', question.question);
    }
    console.log('All sample questions added successfully!');
  } catch (error) {
    console.error('Error adding questions:', error.response?.data || error.message);
  }
};

// Run the function
addSampleQuestions();