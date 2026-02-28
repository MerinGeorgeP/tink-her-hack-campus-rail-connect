import { useNavigate } from "react-router-dom";

function Home() {
  const navigate = useNavigate();

  return (
    <div style={{ textAlign: "center", marginTop: "100px" }}>
      <h1>Campus Rail Connect</h1>
      <p>Travel safely with fellow students</p>

      <button onClick={() => navigate("/login")} style={{ margin: "10px" }}>
        Login
      </button>

      <button onClick={() => navigate("/register")} style={{ margin: "10px" }}>
        Register
      </button>
    </div>
  );
}

export default Home;