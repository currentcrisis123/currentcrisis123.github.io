import { useEffect, useState, useCallback } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import "./Editor.css";
import { Trash2 } from "lucide-react";
import 'katex/dist/katex.min.css';
import katex from 'katex';

window.katex = katex;

interface EditorProps {
  editorContentKey: string;
  lastModifiedKey: string;
  onContentChange?: (content: string) => void;
  onClearReference?: (clearFunction: (skipConfirm: boolean) => void) => void;
  initialContent?: string;
}

export default function Editor({ editorContentKey, lastModifiedKey, onContentChange, onClearReference, initialContent }: EditorProps) {
  const EDITOR_CONTENT_KEY = editorContentKey;
  const LAST_MODIFIED_KEY = lastModifiedKey;

  const [lastModified, setLastModified] = useState<Date | string>("");
  const [isLoaded, setIsLoaded] = useState(false);
  const [code, setCode] = useState(initialContent || "");

  const font = ReactQuill.Quill.import('formats/font') as any;
  font.whitelist = ['mulish', 'serif', 'monospace'];
  ReactQuill.Quill.register('formats/font', font, true);
  
  const modules = {
    toolbar: [
      [{ font: ['mulish', 'serif', 'monospace'] }],
      [{ header: [1, 2, false] }],
      ["bold", "italic", "underline", "strike"],
      [{ color: [] }, { background: [] }],
      [{ script: "sub" }, { script: "super" }],
      ["blockquote", "code-block"],
      [{ list: "ordered" }, { list: "bullet" }, { indent: "-1" }, { indent: "+1" }],
      [{ align: [] }],
      ["link", "image", "formula"],
      ['clean']
    ]
  };

  const formats = [
    "font",
    "header",
    "bold",
    "italic",
    "underline",
    "strike",
    "color",
    "background",
    "script",
    "blockquote",
    "code-block",
    "list",
    "indent",
    "link",
    "image",
    "formula",
    "align"
  ];

  const clearEditor = useCallback((_skipConfirm: boolean = false) => {
      if (!_skipConfirm) {
        const confirmClear = window.confirm("Are you sure you want to clear the editor?");
        if (!confirmClear) return;
      }

      setCode("");
      localStorage.removeItem(EDITOR_CONTENT_KEY);
      localStorage.removeItem(LAST_MODIFIED_KEY);
      setLastModified("");
  }, [EDITOR_CONTENT_KEY, LAST_MODIFIED_KEY]);

  useEffect(() => {
    if (onClearReference) {
      onClearReference(clearEditor);
    }
  }, [clearEditor, onClearReference]);  
  
  useEffect(() => {
    if (isLoaded) return;

    const savedContent = localStorage.getItem(EDITOR_CONTENT_KEY);
    const savedLastModified = localStorage.getItem(LAST_MODIFIED_KEY);
    
    if (initialContent && initialContent !== "" && initialContent !== "<p><br></p>") {
      setCode(initialContent);
      setLastModified(new Date());
    } else if (savedContent && savedContent !== "<p><br></p>") {
      setCode(savedContent);

      if (onContentChange && typeof savedContent === 'string') {
        onContentChange(savedContent);
      }
      
      if (savedLastModified) {
        setLastModified(new Date(savedLastModified));
      }
    }
    
    setIsLoaded(true);
  }, [isLoaded, initialContent, EDITOR_CONTENT_KEY, LAST_MODIFIED_KEY, onContentChange]);

  const handleProcedureContentChange = (content: never) => {
    setCode(content);
    
    if (onContentChange && typeof content === 'string') {
      onContentChange(content);
    }
  };

  useEffect(() => {
    if (!isLoaded) return;
    
    if (code != "<p><br></p>" && code != "" && code != null) {
      const now = new Date();
      // console.logm("Saving to localStorage: " + code);
      
      localStorage.setItem(EDITOR_CONTENT_KEY, code);
      localStorage.setItem(LAST_MODIFIED_KEY, now.toISOString());
      
      setLastModified(now);
    } else {
      setLastModified("");
    }
  }, [code, isLoaded]);

  return (
    <div className="pb-4 h-full w-full editor-wrapper">
      <ReactQuill
        theme="snow"
        modules={modules}
        formats={formats}
        value={code}
        onChange={handleProcedureContentChange}
        className="bg-light-default/40 backdrop-blur-md rounded-lg mb-2 quill text-white"
      />
      <div className="flex justify-between items-center">        
        <button 
          onClick={() => clearEditor(false)}
          className="text-sm font-bayon bg-cc-red/80 hover:bg-cc-red duration-500 z-10 text-white p-2 rounded-lg transition-colors"
        >
          <Trash2 size={18} />
        </button>
        {lastModified && code && code !== "<p><br></p>" && code !== "" && 
          <h1 className="text-sm text-white">
            Last Modified: {lastModified.toLocaleString()}
          </h1>
        }
      </div>
    </div>
  );
}
