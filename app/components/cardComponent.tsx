import { Card, CardHeader, CardBody, CardFooter } from "@nextui-org/card";
import { Divider } from "@nextui-org/divider";
import { Link } from "@nextui-org/link";
import { Image } from "@nextui-org/image";
import { Chip } from "@nextui-org/react";
import styled from 'styled-components';

interface ProfileCardProps {
  title: string;
  image: string;
  description: string;
  link: string;
  distancia: string;
}

const CardComponent: React.FC<ProfileCardProps> = ({ title, image, description, link, distancia }) => {
  return (
    <Card className="max-w-[400px]" style={{marginRight: '1em', height: '10em', marginBottom: '1em'}}>
      <CardHeader className="flex gap-3">
        <Image
          alt={title}
          height={150}
          radius="sm"
          src={image}
          width={150}
        />
        <div className="flex flex-col">
          <p className="text-md">{title}</p>
        </div>
        <div style={{ marginRight: '5px' }}>
          <Chip size="sm" style={{ color: 'white', backgroundColor: '#667358' }}> {distancia} </Chip>
        </div>

      </CardHeader>
      <Divider />
      <CardBody>
        <p>{description} </p>

      </CardBody>
      <Divider />
      <CardFooter className="justify-center">
        <Link 
          isExternal
          showAnchorIcon
          href={link}
        >
          Ver mais
        </Link>
      </CardFooter>
    </Card>

  );
}

export default CardComponent;



