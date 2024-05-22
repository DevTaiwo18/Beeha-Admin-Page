import React, { useState } from 'react';
import AlertMessage from "../component/AlertMessage";
import { useNavigate } from 'react-router-dom';
import image from '../assets/BEEHA LAGOS.png'

function AdminSignin() {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [alert, setAlert] = useState({ show: false, status: '', message: '' });
    const [alertCount, setAlertCount] = useState(0);
    let navigate = useNavigate();

    const handleSubmit = (event) => {
        event.preventDefault();
        setAlertCount(alertCount + 1);
        if (!username || !password) {
            setAlert({ show: true, status: 'fail', message: 'Please enter both username and password.' });
            return;
        }

        if (username === 'admin' && password === 'admin123') {
            setAlert({ show: true, status: 'success', message: 'Login Successful!' });
            navigate("/dashboard/home")
        } else {
            setAlert({ show: true, status: 'fail', message: 'Incorrect username or password!' });
        }
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-[#f0f0f0]">
            <div className="w-full max-w-md px-8 py-8 mt-4 text-left bg-white shadow-lg rounded-lg">
                <div className="mb-6 text-center">
                    <div className="h-20 w-20 mx-auto">
                        <img src={image} alt="Your Logo" className="h-full w-full object-contain" />
                    </div>
                    <h3 className="mt-4 text-3xl font-bold" style={{ color: "rgb(110,38,14)" }}>Login</h3>
                </div>
                {alert.show && <AlertMessage status={alert.status} message={alert.message} onTrigger={alertCount} />}
                <form onSubmit={handleSubmit}>
                    <div>
                        <div>
                            <label className="block font-semibold" htmlFor="username">Username</label>
                            <input
                                type="text"
                                placeholder="Username"
                                className="w-full px-4 py-3 mt-2 border rounded-lg text-sm focus:outline-none"
                                id="username"
                                value={username}
                                onChange={e => setUsername(e.target.value)}
                                required
                            />
                        </div>
                        <div className="mt-4">
                            <label className="block font-semibold" htmlFor="password">Password</label>
                            <input
                                type="password"
                                placeholder="Password"
                                className="w-full px-4 py-3 mt-2 border rounded-lg text-sm focus:outline-none"
                                id="password"
                                value={password}
                                onChange={e => setPassword(e.target.value)}
                                required
                            />
                        </div>
                        <div className="flex items-baseline justify-between mt-6">
                            <button
                                type="submit"
                                className="px-6 py-2 text-white rounded-lg hover:bg-opacity-80"
                                style={{ backgroundColor: "rgb(110,38,14)", fontSize: "18px" }}
                            >
                                Login
                            </button>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
}

export default AdminSignin;
