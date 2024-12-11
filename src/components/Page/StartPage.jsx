import React from 'react';
import { useNavigate } from 'react-router-dom';

function StartPage() {
  const navigate = useNavigate();

  const handleLogin = () => {
    navigate('/login');
  };

  const handleSignup = () => {
    navigate('/register');
  };

  return (
    <div
      className="flex flex-col items-center justify-center min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1603457893497-4de5ef1d8ab1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D)' }}
    >
      <div className="bg-black bg-opacity-80 p-8 rounded-lg text-center">
        <h1 className="text-5xl font-bold text-white mb-4">
          Welcome To Your Personal Memory Vault
        </h1>
        <p className="text-lg text-gray-200 mb-8">
        Where Every Picture Tells a Story...!
        </p>

        <div className="flex justify-center space-x-4">
          <button
            onClick={handleLogin}
            className="px-6 py-2 bg-blue-500 text-white font-semibold rounded-lg hover:bg-blue-600"
          >
            Login
          </button>
          <button
            onClick={handleSignup}
            className="px-6 py-2 bg-green-500 text-white font-semibold rounded-lg hover:bg-green-600"
          >
            Signup
          </button>
        </div>
      </div>
    </div>
  );
}

export default StartPage;
