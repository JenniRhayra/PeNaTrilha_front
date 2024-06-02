import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaUserCircle } from 'react-icons/fa';

const Header: React.FC = () => {

    const handleRedirect = async (newPath: string) => {
        location.pathname = newPath;
    }
    return (
        <header className="header" style={{background: '#F8F8F8', zIndex: 1}}>
            <div className="logo">
                <Image
                    src="/images/penatrilha_logo_w_sf.png"
                    alt="logo pé na trilha"
                    width={120}
                    height={120}
                    onClick={() => handleRedirect('/')}
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