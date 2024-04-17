import "./App.css";
import { Navbar } from "./components/Navbar";
import ReactQuill from "react-quill";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";

const modules = {
  toolbar: [
    [{ header: [1, 2, 3, 4, 5, 6, false] }],
    [{ font: [] }],
    [{ size: [] }],
    ["bold", "italic", "underline", "strike", "blockquote"],
    [
      { list: "ordered" },
      { list: "bullet" },
      { indent: "-1" },
      { indent: "+1" },
    ],
    ["link", "image", "video"],
  ],
};

function App() {
  const [value, setValue] = useState("");
  console.log(value);

  return (
    <>
      <div className="flex z-20">
        <Navbar className="flex z-20" />
      </div>
      <div className="relative h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-full w-2/4 flex items-center justify-center">
            <ReactQuill
              theme="snow"
              value={value}
              onChange={setValue}
              className="h-full w-full "
              modules={modules}
            />
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
