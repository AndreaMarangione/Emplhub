import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from "react-redux";
import { toggleMenu } from '../../redux/menuMobileSlice';
import { showMenu } from '../../redux/menuMobileSlice';
import { loginState, login } from '../../redux/sessionSlice';
import { jwtDecode } from "jwt-decode";
import useWindowSize from '../../Hooks/useWindowsSize';
import NotifyIcon from '../icons/NotifyIcon/NotifyIcon';
import UserIcon from '../icons/UserIcon/UserIcon';
import MenuIcon from '../icons/MenuIcon/MenuIcon';
import Logo from '../Logo/Logo';
import useClick from '../../Hooks/useClick';
import ProfileDropdown from '../ProfileDropdown/ProfileDropdown';
import PasswordForm from '../PasswordForm/PasswordForm';
import AxiosApi from '../../class/axiosApi';
import './navbar.css';

const Navbar = () => {
    const api = new AxiosApi();
    let sessionData = useSelector(loginState);
    const click = useClick();
    const dispatch = useDispatch();
    const { width } = useWindowSize();
    const menu = useSelector(showMenu);
    const [showDrop, setShowDrop] = useState(false);
    const [showPassForm, setShowPassForm] = useState(false);
    const handleDropdown = () => {
        setShowDrop(!showDrop);
    }
    const handlePassForm = () => {
        setShowPassForm(!showPassForm);
    }
    const handleImage = async (e) => {
        const image = e.target.files[0];
        const data = new FormData();
        data.append('profileImage', image);
        try {
            const response = await api.patch('/profile/image',
                data,
                {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                }
            );
            if (response.statusText) {
                const token = JSON.stringify(response.data);
                localStorage.setItem('token', token);
                sessionData = jwtDecode(token);
                dispatch(login(sessionData));
            }
        } catch (error) {
            console.error(error.message);
        }
    }
    useEffect(() => {
        if (menu && click.x > 210) {
            dispatch(toggleMenu());
        }
    }, [click])
    return (
        <nav className="container-fluid navbar-container py-2">
            {width > 768 ?
                <>
                    <div className="row">
                        <div className="col-2 d-flex align-items-center justify-content-center">
                            <Logo />
                        </div>
                        <div className="col-7 col-xl-8"></div>
                        <div className="col-3 col-xl-2 d-flex align-items-center justify-content-center gap-4 position-relative">
                            <NotifyIcon classStyle='notify-icon' />
                            <UserIcon
                                sessionData={sessionData}
                                onClick={handleDropdown} />
                            <ProfileDropdown
                                sessionData={sessionData}
                                classStyle={`profile-dropdown 
                                ${showDrop ?
                                        'profile-dropdown-show'
                                        : 'profile-dropdown-hide'}`
                                }
                                onChange={handleImage}
                                onClick={handlePassForm} />
                        </div>
                    </div>
                    <PasswordForm onMouseDown={handlePassForm} clicked={showPassForm} />
                </>
                :
                <div className="row">
                    <div className="col d-flex align-items-center justify-content-between">
                        <MenuIcon
                            onClick={() => dispatch(toggleMenu())}
                            classStyle='menu-icon z-2' />
                        <Logo />
                        <div className="d-flex align-items-center justify-content-center gap-4">
                            <NotifyIcon classStyle='notify-icon' />
                        </div>
                    </div>
                </div>
            }
        </nav>
    )
}

export default Navbar;
