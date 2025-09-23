import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { Eye, EyeOff } from "lucide-react";
import { extractErrorMessages } from "../../../utils/helpers/extractErrorMessage";

export const baseURL = import.meta.env.VITE_API_URL || "";

const ResetPasswordPage: React.FC = () => {
    const navigate = useNavigate();
    const [token, setToken] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");

        if (!token || !newPassword || !confirmPassword) {
            setError("Please fill all fields");
            return;
        }

        if (newPassword !== confirmPassword) {
            setError("Passwords do not match");

            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/reset-password/`, {
                token: token,
                new_password: newPassword,
                confirm_password: confirmPassword,
            });

            setMessage(res.data.message || "Password reset successful!");
            setTimeout(() => navigate("/login"), 2000);
        } catch (err: any) {
            setError(extractErrorMessages(err) || "Failed to reset password. Please try again.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
            <div className="hidden lg:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
            </div>
            <div className="flex flex-1 px-5 sm:px-28 mt-8">
                <div className="w-full max-w-md lg:max-w-[600px]">
                    <div className="text-center mb-10">
                        <span className="mx-auto mb-6 flex justify-center">
                            {React.createElement(logo, {
                                className: "h-28 w-28 sm:h-36 sm:w-36",
                            })}
                        </span>
                    </div>

                    <div className="text-start mb-8 mt-12">
                        <h2 className="text-xl sm:text-2xl font-bold mb-3">
                            Reset Your Password
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Paste the token from your email and enter a new password.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Token"
                            value={token}
                            onChange={(e) => setToken(e.target.value)}
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="New Password"
                                value={newPassword}
                                onChange={(e) => setNewPassword(e.target.value)}
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
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Confirm password"
                                value={newPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
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

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? "Resetting..." : "Reset Password"}
                        </button>
                    </form>

                    {message && (
                        <p className="text-green-500 mt-4 text-center">{message}</p>
                    )}
                    {error && <p className="text-red-500 mt-4 text-center">{error}</p>}

                    <div className="flex justify-center items-center mt-8 gap-4 text-xs sm:text-sm text-gray-400">
                        <Link to="#" className="hover:underline">
                            Privacy Notice
                        </Link>
                        <span>|</span>
                        <Link to="#" className="hover:underline">
                            Terms of Services
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ResetPasswordPage;

