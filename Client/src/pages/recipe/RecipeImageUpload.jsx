import{ useCallback, useState } from "react";
import { useDropzone } from "react-dropzone";

const dropzoneStyle = {
  flex: 1,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  padding: "20px",
  marginTop: "2rem",
  borderWidth: "2px",
  borderRadius: "2px",
  borderColor: "#eeeeee",
  borderStyle: "dashed",
  backgroundColor: "#fafafa",
  color: "#bdbdbd",
  outline: "none",
  transition: "border 0.24s ease-in-out",
  cursor: "pointer",
};

const activeDropzoneStyle = {
  borderColor: "#00adb5",
};

const DropzoneText = {
  margin: "0",
  fontSize: "16px",
  fontWeight: "600",
  textAlign: "center",
};

const ImagePreview = {
  display: "flex",
  maxWidth: "100%",
  maxHeight: "100%",
  margin: "auto",
  borderRadius: "2px",
};

const FileName = {
  display: "flex",
  fontSize: "14px",
  marginTop: "8px",
};

const DropzoneComponent = () => {
  const [files, setFiles] = useState([]);
  const onDrop = useCallback((acceptedFiles) => {
    setFiles(
      acceptedFiles.map((file) =>
        Object.assign(file, {
          preview: URL.createObjectURL(file),
        })
      )
    );
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: "image/*",
    maxSize: 1024 * 1024 * 5,
    maxFiles: 3,
  });

  const fileList = files.map((file) => (
    <li key={file.name}>
      <img style={ImagePreview} src={file.preview} alt={file.name} />
      <span style={FileName}>{file.name}</span>
    </li>
  ));

  return (
    <div
      style={
        isDragActive
          ? { ...dropzoneStyle, ...activeDropzoneStyle }
          : dropzoneStyle
      }
      {...getRootProps()}
    >
      <input {...getInputProps()} />
      <p style={DropzoneText}>
        Drag and drop your recipe photo here, or click to select an image
      </p>
      <ul>{fileList}</ul>
    </div>
  );
};

export default DropzoneComponent;