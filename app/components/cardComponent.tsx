import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import Image from 'next/image';
import { Chip } from "@nextui-org/react";
import { Button } from "@mui/material";
import React, { useState } from 'react';
import MapComponent from './mapComponent';
import { FaLocationDot } from "react-icons/fa6";

interface ProfileCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  distancia: string;
  chipIsVisible: boolean;
  pinIsVisible: boolean;
}

const CardComponent: React.FC<ProfileCardProps> = ({ title, image, description, link, distancia, chipIsVisible, pinIsVisible }) => {
  const [isLocationDotClicked, setIsLocationDotClicked] = useState(false);

  const handlePinClick = () => {
    setIsLocationDotClicked(!isLocationDotClicked);
  }

  return (
    <Card className="max-w-[400px]" style={{ marginBottom: '2vh', padding: '2vh' }}>
      <CardHeader className="flex gap-2 items-center">
        <div style={{ position: 'relative', width: '100px', height: '60px', overflow: 'hidden', borderRadius: '10px' }}>
          <Image src={image} alt={title} layout="fill" objectFit="cover" />
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', flexGrow: 1 }}>
          <p className="text-md">{title}</p>
        </div>
        {/* {pinIsVisible && (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <Button id='btnPin' sx={{padding:0, margin:0 }} onClick={handlePinClick}>
              <FaLocationDot size='3vh' color={isLocationDotClicked ? 'green' : 'black'} className="cursor-pointer"/>
            </Button>
            {chipIsVisible && (
              <div style={{ marginTop: '0.5rem' }}>
                <Chip size="sm" style={{ color: 'white', backgroundColor: '#667358' }}> {distancia} </Chip>
              </div>
            )}
          </div>
        )} */}
      </CardHeader>

      <CardBody>
        <p style={{ marginTop: '2vh', fontSize: '12px' }}>{description} </p>
      </CardBody>

      <CardFooter className="justify-end" style={{ paddingRight: '1rem' }}>
        <Link style={{ color: '#7D9662', fontWeight: 'bold', textDecoration: 'underline', fontSize: '12px' }} href={link}>
          Ver perfil
        </Link>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;
