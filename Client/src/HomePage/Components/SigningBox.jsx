import React from 'react'
import styles from './SigningBox.module.css'
import { useState } from "react";
import { NavLink } from 'react-router-dom'

const SigningBox = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [selected, setSelected] = useState("LogIn");

  const options = ["SignIn", "SignOut"];

  return (
    <div className={styles.SigningBox}>
      <button className={styles.logingButtons} onClick={() => setIsOpen(!isOpen)}>
        {selected}
      </button>
      {isOpen && (
        <div className={styles.optionBox}>
          {options.map((option, index) => (
            <div
              key={index}
              onClick={() => {
                setSelected(option);
                setIsOpen(false);
              }}>
              <NavLink to={option}>{option}</NavLink>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};
export default SigningBox;