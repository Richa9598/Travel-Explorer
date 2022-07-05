import React from 'react';
import { useNavigate } from 'react-router-dom';

type Props = {};

const About = (props: Props) => {
  const navigate = useNavigate();
  const handleClick = () => {
    navigate('/task-list');
  };
  return (
    <div className='page-style'>
      <h1>Saransh Agarwal</h1>
      <h1>Khyati Dhiver</h1>
      <h2>N01421204 - Semester 4</h2>
      <h3>Web Programming and Frameworks 2</h3>

      <button onClick={handleClick}>Back To Task List</button>
    </div>
  );
};

export default About;