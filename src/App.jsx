import "./App.css";
import { Navbar } from "./components/Navbar";
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import axios from "axios";

const API_URL = "http://localhost:3000";
const initialRootId = uuid();

const fileContents = [];

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
  const [selectedNodeId, setSelectedNodeId] = useState(initialRootId);
  const [tree, setTree] = useState([
    {
      id: initialRootId,
      name: "Root",
      children: [],
      isBranch: true,
      parent: null,
    },
  ]);
  const [selectedNote, setSelectedNote] = useState(null);
  const [isDirty, setIsDirty] = useState(false);

  useEffect(() => {
    async function loadTree() {
      try {
        const { data } = await axios.get(`${API_URL}/nodes`);
        console.log(data);
        const rootElement = data.find((node) => !node.parent);
        setSelectedNodeId(rootElement.id);
        setTree(data);
      } catch (err) {
        console.log(err);
      }
    }
    loadTree();
  }, []);

  useEffect(() => {
    async function loadContent() {
      try {
        const { data } = await axios.get(`${API_URL}/notes/${selectedNodeId}`);
        setSelectedNote(data);
        setIsDirty(false);
        console.log(data);
      } catch (err) {
        setSelectedNote(null);
        console.log(err);
      }
    }
    loadContent();
  }, [selectedNodeId]);

  async function saveContent() {
    if (!selectedNote) return;
    try {
      await axios.put(`${API_URL}/notes/${selectedNote._id}`, {
        content: selectedNote.content,
      });
    } catch (err) {
      console.log(err);
    }
  }

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

  const rootElement = tree.find((node) => !node.parent);
  console.log({ selectedNote });
  console.log({ selectedNodeId });

  return (
    <>
      <div className="flex z-20">
        <Navbar
          className="flex z-20"
          onHandleAdd={handleAddNode}
          selectedNodeId={selectedNodeId}
          onSelectedNodeId={(nodeId) => {
            console.log(nodeId);
            setSelectedNodeId(nodeId);
          }}
          tree={tree}
          setTree={setTree}
          rootId={rootElement.id}
        />
      </div>
      <div className="relative h-screen w-full">
        <div className="flex h-full w-full items-center justify-center">
          <div className="relative h-full w-2/4 flex items-center justify-center">
            {selectedNote ? (
              <>
                <ReactQuill
                  theme="snow"
                  value={selectedNote?.content || ""}
                  onChange={(text) => {
                    setIsDirty(true);
                    setSelectedNote((prev) => {
                      return { ...prev, content: text };
                    });
                  }}
                  className="h-full w-full "
                  modules={modules}
                />
                <button
                  className="border p-2 disabled:text-gray-400"
                  disabled={!isDirty}
                  onClick={() => {
                    saveContent();
                  }}
                >
                  Save
                </button>
              </>
            ) : (
              <h2>No content selected</h2>
            )}
          </div>
        </div>
      </div>
    </>
  );
}

export default App;
