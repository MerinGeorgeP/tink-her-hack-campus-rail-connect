import { useState } from "react";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "./firebase";
import { stations } from "./stations";
import "./App.css";

function UploadTicket() {
  const [train, setTrain] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");
  const [coach, setCoach] = useState("");
  const [seat, setSeat] = useState("");
  const [seatType, setSeatType] = useState("");

  const handleUpload = async () => {
    try {
      await addDoc(collection(db, "tickets"), {
        train,
        fromStation,
        toStation,
        date,
        coach,
        seat,
        seatType,   // ✅ NEW FIELD
        userId: auth.currentUser.uid,
        claimed: false
      });

      alert("Ticket uploaded successfully!");

      // Reset
      setTrain("");
      setCoach("");
      setSeat("");
      setSeatType("");

    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="app-container">
      <div className="page-title">Upload Ticket</div>
      <div className="page-subtitle">
        Share unused tickets securely with other students.
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

          <select onChange={(e) => setSeatType(e.target.value)}>
            <option>Seat Type</option>
            <option value="SL">Sleeper (SL)</option>
            <option value="3A">AC 3 Tier (3A)</option>
            <option value="2A">AC 2 Tier (2A)</option>
            <option value="1A">AC First Class (1A)</option>
            <option value="CC">Chair Car (CC)</option>
            <option value="2S">Second Sitting (2S)</option>
          </select>

          <input
            placeholder="Coach"
            onChange={(e) => setCoach(e.target.value)}
          />

          <input
            placeholder="Seat Number"
            onChange={(e) => setSeat(e.target.value)}
          />

        </div>

        <br />
        <button onClick={handleUpload}>Upload Ticket</button>
      </div>
    </div>
  );
}

export default UploadTicket;