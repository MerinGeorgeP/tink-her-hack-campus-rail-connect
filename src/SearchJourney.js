import { useState } from "react";
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";
import { stations } from "./stations";
import "./App.css";

function SearchJourney() {
  const [train, setTrain] = useState("");
  const [fromStation, setFromStation] = useState("");
  const [date, setDate] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "journeys"),
      where("train", "==", train),
      where("fromStation", "==", fromStation),
      where("date", "==", date)
    );

    const snapshot = await getDocs(q);

    const users = [];

    for (const docSnap of snapshot.docs) {
      const data = docSnap.data();
      const userDoc = await getDoc(doc(db, "users", data.userId));
      users.push(userDoc.data());
    }

    setResults(users);
  };

  return (
    <div className="app-container">
      <div className="page-title">Find Students</div>
      <div className="page-subtitle">
        Discover students traveling on the same train and date.
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

          <input
            type="date"
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <br />
        <button onClick={handleSearch}>Search</button>
      </div>

      {results.map((user, i) => (
        <div key={i} className="result-card">
          <p><strong>Name:</strong> {user.username}</p>
          <p><strong>Phone:</strong> {user.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchJourney;