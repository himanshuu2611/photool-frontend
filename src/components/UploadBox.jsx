import React, { useState, useRef } from "react";

const UploadBox = ({ setFilename }) => {
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleUpload = async () => {
    if (!file) return alert("Select an image first!");
    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("https://photool-backend.onrender.com/api/images/upload", {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (data.filename) {
      setFilename(data.filename);
      alert("Uploaded successfully!");
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

      {/* Clear button for file selection */}
      <button
        type="button"
        onClick={(e) => {
          e.stopPropagation(); // prevent box click trigger
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
            e.stopPropagation(); // prevent box click trigger
            handleUpload();
          }}
          className="ml-2 bg-green-500 hover:bg-green-600 text-white px-6 py-2 rounded-lg font-semibold w-full sm:w-auto transition-all shadow-md hover:shadow-lg"
        >
          Upload
        </button>
      )}
    </div>
  );
};

export default UploadBox;
