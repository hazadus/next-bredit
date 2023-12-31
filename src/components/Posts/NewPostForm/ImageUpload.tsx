import { Button, Flex, Image, Stack } from "@chakra-ui/react";
import React from "react";

type ImageUploadProps = {
  selectedFile?: string;
  setSelectedFile: (value: string) => void;
  selectPostTab: () => void;
  selectFileRef: React.RefObject<HTMLInputElement>;
  onSelectImage: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const ImageUpload: React.FC<ImageUploadProps> = ({
  selectedFile,
  setSelectedFile,
  selectPostTab,
  selectFileRef,
  onSelectImage,
}) => {
  return (
    <Flex direction="column" justify="center" align="center" width="100%">
      {selectedFile ? (
        <>
          {/* `selectedFile` contains the image data as string */}
          <Image src={selectedFile as string} maxWidth="400px" maxHeight="400px" />
          <Stack direction="row" mt={4}>
            <Button height="28px" onClick={selectPostTab}>
              Back to Post
            </Button>
            <Button variant="outline" height="28px" onClick={() => setSelectedFile("")}>
              Remove
            </Button>
          </Stack>
        </>
      ) : (
        <Flex
          justify="center"
          align="center"
          p={20}
          border="1px dashed"
          borderColor="gray.200"
          borderRadius={4}
          width="100%"
        >
          {/* NB: actual file input is hidden, we virtually "click" on it using ref in our custom button: */}
          <Button variant="outline" height="28px" onClick={() => selectFileRef.current?.click()}>
            Upload
          </Button>
          <input
            id="file-upload"
            type="file"
            accept="image/x-png,image/gif,image/jpeg,image/png"
            hidden
            ref={selectFileRef}
            onChange={onSelectImage}
          />
        </Flex>
      )}
    </Flex>
  );
};

export default ImageUpload;
