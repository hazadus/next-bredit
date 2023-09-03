import { Box, SkeletonText } from "@chakra-ui/react";
import React from "react";

const ProfilePostSkeleton: React.FC = () => {
  return (
    <>
      <Box height="96px" padding="10px" mb={4} boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={3} width="90%" spacing="4" />
      </Box>
      <Box height="96px" padding="10px" mb={4} boxShadow="lg" bg="white" borderRadius={4}>
        <SkeletonText mt="4" noOfLines={3} width="90%" spacing="4" />
      </Box>
    </>
  );
};

export default ProfilePostSkeleton;
