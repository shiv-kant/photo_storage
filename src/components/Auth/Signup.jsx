import React, { useState } from 'react';
import { Navigate, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../authContext/Context';
import { doCreateUserWithEmailAndPassword } from '../../firebase/auth';
import { updateProfile } from 'firebase/auth';

function Signup() {
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isRegistering, setIsRegistering] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  const { userLoggedIn, setCurrentUser } = useAuth();

  const onSubmit = async (e) => {
    e.preventDefault();
    if (!isRegistering) {
      setIsRegistering(true);
      try {
        const userCredential = await doCreateUserWithEmailAndPassword(email, password);
        await updateProfile(userCredential.user, { displayName: name });
        setCurrentUser({ ...userCredential.user, displayName: name });
        navigate('/home');
      } catch (error) {
        setErrorMessage(error.message);
        setIsRegistering(false);
      }
    }
  };

  return (
    <>
      {userLoggedIn && <Navigate to={'/home'} replace={true} />}
      
      {/* Background and Centered Form Container */}
      <main className="w-full h-screen flex items-center justify-center bg-cover bg-center bg-gray-900" style={{ backgroundImage: "url('https://images.unsplash.com/photo-1603457893497-4de5ef1d8ab1?q=80&w=1887&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D')" }}>
        <div className="w-full max-w-md p-8 bg-white bg-opacity-90 rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold text-gray-800 text-center">Sign Up</h2>
          <p className="text-center text-gray-500 mt-2 mb-6">Create a new account to get started</p>

          <form onSubmit={onSubmit} className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-gray-600">Name</label>
              <input
                type="text"
                autoComplete="name"
                placeholder="Enter Your Full Name"
                required
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Email</label>
              <input
                type="email"
                autoComplete="email"
                placeholder="Enter Your Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
              />
            </div>
            <div>
              <label className="text-sm font-semibold text-gray-600">Password</label>
              <input
                type="password"
                autoComplete="new-password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full mt-2 px-3 py-2 border rounded-lg text-gray-700 outline-none focus:border-indigo-500 transition duration-300"
              />
            </div>

            {/* Error Message */}
            {errorMessage && <p className="text-red-500 text-sm">{errorMessage}</p>}

            {/* Sign Up Button */}
            <button
              type="submit"
              disabled={isRegistering}
              className={`w-full py-2 mt-4 text-white font-semibold rounded-lg ${isRegistering ? 'bg-gray-400 cursor-not-allowed' : 'bg-indigo-600 hover:bg-indigo-700 transition duration-300'}`}
            >
              {isRegistering ? 'Signing Up...' : 'Sign Up'}
            </button>

            {/* Redirect to Login */}
            <div className="text-sm text-center mt-4">
              Already have an account?{' '}
              <Link to={'/login'} className="text-indigo-600 font-semibold hover:underline">
                Log in
              </Link>
            </div>
          </form>
        </div>
      </main>
    </>
  );
}

export default Signup;
