import React, { useState } from 'react';
import Image from 'next/image';

const ImageUpload: React.FC = () => {
  const [image, setImage] = useState<File | null>(null);
  const [previewImage, setPreviewImage] = useState<string | null>(null);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && e.target.files[0];

    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImage(file);
        setPreviewImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div>
      <label htmlFor="image-upload" style={{ cursor: 'pointer' }}>
        <div
          style={{
            position: 'relative',
            width: '150px',
            height: '150px',
            borderRadius: '50%',
            overflow: 'hidden',
            backgroundColor: '#f0f0f0',
          }}
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Uploaded"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: '50%' }} // Ensure the image fits the circle
            />
          ) : (
            <Image
              src="/images/figure1.png"
              alt="Default Image"
              layout="fill"
              objectFit="cover"
              style={{ borderRadius: '50%' }} // Ensure the default image fills the circle
            />
          )}
        </div>
        <input
          type="file"
          id="image-upload"
          accept="image/*"
          style={{ display: 'none' }}
          onChange={handleImageChange}
        />
      </label>
    </div>
  );
};

export default ImageUpload;
