import { useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import { useEffect } from "react";
import { loadRazorpayScript } from "../config/loadRazorpay";
import api from "../lib/api";
import { APP_NAME } from "../utils/contant";
interface RazorpayResponse {
    razorpay_order_id: string;
    razorpay_payment_id: string;
    razorpay_signature: string;
}


export interface Purchase {
    id: number;
    plan: any;
    plan_id: number;
    user_email: string;
    user_name: string;
    plan_title: string;
    provider_name: string;
    amount: string;
    payment_status: "success" | "failed" | "pending";
    transaction_id: string;
    phone_number: string;
    payment_method: "online" | "offline";
    created_at: string;
    updated_at: string;
    completed_at: string;
}

interface PaymentCreateResponse {
    order_id: string;
    razorpay_key: string;
    amount: number;
    currency: string;
}

interface PaymentSuccessResponse {
    success: boolean;
    message: string;
}

interface PaymentErrorResponse {
    registration_token?: string[];
    user_level_id?: string[];
    detail?: string;
}

export const usePayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [isVerifying, setIsVerifying] = useState<boolean>(false)

    const navigate = useNavigate();

    const initiatePayment = async (details: { registration_token: string; userIdPayload: any; }) => {
        setIsLoading(true);
        setError("");
        setPurchase(null);

        const isLoaded = await loadRazorpayScript();
        if (!isLoaded) {
            setError("Failed to load Razorpay SDK.");
            setIsLoading(false);
            return;
        }

        try {
            const res = await api.post<PaymentCreateResponse>(
                '/razorpay/order/', { registration_token: details.registration_token });

            const data = res.data;
            const options = {
                key: data?.razorpay_key,
                amount: data.amount,
                currency: data.currency,
                name: APP_NAME,
                description: APP_NAME,
                order_id: data?.order_id,
                handler: async (response: RazorpayResponse) => {
                    try {
                        setIsVerifying(true)
                        const verifyRes = await api.post<PaymentSuccessResponse>(
                            '/razorpay/verify/',
                            { ...response }
                        );
                        const { message, user_id } = verifyRes.data as any;

                        if (message?.toLowerCase().includes("verified")) {
                            const user = details.userIdPayload;
                            await Swal.fire({
                                title: "🎉 Welcome to LioClubX!",
                                html: `<div class="text-center leading-relaxed">
                                        <h3 class="mb-1"><b>User ID:</b> ${user_id}</h3>
                                        <h3 class="mb-1 "><b>Name:</b> ${user.first_name} ${user.last_name}</h3>
                                        <h3 class="mb-1"><b>Mobile:</b> ${user.mobile}</h3>
                                        <h3 class="mb-1"><b>Email:</b> ${user.email}</h3>
                                        <h3 class="mb-1"><b>Password:</b> ${user.password}</h3>
                                        <p class="mt-4 text-sm text-white">You have made right decision at the right time and chosen the great company who has offered you great avenues of financial freedom that you have been seeking for so long</p>
                                        </div> `,
                                icon: "success",
                                confirmButtonText: "Go to Dashboard",
                                background: "#0f0f0f",
                                color: "#ffffff",
                                customClass: {
                                    popup: "rounded-2xl shadow-xl border border-purple-600",
                                    title: "text-2xl font-bold text-purple-400 mb-3",
                                    confirmButton:
                                        "bg-gradient-to-r from-purple-600 to-violet-700 hover:from-purple-700 hover:to-violet-800 text-white px-6 py-2 rounded-md font-semibold focus:outline-none",
                                    htmlContainer: "text-sm text-gray-200",
                                },
                                backdrop: `rgba(0,0,0,0.7)url("/sparkle.gif") center top / cover no-repeat`,
                            });
                            navigate(`/dashboard/`);
                        } else {
                            setError("Payment verification failed.");
                        }
                    } catch (err: any) {

                        const e = err.response?.data;
                        if (e?.user_level_id?.[0]) {
                            setError(e.user_level_id[0]);
                        } else if (err.response?.status === 500) {
                            setError("Server not responding!");
                        } else {
                            setError(err.message || "Something went wrong.");
                        }
                    } finally {
                        setIsVerifying(false)
                    }
                },
                prefill: {
                    name: "",
                    email: "",
                    contact: "",
                },
                theme: { color: "#2563EB" },
                method: {
                    upi: true,
                    card: true,
                    netbanking: true,
                    wallet: true,
                    paylater: false,
                },
                // checkout_config_id: "ConfigIDHere",
            };

            const rzp = new window.Razorpay(options);
            rzp.open();
        } catch (err: any) {
            //
            console.error("Status:", err.response?.status);
            console.error("Data:", err.response?.data);

            const responseData: PaymentErrorResponse = err.response?.data;

            if (responseData?.registration_token?.[0]) {
                setError(responseData.registration_token[0]);
            } if (err.response?.status === 500) {
                setError("Server not responding!");
            } else {
                setError(err.message || "Something went wrong.");
            }
        } finally {
            setIsLoading(false);
        }
    };


    useEffect(() => {
        if (isVerifying) {
            Swal.fire({
                title: "Processing Payment...",
                didOpen: () => {
                    Swal.showLoading();
                },
                allowOutsideClick: false,
                showConfirmButton: false,
                backdrop: true,
            });
        } else {
            Swal.close();
        }
    }, [isVerifying]);

    return { initiatePayment, isLoading, error, purchase, isVerifying };
};
