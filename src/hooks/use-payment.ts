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
    plan_id?: string[];
}

export const usePayment = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState("");
    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [isVerifying, setIsVerifying] = useState<boolean>(false)

    const navigate = useNavigate();

    const initiatePayment = async (details: string) => {
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
                '/create', details);

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
                            '/verify',
                            { ...response }
                        );

                        const verifyData = verifyRes.data;

                        if (verifyData?.success) {
                            navigate(`/dashboard/`);
                        } else {
                            setError("Payment verification failed.");
                        }
                    } catch (err) {
                        setError("Failed to verify payment.");
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
            const responseData: PaymentErrorResponse = err.response?.data;

            if (responseData?.plan_id?.[0]) {
                setError(responseData.plan_id[0]);
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
