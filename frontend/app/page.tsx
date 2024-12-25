"use client"

import Navigation from "./components/Navigation/Navigation";
import DragAndDrop from "./components/DragAndDrop/DragAndDrop";
export default function Home() {

  const handleFileSelect = (file) => {
    console.log("Selected file:", file);
  };


  return (
    <div className="">
      <Navigation/>
      <DragAndDrop onFileSelect={handleFileSelect} />
    </div>
  );
}
