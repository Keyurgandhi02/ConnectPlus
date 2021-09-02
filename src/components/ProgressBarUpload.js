import React, { useEffect } from "react";
import useStorage from "../hooks/useStorage";

const ProgressBarUpload = ({ file, setFile }) => {
  const { url } = useStorage(file);

  useEffect(() => {
    if (url) {
      setFile(null);
    }
  }, [url, setFile]);

  return <></>;
};

export default ProgressBarUpload;
