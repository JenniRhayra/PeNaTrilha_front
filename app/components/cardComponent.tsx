import {Card, CardHeader, CardBody, CardFooter} from "@nextui-org/card";
import {Divider} from "@nextui-org/divider";
import {Link} from "@nextui-org/link";
import {Image} from "@nextui-org/image";

interface ProfileCardProps {
  title: string;
  image: string;
  description: string;
  link : string;
}

  const CardComponent: React.FC<ProfileCardProps> = ({ title, image, description, link }) => {
  return (
    <Card className="max-w-[400px]">
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
      </CardHeader>
      <Divider/>
      <CardBody>
        <p>{description} </p>
      </CardBody>
      <Divider/>
      <CardFooter>
        <Link
          isExternal
          showAnchorIcon
          href= {link}
        >
          Ver mais
        </Link>
      </CardFooter>
    </Card>
  );
}

export default CardComponent;



