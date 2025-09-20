// import React, { useState } from "react";
// import { Link } from "react-router-dom";
// import logo from "../../../components/icons/logo";
// import moneybg from "../../../assets/images/money-bg.png";

// const ForgotPasswordPage: React.FC = () => {
//     const [email, setEmail] = useState("");

//     const handleSubmit = (e: React.FormEvent) => {
//         e.preventDefault();
//         console.log("Reset link sent to:", email);
//     };

//     return (
//         <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
//             <div className="hidden lg:flex w-full lg:w-1/4 relative">
//                 <img
//                     src={moneybg}
//                     alt="Background Money"
//                     className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
//                 />
//             </div>

//             <div className="flex flex-1 px-5 sm:px-28 mt-8 ">
//                 <div className="w-full max-w-md lg:max-w-[600px]">
//                     <div className="text-center mb-10">
//                         <span className="mx-auto mb-6 flex justify-center">
//                             {React.createElement(logo, { className: "h-28 w-28 sm:h-36 sm:w-36" })}
//                         </span>
//                     </div>

//                     <div className="text-start mb-8 mt-12">
//                         <h2 className="text-xl sm:text-2xl font-bold mb-3">Forgot Password?</h2>
//                         <p className="text-sm sm:text-base text-gray-300">
//                             Enter your email and we'll send you a reset link.
//                         </p>
//                     </div>

//                     <form onSubmit={handleSubmit} className="space-y-5">
//                         <input
//                             type="text"
//                             placeholder="Username"
//                             className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />
//                         <input
//                             type="email"
//                             placeholder="Email address"
//                             value={email}
//                             onChange={(e) => setEmail(e.target.value)}
//                             className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
//                         />

//                         <button
//                             type="submit"
//                             className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
//                         >
//                             Send reset password link
//                         </button>
//                     </form>

//                     <div className="flex justify-center items-center mt-8 gap-4 text-xs sm:text-sm text-gray-400">
//                         <Link to="#" className="hover:underline">
//                             Privacy Notice
//                         </Link>
//                         <span>|</span>
//                         <Link to="#" className="hover:underline">
//                             Terms of Services
//                         </Link>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default ForgotPasswordPage;



import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";

export const baseURL = import.meta.env.VITE_API_URL || "";
const ForgotPasswordPage: React.FC = () => {
    const [userId, setUserId] = useState("");
    const [email, setEmail] = useState("");
    const [loading, setLoading] = useState(false);
    const [message, setMessage] = useState("");
    const [resetLink, setResetLink] = useState("");
    const [error, setError] = useState("");

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setMessage("");
        setError("");
        setResetLink("");

        if (!userId || !email) {
            setError("Please fill both fields");
            return;
        }

        try {
            setLoading(true);
            const res = await axios.post(`${baseURL}/forgot-password/`,
                {
                    user_id: userId,
                    email: email,
                }
            );

            setMessage(res.data.message || "Link sent successfully!");
            setResetLink(res.data.reset_link || "");
        } catch (err: any) {
            setError(
                err.response?.data?.message ||
                "Failed to send reset link. Please try again."
            );
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="flex flex-col lg:flex-row h-screen bg-black text-white overflow-hidden">
            {/* Left Image */}
            <div className="hidden lg:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background Money"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
            </div>

            {/* Right Form */}
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
                            Forgot Password?
                        </h2>
                        <p className="text-sm sm:text-base text-gray-300">
                            Enter your username & email and we'll send you a reset link.
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <input
                            type="text"
                            placeholder="Username"
                            value={userId}
                            onChange={(e) => setUserId(e.target.value)}
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />
                        <input
                            type="email"
                            placeholder="Email address"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full rounded-lg px-4 py-3 text-black bg-white focus:outline-none focus:ring-2 focus:ring-purple-600"
                        />

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full py-3 rounded-lg bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold disabled:opacity-50"
                        >
                            {loading ? "Sending..." : "Send reset password link"}
                        </button>
                    </form>

                    {message && (
                        <p className="text-green-500 mt-4 text-center">{message}</p>
                    )}
                    {resetLink && (
                        <p className="text-blue-400 mt-2 text-center break-all">
                            <a href={resetLink} target="_blank" rel="noopener noreferrer">
                                {resetLink}
                            </a>
                        </p>
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

export default ForgotPasswordPage;

