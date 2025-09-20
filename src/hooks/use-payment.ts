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

    const initiatePayment = async (details: { registration_token: string }) => {
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
            console.log("payload:", details);
            const res = await api.post<PaymentCreateResponse>(
                '/razorpay/order/', { registration_token: details.registration_token });

            console.log("payment response:", res.data);

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

                        const verifyData = verifyRes.data;

                        if (verifyData?.success) {
                            navigate(`/dashboard/`);
                        } else {
                            setError("Payment verification failed.");
                        }
                    } catch (err: any) {

                        //
                        console.error("Verify status", err.response?.status);
                        console.error("Verify data:", err.response?.data);

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
