import React, { useState } from "react";
import styles from "./Navbar.module.css";
import { GiHamburgerMenu } from "react-icons/gi";
import { NavLink } from "react-router-dom";
import SigningBox from "./SigningBox";
const Navbar = () => {
  const [showMenu, setShowMenu] = useState(false);

  const handleButtonToggle = () => {
    setShowMenu(!showMenu);
  };

  return (
    <header>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <button className={styles.button} onClick={handleButtonToggle}>
            <GiHamburgerMenu />
          </button>

          <div className={styles.logoBox}>LOGO</div>

          <nav className={showMenu ? styles.menumobile : styles.menuweb}>
            <ul>
              <li>
                <NavLink to={"/Home"}>Home</NavLink>
              </li>
              <li>
                <NavLink to={"/About"}>About</NavLink>
              </li>
              <li>
                <NavLink to={"/Contact"}>Contact</NavLink>
              </li>
              <li>
                <NavLink to={"/Services"}>Services</NavLink>
              </li>
              <li>
                <NavLink to={"/FeedBack"}>FeedBack</NavLink>
              </li>
            </ul>
          </nav>
          <div className={styles.hamMenu}></div>
          <SigningBox></SigningBox>
        </div>
      </div>
    </header>
  );
};

export default Navbar;
