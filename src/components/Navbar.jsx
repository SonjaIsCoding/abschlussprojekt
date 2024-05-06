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
import { GiPlantRoots } from "react-icons/gi";
import { IoLibraryOutline } from "react-icons/io5";
import { useState } from "react";
import { flattenTree } from "react-accessible-treeview";
import { v4 as uuid } from "uuid";
import { MdDeleteForever } from "react-icons/md";

const folder_old = {
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
  ],
};

export function Navbar({
  tree,
  onHandleAdd,
  onDeleteNode,
  selectedNodeId,
  onSelectedNodeId,
  rootId,
}) {
  function handleSelectNode(id) {
    onSelectedNodeId(id);
  }

  return (
    <div className="flex">
      <div className="fixed z-20 top-0 left-0 h-screen w-56 m-0 flex flex-col bg-[#abcecf] shadow-2xl">
        <div className="flex justify-end  bg-[#c4dce0] ">
          <button
            className="flex justify-between flex-1"
            onClick={() => {
              onSelectedNodeId(rootId);
            }}
          >
            <IoLibraryOutline className="text-[#113f67] text-2xl" />
          </button>
          <button
            onClick={() => {
              onHandleAdd(true);
            }}
          >
            <TbFolderPlus className="text-[#113f67] text-2xl" />
          </button>
          <button
            onClick={() => onHandleAdd(false)}
            className="text-[#113f67] text-2xl"
          >
            <VscNewFile />
          </button>
          <button
            onClick={() => onDeleteNode()}
            className="text-[#113f67] text-2xl"
          >
            <MdDeleteForever />
          </button>
        </div>
        <div className="text-[#113f67] p-3 text-xl">
          <TreeView
            tree={tree}
            onSelectNode={handleSelectNode}
            selectedNodeId={selectedNodeId}
          />
        </div>
      </div>
    </div>
  );
}
