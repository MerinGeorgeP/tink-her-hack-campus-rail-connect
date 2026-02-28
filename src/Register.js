import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import logo from "./logo.png";
import "./App.css";

function Register() {
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [phone, setPhone] = useState("");

  const handleRegister = async () => {
    try {
      const userCred = await createUserWithEmailAndPassword(auth, email, password);

      await setDoc(doc(db, "users", userCred.user.uid), {
        username,
        email,
        phone
      });

      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

  return (
    <div className="hero-container">

      <div className="hero-left">
        <img src={logo} alt="Logo" className="hero-logo" />
        <h1 className="hero-title">Campus Rail Connect</h1>
        <p className="hero-subtitle">
          Join the student travel network.
        </p>
      </div>

      <div className="hero-card">
        <h2>Register</h2>

        <input
          className="auth-input"
          placeholder="Username"
          onChange={(e) => setUsername(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="College Email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="auth-input"
          type="password"
          placeholder="Password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          className="auth-input"
          placeholder="Phone Number"
          onChange={(e) => setPhone(e.target.value)}
        />

        <button className="primary-btn" onClick={handleRegister}>
          Register
        </button>

        <p className="switch-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>
      </div>

    </div>
  );
}

export default Register;