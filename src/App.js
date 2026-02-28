import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";
import Register from "./Register";
import Login from "./Login";
import Dashboard from "./Dashboard";
import AddJourney from "./AddJourney";
import SearchJourney from "./SearchJourney";
import UploadTicket from "./UploadTicket";
import SearchTickets from "./SearchTickets";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/add-journey" element={<AddJourney />} />
        <Route path="/find-students" element={<SearchJourney />} />
        <Route path="/upload-ticket" element={<UploadTicket />} />
        <Route path="/search-tickets" element={<SearchTickets />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;