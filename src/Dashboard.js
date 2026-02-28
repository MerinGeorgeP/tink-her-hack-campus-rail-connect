import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, getDocs, query, where } from "firebase/firestore";
import logo from "./logo.png";
import "./App.css";

function Dashboard() {
  const [username, setUsername] = useState("");
  const [journeys, setJourneys] = useState([]);
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setUsername(userDoc.data().username);
        }

        // Fetch user journeys
        const journeyQuery = query(
          collection(db, "journeys"),
          where("userId", "==", user.uid)
        );
        const journeySnapshot = await getDocs(journeyQuery);
        setJourneys(journeySnapshot.docs.map(doc => doc.data()));

        // Fetch user tickets
        const ticketQuery = query(
          collection(db, "tickets"),
          where("userId", "==", user.uid)
        );
        const ticketSnapshot = await getDocs(ticketQuery);
        setTickets(ticketSnapshot.docs.map(doc => doc.data()));

      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = async () => {
    await signOut(auth);
    navigate("/");
  };

  return (
    <div className="app-container">

      {/* Header */}
      <div className="header">
        <img src={logo} alt="Logo" className="logo" />
        <div className="title">Campus Rail Connect</div>
      </div>

      {/* Welcome Card */}
      <div className="card">
        <p>Welcome, <strong>{username}</strong></p>

        <div className="cards-container">

          <div className="feature-card" onClick={() => navigate("/add-journey")}>
            <div className="feature-title">Add Journey</div>
            <div className="feature-desc">
              Post your travel details and let other students find you.
            </div>
          </div>

          <div className="feature-card" onClick={() => navigate("/find-students")}>
            <div className="feature-title">Find Students</div>
            <div className="feature-desc">
              Discover fellow students traveling on the same train.
            </div>
          </div>

          <div className="feature-card" onClick={() => navigate("/upload-ticket")}>
            <div className="feature-title">Upload Ticket</div>
            <div className="feature-desc">
              Share unused tickets securely.
            </div>
          </div>

          <div className="feature-card" onClick={() => navigate("/search-tickets")}>
            <div className="feature-title">Search Tickets</div>
            <div className="feature-desc">
              Find tickets matching your journey.
            </div>
          </div>

        </div>

        <br />
        <button className="logout-btn" onClick={handleLogout}>
          Logout
        </button>
      </div>

      {/* Your Activity Card */}
      <div className="form-card">
        <div className="page-title">Your Activity</div>

        <br />

        <h3>Your Journeys</h3>
        {journeys.length === 0 && <p>No journeys added yet.</p>}
        {journeys.map((journey, index) => (
          <div key={index} className="result-card">
            <p><strong>Train:</strong> {journey.train}</p>
            <p><strong>From:</strong> {journey.fromStation}</p>
            <p><strong>To:</strong> {journey.toStation}</p>
            <p><strong>Date:</strong> {journey.date}</p>
          </div>
        ))}

        <br />

        <h3>Your Tickets</h3>
        {tickets.length === 0 && <p>No tickets uploaded yet.</p>}
        {tickets.map((ticket, index) => (
          <div key={index} className="result-card">
            <p><strong>Train:</strong> {ticket.train}</p>
            <p><strong>Date:</strong> {ticket.date}</p>
            <p><strong>Seat Type:</strong> {ticket.seatType}</p>
            <p><strong>Coach:</strong> {ticket.coach}</p>
            <p><strong>Seat:</strong> {ticket.seat}</p>
            <p>
              <strong>Status:</strong>{" "}
              {ticket.claimed ? "Claimed" : "Available"}
            </p>
          </div>
        ))}
      </div>

    </div>
  );
}

export default Dashboard;