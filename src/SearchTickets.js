import { useState } from "react";
import {
  query,
  where,
  getDocs,
  collection,
  updateDoc,
  doc,
  getDoc
} from "firebase/firestore";
import { db } from "./firebase";

function SearchTickets() {
  const [train, setTrain] = useState("");
  const [from, setFrom] = useState("");
  const [tickets, setTickets] = useState([]);

  const handleSearch = async () => {
    const q = query(
      collection(db, "tickets"),
      where("train", "==", train),
      where("fromStation", "==", from),
      where("status", "==", "AVAILABLE")
    );

    const snapshot = await getDocs(q);

    const detailedTickets = await Promise.all(
      snapshot.docs.map(async (docSnap) => {
        const ticketData = docSnap.data();

        const userDoc = await getDoc(
          doc(db, "users", ticketData.ownerId)
        );

        return {
          id: docSnap.id,
          ...ticketData,
          username: userDoc.data().username,
          phone: userDoc.data().phone
        };
      })
    );

    setTickets(detailedTickets);
  };

  const markClaimed = async (id) => {
    await updateDoc(doc(db, "tickets", id), {
      status: "CLAIMED"
    });
    alert("Ticket Claimed");
  };

  return (
    <div>
      <h3>Search Tickets</h3>

      <input
        placeholder="Train"
        onChange={(e) => setTrain(e.target.value)}
      />

      <input
        placeholder="From"
        onChange={(e) => setFrom(e.target.value)}
      />

      <button onClick={handleSearch}>Search</button>

      {tickets.map((ticket) => (
        <div key={ticket.id}>
          <p>Name: {ticket.username}</p>
          <p>Phone: {ticket.phone}</p>
          <p>Seat: {ticket.seatNumber}</p>
          <p>Coach: {ticket.coach}</p>

          <button onClick={() => markClaimed(ticket.id)}>
            Mark Claimed
          </button>
        </div>
      ))}
    </div>
  );
}

export default SearchTickets;