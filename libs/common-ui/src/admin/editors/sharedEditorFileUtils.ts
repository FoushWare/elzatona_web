export interface EditorFileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: EditorFileNode[];
  content?: string;
  fileType?: string;
  isEntryPoint?: boolean;
}

export const createFileNode = (
  name: string,
  type: string,
  content: string = "",
): EditorFileNode => {
  const id = `file_${Date.now()}`;
  return {
    id,
    name,
    type: "file",
    content,
    fileType: type,
  };
};

export const addFileToTree = (
  fileTree: EditorFileNode[],
  newFile: EditorFileNode,
): EditorFileNode[] => {
  return fileTree.map((folder) => {
    if (folder.type === "folder" && folder.children) {
      return {
        ...folder,
        children: [...folder.children, newFile],
      };
    }
    return folder;
  });
};

export const removeFileFromTree = (
  fileTree: EditorFileNode[],
  fileId: string,
): EditorFileNode[] => {
  return fileTree.map((folder) => {
    if (folder.type === "folder" && folder.children) {
      return {
        ...folder,
        children: folder.children.filter((file) => file.id !== fileId),
      };
    }
    return folder;
  });
};

export const updateFileInTree = (
  fileTree: EditorFileNode[],
  fileId: string,
  content: string,
): EditorFileNode[] => {
  return fileTree.map((folder) => {
    if (folder.type === "folder" && folder.children) {
      return {
        ...folder,
        children: folder.children.map((file) =>
          file.id === fileId ? { ...file, content } : file,
        ),
      };
    }
    return folder;
  });
};

export const getFileIcon = (fileType: string) => {
  switch (fileType) {
    case "tsx":
    case "jsx":
      return "blue";
    case "css":
      return "purple";
    case "html":
      return "orange";
    case "js":
      return "yellow";
    case "json":
      return "green";
    default:
      return "gray";
  }
};

export const getFileById = (openFiles: any[], fileId: string) => {
  return openFiles.find((file) => file.id === fileId);
};

export const getCurrentFileContent = (
  openFiles: any[],
  activeFile: string | null,
) => {
  if (!activeFile) return "";
  const file = getFileById(openFiles, activeFile);
  return file?.content || "";
};

export const setCurrentFileContent = (
  openFiles: any[],
  activeFile: string | null,
  content: string,
) => {
  if (!activeFile) return openFiles;
  return openFiles.map((file) =>
    file.id === activeFile ? { ...file, content } : file,
  );
};

export const getLanguageForType = (fileType: string) => {
  switch (fileType) {
    case "tsx":
    case "jsx":
      return "typescript";
    case "css":
      return "css";
    case "html":
      return "html";
    case "js":
      return "javascript";
    case "json":
      return "json";
    default:
      return "plaintext";
  }
};

export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
    return;
  } catch (err) {
    console.error("Failed to copy code:", err);
    throw err;
  }
};
