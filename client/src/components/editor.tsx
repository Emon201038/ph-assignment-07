"use client";

import React, { useMemo } from "react";
import { useQuill } from "react-quilljs";
import "quill/dist/quill.snow.css";
import ReactQuill from "react-quill-new";

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
  const editorRef = React.useRef(null);
  const theme = "snow";

  const imageHandler = async () => {
    const input = document.createElement("input");
    input.type = "file";
    input.accept = "image/*";
    input.click();

    input.onchange = async () => {
      const file = input.files?.[0];
      console.log(file);
      if (file && onImageUpload) {
        try {
          const url = await onImageUpload(file);
          const editor = (editorRef?.current as any)?.getEditor();

          const range = editor?.getSelection(true);
          editor?.insertEmbed(range?.index || 0, "image", url.secure_url);
        } catch (error) {
          console.log(error);
        }
      }
    };
  };

  const modules = useMemo(() => {
    return {
      toolbar: {
        container: [
          ["bold", "italic", "underline", "strike"],
          ["blockquote", "code-block"],
          ["link", "image"], // ✅ Only keep what's used
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
    };
  }, []);

  const formats = [
    "bold",
    "italic",
    "underline",
    "strike",
    "align",
    "list",
    "indent",
    "header",
    "link",
    "color",
  ];

  const { quill, quillRef } = useQuill({
    theme,
    modules,
    formats,
    placeholder,
  });

  React.useEffect(() => {
    if (!quill) return;

    // Set default direction + alignment
    quill.format("direction", "ltr");
    quill.format("align", "left");

    // Only set initial value once
    const currentContent = quill.root.innerHTML.trim();
    if (value && currentContent === "<p><br></p>") {
      quill.clipboard.dangerouslyPasteHTML(value);
    }

    // Handle change events
    const handleChange = () => {
      onChange(quill.root.innerHTML);
    };

    quill.on("text-change", handleChange);

    return () => {
      quill.off("text-change", handleChange);
    };
  }, [quill, onChange]);

  return (
    // <div
    //   dir="ltr"
    //   className="*:rounded-md *:first:rounded-b-none *:last:rounded-t-none *:last:min-h-20 *:placeholder:text-muted-foreground placeholder:text-muted-foreground h-full"
    // >
    //   <div ref={quillRef} className="" />
    // </div>
    <ReactQuill
      ref={editorRef}
      theme={theme}
      modules={modules}
      // formats={formats}
      placeholder={placeholder}
      value={value}
      onChange={onChange}
      className=""
    />
  );
};
