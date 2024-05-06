import "./App.css";
import { Navbar } from "./components/Navbar";
import ReactQuill from "react-quill";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { v4 as uuid } from "uuid";
import axios from "axios";
import { FaRegSave } from "react-icons/fa";

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

  async function handleDeleteNode() {
    const selectedNode = tree.find((node) => node.id === selectedNodeId);
    if (!selectedNode) return;
    if (selectedNode.children.length > 0) return;
    const parent = tree.find((node) => selectedNode.parent === node.id);
    if (!parent) return;
    const newTree = tree.map((node) => {
      if (node.id !== parent.id) return node;
      return {
        ...node,
        children: node.children.filter((id) => id !== selectedNodeId),
      };
    });

    try {
      await axios.post(`${API_URL}/nodes/${parent.id}/removechild`, {
        nodeId: selectedNodeId,
      });
      await axios.delete(`${API_URL}/nodes/${selectedNodeId}`);
      if (selectedNote) {
        await axios.delete(`${API_URL}/notes/${selectedNote._id}`);
      }
      setTree(newTree.filter((node) => node.id !== selectedNodeId));
      setSelectedNote(null);
    } catch (err) {
      console.log(err);
      alert("Could not delete node");
    }
  }

  async function handleAddNode(isBranch) {
    const nodeName = window.prompt(
      `Wie soll ${isBranch ? "der neue Folder" : "die neue Datei"} heißen?`,
      `New ${isBranch ? "folder" : "file"}`
    );
    if (!nodeName) return;
    try {
      const currentNode = tree.find(
        (treeNode) => treeNode.id === selectedNodeId
      );
      if (currentNode.isBranch === false) {
        // ist kein Ordner
        const parentId = currentNode.parent;
        const parentNode = tree.find((treeNode) => treeNode.id === parentId);

        const { data: newNode } = await axios.post(`${API_URL}/nodes`, {
          name: nodeName,
          isBranch,
          parent: parentNode.id,
        });

        await axios.post(`${API_URL}/nodes/${parentNode.id}/addchild`, {
          nodeId: newNode.id,
        });

        if (!isBranch) {
          const newNote = await axios.post(`${API_URL}/notes`, {
            node: newNode.id,
          });
          setSelectedNote(newNote);
        }

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

        const { data: newNode } = await axios.post(`${API_URL}/nodes`, {
          name: nodeName,
          isBranch,
          parent: selectedNodeId,
        });

        await axios.post(`${API_URL}/nodes/${selectedNodeId}/addchild`, {
          nodeId: newNode.id,
        });

        if (!isBranch) {
          const newNote = await axios.post(`${API_URL}/notes`, {
            node: newNode.id,
          });
        }

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
    } catch (err) {
      console.log(err);
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
          onDeleteNode={handleDeleteNode}
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
      {selectedNote ? (
        <div className="flex-col h-full min-h-full w-full items-cente justify-center">
          <div className="flex h-3/4 w-full">
            <div className="h-full flex  justify-center">
              <ReactQuill
                theme="snow"
                value={selectedNote?.content || ""}
                onChange={(text) => {
                  setIsDirty(true);
                  setSelectedNote((prev) => {
                    return { ...prev, content: text };
                  });
                }}
                className="h-full"
                modules={modules}
              />
            </div>
          </div>
          <div>
            <button
              className="mt-[100px] p-2 active:text-red disabled:text-gray-400 text-[#113f67] p-3"
              disabled={!isDirty}
              onClick={() => {
                saveContent();
              }}
            >
              <FaRegSave className="text-3xl z-50" />
            </button>
          </div>
        </div>
      ) : (
        <div className="flex justify-center mt-[350px]">
          <h2 className="font-serif text-8xl text-gray-300">Textventure</h2>
        </div>
      )}
    </>
  );
}

export default App;
