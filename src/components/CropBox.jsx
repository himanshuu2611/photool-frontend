import React, { useState } from "react";

const CropBox = ({ filename, setProcessedImage }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");

  const handleCrop = async () => {
    if (!filename) return alert("Upload an image first!");
    const res = await fetch("https://photool-backend.onrender.com/api/images/crop", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ filename, width, height }),
    });
    const data = await res.json();
    setProcessedImage(`https://photool-backend.onrender.com/uploads/${data.filename}`);
  };

  return (
    <div className="bg-green-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-3">Crop Image</h2>
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-green-400"
        />
      </div>
      <button
        onClick={handleCrop}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Crop
      </button>
    </div>
  );
};

export default CropBox;
