import React, { useState } from "react";
import { Link } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";

const ForgotPasswordPage: React.FC = () => {
    const [email, setEmail] = useState("");

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        console.log("Reset link sent to:", email);
    };

    return (
        <div className="flex min-h-screen w-full bg-black text-white">
            <div className="hidden md:flex relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="md:h-full lg:h-180  object-cover"
                />
            </div>

            <div className="flex flex-1 mt-[28px] ml-20 px-6 md:px-20">
                <div className="w-full max-w-[600px]">

                    <div className="text-center mb-30">
                        <span className="mx-auto h-14 mb-22 flex justify-center">
                            {React.createElement(logo, { className: "h-[149px] w-[149px]" })}
                        </span>
                    </div>

                    <div className="text-start mb-8">
                        <h2 className="text-2xl font-bold mb-3">Forgot Password?</h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Enter your email and we’ll send you a reset link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Username"
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />


                        {/* <button
                            type="submit"
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
                        >
                            
                        </button> */}
                        <button
                            type="submit"
                            className="w-full py-3 rounded-md bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
                        >
                            Send reset password link
                        </button>
                    </form>

                    {/* Footer Links */}
                    <div className="flex justify-center items-center mt-6 gap-4 text-xs sm:text-sm text-gray-400">
                        <Link to="#" className="hover:underline">
                            Privacy Notice
                        </Link>
                        <span>|</span>
                        <Link to="#" className="hover:underline">
                            Terms of services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ForgotPasswordPage;
