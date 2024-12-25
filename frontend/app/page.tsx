"use client";

import Navigation from "./components/Navigation/Navigation";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
import Footer from "./components/Footer/Footer";

export default function Home() {
  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
  };

  return (
    <div className="flex flex-col min-h-screen">
      <Navigation />
      <div className="flex-grow">
        <DragAndDrop onFileSelect={handleFileSelect} />
      </div>
      <Footer />
    </div>
  );
}