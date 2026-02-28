import { useEffect, useState } from "react";
import { auth, db } from "./firebase";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { doc, getDoc } from "firebase/firestore";

function Dashboard() {
  const [username, setUsername] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        setUsername(userDoc.data().username);
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
    <div>
      <h1>Campus Rail Connect</h1>
      <p>Logged in as: {username}</p>

      <button onClick={() => navigate("/add-journey")}>
        Add Journey
      </button>

      <button onClick={() => navigate("/find-students")}>
        Find Students
      </button>

      <button onClick={() => navigate("/upload-ticket")}>
        Upload Ticket
      </button>

      <button onClick={() => navigate("/search-tickets")}>
        Search Tickets
      </button>

      <br /><br />

      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default Dashboard;