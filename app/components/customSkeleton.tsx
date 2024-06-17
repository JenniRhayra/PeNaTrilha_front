import React, { useState, useEffect } from 'react';
import styled, { keyframes } from 'styled-components';

const SkeletonAnimation = keyframes`
  0% {
    transform: translateX(-100%);
  }
  100% {
    transform: translateX(100%);
  }
`;

const Boot = styled.div`
  position: absolute;
  bottom: 0;
  left: -20px;
  width: 30px;
  height: 30px;
  background: black;
  border-radius: 50%;
  animation: ${SkeletonAnimation} 3s linear infinite;
`;

const CustomSkeleton: React.FC = () => {
  return (
    <div style={{ position: 'relative', height: '100vh', overflow: 'hidden' }}>
      <Boot />
    </div>
  );
};

export default CustomSkeleton;
