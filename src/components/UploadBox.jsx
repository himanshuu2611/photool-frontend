import React, { useState, useRef } from "react";

const UploadBox = ({ setFilename }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return alert("Select an image first!");

    const formData = new FormData();
    formData.append("image", file);

    try {
      const res = await fetch("https://photool-backend.onrender.com/api/images/upload", {
        method: "POST",
        body: formData,
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

      if (data.filename) {
        setFilename(data.filename);
        alert("Uploaded successfully!");
      }
    } catch (err) {
      console.error(err);
      alert("Network error");
    }
  };

  // Trigger hidden input when user clicks anywhere inside the box
  const handleBoxClick = () => {
    fileInputRef.current.click();
  };

  return (
    <div
      onClick={handleBoxClick}
      className="cursor-pointer bg-white p-6 rounded-2xl shadow-md hover:shadow-lg transition-shadow text-center border-2 border-dashed border-blue-400 hover:border-blue-600"
    >
      <h2 className="text-lg sm:text-xl font-bold text-gray-700 mb-3">
        Upload Image
      </h2>

      {/* Hidden file input */}
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={(e) => setFile(e.target.files[0])}
        className="hidden"
      />

      {/* Show selected file name */}
      {file ? (
        <p className="text-sm text-gray-600 mb-3">{file.name}</p>
      ) : (
        <p className="text-sm text-gray-400 mb-3">Click anywhere to choose an image</p>
      )}

      <div className="flex flex-col sm:flex-row gap-2 justify-center">
        {/* Choose File button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            fileInputRef.current.click();
          }}
          className="bg-blue-500 hover:bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto transition-all shadow-md hover:shadow-lg"
        >
          Choose File
        </button>

        {/* Upload button */}
        {file && (
          <button
            onClick={(e) => {
              e.stopPropagation();
              handleUpload();
            }}
            className="bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto transition-all shadow-md hover:shadow-lg"
          >
            Upload
          </button>
        )}
      </div>
    </div>
  );
};

export default UploadBox;
