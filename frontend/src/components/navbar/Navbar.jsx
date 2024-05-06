import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaShoppingBasket, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState,useEffect} from "react";
import {useHistory} from 'react-router-dom'


const Navbar = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);
  // const [loggedIn, setLoggedIn] = useState(false);
  const [isLog, setIsLog] = useState(() => !!JSON.parse(localStorage.getItem("loggedIn")));

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown =() => {
    setIsOpen(false)
  }
  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);

  const history = useHistory()

  // useEffect(() => {
  //   const isLoggedIn = localStorage.getItem("loggedIn") === "true";
  //   setLoggedIn(isLoggedIn);
  // }, [setLoggedIn]);
  useEffect(() => {
    // setIsLog(!!localStorage.getItem("loggedIn"));
    const loggedIn = localStorage.getItem("loggedIn") === "true";
    setIsLog(loggedIn);
  }, []);

  const handleLogout = () => {
    localStorage.removeItem('loggedIn');
    setIsLog(false);
    // setTimeout(() => {
      history.push('/login');
    // }, 2000);
  }

  

  const handleLogin = () => {
      history.push('/login');

  };

  // useEffect(() => {
  //   const handleResize = () => {
  //     if (window.innerWidth <= 921) {
  //       setIsOpen(false);
  //     }
  //   };

  //   window.addEventListener("resize", handleResize);

  //   return () => {
  //     window.removeEventListener("resize", handleResize);
  //   };
  // }, []);

  return (
    <div>
      <nav className={styles.navbar}>
        <div className={styles.header}>
          <Link to="/">
            <img src="/images/logo.svg" alt="" />
          </Link>
          <ul className={styles.groceries}>
            <li>
              <Link to="/everything">Everything</Link>
            </li>
            <li>
              <Link to="/Groceries">Groceries</Link>
            </li>
            <li>
              <Link to="/juice">Juice</Link>
            </li>
          </ul>
        </div>

        <div className={styles.header2}>
          <ul className={styles.about}>
            <li>
              <Link to="/about">About</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>

          <ul className={styles.icons}>
            <li className={styles.icon}>
              <Link to="/cart">
                <FaShoppingBasket />
                {cartLength}
              </Link>
            </li>
            
            {isLog ? (<li><button onClick={handleLogout}>Logout</button></li>) : ( <Link to="/login">Login</Link>)}
            {/* <li className={styles.profile}>
              <FaUser />
            </li> */}
            <li></li>
          </ul>
        </div>

        <div className={styles.toggleButton} onClick={toggleDropDown}>
          {isOpen ? <FaTimes /> : <FaBars />}
        </div>

        {isOpen && (
          <>
           <div className={styles.overlay} onClick={toggleDropDown}></div>
          <div className={`${styles.dropDownMenu} ${styles.open}`}>
          <FaTimes className={styles.closeIcon} onClick={toggleDropDown} />
            <ul>
              {/* <li>
                <FaUser />
              </li> */}
              <li>
                <Link to='/everything' onClick={closeDropDown}>Everything</Link>
                </li>
              <li>
              <Link to='/groceries' onClick={closeDropDown}>Groceries</Link></li>
              <li>
                <Link to='/juice' onClick={closeDropDown}>Juice</Link>
              </li>
              <li>
                <Link to="/about" onClick={closeDropDown}>About</Link>
              </li>
              <li>
                <Link to="/contact" onClick={closeDropDown}>Contact</Link>
              </li>
              <li>
              {isLog ? <Link to="/" onClick={handleLogout}>Logout</Link> : ( <Link to="/login">Login</Link>)}
              </li>
            </ul>
          </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
