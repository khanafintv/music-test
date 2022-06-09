import React, { useRef } from "react";

interface FileUploadProps {
  setFile: Function;

  accept: string;
  children: any;
}

export const FileUpload: React.FC<FileUploadProps> = ({
  setFile,
  accept,
  children,
}) => {
  const ref: any = useRef();

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const arr: any = e.target.files;
    setFile(arr[0]);
  };

  return (
    <div onClick={() => ref.current.click()}>
      <input
        type="file"
        accept={accept}
        style={{ display: "none" }}
        ref={ref}
        onChange={onChange}
      />
      {children}
    </div>
  );
};
