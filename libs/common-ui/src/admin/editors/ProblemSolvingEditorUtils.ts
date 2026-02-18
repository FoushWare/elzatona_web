import { ProblemSolvingTaskFormData, TestCase } from "@elzatona/types";
import type { EditorFileNode as FileNode } from "./sharedEditorFileUtils";

export {
  addFileToTree,
  copyToClipboard,
  createFileNode,
  getCurrentFileContent,
  getFileById,
  getFileIcon,
  getLanguageForType,
  removeFileFromTree,
  setCurrentFileContent,
  updateFileInTree,
} from "./sharedEditorFileUtils";

// Test case helper functions
export const createTestCase = (): TestCase => ({
  id: `test_${Date.now()}`,
  input: [],
  expected: "",
  isHidden: false,
});

export const validateTestCase = (testCase: TestCase): boolean => {
  return testCase.input.length > 0 && testCase.expected !== "";
};

export const formatTestCase = (testCase: TestCase): string => {
  return `Input: ${JSON.stringify(testCase.input)}\nExpected: ${JSON.stringify(testCase.expected)}`;
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

export const createTaskData = (
  formData: ProblemSolvingTaskFormData,
): ProblemSolvingTaskFormData => {
  return {
    ...formData,
  };
};

// Dynamic field helper functions
export const addConstraint = (
  constraints: string[],
  newConstraint: string,
): string[] => {
  if (newConstraint.trim()) {
    return [...constraints, newConstraint.trim()];
  }
  return constraints;
};

export const removeConstraint = (
  constraints: string[],
  index: number,
): string[] => {
  return constraints.filter((_, i) => i !== index);
};

export const addExample = (examples: any[], newExample: string): any[] => {
  if (newExample.trim()) {
    return [
      ...examples,
      {
        id: `example_${Date.now()}`,
        input: "",
        output: "",
        explanation: newExample.trim(),
      },
    ];
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

export const generateTestRunnerCode = (
  testCases: TestCase[],
  functionName: string,
): string => {
  const testCode = testCases
    .map((testCase, index) => {
      return `// Test Case ${index + 1}
const input${index + 1} = ${testCase.input};
const expected${index + 1} = ${testCase.expected};
const result${index + 1} = ${functionName}(input${index + 1});
console.log('Test ${index + 1}:', result${index + 1} === expected${index + 1} ? 'PASS' : 'FAIL');
console.log('Expected:', expected${index + 1});
console.log('Got:', result${index + 1});`;
    })
    .join("\n\n");

  return `${testCode}

// Run all tests
console.log('Running tests...');`;
};

// Validation helper functions
export const validateFormData = (
  formData: ProblemSolvingTaskFormData,
): string[] => {
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
  return name.replaceAll(/\W/g, "").replace(/^\d/, "_");
};
