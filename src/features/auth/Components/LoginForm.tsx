
import React from "react";
import { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { Eye, EyeOff } from "lucide-react";
const LoginPage: React.FC = () => {

    const [showPassword, setShowPassword] = useState(false);
    return (
        <div className="flex min-h-screen w-full bg-black text-white">
            <div className="hidden md:flex  relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="md:h-full lg:h-180  object-cover"
                />
            </div>

            <div className="flex flex-1 mt-[28px] ml-20 px-6 md:px-20">
                <div className="w-full max-w-[600px]">
                    <div className="text-center mb-8">
                        <span className="mx-auto h-14 mb-22 flex justify-center">
                            {React.createElement(logo, { className: "h-[149px] w-[149px]" })}
                        </span>
                        <h2 className="text-2xl font-bold mb-4">Welcome back to Lio ClubX</h2>
                        <p className="text-md mb-0">
                            Your account is just a step away
                        </p>
                    </div>

                    <form className="space-y-5">
                        <input
                            type="email"
                            placeholder="Email"
                            className="w-full rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
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
                            className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
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

export default LoginPage;
