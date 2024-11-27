
import React, { useState } from 'react';
import { toast } from 'react-toastify';

const Login = ({ setToken }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const onSubmitHandle = async (e) => {
        try {
            e.preventDefault();

            // Mock check using environment variables
            const adminEmail = import.meta.env.VITE_ADMIN_EMAIL;
            const adminPassword = import.meta.env.VITE_ADMIN_PASSWORD;

            if (email === adminEmail && password === adminPassword) {
                // Simulate successful login
                const mockToken = "mock-token-12345";  // Simulated token
                setToken(mockToken);
                toast.success("Login successful");
            } else {
                toast.error("Invalid credentials");
            }

        } catch (error) {
            console.error("Login failed:", error);
            toast.error(error.message);
        }
    };

    return (
        <div className='min-h-screen flex items-center justify-center w-full'>
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>
                <form onSubmit={onSubmitHandle}>
                    <div className='mb-3'>
                        <label className='text-sm font-medium text-gray-700 mb-2' htmlFor="email">Email Address</label>
                        <input
                            id="email"
                            onChange={(e) => setEmail(e.target.value)}
                            value={email}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="email"
                            placeholder='email'
                            required
                        />
                    </div>
                    <div className='mb-3'>
                        <label className='text-sm font-medium text-gray-700 mb-2' htmlFor="password">Password</label>
                        <input
                            id="password"
                            onChange={(e) => setPassword(e.target.value)}
                            value={password}
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="password"
                            placeholder='password'
                            required
                        />
                    </div>
                    <button className='mt-2 w-full py-2 px-4 rounded-md text-white bg-black' type='submit'>Login</button>
                </form>
            </div>
        </div>
    );
};

export default Login;

