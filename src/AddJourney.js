import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { stations } from "./stations";
import "./App.css";

function AddJourney() {
  const [train, setTrain] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");

  const handleAdd = async () => {
    try {
      await addDoc(collection(db, "journeys"), {
        train,
        fromStation,
        toStation,
        date,
        userId: auth.currentUser.uid
      });

      alert("Journey added successfully!");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="page-title">Add Journey</div>
      <div className="page-subtitle">
        Share your travel details so other students can connect with you.
      </div>

      <div className="form-card">
        <div className="form-grid">
          <input
            placeholder="Train Name"
            onChange={(e) => setTrain(e.target.value)}
          />

          <select onChange={(e) => setFromStation(e.target.value)}>
            <option>Boarding Station</option>
            {stations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select onChange={(e) => setToStation(e.target.value)}>
            <option>Deboarding Station</option>
            {stations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />
        <button onClick={handleAdd}>Add Journey</button>
      </div>
    </div>
  );
}

export default AddJourney;