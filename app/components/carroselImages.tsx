import React, { useState } from 'react';
import { FiArrowLeft, FiArrowRight } from 'react-icons/fi';
import styled from 'styled-components';

interface CarouselProps {
  images: string[];
  titles: string[];
  imageWidth: number;
  imageHeight: number;
  borderRadius: number;
  imageSpacing: number;
}

const CarouselContainer = styled.div`
  display: flex;
  overflow: hidden;
  position: relative;
  width: 100%;
`;

const ImageList = styled.div<{ translateX: number }>`
  display: flex;
  transform: translateX(${props => props.translateX}px);
  transition: transform 0.3s ease-in-out;
`;

const ImageWrapper = styled.div<{ imageWidth: number; imageHeight: number; imageSpacing: number; borderRadius: number }>`
  flex: 0 0 ${props => props.imageWidth}px;
  margin-right: ${props => props.imageSpacing}px;
  position: relative;

  img {
    width: ${props => props.imageWidth}px;
    height: ${props => props.imageHeight}px;
    border-radius: ${props => props.borderRadius}px;
    object-fit: cover;
  }
`;

const ImageTitle = styled.div`
  position: absolute;
  bottom: 20px;
  left: 10px;
  color: white;
  font-size: 14px;
  padding: 5px 10px;
  max-width: calc(100% - 20px);
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
  font-weight: bold;
`;

const ArrowButton = styled.button<{ left?: boolean }>`
  position: absolute;
  top: 50%;
  ${props => (props.left ? 'left: 10px' : 'right: 10px')};
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.7);
  border: none;
  border-radius: 50%;
  width: 40px;
  height: 40px;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  z-index: 1;
`;

const CarouselImages: React.FC<CarouselProps> = ({ images, titles, imageWidth, imageHeight, borderRadius, imageSpacing }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [touchX, setTouchX] = useState<number | null>(null);

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(prevIndex => prevIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(prevIndex => prevIndex - 1);
    }
  };

  const handleTouchStart = (e: React.TouchEvent) => {
    setTouchX(e.touches[0].clientX);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
  if (touchX !== null) {
    const touchMoveX = e.touches[0].clientX;
    const imagesMoved = Math.round((touchX - touchMoveX) / (imageWidth + imageSpacing));
    setCurrentIndex(prevIndex => Math.max(0, Math.min(prevIndex + imagesMoved, images.length - 1)));
  }
};

  const handleTouchEnd = () => {
    setTouchX(null);
  };

  return (
    <CarouselContainer
      onTouchStart={handleTouchStart}
      onTouchMove={handleTouchMove}
      onTouchEnd={handleTouchEnd}
    >
      {currentIndex > 0 && (
        <ArrowButton left onClick={handlePrev}>
          <FiArrowLeft size={30} color="white" />
        </ArrowButton>
      )}
      <ImageList translateX={-currentIndex * (imageWidth + imageSpacing)}>
        {images.map((src, index) => (
          <ImageWrapper key={index} imageWidth={imageWidth} imageHeight={imageHeight} imageSpacing={imageSpacing} borderRadius={borderRadius}>
            <img src={src} alt={`Image ${index + 1}`} />
            <ImageTitle>{titles[index]}</ImageTitle>
          </ImageWrapper>
        ))}
      </ImageList>
      {currentIndex < images.length - 1 && (
        <ArrowButton onClick={handleNext}>
          <FiArrowRight size={30} color="white" />
        </ArrowButton>
      )}
    </CarouselContainer>
  );
};

export default CarouselImages;