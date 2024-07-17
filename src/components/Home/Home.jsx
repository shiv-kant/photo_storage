import React from 'react';
import { useAuth } from '../../authContext/Context';
import { Link } from 'react-router-dom';
import Gallery from '../Page/Gallery';

function Home() {
  const { currentUser } = useAuth();
  return (
    <>

    <div className=' text-2xl font-bold pt-24 text-center 'style={{ color: 'blue' }}>
      Welcome To Your Gallery {currentUser.displayName ? currentUser.displayName : currentUser.email}....
    </div>
    <Gallery />
    </>
    
  );
}

export default Home;
