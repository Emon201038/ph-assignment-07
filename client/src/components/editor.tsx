"use client";

import React, { useEffect, useMemo, useRef, useState } from "react";
import ReactQuill from "react-quill-new";
import "quill/dist/quill.snow.css";

interface EditorProps {
  value: string;
  placeholder?: string;
  onChange: (value: string) => void;
  onImageUpload?: (file: File) => Promise<{ secure_url: string }>;
}

export const Editor = ({
  value,
  placeholder,
  onChange,
  onImageUpload,
}: EditorProps) => {
  const editorRef = useRef<ReactQuill | null>(null);
  const [isInitialized, setIsInitialized] = useState(false);

  // ✅ Image upload handler
  const imageHandler = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      if (file && onImageUpload) {
        try {
          const url = await onImageUpload(file);
          const editor = editorRef.current?.getEditor();
          const range = editor?.getSelection(true);
          editor?.insertEmbed(range?.index || 0, "image", url.secure_url);
        } catch (err) {
          console.error(err);
        }
      }
    };
  };

  // ✅ Toolbar modules
  const modules = useMemo(
    () => ({
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          ["link", "image"],
          [{ header: 1 }, { header: 2 }],
          [{ list: "ordered" }, { list: "bullet" }],
          [{ script: "sub" }, { script: "super" }],
          [{ indent: "-1" }, { indent: "+1" }],
          [{ size: ["small", false, "large", "huge"] }],
          [{ header: [1, 2, 3, 4, 5, 6, false] }],
          [{ color: [] }, { background: [] }],
          [{ font: [] }],
          [{ align: [] }],
          ["clean"],
        ],
        handlers: {
          image: imageHandler,
        },
      },
    }),
    []
  );

  // ✅ Initialize HTML after editor mounts
  useEffect(() => {
    const editor = editorRef.current?.getEditor();
    if (!editor) return;

    if (!isInitialized && value) {
      // Clear any default <p><br></p>
      editor.root.innerHTML = "";
      editor.clipboard.dangerouslyPasteHTML(value);
      setIsInitialized(true);
    }
  }, [value, isInitialized]);

  // ✅ Sync back HTML changes
  const handleChange = () => {
    const editor = editorRef.current?.getEditor();
    if (editor) {
      const html = editor.root.innerHTML;
      onChange(html);
    }
  };

  return (
    <ReactQuill
      ref={editorRef}
      theme="snow"
      modules={modules}
      placeholder={placeholder}
      onChange={handleChange}
      // className="min-h-[250px] bg-white"
    />
  );
};
