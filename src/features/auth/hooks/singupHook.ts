import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useLocation, useParams } from "react-router-dom";
import { signupSchema, type SignupFormData } from "./validationZod";

const sponsorIdToName: Record<string, string> = {
    LX10001: "Rahul Sharma",
    LX10002: "Priya Singh",
    LX10003: "Amit Patel",
    LX88011: "Daralika V",
};

export function useSignupForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignupFormData>({
        resolver: zodResolver(signupSchema),
    });

    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [passwordValue, setPasswordValue] = useState("");
    const [confirmPasswordValue, setConfirmPasswordValue] = useState("");
    const [confirmError, setConfirmError] = useState("");
    const [sponsorId, setSponsorId] = useState("");
    const [sponsorName, setSponsorName] = useState("");
    const [formLoading, setFormLoading] = useState(false)
    const [pincodeStatus, setPincodeStatus] = useState<
        null | "valid" | "invalid" | "checking"
    >(null);

    const location = useLocation();
    const params = useParams();

    const handlePincodeBlur = async (e: React.FocusEvent<HTMLInputElement>) => {
        const pin = e.target.value.trim();
        if (!/^[0-9]{6}$/.test(pin)) {
            setPincodeStatus("invalid");
            return;
        }
        setPincodeStatus("checking");
        try {
            const res = await fetch(`https://api.postalpincode.in/pincode/${pin}`);
            const data = await res.json();
            if (data[0].Status === "Success") {
                setPincodeStatus("valid");
            } else {
                setPincodeStatus("invalid");
            }
        } catch {
            setPincodeStatus("invalid");
        }
    };

    useEffect(() => {
        let refId = "";
        if (params.refId) {
            refId = params.refId;
        } else {
            const searchParams = new URLSearchParams(location.search);
            refId = searchParams.get("ref") || "";
        }
        if (refId) {
            setSponsorId(refId);
            const name = sponsorIdToName[refId.trim().toUpperCase()] || "";
            setSponsorName(name);
        }
    }, [location.search, params.refId]);

    const onSubmit = (data: SignupFormData) => {
        setFormLoading(true)
        setTimeout(() => {
            setFormLoading(false)
        }, 1000)
        console.log("Form Data:", data);
    };

    return {
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
        setConfirmError,
        sponsorId,
        setSponsorId,
        sponsorName,
        setSponsorName,
        handlePincodeBlur,
        pincodeStatus,
        onSubmit,
        formLoading
    };
}
