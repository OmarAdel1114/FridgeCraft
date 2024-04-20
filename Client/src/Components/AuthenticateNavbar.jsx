import React, { useEffect, useState } from 'react';
{/*Missing Firebase Import*/}
import { BookOpenIcon, Bars3BottomRightIcon, XMarkIcon } from '@heroicons/react/24/solid'
import Navbar from './Navbar';
import UserNavb from './UserNavbar';


const AuthenticateNavbar = () => {
    const [authenticatedUser, setauthenticatedUser] = useState("");

    useEffect(() => {
        const ListenAuth = onAuthStateChanged(auth, (user) => {
            if (user){
                setauthenticatedUser(user)
            }else {
                setauthenticatedUser(null)
            }
        })
        return () => {
            ListenAuth();
        }
    },[])

const userSignOut = () => {
    FaSignOutAlt(auth).then(() => {
        console.log("User Signed out")
    }).catch(error => console.log("error"))
}

    return (
        <>
        { authenticatedUser === user ?
        <>
        <UserNavb/>
        </> :
        <>
        <Navbar/>
        </>
    }
        </>
    );
}
export default AuthenticateNavbar;