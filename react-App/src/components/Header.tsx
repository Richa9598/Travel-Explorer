import React from 'react';
import './Component.css';
type HeaderProps = {
    title : string;
    item: number
  }
  
  // interface HeaderProps {
  //   title : String,
  //   item: number
  // }
  
  const Header = ({ title, item } : HeaderProps) => {
    // console.log(props);
    return (
      <header>
        <h1>{title}</h1>
        <h2>Total Number of Task: {item}</h2>
      </header>
    );
  };
  export default Header;
  