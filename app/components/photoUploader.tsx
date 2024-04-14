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
            border: '2px solid #ccc',
            backgroundColor: '#f0f0f0',
          }}
        >
          {previewImage ? (
            <Image
              src={previewImage}
              alt="Uploaded"
              layout="fill"
              objectFit="cover"
            />
          ) : (
            <span style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)', color: '#555', fontSize: '24px' }}>+</span>
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
