// import React from "react";
// import { Eye, EyeOff } from "lucide-react";
// import { Link } from "react-router-dom";
// import logo from "../../../components/icons/logo";
// import moneybg from "../../../assets/images/money-bg.png";
// import { useSignupForm } from "../hooks/singupHook";

// const SignupForm: React.FC = () => {
//     const {
//         register,
//         handleSubmit,
//         errors,
//         showPassword,
//         setShowPassword,
//         showConfirmPassword,
//         setShowConfirmPassword,
//         passwordValue,
//         setPasswordValue,
//         confirmPasswordValue,
//         setConfirmPasswordValue,
//         confirmError,
//         sponsorId,
//         setSponsorId,
//         sponsorName,
//         setSponsorName,
//         handlePincodeBlur,
//         pincodeStatus,
//         onSubmit,
//         setConfirmError
//     } = useSignupForm();

//     return (
//         <div className="flex min-h-screen w-full bg-black text-white">
//             <div className="hidden md:flex relative">
//                 <img
//                     src={moneybg}
//                     alt="Background Money"
//                     className="md:h-full lg:h-180 object-cover"
//                 />
//             </div>

//             <div className="flex flex-1 mt-[28px] ml-20 px-6 md:px-20">
//                 <div className="w-full max-w-[650px]">
//                     <div className="text-center mb-8">
//                         <span className="mx-auto h-14 mb-18 flex justify-center">
//                             {React.createElement(logo, {
//                                 className: "h-[149px] w-[149px]",
//                             })}
//                         </span>
//                         <h2 className="text-2xl font-bold mb-2">Welcome To LioClubX</h2>
//                         <p className="text-md">Please sign up to continue</p>
//                     </div>

//                     <form
//                         className="grid grid-cols-2 gap-5"
//                         onSubmit={handleSubmit(onSubmit)}
//                     >
//                         {/* Sponsor ID */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Sponsor ID"
//                                 value={sponsorId}
//                                 onChange={(e) => {
//                                     const val = e.target.value;
//                                     setSponsorId(val);
//                                     const name =
//                                         {
//                                             LX10001: "Rahul Sharma",
//                                             LX10002: "Priya Singh",
//                                             LX10003: "Amit Patel",
//                                             LX88011: "Daralika V",
//                                         }[val.trim().toUpperCase()] || "";
//                                     setSponsorName(name);
//                                 }}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {sponsorName && (
//                                 <p className="text-green-500 text-sm mt-1">
//                                     Sponsor Name:{" "}
//                                     <span className="font-semibold">{sponsorName}</span>
//                                 </p>
//                             )}
//                         </div>
//                         <input type="hidden" value={sponsorName} {...register("sponsorName")} />

//                         {/* Pincode */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Pincode"
//                                 {...register("pincode")}
//                                 onBlur={handlePincodeBlur}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {pincodeStatus === "invalid" && (
//                                 <p className="text-red-500 text-sm">
//                                     Pincode is not valid or not serviceable
//                                 </p>
//                             )}
//                             {pincodeStatus === "checking" && (
//                                 <p className="text-gray-400 text-sm">Checking pincode...</p>
//                             )}
//                             {errors.pincode && (
//                                 <p className="text-red-500 text-sm">{errors.pincode.message}</p>
//                             )}
//                         </div>

//                         {/* Placement ID */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Placement Id"
//                                 {...register("placementId")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.placementId && (
//                                 <p className="text-red-500 text-sm">{errors.placementId.message}</p>
//                             )}
//                         </div>

//                         {/* Payment Type */}
//                         <div>
//                             <select
//                                 {...register("paymentType")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             >
//                                 <option value="">Select Payment Type</option>
//                                 <option value="gpay">GPay</option>
//                                 <option value="phonepe">PhonePe</option>
//                                 <option value="paytm">Paytm</option>
//                             </select>
//                             {errors.paymentType && (
//                                 <p className="text-red-500 text-sm">{errors.paymentType.message}</p>
//                             )}
//                         </div>

//                         {/* First Name */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="First Name"
//                                 {...register("firstName")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.firstName && (
//                                 <p className="text-red-500 text-sm">{errors.firstName.message}</p>
//                             )}
//                         </div>

//                         {/* UPI Number */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="UPI Number"
//                                 {...register("upiNumber")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.upiNumber && (
//                                 <p className="text-red-500 text-sm">{errors.upiNumber.message}</p>
//                             )}
//                         </div>

//                         {/* Last Name */}
//                         <div>
//                             <input
//                                 type="text"
//                                 placeholder="Last Name"
//                                 {...register("lastName")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.lastName && (
//                                 <p className="text-red-500 text-sm">{errors.lastName.message}</p>
//                             )}
//                         </div>


//                         {/* Password */}
//                         <div className="relative flex items-center">
//                             <input
//                                 type={showPassword ? "text" : "password"}
//                                 placeholder="Password"
//                                 {...register("password")}
//                                 value={passwordValue}
//                                 onChange={e => {
//                                     setPasswordValue(e.target.value);
//                                     if (confirmPasswordValue && e.target.value !== confirmPasswordValue) {
//                                         setConfirmError("Passwords do not match");
//                                     } else {
//                                         setConfirmError("");
//                                     }
//                                 }}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600 pr-10"
//                             />
//                             <button
//                                 type="button"
//                                 tabIndex={-1}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
//                                 onClick={() => setShowPassword((v) => !v)}
//                                 aria-label={showPassword ? "Hide password" : "Show password"}
//                             >
//                                 {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                             {errors.password && (
//                                 <p className="text-red-500 text-sm absolute left-0 -bottom-5">{errors.password.message}</p>
//                             )}
//                         </div>

//                         {/* Email */}
//                         <div>
//                             <input
//                                 type="email"
//                                 placeholder="Email"
//                                 {...register("email")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.email && (
//                                 <p className="text-red-500 text-sm">{errors.email.message}</p>
//                             )}
//                         </div>


//                         {/* Confirm Password */}
//                         <div className="relative flex items-center">
//                             <input
//                                 type={showConfirmPassword ? "text" : "password"}
//                                 placeholder="Confirm Password"
//                                 {...register("confirmPassword")}
//                                 value={confirmPasswordValue}
//                                 onChange={e => {
//                                     setConfirmPasswordValue(e.target.value);
//                                     if (passwordValue !== e.target.value) {
//                                         setConfirmError("Passwords do not match");
//                                     } else {
//                                         setConfirmError("");
//                                     }
//                                 }}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600 pr-10"
//                             />
//                             <button
//                                 type="button"
//                                 tabIndex={-1}
//                                 className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-purple-600"
//                                 onClick={() => setShowConfirmPassword((v) => !v)}
//                                 aria-label={showConfirmPassword ? "Hide password" : "Show password"}
//                             >
//                                 {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
//                             </button>
//                             {(confirmError || errors.confirmPassword) && (
//                                 <p className="text-red-500 text-sm absolute left-0 -bottom-5">{confirmError || errors.confirmPassword?.message}</p>
//                             )}
//                         </div>

//                         {/* Mobile */}
//                         <div>
//                             <input
//                                 type="number"
//                                 placeholder="Mobile"
//                                 {...register("mobile")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.mobile && (
//                                 <p className="text-red-500 text-sm">{errors.mobile.message}</p>
//                             )}
//                         </div>

//                         {/* Amount */}
//                         <div>
//                             <input
//                                 value={100}
//                                 {...register("amount")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                                 readOnly
//                             />
//                             {errors.amount && (
//                                 <p className="text-red-500 text-sm">{errors.amount.message}</p>
//                             )}
//                         </div>

//                         {/* WhatsApp */}
//                         <div>
//                             <input
//                                 type="number"
//                                 placeholder="WhatsApp Number"
//                                 {...register("whatsapp")}
//                                 className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
//                             />
//                             {errors.whatsapp && (
//                                 <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>
//                             )}
//                         </div>

//                         {/* Payment Info */}
//                         <div className="col-span-2 text-center text-sm text-purple-800">
//                             Signup Amount: <span className="text-purple-800 ">84.75</span> &nbsp;
//                             SGST: <span className="text-purple-800 ">9%</span> &nbsp;
//                             CGST: <span className="text-purple-800 ">9%</span>
//                         </div>

//                         {/* Terms */}
//                         <div className="col-span-2 flex items-center justify-center gap-2 mt-2">
//                             <input type="checkbox" id="terms" {...register("terms")} className="h-4 w-4" />
//                             <label htmlFor="terms" className="text-sm text-gray-300">
//                                 Agree with{" "}
//                                 <Link to="/terms" className="text-blue-400 hover:underline font-medium">
//                                     Terms And Condition
//                                 </Link>
//                             </label>
//                         </div>
//                         {errors.terms && (
//                             <p className="col-span-2 text-center text-red-500 text-sm">{errors.terms.message}</p>
//                         )}


//                         {/* Signup Button */}
//                         <button
//                             type="submit"
//                             className="col-span-2 mx-auto w-2/3 py-3 rounded-md bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 transition font-semibold"
//                         >
//                             Sign Up
//                         </button>
//                     </form>

//                     <p className="mt-9 mb-10 text-center text-sm text-gray-400">
//                         Already have an account?{" "}
//                         <Link
//                             to="/login"
//                             className="text-purple-500 hover:underline font-medium"
//                         >
//                             Sign In.
//                         </Link>
//                     </p>
//                 </div>
//             </div>
//         </div>
//     );
// };

// export default SignupForm;




import React from "react";
import { Eye, EyeOff } from "lucide-react";
import { Link } from "react-router-dom";
import logo from "../../../components/icons/logo";
import moneybg from "../../../assets/images/money-bg.png";
import { useSignupForm } from "../hooks/singupHook";

const SignupForm: React.FC = () => {
    const {
        register,
        handleSubmit,
        errors,
        showPassword,
        setShowPassword,
        showConfirmPassword,
        setShowConfirmPassword,
        passwordValue,
        setPasswordValue,
        confirmPasswordValue,
        setConfirmPasswordValue,
        confirmError,
        sponsorId,
        setSponsorId,
        sponsorName,
        setSponsorName,
        handlePincodeBlur,
        pincodeStatus,
        onSubmit,
        setConfirmError,
    } = useSignupForm();

    return (
        <div className="flex flex-col md:flex-row min-h-screen bg-black text-white">
            <div className="hidden lg:flex w-full lg:w-1/4 relative">
                <img
                    src={moneybg}
                    alt="Background"
                    className="w-full h-48 sm:h-64 md:h-80 lg:h-full object-cover"
                />
            </div>

            <div className="flex flex-1  px-5 sm:px-6 md:ml-15 py-10 overflow-y-auto">
                <div className="w-full max-w-md lg:max-w-[800px]">
                    <div className="text-center mb-10">
                        <span className="mx-auto flex justify-center mb-6">
                            {React.createElement(logo, { className: "h-28 w-28 sm:h-36 sm:w-36" })}
                        </span>
                    </div>
                    <div className="text-center mb-8 mt-12">
                        <h2 className="text-xl sm:text-3xl font-bold mb-3">Welcome To LioClubX</h2>
                        <p className="text-gray-300 text-sm sm:text-base">
                            Please sign up to continue
                        </p>
                    </div>

                    <form
                        className="grid grid-cols-1 md:grid-cols-2 gap-5"
                        onSubmit={handleSubmit(onSubmit)}
                    >
                        {/* Sponsor ID */}
                        <div className="col-span-1">
                            <input
                                type="text"
                                placeholder="Sponsor ID"
                                value={sponsorId}
                                onChange={(e) => {
                                    const val = e.target.value;
                                    setSponsorId(val);
                                    const name =
                                        {
                                            LX10001: "Rahul Sharma",
                                            LX10002: "Priya Singh",
                                            LX10003: "Amit Patel",
                                            LX88011: "Daralika V",
                                        }[val.trim().toUpperCase()] || "";
                                    setSponsorName(name);
                                }}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {sponsorName && (
                                <p className="text-green-500 text-sm mt-1">
                                    Sponsor Name:{" "}
                                    <span className="font-semibold">{sponsorName}</span>
                                </p>
                            )}
                        </div>
                        <input type="hidden" value={sponsorName} {...register("sponsorName")} />

                        {/* Pincode */}
                        <div>
                            <input
                                type="text"
                                placeholder="Pincode"
                                {...register("pincode")}
                                onBlur={handlePincodeBlur}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {pincodeStatus === "invalid" && (
                                <p className="text-red-500 text-sm">
                                    Pincode is not valid or not serviceable
                                </p>
                            )}
                            {pincodeStatus === "checking" && (
                                <p className="text-gray-400 text-sm">Checking pincode...</p>
                            )}
                            {errors.pincode && (
                                <p className="text-red-500 text-sm">{errors.pincode.message}</p>
                            )}
                        </div>

                        {/* Placement Id */}
                        <div>
                            <input
                                type="text"
                                placeholder="Placement Id"
                                {...register("placementId")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.placementId && (
                                <p className="text-red-500 text-sm">
                                    {errors.placementId.message}
                                </p>
                            )}
                        </div>

                        {/* Payment Type */}
                        <div>
                            <select
                                {...register("paymentType")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            >
                                <option value="">Select Payment Type</option>
                                <option value="gpay">GPay</option>
                                <option value="phonepe">PhonePe</option>
                                <option value="paytm">Paytm</option>
                            </select>
                            {errors.paymentType && (
                                <p className="text-red-500 text-sm">
                                    {errors.paymentType.message}
                                </p>
                            )}
                        </div>

                        {/* First Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="First Name"
                                {...register("firstName")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.firstName && (
                                <p className="text-red-500 text-sm">{errors.firstName.message}</p>
                            )}
                        </div>

                        {/* UPI Number */}
                        <div>
                            <input
                                type="text"
                                placeholder="UPI Number"
                                {...register("upiNumber")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.upiNumber && (
                                <p className="text-red-500 text-sm">{errors.upiNumber.message}</p>
                            )}
                        </div>

                        {/* Last Name */}
                        <div>
                            <input
                                type="text"
                                placeholder="Last Name"
                                {...register("lastName")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.lastName && (
                                <p className="text-red-500 text-sm">{errors.lastName.message}</p>
                            )}
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="Password"
                                {...register("password")}
                                value={passwordValue}
                                onChange={(e) => {
                                    setPasswordValue(e.target.value);
                                    if (
                                        confirmPasswordValue &&
                                        e.target.value !== confirmPasswordValue
                                    ) {
                                        setConfirmError("Passwords do not match");
                                    } else setConfirmError("");
                                }}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowPassword((v) => !v)}
                            >
                                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {errors.password && (
                                <p className="text-red-500 text-sm mt-1">
                                    {errors.password.message}
                                </p>
                            )}
                        </div>

                        {/* Email */}
                        <div>
                            <input
                                type="email"
                                placeholder="Email"
                                {...register("email")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.email && (
                                <p className="text-red-500 text-sm">{errors.email.message}</p>
                            )}
                        </div>

                        {/* Confirm Password */}
                        <div className="relative">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="Confirm Password"
                                {...register("confirmPassword")}
                                value={confirmPasswordValue}
                                onChange={(e) => {
                                    setConfirmPasswordValue(e.target.value);
                                    if (passwordValue !== e.target.value) {
                                        setConfirmError("Passwords do not match");
                                    } else setConfirmError("");
                                }}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600 pr-10"
                            />
                            <button
                                type="button"
                                tabIndex={-1}
                                className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500"
                                onClick={() => setShowConfirmPassword((v) => !v)}
                            >
                                {showConfirmPassword ? <EyeOff size={20} /> : <Eye size={20} />}
                            </button>
                            {(confirmError || errors.confirmPassword) && (
                                <p className="text-red-500 text-sm mt-1">
                                    {confirmError || errors.confirmPassword?.message}
                                </p>
                            )}
                        </div>

                        {/* Mobile */}
                        <div>
                            <input
                                type="number"
                                placeholder="Mobile"
                                {...register("mobile")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.mobile && (
                                <p className="text-red-500 text-sm">{errors.mobile.message}</p>
                            )}
                        </div>

                        {/* Amount */}
                        <div>
                            <input
                                value={100}
                                readOnly
                                {...register("amount")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                        </div>

                        {/* WhatsApp */}
                        <div>
                            <input
                                type="number"
                                placeholder="WhatsApp Number"
                                {...register("whatsapp")}
                                className="w-full rounded-md px-4 py-3 text-black bg-white focus:ring-2 focus:ring-purple-600"
                            />
                            {errors.whatsapp && (
                                <p className="text-red-500 text-sm">{errors.whatsapp.message}</p>
                            )}
                        </div>

                        {/* Payment Info */}
                        <div className="col-span-1 p-1 md:col-span-2 text-center text-sm text-purple-400">
                            Signup Amount: <span className="font-semibold">84.75</span> &nbsp;
                            SGST: <span className="font-semibold">9%</span> &nbsp;
                            CGST: <span className="font-semibold">9%</span>
                        </div>

                        {/* Terms */}
                        <div className="col-span-1 md:col-span-2 flex items-center justify-center gap-2 mt-2">
                            <input
                                type="checkbox"
                                id="terms"
                                {...register("terms")}
                                className="h-4 w-4"
                            />
                            <label htmlFor="terms" className="text-sm text-gray-300">
                                Agree with{" "}
                                <Link
                                    to="/terms"
                                    className="text-blue-400 hover:underline font-medium"
                                >
                                    Terms And Condition
                                </Link>
                            </label>
                        </div>
                        {errors.terms && (
                            <p className="col-span-2 text-center text-red-500 text-sm">
                                {errors.terms.message}
                            </p>
                        )}

                        {/* Button */}
                        <button
                            type="submit"
                            className="col-span-1 md:col-span-2 w-full md:w-2/3 mx-auto py-3 rounded-md bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 font-semibold"
                        >
                            Sign Up
                        </button>
                    </form>

                    <p className="mt-8 text-center text-sm text-gray-400">
                        Already have an account?{" "}
                        <Link to="/login" className="text-purple-500 hover:underline">
                            Sign In
                        </Link>
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SignupForm;
