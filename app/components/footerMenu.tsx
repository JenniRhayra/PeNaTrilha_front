import React from 'react';
import Link from 'next/link';
import { AiOutlineHome, AiOutlineCompass } from 'react-icons/ai';
import { TbMapCheck } from "react-icons/tb";
import { FaRegUserCircle } from "react-icons/fa";
import '../globals.css';
import Cookies from 'js-cookie';

interface FooterMenuProps {
  activePage: string;
}

const FooterMenu: React.FC<FooterMenuProps> = ({ activePage }) => {

  const [getPath, setPath] = React.useState('')

  const group = Cookies.get('group');

  React.useEffect(() => {
    const path = (group == '3' || group == 'GERENTE') ? 'parkManager_profile' : (group == '4' || group == 'GUIA') ? 'guide_profile' : (group == '2' || group == 'VISITANTE') ? 'visitor_profile' : 'visitor_profile'
    setPath(path)
  }, [group])


  return (
    <div className="footerMenu" style={{ position: 'fixed', bottom: 0, left: 0, width: '100%', backgroundColor: 'white', zIndex: 999 }}>
      <Link href="/home" passHref>
        <div className={activePage === 'home' ? 'active' : ''}>
          <AiOutlineHome size={30} />
        </div>
      </Link>
      <Link href="/search" passHref>
        <div className={activePage === 'search' ? 'active' : ''}>
          <AiOutlineCompass size={30} />
        </div>
      </Link>
      <Link href="/visited" passHref>
        <div className={activePage === 'visited' ? 'active' : ''}>
          <TbMapCheck size={30} />
        </div>
      </Link>
      <Link href={getPath} passHref>
        <div className={activePage === 'profile' ? 'active' : ''}>
          <FaRegUserCircle size={30} />
        </div>
      </Link>
    </div>
  );
};

export default FooterMenu;
