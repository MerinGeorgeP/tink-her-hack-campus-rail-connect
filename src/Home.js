import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { auth, db } from "./firebase";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import logo from "./logo.png";
import "./App.css";

function Home() {
  const [mode, setMode] = useState("welcome"); // welcome | login | register
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [phone, setPhone] = useState("");

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      alert(err.message);
    }
  };

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
          Travel smarter. Travel safer. Travel together.
        </p>
      </div>

      <div className="hero-card">

        {mode === "welcome" && (
          <>
            <h2>Welcome</h2>
            <p>
              Connect with fellow students traveling on the same train.
            </p>

            <button
              className="primary-btn"
              onClick={() => setMode("login")}
            >
              Login
            </button>

            <button
              className="secondary-btn"
              onClick={() => setMode("register")}
            >
              Register
            </button>
          </>
        )}

        {mode === "login" && (
          <>
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

            <p className="switch-link" onClick={() => setMode("welcome")}>
              ← Back
            </p>
          </>
        )}

        {mode === "register" && (
          <>
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

            <p className="switch-link" onClick={() => setMode("welcome")}>
              ← Back
            </p>
          </>
        )}

      </div>
    </div>
  );
}

export default Home;