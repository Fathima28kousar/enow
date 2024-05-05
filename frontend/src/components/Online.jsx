import React from 'react'
import {useEffect,useState} from 'react'
import { useLocation } from 'react-router-dom';
import axios from 'axios'

const Online = ({setCart}) => {
    const location = useLocation();
    console.log(location.state);
    const [formData, setFormData] = useState(null);
    const formdata = location.state
    console.log(formdata)
    const { firstName, lastName, emails, pincode, address, apartment, phone } = location.state || {};
    const { cartItems, totalPrice } = location.state || {};
    console.log(cartItems,totalPrice)
    console.log(firstName, lastName, emails, pincode, address, apartment, phone)


    
  useEffect(() => {
    // Call handleSuccess when the component mounts
    handleSuccess();
    fetchData();
  }, []);


  const fetchData = async () => {
    try {
        // Fetch data from backend API based on form ID (replace 'formId' with actual ID)
        const response = await axios.get(`http://127.0.0.1:8000/api/`);

        // Set form data in component state
        setFormData(response.data);
        
    } catch (error) {
        console.error('Error fetching data:', error);
    }
};



  const handleSuccess = () => {
    // Clear the cart when the order is successful
    setCart([]);
    localStorage.removeItem('cart');
  };

  if (!cartItems || !totalPrice) {
    return <div>No items in cart.</div>;
  }
  return (
    <div>
      <div>
      {location.state ? (
        <div>
          <h1>Your online Order is Successfully placed</h1>
          <p>First Name: {firstName}</p>
          <p>Last Name: {lastName}</p>
          <p>Email: {emails}</p>
          <p>Pincode: {pincode}</p>
          <p>Address: {address}</p>
          <p>Apartment: {apartment}</p>
          <p>Phone: {phone}</p>

      </div>
      ) : (
        <p>No order details available.</p>
      )}
      </div>
      <div>
        Order details:
      {cartItems && cartItems.length > 0 ? (
        <ul>
          {cartItems.map((item, index) => (
            <li key={index}>
              {/* Render each cart item details */}
              <p>{item.name}</p>
              <p>{item.quantity}</p>
              {/* Add more details if needed */}
            </li>
          ))}
        </ul>
      ) : (
        <p>No items in cart.</p>
      )}
      </div>
      <div>
        <h2>Total Price: ${totalPrice}</h2>
      </div>
    </div>
  )
}

export default Online

