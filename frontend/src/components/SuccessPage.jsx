import React from "react";
import { useState } from "react";
import axios from "axios";
import { server } from "../server";
import { useHistory } from "react-router-dom";

const SuccessPage = ({ location }) => {
  const {firstName,lastName, emails,pincode, address, apartment, phone, totalPrice, cartItems,} = location.state || {};
  console.log( firstName, lastName, emails, pincode, address, apartment, phone, totalPrice, cartItems);
  const [name, setName] = useState("");
  const [amount, setAmount] = useState("");
  const history = useHistory();
  console.log(location.state);

  const handlePaymentSuccess = async (response) => {
    try {
      let bodyData = new FormData();

      // we will send the response we've got from razorpay to the backend to validate the payment
      bodyData.append("response", JSON.stringify(response));
      await axios({
        url: `${server}/razorpay/payment/success/`,
        method: "POST",
        data: bodyData,
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          // console.log("Everything is OK!");
          setName("");
          setAmount("");
          history.push({
            pathname: "/online",
            state: {
              firstName,
              lastName,
              emails,
              pincode,
              address,
              apartment,
              phone,
              cartItems: cartItems,
              totalPrice: totalPrice,
            },
          });
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (error) {
      console.log(console.error());
    }
  };

  const loadScript = () => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    document.body.appendChild(script);
  };

  const showRazorpay = async () => {
    if (!name.trim() || !amount.trim()) {
      alert("Name and amount cannot be empty.");
      return;
    }
    const res = await loadScript();

    let bodyData = new FormData();

    // we will pass the amount and product name to the backend using form data
    bodyData.append("amount", totalPrice);
    bodyData.append("name", name);

    const data = await axios({
      url: `${server}/razorpay/pay/`,
      method: "POST",
      headers: {
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      data: bodyData,
    }).then((res) => {
      return res;
    });

    var options = {
      key_id: "rzp_test_wucadtaz2NQLqm", // in react your environment variable must start with REACT_APP_
      key_secret: "Un2BvQcbNWU4MpjvhlF28G9W",
      amount: data.data.payment.amount,
      currency: "INR",
      name: "Ecommerce",
      description: "Test transaction",
      // image: "", // add image url
      order_id: data.data.payment.id,
      handler: function (response) {
        // we will handle success by calling handlePaymentSuccess method and
        // will pass the response that we've got from razorpay
        handlePaymentSuccess(response);
      },
      prefill: {
        name: "User's name",
        email: "User's email",
        contact: "User's phone",
      },
      notes: {
        address: "Razorpay Corporate Office",
      },
      theme: {
        color: "#3399cc",
      },
    };

    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };

  return (
    <div>
      <form>
        <div>
          <label htmlFor="name">Name</label>
          <input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>
        <label htmlFor="amount">Enter amount</label>
        <input
          type="number"
          id="amount"
          // value={amount}
          value={totalPrice}
          disabled
          onChange={(e) => setAmount(e.target.value)}
        />
      </form>
      <button type="submit" onClick={showRazorpay}>
        Submit
      </button>
    </div>
  );
};
export default SuccessPage;
