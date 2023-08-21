import React, { useState } from "react";

/**
 * Stores selected file in `selectedFileData` as string.
 * @param event Event emitted by file input on change (when file is selected)
 */
const useSelectFile = () => {
  const [selectedFileData, setSelectedFileData] = useState<string>();

  const onSelectFile = (event: React.ChangeEvent<HTMLInputElement>) => {
    const reader = new FileReader();
    if (event.target.files?.[0]) {
      reader.readAsDataURL(event.target.files[0]);
    }

    reader.onload = (readerEvent) => {
      if (readerEvent.target?.result) {
        setSelectedFileData(readerEvent.target?.result as string);
      }
    };
  };

  return {
    selectedFileData,
    setSelectedFileData,
    onSelectFile,
  };
};

export default useSelectFile;
