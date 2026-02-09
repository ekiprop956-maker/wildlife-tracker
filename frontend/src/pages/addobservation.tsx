import "./addobservation.css";
import { useState } from "react";

export default function AddObservation() {
  const [species, setSpecies] = useState("");
  const [location, setLocation] = useState("");
  const [date, setDate] = useState("");
  const [notes, setNotes] = useState("");
  const [image, setImage] = useState<File | null>(null);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!image) {
      alert("Please upload an image for this observation.");
      return;
    }

   
    console.log({
      species,
      location,
      date,
      notes,
      image,
    });

    alert("Observation added successfully!");
    
    // Reset form
    setSpecies("");
    setLocation("");
    setDate("");
    setNotes("");
    setImage(null);

   
    const fileInput = document.getElementById("image") as HTMLInputElement;
    if (fileInput) fileInput.value = "";
  };

  return (
    <div className="observation-container">
      <h1>Add Observation</h1>
      <form onSubmit={handleSubmit}>
        <label htmlFor="species">Species</label>
        <input
          type="text"
          id="species"
          value={species}
          onChange={(e) => setSpecies(e.target.value)}
          placeholder="Enter species name"
          required
        />

        <label htmlFor="location">Location</label>
        <input
          type="text"
          id="location"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          placeholder="Enter location"
          required
        />

        <label htmlFor="date">Date of Observation</label>
        <input
          type="date"
          id="date"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />

        <label htmlFor="notes">Additional Notes</label>
        <textarea
          id="notes"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          placeholder="Any other details..."
        ></textarea>

        <label htmlFor="image">Upload Image</label>
        <input
          type="file"
          id="image"
          accept="image/*"
          onChange={(e) => {
            if (e.target.files) setImage(e.target.files[0]);
          }}
          required
        />

        <button type="submit">Add Observation</button>
      </form>
    </div>
  );
}
