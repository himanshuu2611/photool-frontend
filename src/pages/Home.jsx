import React, { useState, useRef } from "react";
import UploadBox from "../components/UploadBox";
import ResizeBox from "../components/ResizeBox";
import CompressBox from "../components/CompressBox";
import RotateBox from "../components/RotateBox";
import CropBox from "../components/CropBox";

const Home = () => {
  const [filename, setFilename] = useState("");
  const [processedImage, setProcessedImage] = useState("");

  // Ref for the processed image container
  const previewRef = useRef(null);

  // Function to scroll smoothly to the processed image
  const scrollToPreview = () => {
    if (previewRef.current) {
      previewRef.current.scrollIntoView({ behavior: "smooth" });
    }
  };

  // Wrapper function to set processed image and scroll
  const handleSetProcessedImage = (img) => {
    setProcessedImage(img);
    scrollToPreview();
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-purple-200 to-blue-50 p-4 sm:p-6 md:p-8">
      <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-center text-gray-800 mb-8">
        PhoTool
      </h1>

      {/* Upload Section */}
      <div className="max-w-lg sm:max-w-xl md:max-w-2xl mx-auto mb-6">
        <UploadBox setFilename={setFilename} />
      </div>

      {/* Operations Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 max-w-5xl mx-auto">
        <ResizeBox filename={filename} setProcessedImage={handleSetProcessedImage} />
        <CompressBox filename={filename} setProcessedImage={handleSetProcessedImage} />
        <RotateBox filename={filename} setProcessedImage={handleSetProcessedImage} />
        <CropBox filename={filename} setProcessedImage={handleSetProcessedImage} />
      </div>

      {/* Processed Image Preview */}
      {processedImage && (
  <div className="max-w-md sm:max-w-xl md:max-w-2xl mx-auto mt-8 bg-white p-6 rounded-2xl shadow-lg text-center">
    <h2 className="text-xl sm:text-2xl font-bold mb-4 text-gray-700">
      Processed Image
    </h2>
    <img
      src={processedImage}
      alt="Processed"
      className="mx-auto rounded-xl border border-gray-300 mb-4 max-w-[300px] sm:max-w-[300px] md:max-w-[400px] h-auto shadow-sm"
    />
    <a
      href={`https://photool-backend.onrender.com/api/images/download/${processedImage.split("/").pop()}`}
      className="inline-block bg-blue-500 hover:bg-blue-600 text-white font-semibold px-6 py-2 rounded-lg transition-all shadow-md hover:shadow-lg"
    >
      Download
    </a>
  </div>
)}
       <footer className="mt-10 py-4 text-center text-gray-700 text-sm border-t">
  © {new Date().getFullYear()} PhoTool [
  <a
    href="https://www.linkedin.com/in/himanshuu315/"
    target="_blank"
    rel="noopener noreferrer"
    className="text-blue-600 hover:underline"
  >
    Himanshu Tiwari
  </a>
  ]. All rights reserved.
</footer>


    </div>
  );
};

export default Home;
