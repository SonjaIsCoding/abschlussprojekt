import "./App.css";
import { Navbar } from "./components/Navbar";
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";

const rootId = uuid();
const bookId = uuid();
const chapterOneId = uuid();
const sceneOneId = uuid();
const sceneTwoId = uuid();
const sceneThreeId = uuid();
const chapterTwoId = uuid();
const ideasId = uuid();
const charactersId = uuid();

const folder = [
  {
    id: rootId,
    name: "Root",
    children: [bookId, ideasId, charactersId],
    isBranch: true,
    parent: null,
  },
  {
    id: bookId,
    name: "Book",
    isBranch: true,
    children: [chapterOneId],
    parent: rootId,
  },
  {
    id: chapterOneId,
    name: "Kapitel 1",
    isBranch: true,
    children: [sceneOneId, sceneTwoId, sceneThreeId],
    parent: bookId,
  },
  {
    id: sceneOneId,
    name: "Szene 1",
    isBranch: false,
    children: [],
    parent: chapterOneId,
  },
  {
    id: sceneTwoId,
    name: "Szene 2",
    isBranch: false,
    children: [],
    parent: chapterOneId,
  },
  {
    id: sceneThreeId,
    name: "Szene 3",
    isBranch: false,
    children: [],
    parent: chapterOneId,
  },
  {
    id: chapterTwoId,
    name: "Kapitel 2",
    isBranch: true,
    children: [],
    parent: bookId,
  },
  {
    id: ideasId,
    name: "Ideen",
    isBranch: true,
    children: [],
    parent: rootId,
  },
  {
    id: charactersId,
    name: "Charactere",
    isBranch: true,
    children: [],
    parent: rootId,
  },
];

const fileContents = [
  {
    id: sceneOneId,
    content: "Hello World! This is Scene 1.",
  },
  {
    id: sceneTwoId,
    content: "Hello World!  This is Scene 2.",
  },
  {
    id: sceneThreeId,
    content: "Hello World!  This is Scene 3.",
  },
];

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
  const [selectedNodeId, setSelectedNodeId] = useState(rootId);
  const [tree, setTree] = useState(folder);
  const [value, setValue] = useState("");

  const currentContent = fileContents.find(
    (file) => file.id === selectedNodeId
  );

  useEffect(() => {
    setValue(currentContent?.content);
  }, [currentContent]);

  function handleAddNode(isBranch) {
    const nodeName = window.prompt(
      `Wie soll ${isBranch ? "der neue Folder" : "die neue Datei"} heißen?`,
      `New ${isBranch ? "folder" : "file"}`
    );
    if (!nodeName) return;

    const currentNode = tree.find((treeNode) => treeNode.id === selectedNodeId);
    if (currentNode.isBranch === false) {
      // ist kein Ordner
      const parentId = currentNode.parent;
      const parentNode = tree.find((treeNode) => treeNode.id === parentId);

      const newNode = {
        id: uuid(),
        name: nodeName,
        isBranch,
        children: [],
        parent: parentNode.id,
      };

      const newTree = tree.map((node) => {
        if (node.id === parentNode.id) {
          return {
            ...node,
            children: [...node.children, newNode.id],
          };
        } else {
          return node;
        }
      });
      setTree([...newTree, newNode]);
    } else {
      // ist ein Ordner

      const newNode = {
        id: uuid(),
        name: nodeName,
        isBranch,
        children: [],
        parent: selectedNodeId,
      };

      const newTree = tree.map((node) => {
        if (node.id === selectedNodeId) {
          return {
            ...node,
            children: [...node.children, newNode.id],
          };
        } else {
          return node;
        }
      });
      setTree([...newTree, newNode]);
    }
  }

  return (
    <>
      <div className="flex z-20">
        <Navbar
          className="flex z-20"
          onHandleAdd={handleAddNode}
          selectedNodeId={selectedNodeId}
          setSelectedNodeId={setSelectedNodeId}
          tree={tree}
          setTree={setTree}
        />
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
