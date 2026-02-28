import { useState } from "react";
import {
  collection,
  getDocs,
  doc,
  getDoc,
  updateDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { stations } from "./stations";
import "./App.css";

function SearchTickets() {
  const [fromStation, setFromStation] = useState("");
  const [toStation, setToStation] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    try {
      const snapshot = await getDocs(collection(db, "tickets"));
      const matched = [];

      for (const docSnap of snapshot.docs) {
        const data = docSnap.data();

        // Skip claimed tickets
        if (data.claimed === true) continue;

        // Date match
        if (date && data.date !== date) continue;

        // Boarding station match
        if (fromStation && data.fromStation !== fromStation) continue;

        // Deboarding logic
        if (toStation) {
          const ticketToIndex = stations.indexOf(data.toStation);
          const userToIndex = stations.indexOf(toStation);

          if (ticketToIndex === -1 || userToIndex === -1) continue;

          // Only show if user deboards before or at ticket destination
          if (userToIndex > ticketToIndex) continue;
        }

        // Get user details
        const userDoc = await getDoc(doc(db, "users", data.userId));
        if (!userDoc.exists()) continue;

        const userData = userDoc.data();

        matched.push({
          id: docSnap.id,
          ...data,
          username: userData.username,
          phone: userData.phone
        });
      }

      setResults(matched);

    } catch (error) {
      console.error(error);
      alert("Error searching tickets");
    }
  };

  const markClaimed = async (id) => {
    await updateDoc(doc(db, "tickets", id), { claimed: true });
    handleSearch(); // Refresh list
  };

  return (
    <div className="app-container">
      <div className="page-title">Search Tickets</div>
      <div className="page-subtitle">
        View all available trains for your selected date and stations.
      </div>

      <div className="form-card">
        <div className="form-grid">

          <select onChange={(e) => setFromStation(e.target.value)}>
            <option value="">Boarding Station</option>
            {stations.map((s) => (
              <option key={s}>{s}</option>
            ))}
          </select>

          <select onChange={(e) => setToStation(e.target.value)}>
            <option value="">Your Deboarding Station</option>
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
        <button onClick={handleSearch}>Search</button>
      </div>

      {results.length === 0 && (
        <div className="result-card">
          No matching tickets found.
        </div>
      )}

      {results.map((ticket) => (
        <div key={ticket.id} className="result-card">
            <p><strong>Train:</strong> {ticket.train}</p>
            <p><strong>Date:</strong> {ticket.date}</p>
            <p><strong>Seat Type:</strong> {ticket.seatType}</p>
            <p><strong>Coach:</strong> {ticket.coach}</p>
            <p><strong>Seat:</strong> {ticket.seat}</p>
            <p><strong>Name:</strong> {ticket.username}</p>
            <p><strong>Phone:</strong> {ticket.phone}</p>

            <button onClick={() => markClaimed(ticket.id)}>
            Mark Claimed
            </button>
        </div>
        ))}
      
    </div>
  );
}

export default SearchTickets;