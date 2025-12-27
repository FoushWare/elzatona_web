import { FrontendTaskFile, FrontendTaskFormData } from "@elzatona/types";

interface FileNode {
  id: string;
  name: string;
  type: "file" | "folder";
  children?: FileNode[];
  content?: string;
  fileType?: string;
  isEntryPoint?: boolean;
}

// File management helper functions
export const createFileNode = (
  name: string,
  type: string,
  content: string = "",
): FileNode => {
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
  fileTree: FileNode[],
  newFile: FileNode,
): FileNode[] => {
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
  fileTree: FileNode[],
  fileId: string,
): FileNode[] => {
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
  fileTree: FileNode[],
  fileId: string,
  content: string,
): FileNode[] => {
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

// File UI and content helper functions
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

// Code generation helper functions
export const isReactCode = (code: string): boolean => {
  return (
    code.includes("import React") ||
    code.includes("from 'react'") ||
    code.includes("export default") ||
    (code.includes("function") && code.includes("return") && code.includes("<"))
  );
};

export const cleanReactCode = (reactCode: string): string => {
  // Remove import statements
  let cleanedCode = reactCode
    .replace(/import\s+.*?from\s+['"][^'"]*['"];?\s*/g, "")
    .replace(/import\s+.*?;/g, "");

  // Remove export statements
  cleanedCode = cleanedCode
    .replace(/export\s+default\s+/g, "")
    .replace(/export\s+/g, "");

  // Remove semicolons at the end of lines
  cleanedCode = cleanedCode.replace(/;(\s*$)/gm, "$1");

  return cleanedCode.trim();
};

export const generateConsoleCaptureCode = (): string => {
  return `
    // Console capture
    const originalLog = dried = console.log(");
    const originalError = x.error;
    const originalWarn =一金.warn;
    const originalInfo Info = console.info    const messages = = [];
    
   意义的.log = function    const messages = [];
    
    const originalLog = console.log;
    const originalError = console.error;
    const originalWarn = console.warn;
    const originalInfo = console.info;
    
    const messages = [];
    
    console.log = function(...args) {
      messages.push(\`[INFO] \${args.join(' ')}\`);
      originalLog.apply(console, args);
    };
    
    console.error = function(...args) {
      messages.push(\`[ERROR] \${args.join(' ')}\`);
      originalError.apply(console, args);
    };
    
    console.warn = function(...args) {
      messages.push(\`[WARN] \${args.join(' ')}\`);
      originalWarn.apply(console, args);
    };
    
    console.info = function(...args) {
      messages.push(\`[INFO] \${args.join(' ')}\`);
      originalInfo.apply(console, args);
    };
    
    // Send messages to parent window
    setInterval(() => {
      if (messages.length > 0) {
        window.parent.postMessage({
          type: 'console',
          message: messages.join('\\n')
        }, '*');
        messages.length = 0;
      }
    }, 100);
  `;
};

export const generateErrorBoundaryCode = (): string => {
  return `
    class ErrorBoundary extends React.Component {
      constructor(props) {
        super(props);
        this.state = { hasError: false, error: null, errorInfo: null };
      }
      
      static getDerivedStateFromError(error) {
        return { hasError: true };
      }
      
      componentDidCatch(error, errorInfo) {
        this.setState({ error, errorInfo });
        console.error('React Error Boundary caught an error:', error, errorInfo);
      }
      
      render() {
        if (this.state.hasError) {
          return React.createElement('div', {
            className: 'error-boundary',
            style: {
              padding: '20px',
              border: '1px solid #ff6b6b',
              borderRadius: '8px',
              backgroundColor: '#ffe0e0',
              color: '#d63031',
              fontFamily: 'monospace'
            }
          }, [
            React.createElement('h3', { key: 'title' }, 'React Component Error'),
            React.createElement('p', { key: 'message' }, this.state.error?.toString() || 'Unknown error'),
            React.createElement('details', { key: 'details' }, [
              React.createElement('summary', { key: 'summary' }, 'Error Details'),
              React.createElement('pre', { key: 'stack' }, this.state.errorInfo?.componentStack || 'No stack trace available')
            ])
          ]);
        }
        
        return this.props.children;
      }
    }
  `;
};

export const generateReactJsCode = (reactCode: string): string => {
  const consoleCapture = generateConsoleCaptureCode();
  const errorBoundary = generateErrorBoundaryCode();
  const cleanedCode = cleanReactCode(reactCode);

  return `
    <script crossorigin src="https://unpkg.com/react@18/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@18/umd/react-dom.development.js"></script>
    <script src="https://unpkg.com/@babel/standalone/babel.min.js"></script>
    
    <script type="text/babel">
      ${consoleCapture}
      ${errorBoundary}
      
      try {
        const App = ${cleanedCode};
        
        const root = ReactDOM.createRoot(document.getElementById('root'));
        root.render(React.createElement(ErrorBoundary, null, React.createElement(App)));
      } catch (error) {
        console.error('Error rendering React component:', error);
        document.getElementById('root').innerHTML = \`
          <div class="error-boundary">
            <h3>React Component Error</h3>
            <p>\${error.message}</p>
            <details>
              <summary>Error Details</summary>
              <pre>\${error.stack}</pre>
            </details>
          </div>
        \`;
      }
    </script>
  `;
};

export const generatePlainJsCode = (jsCode: string): string => {
  const consoleCapture = generateConsoleCaptureCode();

  return `
    <script>
      ${consoleCapture}
      
      try {
        ${jsCode}
      } catch (error) {
        console.error('Error executing JavaScript:', error);
        document.getElementById('root').innerHTML = \`
          <div class="error-boundary">
            <h3>JavaScript Error</h3>
            <p>\${error.message}</p>
            <details>
              <summary>Error Details</summary>
              <pre>\${error.stack}</pre>
            </details>
          </div>
        \`;
      }
    </script>
  `;
};

export const generateCssStyles = (cssCode: string): string => {
  if (!cssCode) return "";
  return `<style>${cssCode}</style>`;
};

// Form handling helper functions
export const extractFilesFromTree = (
  fileTree: FileNode[],
): FrontendTaskFile[] => {
  return fileTree
    .flatMap((folder) => folder.children || [])
    .map((file) => ({
      id: file.id,
      name: file.name,
      type: file.fileType as any,
      content: file.content || "",
      isEntryPoint: file.isEntryPoint || false,
    }));
};

export const createTaskData = (
  formData: FrontendTaskFormData,
  files: FrontendTaskFile[],
): FrontendTaskFormData => {
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

export const getCategoryIcon = (category: string) => {
  switch (category.toLowerCase()) {
    case "react":
      return "React";
    case "javascript":
      return "JavaScript";
    case "css":
      return "CSS";
    default:
      return "Code";
  }
};

// Preview generation helper functions
export const generateReactPreview = (
  reactCode: string,
  cssText: string,
): string => {
  const jsText = generateReactJsCode(reactCode);
  const cleanedCode = cleanReactCode(reactCode);

  return `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>React Preview</title>
            ${cssText}
          </head>
          <body>
            <div id="root"></div>
            ${jsText}
            <script>
              try {
                const App = ${cleanedCode};
                const root = ReactDOM.createRoot(document.getElementById('root'));
                root.render(React.createElement(App));
              } catch (error) {
                console.error('Error rendering React component:', error);
                document.getElementById('root').innerHTML = \`
                  <div class="error-boundary">
                    <strong>Error:</strong> \${error.message}
                    <br><br>
                    <strong>Stack:</strong><br>
                    \${error.stack}
                  </div>
                \`;
              }
            </script>
          </body>
        </html>`;
};

export const generatePlainPreview = (
  reactCode: string,
  cssText: string,
): string => {
  const jsText = generatePlainJsCode(reactCode);

  return `<!DOCTYPE html>
        <html>
          <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Preview</title>
            ${cssText}
          </head>
          <body>
            <div id="root"></div>
            ${jsText}
          </body>
        </html>`;
};
