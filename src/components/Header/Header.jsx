import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext/Context';
import { doSignOut } from '../../firebase/auth';

function Header() {
  const navigate = useNavigate();
  const { userLoggedIn } = useAuth();

  if (userLoggedIn === undefined) {
    return null; // or some loading indicator
  }

  return (
    <nav className='flex flex-row gap-x-2 w-full z-20 fixed top-0 left-0 h-20 border-b place-content-center items-center bg-gray-500'>
      {
        userLoggedIn
          ? <>
              <button onClick={() => { doSignOut().then(() => { navigate('/login') }) }}  className='px-4 py-2 border-b-2 text-white font-bold border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer'>Logout</button>
            </>
          : <>
              <Link  className='px-4 py-2 border-b-2 text-white font-bold border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer' to={'/login'}>Login</Link>
              <Link  className='px-4 py-2 border-b-2 font-bold text-white border-green-500 border-opacity-0 hover:border-opacity-100 hover:text-green-500 duration-200 cursor-pointer' to={'/register'}>Signup</Link>
            </>
      }
    </nav>
  );
}

export default Header;
