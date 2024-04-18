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

function DirectoryTreeView({ tree, onSelectNode }) {
  return (
    <div>
      <div className="directory">
        <TreeView
          data={tree}
          aria-label="directory tree"
          nodeRenderer={({
            element,
            isBranch,
            isExpanded,
            getNodeProps,
            level,
            handleExpand,
          }) => (
            <div
              {...getNodeProps()}
              onClick={(e) => {
                onSelectNode(element);
                handleExpand(e);
              }}
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
