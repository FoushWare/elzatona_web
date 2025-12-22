import { ProblemSolvingTaskFormData, TestCase } from "@elzatona/types";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  fileType?: string;
}

// File management helper functions
export const createFileNode = (name: string, type: string, content: string = ""): FileNode => {
  const id = `file_${Date.now()}`;
  return {
    id,
    name,
    type: "file",
    content,
    fileType: type,
  };
};

export const addFileToTree = (fileTree: FileNode[], newFile: FileNode): FileNode[] => {
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

export const removeFileFromTree = (fileTree: FileNode[], fileId: string): FileNode[] => {
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

export const updateFileInTree = (fileTree: FileNode[], fileId: string, content: string): FileNode[] => {
  return fileTree.map((folder) => {
    if (folder.type === "folder" && folder.children) {
      return {
        ...folder,
        children: folder.children.map((file) =>
          file.id === fileId ? { ...file, content } : file
        ),
      };
    }
    return folder;
  });
};

// File UI helper functions
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

export const getCurrentFileContent = (openFiles: any[], activeFile: string | null) => {
  if (!activeFile) return "";
  const file = getFileById(openFiles, activeFile);
  return file?.content || "";
};

export const setCurrentFileContent = (openFiles: any[], activeFile: string | null, content: string) => {
  if (!activeFile) return openFiles;
  return openFiles.map((file) =>
    file.id === activeFile ? { ...file, content } : file
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

// Test case helper functions
export const createTestCase = (): TestCase => ({
  id: `test_${Date.now()}`,
  input: "",
  expectedOutput: "",
  description: "",
  isHidden: false,
});

export const validateTestCase = (testCase: TestCase): boolean => {
  return testCase.input.trim() !== "" && testCase.expectedOutput.trim() !== "";
};

export const formatTestCase = (testCase: TestCase): string => {
  return `Input: ${testCase.input}\nExpected: ${testCase.expectedOutput}`;
};

// Form helper functions
export const extractFilesFromTree = (fileTree: FileNode[]): any[] => {
  return fileTree
    .flatMap((folder) => folder.children || [])
    .map((file) => ({
      id: file.id,
      name: file.name,
      type: file.fileType,
      content: file.content || "",
    }));
};

export const createTaskData = (formData: ProblemSolvingTaskFormData, files: any[]): ProblemSolvingTaskFormData => {
  return {
    ...formData,
    files,
  };
};

export const copyToClipboard = async (content: string): Promise<void> => {
  try {
    await navigator.clipboard.writeText(content);
    return Promise.resolve();
  } catch (err) {
    console.error("Failed to copy code:", err);
    return Promise.reject(err);
  }
};

// Dynamic field helper functions
export const addConstraint = (constraints: string[], newConstraint: string): string[] => {
  if (newConstraint.trim()) {
    return [...constraints, newConstraint.trim()];
  }
  return constraints;
};

export const removeConstraint = (constraints: string[], index: number): string[] => {
  return constraints.filter((_, i) => i !== index);
};

export const addExample = (examples: any[], newExample: string): any[] => {
  if (newExample.trim()) {
    return [...examples, {
      id: `example_${Date.now()}`,
      input: "",
      output: "",
      explanation: newExample.trim(),
    }];
  }
  return examples;
};

export const removeExample = (examples: any[], index: number): any[] => {
  return examples.filter((_, i) => i !== index);
};

export const addTag = (tags: string[], newTag: string): string[] => {
  if (newTag.trim() && !tags.includes(newTag.trim())) {
    return [...tags, newTag.trim()];
  }
  return tags;
};

export const removeTag = (tags: string[], index: number): string[] => {
  return tags.filter((_, i) => i !== index);
};

// Category helper functions
export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "array":
      return "Array";
    case "string":
      return "String";
    case "linked list":
      return "LinkedList";
    case "tree":
      return "Tree";
    case "graph":
      return "Graph";
    case "dynamic programming":
      return "DP";
    case "backtracking":
      return "Backtrack";
    default:
      return "Code";
  }
};

// Code generation helper functions
export const generateDefaultStarterCode = (functionName: string): string => {
  return `function ${functionName}(nums) {
    // Your code here
    return [];
}`;
};

export const generateTestRunnerCode = (testCases: TestCase[], functionName: string): string => {
  const testCode = testCases.map((testCase, index) => {
    return `// Test Case ${index + 1}
const input${index + 1} = ${testCase.input};
const expected${index + 1} = ${testCase.expectedOutput};
const result${index + 1} = ${functionName}(input${index + 1});
console.log('Test ${index + 1}:', result${index + 1} === expected${index + 1} ? 'PASS' : 'FAIL');
console.log('Expected:', expected${index + 1});
console.log('Got:', result${index + 1});`;
  }).join('\n\n');

  return `${testCode}

// Run all tests
console.log('Running tests...');`;
};

// Validation helper functions
export const validateFormData = (formData: ProblemSolvingTaskFormData): string[] => {
  const errors: string[] = [];

  if (!formData.title.trim()) {
    errors.push("Title is required");
  }
  if (!formData.description.trim()) {
    errors.push("Description is required");
  }
  if (!formData.functionName.trim()) {
    errors.push("Function name is required");
  }
  if (!formData.starterCode.trim()) {
    errors.push("Starter code is required");
  }
  if (!formData.solution.trim()) {
    errors.push("Solution is required");
  }
  if (formData.testCases.length === 0) {
    errors.push("At least one test case is required");
  }

  return errors;
};

export const sanitizeFunctionName = (name: string): string => {
  return name.replace(/[^a-zA-Z0-9_]/g, '').replace(/^[0-9]/, '_');
};
