import React, { useState } from "react";

const RotateBox = ({ filename, setProcessedImage }) => {
  const [angle, setAngle] = useState("");
  const [loading, setLoading] = useState(false);

  const handleRotate = async () => {
    if (!filename) return alert("Upload an image first!");

    const ang = Number(angle);
    if (isNaN(ang)) return alert("Enter a valid number for angle!");

    setLoading(true);
    try {
      const res = await fetch(
        "https://photool-backend.onrender.com/api/images/rotate",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, angle: ang }),
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

      const rotatedUrl = `https://photool-backend.onrender.com/uploads/${data.filename}`;
      setProcessedImage(rotatedUrl);
      alert("Image rotated successfully!\nScroll down to Download !");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
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
        disabled={loading}
        className="bg-yellow-500 hover:bg-yellow-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Rotating..." : "Rotate"}
      </button>
    </div>
  );
};

export default RotateBox;
