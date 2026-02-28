import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "./firebase";
import { signInWithEmailAndPassword } from "firebase/auth";
import logo from "./logo.png";
import "./App.css";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
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
          Travel smarter. Travel safer.
        </p>
      </div>

      <div className="hero-card">
        <h2>Login</h2>

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

        <button className="primary-btn" onClick={handleLogin}>
          Login
        </button>

        <p className="switch-link" onClick={() => navigate("/")}>
          ← Back to Home
        </p>
      </div>

    </div>
  );
}

export default Login;