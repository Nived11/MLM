import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";

export const baseURL = import.meta.env.VITE_API_URL || "";
const LoginForm: React.FC = () => {
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [userId, setUserId] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            setLoading(true);
            setError(null);

            const response = await axios.post(`${baseURL}/login/`, {

                user_id: userId,
                password: password
            })
            console.log("Login response:", response);

            const resData = response.data

            localStorage.setItem("accessToken", resData?.access)
            localStorage.setItem("refreshToken", resData?.refresh)
            navigate("/dashboard");
        } catch (err: any) {
            const msg =
                err.response?.data?.detail || err.message || "Login failed. Try again.";
            setError(msg);
            return false;
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
            {/* Left Image */}
            <div className="hidden md:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
            </div>
            {/* Form */}
            <div className="flex flex-1 px-5 sm:px-28 mt-8">
                <div className="w-full max-w-md lg:max-w-[600px]">
                    <div className="text-center mb-10">
                        <span className="mx-auto mb-6 flex justify-center">
                            {React.createElement(logo, { className: "h-28 w-28 sm:h-36 sm:w-36" })}
                        </span>
                    </div>

                    <div className="text-start mb-8 mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">
                            Welcome back to Lio ClubX
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Your account is just a step away
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="userId"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                            required
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                                required
                            />
                            <button
                                type="button"
                                onClick={() => setShowPassword(!showPassword)}
                                className="absolute right-3 top-1/2 transform -translate-y-1/2 text-sm text-primary"
                            >
                                {showPassword ? <Eye size={20} /> : <EyeOff size={20} />}
                            </button>
                        </div>

                        {error && <p className="text-red-500 text-sm">{error}</p>}

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
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? "Logging in..." : "Login"}
                        </button>
                    </form>

                    <p className="mt-6 text-center text-sm text-gray-400">
                        Don't have an account?{" "}
                        <Link to="/register" className="text-purple-500 hover:underline font-medium">
                            Create account
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default LoginForm;
