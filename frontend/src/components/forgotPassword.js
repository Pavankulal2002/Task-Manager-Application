import { sendPasswordResetEmail } from "firebase/auth";
import React, { useState } from "react";
import { auth } from "./firebase";
import { toast } from "react-toastify";
import '../index.css'

function ForgotPassword() {
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      sendPasswordResetEmail(auth, email)
        .then(() => {
          toast.success("Reset mail sent successfully.\/n Please check your mail", {
            position: "top-center",
          });
          window.location.href = "/login";
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.log(errorMessage)
        });

    } catch (error) {
      console.log(error.message);

      toast.error(error.message, {
        position: "bottom-center",
      });
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h3>Reset Password</h3>

      <div className="mb-3">
        <label>Email address</label>
        <input
          type="email"
          className="form-control"
          placeholder="Enter email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
      </div>
      <div className="d-grid">
        <button type="submit" className="btn btn-primary">
          Reset Password
        </button>
      </div>


    </form>
  );
}

export default ForgotPassword;
