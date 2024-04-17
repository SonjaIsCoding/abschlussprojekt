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

export function Navbar() {
  return (
    <div className="fixed z-20 top-0 left-0 h-screen w-56 m-0 flex flex-col bg-[#537791] shadow-2xl">
      <div className="flex justify-end  bg-[#c1c0b9]">
        <button>
          <TbFolderPlus className="text-[#f7f6e7] text-2xl" />
        </button>
        <button className="text-[#f7f6e7] text-2xl">
          <VscNewFile />
        </button>
      </div>
      <div className="text-[#f7f6e7] p-3 text-xl">
        <TreeView />
      </div>
    </div>
  );
}
