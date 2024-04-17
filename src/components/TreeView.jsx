import TreeView, { flattenTree } from "react-accessible-treeview";
import { DiCss3, DiJavascript, DiNpm } from "react-icons/di";
import { FaList, FaRegFolder, FaRegFolderOpen } from "react-icons/fa";
import { LuFolderTree } from "react-icons/lu";
import { FaFolderPlus } from "react-icons/fa";
import { FaFolderMinus } from "react-icons/fa";
import { FaTrash } from "react-icons/fa";
import { FaTrashRestore } from "react-icons/fa";
import { FiSidebar } from "react-icons/fi";
import { RiAccountCircleLine } from "react-icons/ri";
import { IoDocumentTextOutline } from "react-icons/io5";

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

const data = flattenTree(folder);

function DirectoryTreeView() {
  return (
    <div>
      <div className="directory">
        <TreeView
          data={data}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
          }) => (
            <div
              {...getNodeProps()}
              style={{ paddingLeft: 20 * (level - 1) }}
              className="flex gap-x-2 items-center"
            >
              {isBranch ? (
                <FolderIcon isOpen={isExpanded} />
              ) : (
                <FileIcon filename={element.name} />
              )}

              {element.name}
            </div>
          )}
        />
      </div>
    </div>
  );
}

const FolderIcon = ({ isOpen }) =>
  isOpen ? (
    <FaRegFolderOpen color="e8a87c" className="icon" />
  ) : (
    <FaRegFolder color="e8a87c" className="icon" />
  );

const FileIcon = ({ filename }) => {
  const extension = filename.slice(filename.lastIndexOf(".") + 1);
  switch (extension) {
    case "txt":
      return <IoDocumentTextOutline color="orange" className="icon" />;
    case "js":
      return <DiJavascript color="yellow" className="icon" />;
    case "css":
      return <DiCss3 color="turquoise" className="icon" />;
    case "json":
      return <FaList color="yellow" className="icon" />;
    case "npmignore":
      return <DiNpm color="red" className="icon" />;
    default:
      return null;
  }
};

export default DirectoryTreeView;
