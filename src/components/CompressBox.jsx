import React, { useState } from "react";

const CompressBox = ({ filename, setProcessedImage }) => {
  const [quality, setQuality] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCompress = async () => {
    if (!filename) return alert("Upload an image first!");
    const q = Number(quality);
    if (!q || q < 1 || q > 100) return alert("Enter a valid quality (1-100)!");

    setLoading(true);
    try {
      const res = await fetch(
        "https://photool-backend.onrender.com/api/images/compress",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, quality: q }),
        }
      );

      if (!res.ok) {
        const text = await res.text();
        alert(`Server error: ${text}`);
        return;
      }

      const data = await res.json();
      if (data.error) {
        alert(data.error);
        return;
      }

      const compressedUrl = `https://photool-backend.onrender.com/uploads/${data.filename}`;
      setProcessedImage(compressedUrl);
      alert("Image compressed successfully!");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-blue-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-blue-800 mb-3">
        Compress Image
      </h2>

      <input
        type="number"
        placeholder="Quality (1-100)"
        value={quality}
        onChange={(e) => setQuality(e.target.value)}
        className="border p-2 rounded w-full mb-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        min="1"
        max="100"
        step="1"
      />

      <button
        onClick={handleCompress}
        disabled={loading}
        className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Compressing..." : "Compress"}
      </button>
    </div>
  );
};

export default CompressBox;
