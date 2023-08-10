import React from "react";
import { useState } from "react";

import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

import { firebase, auth } from "./Firebase";
import "../../styles/AuthStyles.css";
import Layout from "./../../components/Layout/Layout";

const EmailPass = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const handleSubmitt = async (e) => {
    e.preventDefault();
    try {
      // Register the user using email and password
      if (!email.endsWith("@nitkkr.ac.in")) {
        toast.error("Please fill this by domain Id");
        return;
      }

      const { user } = await firebase
        .auth()
        .createUserWithEmailAndPassword(email, password);

      // Send verification email to the registered user
      if (user) {
        await user.sendEmailVerification();
        toast.success("Verification email sent. Please check your inbox.");
        // navigate(`/verify/${user.email}`);
      } else {
        toast.error(
          "Verification notttttt email sent. Please check your inbox."
        );
      }

      // Proceed with the user registration and data sending to the server
    } catch (error) {
      console.log(error);
      toast.error("Something went wrong", error);
    }
  };
  return (
    <Layout title="Register - Ecommer App">
      <br /> <br /> <br /> <br />
      <div style={{ textAlign: "center", marginTop: "50px" }}>
        <form
          onSubmit={handleSubmitt}
          style={{ width: "300px", margin: "auto" }}
        >
          <h4 style={{ fontSize: "24px", fontWeight: "bold" }}>
            Enter Your Domain Id of NIT KURUKSHETRA
          </h4>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              id="exampleInputEmail1"
              placeholder="Enter Your Email"
              required
            />
          </div>
          <div style={{ marginBottom: "10px" }}>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              style={{
                width: "100%",
                padding: "10px",
                borderRadius: "5px",
                border: "1px solid #ccc",
              }}
              id="exampleInputPassword1"
              placeholder="Enter Password(not necessarily of email Id)"
              required
            />
          </div>

          <button
            type="submit"
            style={{
              background: "blue",
              color: "white",
              padding: "10px 20px",
              borderRadius: "5px",
              border: "none",
              cursor: "pointer",
            }}
          >
            Verify Email
          </button>
        </form>
      </div>
    </Layout>
  );
};

export default EmailPass;
