
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { Eye, EyeOff } from "lucide-react";
const LoginForm: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("login button clicked");
    };
    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
            <div className="hidden md:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
            </div>

            <div className="flex flex-1 px-5 sm:px-28 mt-8 ">
                <div className="w-full max-w-md lg:max-w-[600px]">
                    <div className="text-center mb-10">
                        <span className="mx-auto mb-6 flex justify-center">
                            {React.createElement(logo, { className: "h-28 w-28 sm:h-36 sm:w-36" })}
                        </span>
                    </div>
                    <div className="text-start mb-8 mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">Welcome back to Lio ClubX</h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Your account is just a step away
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                                to="/forgot-password"
                                className="text-sm text-blue-500 hover:underline"
                            >
                                Forgot Password
                            </Link>
                        </div>
                        <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
                        >
                            Login
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Dont have Account?{" "}
                        <Link
                            to="/register"
                            className="text-purple-500 hover:underline font-medium"
                        >
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
