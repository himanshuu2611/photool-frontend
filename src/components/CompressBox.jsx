import React, { useState } from "react";

const CompressBox = ({ filename, setProcessedImage }) => {
  const [targetSize, setTargetSize] = useState("");

  const handleCompress = async () => {
    if (!filename) return alert("Upload an image first!");
    if (!targetSize) return alert("Enter a target size!");

    const res = await fetch("https://photool-backend.onrender.com/api/images/compress", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ 
        filename, 
        targetSizeKB: Number(targetSize)   // ✅ fix: send number with correct key
      }),
    });

    const data = await res.json();
    if (data.error) {
      alert(data.error);
      return;
    }

    setProcessedImage(`https://photool-backend.onrender.com/uploads/${data.filename}`);
  };

  return (
    <div className="bg-blue-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">
        Compress Image
      </h2>
      <input
        type="number"
        placeholder="Target size (KB)"
        value={targetSize}
        onChange={(e) => setTargetSize(e.target.value)}
        className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      <button
        onClick={handleCompress}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg"
      >
        Compress
      </button>
    </div>
  );
};

export default CompressBox;
