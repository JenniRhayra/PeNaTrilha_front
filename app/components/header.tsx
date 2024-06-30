import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { FaSearch, FaUserCircle } from 'react-icons/fa';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import Cookies from 'js-cookie';

const Header: React.FC = () => {

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const profilePath = "/profile";
    const logoutPath = "/login";

    const handleRedirect = async (newPath: string) => {
        location.pathname = newPath;
    }

    const handleMenuOptions = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleCloseSort = () => {
        setAnchorEl(null);
    };

    const handleProfileRedirect = () => {
        handleRedirect(profilePath);
    };

    const handleLogoutRedirect = () => {
        Cookies.remove('id')
        Cookies.remove('email')
        Cookies.remove('group')
        Cookies.remove('refreshToken')
        handleRedirect(logoutPath);
    };


    return (
        <header className="header" style={{ background: '#F8F8F8', zIndex: 1 }}>
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
                <Link href="#">
                    <FaUserCircle onClick={(e: React.MouseEvent<HTMLButtonElement>) => handleMenuOptions(e)} />
                    <Menu
                        id="lock-menu"
                        anchorEl={anchorEl}
                        open={open}
                        onClose={handleCloseSort}
                        MenuListProps={{
                            'aria-labelledby': 'lock-button',
                            role: 'listbox',
                        }}
                    >
                        <MenuItem onClick={handleProfileRedirect}>

                            Meu Perfil
                        </MenuItem>
                        <MenuItem onClick={handleLogoutRedirect} style={{ color: 'red' }}>
                            Logout
                        </MenuItem>

                    </Menu>
                </Link>
            </div>
        </header>
    );
};

export default Header;