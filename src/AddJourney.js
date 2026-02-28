import { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db, auth } from "./firebase";

function AddJourney() {
  const [form, setForm] = useState({});

  const handleAdd = async () => {
    if (!form.train || !form.from) {
      alert("Fill required fields");
      return;
    }

    await addDoc(collection(db, "journeys"), {
      userId: auth.currentUser.uid,
      train: form.train,
      fromStation: form.from,
      toStation: form.to,
      date: form.date
    });

    alert("Journey Added");
  };

  return (
    <div>
      <h3>Add Journey</h3>
      <input placeholder="Train Name"
        onChange={e => setForm({...form, train: e.target.value})} />
      <input placeholder="From"
        onChange={e => setForm({...form, from: e.target.value})} />
      <input placeholder="To"
        onChange={e => setForm({...form, to: e.target.value})} />
      <input type="date"
        onChange={e => setForm({...form, date: e.target.value})} />
      <button onClick={handleAdd}>Add Journey</button>
    </div>
  );
}

export default AddJourney;