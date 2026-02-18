import {
  AdminFrontendTaskFile,
  AdminFrontendTaskFormData,
} from "@elzatona/types";
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
  const lines = reactCode.split("\n");
  const withoutImports = lines.filter((line) => {
    const trimmedLine = line.trimStart();
    return !trimmedLine.startsWith("import ");
  });

  const withoutExports = withoutImports.map((line) => {
    const trimmedLine = line.trimStart();

    if (trimmedLine.startsWith("export default ")) {
      return line.replace("export default ", "");
    }

    if (trimmedLine.startsWith("export ")) {
      return line.replace("export ", "");
    }

    return line;
  });

  let cleanedCode = withoutExports.join("\n");

  // Remove semicolons at the end of lines
  cleanedCode = cleanedCode.replaceAll(/;(\s*$)/gm, "$1");

  return cleanedCode.trim();
};

export const generateConsoleCaptureCode = (): string => {
  return `
    // Console capture
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
): AdminFrontendTaskFile[] => {
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
  formData: AdminFrontendTaskFormData,
  files: AdminFrontendTaskFile[],
): AdminFrontendTaskFormData => {
  return {
    ...formData,
    files,
  };
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
