import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Header: React.FC = () => {
  return (
    <header className="header">
        <div className="logo">
            <Image
                src="/images/penatrilha_logo_w_sf.png"
                alt="logo pé na trilha"
                width={120}
                height={120}
            />
        </div>
        <div className="actions">
            <Link href="/search">
                <FaSearch />
            </Link>
            <Link href="/profile">
                <FaUserCircle />
            </Link>
        </div>
    </header>
  );
};

export default Header;