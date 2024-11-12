import React from 'react';
import { useAuth } from '../../authContext/Context';
import Gallery from '../Page/Gallery';

function Home() {
  const { currentUser } = useAuth();

  return (
    <div
      className="w-full min-h-screen bg-cover bg-center relative flex flex-col items-center justify-start text-white"
      style={{
        backgroundImage: `url('https://images.unsplash.com/photo-1660415341888-b238046a5d82?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')`,
        backgroundRepeat: 'repeat',
        backgroundSize: 'cover',
      }}
    >
      {/* Dark overlay for text clarity */}
      <div className="absolute inset-0 bg-black opacity-20"></div>

      {/* Content */}
      <div className="relative z-50 text-center mt-4 px-4">
        <h1 className="text-4xl font-bold font-sans mb-4 shadow-lg">
          Welcome to Your Gallery, {currentUser.displayName ? currentUser.displayName : currentUser.email}!
        </h1>
        <p className="text-lg opacity-90 mb-6">Your space for memories and moments</p>
      </div>

      {/* Gallery Component */}
      <div className="relative z-10 w-full flex justify-center">
        <Gallery />
      </div>
    </div>
  );
}

export default Home;
