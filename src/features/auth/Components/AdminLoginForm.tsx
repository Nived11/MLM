import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { Eye, EyeOff, Shield } from "lucide-react";

const AdminLoginForm: React.FC = () => {
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("admin login button clicked");
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-gray-900 text-white overflow-hidden">
            <div className="hidden md:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-red-900/50 to-transparent"></div>
            </div>

            <div className="flex flex-1 px-5 sm:px-28 mt-8">
                <div className="w-full max-w-md lg:max-w-[600px]">
                    <div className="text-center mb-10">
                        <span className="mx-auto mb-6 flex justify-center">
                            {React.createElement(logo, { className: "h-28 w-28 sm:h-36 sm:w-36" })}
                        </span>
                        <div className="flex items-center justify-center gap-2 mb-4">
                            <Shield className="h-6 w-6 text-red-500" />
                            <span className="text-lg font-semibold text-red-500">Admin Portal</span>
                        </div>
                    </div>
                    
                    <div className="text-start mb-8 mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">Admin Access - Lio ClubX</h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Secure administrative access to the platform
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Admin Email"
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Admin Password"
                                className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-red-600"
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-primary"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>
                        <div className="flex justify-end">
                            <Link
                                to="/admin/forgot-password"
                                className="text-sm text-red-400 hover:underline"
                            >
                                Forgot Password
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-red-600 to-red-700 hover:from-red-700 hover:to-red-800 transition font-semibold"
                        >
                            Admin Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Need user access?{" "}
                        <Link
                            to="/login"
                            className="text-red-400 hover:underline font-medium"
                        >
                            User Login
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default AdminLoginForm;
