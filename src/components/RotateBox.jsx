import React, { useState } from "react";

const RotateBox = ({ filename, setProcessedImage }) => {
  const [angle, setAngle] = useState("");

  const handleRotate = async () => {
    if (!filename) return alert("Upload an image first!");
    const res = await fetch("https://photool-backend.onrender.com/api/images/rotate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, angle }),
    });
    const data = await res.json();
    setProcessedImage(`https://photool-backend.onrender.com/uploads/${data.filename}`);
  };

  return (
    <div className="bg-yellow-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-yellow-800 mb-3">Rotate Image</h2>
      <input
        type="number"
        placeholder="Angle (degrees)"
        value={angle}
        onChange={(e) => setAngle(e.target.value)}
        className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-yellow-400"
      />
      <button
        onClick={handleRotate}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Rotate
      </button>
    </div>
  );
};

export default RotateBox;
