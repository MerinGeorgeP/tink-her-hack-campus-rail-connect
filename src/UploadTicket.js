import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase";

function UploadTicket() {
  const [form, setForm] = useState({});

  const handleUpload = async () => {
    await addDoc(collection(db, "tickets"), {
      ownerId: auth.currentUser.uid,
      train: form.train,
      fromStation: form.from,
      toStation: form.to,
      coach: form.coach,
      seatNumber: form.seat,
      status: "AVAILABLE"
    });

    alert("Ticket Uploaded");
  };

  return (
    <div>
      <h3>Upload Ticket</h3>
      <input placeholder="Train"
        onChange={e => setForm({...form, train: e.target.value})} />
      <input placeholder="From"
        onChange={e => setForm({...form, from: e.target.value})} />
      <input placeholder="To"
        onChange={e => setForm({...form, to: e.target.value})} />
      <input placeholder="Coach"
        onChange={e => setForm({...form, coach: e.target.value})} />
      <input placeholder="Seat"
        onChange={e => setForm({...form, seat: e.target.value})} />
      <button onClick={handleUpload}>Upload Ticket</button>
    </div>
  );
}

export default UploadTicket;