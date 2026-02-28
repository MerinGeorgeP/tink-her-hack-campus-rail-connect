import { useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";

function SearchJourney() {
  const [train, setTrain] = useState("");
  const [from, setFrom] = useState("");
  const [results, setResults] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "journeys"),
      where("train", "==", train),
      where("fromStation", "==", from)
    );

    const snapshot = await getDocs(q);

    const users = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const journeyData = docSnap.data();

        const userDoc = await getDoc(
          doc(db, "users", journeyData.userId)
        );

        return userDoc.data();
      })
    );

    setResults(users);
  };

  return (
    <div>
      <h3>Find Students</h3>

      <input
        placeholder="Train"
        onChange={(e) => setTrain(e.target.value)}
      />

      <input
        placeholder="From"
        onChange={(e) => setFrom(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {results.map((user, i) => (
        <div key={i}>
          <p>Name: {user.username}</p>
          <p>Phone: {user.phone}</p>
        </div>
      ))}
    </div>
  );
}

export default SearchJourney;