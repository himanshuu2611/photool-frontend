import React, { useState } from "react";

const ResizeBox = ({ filename, setProcessedImage }) => {
  const [width, setWidth] = useState("");
  const [height, setHeight] = useState("");
  const [loading, setLoading] = useState(false);

  const handleResize = async () => {
    if (!filename) return alert("Upload an image first!");

    const w = Number(width);
    const h = Number(height);

    if (!w || !h || w <= 0 || h <= 0)
      return alert("Enter valid positive numbers for width and height!");

    setLoading(true);
    try {
      const res = await fetch("https://photool-backend.onrender.com/api/images/resize", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ filename, width: w, height: h }),
      });

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

      const resizedUrl = `https://photool-backend.onrender.com/uploads/${data.filename}`;
      setProcessedImage(resizedUrl);
      alert("Image resized successfully !\nScroll down to Download !");
    } catch (err) {
      console.error(err);
      alert("Network error");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-red-50 p-4 sm:p-5 md:p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow">
      <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3">Resize Image</h2>
      
      <div className="flex flex-col sm:flex-row gap-2 mb-3">
        <input
          type="number"
          placeholder="Width"
          value={width}
          onChange={(e) => setWidth(e.target.value)}
          min="1"
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
        <input
          type="number"
          placeholder="Height"
          value={height}
          onChange={(e) => setHeight(e.target.value)}
          min="1"
          className="border p-2 rounded w-full sm:w-1/2 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <button
        onClick={handleResize}
        disabled={loading}
        className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg w-full font-semibold transition-all shadow-md hover:shadow-lg disabled:opacity-50"
      >
        {loading ? "Resizing..." : "Resize"}
      </button>
    </div>
  );
};

export default ResizeBox;
