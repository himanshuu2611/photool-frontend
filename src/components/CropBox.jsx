import React, { useState } from "react";

const CropBox = ({ filename, setProcessedImage }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [left, setLeft] = useState("");
  const [top, setTop] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCrop = async () => {
    if (!filename) return alert("Upload an image first!");

    const w = Number(width),
      h = Number(height),
      l = Number(left),
      t = Number(top);

    if (!w || !h || l < 0 || t < 0)
      return alert("Enter valid numbers for width, height, left, and top!");

    setLoading(true);
    try {
      const res = await fetch(
        "https://photool-backend.onrender.com/api/images/crop",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ filename, width: w, height: h, left: l, top: t }),
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

      const croppedUrl = `https://photool-backend.onrender.com/uploads/${data.filename}`;
      setProcessedImage(croppedUrl);
      alert("Image cropped successfully!");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-green-100 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-green-800 mb-3">Crop Image</h2>

      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        {["Width", "Height", "Left", "Top"].map((label, idx) => {
          const stateSetters = [setWidth, setHeight, setLeft, setTop];
          const stateValues = [width, height, left, top];
          return (
            <input
              key={idx}
              type="number"
              min={label === "Left" || label === "Top" ? 0 : 1}
              placeholder={label}
              value={stateValues[idx]}
              onChange={(e) => stateSetters[idx](e.target.value)}
              className="border p-2 rounded w-full sm:w-1/4 focus:outline-none focus:ring-2 focus:ring-green-400"
            />
          );
        })}
      </div>

      <button
        onClick={handleCrop}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Cropping..." : "Crop"}
      </button>
    </div>
  );
};

export default CropBox;
