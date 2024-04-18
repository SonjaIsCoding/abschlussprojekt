import TreeView from "./TreeView";
import { FaRegFolder } from "react-icons/fa6";
import { LuFolderTree } from "react-icons/lu";
import { FaRegFolderOpen } from "react-icons/fa6";
import { FaFolderPlus } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaTrashRestore } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { TbFolderPlus } from "react-icons/tb";
import { VscNewFile } from "react-icons/vsc";
import { useState } from "react";
import { flattenTree } from "react-accessible-treeview";
import { v4 as uuid } from "uuid";

const folder = {
  name: "",
  children: [
    {
      name: "Buch",
      children: [
        {
          name: "Kapitel 1",
          children: [{ name: "Szene 1.txt" }, { name: "Szene 2.txt" }],
        },
        {
          name: "Kapitel 2",
          children: [
            { name: "Szene 1.txt" },
            { name: "Szene 2.txt" },
            { name: "Szene 3.txt" },
          ],
        },
      ],
    },
    {
      name: "Ideen",
      children: [
        { name: "Braindump 1.txt" },
        { name: "Notizen.txt" },
        { name: "Noch mehr Ideen.txt" },
        { name: "AAAaaaahhhhh.txt" },
      ],
    },
    {
      name: "Charaktere",
      children: [
        { name: "Hauptcharakter.txt" },
        { name: "Nebencharakter.txt" },
        { name: "Max/Bob/Magnus.txt" },
      ],
    },
    // {
    //   name: "src",
    //   children: [{ name: "index.js" }, { name: "styles.css" }],
    // },
    // {
    //   name: "node_modules",
    //   children: [
    //     {
    //       name: "react-accessible-treeview",
    //       children: [{ name: "index.js" }],
    //     },
    //     { name: "react", children: [{ name: "index.js" }] },
    //   ],
    // },
    // {
    //   name: ".npmignore",
    // },
    // {
    //   name: "package.json",
    // },
    // {
    //   name: "webpack.config.js",
    // },
  ],
};

export function Navbar() {
  const [tree, setTree] = useState(folder);
  const [selectedNode, setSelectedNode] = useState(tree);

  function handleAddFile() {
    selectedNode.children.push({ name: "Neue Datei.txt" });
    setTree({ ...tree });
  }

  function handleAddFolder() {
    selectedNode.children.push({
      name: "Neuer Ordner",
      isBranch: true,
      children: [],
    });
    setTree({ ...tree });
  }

  function handleSelectNode(node) {
    setSelectedNode(node);
    setTree({ ...tree });
    return console.log(node);
  }

  return (
    <div className="fixed z-20 top-0 left-0 h-screen w-56 m-0 flex flex-col bg-[#537791] shadow-2xl">
      <div className="flex justify-end  bg-[#c1c0b9]">
        <button onClick={handleAddFolder}>
          <TbFolderPlus className="text-[#f7f6e7] text-2xl" />
        </button>
        <button onClick={handleAddFile} className="text-[#f7f6e7] text-2xl">
          <VscNewFile />
        </button>
      </div>
      <div className="text-[#f7f6e7] p-3 text-xl">
        <TreeView tree={flattenTree(tree)} onSelectNode={handleSelectNode} />
      </div>
    </div>
  );
}
