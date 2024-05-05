import { Link } from "react-router-dom";
import styles from "./Navbar.module.css";
import { FaShoppingBasket, FaUser, FaBars, FaTimes } from "react-icons/fa";
import { useState } from "react";

const Navbar = ({ cart }) => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleDropDown = () => {
    setIsOpen(!isOpen);
  };

  const closeDropDown =() => {
    setIsOpen(false)
  }
  const cartLength = cart.reduce((total, item) => total + item.quantity, 0);
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
            <li className={styles.profile}>
              <FaUser />
            </li>
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
              <li>
                <FaUser />
              </li>
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
            </ul>
          </div>
          </>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
