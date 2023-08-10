import React, { useState } from "react";
import Layout from "./../../components/Layout/Layout";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import toast from "react-hot-toast";
// import firebase from "firebase/app";
// import "firebase/auth";

import { firebase, auth } from "./Firebase";
import "../../styles/AuthStyles.css";
const Register = () => {
  const [isChecked, setIsChecked] = useState(false);

  const handleCheckboxChange = () => {
    setIsChecked(!isChecked);
  };
  const [show, setshow] = useState(false);
  // Rest of your code...
  const [final, setfinal] = useState("");
  const [otp, setOtp] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [answer, setAnswer] = useState("");
  const [Okk, setOkk] = useState(false);
  const navigate = useNavigate();

  // form function
  const handleSubmit = async () => {
    try {
      // const otp = prompt("Enter the OTP you received on your phone:");

      // Confirm the verification code using the confirmation result
      // const result = await window.confirmationResult.confirm(otp);

      // If the confirmation succeeds, you can proceed with the registration process
      if (Okk && isChecked) {
        const res = await axios.post("/api/v1/auth/register", {
          name,
          email,
          password,
          phone,
          address,
          answer,
        });

        if (res && res.data.success) {
          toast.success(res.data && res.data.message);
          navigate("/login");
        } else {
          toast.error(res.data.message);
        }
      } else {
        toast.error("please Enter OTP");
      }
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong");
    }
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/api/v1/auth/register", {
  //       name,
  //       email,
  //       password,
  //       phone,
  //       address,
  //       answer,
  //     });
  //     if (res && res.data.success) {
  //       toast.success(res.data && res.data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };
  const signin = () => {
    if (phone === "" || phone.length < 10) return;

    let verify = new firebase.auth.RecaptchaVerifier("recaptcha-container");
    auth
      .signInWithPhoneNumber(phone, verify)
      .then((result) => {
        setfinal(result);
        alert("code sent");
        setshow(true);
      })
      .catch((err) => {
        alert(err);
        window.location.reload();
      });
  };
  const ValidateOtp = () => {
    if (otp === null || final === null) return;
    final
      .confirm(otp)
      .then((result) => {
        // success
        console.log("====================================");
        console.log("succ");
        console.log("====================================");
        toast.success("OTP Verified👍👍");
        setOkk(true);
      })
      .catch((err) => {
        alert("Wrong code");
        navigate("/");
      });
  };

  // const handlePhone = async (e) => {
  //   e.preventDefault();
  //   try {
  //     const res = await axios.post("/api/v1/auth/phone", {
  //       phone,
  //     });
  //     if (res && res.data.success) {
  //       toast.success(res.data && res.data.message);
  //       navigate("/login");
  //     } else {
  //       toast.error(res.data.message);
  //     }
  //   } catch (error) {
  //     console.log(error);
  //     toast.error("Something went wrong");
  //   }
  // };

  return (
    <Layout title="Register - Ecommer App">
      <div className="form-container" style={{ minHeight: "90vh" }}>
        <form onSubmit={handleSubmit}>
          <h4 className="title">REGISTER FORM</h4>
          <div className="mb-3">
            <input
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Name"
              required
              autoFocus
            />
          </div>
          <div className="mb-3">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Email "
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="form-control"
              id="exampleInputPassword1"
              placeholder="Enter Your Password"
              required
            />
          </div>
          <div className="mb-3">
            <input
              // type="text"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Phone"
              required
            />
          </div>
          <div id="recaptcha-container"></div>{" "}
          {/* Add this div for reCAPTCHA */}
          <button onClick={signin}> SEND OTP</button>{" "}
          <div style={{ display: show ? "block" : "none" }}>
            <input
              type="text"
              placeholder={"Enter your OTP"}
              onChange={(e) => {
                setOtp(e.target.value);
              }}
            ></input>
            <br />
            <br />
            <button onClick={ValidateOtp}>Verify</button>
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="Enter Your Address"
              required
            />
          </div>
          <div className="mb-3">
            <input
              type="text"
              value={answer}
              onChange={(e) => setAnswer(e.target.value)}
              className="form-control"
              id="exampleInputEmail1"
              placeholder="What is Your Favorite sports"
              required
            />
          </div>
          <label>
            <input
              type="checkbox"
              checked={isChecked}
              onChange={handleCheckboxChange}
              required
            />
            I agree to the{" "}
            {/* <button onClick={navigate("/termsandconditions")}>
              Terms and Conditions
            </button> */}
          </label>
          <br />
          <button type="submit" className="btn btn-primary">
            REGISTER
          </button>
        </form>
      </div>
      {/* </div> */}
    </Layout>
  );
};

export default Register;
